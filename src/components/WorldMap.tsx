import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { geoNaturalEarth1, geoPath } from "d3-geo";
import { feature } from "topojson-client";
import { Minus, Plus, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";
import { NUMERIC_TO_ISO2 } from "@/data/isoNumeric";
import { getPassport } from "@/data/passports";
import { EXTRA_MARKERS, MAP_NAME_OVERRIDES } from "@/data/mapNames";

// 50m detail includes the small states (Singapore, Malta, Bahrain, Maldives…)
// that the 110m basemap drops; 110m stays as a fallback.
const TOPO_URL = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-50m.json";
const TOPO_FALLBACK_URL = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";
const WIDTH = 900;
const HEIGHT = 460;
const MIN_ZOOM = 1;
const MAX_ZOOM = 12;
/** Projected area (px²) below which a country also gets a clickable marker. */
const TINY_AREA = 12;

type Shape = { id: string; iso: string | null; name: string; d: string };
type Marker = { iso: string; name: string; x: number; y: number };

function clamp(v: number, min: number, max: number) {
  return Math.min(max, Math.max(min, v));
}

/** Keep the map from being dragged off screen. */
function clampOffset(o: { x: number; y: number }, z: number) {
  return {
    x: clamp(o.x, WIDTH * (1 - z), 0),
    y: clamp(o.y, HEIGHT * (1 - z), 0),
  };
}

export function WorldMap({
  selectedIso,
  onSelect,
  className,
}: {
  selectedIso?: string;
  onSelect: (iso: string) => void;
  className?: string;
}) {
  const [shapes, setShapes] = useState<Shape[] | null>(null);
  const [markers, setMarkers] = useState<Marker[]>([]);
  const [failed, setFailed] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [hover, setHover] = useState<{ name: string; iso: string | null; x: number; y: number } | null>(
    null,
  );

  const containerRef = useRef<HTMLDivElement>(null);
  const stateRef = useRef({ zoom, offset });
  stateRef.current = { zoom, offset };

  useEffect(() => {
    let alive = true;
    const load = (url: string) => fetch(url).then((r) => r.json());
    load(TOPO_URL)
      .catch(() => load(TOPO_FALLBACK_URL))
      .then((topo: any) => {
        if (!alive) return;
        const geo: any = feature(topo, topo.objects.countries);
        const projection = geoNaturalEarth1().fitExtent(
          [
            [8, 8],
            [WIDTH - 8, HEIGHT - 8],
          ],
          geo,
        );
        const path = geoPath(projection);
        const nextShapes: Shape[] = [];
        const nextMarkers: Marker[] = [];
        const seen = new Set<string>();

        for (const f of geo.features as any[]) {
          const d = path(f);
          if (!d) continue;
          const rawIso = NUMERIC_TO_ISO2[String(Number(f.id))] ?? null;
          const entry = rawIso ? getPassport(rawIso) : undefined;
          const iso = entry ? rawIso : null;
          const rawName = f.properties?.name ?? "Unknown";
          const name = entry?.name ?? MAP_NAME_OVERRIDES[rawName] ?? rawName;
          nextShapes.push({ id: String(f.id), iso, name, d } satisfies Shape);

          if (iso && entry) {
            seen.add(iso);
            // Micro-states are a couple of pixels wide — give them a marker too.
            if (path.area(f) < TINY_AREA) {
              const [cx, cy] = path.centroid(f);
              if (Number.isFinite(cx) && Number.isFinite(cy)) {
                nextMarkers.push({ iso, name, x: cx, y: cy });
              }
            }
          }
        }

        for (const [iso, coords] of Object.entries(EXTRA_MARKERS)) {
          const entry = getPassport(iso);
          if (!entry || seen.has(iso)) continue;
          const p = projection(coords);
          if (p) nextMarkers.push({ iso, name: entry.name, x: p[0], y: p[1] });
        }

        setShapes(nextShapes);
        setMarkers(nextMarkers);
      })
      .catch(() => alive && setFailed(true));
    return () => {
      alive = false;
    };
  }, []);

  const zoomAt = useCallback((factor: number, px: number, py: number) => {
    const { zoom: z, offset: o } = stateRef.current;
    const next = clamp(z * factor, MIN_ZOOM, MAX_ZOOM);
    const k = next / z;
    setZoom(next);
    setOffset(clampOffset({ x: px - (px - o.x) * k, y: py - (py - o.y) * k }, next));
  }, []);

  const zoomAtRef = useRef(zoomAt);
  zoomAtRef.current = zoomAt;

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const rect = el.getBoundingClientRect();
      const scale = WIDTH / rect.width;
      const dy = e.deltaY * (e.deltaMode === 1 ? 16 : e.deltaMode === 2 ? 100 : 1);
      zoomAtRef.current(
        Math.exp(-dy * 0.002),
        (e.clientX - rect.left) * scale,
        (e.clientY - rect.top) * scale,
      );
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  const drag = useRef<{ id: number; x: number; y: number; moved: boolean } | null>(null);
  const pendingIso = useRef<string | null>(null);

  const onPointerDown = (e: React.PointerEvent) => {
    drag.current = { id: e.pointerId, x: e.clientX, y: e.clientY, moved: false };
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const scale = WIDTH / rect.width;
    if (drag.current && drag.current.id === e.pointerId) {
      const dx = (e.clientX - drag.current.x) * scale;
      const dy = (e.clientY - drag.current.y) * scale;
      if (Math.abs(dx) > 2 || Math.abs(dy) > 2) drag.current.moved = true;
      drag.current.x = e.clientX;
      drag.current.y = e.clientY;
      setOffset((o) => clampOffset({ x: o.x + dx, y: o.y + dy }, stateRef.current.zoom));
    }
    setHover((h) => (h ? { ...h, x: e.clientX - rect.left, y: e.clientY - rect.top } : h));
  };

  const endDrag = (e: React.PointerEvent) => {
    if (drag.current?.id === e.pointerId) {
      const moved = drag.current.moved;
      drag.current = null;
      if (!moved && pendingIso.current) onSelect(pendingIso.current);
    }
    pendingIso.current = null;
  };

  const reset = () => {
    setZoom(1);
    setOffset({ x: 0, y: 0 });
  };

  const tooltip = useMemo(() => hover, [hover]);

  return (
    <div className={cn("relative", className)}>
      <div
        ref={containerRef}
        className="relative overflow-hidden rounded-sm border border-border bg-card/60 touch-none select-none"
      >
        {shapes ? (
          <svg
            viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
            className="block w-full cursor-grab active:cursor-grabbing"
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={endDrag}
            onPointerCancel={endDrag}
            onPointerLeave={() => setHover(null)}
            role="img"
            aria-label="World map — select a country to see its passport score"
          >
            <g transform={`translate(${offset.x} ${offset.y}) scale(${zoom})`}>
              {shapes.map((s, i) => {
                const isSelected = !!s.iso && s.iso === selectedIso;
                const isHovered = tooltip?.name === s.name;
                return (
                  <path
                    key={`${s.id}-${i}`}
                    d={s.d}
                    vectorEffect="non-scaling-stroke"
                    className={cn(
                      "stroke-border transition-colors duration-150",
                      isSelected
                        ? "fill-primary"
                        : isHovered
                          ? s.iso
                            ? "fill-primary/55"
                            : "fill-muted-foreground/40"
                          : "fill-secondary",
                      s.iso ? "cursor-pointer" : "cursor-default",
                    )}
                    strokeWidth={0.5}
                    onPointerEnter={(e) => {
                      const rect = containerRef.current?.getBoundingClientRect();
                      setHover({
                        name: s.name,
                        iso: s.iso,
                        x: rect ? e.clientX - rect.left : 0,
                        y: rect ? e.clientY - rect.top : 0,
                      });
                    }}
                    onPointerDown={() => {
                      pendingIso.current = s.iso;
                    }}
                  />
                );
              })}
            </g>
          </svg>
        ) : (
          <div className="flex h-[300px] items-center justify-center text-sm text-muted-foreground">
            {failed ? "Map could not be loaded — use the search above." : "Loading world map…"}
          </div>
        )}

        {tooltip && (
          <div
            className="pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-[140%] rounded-sm border border-border bg-background/95 px-2.5 py-1.5 text-xs whitespace-nowrap shadow-sm"
            style={{ left: tooltip.x, top: tooltip.y }}
          >
            <span className="font-medium">{tooltip.name}</span>
            {!tooltip.iso && <span className="ml-2 text-muted-foreground">not indexed</span>}
          </div>
        )}

        <div className="absolute right-3 bottom-3 flex flex-col gap-1">
          <MapButton label="Zoom in" onClick={() => zoomAt(1.5, WIDTH / 2, HEIGHT / 2)}>
            <Plus className="size-4" />
          </MapButton>
          <MapButton label="Zoom out" onClick={() => zoomAt(1 / 1.5, WIDTH / 2, HEIGHT / 2)}>
            <Minus className="size-4" />
          </MapButton>
          <MapButton label="Reset map view" onClick={reset}>
            <RotateCcw className="size-3.5" />
          </MapButton>
        </div>
      </div>
      <p className="mt-3 text-xs text-muted-foreground">
        Scroll or pinch to zoom, drag to pan, click a country to load its passport.
      </p>
    </div>
  );
}

function MapButton({
  label,
  onClick,
  children,
}: {
  label: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="flex size-8 items-center justify-center rounded-sm border border-border bg-background/90 text-muted-foreground transition-colors hover:text-foreground"
    >
      {children}
    </button>
  );
}
