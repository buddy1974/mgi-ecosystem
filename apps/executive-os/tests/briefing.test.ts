import { test } from 'node:test'
import assert from 'node:assert/strict'
import { classifyPriority, routeEvent, isQuietHours, nextRetry, doualaDate, doualaDayStart, alertsPerHour, RATE_LIMITS } from '../src/lib/briefing/rules'
import { buildAlertMessage, buildDigestMessage, fitLines, TELEGRAM_SAFE_LENGTH } from '../src/lib/briefing/format'
import { briefingBaseUrl, safeNextPath, subjectPath } from '../src/lib/briefing/links'
import { resolveTarget, sendTelegram, redact, telegramApiBase } from '../src/lib/briefing/telegram-transport'
import { RECIPIENTS, getRecipient, mayReceive, mayReceiveAlert } from '../src/lib/briefing/recipients'
import { refMatchesMode, getBriefingMode } from '../src/lib/briefing/mode'
import { deliveryStats } from '../src/lib/briefing/accountability'
import { computeSalesMetrics, consistencyProblems, invoiceBalances, type InvoiceRow, type OrderRow, type PaymentRow } from '../src/lib/briefing/metrics'
import { buildDemoDataset, DISTRIBUTOR_ORDERS } from '../src/lib/briefing/demo-dataset'
import { IngestSchema } from '../src/lib/briefing/ingest'
import { CommitmentActionSchema, RecordActionSchema } from '../src/lib/briefing/actions'
import { scenarioPayloads } from '../src/lib/briefing/demo'

const E = (o: Record<string, string>) => o as unknown as NodeJS.ProcessEnv
const president = getRecipient('president')!
const operations = getRecipient('operations')!
const noon = new Date('2026-10-24T11:00:00Z') // 12:00 Douala

// ── Priority rules ───────────────────────────────────────────────────────────
test('priority rules: only material facts become HIGH/CRITICAL', () => {
  assert.equal(classifyPriority('RECEIVABLE_OVERDUE', { outstanding: 2_747_200, daysOverdue: 38 }), 'HIGH')
  assert.equal(classifyPriority('RECEIVABLE_OVERDUE', { outstanding: 870_000, daysOverdue: 33 }), 'NORMAL')
  assert.equal(classifyPriority('RECEIVABLE_OVERDUE', { outstanding: 100, daysOverdue: 61 }), 'HIGH')
  assert.equal(classifyPriority('SALES_CHANGE', { changePct: -43.7 }), 'HIGH')
  assert.equal(classifyPriority('SALES_CHANGE', { changePct: 17 }), 'LOW')
  assert.equal(classifyPriority('PIRACY_SUSPECTED', { suspectedCopies: 800 }), 'HIGH')
  assert.equal(classifyPriority('PIRACY_SUSPECTED', { suspectedCopies: 5000 }), 'CRITICAL')
  assert.equal(classifyPriority('CONSTRUCTION_INQUIRY', { estimatedValue: 180_000_000 }), 'HIGH')
  assert.equal(classifyPriority('CONSTRUCTION_INQUIRY', { estimatedValue: 5_000_000 }), 'NORMAL')
  assert.equal(classifyPriority('COMMITMENT_BLOCKED', { delayCause: 'MANAGEMENT_DEPENDENCY' }), 'HIGH')
  assert.equal(classifyPriority('COMMITMENT_BLOCKED', { delayCause: 'RESOURCES' }), 'NORMAL')
  assert.equal(classifyPriority('OPERATIONAL_FAILURE', { unpostedTickets: 14 }), 'CRITICAL')
  assert.equal(classifyPriority('PROGRAMME_REGISTRATION'), 'LOW')
  // Garbage facts never escalate.
  assert.equal(classifyPriority('RECEIVABLE_OVERDUE', { outstanding: 'lots' as unknown as number }), 'NORMAL')
})

