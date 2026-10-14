#!/usr/bin/env node
// MGI Executive OS — LOCAL PRESENTATION DEMO launcher (branch demo/exos-local, never merge).
// Usage (from apps/executive-os): node scripts/demo/start-exos-demo.mjs [--build] [--seed]
// - Database: local Docker Postgres (container mgi-exos-demo-pg) reached through a local
//   neon HTTP proxy (mgi-exos-demo-proxy) on 127.0.0.1 — never Neon / production.
// - Real sign-in (repaired Credentials provider); demo user exists only in the local database.
// - All other secrets blanked (AI, NMI bridge, Telegram, e-mail, n8n); outbound fetch blocked
//   except localhost (Phase 3B network guard). Server bound to 127.0.0.1.
import { spawn, execFileSync } from "node:child_process"
import { randomBytes } from "node:crypto"
import { readFileSync, writeFileSync } from "node:fs"
import { fileURLToPath } from "node:url"
import { dirname, join } from "node:path"
import { buildChildEnv, envKeysFromAppFiles } from "../test-env/guard-core.mjs"

const here = dirname(fileURLToPath(import.meta.url))
const APP_DIR = join(here, "..", "..")
const ROOT = join(APP_DIR, "..", "..")
const cfg = JSON.parse(readFileSync(join(ROOT, ".demo-local", "config.json"), "utf8"))
// Stable session secret for the local demo (kept in the git-excluded config) so that
// browser sessions survive a restart instead of failing the first sign-in.
if (!cfg.authSecret) {
  cfg.authSecret = randomBytes(32).toString("base64")
  writeFileSync(join(ROOT, ".demo-local", "config.json"), JSON.stringify(cfg))
}
const port = String(cfg.port ?? 3400)

if (!/^http:\/\/127\.0\.0\.1:\d+\/sql$/.test(cfg.sqlEndpoint)) throw new Error("sqlEndpoint must be loopback")

// Make sure the local demo database containers are running (local Docker only).
try {
  execFileSync("docker", ["start", "mgi-exos-demo-pg", "mgi-exos-demo-proxy"], { stdio: "ignore" })
} catch {
  console.error("REFUSED — Docker containers mgi-exos-demo-pg / mgi-exos-demo-proxy not available. Start Docker Desktop first.")
  process.exit(1)
}

const BLANK = [
  "DATABASE_URL_UNPOOLED", "DIRECT_URL", "NMI_DATABASE_URL", "ANTHROPIC_API_KEY", "OPENAI_API_KEY",
  "TELEGRAM_BOT_TOKEN", "TELEGRAM_CHAT_ID", "RESEND_API_KEY", "EMAIL_SERVER", "EMAIL_FROM",
  "N8N_WEBHOOK_URL", "N8N_API_KEY", "N8N_SECRET", "NEXTAUTH_SECRET", "NEXTAUTH_URL", "VERCEL", "VERCEL_ENV",
]
const demoEnv = Object.fromEntries(BLANK.map((k) => [k, ""]))
Object.assign(demoEnv, {
  DATABASE_URL: `postgres://postgres:${cfg.pgPassword}@db.localtest.me:5432/main`,
  MGI_LOCAL_DEMO: "1",
  MGI_LOCAL_DEMO_SQL_ENDPOINT: cfg.sqlEndpoint,
  AUTH_SECRET: cfg.authSecret,
  AUTH_TRUST_HOST: "true",
  AUTH_URL: `http://localhost:${port}`,
  NEXT_TELEMETRY_DISABLED: "1",
  TZ: "UTC", // the neon HTTP adapter writes local wall-clock time; UTC keeps timestamps correct
  TEST_NETWORK_ALLOW: "",
})
const child = buildChildEnv({ baseEnv: process.env, testEnv: demoEnv, appFileKeys: envKeysFromAppFiles(APP_DIR) })
delete child.VERCEL
child.NODE_OPTIONS = `${child.NODE_OPTIONS ? child.NODE_OPTIONS + " " : ""}--require ${JSON.stringify(join(here, "..", "test-env", "network-guard.cjs"))}`
const leaked = BLANK.filter((k) => child[k])
if (leaked.length) { console.error(`REFUSED — not blanked: ${leaked.join(", ")}`); process.exit(1) }

function run(cmd, args, cwd = APP_DIR) {
  return new Promise((resolve) => {
    const p = spawn(cmd, args, { cwd, env: child, stdio: "inherit", shell: process.platform === "win32" })
    p.on("exit", (code) => resolve(code ?? 1))
  })
}

const seedOnly = process.argv.includes("--seed-only")
if (process.argv.includes("--seed") || seedOnly) {
  const pw = process.env.DEMO_CEO_PASSWORD || cfg.demoCeoPassword
  if (!pw) { console.error("--seed needs a demo password (.demo-local/config.json)"); process.exit(1) }
  console.log("Resetting the local demo database to the original synthetic data...")
  child.DEMO_CEO_EMAIL = "demo.ceo@example.test"
  child.DEMO_CEO_PASSWORD = pw
  const code = await run("npx", ["tsx", "prisma/seed-local-demo.ts"], join(ROOT, "packages", "database"))
  delete child.DEMO_CEO_PASSWORD
  if (code !== 0 || seedOnly) process.exit(code)
}
if (process.argv.includes("--build")) {
  const code = await run("npx", ["next", "build"])
  if (code !== 0) process.exit(code)
}
console.log(`MGI Executive OS LOCAL DEMO (synthetic data, local DB, outbound network blocked): http://localhost:${port}/login`)
process.exit(await run("npx", ["next", "start", "-p", port, "-H", "127.0.0.1"]))
