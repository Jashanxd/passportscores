import { useMemo, useState } from "react";
import { Search, X } from "lucide-react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { z } from "zod";
import { Reveal } from "@/components/Reveal";
import { PassportCover } from "@/components/PassportCover";
import { CountrySearch } from "@/components/CountrySearch";
import { DeltaBadge } from "@/components/DeltaBadge";
import { AccessBar } from "@/components/AccessBar";
import { cn } from "@/lib/utils";
import { getPassport, type Passport } from "@/data/passports";
import { Flag } from "@/components/Flag";
import { useAccessLists, useLivePassport } from "@/hooks/usePassportData";

const searchSchema = z.object({
  a: z.string().optional(),
  b: z.string().optional(),
});

export const Route = createFileRoute("/compare")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "Compare Passports Side by Side — Travel Freedom" },
      {
        name: "description",
        content:
          "Put two passports head to head: rank, visa-free destinations, mobility score and where their access overlaps.",
      },
      { property: "og:title", content: "Compare Passports Side by Side" },
      {
        property: "og:description",
        content: "Two passports, one table: rank, access, mobility and shared destinations.",
      },
    ],
  }),
  component: ComparePage,
});

interface MetricRow {
  label: string;
  value: (p: Passport) => number;
  format?: (n: number) => string;
  higherIsBetter: boolean;
}

const METRICS: MetricRow[] = [
  { label: "Global rank", value: (p) => p.rank, format: (n) => `#${n}`, higherIsBetter: false },
  {
    label: "Regional rank",
    value: (p) => p.regionalRank,
    format: (n) => `#${n}`,
    higherIsBetter: false,
  },
  { label: "Total access", value: (p) => p.totalAccess, higherIsBetter: true },
  { label: "Visa-free", value: (p) => p.visaFree, higherIsBetter: true },
  { label: "Visa on arrival", value: (p) => p.visaOnArrival, higherIsBetter: true },
  { label: "eTA", value: (p) => p.eta, higherIsBetter: true },
  { label: "Visa required", value: (p) => p.visaRequired, higherIsBetter: false },
  {
    label: "Mobility score",
    value: (p) => p.mobility,
    format: (n) => n.toFixed(1),
    higherIsBetter: true,
  },
];

