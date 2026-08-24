import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  PASSPORTS,
  accessListFor,
  type AccessKind,
  type Passport,
} from "@/data/passports";
import { getAccessRules, getDataStatus, getLiveIndex } from "@/lib/visa-data.functions";

/** Latest stored snapshots, keyed by ISO. Falls back to the bundled table. */
export function useLiveIndex() {
  const { data } = useQuery({
    queryKey: ["live-index"],
    queryFn: () => getLiveIndex(),
    staleTime: 5 * 60_000,
  });
  return useMemo(() => new Map((data ?? []).map((s) => [s.iso, s])), [data]);
}

/**
 * Ranking figures (global rank, regional rank, YoY movement, published score)
 * always come from the 2026 index. Everything measured per destination —
 * visa-free / on-arrival / eTA / required counts and the mobility score — comes
 * from the live provider feed when it has been synced for that passport.
 */
function withLiveCounts(base: Passport, snap: LiveCounts | undefined): Passport {
  if (!snap) return base;
  const totalAccess = snap.visaFree + snap.visaOnArrival + snap.eta;
  if (totalAccess === 0) return base;
  return {
    ...base,
    visaFree: snap.visaFree,
    visaOnArrival: snap.visaOnArrival,
    eta: snap.eta,
    visaRequired: snap.visaRequired,
    totalAccess,
    mobility: snap.mobility || base.mobility,
  };
}

interface LiveCounts {
  visaFree: number;
  visaOnArrival: number;
  eta: number;
  visaRequired: number;
  mobility: number;
}

export function useLivePassport(base: Passport): Passport {
  const live = useLiveIndex();
  return useMemo(() => withLiveCounts(base, live.get(base.iso)), [base, live]);
}

/** The published 2026 ranking, with live per-destination counts merged in. */
export function useLivePassports(): Passport[] {
  const live = useLiveIndex();
  return useMemo(() => PASSPORTS.map((p) => withLiveCounts(p, live.get(p.iso))), [live]);
}

export interface AccessLists {
  free: Passport[];
  voa: Passport[];
  eta: Passport[];
  required: Passport[];
}

/** Counts derived from the lists actually shown, so UI numbers always agree. */
function countsFrom(lists: AccessLists) {
  return {
    visaFree: lists.free.length,
    visaOnArrival: lists.voa.length,
    eta: lists.eta.length,
    visaRequired: lists.required.length,
    totalAccess: lists.free.length + lists.voa.length + lists.eta.length,
  };
}

export type AccessCounts = ReturnType<typeof countsFrom>;

/**
 * Real per-destination access for a passport when the provider sync has run,
 * otherwise the bundled estimate (flagged so the UI can say so).
 */
export function useAccessLists(passport: Passport): {
  lists: AccessLists;
  estimated: boolean;
  counts: AccessCounts;
} {
  const { data } = useQuery({
    queryKey: ["access-rules", passport.iso],
    queryFn: () => getAccessRules({ data: { iso: passport.iso } }),
    staleTime: 5 * 60_000,
  });

  return useMemo(() => {
    const rules = data ?? {};
    const isoKeys = Object.keys(rules);
    if (isoKeys.length < 20) {
      const lists = accessListFor(passport);
      return { lists, estimated: true, counts: countsFrom(lists) };
    }

    const lists: AccessLists = { free: [], voa: [], eta: [], required: [] };
    for (const dest of PASSPORTS) {
      if (dest.iso === passport.iso) continue;
      const kind = rules[dest.iso] as AccessKind | undefined;
      if (!kind) continue;
      lists[kind].push(dest);
    }
    const byName = (a: Passport, b: Passport) => a.name.localeCompare(b.name);
    const sorted: AccessLists = {
      free: lists.free.sort(byName),
      voa: lists.voa.sort(byName),
      eta: lists.eta.sort(byName),
      required: lists.required.sort(byName),
    };
    return { lists: sorted, estimated: false, counts: countsFrom(sorted) };
  }, [data, passport]);
}


/** Provenance + freshness of the stored dataset. */
export function useDataStatus() {
  const { data } = useQuery({
    queryKey: ["data-status"],
    queryFn: () => getDataStatus(),
    staleTime: 5 * 60_000,
  });
  return data ?? null;
}
