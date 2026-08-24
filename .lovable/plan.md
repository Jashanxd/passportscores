# Use your PS logo as the tab icon and header mark

The logo you uploaded at GoDaddy only applies to their own account/website builder — it never reaches this site. The browser tab icon comes from a file inside this project, which is still the Lovable default. You've now attached the PS mark, so here's the work.

## The uploaded file needs trimming first

The PNG is portrait with a lot of empty white space around the orange circle. Used as-is, the tab icon would be a tiny dot in a big white square. So the circle gets cropped out to a tight square before anything else.

## Steps

1. Trim the whitespace and crop the orange PS circle into a tight square, keeping full resolution and a transparent surround.
2. Write a 64x64 square PNG tab icon from that crop and point the site's icon reference at it, replacing the Lovable default and deleting the old icon file.
3. Add the trimmed logo to the header next to "Passport Scores", sized to the existing type height with matching spacing, wordmark unchanged.
4. Check the preview: header alignment on desktop and mobile widths, and the new tab icon loading.

## Technical notes

- Crop/resize with ImageMagick (`-trim`, then padded `-extent` to a square); icon written to `public/favicon.png`.
- Header logo stored as a CDN asset pointer in `src/assets/` and imported for the `<img>`; the favicon stays a real file in `public/` as required.
- `src/routes/__root.tsx`: replace the `links` entry `{ rel: "icon", href: "/favicon.ico" }` with the PNG entry, then remove `public/favicon.ico`.
- Logo `<img>` gets `alt="Passport Scores"`.

## After the change

The tab icon ships with a deploy, so publish once and hard-refresh — browsers cache favicons aggressively, so the old one can linger a few minutes on devices that already visited.
