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

/** Merges a live snapshot into the static passport record. */
export function useLivePassport(base: Passport): Passport {
  const live = useLiveIndex().get(base.iso);
  return useMemo(() => {
    if (!live) return base;
    const totalAccess = live.visaFree + live.visaOnArrival + live.eta;
    const history = live.history.length >= 3 ? live.history : base.history10;
    return {
      ...base,
      // Global/regional standing stays on the published 2026 index; the provider
      // feed only refreshes per-destination access counts.
      rank: base.rank,
      prevRank: base.prevRank,
      rankDelta: base.rankDelta,
      regionalRank: base.regionalRank,
      visaFree: live.visaFree,
      visaOnArrival: live.visaOnArrival,
      eta: live.eta,
      visaRequired: live.visaRequired,
      totalAccess,
      mobility: base.mobility,
      history10: history.length >= 10 ? history.slice(-10) : [...base.history10.slice(0, 10 - history.length), ...history],
    };
  }, [base, live]);
}

/** The whole index, with live snapshot values merged in where available. */
export function useLivePassports(): Passport[] {
  const index = useLiveIndex();
  return useMemo(() => {
    if (index.size === 0) return PASSPORTS;
    const merged = PASSPORTS.map((base) => {
      const live = index.get(base.iso);
      if (!live) return base;
      const totalAccess = live.visaFree + live.visaOnArrival + live.eta;
      return {
        ...base,
        rank: base.rank,
        prevRank: base.prevRank,
        rankDelta: base.rankDelta,
        regionalRank: base.regionalRank,
        visaFree: live.visaFree,
        visaOnArrival: live.visaOnArrival,
        eta: live.eta,
        visaRequired: live.visaRequired,
        totalAccess,
        mobility: base.mobility,
      };
    });
    return merged.sort((a, b) => a.rank - b.rank || a.name.localeCompare(b.name));
  }, [index]);
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
