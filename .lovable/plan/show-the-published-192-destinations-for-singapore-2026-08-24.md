# Show the published 192 destinations for Singapore

Confirmed cause: the headline destination number is not the index figure. `useLivePassport` / `useLivePassports` overwrite each passport's counts with the live provider snapshot, and that feed only covers the 198 indexed countries in the site's own table — not the full 227 destinations Henley scores against. So Singapore's published 192 gets replaced by the live tally of 182.

## Fix

- Headline figures (destinations without a prior visa, the visa-free / on-arrival / eTA / required split, mobility) come from the published August 2026 index, so Singapore reads 192 and Germany 186 — matching the PDF and matching the rank order.
- The live provider feed stays exactly where it is useful: the Travel Access country lists and the comparison divergence cards, which need per-destination rules rather than totals.
- The existing note stays, clarifying that headline totals follow the published index (227 destinations) while the country lists reflect the live rule feed for the countries covered here.

## Technical notes

- `src/hooks/usePassportData.ts`: stop merging snapshot counts into the passport object. `useLivePassport` and `useLivePassports` return the static index records (rank, score, split, mobility) unchanged; `useAccessLists` keeps querying `getAccessRules` for the lists.
- No changes to routes, the data file, or the backend; `src/routes/index.tsx`, `rankings.tsx`, and `compare.tsx` keep reading `totalAccess`, which will now equal the published score.
- Verification: check Singapore shows 192, Germany 186, Afghanistan 22, and confirm the Travel Access tabs still populate with live rules and no console errors.