test('routing: routine → digest; HIGH waits during quiet hours; CRITICAL always; limits hold', () => {
  const ctx = { now: noon, alertsLastHour: 0, recipientAllowsAlert: true }
  assert.equal(routeEvent('NORMAL', ctx).routing, 'DIGEST')
  assert.equal(routeEvent('HIGH', ctx).routing, 'ALERT')
  const night = new Date('2026-10-24T22:30:00Z') // 23:30 Douala
  assert.equal(isQuietHours(night), true)
  assert.equal(isQuietHours(noon), false)
  assert.equal(routeEvent('HIGH', { ...ctx, now: night }).routing, 'DIGEST')
  assert.equal(routeEvent('CRITICAL', { ...ctx, now: night }).routing, 'ALERT')
  assert.equal(routeEvent('HIGH', { ...ctx, alertsLastHour: RATE_LIMITS.alertsPerHour }).routing, 'DIGEST')
  assert.equal(routeEvent('CRITICAL', { ...ctx, alertsLastHour: RATE_LIMITS.criticalPerHour }).routing, 'DIGEST', 'storm ceiling applies to CRITICAL too')
  assert.equal(routeEvent('CRITICAL', { ...ctx, recipientAllowsAlert: false }).routing, 'DIGEST')
  assert.equal(routeEvent('HIGH', { ...ctx, alertsLastHour: 5, limit: 8 }).routing, 'ALERT')
  assert.equal(alertsPerHour(E({ EXEC_ALERTS_PER_HOUR: '8' })), 8)
  assert.equal(alertsPerHour(E({ EXEC_ALERTS_PER_HOUR: '999' })), RATE_LIMITS.alertsPerHour)
})

test('retry schedule: bounded, honours Telegram retry_after', () => {
  const t0 = new Date('2026-10-24T10:00:00Z')
  assert.equal(nextRetry(1, t0)!.getTime() - t0.getTime(), 60_000)
  assert.equal(nextRetry(3, t0)!.getTime() - t0.getTime(), 30 * 60_000)
  assert.equal(nextRetry(4, t0), null)
  assert.equal(nextRetry(1, t0, 120)!.getTime() - t0.getTime(), 120_000)
})

test('Douala business day', () => {
  assert.equal(doualaDate(new Date('2026-10-24T23:30:00Z')), '2026-10-25')
  assert.equal(doualaDayStart(new Date('2026-10-24T23:30:00Z')).toISOString(), '2026-10-24T23:00:00.000Z')
})

// ── Recipients ───────────────────────────────────────────────────────────────
test('recipient permissions: Operations group never receives finance, piracy or performance content', () => {
  for (const domain of ['RECEIVABLES', 'SALES', 'PIRACY', 'GOVERNANCE', 'INQUIRY']) {
    assert.equal(mayReceive(operations, { companySlug: 'nmi', domain }), false, domain)
  }
  assert.equal(mayReceiveAlert(operations, { companySlug: 'nmi', domain: 'OPERATIONS', priority: 'HIGH' }), false)
  assert.equal(mayReceiveAlert(operations, { companySlug: 'nmi', domain: 'OPERATIONS', priority: 'CRITICAL' }), true)
  assert.equal(mayReceiveAlert(president, { companySlug: 'dros', domain: 'INQUIRY', priority: 'HIGH' }), true)
  assert.equal(mayReceiveAlert(president, { companySlug: 'dros', domain: 'INQUIRY', priority: 'NORMAL' }), false)
  assert.equal(RECIPIENTS.filter((r) => r.morningBrief).map((r) => r.key).join(), 'president')
})

// ── Message formatting ───────────────────────────────────────────────────────
const alert = {
  priority: 'HIGH' as const, companySlug: 'nmi', domain: 'PIRACY', subject: 'Copies <script>alert(1)</script> & co',
  summary: 'Seller said "800" <b>copies</b>', facts: { display: { 'A&B': '<i>x</i>' } }, actionRequired: 'Decide',
  link: 'https://os.example.test/briefing/records/abc', linkLabel: 'record', isDemo: true,
}

