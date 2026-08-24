import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpDown, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Reveal } from "@/components/Reveal";
import { DeltaBadge } from "@/components/DeltaBadge";
import { PassportCover } from "@/components/PassportCover";
import { cn } from "@/lib/utils";
import { DATA_YEAR, REGIONS, REGION_LABELS, type Passport, type Region } from "@/data/passports";
import { Flag } from "@/components/Flag";
import { useLivePassports } from "@/hooks/usePassportData";

export const Route = createFileRoute("/rankings")({
  head: () => ({
    meta: [
      { title: `Passport Rankings ${DATA_YEAR} — Strongest Passports Worldwide` },
      {
        name: "description",
        content:
          "The full global passport ranking: visa-free destinations, year-over-year movement and regional standing for 199 passports.",
      },
      { property: "og:title", content: `Passport Rankings ${DATA_YEAR}` },
      {
        property: "og:description",
        content: "Every passport ranked by visa-free access, with year-over-year movement.",
      },
    ],
  }),
  component: RankingsPage,
});

type SortKey = "rank" | "access" | "change";

function RankingsPage() {
  const [query, setQuery] = useState("");
  const [region, setRegion] = useState<Region | "all">("all");
  const [sort, setSort] = useState<SortKey>("rank");

  const passports = useLivePassports();

  const rows = useMemo(() => {
    const filtered = passports.filter(
      (p: Passport) =>
        (region === "all" || p.region === region) &&
        p.name.toLowerCase().includes(query.trim().toLowerCase()),
    );
    const sorted = [...filtered];
    if (sort === "access") sorted.sort((a, b) => b.totalAccess - a.totalAccess);
    else if (sort === "change") sorted.sort((a, b) => b.rankDelta - a.rankDelta);
    else sorted.sort((a, b) => a.rank - b.rank);
    return sorted;
  }, [passports, query, region, sort]);

  const top = passports.slice(0, 5);

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <Reveal>
        <p className="eyebrow">The index</p>
        <h1 className="mt-3 max-w-2xl text-5xl leading-[1.05] sm:text-6xl">
          Every passport, ranked by where it can take you.
        </h1>
      </Reveal>

      <Reveal delay={80} className="mt-14">
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-5">
          {top.map((p, i) => (
            <Link
              key={p.iso}
              to="/"
              search={{ country: p.iso }}
              className="group flex flex-col items-center gap-3 text-center"
            >
              <PassportCover passport={p} size="sm" />
              <div>
                <p className="tnum font-display text-2xl">
                  {i + 1 === p.rank ? `#${p.rank}` : `#${p.rank}`}
                </p>
                <p className="text-sm group-hover:text-primary">{p.name}</p>
                <p className="tnum text-xs text-muted-foreground">{p.totalAccess} destinations</p>
              </div>
            </Link>
          ))}
        </div>
      </Reveal>

      <div className="mt-16 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative sm:w-72">
          <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Filter countries"
            className="h-11 bg-card pl-9"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {(["all", ...REGIONS] as const).map((r) => (
            <button
              key={r}
              onClick={() => setRegion(r as Region | "all")}
              className={cn(
                "rounded-full border px-3 py-1.5 text-xs transition-colors",
                region === r
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border text-muted-foreground hover:text-foreground",
              )}
            >
              {r === "all" ? "All regions" : REGION_LABELS[r as Region]}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-8 overflow-x-auto">
        <table className="w-full min-w-[640px] border-collapse text-sm">
          <thead>
            <tr className="border-b border-border text-left">
              <SortHeader label="Rank" active={sort === "rank"} onClick={() => setSort("rank")} />
              <th className="py-3 font-normal text-muted-foreground">Passport</th>
              <th className="py-3 font-normal text-muted-foreground">Region</th>
              <SortHeader
                label="Destinations"
                active={sort === "access"}
                onClick={() => setSort("access")}
                align="right"
              />
              <SortHeader
                label="YoY"
                active={sort === "change"}
                onClick={() => setSort("change")}
                align="right"
              />
            </tr>
          </thead>
          <tbody>
            {rows.map((p) => (
              <tr key={p.iso} className="border-b border-border/60 transition-colors hover:bg-accent/50">
                <td className="tnum font-display py-3 pr-4 text-xl">{p.rank}</td>
                <td className="py-3">
                  <Link
                    to="/"
                    search={{ country: p.iso }}
                    className="flex items-center gap-3 hover:text-primary"
                  >
                    <Flag iso={p.iso} name={p.name} />
                    {p.name}
                  </Link>
                </td>
                <td className="py-3 text-muted-foreground">{p.regionLabel}</td>
                <td className="tnum py-3 text-right">{p.totalAccess}</td>
                <td className="py-3 text-right">
                  <DeltaBadge delta={p.rankDelta} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {rows.length === 0 && (
          <p className="py-12 text-center text-sm text-muted-foreground">No passports match.</p>
        )}
      </div>
    </div>
  );
}

function SortHeader({
  label,
  active,
  onClick,
  align = "left",
}: {
  label: string;
  active: boolean;
  onClick: () => void;
  align?: "left" | "right";
}) {
  return (
    <th className={cn("py-3 font-normal", align === "right" && "text-right")}>
      <button
        onClick={onClick}
        className={cn(
          "inline-flex items-center gap-1 transition-colors",
          active ? "text-foreground" : "text-muted-foreground hover:text-foreground",
        )}
      >
        {label}
        <ArrowUpDown className="size-3" />
      </button>
    </th>
  );
}
