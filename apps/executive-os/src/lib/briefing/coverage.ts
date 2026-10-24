// Capability coverage matrix (audit 2026-10-24). Source of truth for /briefing/coverage and
// docs/briefing-centre/COVERAGE.md. "found" = state before this work, per the mission's
// classification; "now" = what the briefing centre delivers; "live" = what real data needs.

export type Found = 'functional' | 'incomplete' | 'broken' | 'designed' | 'missing' | 'needs-business-info'

export interface CoverageRow { area: string; capability: string; found: Found; where: string; now: string; live: string }

export const COVERAGE: CoverageRow[] = [
  // A. Paperless
  { area: 'A Paperless', capability: 'Digital invoicing (PDF)', found: 'functional', where: 'NMI /api/reports/invoice/[id]', now: 'Invoice records show delivery channel; paperless resolution tracked as a commitment', live: 'NMI invoice feed' },
  { area: 'A Paperless', capability: 'E-mail / WhatsApp delivery to customers', found: 'incomplete', where: 'NMI WhatsApp inbound only; receivables agent drafts e-mails, never sends', now: 'Not built (no customer messages may be sent from MGI)', live: 'Decision on sending channel + WhatsApp Business API credentials in NMI' },
  { area: 'A Paperless', capability: 'Digital approvals', found: 'functional', where: 'MGI Approval Center; briefing approval requests', now: 'Approve/decline in the briefing centre with history', live: 'Source systems post approval requests via ingest' },
  { area: 'A Paperless', capability: 'Document storage / sharing / history', found: 'missing', where: '—', now: 'Meeting documents listed by name only (no file store)', live: 'Choose existing storage (Google Drive / NMI KnowledgeDoc) before building' },
  // B. Self-service
  { area: 'B Self-service', capability: 'Customer / distributor portal', found: 'missing', where: 'NMI has staff roles only', now: 'Executive customer statement view (read-only)', live: 'Separate customer-facing app with its own auth — needs approval' },
  { area: 'B Self-service', capability: 'Statements, balances, payment history', found: 'incomplete', where: 'NMI Invoice.paid running total, no payment ledger', now: 'Statement per customer from invoices + payments (demo)', live: 'NMI payment ledger or Odoo' },
  { area: 'B Self-service', capability: 'Order-to-cash journey', found: 'incomplete', where: 'NMI orders → invoices; Distributor not linked to orders', now: 'Order → invoice → payments → stock movement, linked (demo order 0412)', live: 'NMI/Odoo feed' },
  // C. Reporting
  { area: 'C Reporting', capability: 'Daily / weekly / monthly sales, trends', found: 'incomplete', where: 'NMI /api/exec (session-only), owner report', now: 'Per-company finance page + morning brief', live: 'Token-authenticated NMI exec feed (new NMI endpoint, like BookShield signals)' },
  { area: 'C Reporting', capability: 'Best titles, by branch, by region', found: 'incomplete', where: 'NMI has data, no MGI view', now: 'Computed from order lines', live: 'Same NMI feed' },
  { area: 'C Reporting', capability: 'Receivables, collections, exceptions', found: 'incomplete', where: 'NMI overdue count/amount', now: 'Ageing buckets, collections, overdue alerts at 30/60/90 days', live: 'Same NMI feed + payment ledger' },
  { area: 'C Reporting', capability: 'Verified vs demo figures', found: 'functional', where: 'Earlier fixes removed fake-as-live content', now: 'Mode per deployment; DEMO banner, tags, message footer; refs DEMO-', live: '—' },
  // D. Meetings
  { area: 'D Meetings', capability: 'Agendas, minutes, resolutions, searchable history', found: 'missing', where: '—', now: 'Meetings → decisions → commitments, search', live: 'Secretary enters minutes (form not built — demo data seeded)' },
  { area: 'D Meetings', capability: 'Assigned responsibilities, deadlines, follow-up', found: 'missing', where: 'MGI Task model unused', now: 'Commitments with owner role, due date, evidence, acceptance, overdue alerts', live: 'Team accounts' },
  // E. Odoo
  { area: 'E Odoo / POS', capability: 'Odoo deployment, POS, barcode, accounting sync', found: 'needs-business-info', where: 'No Odoo code, env vars or credentials in any repo', now: 'Simulated POS sync-failure scenario; POS fix tracked as blocked commitment', live: 'Odoo URL, version, modules, read-only API user — from the President’s team' },
  { area: 'E Odoo / POS', capability: 'Branch stock, stock movements', found: 'functional', where: 'NMI Stock, StockHistory', now: 'Stock exceptions + movements per order (demo)', live: 'NMI feed' },
  { area: 'E Odoo / POS', capability: 'Barcode / ISBN on products', found: 'missing', where: 'No ISBN/barcode field in NMI Product', now: '—', live: 'NMI schema change (separate approval)' },
  // F. Accountability
  { area: 'F Accountability', capability: 'Committed vs Delivered', found: 'missing', where: 'NMI Tasks/HR evaluations exist (separate)', now: 'Per-owner on-time rate; owner vs systemic delay causes; no activity tracking', live: 'Team accounts; owners update their own commitments' },
  // G. Continuity
  { area: 'G Continuity', capability: 'Runbooks, documentation, maintainability', found: 'incomplete', where: 'tasks/*.md release docs', now: 'ARCHITECTURE, RUNBOOK, COVERAGE docs; small modules; tests', live: 'Internal owner named for the module' },
  // H. Multi-company
  { area: 'H Multi-company', capability: 'Company-level and consolidated reporting', found: 'incomplete', where: 'Ventures pages; reads not company-scoped', now: 'Briefing pages company-scoped by membership; amounts never summed across entities', live: 'Memberships for non-executive users' },
  // NMI
  { area: 'NMI', capability: 'BookShield verification / piracy cases', found: 'functional', where: 'NMI BookShield + signals API → MGI dashboard panel', now: 'Piracy alert → record → request action (legal steps stay in NMI)', live: 'Ingest from NMI signals (adapter not built; signals panel is live)' },
  { area: 'NMI', capability: 'Editorial, print production, royalties, authors', found: 'functional', where: 'NMI pages (basic)', now: 'Print-delay exception in brief (demo)', live: 'NMI feed' },
  { area: 'NMI', capability: 'Digital publishing / licensing', found: 'missing', where: '—', now: 'Licensing inquiry as an opportunity (demo)', live: 'Business decision' },
  { area: 'NMI', capability: 'Competitor monitoring / market intelligence', found: 'designed', where: 'NMI n8n competitive_intel workflow listed', now: 'Competitor signal records in digest/brief (demo)', live: 'Who reports market intelligence, and how' },
  { area: 'NMI', capability: 'Customer inquiries', found: 'incomplete', where: 'NMI e-mail/WhatsApp inbound', now: 'Business inquiry records', live: 'NMI feed' },
  // DROS
  { area: 'DROS', capability: 'Inquiries, site visits, quotations, projects, milestones', found: 'missing', where: 'drosconstruction.com has a mailto link only; no form, no DB', now: 'Inquiry/quotation/project records, HIGH alert for large inquiries (demo)', live: 'Inquiry form on the DROS site → ingest (needs approval)' },
  // Rogers
  { area: 'Rogers', capability: 'Registrations, incomplete registrations, payment status', found: 'incomplete', where: 'web-rogers RogersRegistration + PayUnit (webhook forgeable — known risk)', now: 'Registration digest + incomplete-after-48 h detector (demo)', live: 'Fix PayUnit webhook first, then feed registrations via ingest' },
  // Group / Telegram
  { area: 'MGI Group', capability: 'Telegram reporting', found: 'incomplete', where: 'Venture-report alerts to MGI — Operations group (direct API call, fire-and-forget, no log)', now: 'Outbox with priority, dedupe, rate limit, quiet hours, retries, failure visibility, deep links', live: 'President chat id, demo chat id, EXEC_TELEGRAM_LIVE switch' },
  { area: 'MGI Group', capability: 'n8n automation', found: 'incomplete', where: 'Only “New Approval Alert” (e-mail, unauthenticated webhook, API key in node) and “Social Post Publisher”', now: '3 small schedule workflows (JSON in repo, not imported)', live: 'Import into n8n + header credential; Cloudflare Access service token for verification' },
]

export const FOUND_LABEL: Record<Found, string> = {
  functional: 'Existing & functional',
  incomplete: 'Existing but incomplete',
  broken: 'Existing but broken',
  designed: 'Designed, not implemented',
  missing: 'Missing',
  'needs-business-info': 'Requires business information',
}
