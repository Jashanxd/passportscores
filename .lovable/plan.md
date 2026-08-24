# Plan: Make Passport Scores discoverable on Google

## Current state
Google Search Console reports `https://passportscores.com` is currently "unknown to Google" and shows no search performance data for the last 28 days. The site is not yet indexed or ranking in Google web search.

## Goal
Get the site crawled, indexed, and ready to appear in Google search results.

## Steps
1. **Verify sitemap and robots.txt are live**
   - Confirm `/sitemap.xml` returns a valid sitemap with same-origin URLs.
   - Confirm `/robots.txt` allows all crawlers and points to the sitemap.

2. **Request indexing for the homepage**
   - Use the Google Search Console URL Inspection API to ask Google to (re-)inspect the root URL `https://passportscores.com/`.
   - Note: this reads the indexed version and triggers a recrawl; it is not an instant guarantee of ranking.

3. **Submit the sitemap to Search Console**
   - Submit `/sitemap.xml` to the verified `https://passportscores.com/` property so Google can discover all public routes.

4. **Confirm the verification meta tag is still in place**
   - Ensure the `google-site-verification` meta tag remains in `src/routes/__root.tsx` so Search Console access stays valid.

5. **Publish the site**
   - Deploy the latest changes (including any SEO fixes) so Google sees the live version.

## Files that may be touched
- `src/routes/__root.tsx` (only if the verification tag is missing)
- `src/routes/sitemap.xml.ts` (only if sitemap is broken or missing routes)
- `public/robots.txt` (only if it blocks crawlers or lacks the sitemap reference)

## Verification
- Search Console shows the homepage as either indexed or "URL submitted" / "Page fetch successful" after recrawl.
- The sitemap status in Search Console shows as submitted and processed without errors.
- Search Console begins reporting impressions/clicks within days to weeks.

## Notes
- Search Console data is delayed; even after a successful request, it can take hours to days for the index status to update.
- This plan does not guarantee rankings or traffic; it only ensures Google can discover and crawl the site.
