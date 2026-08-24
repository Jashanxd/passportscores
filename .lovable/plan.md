# Publish Passport Power on your own domain

Goal: get the site live now on a custom domain you own (no `lovable.app` in the URL), with a documented path to self-host later if you ever leave Lovable.

## How hosting actually works
- Publishing puts the site on Lovable's hosting. A custom domain points DNS at Lovable, so the site is still served by Lovable.
- Custom domains need an active paid plan. If the plan lapses, the custom domain stops serving — the domain itself stays yours.
- Full independence requires self-hosting: export the code to GitHub and deploy it on your own host. The database, visa-API key and weekly sync job move with it.

## Step 1 — Publish (no domain needed yet)
1. Fresh security scan, report anything critical.
2. Confirm each page has its own title, description, and social preview tags.
3. Publish. The site goes live on a Lovable subdomain within about a minute. This is temporary — the custom domain replaces it as the primary URL.

## Step 2 — Get the domain
Two routes:

**A. Buy it inside Lovable (simplest)**
1. Project settings > Domains > Buy new domain.
2. Search a name (e.g. `passportpower.com`, `passportindex.app`), pick one from results.
3. Enter contact + payment details and complete purchase.
4. It auto-connects to the project — no DNS work by you.
5. DNS records (MX/TXT/SPF for email etc.) are editable later via the three-dot menu > Configure > Manage DNS records.

**B. Buy from an outside registrar (Namecheap, Cloudflare, GoDaddy)**
1. Buy the domain there.
2. In Lovable: Project settings > Domains > Connect domain, enter the domain.
3. Add the records Lovable shows at the registrar:
   - A record, name `@`, value `185.158.133.1`
   - A record, name `www`, value `185.158.133.1`
   - TXT record, name `_lovable`, value the verification string Lovable gives you
4. Add both `yourdomain.com` and `www.yourdomain.com` in Lovable and set one as Primary.
5. If your DNS sits behind Cloudflare's proxy, tick "Domain uses Cloudflare or a similar proxy" in the Advanced section — that switches to CNAME verification.
6. Wait for propagation (usually minutes, up to 72 hours). SSL is issued automatically.

## Step 3 — Verify
- Check domain status until it reads Active; investigate if it sits in Verifying/Failed longer than expected.
- Load the site over https on both root and www, click through Explorer, Rankings, Compare, About.

## Step 4 — Self-host escape hatch (documented, not executed now)
I'll write a short `SELFHOST.md` in the repo covering: connecting GitHub and exporting the code, building the TanStack Start app for your own host, exporting the database, the env vars needed (Supabase URL/keys, RapidAPI visa key), and re-creating the weekly visa sync as a cron job on the new host. You run it only if you decide to leave.

## What I need from you
- A domain name you like, and whether you want to buy it through Lovable or an outside registrar.
- Whether the published site should be public (anyone with the link) or private (workspace members only).
- Confirmation the RapidAPI visa key keeps running the weekly sync on the live site (it consumes your quota).

## Notes
- Buying a domain and connecting a custom domain both require a paid plan; the domain purchase is billed separately from the subscription.
- No app code changes are needed for any of this; the only file I'd add is `SELFHOST.md`.
