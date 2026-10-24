# Executive Briefing Centre — architecture

Module of MGI Executive OS (`apps/executive-os`). Added 24 October 2026 on branch
`feature/exec-briefing-centre`. Purpose: give the President one place, reachable from Telegram,
that tells him what needs his attention across MGI companies, and lets him act on it.

## 1. Boundaries

| Concern | Owner | Briefing centre's role |
|---|---|---|
| Sales, invoices, payments, stock | NMI Automation OS / Odoo | Reads **source-linked snapshots** (`ExecRecord`, `sourceSystem` + `sourceRef`). Never posts accounting entries, never sends customer messages. |
| BookShield cases (piracy) | NMI BookShield (two-approver legal workflow) | Shows the case and lets the President request an action; legal steps stay in NMI. |
| Programme registrations | web-rogers (`rogers_registrations`) | Planned feed via ingest; demo uses its own DEMO rows, never the live table. |
| Meetings, resolutions, commitments | **Briefing centre** (native) | Source of truth. |
| Telegram delivery for executive content | **Briefing centre** outbox | Existing venture-report alerts (`lib/telegram.ts`) are unchanged. |
| Scheduling | n8n (3 small workflows) | n8n only calls `POST /api/briefing/run`; all logic is in the OS and tested. |

No existing table, enum or route was changed. New tables: `exec_records`, `exec_meetings`,
`exec_decisions`, `exec_commitments`, `exec_activities`, `exec_events`, `exec_notifications`
(see `packages/database/prisma/schema.prisma`, section EXECUTIVE BRIEFING CENTRE). Status fields
are strings validated in code (`lib/briefing/types.ts`) so the change is a purely additive
`prisma db push`.

## 2. Pipeline

```
 source system / n8n / demo scenario                 time (n8n schedule)
            │  POST /api/briefing/ingest                    │  POST /api/briefing/run {job}
            ▼  (token, zod, mode guard)                     ▼
     ExecRecord (upsert by ref) ──► ExecActivity        scan.ts  (overdue commitments, receivables
            │                                             │        30/60/90 d, shop-sales swings,
            ▼                                             │        low stock, stale registrations)
     ExecEvent  (UNIQUE dedupeKey, priority from rules.ts) ◄┘
            │  processEvents(): per recipient → routeEvent()
            ├── ALERT  → ExecNotification (UNIQUE dedupeKey, link validated)
            └── DIGEST → waits for runDigest() / the morning brief
                               │  deliverPending(): claim (PENDING→SENDING, one statement)
                               ▼
                 Telegram (demo chat | live chat | DRY_RUN)  → SENT / retry / FAILED
                               │
                               ▼
            President taps link → /login?next=… → exact record page → action
            → conditional update + ExecActivity + follow-up ExecEvent (only when useful)
```

* **Idempotency everywhere.** Events and notifications have unique dedupe keys (namespaced
  `demo:` / `live:`). Repeated ingest, repeated scans and concurrent dispatchers store each fact
  once and send each alert once (proven by `tests/integration/briefing.db.ts`).
* **No transactions.** `@mgi/database` uses the Neon HTTP adapter (no transactions). Every state
  change is a single conditional `update … WHERE id AND status` (P2025 = someone else won →
  409). Demo reset uses single `DELETE` and chunked multi-row `INSERT` statements.
* **Neon adapter quirk found here:** unique violations surface as SQLSTATE `23505`, not `P2002`.
  `isUniqueViolation()` accepts both.

## 3. Contracts

### 3.1 Ingest — `POST /api/briefing/ingest`, schema `mgi.exec.ingest.v1`

Header `x-exec-briefing-token: <EXEC_BRIEFING_TOKEN>` (≥ 32 chars; unset → 503, wrong → 401).
Body ≤ 32 KB. Shape (`lib/briefing/ingest.ts`, zod):

```json
{
  "schema": "mgi.exec.ingest.v1", "isDemo": false, "source": "NMI", "companySlug": "nmi",
  "record": { "ref": "NMI-INV-2026-0412", "recordType": "INVOICE", "domain": "RECEIVABLES",
              "title": "…", "status": "PARTIAL", "amount": 4247200, "currency": "XAF",
              "occurredAt": "2026-08-17T11:00:00Z", "dueAt": "2026-09-16T11:00:00Z",
              "sourceRef": "<id in NMI>", "parentRef": "NMI-ORD-0412", "data": { … } },
  "signal": { "kind": "RECEIVABLE_OVERDUE", "subject": "…", "summary": "…",
              "facts": { "outstanding": 2747200, "daysOverdue": 38 },
              "display": { "Outstanding": "2 747 200 XAF" }, "actionRequired": "…" }
}
```

