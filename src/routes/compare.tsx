import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { z } from "zod";
import { Reveal } from "@/components/Reveal";
import { PassportCover } from "@/components/PassportCover";
import { CountrySearch } from "@/components/CountrySearch";
import { DeltaBadge } from "@/components/DeltaBadge";
import { AccessBar } from "@/components/AccessBar";
import { cn } from "@/lib/utils";
import { accessListFor, getPassport, type Passport } from "@/data/passports";

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

function Overlap({ left, right }: { left: Passport; right: Passport }) {
  const la = accessListFor(left).free;
  const ra = accessListFor(right).free;
  const rSet = new Set(ra.map((d) => d.iso));
  const lSet = new Set(la.map((d) => d.iso));

  const shared = la.filter((d) => rSet.has(d.iso));
  const onlyLeft = la.filter((d) => !rSet.has(d.iso));
  const onlyRight = ra.filter((d) => !lSet.has(d.iso));

  const columns = [
    { title: "Both visa-free", list: shared },
    { title: `Only ${left.name}`, list: onlyLeft },
    { title: `Only ${right.name}`, list: onlyRight },
  ];

  return (
    <Reveal delay={160} className="mt-20">
      <h2 className="text-3xl">Where the access diverges</h2>
      <div className="mt-8 grid gap-8 sm:grid-cols-3">
        {columns.map((c) => (
          <div key={c.title} className="rule-top pt-4">
            <p className="text-sm font-medium">{c.title}</p>
            <p className="tnum font-display mt-1 text-3xl">{c.list.length}</p>
            <ul className="mt-4 max-h-64 space-y-1.5 overflow-y-auto pr-2 text-sm text-muted-foreground">
              {c.list.map((d) => (
                <li key={d.iso} className="flex items-center gap-2">
                  <span className="leading-none">{d.flag}</span>
                  <span className="truncate">{d.name}</span>
                </li>
              ))}
              {c.list.length === 0 && <li>None</li>}
            </ul>
          </div>
        ))}
      </div>
    </Reveal>
  );
}
