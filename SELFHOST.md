# Self-hosting Passport Power

You only need this if you decide to move the site off Lovable's hosting. Nothing here
is required while the project is published on Lovable (with or without a custom domain).

## What the app is made of

- A TanStack Start v1 app (React 19 + Vite 7), built for an edge/serverless runtime.
- A Postgres database (Supabase) holding `countries`, `visa_rules` and `data_sync_runs`.
- A public HTTP route `/api/public/sync-visa-data` that pulls fresh visa rules from the
  RapidAPI "Visa Requirement" provider.
- A weekly `pg_cron` job in the database that calls that route.

## 1. Get the code

In Lovable: GitHub > Connect to GitHub, then push the project. You end up with a normal
repo you can clone:

```bash
git clone <your-repo-url> && cd <repo>
npm install
npm run dev     # http://localhost:8080
npm run build   # production build
```

## 2. Move the database

1. In Lovable: Cloud tab > Advanced settings > Export data. You get a SQL dump.
2. Create your own Postgres/Supabase project and import the dump.
3. Re-apply the SQL in `supabase/migrations/` if you start from an empty database instead.

## 3. Environment variables

Set these on your host (never commit them):

| Variable | Used by | Notes |
| --- | --- | --- |
| `VITE_SUPABASE_URL` | browser + server | your database project URL |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | browser + server | publishable/anon key, safe in the bundle |
| `SUPABASE_SERVICE_ROLE_KEY` | server only | needed by the sync route and sync-log reads |
| `VISA_API_KEY` | server only | your RapidAPI key for the visa provider |
| `SYNC_SECRET` | server only | shared secret the sync route checks before running |

## 4. Deploy

The build targets an edge runtime, so Cloudflare Workers/Pages is the closest match;
Netlify and Vercel also work with their TanStack Start presets. Deploy the output of
`npm run build` and set the variables above in the host's dashboard.

Avoid Node-only libraries if you extend the server code — the runtime has no real OS
filesystem or child processes.

## 5. Re-create the weekly sync

Either keep the `pg_cron` job (pointing it at your new domain) or use your host's
scheduler / an external cron service to POST weekly to:

```
https://yourdomain.com/api/public/sync-visa-data
```

with the `SYNC_SECRET` header the route expects. One run refreshes all 199 passports;
watch your RapidAPI plan quota.

## 6. Point DNS at the new host

Remove the Lovable A records (`@` and `www` → 185.158.133.1) and add whatever records
your new host asks for. Keep the domain at your registrar — it is yours regardless of
where the site is hosted.

## Rankings data

Global ranks, index scores and history live in `src/data/passports.ts`, generated from the
published Henley Passport Index PDFs. To update to a newer edition, replace the values in
that file; the live API feed only powers per-destination access lists and comparisons.