test('alert message: every dynamic value is escaped, required parts present, DEMO marked', () => {
  const text = buildAlertMessage(alert)
  assert.ok(!text.includes('<script>'))
  assert.ok(text.includes('&lt;script&gt;'))
  assert.ok(text.includes('&lt;b&gt;copies&lt;/b&gt;'))
  assert.ok(text.includes('A&amp;B'))
  assert.match(text, /NMI Education/)
  assert.match(text, /Piracy/)
  assert.match(text, /HIGH/)
  assert.match(text, /➡️ <b>Action:<\/b> Decide/)
  assert.match(text, /<a href="https:\/\/os\.example\.test\/briefing\/records\/abc">/)
  assert.match(text, /🧪 <b>DEMO<\/b>/)
  assert.ok(!buildAlertMessage({ ...alert, isDemo: false }).includes('DEMO'))
  // Only our own tags remain.
  const tags = [...text.matchAll(/<\/?([a-z]+)[^>]*>/g)].map((m) => m[1])
  assert.deepEqual([...new Set(tags)].sort(), ['a', 'b'])
})

test('long content is truncated on whole lines, keeps the link and footer, never breaks markup', () => {
  const huge = buildAlertMessage({ ...alert, summary: 'x'.repeat(10_000), facts: { display: Object.fromEntries(Array.from({ length: 40 }, (_, i) => [`k${i}`, 'v'.repeat(100)])) } })
  assert.ok(huge.length <= TELEGRAM_SAFE_LENGTH)
  assert.match(huge, /Open record in the OS/)
  assert.match(huge, /fictional demonstration data/)
  const items = Array.from({ length: 400 }, (_, i) => ({ priority: 'NORMAL' as const, companySlug: 'nmi', subject: `Item ${i} & <tag>`, link: `https://x.test/briefing/records/r${i}` }))
  const digest = buildDigestMessage({ items, isDemo: true, overviewLink: 'https://x.test/briefing', label: 'Executive digest' })
  assert.ok(digest.length <= TELEGRAM_SAFE_LENGTH)
  assert.match(digest, /…and \d+ more — open the OS/)
  assert.match(digest, /Open the briefing centre/)
  assert.equal((digest.match(/<a /g) ?? []).length, (digest.match(/<\/a>/g) ?? []).length)
  // Fallback when even required lines are too long: no tags, no broken entity.
  const forced = fitLines({ head: [`<b>${'&amp;'.repeat(2000)}</b>`], tail: [] }, [], 100)
  assert.ok(forced.length <= 100)
  assert.ok(!/[<>]/.test(forced))
  assert.ok(!/&[a-z]*…$/.test(forced))
})

// ── Links ────────────────────────────────────────────────────────────────────
test('deep links point at exact record pages and reject bad ids', () => {
  assert.equal(subjectPath('RECORD', 'demo-nmi-inv-0412'), '/briefing/records/demo-nmi-inv-0412')
  assert.equal(subjectPath('COMMITMENT', 'cmvm6vi8k0015hcujkb6i2q62'), '/briefing/commitments/cmvm6vi8k0015hcujkb6i2q62')
  assert.equal(subjectPath('FINANCE', 'nmi'), '/briefing/finance/nmi')
  for (const bad of ['../x', 'a/b', '', 'x'.repeat(65), 'id?x=1']) assert.throws(() => subjectPath('RECORD', bad))
})

test('base URL must be https (loopback http only) and carry no credentials', () => {
  assert.equal(briefingBaseUrl(E({ EXEC_OS_BASE_URL: 'https://os.mgi-ventures.com/' })), 'https://os.mgi-ventures.com')
  assert.equal(briefingBaseUrl(E({ EXEC_OS_BASE_URL: 'http://localhost:3000' })), 'http://localhost:3000')
  for (const bad of ['http://os.mgi-ventures.com', 'javascript:alert(1)', 'https://u:p@os.test', 'https://os.test/?a=1', 'notaurl', '']) {
    assert.equal(briefingBaseUrl(E({ EXEC_OS_BASE_URL: bad })), null, bad)
  }
})