function ComparePage() {
  const { a, b } = Route.useSearch();
  const navigate = useNavigate({ from: "/compare" });

  const left = getPassport(a ?? "SG");
  const right = getPassport(b ?? "IN");

  const setSlot = (slot: "a" | "b", iso: string) =>
    navigate({ search: (prev) => ({ ...prev, [slot]: iso }) });

  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <Reveal>
        <p className="eyebrow">Head to head</p>
        <h1 className="mt-3 max-w-2xl text-5xl leading-[1.05] sm:text-6xl">
          Two passports. One honest comparison.
        </h1>
      </Reveal>

      <div className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2">
        {(["a", "b"] as const).map((slot) => {
          const p = slot === "a" ? left : right;
          return (
            <Reveal key={slot} delay={slot === "a" ? 0 : 90} className="space-y-6">
              <CountrySearch
                value={p?.iso}
                onChange={(iso) => setSlot(slot, iso)}
                placeholder={slot === "a" ? "First passport" : "Second passport"}
              />
              {p && (
                <div className="flex flex-col items-center gap-5">
                  <PassportCover passport={p} size="md" />
                  <div className="text-center">
                    <p className="tnum font-display text-5xl">#{p.rank}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{p.regionLabel}</p>
                    <DeltaBadge delta={p.rankDelta} className="mt-2" />
                  </div>
                </div>
              )}
            </Reveal>
          );
        })}
      </div>

      {left && right && (
        <>
          <Reveal delay={120} className="mt-16">
            <table className="w-full border-collapse text-sm">
              <tbody>
                {METRICS.map((m) => {
                  const lv = m.value(left);
                  const rv = m.value(right);
                  const fmt = m.format ?? ((n: number) => String(n));
                  const leftWins = m.higherIsBetter ? lv > rv : lv < rv;
                  const rightWins = m.higherIsBetter ? rv > lv : rv < lv;
                  return (
                    <tr key={m.label} className="border-b border-border">
                      <td
                        className={cn(
                          "tnum font-display w-1/3 py-4 text-2xl",
                          leftWins ? "text-primary" : "text-muted-foreground",
                        )}
                      >
                        {fmt(lv)}
                      </td>
                      <td className="w-1/3 py-4 text-center text-xs tracking-[0.14em] text-muted-foreground uppercase">
                        {m.label}
                      </td>
                      <td
                        className={cn(
                          "tnum font-display w-1/3 py-4 text-right text-2xl",
                          rightWins ? "text-primary" : "text-muted-foreground",
                        )}
                      >
                        {fmt(rv)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </Reveal>

          <Reveal delay={140} className="mt-16 grid gap-10 sm:grid-cols-2">
            {[left, right].map((p) => (
              <div key={p.iso}>
                <h2 className="text-2xl">{p.name}</h2>
                <AccessBar passport={p} className="mt-4" />
              </div>
            ))}
          </Reveal>

          <Overlap left={left} right={right} />
        </>
      )}
    </div>
  );
}

type OverlapView = "shared" | "left" | "right";

function Overlap({ left, right }: { left: Passport; right: Passport }) {
  const [view, setView] = useState<OverlapView>("shared");
  const [query, setQuery] = useState("");

  const leftAccess = useAccessLists(left);
  const rightAccess = useAccessLists(right);

  const { shared, onlyLeft, onlyRight } = useMemo(() => {
    const la = leftAccess.lists.free;
    const ra = rightAccess.lists.free;
    const rSet = new Set(ra.map((d: Passport) => d.iso));
    const lSet = new Set(la.map((d: Passport) => d.iso));
    return {
      shared: la.filter((d: Passport) => rSet.has(d.iso)),
      onlyLeft: la.filter((d: Passport) => !rSet.has(d.iso)),
      onlyRight: ra.filter((d: Passport) => !lSet.has(d.iso)),
    };
  }, [leftAccess, rightAccess]);

  const views: { key: OverlapView; title: string; hint: string; list: Passport[]; dot: string }[] = [
    { key: "shared", title: "Both visa-free", hint: "Open to either passport", list: shared, dot: "bg-access-free" },
    { key: "left", title: `Only ${left.name}`, hint: `${right.name} needs a visa`, list: onlyLeft, dot: "bg-access-eta" },
    { key: "right", title: `Only ${right.name}`, hint: `${left.name} needs a visa`, list: onlyRight, dot: "bg-access-voa" },
  ];

  const activeView = views.find((v) => v.key === view)!;
  const q = query.trim().toLowerCase();
  const results = activeView.list.filter(
    (d) => q === "" || d.name.toLowerCase().includes(q) || d.iso.toLowerCase().includes(q),
  );

  return (
    <Reveal delay={160} className="mt-20">
      <h2 className="text-3xl">Where the access diverges</h2>
      <p className="mt-2 max-w-lg text-sm text-muted-foreground">
        Visa-free destinations grouped by which passport unlocks them.
      </p>

      <div className="mt-8 grid gap-3 sm:grid-cols-3">
        {views.map((v) => (
          <button
            key={v.key}
            onClick={() => {
              setView(v.key);
              setQuery("");
            }}
            className={cn(
              "rounded-xl border p-4 text-left transition-colors",
              view === v.key
                ? "border-foreground bg-card"
                : "border-border hover:border-foreground/40",
            )}
          >
            <span className="flex items-center gap-2 text-sm font-medium">
              <span className={cn("size-2 rounded-full", v.dot)} />
              <span className="truncate">{v.title}</span>
            </span>
            <span className="tnum font-display mt-2 block text-3xl">{v.list.length}</span>
            <span className="mt-1 block text-xs text-muted-foreground">{v.hint}</span>
          </button>
        ))}
      </div>

      <div className="relative mt-6 max-w-sm">
        <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={`Search ${activeView.title.toLowerCase()}…`}
          aria-label="Search destinations"
          className="w-full rounded-full border border-border bg-transparent py-2 pr-9 pl-9 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-foreground"
        />
        {query && (
          <button
            onClick={() => setQuery("")}
            aria-label="Clear search"
            className="absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            <X className="size-4" />
          </button>
        )}
      </div>

      <ul className="mt-6 grid grid-cols-2 gap-x-8 gap-y-1 sm:grid-cols-3 lg:grid-cols-4">
        {results.map((d) => (
          <li key={d.iso} className="flex items-center gap-2 border-b border-border/60 py-2 text-sm">
            <Flag iso={d.iso} name={d.name} />
            <span className="truncate">{d.name}</span>
          </li>
        ))}
      </ul>
      {results.length === 0 && (
        <p className="mt-6 text-sm text-muted-foreground">No destinations match that search.</p>
      )}
    </Reveal>
  );
}
