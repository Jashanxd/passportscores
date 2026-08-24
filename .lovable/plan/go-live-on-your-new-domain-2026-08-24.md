# Go live on your new domain

Current state: the security warning about internal sync logs is fixed, the self-host guide
(`SELFHOST.md`) is in the repo, all four pages have their own titles and descriptions, and the
site is verified error-free. Publishing was started but not completed, so nothing is live yet.

## Step 1 — Publish
Publish the project (visibility: public, so anyone with the link can view). It goes live on a
Lovable subdomain within about a minute. This is only a staging address — your domain becomes
the primary URL in the next step.

## Step 2 — Connect your domain

If you bought it **through Lovable**: it is already attached. Open Project settings > Domains,
confirm it shows Active, and set the root domain as Primary. No DNS work needed.

If you bought it at an **outside registrar** (Namecheap, GoDaddy, Cloudflare, Hostinger…):
1. Project settings > Domains > Connect domain, enter `yourdomain.com`.
2. Lovable shows the records. At your registrar's DNS panel add:
   - `A` record, host `@`, value `185.158.133.1`
   - `A` record, host `www`, value `185.158.133.1`
   - `TXT` record, host `_lovable`, value the verification string Lovable displays
3. Delete any pre-existing A/CNAME records on `@` or `www` (registrars often add a parking page).
4. Add `www.yourdomain.com` in Lovable as a second entry, then set your preferred one as Primary.
5. If your DNS is proxied through Cloudflare, tick "Domain uses Cloudflare or a similar proxy"
   under Advanced — that switches to CNAME-based verification.
6. Wait for propagation. Usually minutes, up to 72 hours. SSL is issued automatically.

## Step 3 — Verify
I check the domain status until it reads Active, then load the live site over https on both the
root and `www` and click through Explorer, Rankings, Compare and About.

## What I need from you
- The domain name.
- Whether you bought it inside Lovable or at an outside registrar (and which one, if outside).

## Notes
- Custom domains require an active paid plan; the domain itself stays yours either way.
- No app code changes are needed for any of this.