test('post-login return path cannot redirect off-site', () => {
  assert.equal(safeNextPath('/briefing/records/demo-nmi-inv-0412'), '/briefing/records/demo-nmi-inv-0412')
  assert.equal(safeNextPath('/briefing/records?type=INVOICE&q=0412'), '/briefing/records?type=INVOICE&q=0412')
  for (const bad of ['//evil.test', 'https://evil.test', '/\\evil.test', '/x\r\nSet-Cookie:a', '/api/briefing/run', '/login?next=//e', 'briefing', '/a b', 42, null]) {
    assert.equal(safeNextPath(bad), null, String(bad))
  }
})

// ── Telegram transport ───────────────────────────────────────────────────────
const TOKEN = '123456:ABCdefGhIjkLmNoPQRsTuvWxYz0123456789'

test('demo notifications only ever target the demo chat; live needs the explicit switch', () => {
  const base = { TELEGRAM_BOT_TOKEN: TOKEN, OPERATIONS_CHAT_ID: '-100111', TELEGRAM_PRESIDENT_CHAT_ID: '222' }
  const env = (extra: Record<string, string> = {}) => E({ ...base, ...extra })
  assert.equal(resolveTarget(president, true, env()).kind, 'dry_run')
  const demo = resolveTarget(president, true, env({ TELEGRAM_DEMO_CHAT_ID: '-100999' }))
  assert.equal(demo.kind === 'send' && demo.chatId, '-100999')
  const demoOps = resolveTarget(operations, true, env({ TELEGRAM_DEMO_CHAT_ID: '-100999' }))
  assert.equal(demoOps.kind === 'send' && demoOps.chatId, '-100999', 'demo never reaches the real Operations group')
  assert.equal(resolveTarget(president, true, env({ TELEGRAM_DEMO_CHAT_ID: '-100111' })).kind, 'dry_run', 'demo chat = live chat is refused')
  assert.equal(resolveTarget(president, false, env()).kind, 'dry_run', 'live off by default')
  const live = resolveTarget(president, false, env({ EXEC_TELEGRAM_LIVE: '1' }))
  assert.equal(live.kind === 'send' && live.chatId, '222')
  assert.equal(resolveTarget(president, false, E({ EXEC_TELEGRAM_LIVE: '1', TELEGRAM_PRESIDENT_CHAT_ID: '222' })).kind, 'dry_run', 'no token')
  assert.equal(telegramApiBase(E({ TELEGRAM_API_BASE: 'https://evil.test' })), null)
  assert.equal(telegramApiBase(E({ TELEGRAM_API_BASE: 'http://127.0.0.1:9999' })), 'http://127.0.0.1:9999')
  assert.equal(telegramApiBase(E({ TELEGRAM_API_BASE: 'http://127.0.0.1:9999', VERCEL: '1' })), null)
})

function fakeFetch(status: number, body: unknown, seen?: { url?: string; body?: Record<string, unknown> }): typeof fetch {
  return (async (url: string, init: RequestInit) => {
    if (seen) { seen.url = url; seen.body = JSON.parse(String(init.body)) }
    return new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } })
  }) as unknown as typeof fetch
}

test('Telegram responses are classified for retry; the token never appears in errors', async () => {
  const target = { kind: 'send' as const, chatId: '-1', token: TOKEN, apiBase: 'https://api.telegram.org' }
  const seen: { url?: string; body?: Record<string, unknown> } = {}
  const ok = await sendTelegram(target, 'hi', 'https://os.test/briefing/records/x', fakeFetch(200, { ok: true, result: { message_id: 42 } }, seen))
  assert.deepEqual(ok, { ok: true, messageId: '42' })
  assert.equal(seen.body?.parse_mode, 'HTML')
  assert.deepEqual(seen.body?.reply_markup, { inline_keyboard: [[{ text: 'Open in MGI Executive OS', url: 'https://os.test/briefing/records/x' }]] })
  await sendTelegram(target, 'hi', 'http://localhost:3000/briefing', fakeFetch(200, { ok: true, result: { message_id: 1 } }, seen))
  assert.equal(seen.body?.reply_markup, undefined, 'no inline button for non-https links')

  const limited = await sendTelegram(target, 'hi', null, fakeFetch(429, { ok: false, description: 'Too Many Requests', parameters: { retry_after: 7 } }))
  assert.equal(limited.ok === false && limited.retryable && limited.retryAfterSec, 7)
  const bad = await sendTelegram(target, 'hi', null, fakeFetch(400, { ok: false, description: "Bad Request: can't parse entities" }))
  assert.equal(bad.ok === false && bad.retryable, false)
  const forbidden = await sendTelegram(target, 'hi', null, fakeFetch(403, { ok: false, description: 'Forbidden: bot was kicked' }))
  assert.equal(forbidden.ok === false && forbidden.retryable, false)
  const down = await sendTelegram(target, 'hi', null, fakeFetch(502, {}))
  assert.equal(down.ok === false && down.retryable, true)
  const net = await sendTelegram(target, 'hi', null, (async () => { throw new Error(`connect failed https://api.telegram.org/bot${TOKEN}/sendMessage`) }) as unknown as typeof fetch)
  assert.equal(net.ok, false)
  assert.ok(net.ok === false && !net.error.includes(TOKEN) && !net.error.includes('ABCdef'))
  assert.equal(redact(`bot${TOKEN} and ${TOKEN}`, TOKEN).includes(TOKEN), false)
})

