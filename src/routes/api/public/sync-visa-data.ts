import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { PASSPORTS } from "@/data/passports";

const BodySchema = z
  .object({
    offset: z.number().int().min(0).max(500).optional(),
    limit: z.number().int().min(1).max(250).optional(),
  })
  .default({});

/**
 * Weekly ingestion endpoint. Bootstraps country/snapshot rows from the bundled
 * reference table, then (when a provider key is configured) pulls the real
 * per-nationality visa matrix and recomputes ranks from it.
 */
export const Route = createFileRoute("/api/public/sync-visa-data")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const apikey = request.headers.get("apikey") ?? "";
        const expected =
          process.env["SUPABASE_PUBLISHABLE_KEY"] ?? process.env["VITE_SUPABASE_PUBLISHABLE_KEY"] ?? "";
        if (!expected || apikey !== expected) {
          return Response.json({ error: "Unauthorized" }, { status: 401 });
        }

        let raw: unknown = {};
        try {
          raw = await request.json();
        } catch {
          raw = {};
        }
        const parsed = BodySchema.safeParse(raw);
        if (!parsed.success) return Response.json({ error: "Invalid body" }, { status: 400 });
        const { offset = 0, limit = 250 } = parsed.data;

        const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
        const { readProviderConfig, fetchRulesForNationality } = await import("@/lib/visa-provider.server");

        const config = readProviderConfig();
        const { data: run } = await supabaseAdmin
          .from("data_sync_runs")
          .insert({ source: config?.source ?? "bundled-reference", status: "running" })
          .select("id")
          .single();
        const runId = run?.id;

        const finish = async (
          status: "success" | "partial" | "failed",
          rows: number,
          message: string,
        ) => {
          if (runId) {
            await supabaseAdmin
              .from("data_sync_runs")
              .update({ status, rows_upserted: rows, message, finished_at: new Date().toISOString() })
              .eq("id", runId);
          }
          return Response.json({ status, rows, message }, { status: status === "failed" ? 502 : 200 });
        };

        try {
          // 1. Reference rows (idempotent).
          const { error: cErr } = await supabaseAdmin.from("countries").upsert(
            PASSPORTS.map((p) => ({ iso: p.iso, name: p.name, region: p.region, cover: p.cover })),
            { onConflict: "iso" },
          );
          if (cErr) throw new Error(`countries: ${cErr.message}`);

          if (!config) {
            // No provider key yet: keep the bundled reference snapshot fresh so
            // rankings still render, and say so in the run log.
            const rows = PASSPORTS.map((p) => ({
              iso: p.iso,
              captured_at: new Date().toISOString().slice(0, 10),
              rank: p.rank,
              regional_rank: p.regionalRank,
              visa_free: p.visaFree,
              visa_on_arrival: p.visaOnArrival,
              eta: p.eta,
              visa_required: p.visaRequired,
              mobility: p.mobility,
              source: "bundled-reference",
            }));
            const { error } = await supabaseAdmin
              .from("passport_snapshots")
              .upsert(rows, { onConflict: "iso,captured_at" });
            if (error) throw new Error(`snapshots: ${error.message}`);
            return await finish(
              "partial",
              rows.length,
              "No visa provider key configured (VISA_API_URL / VISA_API_KEY). Bundled reference snapshot refreshed instead.",
            );
          }

          // 2. Pull the real matrix, prioritising nationalities we have never
          //    fetched (providers meter requests, so each run tops up coverage).
          const knownIso = new Set(PASSPORTS.map((p) => p.iso));
          // The Data API caps a single response at 1000 rows, so page through
          // the matrix to learn which nationalities already have real rules.
          const have = new Set<string>();
          const PAGE = 1000;
          for (let from = 0; from < 200_000; from += PAGE) {
            const { data: page, error } = await supabaseAdmin
              .from("visa_rules")
              .select("nationality_iso")
              .order("nationality_iso", { ascending: true })
              .range(from, from + PAGE - 1);
            if (error) throw new Error(`coverage: ${error.message}`);
            for (const row of page ?? []) have.add(row.nationality_iso);
            if (!page || page.length < PAGE) break;
          }
          const ordered = [
            ...PASSPORTS.filter((p) => !have.has(p.iso)),
            ...PASSPORTS.filter((p) => have.has(p.iso)),
          ];

          const batch = ordered.slice(offset, offset + limit);
          let written = 0;
          const failures: string[] = [];
          let quotaExhausted = false;

          const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
          const fetchWithRetry = async (iso: string) => {
            let lastErr: unknown;
            for (let attempt = 0; attempt < 5; attempt++) {
              try {
                const rules = await fetchRulesForNationality(config, iso, knownIso);
                if (Object.keys(rules).length > 0) return rules;
                lastErr = new Error("empty response");
              } catch (err) {
                lastErr = err;
                if (err instanceof Error && /quota-exhausted/.test(err.message)) {
                  quotaExhausted = true;
                  throw err;
                }
              }
              // Back off on transient errors, including the provider's
              // per-second throttle (429 with quota remaining).
              await sleep(700 * (attempt + 1));
            }
            throw lastErr instanceof Error ? lastErr : new Error("provider failed");
          };

          for (let i = 0; i < batch.length; i += 2) {
            if (quotaExhausted) break;
            const chunk = batch.slice(i, i + 2);
            await Promise.all(
              chunk.map(async (p) => {
                try {
                  const rules = await fetchWithRetry(p.iso);
                  const rows = Object.entries(rules).map(([destination_iso, access]) => ({
                    nationality_iso: p.iso,
                    destination_iso,
                    access,
                    updated_at: new Date().toISOString(),
                  }));
                  if (rows.length === 0) {
                    failures.push(p.iso);
                    return;
                  }
                  const { error } = await supabaseAdmin
                    .from("visa_rules")
                    .upsert(rows, { onConflict: "nationality_iso,destination_iso" });
                  if (error) throw new Error(error.message);
                  written += rows.length;
                } catch (err) {
                  failures.push(p.iso);
                  console.error("visa sync failed for", p.iso, err);
                }
              }),
            );
            await sleep(350);
          }


          // 3. Recompute counts and ranks from the stored rules.
          const { error: rpcErr } = await supabaseAdmin.rpc("recompute_passport_snapshot", {
            _source: config.source,
          });
          if (rpcErr) throw new Error(`recompute: ${rpcErr.message}`);

          const message = quotaExhausted
            ? `Provider request quota reached. Synced ${written} rules this run; remaining passports will be topped up on the next run.`
            : failures.length
              ? `Synced ${written} rules. No data for: ${failures.slice(0, 12).join(", ")}${failures.length > 12 ? "…" : ""}`
              : `Synced ${written} rules for ${batch.length} passports.`;
          return await finish(failures.length ? "partial" : "success", written, message);
        } catch (err) {
          return await finish("failed", 0, err instanceof Error ? err.message : "Unknown error");
        }
      },
    },
  },
});
