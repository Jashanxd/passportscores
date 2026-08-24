# Update rankings to the August 2026 Henley index

The uploaded PDF has been parsed successfully: all 199 passports, their ranks (1 Singapore through 105 Afghanistan) and visa-free scores were extracted and every country name matched the existing dataset one-to-one, with no missing or extra entries.

## What changes

- Each passport's global rank and visa-free score are replaced with the August 2026 published values (Singapore 192, Japan/South Korea/UAE 188, Sweden 187, the 12-way tie at 186, ... Afghanistan 22).
- Tied ranks are preserved exactly as published, so regional ranks recompute correctly from the new standings.
- The previous edition's rank and score are kept as the comparison baseline, so the "movement" badges show real edition-over-edition change instead of stale numbers.
- The rank trajectory series ends on the new August 2026 rank.
- Visa-free / visa-on-arrival / eTA / visa-required splits are rescaled so the headline breakdown sums to the new published score; the live provider feed keeps driving the per-country Travel Access lists and comparison divergence, as it does today.

## Technical notes

- Only `src/data/passports.ts` changes: the `ROWS` tuples are regenerated from the parsed PDF (`rank`, `indexScore`, `prevRank`, `prevIndexScore`, access split, `history` tail). Region, cover colour and ISO codes stay as-is.
- Score buckets are derived proportionally from the published score with largest-remainder rounding, keeping `visaFree + visaOnArrival + eta = indexScore` and `visaRequired = 227 - indexScore`.
- No schema, hook, or route changes required; `usePassportData` already merges static index ranks with live counts.
- Verification: spot-check Singapore (#1, 192), Germany (#4, 186), India, and Afghanistan (#105, 22) in the preview and confirm rankings order plus zero console errors.
