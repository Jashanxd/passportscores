# Fix the ranks: replace the synthetic index with the real 2026 standings

## What's wrong today

The ranks shown on Compare (and everywhere else) come from a hand-built table in
`src/data/passports.ts`. Only the top of that table matches the published 2026 index —
below roughly the top 40 the numbers were generated, not sourced. Confirmed examples from
the current data:

- India: rank 143, 62 destinations (published 2026: mid-80s, ~57 destinations)
- China: rank 109, Thailand: rank 111, Pakistan: rank 195, Afghanistan: rank 199

The published index also uses **tied ranks** (an eight-way tie at #3, many ties further
down), so the highest rank number is around 100 — not 199. Our table assigns a unique
1–199 rank to every passport, which is why mid- and low-tier comparisons look off.

## The fix

1. **Source the real 2026 standings** for all 199 passports: rank (with ties) and the
   previous-year rank for the year-over-year badge. This is the only thing taken from the
   published index.
2. **Rewrite the rank columns** in `src/data/passports.ts` from that source: `rank`,
   `prevRank`, and `regionalRank` (recomputed from the corrected global ranks, ties
   preserved).
3. **Every access number comes from the API feed**: visa-free, visa-on-arrival, eTA, visa
   required, total destinations and the mobility score are all computed from the stored
   live rules for that passport, so the headline stats, the access bar and the Travel
   Access / divergence lists always show the same figures. The bundled estimate stays only
   as a fallback for passports the feed has no rules for (currently Kosovo), flagged as
   estimated in the UI.
4. **Rebuild the rank history sparkline** from the real previous-year ranks instead of the
   current extrapolation, so the trajectory chart stops showing invented flat runs.
5. **Handle ties in the UI**: rankings table and compare table need to read correctly when
   two passports share a rank (equal rank means neither side "wins" that row), and the
   rankings list should order tied passports alphabetically.
6. **Update the wording** so notes say ranks follow the 2026 index while all counts come
   from the live visa-rule feed (covering 199 countries, hence lower than index totals).
7. **Verify** against a spot-check list (Singapore, Japan, the #3 tie, UK, US, UAE, China,
   India, Pakistan, Afghanistan) on the Explore, Rankings and Compare pages.


## Technical notes

- The provider API returns per-destination visa rules only; it has no ranking feed, so
  ranks stay a curated dataset from the 2026 index that we refresh deliberately.
- Destination counts are re-derived from the feed in `usePassportData` (sorting/ordering of
  the rankings table then uses index rank, not the derived counts, so the two never fight).
- `ROWS` in `src/data/passports.ts` keeps its tuple shape; rank values change and the
  count columns become fallback-only, plus `extendHistory` is replaced with real series.
- Regional rank is derived, not typed in, so it can't drift from the global rank.
- No database or backend changes: the live sync and weekly cron are untouched.

## Out of scope

- Adding new pages or visual redesign.

