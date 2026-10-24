// Executive Briefing Centre — database integration tests (isolated local Docker DB only).
//   npm run test:briefing:db      (needs <repo>/.briefing-local/config.json, see RUNBOOK.md)
// Refuses to run against anything but a loopback Neon HTTP proxy. Telegram is a loopback
// mock server; no request leaves the machine.
import { test, before, after } from 'node:test'
import assert from 'node:assert/strict'
import { createServer, type Server } from 'node:http'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import type { AddressInfo } from 'node:net'

const cfg = JSON.parse(readFileSync(join(__dirname, '..', '..', '..', '..', '.briefing-local', 'config.json'), 'utf8'))
if (!/^http:\/\/127\.0\.0\.1:\d+\/sql$/.test(cfg.sqlEndpoint)) throw new Error('REFUSED: briefing DB tests need the loopback local database')
for (const k of Object.keys(process.env)) if (/TELEGRAM|CHAT_ID|N8N|ANTHROPIC|EMAIL_SERVER|VERCEL/.test(k)) delete process.env[k]
Object.assign(process.env, {
  DATABASE_URL: `postgres://postgres:${cfg.pgPassword}@db.localtest.me:5432/main`,
  MGI_LOCAL_SQL_ENDPOINT: cfg.sqlEndpoint,
  EXEC_DEMO_MODE: '1',
  EXEC_OS_BASE_URL: 'https://os.example.test',
  TZ: 'UTC',
})

type Mod = {
  prisma: typeof import('../../src/lib/prisma').prisma
  demo: typeof import('../../src/lib/briefing/demo')
  scan: typeof import('../../src/lib/briefing/scan')
  d: typeof import('../../src/lib/briefing/dispatch')
  brief: typeof import('../../src/lib/briefing/brief')
  ingest: typeof import('../../src/lib/briefing/ingest')
  actions: typeof import('../../src/lib/briefing/actions')
  events: typeof import('../../src/lib/briefing/events')
}
let m: Mod

// Loopback mock of the Telegram Bot API. Each test queues the responses it wants.
let server: Server
let tgBase = ''
const tgQueue: { status: number; body: unknown }[] = []
const tgSeen: { path: string; body: Record<string, unknown> }[] = []

before(async () => {
  m = {
    prisma: (await import('../../src/lib/prisma')).prisma,
    demo: await import('../../src/lib/briefing/demo'),
    scan: await import('../../src/lib/briefing/scan'),
    d: await import('../../src/lib/briefing/dispatch'),
    brief: await import('../../src/lib/briefing/brief'),
    ingest: await import('../../src/lib/briefing/ingest'),
    actions: await import('../../src/lib/briefing/actions'),
    events: await import('../../src/lib/briefing/events'),
  }
  server = createServer((req, res) => {
    let raw = ''
    req.on('data', (c) => (raw += c))
    req.on('end', () => {
      tgSeen.push({ path: req.url ?? '', body: JSON.parse(raw || '{}') })
      const next = (req.url ?? '').endsWith('/getMe')
        ? { status: 200, body: { ok: true, result: { username: 'mock_briefing_bot' } } }
        : tgQueue.shift() ?? { status: 200, body: { ok: true, result: { message_id: 1000 + tgSeen.length } } }
      res.writeHead(next.status, { 'Content-Type': 'application/json' }).end(JSON.stringify(next.body))
    })
  })
  await new Promise<void>((r) => server.listen(0, '127.0.0.1', r))
  tgBase = `http://127.0.0.1:${(server.address() as AddressInfo).port}`
})

after(async () => {
  await new Promise((r) => server.close(r))
})

const exec = { user: { id: 'u-exec', email: 'exec@example.test', name: 'Executive (test)', globalRole: 'SUPER_ADMIN', activeCompanyId: '', memberships: [] }, actor: 'Executive (test)', companies: '*' as const, decideCompanies: '*' as const }
const nmiStaff = { user: { id: 'u-staff', email: 'staff@example.test', name: 'NMI staff (test)', globalRole: 'USER', activeCompanyId: '', memberships: [] }, actor: 'NMI staff (test)', companies: ['nmi'], decideCompanies: [] as string[] }
const drosOnly = { ...nmiStaff, actor: 'DROS staff (test)', companies: ['dros'] }