// ── Demo / live separation ───────────────────────────────────────────────────
test('demo and live references and modes cannot be mixed', () => {
  assert.equal(refMatchesMode('DEMO-NMI-INV-0412', true), true)
  assert.equal(refMatchesMode('DEMO-NMI-INV-0412', false), false)
  assert.equal(refMatchesMode('NMI-INV-0412', true), false)
  assert.equal(getBriefingMode(E({ EXEC_DEMO_MODE: '1' })), 'demo')
  assert.equal(getBriefingMode(E({ EXEC_DEMO_MODE: 'true' })), 'live')
  assert.equal(getBriefingMode(E({})), 'live')
})

test('ingest contract rejects malformed or oversized payloads', () => {
  const valid = scenarioPayloads(noon).piracy[0]
  assert.equal(IngestSchema.safeParse(valid).success, true)
  const bad = [
    { ...valid, schema: 'v0' },
    { ...valid, companySlug: 'NMI; DROP' },
    { ...valid, record: { ...valid.record, ref: '../etc' } },
    { ...valid, record: { ...valid.record, status: 'open' } },
    { ...valid, record: { ...valid.record, amount: -1 } },
    { ...valid, record: { ...valid.record, occurredAt: 'yesterday' } },
    { ...valid, record: { ...valid.record, title: 'x'.repeat(201) } },
    { ...valid, signal: { ...valid.signal!, kind: 'WHATEVER' } },
    { ...valid, signal: { ...valid.signal!, summary: '' } },
  ]
  for (const b of bad) assert.equal(IngestSchema.safeParse(b).success, false, JSON.stringify(b).slice(0, 80))
  // Priority is not part of the contract: a sender cannot force an alert.
  assert.equal('priority' in (IngestSchema.parse({ ...valid, signal: { ...valid.signal!, priority: 'CRITICAL' } }).signal ?? {}), false)
  // Every scenario payload is valid, demo-flagged and DEMO-prefixed.
  for (const [key, list] of Object.entries(scenarioPayloads(noon))) {
    for (const p of list) {
      assert.equal(IngestSchema.safeParse(p).success, true, key)
      assert.equal(p.isDemo && p.source === 'DEMO' && p.record.ref.startsWith('DEMO-'), true, key)
    }
  }
})

test('action schemas require evidence, reasons and valid causes', () => {
  assert.equal(CommitmentActionSchema.safeParse({ action: 'deliver', evidence: '' }).success, false)
  assert.equal(CommitmentActionSchema.safeParse({ action: 'deliver', evidence: 'GRN-1' }).success, true)
  assert.equal(CommitmentActionSchema.safeParse({ action: 'block', delayCause: 'LAZY', blocker: 'x' }).success, false)
  assert.equal(CommitmentActionSchema.safeParse({ action: 'progress', progress: '100' }).success, false, '100% only via delivery')
  assert.equal(RecordActionSchema.safeParse({ action: 'decline' }).success, false, 'decline needs a reason')
  assert.equal(RecordActionSchema.safeParse({ action: 'request_action', title: 't', deliverable: 'd', ownerName: 'n', ownerRole: 'r', dueDate: '2026-13-45x' }).success, false)
  assert.equal(RecordActionSchema.safeParse({ action: 'delete' }).success, false)
})

