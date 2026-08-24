import { useMemo, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { z } from "zod";
import { ArrowRight, Search, X } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { PassportCover } from "@/components/PassportCover";
import { CountrySearch } from "@/components/CountrySearch";
import { AccessBar } from "@/components/AccessBar";
import { MobilityGauge } from "@/components/MobilityGauge";
import { RankSparkline } from "@/components/RankSparkline";
import { AnimatedNumber } from "@/components/AnimatedNumber";
import { DeltaBadge } from "@/components/DeltaBadge";
import { cn } from "@/lib/utils";
import { Flag } from "@/components/Flag";
import {
  ACCESS_LABELS,
  DATA_YEAR,
  GLOBAL_STATS,
  PASSPORTS,
  REGIONS,
  REGION_LABELS,
  TOTAL_DESTINATIONS,
  accessListFor,
  getPassport,
  type AccessKind,
  type Region,
} from "@/data/passports";

export const Route = createFileRoute("/")({
  validateSearch: z.object({ country: z.string().optional() }),
  head: () => ({
    meta: [
      { title: `Passport Index ${DATA_YEAR} — Measure Your Travel Freedom` },
      {
        name: "description",
        content:
          "Explore how powerful any passport is: visa-free access, global and regional rank, mobility score and year-over-year change across 227 destinations.",
      },
      { property: "og:title", content: `Passport Index ${DATA_YEAR} — Measure Your Travel Freedom` },
      {
        property: "og:description",
        content:
          "Search any country to see its passport cover, ranking and full travel-access breakdown.",
      },
    ],
  }),
  component: Explorer,
});

const ACCESS_TABS: { key: AccessKind; dot: string }[] = [
  { key: "free", dot: "bg-access-free" },
  { key: "voa", dot: "bg-access-voa" },
  { key: "eta", dot: "bg-access-eta" },
  { key: "required", dot: "bg-access-required" },
];

function Explorer() {
  const { country } = Route.useSearch();
  const navigate = useNavigate({ from: "/" });
  const passport = useLivePassport(getPassport(country ?? "SG")!);

  const [tab, setTab] = useState<AccessKind>("free");
  const [region, setRegion] = useState<Region | "all">("all");
  const [years, setYears] = useState(5);
  const [query, setQuery] = useState("");

  const trajectory = useMemo(
    () => passport.history10.slice(passport.history10.length - years),
    [passport, years],
  );

  const { lists, estimated } = useAccessLists(passport);
  const destinations = useMemo(() => {
    const q = query.trim().toLowerCase();
    return lists[tab].filter(
      (d) =>
        (region === "all" || d.region === region) &&
        (q === "" || d.name.toLowerCase().includes(q) || d.iso.toLowerCase().includes(q)),
    );
  }, [lists, tab, region, query]);

  return (
    <div>
      {/* Hero */}
      <section className="mx-auto max-w-6xl px-6 pt-20 pb-14">
        <Reveal>
          <p className="eyebrow">Global mobility · edition {DATA_YEAR}</p>
          <h1 className="mt-4 max-w-4xl text-6xl leading-[0.98] sm:text-7xl md:text-8xl">
            How far does your passport actually take you?
          </h1>
          <p className="mt-7 max-w-xl text-lg leading-relaxed text-muted-foreground">
            {GLOBAL_STATS.countries} passports scored against {TOTAL_DESTINATIONS} destinations.
            Search a country to see its rank, its access, and how much it moved this year.
          </p>
        </Reveal>

        <Reveal delay={90} className="mt-10 max-w-xl">
          <CountrySearch
            size="lg"
            value={passport.iso}
            onChange={(iso) => navigate({ search: { country: iso } })}
            placeholder="Search a country…"
          />
        </Reveal>

        <Reveal delay={140} className="mt-14 grid grid-cols-2 gap-8 sm:grid-cols-4">
          {[
            { label: "Passports indexed", value: GLOBAL_STATS.countries },
            { label: "Destinations tracked", value: GLOBAL_STATS.destinations },
            { label: "Average access", value: GLOBAL_STATS.averageAccess },
            { label: "Strongest–weakest gap", value: GLOBAL_STATS.gap },
          ].map((s) => (
            <div key={s.label} className="rule-top pt-4">
              <p className="tnum font-display text-4xl">
                <AnimatedNumber value={s.value} />
              </p>
              <p className="mt-1 text-xs text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </Reveal>
      </section>

      {/* Passport panel */}
      <section className="border-y border-border bg-card/60">
        <div className="mx-auto grid max-w-6xl gap-14 px-6 py-16 lg:grid-cols-[auto_1fr] lg:items-start">
          <div className="flex flex-col items-center gap-5">
            <PassportCover passport={passport} size="lg" />
            <p className="eyebrow">{passport.regionLabel}</p>
          </div>

          <div>
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <h2 className="text-5xl leading-none">{passport.name}</h2>
                <p className="mt-3 text-sm text-muted-foreground">
                  {passport.totalAccess} destinations without a prior visa ·{" "}
                  {passport.visaRequired} requiring one
                </p>
              </div>
              <Link
                to="/compare"
                search={{ a: passport.iso, b: passport.iso === "IN" ? "SG" : "IN" }}
                className="inline-flex items-center gap-2 border-b border-primary pb-1 text-sm text-primary transition-opacity hover:opacity-70"
              >
                Compare this passport <ArrowRight className="size-4" />
              </Link>
            </div>

            <div className="mt-10 grid gap-8 sm:grid-cols-3">
              <div className="rule-top pt-4">
                <p className="eyebrow">Global rank</p>
                <p className="tnum font-display mt-2 text-6xl leading-none">
                  <AnimatedNumber value={passport.rank} prefix="#" />
                </p>
                <DeltaBadge delta={passport.rankDelta} className="mt-3" suffix=" vs last year" />
              </div>
              <div className="rule-top pt-4">
                <p className="eyebrow">Regional rank</p>
                <p className="tnum font-display mt-2 text-6xl leading-none">
                  #{passport.regionalRank}
                </p>
                <p className="mt-3 text-xs text-muted-foreground">
                  of {passport.regionalTotal} in {passport.regionLabel}
                </p>
              </div>
              <div className="rule-top pt-4">
                <p className="eyebrow">Destinations</p>
                <p className="tnum font-display mt-2 text-6xl leading-none">
                  <AnimatedNumber value={passport.totalAccess} />
                </p>
                <DeltaBadge delta={passport.accessDelta} className="mt-3" suffix=" destinations" />
              </div>
            </div>

            <AccessBar passport={passport} className="mt-12" />
          </div>
        </div>
      </section>

      {/* Visualisations */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-14 md:grid-cols-2">
          <Reveal>
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="eyebrow">Rank trajectory</p>
                <h2 className="mt-3 text-3xl">Rank movement since {DATA_YEAR - years + 1}</h2>
              </div>
              <select
                value={years}
                onChange={(e) => setYears(Number(e.target.value))}
                aria-label="Trajectory period"
                className="mt-1 rounded-full border border-border bg-transparent px-2.5 py-1 text-xs text-muted-foreground transition-colors hover:text-foreground focus:outline-none"
              >
                <option value={3}>3Y</option>
                <option value={5}>5Y</option>
                <option value={10}>10Y</option>
              </select>
            </div>
            <div className="mt-6">
              <RankSparkline history={trajectory} />
            </div>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              {passport.name} sits at #{passport.rank} today, from #{passport.prevRank} a year ago.
              Hover the line to read any year. A higher line means a stronger position.
            </p>
          </Reveal>

          <Reveal delay={80} className="flex flex-col items-center justify-center">
            <MobilityGauge value={passport.mobility} />
            <p className="mt-4 max-w-xs text-center text-sm leading-relaxed text-muted-foreground">
              Normalised against {GLOBAL_STATS.strongest.name}, the strongest passport in the index.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Access breakdown */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <Reveal>
            <p className="eyebrow">Travel access</p>
            <h2 className="mt-3 text-4xl">Where a {passport.name} passport can go</h2>
          </Reveal>

          <div className="mt-10 flex flex-wrap gap-2">
            {ACCESS_TABS.map((t) => (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                className={cn(
                  "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition-colors",
                  tab === t.key
                    ? "border-foreground text-foreground"
                    : "border-border text-muted-foreground hover:text-foreground",
                )}
              >
                <span className={cn("size-2 rounded-full", t.dot)} />
                {ACCESS_LABELS[t.key]}
                <span className="tnum text-xs opacity-60">{lists[t.key].length}</span>
              </button>
            ))}
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            {(["all", ...REGIONS] as const).map((r) => (
              <button
                key={r}
                onClick={() => setRegion(r as Region | "all")}
                className={cn(
                  "rounded-sm px-2.5 py-1 text-xs transition-colors",
                  region === r
                    ? "bg-secondary text-secondary-foreground"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {r === "all" ? "All regions" : REGION_LABELS[r as Region]}
              </button>
            ))}
          </div>

          <div className="relative mt-6 max-w-sm">
            <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search destinations…"
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



          <ul className="mt-8 grid grid-cols-2 gap-x-8 gap-y-1 sm:grid-cols-3 lg:grid-cols-4">
            {destinations.map((d) => (
              <li key={d.iso} className="border-b border-border/60 py-2">
                <button
                  onClick={() => navigate({ search: { country: d.iso } })}
                  className="flex w-full items-center gap-2 text-left text-sm hover:text-primary"
                >
                  <Flag iso={d.iso} name={d.name} />
                  <span className="truncate">{d.name}</span>
                </button>
              </li>
            ))}
          </ul>
          {destinations.length === 0 && (
            <p className="mt-8 text-sm text-muted-foreground">
              No destinations in this category for the selected region.
            </p>
          )}
        </div>
      </section>

      {/* Leaderboard teaser */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <Reveal className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow">The index</p>
              <h2 className="mt-3 text-4xl">Strongest passports of {DATA_YEAR}</h2>
            </div>
            <Link
              to="/rankings"
              className="inline-flex items-center gap-2 border-b border-primary pb-1 text-sm text-primary transition-opacity hover:opacity-70"
            >
              See all {GLOBAL_STATS.countries} <ArrowRight className="size-4" />
            </Link>
          </Reveal>

          <ol className="mt-10 grid gap-x-12 sm:grid-cols-2">
            {PASSPORTS.slice(0, 10).map((p, i) => (
              <Reveal as="li" key={p.iso} delay={i * 30}>
                <button
                  onClick={() => navigate({ search: { country: p.iso } })}
                  className="flex w-full items-baseline gap-5 border-b border-border py-4 text-left transition-colors hover:text-primary"
                >
                  <span className="tnum font-display w-8 text-2xl text-muted-foreground">
                    {p.rank}
                  </span>
                  <Flag iso={p.iso} name={p.name} />
                  <span className="flex-1 truncate">{p.name}</span>
                  <span className="tnum text-sm text-muted-foreground">{p.totalAccess}</span>
                </button>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>
    </div>
  );
}
