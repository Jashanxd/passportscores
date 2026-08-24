import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { publicSupabase } from "./supabase-public.server";

export interface LiveSnapshot {
  iso: string;
  rank: number;
  regionalRank: number;
  visaFree: number;
  visaOnArrival: number;
  eta: number;
  visaRequired: number;
  mobility: number;
  prevRank: number | null;
  history: number[];
}

export interface DataStatus {
  source: string | null;
  updatedAt: string | null;
  status: string | null;
  message: string | null;
  hasRealRules: boolean;
}

/** Latest stored snapshot per country plus its rank history. */
export const getLiveIndex = createServerFn({ method: "GET" }).handler(async (): Promise<LiveSnapshot[]> => {
  const supabase = publicSupabase();
  const { data, error } = await supabase
    .from("passport_snapshots")
    .select("iso, captured_at, rank, regional_rank, visa_free, visa_on_arrival, eta, visa_required, mobility")
    .order("captured_at", { ascending: true })
    .limit(20000);
  if (error || !data) return [];

  const byIso = new Map<string, typeof data>();
  for (const row of data) {
    const list = byIso.get(row.iso) ?? [];
    list.push(row);
    byIso.set(row.iso, list);
  }

  return [...byIso.entries()].map(([iso, rows]) => {
    const latest = rows[rows.length - 1]!;
    const prev = rows.length > 1 ? rows[rows.length - 2]! : null;
    return {
      iso,
      rank: latest.rank,
      regionalRank: latest.regional_rank,
      visaFree: latest.visa_free,
      visaOnArrival: latest.visa_on_arrival,
      eta: latest.eta,
      visaRequired: latest.visa_required,
      mobility: Number(latest.mobility),
      prevRank: prev ? prev.rank : null,
      history: rows.map((r: { rank: number }) => r.rank),
    };
  });
});

/** Real per-destination rules for one nationality; empty when not synced yet. */
export const getAccessRules = createServerFn({ method: "GET" })
  .inputValidator((input) => z.object({ iso: z.string().min(2).max(3) }).parse(input))
  .handler(async ({ data }): Promise<Record<string, "free" | "voa" | "eta" | "required">> => {
    const supabase = publicSupabase();
    const { data: rows, error } = await supabase
      .from("visa_rules")
      .select("destination_iso, access")
      .eq("nationality_iso", data.iso.toUpperCase())
      .limit(500);
    if (error || !rows) return {};
    const out: Record<string, "free" | "voa" | "eta" | "required"> = {};
    for (const row of rows) out[row.destination_iso] = row.access as "free" | "voa" | "eta" | "required";
    return out;
  });

/** Freshness / provenance of the stored data. Only non-sensitive fields leave the server. */
export const getDataStatus = createServerFn({ method: "GET" }).handler(async (): Promise<DataStatus> => {
  const publicClient = publicSupabase();
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const [{ data: runs }, { count }] = await Promise.all([
    supabaseAdmin
      .from("data_sync_runs")
      .select("status, finished_at")
      .in("status", ["success", "partial"])
      .order("started_at", { ascending: false })
      .limit(1),
    publicClient.from("visa_rules").select("nationality_iso", { count: "exact", head: true }),
  ]);
  const run = runs?.[0] ?? null;
  return {
    source: run ? "live visa-rule feed" : null,
    updatedAt: run?.finished_at ?? null,
    status: run?.status ?? null,
    message: null,
    hasRealRules: (count ?? 0) > 0,
  };
});