// ── Accountability ───────────────────────────────────────────────────────────
test('committed vs delivered separates owner-caused from systemic delays', () => {
  const now = new Date('2026-10-24T12:00:00Z')
  const d = (s: string) => new Date(s)
  const base = { ownerRole: 'NMI Finance Manager', ownerName: 'X', companySlug: 'nmi' }
  const stats = deliveryStats([
    { ...base, status: 'ACCEPTED', dueAt: d('2026-10-10'), deliveredAt: d('2026-10-09'), delayCause: null },
    { ...base, status: 'ACCEPTED', dueAt: d('2026-10-10'), deliveredAt: d('2026-10-12'), delayCause: 'RESOURCES' },
    { ...base, status: 'IN_PROGRESS', dueAt: d('2026-10-20'), deliveredAt: null, delayCause: null },
    { ...base, status: 'BLOCKED', dueAt: d('2026-10-30'), deliveredAt: null, delayCause: 'MANAGEMENT_DEPENDENCY' },
    { ...base, status: 'CANCELLED', dueAt: d('2026-10-01'), deliveredAt: null, delayCause: null },
  ], now)
  assert.equal(stats.length, 1)
  const s = stats[0]
  assert.deepEqual([s.total, s.deliveredOnTime, s.deliveredLate, s.overdueOpen, s.open, s.blocked], [4, 1, 1, 1, 1, 1])
  assert.equal(s.ownerAttributableDelays, 1)
  assert.equal(s.systemicDelays, 1)
  assert.equal(s.onTimeRate, 33)
})

// ── Demo dataset ─────────────────────────────────────────────────────────────
function rows(anchor: Date) {
  const ds = buildDemoDataset(anchor)
  const orders: OrderRow[] = [], invoices: InvoiceRow[] = [], payments: PaymentRow[] = []
  for (const r of ds.records) {
    if (r.recordType === 'ORDER') orders.push({ ref: r.ref, amount: r.amount!, occurredAt: r.occurredAt, data: r.data as OrderRow['data'] })
    if (r.recordType === 'INVOICE') invoices.push({ id: r.id, ref: r.ref, parentRef: r.parentRef!, amount: r.amount!, occurredAt: r.occurredAt, dueAt: r.dueAt!, data: r.data as InvoiceRow['data'] })
    if (r.recordType === 'PAYMENT') payments.push({ ref: r.ref, parentRef: r.parentRef!, amount: r.amount!, occurredAt: r.occurredAt })
  }
  return { ds, orders, invoices, payments }
}

test('demo dataset is deterministic, fully labelled and internally consistent', () => {
  const a = rows(noon), b = rows(noon)
  assert.deepEqual(a.ds, b.ds, 'same anchor → identical dataset')
  const { ds, orders, invoices, payments } = a
  assert.deepEqual(consistencyProblems(orders, invoices, payments), [])
  for (const r of ds.records) {
    assert.ok(r.ref.startsWith('DEMO-'), r.ref)
    assert.equal(r.sourceSystem, 'DEMO')
    assert.ok(/\(DEMO\)|DEMO|day −|Order|Invoice|Payment|Receipt|Counter|Stock/.test(r.title), r.title)
    assert.ok(r.id.length <= 64 && /^[a-z0-9-]+$/.test(r.id))
  }
  assert.equal(new Set(ds.records.map((r) => r.ref)).size, ds.records.length, 'unique refs')
  const blob = JSON.stringify(ds)
  assert.ok(!/@[a-z0-9-]+\.[a-z]{2,}/i.test(blob.replace(/info@ mailbox/g, '')), 'no e-mail addresses')
  assert.ok(!/\+?237\s?\d{3}/.test(blob), 'no Cameroonian phone numbers')
  // Distributor orders: invoice, payments and stock movement line up with the order.
  for (const o of DISTRIBUTOR_ORDERS) {
    const order = ds.records.find((r) => r.ref === `DEMO-NMI-ORD-${o.no}`)!
    const mv = ds.records.find((r) => r.ref === `DEMO-NMI-STK-${o.no}`)!
    assert.equal(mv.parentRef, order.ref)
    const ol = (order.data as { lines: { productRef: string; qty: number }[] }).lines
    const ml = (mv.data as { lines: { productRef: string; qty: number }[] }).lines
    assert.deepEqual(ml.map((l) => [l.productRef, l.qty]), ol.map((l) => [l.productRef, l.qty]))
  }
  // Commitments point at real decisions; decisions at real meetings.
  const decisionIds = new Set(ds.decisions.map((d) => d.id))
  for (const c of ds.commitments) if (c.decisionId) assert.ok(decisionIds.has(c.decisionId), c.ref)
  const meetingIds = new Set(ds.meetings.map((m) => m.id))
  for (const d of ds.decisions) assert.ok(meetingIds.has(d.meetingId), d.ref)
})

