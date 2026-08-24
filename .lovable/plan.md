# Plan: Header cleanup

## Goal
Remove the "2026" year label from the site header and make the header wordmark larger.

## Changes
1. In `src/routes/__root.tsx`, remove the `<span>` that renders `{DATA_YEAR}` inside `SiteHeader`.
2. Increase the wordmark size from `text-xl` to `text-2xl` so the header feels more prominent.

## Files affected
- `src/routes/__root.tsx`

## Verification
- Preview the header on any route; confirm "2026" no longer appears next to the logo and "Passport Scores" is visibly larger.