const T0 = new Date('2026-10-24T09:00:00Z') // 10:00 Douala, not quiet hours
const tgEnv = () => ({ ...process.env, TELEGRAM_BOT_TOKEN: '999:TESTTOKENxyz', TELEGRAM_DEMO_CHAT_ID: '-100777', TELEGRAM_API_BASE: tgBase, EXEC_OS_BASE_URL: 'https://os.example.test' })

test('reset is repeatable and touches only demo rows', async () => {
  const live = await m.prisma.execRecord.create({ data: { ref: 'LIVE-TEST-0001', companySlug: 'nmi', domain: 'SALES', recordType: 'ORDER', title: 'live row (test)', status: 'POSTED', occurredAt: T0, sourceSystem: 'NMI', isDemo: false } })
  const a = await m.demo.resetDemo(T0)
  const b = await m.demo.resetDemo(T0)
  assert.deepEqual(a, b)
  assert.equal(await m.prisma.execRecord.count({ where: { isDemo: true } }), a.records)
  assert.equal(await m.prisma.execRecord.count({ where: { id: live.id } }), 1, 'live row survives a demo reset')
  await m.prisma.execRecord.delete({ where: { id: live.id } })
})

test('a live deployment never sees demo data', async () => {
  assert.deepEqual(await m.scan.runScan(false, T0), { created: 0, duplicates: 0, findings: [] })
  assert.equal((await m.d.processEvents(false, T0)).processed, 0)
  const { composeMorningBrief } = m.brief
  // (live brief reads live modules too; it must contain no demo record)
  const live = await composeMorningBrief(false, T0, { ...process.env, EXEC_DEMO_MODE: '' })
  assert.ok(!live.text.includes('DEMO'), 'no demo content in a live brief')
})

test('ingest guards: mode, prefix, company, ownership; dedupe and follow-ups', async () => {
  const p = m.demo.scenarioPayloads(T0).piracy[0]
  assert.equal((await m.ingest.ingest(p, false)).ok, false, 'demo payload refused by live')
  assert.deepEqual(await m.ingest.ingest({ ...p, isDemo: false, source: 'NMI' }, true), { ok: false, status: 409, error: 'Live payload refused by a demo deployment' })
  assert.equal((await m.ingest.ingest({ ...p, record: { ...p.record, ref: 'NMI-PIR-0007' } }, true) as { status: number }).status, 400)
  assert.equal((await m.ingest.ingest({ ...p, companySlug: 'zzz' }, true) as { status: number }).status, 400)
  const first = await m.ingest.ingest(p, true)
  assert.equal(first.ok && first.created && first.event, 'created')
  const again = await m.ingest.ingest(p, true)
  assert.equal(again.ok && !again.created && again.event, 'duplicate', 'n8n retry stores nothing new')
  const moved = await m.ingest.ingest({ ...p, record: { ...p.record, status: 'LEGAL_REVIEW' } }, true)
  assert.equal(moved.ok && moved.event, 'created', 'a status change is a new fact')
  assert.equal((await m.ingest.ingest({ ...p, companySlug: 'dros' }, true) as { status: number }).status, 409, 'cannot hijack another company’s ref')
  const hist = await m.prisma.execActivity.findMany({ where: { subjectId: first.ok ? first.recordId : '' }, orderBy: { createdAt: 'asc' } })
  assert.deepEqual(hist.map((h) => h.action), ['RECEIVED', 'SOURCE_UPDATE'])
})

test('scan is idempotent and raises the intended findings', async () => {
  await m.demo.resetDemo(T0)
  const s1 = await m.scan.runScan(true, T0)
  assert.deepEqual(s1.findings.sort(), [
    'commitment overdue DEMO-MGI-CMT-RES01', 'receivable DEMO-NMI-INV-0405 30d', 'receivable DEMO-NMI-INV-0412 30d',
    'registration DEMO-RGR-REG-0103', 'registration DEMO-RGR-REG-0104', 'sales change Bamenda branch (DEMO)',
    'stock DEMO-NMI-STL-BDA-MATH6', 'stock DEMO-NMI-STL-DLA-ENG1',
  ])
  const s2 = await m.scan.runScan(true, new Date(T0.getTime() + 15 * 60_000))
  assert.equal(s2.created, 0)
  assert.equal(s2.duplicates, s1.created)
})

