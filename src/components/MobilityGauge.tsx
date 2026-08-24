import { useEffect, useState } from "react";

export function MobilityGauge({ value, label = "Mobility score" }: { value: number; label?: string }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const id = setTimeout(() => setProgress(value), 80);
    return () => clearTimeout(id);
  }, [value]);

  const r = 52;
  const c = 2 * Math.PI * r;
  const offset = c - (progress / 100) * c;

  return (
    <div className="flex flex-col items-center">
      <svg viewBox="0 0 128 128" className="size-32 -rotate-90">
        <circle cx="64" cy="64" r={r} fill="none" strokeWidth="6" className="stroke-muted" />
        <circle
          cx="64"
          cy="64"
          r={r}
          fill="none"
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={offset}
          className="stroke-primary transition-[stroke-dashoffset] duration-1000 ease-out"
        />
      </svg>
      <div className="-mt-[4.6rem] text-center">
        <p className="tnum font-display text-3xl">{value.toFixed(1)}</p>
      </div>
      <p className="eyebrow mt-10">{label}</p>
    </div>
  );
}
