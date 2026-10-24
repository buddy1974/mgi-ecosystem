#!/usr/bin/env node
// Verifies the three briefing workflows in a THROWAWAY n8n container (never the production
// instance): import → credential → execute each against the MGI OS (os.mgi-ventures.com).
//   node scripts/briefing/n8n-verify.mjs <n8n image tag, e.g. 2.9.4 | 2.4.8>
// Uses <repo>/.briefing-local/production/secrets.json; secret files live in a temp dir
// that is deleted afterwards; the container is removed at the end.
import { execFileSync } from 'node:child_process'
import { mkdtempSync, readFileSync, writeFileSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const tag = process.argv[2] ?? '2.9.4'
const here = dirname(fileURLToPath(import.meta.url))
const APP = join(here, '..', '..')
const s = JSON.parse(readFileSync(join(APP, '..', '..', '.briefing-local', 'production', 'secrets.json'), 'utf8'))
const name = `n8n-briefing-verify-${tag.replace(/\W/g, '')}`
const work = mkdtempSync(join(tmpdir(), 'n8nv-'))
const env = { ...process.env, MSYS_NO_PATHCONV: '1' }
const docker = (...a) => execFileSync('docker', a, { env, stdio: ['ignore', 'pipe', 'pipe'] }).toString()
const results = []

try {
  const CRED_ID = 'MgiExecCredStg01'
  writeFileSync(join(work, 'cred.json'), JSON.stringify([{
    id: CRED_ID, name: 'MGI Exec Briefing — OS access headers', type: 'httpCustomAuth',
    data: { json: JSON.stringify({ headers: { 'x-exec-briefing-token': s.briefingToken } }) },
  }]))
  const files = ['mgi-exec-cycle', 'mgi-exec-digest', 'mgi-exec-morning-brief']
  for (const f of files) {
    const w = JSON.parse(readFileSync(join(APP, 'docs', 'briefing-centre', 'n8n', `${f}.json`), 'utf8'))
    w.nodes.find((n) => n.name === 'Config').parameters.assignments.assignments.find((a) => a.name === 'osBaseUrl').value = s.url
    w.nodes.find((n) => n.type === 'n8n-nodes-base.httpRequest').credentials.httpCustomAuth.id = CRED_ID
    writeFileSync(join(work, `${f}.json`), JSON.stringify(w))
  }
  docker('run', '-d', '--name', name, '-v', `${work}:/import:ro`, '-e', 'N8N_DIAGNOSTICS_ENABLED=false', '-e', 'GENERIC_TIMEZONE=Africa/Douala', `n8nio/n8n:${tag}`)
  await new Promise((r) => setTimeout(r, 35_000))
  const version = docker('exec', name, 'n8n', '--version').trim().split('\n').pop()
  console.log(`n8n ${version} (isolated container ${name})`)
  docker('exec', name, 'n8n', 'import:credentials', '--input=/import/cred.json')
  for (const f of files) docker('exec', name, 'n8n', 'import:workflow', `--input=/import/${f}.json`)
  const ids = { 'mgi-exec-cycle': 'MgiExecCycle0001', 'mgi-exec-digest': 'MgiExecDigest001', 'mgi-exec-morning-brief': 'MgiExecMorning01' }
  for (const f of files) {
    let out = ''
    try {
      out = docker('exec', '-e', 'N8N_RUNNERS_BROKER_PORT=5690', name, 'n8n', 'execute', `--id=${ids[f]}`, '--rawOutput')
    } catch (e) {
      out = String(e.stdout ?? '') + String(e.stderr ?? '')
    }
    const json = out.slice(out.indexOf('{'))
    let ok = false, body = ''
    try {
      const parsed = JSON.parse(json)
      const run = parsed.data?.resultData?.runData?.['Run briefing job']?.[0]
      const item = run?.data?.main?.[0]?.[0]?.json
      ok = run?.executionStatus === 'success' && !!item?.job
      body = JSON.stringify(item ?? parsed.data?.resultData?.error?.message ?? '').slice(0, 300)
    } catch { body = out.split(s.briefingToken).join('<redacted>').slice(-400) }
    results.push({ workflow: f, ok, body })
    console.log(`${ok ? 'PASS' : 'FAIL'}  ${f} → ${body}`)
  }
} finally {
  try { docker('rm', '-f', name) } catch { /* already gone */ }
  rmSync(work, { recursive: true, force: true })
}
writeFileSync(join(APP, '..', '..', '.briefing-local', 'production', `n8n-verify-${tag}.json`), JSON.stringify({ at: new Date().toISOString(), tag, results }, null, 2))
process.exit(results.length === 3 && results.every((r) => r.ok) ? 0 : 1)
