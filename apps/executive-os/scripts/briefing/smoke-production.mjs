#!/usr/bin/env node
// Production smoke test for the briefing centre on https://os.mgi-ventures.com — checks that
// need NO user login (signing in to production with someone's password is not done by tooling):
// redirects, machine-token guards, ingest dedupe and mode guard, jobs, forged sessions,
// open-redirect protection, security headers. Ingest creates one DEMO record; reset the demo
// data afterwards (RUNBOOK §4) to return to the 774-record baseline.
//   node scripts/briefing/smoke-production.mjs
import { readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', '..', '..', '..')
const s = JSON.parse(readFileSync(join(ROOT, '.briefing-local', 'production', 'secrets.json'), 'utf8'))
const BASE = s.url
const results = []
const check = (name, ok, detail = '') => { results.push({ name, ok: !!ok, detail }); console.log(`${ok ? 'PASS' : 'FAIL'}  ${name}${detail ? ` — ${detail}` : ''}`) }
const get = (p, headers = {}) => fetch(BASE + p, { redirect: 'manual', headers })
const token = { 'x-exec-briefing-token': s.briefingToken, 'content-type': 'application/json' }
const post = (p, body, headers = token) => fetch(BASE + p, { method: 'POST', headers, body: typeof body === 'string' ? body : JSON.stringify(body), redirect: 'manual' })

let r = await get('/login')
check('login page 200', r.status === 200)
check('security headers', r.headers.get('x-frame-options') === 'DENY' && r.headers.get('x-content-type-options') === 'nosniff')
r = await get('/briefing/records/demo-nmi-inv-0412')
check('anonymous deep link → login keeping the target', r.status === 307 && (r.headers.get('location') ?? '').includes('/login?next=%2Fbriefing%2Frecords%2Fdemo-nmi-inv-0412'))
r = await get('/briefing/records/does-not-exist')
check('anonymous unknown record → login (no existence leak)', r.status === 307)
r = await get('/api/briefing/run')
check('jobs API anonymous → 401', r.status === 401)
r = await post('/api/briefing/run', { job: 'scan' }, { ...token, 'x-exec-briefing-token': 'x'.repeat(44) })
check('jobs API wrong token → 401', r.status === 401)
r = await post('/api/briefing/ingest', '{}', { ...token, 'x-exec-briefing-token': 'x'.repeat(44) })
check('ingest wrong token → 401', r.status === 401)
r = await post('/api/briefing/ingest', 'x'.repeat(40_000))
check('ingest oversized → 413', r.status === 413)
r = await post('/api/briefing/ingest', { schema: 'mgi.exec.ingest.v1' })
check('ingest malformed → 400', r.status === 400)

const payload = {
  schema: 'mgi.exec.ingest.v1', isDemo: true, source: 'DEMO', companySlug: 'nmi',
  record: { ref: 'DEMO-NMI-PIR-0098', recordType: 'PIRACY_CASE', domain: 'PIRACY', status: 'INTAKE', occurredAt: new Date().toISOString(),
    title: 'Smoke test: suspected counterfeit Lecture CP (DEMO) — Limbe', summary: 'Production smoke-test record (DEMO).', data: { suspectedCopies: 200 } },
  signal: { kind: 'PIRACY_SUSPECTED', subject: 'Smoke test: suspected piracy Lecture CP (DEMO)', summary: 'Smoke test.', facts: { suspectedCopies: 200 } },
}
const i1 = await (await post('/api/briefing/ingest', payload)).json()
const i2 = await (await post('/api/briefing/ingest', payload)).json()
check('ingest stores record + event', i1.ok && i1.event === 'created', JSON.stringify(i1))
check('repeated ingest deduplicated', i2.ok && i2.event === 'duplicate')
r = await post('/api/briefing/ingest', { ...payload, isDemo: false, source: 'NMI', record: { ...payload.record, ref: 'NMI-PIR-0098' } })
check('live payload refused while production runs in demo mode → 409', r.status === 409)
const run = async (job) => (await post('/api/briefing/run', { job })).json()
const proc = await run('process')
check('process job routes the event', proc.process?.processed >= 1, JSON.stringify(proc.process))
const del = await run('deliver')
check('deliver job: held as dry run (no demo chat configured) — nothing sent', (del.deliver?.sent ?? 0) === 0 && (del.deliver?.dryRun ?? 0) >= 1, JSON.stringify(del.deliver))

const forged = { cookie: '__Secure-authjs.session-token=eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2Q0JDLUhTNTEyIn0.forged.x.y.z' }
r = await get('/briefing', forged)
check('forged/expired session → login', r.status === 307 && (r.headers.get('location') ?? '').includes('/login'))
r = await get('/login?next=//evil.example')
check('login renders no off-site next field', !/name="next"/.test(await r.text()))

const failed = results.filter((x) => !x.ok)
console.log(`\n${results.length - failed.length}/${results.length} passed · recordId ${i1.recordId ?? '-'}`)
writeFileSync(join(ROOT, '.briefing-local', 'production', 'smoke-results.json'), JSON.stringify({ at: new Date().toISOString(), target: BASE, results }, null, 2))
process.exit(failed.length ? 1 : 0)
