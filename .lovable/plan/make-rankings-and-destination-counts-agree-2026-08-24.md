# Make rankings and destination counts agree

## Why the numbers look wrong

Two different sources are feeding the same table. Rank comes from the published 2026 index, while the destination count comes from the live provider feed. The feed only covers the ~199 countries in the app's own list (not the 227 territories the published index counts), so its totals are lower and ordered slightly differently: the stored feed totals are Singapore 182, Japan 182, Germany 183, Spain 185. That is why Germany shows more destinations than the #1 passport.

## The fix

Headline figures come from the published 2026 index everywhere:

- Global rank, regional rank, year-over-year change, mobility score, destination totals, and the visa-free / on-arrival / eTA / required split all read from the bundled 2026 index.
- The live provider feed keeps powering the per-destination Travel Access lists (which specific countries are visa-free, on arrival, eTA, required) and the comparison overlap/divergence view.
- Because the lists come from the feed and the headline counts come from the index, the "Travel Access" section keeps its own derived counts on the tab labels, and the existing note explains that the per-country breakdown is provider-sourced across indexed countries.

After the change: Singapore #1 with 195 destinations, Japan #2 with 193, the #3 group at 192 — rank order and counts move in the same direction throughout Explore, Rankings, and Compare.

## Technical detail

- `src/hooks/usePassportData.ts`: stop overriding `visaFree`, `visaOnArrival`, `eta`, `visaRequired`, and `totalAccess` from the snapshot in `useLivePassport` and `useLivePassports`; those hooks return the static record for all index-level fields and keep serving live data only through `useAccessLists`.
- `src/routes/index.tsx` and `src/routes/compare.tsx`: headline stat cards read the passport record's counts; the Travel Access tab labels and list views continue to use the derived counts from `useAccessLists` so tab numbers match the rows shown.
- Footer freshness indicator stays as is, reworded so it refers to the visa-rule data rather than the ranking.
