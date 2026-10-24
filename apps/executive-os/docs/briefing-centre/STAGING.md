# Executive Briefing Centre — hosted staging

| | |
|---|---|
| URL | https://mgi-exos-preview.vercel.app/briefing |
| Vercel project | `mgi-exos-preview` (`prj_fVvaYLzh68oc8n8iz0PPMVj38eGM`), team buddy1974's projects |
| Isolation | separate project, **not Git-linked**, own `*.vercel.app` domains only, env vars on the **preview** target only, Vercel Authentication on all deployments |
| Database | Neon *claimable* instant database (free, separate from every production database; it was empty before the schema was applied). **Expires 27 Oct 2026 12:31 UTC unless claimed** — claim link in `.briefing-local/staging/staging-db.env` |
| Mode | `EXEC_DEMO_MODE=1` — only DEMO rows are read or written |
| Secrets | `.briefing-local/staging/` (git-ignored): DB URLs, claim link, `EXEC_BRIEFING_TOKEN`, automation-bypass secret, synthetic account passwords |

## Access for inspection

1. Open https://mgi-exos-preview.vercel.app/briefing — Vercel asks you to sign in with the Vercel
   account that owns the team (team members only).
2. App sign-in: `demo.president@example.test` (SUPER_ADMIN) or `demo.dros.staff@example.test`
   (USER, DROS only). Passwords: `.briefing-local/staging/staging-secrets.json`.

## Reproducible procedure (all from `apps/executive-os`)

| Step | Command / action |
|---|---|
| 1. Database | `npx neon-new -y -e <private file>` (claimable) **or** a new Neon project/branch with no production data. Never a branch of production. |
| 2. Schema | `DATABASE_URL=<direct url> npx prisma db push` in `packages/database` (full schema on an empty DB; on an existing DB the change is the 7 additive tables in `schema-additive.sql`) |
| 3. Env vars (preview target) | `DATABASE_URL`, `DATABASE_URL_UNPOOLED`, `EXEC_DEMO_MODE=1`, `EXEC_OS_BASE_URL=https://mgi-exos-preview.vercel.app`, `EXEC_BRIEFING_TOKEN`, `EXEC_ALERTS_PER_HOUR=8`, `NEXT_PUBLIC_APP_URL`; existing `AUTH_SECRET`, `AUTH_TRUST_HOST`. Telegram: `TELEGRAM_BOT_TOKEN`, `TELEGRAM_DEMO_CHAT_ID` (see below). Never `TELEGRAM_PRESIDENT_CHAT_ID`, `OPERATIONS_CHAT_ID` or `EXEC_TELEGRAM_LIVE` here. |
| 4. Seed | `node scripts/briefing/with-staging-env.mjs npx tsx scripts/briefing/cli.ts reset --confirm-db=$(node scripts/briefing/with-staging-env.mjs --endpoint)` then the same with `accounts` |
| 5. Deploy | commit, then `node scripts/briefing/deploy-staging.mjs` (deploys exactly HEAD via `git archive`, preview target, staging project only, aliases the stable URL, appends to `.briefing-local/staging/deployments.log`) |
| 6. Verify | `node scripts/briefing/e2e-http.mjs --staging` (33 checks) · `node scripts/briefing/visual-check.mjs` and `--staff` (desktop + phone screenshots in `.briefing-local/staging/screens/`) · `node scripts/briefing/n8n-verify.mjs 2.9.4` and `2.4.8` |
| 7. Reset during a demo | Briefing Centre → Demo control → Reset (or step 4) |

Env changes on Vercel take effect on the **next deployment**: run step 5 after changing them.

## Telegram on staging

Uses the existing bot, delivering **only** to a private demo group:

1. Telegram: create a group titled e.g. `MGI Briefing — DEMO (Marcel only)`; add the existing MGI
   bot; send any message in the group.
2. Vercel → `mgi-exos-preview` → Settings → Environment Variables → add for **Preview** only:
   `TELEGRAM_BOT_TOKEN` = the existing bot token (the production copy is a *sensitive* variable and
   cannot be read back, so it has to be pasted from BotFather or your password manager).
3. Redeploy (step 5). Then in the OS: Briefing Centre → Telegram outbox → **Find the demo group's
   chat id** (lists only groups titled "DEMO").
4. Add `TELEGRAM_DEMO_CHAT_ID` (Preview) with that id, redeploy, then **Send Telegram
   connectivity test**. The app refuses a demo chat id that equals any live chat id.

## Monitoring and logs

* Vercel → `mgi-exos-preview` → Logs (runtime errors, function logs). The app logs no message
  text, tokens or chat ids.
* OS: `/briefing/notifications` (every message, status, attempts, error, rendered preview).
* n8n: executions list of the three workflows (once imported).

## Rollback

* App: `vercel rollback` / promote the previous staging deployment (see `deployments.log`), or
  re-alias `mgi-exos-preview.vercel.app` to it. Staging has no production traffic.
* Data: Demo control → Reset (only `isDemo` rows). Dropping the staging database affects nothing else.

## Production activation prerequisites (not done — each needs Marcel's approval)

1. Neon restore point, then `prisma db push` of the 7 additive tables on production
   (`schema-additive.sql`; verified to add tables/indexes/FKs only).
2. Merge to `develop` (production branch) after review.
3. Production env: `EXEC_OS_BASE_URL=https://os.mgi-ventures.com`, `EXEC_BRIEFING_TOKEN`,
   and — only after the President agrees to the alert rules — `TELEGRAM_PRESIDENT_CHAT_ID` and
   `EXEC_TELEGRAM_LIVE=1`. No `EXEC_DEMO_MODE` in production.
4. n8n: import the three workflows, Custom Auth credential with the token header, activate.
5. Live data feeds (COVERAGE.md "Needed for live data").
