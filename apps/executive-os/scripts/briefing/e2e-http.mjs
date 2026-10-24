#!/usr/bin/env node
// HTTP end-to-end check against the LOCAL briefing demo server
// (start-local.mjs --users --mock-telegram, after `npm run briefing -- --local reset`).
// Exercises: deep link → login → exact record; ingest API (token, dedupe, mode guard); jobs API;
// Telegram mock delivery; record action through the real server-action form; access isolation.
import { readFileSync, existsSync, writeFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))
const ROOT = join(here, '..', '..', '..', '..')
// --staging: hosted staging (Vercel SSO passed with the automation-bypass header; Telegram
// evidence read from the outbox page). Default: the local server with the mock Telegram.
const STAGING = process.argv.includes('--staging')
const local = JSON.parse(readFileSync(join(ROOT, '.briefing-local', 'config.json'), 'utf8'))
const stg = STAGING ? JSON.parse(readFileSync(join(ROOT, '.briefing-local', 'staging', 'staging-secrets.json'), 'utf8')) : null
const cfg = STAGING
  ? { briefingToken: stg.briefingToken, presidentPassword: stg.presidentPassword, staffPassword: stg.staffPassword }
  : local
const BASE = STAGING ? stg.url : `http://127.0.0.1:${local.appPort}`
const LINK_RE = STAGING ? /href="(https:\/\/mgi-exos-preview\.vercel\.app\/briefing\/records\/[^"]+)"/ : /href="(http:\/\/localhost:\d+\/briefing\/records\/[^"]+)"/
const extra = STAGING ? { 'x-vercel-protection-bypass': stg.bypass } : {}
const INBOX = join(ROOT, '.briefing-local', 'telegram-inbox.jsonl')
const results = []
const check = (name, ok, detail = '') => {
  results.push({ name, ok: !!ok, detail })
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${name}${detail ? ` — ${detail}` : ''}`)
}

class Jar {
  cookies = new Map()
  store(res) {
    for (const c of res.headers.getSetCookie?.() ?? []) {
      const [kv] = c.split(';')
      const i = kv.indexOf('=')
      this.cookies.set(kv.slice(0, i), kv.slice(i + 1))
    }
  }
  header() { return [...this.cookies].map(([k, v]) => `${k}=${v}`).join('; ') }
}
async function req(jar, path, init = {}) {
  const res = await fetch(BASE + path, { ...init, redirect: 'manual', headers: { ...extra, ...(init.headers ?? {}), ...(jar ? { cookie: jar.header() } : {}) } })
  jar?.store(res)
  return res
}
async function follow(jar, path, init) {
  let res = await req(jar, path, init)
  for (let i = 0; i < 6 && [301, 302, 303, 307, 308].includes(res.status); i++) {
    const u = new URL(res.headers.get('location'), BASE)
    res = await req(jar, u.pathname + u.search)
  }
  return res
}
// Signs in through the real login page form (server action), exactly like a browser without JS.
async function signIn(email, password, next) {
  const jar = new Jar()
  const loginPath = next ? `/login?next=${encodeURIComponent(next)}` : '/login'
  const html = await (await req(jar, loginPath)).text()
  const actionId = html.match(/name="\$ACTION_ID_([a-f0-9]+)"/)?.[1]
  const fd = new FormData()
  fd.append(`$ACTION_ID_${actionId}`, '')
  const hidden = html.match(/name="next" value="([^"]+)"/)?.[1]
  if (hidden) fd.append('next', hidden.replace(/&amp;/g, '&'))
  fd.append('email', email)
  fd.append('password', password)
  const res = await req(jar, loginPath, { method: 'POST', body: fd, headers: { origin: BASE } })
  return { jar, location: res.headers.get('location') ?? res.headers.get('x-action-redirect') ?? '' }
}
const token = { ...extra, 'x-exec-briefing-token': cfg.briefingToken, 'content-type': 'application/json' }
const job = (j) => fetch(`${BASE}/api/briefing/run`, { method: 'POST', headers: token, body: JSON.stringify({ job: j }) }).then((r) => r.json())
const inbox = () => (existsSync(INBOX) ? readFileSync(INBOX, 'utf8').trim().split('\n').filter(Boolean).map((l) => JSON.parse(l)) : [])

if (!STAGING) writeFileSync(INBOX, '')

// 1. Unauthenticated access and machine-endpoint guards
let r = await req(null, '/briefing/records/demo-nmi-inv-0412')
check('unauthenticated deep link redirects to login and keeps the target', r.status === 307 && r.headers.get('location')?.includes('/login?next=%2Fbriefing%2Frecords%2Fdemo-nmi-inv-0412'))
r = await req(null, '/api/briefing/run', { method: 'POST', body: '{}' }) // bypass header only: no app auth
check('jobs API without token or session → 401', r.status === 401)
r = await fetch(`${BASE}/api/briefing/ingest`, { method: 'POST', headers: { ...token, 'x-exec-briefing-token': 'wrong'.repeat(10) }, body: '{}' })
check('ingest with wrong token → 401', r.status === 401)
r = await fetch(`${BASE}/api/briefing/ingest`, { method: 'POST', headers: token, body: 'x'.repeat(40_000) })
check('oversized ingest → 413', r.status === 413)
r = await fetch(`${BASE}/api/briefing/ingest`, { method: 'POST', headers: token, body: '{"schema":"mgi.exec.ingest.v1"}' })
check('malformed ingest → 400', r.status === 400)

// 2. A source system reports a fact (same payload twice: n8n retry)
const payload = {
  schema: 'mgi.exec.ingest.v1', isDemo: true, source: 'DEMO', companySlug: 'nmi',
  record: {
    ref: 'DEMO-NMI-PIR-0099', recordType: 'PIRACY_CASE', domain: 'PIRACY', status: 'INTAKE', occurredAt: new Date().toISOString(),
    title: 'E2E suspected counterfeit Physics Form 4 (DEMO) — Bafoussam', summary: 'E2E check record.', data: { suspectedCopies: 300, location: 'Bafoussam (DEMO)' },
  },
  signal: { kind: 'PIRACY_SUSPECTED', subject: 'E2E: suspected piracy Physics Form 4 (DEMO)', summary: 'Two copies failed verification.', facts: { suspectedCopies: 300 }, display: { Copies: 300 } },
}
const i1 = await (await fetch(`${BASE}/api/briefing/ingest`, { method: 'POST', headers: token, body: JSON.stringify(payload) })).json()
const i2 = await (await fetch(`${BASE}/api/briefing/ingest`, { method: 'POST', headers: token, body: JSON.stringify(payload) })).json()
check('ingest creates record + event', i1.ok && i1.created && i1.event === 'created')
check('repeated ingest is deduplicated', i2.ok && !i2.created && i2.event === 'duplicate')
r = await fetch(`${BASE}/api/briefing/ingest`, { method: 'POST', headers: token, body: JSON.stringify({ ...payload, isDemo: false, source: 'NMI', record: { ...payload.record, ref: 'NMI-PIR-0099' } }) })
check('live payload refused by the demo deployment → 409', r.status === 409)

// 3. Schedules (what n8n calls)
const cyc = await job('cycle')
// Staging without TELEGRAM_* configured stores messages as DRY_RUN; both count as processed.
const delivered = (d) => (d?.sent ?? 0) + (d?.dryRun ?? 0)
check('cycle job routes and delivers', cyc.process?.processed >= 1 && delivered(cyc.deliver) >= 1, JSON.stringify(cyc.deliver))
let mine
if (STAGING) {
  // No mock inbox remotely: read the generated message from the outbox as the executive.
  const ex = await signIn('demo.president@example.test', cfg.presidentPassword)
  const outbox = await (await follow(ex.jar, '/briefing/notifications')).text()
  const block = outbox.split('Preview message').find((b) => b.includes('E2E: suspected piracy'))
  mine = block ? { text: block } : undefined
  check('outbox holds the alert for the demo route', !!mine, cyc.deliver?.sent ? 'sent to Telegram' : 'dry run (Telegram not configured)')
} else {
  const msgs = inbox()
  mine = msgs.find((m) => m.text.includes('E2E: suspected piracy'))
  check('Telegram (mock) received the alert, demo chat only', mine && msgs.every((m) => m.chat_id === '-1000000000000'))
}
const link = mine?.text.match(LINK_RE)?.[1]
check('alert carries the exact record link', link?.endsWith(`/briefing/records/${i1.recordId}`), link)
check('alert is labelled DEMO', STAGING ? mine?.text.includes('DEMO') : mine?.text.includes('🧪 <b>DEMO</b>'))
const again = await job('cycle')
check('second cycle sends nothing new for the same fact', delivered(again.deliver) === 0 && (STAGING || inbox().filter((m) => m.text.includes('E2E: suspected piracy')).length === 1))
const morning = await job('morning')
check('morning brief generated and delivered', morning.morning?.created === 1 && delivered(morning.deliver) >= 1, JSON.stringify(morning.deliver))
check('second morning run is deduplicated', (await job('morning')).morning?.created === 0)

// 4. The President follows the link: login → exact record
const path = link ? new URL(link).pathname : '/briefing'
const pres = await signIn('demo.president@example.test', cfg.presidentPassword, path)
check('sign-in returns to the deep-linked record', pres.location.endsWith(path), pres.location)
let page = await follow(pres.jar, path)
let html = await page.text()
check('record page renders the exact record', page.status === 200 && html.includes('DEMO-NMI-PIR-0099') && html.includes('E2E suspected counterfeit'))
check('record page shows the DEMO banner', html.includes('DEMO MODE'))

// 5. Management action through the real form (server action, no JS)
page = await follow(pres.jar, '/briefing/records/demo-nmi-inv-0412')
html = await page.text()
check('flagship invoice shows outstanding 2 747 200 XAF', html.includes('2 747 200 XAF') && html.includes('Savannah Books Distribution (DEMO)'))
const actionId = html.match(/name="\$ACTION_ID_([a-f0-9]+)"/)?.[1]
check('action form present', !!actionId)
if (actionId) {
  const fd = new FormData()
  fd.append(`$ACTION_ID_${actionId}`, '')
  fd.append('id', 'demo-nmi-inv-0412')
  fd.append('action', 'acknowledge')
  fd.append('note', 'E2E: seen, finance to call')
  const res = await req(pres.jar, '/briefing/records/demo-nmi-inv-0412', { method: 'POST', body: fd, headers: { origin: BASE } })
  check('acknowledge action accepted', [200, 303].includes(res.status), String(res.status))
  page = await follow(pres.jar, '/briefing/records/demo-nmi-inv-0412')
  html = await page.text()
  check('history shows the acknowledgement and actor', html.includes('E2E: seen, finance to call') && html.includes('President (DEMO account)'))
}

// 6. Access isolation
const staff = await signIn('demo.dros.staff@example.test', cfg.staffPassword)
r = await follow(staff.jar, '/briefing/records/demo-nmi-inv-0412')
check('DROS staff → NMI record is 404', r.status === 404)
r = await follow(staff.jar, '/briefing/records/demo-dros-prj-0004')
check('DROS staff → DROS record is 200', r.status === 200)
r = await follow(staff.jar, '/briefing/finance/nmi')
check('DROS staff → NMI finance is 404', r.status === 404)
r = await follow(staff.jar, '/briefing/notifications')
check('non-executive cannot open the Telegram outbox', r.status === 404)
r = await follow(staff.jar, '/briefing/demo')
check('non-executive cannot open demo control', r.status === 404)
r = await req(staff.jar, '/api/briefing/run', { method: 'POST', body: JSON.stringify({ job: 'scan' }), headers: { 'content-type': 'application/json' } })
check('non-executive session cannot run jobs → 403', r.status === 403)
r = await follow(pres.jar, '/briefing/records/does-not-exist')
check('unknown record id → 404', r.status === 404)
r = await follow(pres.jar, '/briefing/records/..%2F..%2Fetc')
check('malformed record id → 404', r.status === 404)
// Expired / forged session: an undecryptable session cookie is treated as signed out.
const forged = new Jar()
for (const n of ['authjs.session-token', '__Secure-authjs.session-token']) forged.cookies.set(n, 'eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2Q0JDLUhTNTEyIn0.forged.expired.token.x')
r = await req(forged, '/briefing/records/demo-nmi-inv-0412')
check('forged/expired session → login', r.status === 307 && (r.headers.get('location') ?? '').includes('/login'))
r = await req(forged, '/api/briefing/run', { method: 'POST', body: JSON.stringify({ job: 'scan' }), headers: { 'content-type': 'application/json' } })
check('forged/expired session cannot run jobs → 401', r.status === 401)
r = await req(null, '/login?next=//evil.example')
html = await r.text()
check('login renders no off-site next field', !/name="next"/.test(html))

const failed = results.filter((x) => !x.ok)
console.log(`\n${results.length - failed.length}/${results.length} passed`)
writeFileSync(join(ROOT, '.briefing-local', STAGING ? 'staging/e2e-results.json' : 'e2e-results.json'), JSON.stringify({ at: new Date().toISOString(), target: BASE, results }, null, 2))
process.exit(failed.length ? 1 : 0)
