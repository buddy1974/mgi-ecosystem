#!/usr/bin/env node
// Runs a command against the STAGING briefing database with the private staging settings
// from <repo>/.briefing-local/staging/ (git-ignored). Values are never printed.
//   node scripts/briefing/with-staging-env.mjs npx tsx scripts/briefing/cli.ts reset --confirm-db=<endpoint id>
//   node scripts/briefing/with-staging-env.mjs --endpoint      (prints the endpoint id to confirm)
import { spawnSync } from 'node:child_process'
import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const DIR = join(dirname(fileURLToPath(import.meta.url)), '..', '..', '..', '..', '.briefing-local', 'staging')
const env = {}
for (const line of readFileSync(join(DIR, 'staging-db.env'), 'utf8').split(/\r?\n/)) {
  const m = line.match(/^([A-Z0-9_]+)=(.*)$/)
  if (m) env[m[1]] = m[2].replace(/^["']|["']$/g, '')
}
const s = JSON.parse(readFileSync(join(DIR, 'staging-secrets.json'), 'utf8'))
if (process.argv[2] === '--endpoint') {
  console.log(new URL(env.DATABASE_URL).hostname.split('.')[0])
  process.exit(0)
}
const child = { ...process.env }
for (const k of Object.keys(child)) if (/TELEGRAM|CHAT_ID|N8N|MGI_LOCAL_SQL_ENDPOINT|VERCEL/.test(k)) delete child[k]
Object.assign(child, {
  DATABASE_URL: env.DATABASE_URL,
  EXEC_DEMO_MODE: '1',
  EXEC_OS_BASE_URL: s.url,
  DEMO_PRESIDENT_PASSWORD: s.presidentPassword,
  DEMO_STAFF_PASSWORD: s.staffPassword,
  TZ: 'UTC',
})
const r = spawnSync(process.argv[2], process.argv.slice(3), { stdio: 'inherit', env: child, shell: process.platform === 'win32', cwd: join(DIR, '..', '..', 'apps', 'executive-os') })
process.exit(r.status ?? 1)