test('concurrent dispatch runs route each event once; rate limit overflows to the digest', async () => {
  const [a, b] = await Promise.all([m.d.processEvents(true, T0), m.d.processEvents(true, T0)])
  assert.equal(a.processed + b.processed, 8)
  const alerts = await m.prisma.execNotification.findMany({ where: { isDemo: true, kind: 'ALERT' } })
  assert.equal(new Set(alerts.map((x) => x.eventIds[0])).size, alerts.length, 'no duplicate alert')
  assert.equal(alerts.length, 4, 'HIGH alerts capped at 4 per hour')
  const ev = await m.prisma.execEvent.findMany({ where: { isDemo: true } })
  assert.ok(ev.every((e) => e.processedAt && e.routing))
  assert.equal((await m.d.processEvents(true, T0)).processed, 0)
  const dg = await m.d.runDigest(true, T0)
  assert.equal(dg.notifications, 1)
  assert.equal((await m.d.runDigest(true, T0)).notifications, 0, 'digest items are summarised once')
})

test('an alert whose record does not exist is never sent', async () => {
  await m.events.emitEvent({ dedupeKey: 'ghost', companySlug: 'nmi', domain: 'PIRACY', kind: 'PIRACY_SUSPECTED', subject: 'ghost', summary: 'x', subjectType: 'RECORD', subjectId: 'does-not-exist', isDemo: true, occurredAt: T0, priority: 'CRITICAL' })
  const r = await m.d.processEvents(true, T0)
  assert.equal(r.linkFailures, 1)
  const n = await m.prisma.execNotification.findFirst({ where: { isDemo: true, text: 'ghost' } })
  assert.equal(n?.status, 'FAILED')
  assert.match(n?.lastError ?? '', /Linked record not found/)
})

test('delivery: demo chat only, success, 429 retry, permanent failure surfaced once', async () => {
  // Rows default nextAttemptAt to the real clock, so this test runs on a clock just after it.
  const D0 = new Date(Date.now() + 5_000)
  // Without a demo chat: dry run, nothing leaves.
  const before = tgSeen.length
  const dry = await m.d.deliverPending(true, D0, { ...process.env, TELEGRAM_BOT_TOKEN: '999:TESTTOKENxyz', TELEGRAM_API_BASE: tgBase })
  assert.ok(dry.dryRun > 0)
  assert.equal(tgSeen.length, before)
  await m.prisma.$executeRaw`UPDATE exec_notifications SET status = 'PENDING', "lastError" = NULL, attempts = 0 WHERE "isDemo" = true AND status = 'DRY_RUN'`

  tgQueue.push({ status: 429, body: { ok: false, description: 'Too Many Requests', parameters: { retry_after: 3 } } })
  const r1 = await m.d.deliverPending(true, D0, tgEnv())
  assert.equal(r1.retried, 1)
  assert.ok(r1.sent >= 4)
  assert.ok(tgSeen.slice(before).every((s) => s.body.chat_id === '-100777' && s.path.startsWith('/bot999:TESTTOKENxyz/')), 'only the demo chat')
  assert.ok(tgSeen.slice(before).every((s) => s.body.parse_mode === 'HTML'))
  const retry = await m.prisma.execNotification.findFirst({ where: { isDemo: true, status: 'PENDING' } })
  assert.ok(retry && retry.nextAttemptAt.getTime() >= D0.getTime() + 60_000 && retry.attempts === 1)
  assert.equal((await m.d.deliverPending(true, D0, tgEnv())).attempted, 0, 'not before the backoff')
  const r2 = await m.d.deliverPending(true, new Date(D0.getTime() + 61_000), tgEnv())
  assert.equal(r2.sent, 1)
  const sent = await m.prisma.execNotification.findMany({ where: { isDemo: true, status: 'SENT' } })
  assert.ok(sent.every((s) => s.telegramMessageId && s.sentAt))

  // Two permanent failures in the same hour → both FAILED, one failure event.
  for (const ref of ['a', 'b']) {
    await m.prisma.execNotification.create({ data: { dedupeKey: `demo:test-fail-${ref}`, kind: 'ALERT', recipient: 'president', eventIds: [], text: `fail ${ref}`, isDemo: true, nextAttemptAt: D0 } })
  }
  tgQueue.push({ status: 403, body: { ok: false, description: 'Forbidden: bot was blocked by the user' } }, { status: 403, body: { ok: false, description: 'Forbidden: bot was blocked by the user' } })
  const r3 = await m.d.deliverPending(true, new Date(D0.getTime() + 120_000), tgEnv())
  assert.equal(r3.failed, 2)
  const failures = await m.prisma.execEvent.findMany({ where: { isDemo: true, kind: 'OPERATIONAL_FAILURE', dedupeKey: { startsWith: 'demo:delivery-failed' } } })
  assert.equal(failures.length, 1, 'no failure storm')
  const failed = await m.prisma.execNotification.findMany({ where: { isDemo: true, status: 'FAILED', text: { startsWith: 'fail ' } } })
  assert.ok(failed.every((f) => f.lastError?.includes('403') && !f.lastError.includes('TESTTOKEN')))
  // Manual retry from the outbox.
  assert.equal(await m.d.retryNotification(failed[0].id, true, D0), true)
  assert.equal(await m.d.retryNotification(failed[0].id, true, D0), false, 'only FAILED rows')
})