test('demo stories produce exactly the intended signals', () => {
  const { orders, invoices, payments } = rows(noon)
  const flagship = invoiceBalances(invoices, payments, noon).find((b) => b.ref === 'DEMO-NMI-INV-0412')!
  assert.equal(flagship.amount, 4_247_200)
  assert.equal(flagship.outstanding, 2_747_200)
  assert.ok(flagship.daysOverdue >= 37 && flagship.daysOverdue <= 38)
  assert.equal(classifyPriority('RECEIVABLE_OVERDUE', { outstanding: flagship.outstanding, daysOverdue: flagship.daysOverdue }), 'HIGH')
  const over30 = invoiceBalances(invoices, payments, noon).filter((b) => b.daysOverdue >= 30).map((b) => b.ref).sort()
  assert.deepEqual(over30, ['DEMO-NMI-INV-0405', 'DEMO-NMI-INV-0412'])
  // Only Bamenda's shop sales move more than 15 % week on week.
  const shop = orders.filter((o) => o.data.channel === 'SHOP')
  const m = computeSalesMetrics(shop, [], [], noon)
  const moved = m.byBranch.filter((b) => b.changePct !== null && Math.abs(b.changePct) >= 15).map((b) => b.branch)
  assert.deepEqual(moved, ['Bamenda branch (DEMO)'])
  const full = computeSalesMetrics(orders, invoices, payments, noon)
  assert.equal(full.receivables.overdue, 2_747_200 + 870_000 + (1_438_000 - 400_000))
  assert.ok(full.bestTitles.length === 5)
})

// ── n8n workflows (docs/briefing-centre/n8n) ─────────────────────────────────
test('n8n workflows are small, carry no secrets and only call the briefing run endpoint', async () => {
  const { readdirSync, readFileSync } = await import('node:fs')
  const { join } = await import('node:path')
  const dir = join(__dirname, '..', 'docs', 'briefing-centre', 'n8n')
  const files = readdirSync(dir).filter((f) => f.endsWith('.json'))
  assert.equal(files.length, 3)
  for (const f of files) {
    const raw = readFileSync(join(dir, f), 'utf8')
    const w = JSON.parse(raw)
    assert.ok(w.nodes.length <= 4, `${f}: small workflow`)
    assert.equal(w.active, false, `${f}: imported inactive, activated by a human`)
    assert.equal(w.settings.timezone, 'Africa/Douala')
    const http = w.nodes.filter((n: { type: string }) => n.type === 'n8n-nodes-base.httpRequest')
    assert.equal(http.length, 1)
    assert.match(http[0].parameters.url, /\/api\/briefing\/run$/)
    assert.equal(http[0].parameters.genericAuthType, 'httpCustomAuth', `${f}: headers via credential`)
    assert.ok(!/x-exec-briefing-token"\s*:\s*"[^"]/.test(raw) && !/headerParameters/.test(raw), `${f}: no inline header`)
    assert.ok(!/(re_[A-Za-z0-9]{10,}|bot\d+:|Bearer )/.test(raw), `${f}: no secrets`)
  }
})
