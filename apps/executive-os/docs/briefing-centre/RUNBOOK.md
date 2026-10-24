# Executive Briefing Centre — runbook

All commands from `apps/executive-os` unless stated. Never paste tokens or chat ids into chat,
tickets or Git.

## 1. Environment variables

| Variable | Where | Purpose |
|---|---|---|
| `EXEC_DEMO_MODE` | demo deployment only | `1` = demo mode (reads/writes only `isDemo` rows, enables demo control) |
| `EXEC_OS_BASE_URL` | all | Origin used in Telegram links, e.g. `https://os.mgi-ventures.com` (https only) |
| `EXEC_BRIEFING_TOKEN` | all + n8n credential | Machine token for `/api/briefing/ingest` and `/run`. `openssl rand -base64 32` |
| `TELEGRAM_BOT_TOKEN` | existing | Same bot as the venture reports |
| `TELEGRAM_DEMO_CHAT_ID` | demo only | A private test chat Marcel controls. Must not be a live chat (refused) |
| `TELEGRAM_PRESIDENT_CHAT_ID` | live | The President's private chat with the bot |
| `OPERATIONS_CHAT_ID` | existing | MGI — Operations group (receives CRITICAL operational failures only) |
| `EXEC_TELEGRAM_LIVE` | live | `1` to allow live delivery. Unset = everything is DRY_RUN |
| `EXEC_ALERTS_PER_HOUR` | optional | Alert limit per recipient per hour (default 4, 1–20) |

## 2. Local development and demo (isolated, nothing leaves the machine)

One-time:
```bash
# from the repo root
PW=$(openssl rand -hex 16); mkdir -p .briefing-local
echo "{\"pgPassword\":\"$PW\",\"sqlEndpoint\":\"http://127.0.0.1:4480/sql\",\"pgPort\":15480}" > .briefing-local/config.json
docker network create mgi-brief
docker run -d --name mgi-brief-pg --network mgi-brief -e POSTGRES_PASSWORD=$PW -e POSTGRES_DB=main -p 127.0.0.1:15480:5432 public.ecr.aws/supabase/postgres:17.11.0.004
docker exec mgi-brief-pg psql -U supabase_admin -d main -c "GRANT ALL ON SCHEMA public TO postgres; ALTER SCHEMA public OWNER TO postgres; GRANT CREATE ON DATABASE main TO postgres; CREATE EXTENSION IF NOT EXISTS vector;"
docker run -d --name mgi-brief-proxy --network mgi-brief -e PG_CONNECTION_STRING=postgres://postgres:$PW@mgi-brief-pg:5432/main -p 127.0.0.1:4480:4444 ghcr.io/timowilhelm/local-neon-http-proxy:main
cd packages/database && DATABASE_URL="postgresql://postgres:$PW@127.0.0.1:15480/main" npx prisma db push
```
(Start the proxy after Postgres is up; if it logs `neon_control_plane … does not exist`, restart it.)

Run:
```bash
npm run briefing -- --local reset                                    # deterministic DEMO dataset
node scripts/briefing/start-local.mjs --build --users --mock-telegram # http://localhost:3460/briefing
```
Accounts and passwords: `.briefing-local/config.json` (git-ignored): `demo.president@example.test`
(SUPER_ADMIN) and `demo.dros.staff@example.test` (USER, DROS only). Messages "sent" to the mock
Telegram are in `.briefing-local/telegram-inbox.jsonl`.

Tests:
```bash
npm test                     # unit (incl. 19 briefing tests)
npm run test:briefing:db     # 10 DB integration tests (local Docker DB only, refuses otherwise)
node scripts/briefing/e2e-http.mjs   # 31 HTTP end-to-end checks against the running local server
```

## 3. Executive demonstration script

On https://os.mgi-ventures.com (or locally), signed in with the existing executive account, open **Briefing Centre → Demo control**:

1. **Reset demo data** — deletes only DEMO rows and reseeds (774 records, 2 meetings, 7 commitments).
   Old demo links from earlier runs then show "not found" — expected.
2. **Generate and deliver the morning brief** — open the Telegram demo chat (or the outbox):
   company performance, decisions waiting, the overdue collections commitment, exceptions.
3. Trigger business events one by one, then press **Process + deliver alerts** after each:
   * *Suspected book piracy* → HIGH alert → link opens the piracy case.
   * *New DROS construction inquiry* → HIGH alert → link → **Request an action** (assign site
     visit to the DROS commercial lead with a due date) → a tracked commitment appears.
   * *Approval request blocking a commitment* → HIGH alert → link → **Approve** → the blocked
     POS commitment moves to *in progress*; history shows who decided; the overview's "Waiting
     for your decision" shrinks.
   * *Barcode POS → Odoo sync failure* → CRITICAL (simulated: there is no Odoo connection).
   * Competitor, digital licensing, distributor credit, DROS quotation, registrations, minutes →
     no interruption; **Send digest** bundles them into one message.
