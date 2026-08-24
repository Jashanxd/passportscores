# Passport Power — Global Travel Freedom Index

A sleek, editorial site for exploring and comparing passport strength. No backend: a curated dataset ships with the app, and passport covers are rendered procedurally in CSS from each country's real passport color and emblem.

## Pages

**/ (Home / Explorer)**
- Editorial hero: oversized type, one line of positioning, a live-counting global stat strip (countries indexed, strongest passport, average visa-free access).
- Searchable country dropdown (type-ahead, flag + name). Selecting a country reveals the passport panel.
- Passport panel: procedural passport cover (correct cover color — burgundy / navy / green / black — with embossed emblem, country name, "PASSPORT" wordmark, gold foil-style text), next to key stats:
  - Global rank (large numeral) and regional rank
  - Visa-free destinations, visa-on-arrival, eTA, visa-required — as a segmented access bar
  - Year-over-year change (rank delta + destination delta, up/down indicator)
  - Mobility score
- Travel-access breakdown: filterable list of destinations grouped by access type, with region filter chips.
- Small data-viz set: horizontal access bar, a radial mobility gauge, and a 5-year rank sparkline.

**/rankings**
- Full ranking table: rank, flag, country, visa-free count, YoY change, region.
- Sort by rank / destinations / change; filter by region; search.
- Top 10 highlighted as an editorial leaderboard band above the table.
- Click any row to open that passport on the home explorer.

**/compare**
- Two-passport side-by-side comparison (2 slots, as chosen).
- Each column: procedural cover, rank, destinations, mobility score, region rank, YoY.
- Diff highlighting: the stronger value in each row is emphasized, with the delta shown between columns.
- Access-overlap section: destinations both can enter visa-free, and those exclusive to each.
- Deep-linkable via URL params so a comparison can be shared.

**/about**
- Short editorial explainer on methodology, access categories, and data vintage.

## Design

- Minimal, modern, editorial, travel-focused. Warm off-white paper background with deep ink text; a single restrained accent (passport burgundy) plus gold for rank emphasis. Dark mode supported.
- Typography-led: a display serif for headings/rank numerals, clean sans for UI and data. Generous whitespace, thin rules, tabular numerals for all stats.
- Passport covers are the hero visual element: subtle emboss, grain, and a soft shadow; slight tilt/parallax on hover.
- Subtle motion only: staggered fade-and-rise on section entry, animated number counters, bars that grow into place, cover flip when switching countries. No motion on every element.

## Technical

- Dataset in `src/data/passports.ts`: ~199 entries — ISO code, name, region, cover color, rank, regional rank, visa-free / visa-on-arrival / eTA / visa-required counts, mobility score, prior-year rank, and per-destination access maps for the top countries (aggregate counts for the rest).
- `src/components/PassportCover.tsx` renders covers procedurally from cover color + flag emoji emblem + country name — no image assets.
- Shared UI: `CountrySearch`, `StatBlock`, `AccessBar`, `RankSparkline`, `MobilityGauge`, `AnimatedNumber`.
- Routes: `src/routes/index.tsx` (replaces the placeholder), `rankings.tsx`, `compare.tsx`, `about.tsx`; shared header/footer in `__root.tsx`.
- Compare state in URL search params via TanStack Router `validateSearch`.
- Design tokens (colors, fonts, radii, shadows) defined in `src/styles.css` under `@theme`; fonts loaded via `<link>` in the root head. No hardcoded color utilities.
- Per-route `head()` metadata with unique titles and descriptions.