test('a crashed send is surfaced, not resent blindly', async () => {
  const n = await m.prisma.execNotification.create({ data: { dedupeKey: 'demo:test-stale', kind: 'ALERT', recipient: 'president', eventIds: [], text: 'stale', isDemo: true, status: 'SENDING', nextAttemptAt: new Date(T0.getTime() - 10 * 60_000) } })
  const sentBefore = tgSeen.length
  const r = await m.d.deliverPending(true, T0, tgEnv())
  assert.equal(r.recoveredStale, 1)
  assert.equal((await m.prisma.execNotification.findUnique({ where: { id: n.id } }))?.status, 'FAILED')
  assert.equal(tgSeen.filter((s) => s.body.text === 'stale').length, 0)
  assert.ok(tgSeen.length >= sentBefore)
})

test('management action → state change → history → follow-up event', async () => {
  const apr = await m.ingest.ingest(m.demo.scenarioPayloads(T0).approval[0], true)
  assert.ok(apr.ok)
  const id = apr.ok ? apr.recordId : ''
  // Permissions: other company → 404; member without admin → 403; executive → ok.
  assert.equal((await m.actions.recordAction(drosOnly as never, id, { action: 'approve' }, true, T0) as { status: number }).status, 404)
  const nmiRec = await m.prisma.execRecord.findFirst({ where: { ref: 'DEMO-NMI-PRN-0019' } })
  assert.equal((await m.actions.recordAction(drosOnly as never, nmiRec!.id, { action: 'acknowledge' }, true, T0) as { status: number }).status, 404)
  assert.equal((await m.actions.recordAction(nmiStaff as never, nmiRec!.id, { action: 'close', note: 'x' }, true, T0) as { status: number }).status, 403)
  assert.equal((await m.actions.recordAction(nmiStaff as never, nmiRec!.id, { action: 'acknowledge' }, true, T0)).ok, true)
  assert.equal((await m.actions.recordAction(nmiStaff as never, nmiRec!.id, { action: 'acknowledge' }, true, T0) as { status: number }).status, 409, 'second click conflicts')

  const [x, y] = await Promise.all([
    m.actions.recordAction(exec as never, id, { action: 'approve', note: 'go' }, true, T0),
    m.actions.recordAction(exec as never, id, { action: 'approve', note: 'go' }, true, T0),
  ])
  assert.deepEqual([x.ok, y.ok].sort(), [false, true], 'exactly one concurrent decision wins')
  const cmt = await m.prisma.execCommitment.findFirst({ where: { ref: 'DEMO-MGI-CMT-RES02' } })
  assert.equal(cmt?.status, 'IN_PROGRESS', 'approval unblocked the commitment')
  const kinds = (await m.prisma.execEvent.findMany({ where: { isDemo: true, kind: { in: ['APPROVAL_DECIDED', 'COMMITMENT_UNBLOCKED'] } } })).map((e) => e.kind).sort()
  assert.deepEqual(kinds, ['APPROVAL_DECIDED', 'COMMITMENT_UNBLOCKED'])
  const hist = await m.prisma.execActivity.findMany({ where: { subjectId: cmt!.id }, orderBy: { createdAt: 'asc' } })
  assert.equal(hist.at(-1)?.action, 'UNBLOCKED')

  // Request action from a record → tracked commitment.
  const inq = await m.ingest.ingest(m.demo.scenarioPayloads(T0)['dros-inquiry'][0], true)
  const inqId = inq.ok ? inq.recordId : ''
  assert.equal((await m.actions.recordAction(exec as never, inqId, { action: 'request_action', title: 'Lead the site visit', deliverable: 'Visit report + indicative quote', ownerName: 'DROS commercial lead (DEMO)', ownerRole: 'DROS Commercial Lead', dueDate: '2020-01-01' }, true, T0) as { status: number }).status, 400, 'past due date')
  const ra = await m.actions.recordAction(exec as never, inqId, { action: 'request_action', title: 'Lead the site visit', deliverable: 'Visit report + indicative quote', ownerName: 'DROS commercial lead (DEMO)', ownerRole: 'DROS Commercial Lead', dueDate: '2026-10-27' }, true, T0)
  assert.equal(ra.ok, true)
  const linked = await m.prisma.execCommitment.findFirst({ where: { recordId: inqId } })
  assert.ok(linked && linked.ref.startsWith('DEMO-DROS-CMT-') && linked.isDemo)

  // Accepting the last open commitment of a decision implements the decision.
  const res03 = await m.prisma.execCommitment.findFirst({ where: { ref: 'DEMO-MGI-CMT-RES03' } })
  assert.equal((await m.actions.commitmentAction(nmiStaff as never, res03!.id, { action: 'accept' }, true, T0) as { status: number }).status, 403)
  assert.equal((await m.actions.commitmentAction(exec as never, res03!.id, { action: 'accept' }, true, T0)).ok, true)
  assert.equal((await m.prisma.execDecision.findFirst({ where: { ref: 'DEMO-MGI-RES-2026-10-03' } }))?.status, 'IMPLEMENTED')

  // Owner delivers the overdue commitment → follow-up event for acceptance.
  const res01 = await m.prisma.execCommitment.findFirst({ where: { ref: 'DEMO-MGI-CMT-RES01' } })
  assert.equal((await m.actions.commitmentAction(nmiStaff as never, res01!.id, { action: 'deliver', evidence: 'Plans signed by 4 distributors (DEMO)' }, true, T0)).ok, true)
  const delivered = await m.prisma.execEvent.findFirst({ where: { isDemo: true, kind: 'COMMITMENT_DELIVERED', subjectId: res01!.id } })
  assert.match(delivered?.subject ?? '', /^Delivered \(late\)/)
  // No further overdue alert for a delivered commitment.
  const s = await m.scan.runScan(true, new Date(T0.getTime() + 3_600_000))
  assert.ok(!s.findings.some((f) => f.includes('RES01')))
})

