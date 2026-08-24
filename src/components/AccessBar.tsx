import { useEffect, useState } from "react";
import type { Passport } from "@/data/passports";
import { cn } from "@/lib/utils";

const SEGMENTS = [
  { key: "visaFree", label: "Visa-free", color: "bg-access-free" },
  { key: "visaOnArrival", label: "Visa on arrival", color: "bg-access-voa" },
  { key: "eta", label: "eTA", color: "bg-access-eta" },
  { key: "visaRequired", label: "Visa required", color: "bg-access-required" },
] as const;

export function AccessBar({
  passport,
  showLegend = true,
  className,
}: {
  passport: Passport;
  showLegend?: boolean;
  className?: string;
}) {
  const [grown, setGrown] = useState(false);
  useEffect(() => {
    setGrown(false);
    const id = requestAnimationFrame(() => setGrown(true));
    return () => cancelAnimationFrame(id);
  }, [passport.iso]);

  const total = passport.visaFree + passport.visaOnArrival + passport.eta + passport.visaRequired;

  return (
    <div className={className}>
      <div className="flex h-3 w-full overflow-hidden rounded-full bg-muted">
        {SEGMENTS.map((s) => (
          <div
            key={s.key}
            className={cn("h-full transition-[width] duration-1000 ease-out", s.color)}
            style={{ width: grown ? `${(passport[s.key] / total) * 100}%` : "0%" }}
            title={`${s.label}: ${passport[s.key]}`}
          />
        ))}
      </div>
      {showLegend && (
        <dl className="mt-5 grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-4">
          {SEGMENTS.map((s) => (
            <div key={s.key} className="rule-top pt-3">
              <dt className="flex items-center gap-2 text-xs text-muted-foreground">
                <span className={cn("size-2 rounded-full", s.color)} />
                {s.label}
              </dt>
              <dd className="tnum font-display mt-1 text-2xl">{passport[s.key]}</dd>
            </div>
          ))}
        </dl>
      )}
    </div>
  );
}