4. **Scan for overdue / changes** → overdue invoice 0412 (Savannah, 2 747 200 XAF, 37–38 days),
   the overdue collections commitment, Bamenda shop sales −45 %, Bamenda stock-out risk.
5. Management action: open *Collections plan for distributors over 30 days* → shows owner,
   due date, 60 %, history. Show **Committed vs Delivered** (on-time rate, owner vs systemic
   delays). Accept the delivered *Paperless invoice delivery* → its resolution becomes
   *implemented* on the October meeting page.
6. Show **Finance → NMI Education**: daily bars, week/month comparisons, best titles,
   branches, regions, ageing, collections — every figure labelled DEMO.

## 4. Deployment — the original MGI OS (os.mgi-ventures.com)

The briefing centre is part of the normal MGI Executive OS: Vercel project `mgi-ecosystem`,
production branch `develop`, database = the existing MGI Neon database. There is no separate
staging application or database (consolidated 24 Oct 2026).

| Step | How |
|---|---|
| Schema | Additive only. Preview: `node scripts/briefing/prod-db.mjs run "npx prisma migrate diff --from-config-datasource --to-schema prisma/schema.prisma --script"` (from `packages/database`); review that only `exec_*` objects appear; apply the reviewed file with `prisma db execute --file`; re-run the diff with `--exit-code` → "No difference detected". Back up first: `prod-db.mjs backup <private dir>`. |
| Env (production) | `EXEC_DEMO_MODE=1` (development phase: only DEMO rows are shown), `EXEC_OS_BASE_URL=https://os.mgi-ventures.com`, `EXEC_BRIEFING_TOKEN` (private copy: `.briefing-local/production/secrets.json`). Telegram: existing `TELEGRAM_BOT_TOKEN`; demo messages go only to `TELEGRAM_DEMO_CHAT_ID` (unset → held as DRY_RUN). |
| Demo data | `node scripts/briefing/prod-db.mjs run "set EXEC_DEMO_MODE=1&& set TZ=UTC&& npx tsx scripts/briefing/cli.ts reset --confirm-db=<endpoint id>"` (or Demo control → Reset). Verify: `prod-db.mjs run "set TZ=UTC&& npx tsx scripts/briefing/verify-data.ts"`. Deletes/creates `isDemo` rows only; users, approvals, messages etc. are never touched. |
| Code | Merge to `develop` → Vercel builds and serves os.mgi-ventures.com. |
| Verify | `node scripts/briefing/smoke-production.mjs` (no-login checks), `node scripts/briefing/n8n-verify.mjs 2.9.4`, then sign in with your existing account. |
| n8n | *Custom Auth* credential `{"headers":{"x-exec-briefing-token":"<token>"}}`; import the three files in `docs/briefing-centre/n8n/` (base URL already https://os.mgi-ventures.com), select the credential, activate. |

**Going live later:** remove `EXEC_DEMO_MODE`, connect live feeds, set `TELEGRAM_PRESIDENT_CHAT_ID`
and `EXEC_TELEGRAM_LIVE=1` only after the President agrees to the alert rules.

**Rollback:** promote the previous production deployment in Vercel (older code ignores the
`exec_*` tables). Data: Demo control → Reset, or `DELETE FROM exec_* WHERE "isDemo"`.

## 5. Operations

* **Alert not received:** `/briefing/notifications` → status and error. DRY_RUN = delivery
  switched off or chat id missing (reason shown). FAILED 403 = bot removed/blocked → re-add the
  bot, then **Retry delivery**. FAILED "interrupted" = check the chat first, then retry.
* **Token rotation:** generate a new `EXEC_BRIEFING_TOKEN`, update Vercel env and the n8n
  credential together; old token stops working at the next deploy.
* **Too many alerts:** lower `EXEC_ALERTS_PER_HOUR` or raise thresholds in `rules.ts` (tests
  in `tests/briefing.test.ts` document the current thresholds).
* **Ownership:** module code is in `src/lib/briefing/*` (logic, pure where possible),
  `src/app/(os)/briefing/*` (pages), `src/app/api/briefing/*` (machine endpoints). Each file
  starts with a comment explaining its responsibility.

## 6. Related documents

* `SECURITY-n8n.md` — n8n findings (inline keys, open webhooks) and the secured approval-alert workflow.
* n8n versions: production runs **2.9.4**; the project specification names **2.4.8**. The three
  briefing workflows and the secured approval workflow were executed successfully on both in
  throwaway containers (`scripts/briefing/n8n-verify.mjs`, `n8n-verify-approval.mjs`). The node
  versions used (scheduleTrigger 1.2, manualTrigger 1, set 3.4, httpRequest 4.2, code 2,
  webhook 2, respondToWebhook 1.1) exist in both. No downgrade or upgrade is needed.
