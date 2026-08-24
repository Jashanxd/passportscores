# Publish Passport Power

## What happens on publish
- The site goes live at a `*.lovable.app` URL (a Lovable-managed subdomain).
- Backend (database, sync endpoint, weekly refresh job) is already live and unaffected.
- Future frontend changes require pressing Update in the publish dialog to reach the live site.

## Steps
1. Run a fresh security scan (the last one is stale) and report anything critical before going live.
2. Confirm page metadata: unique title, description, and social preview tags on Explorer, Rankings, Compare, and About.
3. Publish to the Lovable URL.
4. Share the live link and note how to rename the URL or connect a custom domain (Project settings > Domains).

## What I need from you
- A URL slug preference, e.g. `passport-power` (or leave it and I'll use the default).
- Whether the site should be public (anyone with the link) or private (workspace members only).
- If you want a custom domain, the domain name — DNS records get added by you in your registrar after publishing.
- Confirmation that the RapidAPI visa key should stay in use for the live site's weekly sync (it will keep consuming quota).

## Technical notes
- Publishing uses the last finalized project version; no code changes needed.
- The weekly `pg_cron` job hits the stable `project--<id>.lovable.app/api/public/sync-visa-data` URL, which keeps working after publish.
