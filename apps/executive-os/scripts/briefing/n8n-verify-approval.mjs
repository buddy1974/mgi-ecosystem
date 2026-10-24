#!/usr/bin/env node
// Verifies docs/briefing-centre/n8n-security/mgi-approval-alert.secured.json in a THROWAWAY
// n8n container: the webhook rejects calls without / with a wrong x-n8n-key, and input is
// escaped. The Resend URL is replaced by a dead loopback address in the test copy, so no
// e-mail can be sent. Credentials are throwaway random values.
//   node scripts/briefing/n8n-verify-approval.mjs [tag]
import { execFileSync } from 'node:child_process'
import { randomBytes } from 'node:crypto'
import { mkdtempSync, readFileSync, writeFileSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const tag = process.argv[2] ?? '2.9.4'
const APP = join(dirname(fileURLToPath(import.meta.url)), '..', '..')
const name = 'n8n-approval-verify'
const port = 5699
const work = mkdtempSync(join(tmpdir(), 'n8na-'))
const env = { ...process.env, MSYS_NO_PATHCONV: '1' }
const docker = (...a) => execFileSync('docker', a, { env, stdio: ['ignore', 'pipe', 'pipe'] }).toString()
const key = randomBytes(24).toString('base64url')
const results = []
const check = (n, ok, d = '') => { results.push({ n, ok }); console.log(`${ok ? 'PASS' : 'FAIL'}  ${n}${d ? ` — ${d}` : ''}`) }

try {
  const w = JSON.parse(readFileSync(join(APP, 'docs', 'briefing-centre', 'n8n-security', 'mgi-approval-alert.secured.json'), 'utf8'))
  w.nodes.find((n) => n.name === 'Send via Resend').parameters.url = 'http://127.0.0.1:9/emails' // dead address
  w.nodes.find((n) => n.name === 'Send via Resend').retryOnFail = false
  w.nodes.find((n) => n.type === 'n8n-nodes-base.webhook').credentials.httpHeaderAuth.id = 'ApprovalKeyTest1'
  w.nodes.find((n) => n.name === 'Send via Resend').credentials.httpHeaderAuth.id = 'ResendDummyTest1'
  writeFileSync(join(work, 'wf.json'), JSON.stringify(w))
  writeFileSync(join(work, 'cred.json'), JSON.stringify([
    { id: 'ApprovalKeyTest1', name: 'MGI OS → n8n webhook key (x-n8n-key)', type: 'httpHeaderAuth', data: { name: 'x-n8n-key', value: key } },
    { id: 'ResendDummyTest1', name: 'Resend API key (Authorization: Bearer …)', type: 'httpHeaderAuth', data: { name: 'Authorization', value: 'Bearer dummy-not-a-key' } },
  ]))
  docker('run', '-d', '--name', name, '-p', `127.0.0.1:${port}:5678`, '-v', `${work}:/import:ro`, '-e', 'N8N_DIAGNOSTICS_ENABLED=false', `n8nio/n8n:${tag}`)
  await new Promise((r) => setTimeout(r, 25_000))
  docker('exec', name, 'n8n', 'import:credentials', '--input=/import/cred.json')
  docker('exec', name, 'n8n', 'import:workflow', '--input=/import/wf.json')
  docker('exec', name, 'n8n', 'update:workflow', '--id=MgiApprovalAlrt2', '--active=true')
  docker('restart', name)
  await new Promise((r) => setTimeout(r, 25_000))
  const url = `http://127.0.0.1:${port}/webhook/mgi-approval-alert`
  const post = (headers, body) => fetch(url, { method: 'POST', headers: { 'content-type': 'application/json', ...headers }, body: JSON.stringify(body) })
  const evil = { title: '<img src=x onerror=alert(1)>', requestedBy: 'x', entity: 'y', priority: 'HIGH', reviewUrl: 'https://evil.example/phish' }
  let r = await post({}, evil)
  check('no key → rejected', r.status === 401 || r.status === 403, String(r.status))
  r = await post({ 'x-n8n-key': 'wrong' }, evil)
  check('wrong key → rejected', r.status === 401 || r.status === 403, String(r.status))
  r = await post({ 'x-n8n-key': key }, evil)
  check('correct key → accepted by the webhook (send step then fails at the dead test address)', r.status !== 401 && r.status !== 403, String(r.status))
  // Inspect the Code node output of that execution (escaping + link restriction).
  await new Promise((res) => setTimeout(res, 3000))
  const out = docker('exec', name, 'sh', '-c', `cd /usr/local/lib/node_modules/n8n && node -e "
    const s=require('sqlite3');const db=new s.Database('/home/node/.n8n/database.sqlite',s.OPEN_READONLY);
    db.get('select d.data from execution_data d join execution_entity e on e.id=d.executionId order by e.id desc limit 1',(e,row)=>{console.log(row?row.data:'none');db.close()})"`)
  const errs = [...new Set(out.match(/"[^"]*(Error|error|refused|not defined)[^"]*"/g) ?? [])].slice(0, 6)
  console.log('execution errors:', errs.join(' | ').slice(0, 600))
  console.log('escaped title present:', out.includes('&lt;img'), '| raw title present:', out.includes('<img src=x'))
  // The raw input is also stored (as the webhook node's own output); these values can only come from the Code node.
  check('title is HTML-escaped before the e-mail', out.includes('&lt;img src=x onerror=alert(1)&gt;'))
  check('attacker link replaced by the OS approvals link', out.includes('https://os.mgi-ventures.com/approvals'))
} finally {
  try { docker('rm', '-f', name) } catch { /* gone */ }
  rmSync(work, { recursive: true, force: true })
}
process.exit(results.length === 5 && results.every((x) => x.ok) ? 0 : 1)
