# Use your own logo for Passport Scores

The logo you uploaded at GoDaddy only applies to their own account/website builder — it never reaches this site. The browser tab icon comes from a file inside this project, which is still the Lovable default. Once you attach the logo file in chat, here's what I'll do.

## What you need to do

Attach the logo image (PNG or SVG, ideally square-ish and high resolution) in your next message.

## What I'll do

1. Add the uploaded file to the project as the site logo asset.
2. Generate a square 64x64 tab icon from it (padded, not stretched, so a wide logo keeps its proportions) and replace the default Lovable icon.
3. Point the site's icon reference at the new file and remove the old default icon so nothing stale is served.
4. Place the logo in the header next to "Passport Scores", sized to match the existing type and spacing, with the wordmark kept as-is.
5. Confirm in the preview that the header renders correctly and the new tab icon loads.

## Technical notes

- Logo stored under `src/assets/` and imported as an ES module for the header; icon written to `public/favicon.png`.
- `src/routes/__root.tsx`: swap the `links` entry `{ rel: "icon", href: "/favicon.ico" }` for the PNG entry, then delete `public/favicon.ico`.
- Header logo rendered with an `alt` of "Passport Scores" for accessibility.

## After the change

The tab icon is a published asset, so you'll need to publish once for it to appear on your live domain, and hard-refresh (browsers cache favicons aggressively).
