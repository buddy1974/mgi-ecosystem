# Coverage matrix — Executive Briefing Centre

Generated from `src/lib/briefing/coverage.ts` (also shown in the OS at `/briefing/coverage`). Audit date: 24 October 2026.

Classification of what existed **before** this work: Existing & functional · Existing but incomplete · Existing but broken · Designed, not implemented · Missing · Requires business information.

| Area | Capability | Found | Where (evidence) | Delivered now | Needed for live data |
|---|---|---|---|---|---|
| A Paperless | Digital invoicing (PDF) | Existing & functional | NMI /api/reports/invoice/[id] | Invoice records show delivery channel; paperless resolution tracked as a commitment | NMI invoice feed |
| A Paperless | E-mail / WhatsApp delivery to customers | Existing but incomplete | NMI WhatsApp inbound only; receivables agent drafts e-mails, never sends | Not built (no customer messages may be sent from MGI) | Decision on sending channel + WhatsApp Business API credentials in NMI |
| A Paperless | Digital approvals | Existing & functional | MGI Approval Center; briefing approval requests | Approve/decline in the briefing centre with history | Source systems post approval requests via ingest |
| A Paperless | Document storage / sharing / history | Missing | — | Meeting documents listed by name only (no file store) | Choose existing storage (Google Drive / NMI KnowledgeDoc) before building |
| B Self-service | Customer / distributor portal | Missing | NMI has staff roles only | Executive customer statement view (read-only) | Separate customer-facing app with its own auth — needs approval |
| B Self-service | Statements, balances, payment history | Existing but incomplete | NMI Invoice.paid running total, no payment ledger | Statement per customer from invoices + payments (demo) | NMI payment ledger or Odoo |
| B Self-service | Order-to-cash journey | Existing but incomplete | NMI orders → invoices; Distributor not linked to orders | Order → invoice → payments → stock movement, linked (demo order 0412) | NMI/Odoo feed |
| C Reporting | Daily / weekly / monthly sales, trends | Existing but incomplete | NMI /api/exec (session-only), owner report | Per-company finance page + morning brief | Token-authenticated NMI exec feed (new NMI endpoint, like BookShield signals) |
| C Reporting | Best titles, by branch, by region | Existing but incomplete | NMI has data, no MGI view | Computed from order lines | Same NMI feed |
| C Reporting | Receivables, collections, exceptions | Existing but incomplete | NMI overdue count/amount | Ageing buckets, collections, overdue alerts at 30/60/90 days | Same NMI feed + payment ledger |
| C Reporting | Verified vs demo figures | Existing & functional | Earlier fixes removed fake-as-live content | Mode per deployment; DEMO banner, tags, message footer; refs DEMO- | — |
| D Meetings | Agendas, minutes, resolutions, searchable history | Missing | — | Meetings → decisions → commitments, search | Secretary enters minutes (form not built — demo data seeded) |
| D Meetings | Assigned responsibilities, deadlines, follow-up | Missing | MGI Task model unused | Commitments with owner role, due date, evidence, acceptance, overdue alerts | Team accounts |
| E Odoo / POS | Odoo deployment, POS, barcode, accounting sync | Requires business information | No Odoo code, env vars or credentials in any repo | Simulated POS sync-failure scenario; POS fix tracked as blocked commitment | Odoo URL, version, modules, read-only API user — from the President’s team |
| E Odoo / POS | Branch stock, stock movements | Existing & functional | NMI Stock, StockHistory | Stock exceptions + movements per order (demo) | NMI feed |
| E Odoo / POS | Barcode / ISBN on products | Missing | No ISBN/barcode field in NMI Product | — | NMI schema change (separate approval) |
| F Accountability | Committed vs Delivered | Missing | NMI Tasks/HR evaluations exist (separate) | Per-owner on-time rate; owner vs systemic delay causes; no activity tracking | Team accounts; owners update their own commitments |
| G Continuity | Runbooks, documentation, maintainability | Existing but incomplete | tasks/*.md release docs | ARCHITECTURE, RUNBOOK, COVERAGE docs; small modules; tests | Internal owner named for the module |
| H Multi-company | Company-level and consolidated reporting | Existing but incomplete | Ventures pages; reads not company-scoped | Briefing pages company-scoped by membership; amounts never summed across entities | Memberships for non-executive users |
| NMI | BookShield verification / piracy cases | Existing & functional | NMI BookShield + signals API → MGI dashboard panel | Piracy alert → record → request action (legal steps stay in NMI) | Ingest from NMI signals (adapter not built; signals panel is live) |
| NMI | Editorial, print production, royalties, authors | Existing & functional | NMI pages (basic) | Print-delay exception in brief (demo) | NMI feed |
| NMI | Digital publishing / licensing | Missing | — | Licensing inquiry as an opportunity (demo) | Business decision |
| NMI | Competitor monitoring / market intelligence | Designed, not implemented | NMI n8n competitive_intel workflow listed | Competitor signal records in digest/brief (demo) | Who reports market intelligence, and how |
| NMI | Customer inquiries | Existing but incomplete | NMI e-mail/WhatsApp inbound | Business inquiry records | NMI feed |
| DROS | Inquiries, site visits, quotations, projects, milestones | Missing | drosconstruction.com has a mailto link only; no form, no DB | Inquiry/quotation/project records, HIGH alert for large inquiries (demo) | Inquiry form on the DROS site → ingest (needs approval) |
| Rogers | Registrations, incomplete registrations, payment status | Existing but incomplete | web-rogers RogersRegistration + PayUnit (webhook forgeable — known risk) | Registration digest + incomplete-after-48 h detector (demo) | Fix PayUnit webhook first, then feed registrations via ingest |
| MGI Group | Telegram reporting | Existing but incomplete | Venture-report alerts to MGI — Operations group (direct API call, fire-and-forget, no log) | Outbox with priority, dedupe, rate limit, quiet hours, retries, failure visibility, deep links | President chat id, demo chat id, EXEC_TELEGRAM_LIVE switch |
| MGI Group | n8n automation | Existing but incomplete | Only “New Approval Alert” (e-mail, unauthenticated webhook, API key in node) and “Social Post Publisher” | 3 small schedule workflows (JSON in repo, not imported) | Import into n8n + header credential; Cloudflare Access service token for verification |
