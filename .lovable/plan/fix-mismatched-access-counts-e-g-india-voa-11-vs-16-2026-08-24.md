# Fix mismatched access counts (e.g. India VOA 11 vs 16)

## What's happening

India has no real per-destination rules stored yet (the provider quota ran out before it was covered), so the page mixes two different sources:

- The headline stats and the coloured access bar use India's stored snapshot counts: visa-free 47, visa-on-arrival 11, eTA 4, required 165 — measured against 227 destinations.
- The "Travel access" tabs use the bundled estimated list generator, which spreads only the 199 countries in the built-in table across those same thresholds. Rounding at the bucket edges lands 16 countries in the VOA bucket instead of 11.

So the two numbers can never agree today; they count different universes.

## The fix

Make one source of truth for the breakdown numbers on a passport page:

1. Rewrite the estimated-list generator so it allocates exact quotas: compute each bucket's share of the 199 listable countries from the passport's counts, then fill the buckets to those exact sizes (largest-remainder rounding so the four sizes sum to 198 destinations).
2. Feed the tab counts, the access bar and the stat tiles from the same lists whenever the data is estimated, so tab count = list length = bar segment.
3. When real rules exist for a passport, keep using the real rules for both the lists and the numbers (already consistent).
4. Keep the existing "estimated distribution" note, and make it explicit that estimated figures are scaled to the 199 indexed countries.

## Technical notes

- `src/data/passports.ts` — replace the hash-threshold logic in `accessListFor` with deterministic quota-based allocation (keep the seeded ordering so lists stay stable per country, keep alphabetical sort).
- `src/hooks/usePassportData.ts` — `useAccessLists` also returns the effective counts derived from the lists; when estimated, `useLivePassport` consumers use those counts.
- `src/routes/index.tsx` and `src/routes/compare.tsx` — pass the effective counts into `AccessBar` and the destination stat tiles instead of raw snapshot fields.
- No database or sync changes; India will switch to real rules automatically once the provider quota allows a full sync.
