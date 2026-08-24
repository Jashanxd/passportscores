# Fix Twitter/X link previews

Twitter shows no preview because the site declares `twitter:card: summary_large_image` but never provides a preview image, and no page sets `og:image`, `twitter:image`, or `og:url`. Without an absolute image URL, X falls back to a plain text link.

## What to build

1. Create a 1200x630 social preview image (editorial style matching the site: paper background, PS logo mark, "Passport Scores" wordmark, tagline "Global travel freedom, measured"), saved as a static file at `public/og-passport-scores.jpg` so it has a stable absolute URL: `https://passportscores.com/og-passport-scores.jpg`.
2. Add to each content route's `head()` — `/`, `/rankings`, `/compare`, `/about`:
   - `og:image` and `twitter:image` pointing at the absolute URL above
   - `og:image:width` 1200, `og:image:height` 630, and `og:image:alt`
   - `og:url` self-referencing the route, plus `rel="canonical"` on the leaf route
3. Keep `twitter:card: summary_large_image` and `og:type` in the root; add `og:site_name` and `twitter:site`-free defaults there only (no image on root, per per-page rule).

## Technical notes

- Image lives in `public/` rather than as a bundled asset so the URL is crawler-stable and not hashed.
- Titles/descriptions already differ per route; only image, `og:url`, and canonical are added.
- X caches previews. After publishing, the preview may still look stale until X refetches; you can force it in X's card validator by pasting the URL again.

## After approval

Publish the site so the new tags and image are live on `passportscores.com` — crawlers can only read the published version.
