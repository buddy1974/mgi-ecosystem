#!/usr/bin/env node
// Executive Briefing Centre — LOCAL demo/dev launcher (isolated Docker DB, loopback only).
//   node scripts/briefing/start-local.mjs [--build] [--users] [--mock-telegram]
// --users          create/refresh the synthetic accounts (example.test) in the local DB
// --mock-telegram  start a loopback Telegram Bot API mock; messages land in
//                  <repo>/.briefing-local/telegram-inbox.jsonl (nothing leaves the machine)
// Every outbound integration secret is blanked; the server binds to 127.0.0.1.
import { spawn } from 'node:child_process'
import { createServer } from 'node:http'
import { randomBytes } from 'node:crypto'
import { appendFileSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))
const APP = join(here, '..', '..')
const CFG_FILE = join(APP, '..', '..', '.briefing-local', 'config.json')
const cfg = JSON.parse(readFileSync(CFG_FILE, 'utf8'))
if (!/^http:\/\/127\.0\.0\.1:\d+\/sql$/.test(cfg.sqlEndpoint)) throw new Error('sqlEndpoint must be loopback')
for (const k of ['authSecret', 'briefingToken']) if (!cfg[k]) cfg[k] = randomBytes(32).toString('base64')
if (!cfg.presidentPassword) cfg.presidentPassword = randomBytes(12).toString('base64url')
if (!cfg.staffPassword) cfg.staffPassword = randomBytes(12).toString('base64url')
cfg.appPort ??= 3460
writeFileSync(CFG_FILE, JSON.stringify(cfg, null, 2))

const BLANK = ['DATABASE_URL_UNPOOLED', 'NMI_DATABASE_URL', 'ANTHROPIC_API_KEY', 'OPENAI_API_KEY', 'TELEGRAM_BOT_TOKEN', 'TELEGRAM_CHAT_ID',
  'OPERATIONS_CHAT_ID', 'TELEGRAM_PRESIDENT_CHAT_ID', 'TELEGRAM_DEMO_CHAT_ID', 'TELEGRAM_API_BASE', 'EXEC_TELEGRAM_LIVE', 'RESEND_API_KEY',
  'EMAIL_SERVER', 'EMAIL_FROM', 'N8N_SECRET', 'N8N_BASE_URL', 'BOOKSHIELD_SIGNALS_URL', 'BOOKSHIELD_SIGNALS_TOKEN', 'NEXTAUTH_URL', 'VERCEL', 'VERCEL_ENV']
const env = { ...process.env }
for (const k of BLANK) delete env[k]
Object.assign(env, {
  DATABASE_URL: `postgres://postgres:${cfg.pgPassword}@db.localtest.me:5432/main`,
  MGI_LOCAL_SQL_ENDPOINT: cfg.sqlEndpoint,
  EXEC_DEMO_MODE: '1',
  EXEC_OS_BASE_URL: `http://localhost:${cfg.appPort}`,
  EXEC_BRIEFING_TOKEN: cfg.briefingToken,
  EXEC_ALERTS_PER_HOUR: '8',
  AUTH_SECRET: cfg.authSecret,
  AUTH_TRUST_HOST: 'true',
  AUTH_URL: `http://localhost:${cfg.appPort}`,
  NEXT_TELEMETRY_DISABLED: '1',
  TZ: 'UTC',
})

if (process.argv.includes('--mock-telegram')) {
  const inbox = join(APP, '..', '..', '.briefing-local', 'telegram-inbox.jsonl')
  const srv = createServer((req, res) => {
    let raw = ''
    req.on('data', (c) => (raw += c))
    req.on('end', () => {
      const body = JSON.parse(raw || '{}')
      appendFileSync(inbox, JSON.stringify({ at: new Date().toISOString(), chat_id: body.chat_id, text: body.text, button: body.reply_markup ?? null }) + '\n')
      res.writeHead(200, { 'Content-Type': 'application/json' }).end(JSON.stringify({ ok: true, result: { message_id: Date.now() % 1e9 } }))
    })
  })
  await new Promise((r) => srv.listen(cfg.mockTelegramPort ?? 3461, '127.0.0.1', r))
  Object.assign(env, { TELEGRAM_BOT_TOKEN: '000000:LOCAL-MOCK-ONLY', TELEGRAM_DEMO_CHAT_ID: '-1000000000000', TELEGRAM_API_BASE: `http://127.0.0.1:${cfg.mockTelegramPort ?? 3461}` })
  console.log(`Mock Telegram (loopback) → ${inbox}`)
}

function run(cmd, args, cwd = APP) {
  return new Promise((resolve) => {
    const p = spawn(cmd, args, { cwd, env, stdio: 'inherit', shell: process.platform === 'win32' })
    p.on('exit', (code) => resolve(code ?? 1))
  })
}

if (process.argv.includes('--users')) {
  env.LOCAL_PRESIDENT_PASSWORD = cfg.presidentPassword
  env.LOCAL_STAFF_PASSWORD = cfg.staffPassword
  const code = await run('npx', ['tsx', 'scripts/briefing/local-users.ts'])
  delete env.LOCAL_PRESIDENT_PASSWORD
  delete env.LOCAL_STAFF_PASSWORD
  if (code !== 0) process.exit(code)
}
if (process.argv.includes('--build')) {
  const code = await run('npx', ['next', 'build'])
  if (code !== 0) process.exit(code)
}
console.log(`MGI Executive OS — LOCAL briefing demo: http://localhost:${cfg.appPort}/briefing  (accounts: see ${CFG_FILE})`)
process.exit(await run('npx', ['next', 'start', '-p', String(cfg.appPort), '-H', '127.0.0.1']))