test('morning brief: one per day, built from records, links resolve', async () => {
  await m.demo.resetDemo(T0)
  const a = await m.brief.enqueueMorningBrief(true, T0, process.env)
  const b = await m.brief.enqueueMorningBrief(true, T0, process.env)
  assert.equal(a.created, 1)
  assert.equal(b.created, 0, 'deduplicated per recipient per day')
  for (const section of ['Company performance', 'Waiting for your decision', 'Overdue commitments', 'Operational exceptions']) assert.match(a.text, new RegExp(section))
  assert.match(a.text, /DEMO/)
  const links = [...a.text.matchAll(/href="https:\/\/os\.example\.test(\/briefing\/[a-z]+\/([a-z0-9-]+))"/g)]
  assert.ok(links.length >= 5)
  for (const [, path, id] of links) {
    const kind = path.split('/')[2]
    const found = kind === 'records' ? await m.prisma.execRecord.count({ where: { id } })
      : kind === 'commitments' ? await m.prisma.execCommitment.count({ where: { id } })
      : kind === 'finance' ? 1 : await m.prisma.execMeeting.count({ where: { id } })
    assert.equal(found, 1, path)
  }
  assert.equal((await m.brief.enqueueMorningBrief(true, T0, process.env, true)).created, 1, 'demo replay allowed')
})

test('Telegram connectivity check: demo chat only, recorded in the outbox', async () => {
  const before = tgSeen.length
  const refused = await m.d.sendDemoTestMessage({ ...tgEnv(), TELEGRAM_DEMO_CHAT_ID: '' })
  assert.equal(refused.ok, false)
  assert.equal(tgSeen.length, before, 'nothing sent without a demo chat')
  const live = await m.d.sendDemoTestMessage({ ...tgEnv(), EXEC_DEMO_MODE: '' })
  assert.equal(live.ok, false, 'refused on a live deployment')
  const ok = await m.d.sendDemoTestMessage(tgEnv())
  assert.equal(ok.ok, true)
  const calls = tgSeen.slice(before)
  assert.deepEqual(calls.map((c) => c.path.split('/').pop()), ['getMe', 'sendMessage'])
  assert.equal(calls[1].body.chat_id, '-100777')
  const row = await m.prisma.execNotification.findFirst({ where: { kind: 'TEST' }, orderBy: { createdAt: 'desc' } })
  assert.equal(row?.status, 'SENT')
})
