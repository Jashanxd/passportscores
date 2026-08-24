import { cn } from "@/lib/utils";

/**
 * Flag emoji is unreliable on Windows/Linux, so flags render as small
 * raster images with a consistent aspect ratio instead.
 */
export function Flag({
  iso,
  name,
  className,
  size = 40,
}: {
  iso: string;
  name: string;
  className?: string;
  size?: 20 | 40 | 80 | 160;
}) {
  const code = (iso === "KOS" ? "XK" : iso).toLowerCase();
  return (
    <img
      src={`https://flagcdn.com/w${size}/${code}.png`}
      alt={`Flag of ${name}`}
      loading="lazy"
      width={size}
      height={Math.round(size * 0.75)}
      className={cn("h-3.5 w-5 shrink-0 rounded-[2px] object-cover", className)}
    />
  );
}
