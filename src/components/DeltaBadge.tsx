import { ArrowDownRight, ArrowUpRight, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

export function DeltaBadge({
  delta,
  suffix = "",
  className,
}: {
  delta: number;
  suffix?: string;
  className?: string;
}) {
  const Icon = delta > 0 ? ArrowUpRight : delta < 0 ? ArrowDownRight : Minus;
  return (
    <span
      className={cn(
        "tnum inline-flex items-center gap-1 text-xs",
        delta > 0 && "text-access-free",
        delta < 0 && "text-destructive",
        delta === 0 && "text-muted-foreground",
        className,
      )}
    >
      <Icon className="size-3.5" />
      {delta > 0 ? "+" : ""}
      {delta}
      {suffix}
    </span>
  );
}
