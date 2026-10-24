#!/usr/bin/env node
// Operator tool for the PRODUCTION MGI database (os.mgi-ventures.com). The connection string is
// fetched from the Vercel project (production DATABASE_URL) into memory only — never printed or
// written to disk.
//   node scripts/briefing/prod-db.mjs inventory          read-only: tables, counts, user/hash fingerprints
//   node scripts/briefing/prod-db.mjs backup <dir>       read-only: every public table to JSON files
//   node scripts/briefing/prod-db.mjs run <cmd…>         runs a command with DATABASE_URL set (e.g. prisma db push)
import { execFileSync, spawnSync } from 'node:child_process'
import { createHash } from 'node:crypto'
import { mkdirSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

const PROJECT = 'prj_NG1ONMQpwzWChKJXuH94TNnQY43r' // mgi-ecosystem (production)
const SCOPE = 'buddy1974s-projects'
const vapi = (path) => {
  const out = execFileSync('npx', ['vercel', 'api', path, '--scope', SCOPE], { env: { ...process.env, MSYS_NO_PATHCONV: '1' }, shell: true, stdio: ['ignore', 'pipe', 'ignore'] }).toString()
  return JSON.parse(out.slice(out.indexOf('{')))
}
function prodUrl(key = 'DATABASE_URL') {
  const env = vapi(`/v10/projects/${PROJECT}/env`).envs.find((e) => e.key === key && e.target.includes('production'))
  if (!env) throw new Error(`${key} not found`)
  const value = vapi(`/v1/projects/${PROJECT}/env/${env.id}`).value
  if (!/^postgres(ql)?:\/\//.test(value ?? '')) throw new Error(`${key} is not readable (sensitive?)`)
  return value
}

const [cmd, ...rest] = process.argv.slice(2)
const url = prodUrl()
const endpoint = new URL(url).hostname.split('.')[0]
const { neon } = await import('@neondatabase/serverless')
const sql = neon(url)
const fp = (s) => createHash('sha256').update(String(s)).digest('hex').slice(0, 12)

if (cmd === 'inventory') {
  const tables = (await sql`select table_name from information_schema.tables where table_schema='public' and table_type='BASE TABLE' order by 1`).map((r) => r.table_name)
  const counts = {}
  for (const t of tables) counts[t] = (await sql.query(`select count(*)::int n from "${t}"`))[0].n
  const users = await sql`select id, email, "globalRole", status, password, "updatedAt" from users order by "createdAt"`
  const exec = tables.filter((t) => t.startsWith('exec_'))
  const demoRows = exec.includes('exec_records') ? (await sql`select count(*)::int n from exec_records where "isDemo"`)[0].n : null
  const out = {
    at: new Date().toISOString(), endpoint, tables: tables.length, counts, execTables: exec, demoRecords: demoRows,
    users: users.map((u) => ({ idFp: fp(u.id), emailDomain: String(u.email).split('@')[1] ?? '(username)', role: u.globalRole, status: u.status, hasPassword: !!u.password, hashFp: u.password ? fp(u.password) : null, updatedAt: u.updatedAt })),
  }
  console.log(JSON.stringify(out, null, 2))
} else if (cmd === 'backup') {
  const dir = rest[0]
  mkdirSync(dir, { recursive: true })
  const tables = (await sql`select table_name from information_schema.tables where table_schema='public' and table_type='BASE TABLE' order by 1`).map((r) => r.table_name)
  for (const t of tables) {
    const rows = await sql.query(`select * from "${t}"`)
    writeFileSync(join(dir, `${t}.json`), JSON.stringify(rows))
    console.log(`${t}: ${rows.length}`)
  }
  writeFileSync(join(dir, '_meta.json'), JSON.stringify({ at: new Date().toISOString(), endpoint, tables }))
} else if (cmd === 'run') {
  const unpooled = (() => { try { return prodUrl('DATABASE_URL_UNPOOLED') } catch { return url } })()
  const r = spawnSync(rest[0], rest.slice(1), { stdio: 'inherit', shell: true, env: { ...process.env, DATABASE_URL: url, DATABASE_URL_UNPOOLED: unpooled, PROD_DB_ENDPOINT: endpoint, MSYS_NO_PATHCONV: '1' } })
  process.exit(r.status ?? 1)
} else {
  console.log('usage: inventory | backup <dir> | run <cmd…>')
  process.exit(1)
}
