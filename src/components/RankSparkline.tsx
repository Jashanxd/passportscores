import { useRef, useState } from "react";
import { DATA_YEAR } from "@/data/passports";

export function RankSparkline({ history }: { history: number[] }) {
  const w = 240;
  const h = 72;
  const max = Math.max(...history);
  const min = Math.min(...history);
  const span = Math.max(1, max - min);
  const startYear = DATA_YEAR - history.length + 1;
  const svgRef = useRef<SVGSVGElement>(null);
  const [hover, setHover] = useState<number | null>(null);

  const points = history.map((v, i) => {
    const x = (i / (history.length - 1)) * (w - 8) + 4;
    // Lower rank number = stronger, so invert for an intuitive "up is better" line.
    const y = h - 10 - ((max - v) / span) * (h - 22);
    return [x, y] as const;
  });

  const d = points.map(([x, y], i) => `${i === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)}`).join(" ");
  const area = `${d} L${w - 4} ${h} L4 ${h} Z`;
  const last = points[points.length - 1]!;

  const onMove = (e: React.PointerEvent<SVGSVGElement>) => {
    const rect = svgRef.current?.getBoundingClientRect();
    if (!rect) return;
    const rel = ((e.clientX - rect.left) / rect.width) * w;
    let best = 0;
    points.forEach(([x], i) => {
      if (Math.abs(x - rel) < Math.abs(points[best]![0] - rel)) best = i;
    });
    setHover(best);
  };

  const active = hover != null ? points[hover]! : null;

  return (
    <div>
      <div className="relative">
        <svg
          ref={svgRef}
          viewBox={`0 0 ${w} ${h}`}
          className="w-full touch-none"
          role="img"
          aria-label="Rank trend"
          onPointerMove={onMove}
          onPointerLeave={() => setHover(null)}
        >
          <path d={area} className="fill-primary/10" />
          <path
            d={d}
            fill="none"
            strokeWidth="1.5"
            className="stroke-primary"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {active && (
            <>
              <line
                x1={active[0]}
                x2={active[0]}
                y1={2}
                y2={h}
                className="stroke-foreground/25"
                strokeWidth="1"
                strokeDasharray="3 3"
              />
              <circle cx={active[0]} cy={active[1]} r="4" className="fill-background stroke-primary" strokeWidth="1.5" />
            </>
          )}
          <circle cx={last[0]} cy={last[1]} r="3" className="fill-primary" />
        </svg>

        {hover != null && (
          <div
            className="pointer-events-none absolute -top-2 z-10 -translate-x-1/2 -translate-y-full rounded-md border border-border bg-card px-2.5 py-1.5 text-center shadow-sm"
            style={{ left: `${(points[hover]![0] / w) * 100}%` }}
          >
            <p className="tnum text-[11px] text-muted-foreground">{startYear + hover}</p>
            <p className="tnum font-display text-lg leading-none">#{history[hover]}</p>
          </div>
        )}
      </div>
      <div className="tnum mt-1 flex justify-between text-[11px] text-muted-foreground">
        <span>{startYear}</span>
        <span>{DATA_YEAR}</span>
      </div>
    </div>
  );
}