Rules: the sender **cannot set priority** (MGI classifies, `rules.ts`); `isDemo` must equal the
deployment mode (else 409); demo refs must start `DEMO-` and live refs must not; source `DEMO`
is reserved for demo; a ref belongs to one company. Same ref + same status = duplicate (no new
event); a status change is a new fact (new event, history row).

### 3.2 Jobs — `POST /api/briefing/run` `{ "job": … }`

`scan` · `process` · `deliver` · `digest` · `morning` · `cycle` (scan + process + deliver).
Machine token as above, or a signed-in SUPER_ADMIN session. All idempotent.

### 3.3 Deep links

`/briefing/records/<id>` · `/briefing/commitments/<id>` · `/briefing/meetings/<id>` ·
`/briefing/finance/<company>` · `/briefing/notifications`. Base URL `EXEC_OS_BASE_URL` (https,
or loopback http for local). An alert is **never sent** if its record does not exist or the base
URL is invalid — the outbox row is marked FAILED with the reason. Middleware passes
`?next=<path>` to `/login`; `safeNextPath()` accepts same-site paths only (no `//`, scheme,
backslash, CR/LF, `/api/`, `/login`).

## 4. Notification rules (`lib/briefing/rules.ts`, `recipients.ts`)

* Priority per event kind with thresholds (e.g. receivable ≥ 2 M XAF or ≥ 60 days → HIGH;
  construction inquiry ≥ 50 M XAF → HIGH; POS sync failure ≥ 10 tickets → CRITICAL; commitment
  blocked on a management decision → HIGH).
* CRITICAL/HIGH → immediate alert; NORMAL/LOW → digest (12:00, 17:00) and morning brief (06:30).
* Quiet hours 22:00–06:00 WAT: HIGH waits for the morning brief; CRITICAL still goes out.
* Rate limit: `EXEC_ALERTS_PER_HOUR` (default 4) per recipient; hard ceiling 8/h incl. CRITICAL.
  Overflow goes to the digest, most important first.
* Recipients: `president` (all companies/domains, alerts ≥ HIGH, brief + digest) and
  `operations` = existing **MGI — Operations** group (only `OPERATIONS` domain, only CRITICAL —
  never finance, piracy, commitments/performance).
* Retries: 1 min, 5 min, 30 min, honouring Telegram `retry_after`; 400/401/403 fail
  immediately. A FAILED delivery creates one `OPERATIONAL_FAILURE` event per recipient per hour
  (no storms). Rows stuck in SENDING > 5 min become FAILED ("check the chat, then retry") —
  never resent blindly. Executives retry from `/briefing/notifications`.
* Tokens never appear in errors (`redact()`); chat ids live only in env vars.

## 5. Telegram delivery and demo/live separation

| Mode | Where messages go |
|---|---|
| any, no `TELEGRAM_BOT_TOKEN` | DRY_RUN (stored, visible in the outbox) |
| demo (`EXEC_DEMO_MODE=1`) | only `TELEGRAM_DEMO_CHAT_ID`; unset → DRY_RUN; equal to a live chat id → refused |
| live | only with `EXEC_TELEGRAM_LIVE=1` **and** the recipient's chat id (`TELEGRAM_PRESIDENT_CHAT_ID`, `OPERATIONS_CHAT_ID`) |

Demo separation is enforced in five places: deployment mode (`mode.ts`); every query filters
`isDemo = mode`; ingest refuses the other mode; `DEMO-` reference prefix; DEMO banner/tags in
every page and `🧪 DEMO` header + footer in every message. Demo reset deletes `isDemo = true`
rows only. Recommended: run the demo as a **separate deployment with its own database**.

## 6. Access control (`lib/briefing/access.ts`)

* Every page calls `requireBriefingPage()` → `requirePageUser()` (session + DB-active check)
  — enforced by `tests/stabilisation.test.ts`.
* SUPER_ADMIN/ADMIN: all companies, may decide. USER: only companies with a membership (read
  fresh from the DB), may decide only where the membership role is ADMIN. Not visible = 404,
  same as not existing.
* Outbox and demo control: SUPER_ADMIN only. Server actions re-authenticate on every call.

## 7. Committed vs Delivered (`lib/briefing/accountability.ts`)

Measures agreed deliverables only: owner role, due date, evidence of delivery, acceptance.
Delays are split into **owner-attributable** (cause OWNER or none) and **systemic** (missing
resources, changed priorities, waiting on management, external). No attendance, presence,
device or activity data exists or is inferred.

## 8. Known limitations

* No live source feeds yet (NMI/Odoo/web-rogers adapters to be built — see COVERAGE.md).
* Minutes/decisions have no entry form yet (demo seeds them; next step: secretary form).
* Telegram inline commands (reply from Telegram) are not implemented; the link opens the OS.
* Documents are listed by name only (no file store chosen yet).
