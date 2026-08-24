import { cn } from "@/lib/utils";
import type { Passport } from "@/data/passports";
import { Flag } from "@/components/Flag";

const COVER_BG: Record<string, string> = {
  burgundy: "bg-cover-burgundy",
  navy: "bg-cover-navy",
  green: "bg-cover-green",
  black: "bg-cover-black",
};

const SIZES = {
  sm: "w-32 aspect-[71/100] rounded-[6px] p-3",
  md: "w-44 aspect-[71/100] rounded-[8px] p-4",
  lg: "w-60 aspect-[71/100] rounded-[10px] p-6",
} as const;

interface Props {
  passport: Passport;
  size?: keyof typeof SIZES;
  className?: string;
  tilt?: boolean;
}

export function PassportCover({ passport, size = "lg", className, tilt = true }: Props) {
  return (
    <div
      key={passport.iso}
      className={cn(
        "grain cover-emboss relative flex flex-col justify-between select-none",
        "text-gold/85 transition-transform duration-500 ease-out will-change-transform",
        tilt && "hover:-translate-y-1.5 hover:rotate-[-1.2deg]",
        COVER_BG[passport.cover],
        SIZES[size],
        className,
      )}
      style={{ animation: "rise-in 0.55s cubic-bezier(0.22,1,0.36,1) both" }}
      aria-label={`${passport.name} passport cover`}
    >
      <div className="text-center leading-tight">
        <p
          className={cn(
            "font-display tracking-wide",
            size === "sm" ? "text-[9px]" : size === "md" ? "text-[11px]" : "text-sm",
          )}
        >
          {passport.name.toUpperCase()}
        </p>
      </div>

      <div className="flex flex-1 items-center justify-center">
        <div
          className={cn(
            "flex items-center justify-center rounded-full border border-current/40",
            size === "sm" ? "size-9 text-base" : size === "md" ? "size-12 text-xl" : "size-16 text-2xl",
          )}
        >
          <Flag
            iso={passport.iso}
            name={passport.name}
            size={80}
            className={cn(
              "rounded-[1px] opacity-80 mix-blend-luminosity",
              size === "sm" ? "h-4 w-6" : size === "md" ? "h-5 w-7" : "h-7 w-10",
            )}
          />
        </div>
      </div>

      <div className="space-y-1.5 text-center">
        <p
          className={cn(
            "font-display tracking-[0.22em]",
            size === "sm" ? "text-[8px]" : size === "md" ? "text-[10px]" : "text-xs",
          )}
        >
          PASSPORT
        </p>
        <div className="mx-auto h-px w-8 bg-current/40" />
        <p
          className={cn(
            "tracking-[0.3em] opacity-70",
            size === "sm" ? "text-[6px]" : size === "md" ? "text-[7px]" : "text-[9px]",
          )}
        >
          {passport.iso}
        </p>
      </div>
    </div>
  );
}
