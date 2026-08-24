import { DATA_YEAR } from "@/data/passports";

export function RankSparkline({ history }: { history: number[] }) {
  const w = 240;
  const h = 72;
  const max = Math.max(...history);
  const min = Math.min(...history);
  const span = Math.max(1, max - min);

  const points = history.map((v, i) => {
    const x = (i / (history.length - 1)) * (w - 8) + 4;
    // Lower rank number = stronger, so invert for an intuitive "up is better" line.
    const y = h - 10 - ((max - v) / span) * (h - 22);
    return [x, y] as const;
  });

  const d = points.map(([x, y], i) => `${i === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)}`).join(" ");
  const area = `${d} L${w - 4} ${h} L4 ${h} Z`;
  const last = points[points.length - 1]!;

  return (
    <div>
      <svg viewBox={`0 0 ${w} ${h}`} className="w-full" role="img" aria-label="Five-year rank trend">
        <path d={area} className="fill-primary/10" />
        <path
          d={d}
          fill="none"
          strokeWidth="1.5"
          className="stroke-primary"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx={last[0]} cy={last[1]} r="3" className="fill-primary" />
      </svg>
      <div className="mt-1 flex justify-between text-[11px] text-muted-foreground tnum">
        <span>{DATA_YEAR - history.length + 1}</span>
        <span>{DATA_YEAR}</span>
      </div>
    </div>
  );
}
