#!/usr/bin/env node
// Verifies that the configured test environment targets ONLY an allow-listed,
// non-production Neon branch and that no real integration is configured.
// Usage:  node scripts/test-env/assert-test-db.mjs [--env-file <path>] [--static-only]
// Exit 0 = safe; exit 1 = refused (reasons printed, no secrets).
// The live check runs a single READ ONLY transaction; nothing is written.
import { readFileSync, existsSync } from "node:fs"
import {
  parseEnvText, readAllowlist, checkStaticConfig, checkLiveIdentity, short,
} from "./guard-core.mjs"
import * as cfg from "./config.mjs"

export function resolveTestEnv(envFile = cfg.TEST_ENV_FILE) {
  if (!existsSync(envFile)) return { env: null, error: `test env file not found: ${envFile}` }
  return { env: parseEnvText(readFileSync(envFile, "utf8")) }
}

export function dbVarsFor(env) {
  return [...cfg.REQUIRED_DB_VARS, ...cfg.OPTIONAL_DB_VARS.filter((v) => env[v])]
}

export function forbiddenFor(env) {
  return env.TEST_ALLOW_AI === "1" ? cfg.FORBIDDEN_VARS : [...cfg.FORBIDDEN_VARS, ...cfg.AI_VARS]
}

async function liveIdentity(url) {
  const { neon } = await import("@neondatabase/serverless")
  const sql = neon(url)
  const [rows] = await sql.transaction(
    (tx) => [tx.query("select current_setting('neon.timeline_id', true) as tl, current_setting('neon.endpoint_id', true) as ep")],
    { readOnly: true },
  )
  return { timelineId: rows[0]?.tl || null, endpointId: rows[0]?.ep || null }
}

export async function assertTestEnvironment({ envFile, staticOnly = false, log = console.log } = {}) {
  const { env, error } = resolveTestEnv(envFile)
  if (!env) return { ok: false, errors: [error] }
  const allowlist = readAllowlist(cfg.ALLOWLIST_FILE)
  const st = checkStaticConfig({ env, dbVars: dbVarsFor(env), forbiddenVars: forbiddenFor(env), allowlist })
  if (!st.ok) return { ok: false, errors: st.errors, env }
  if (staticOnly) return { ok: true, errors: [], env, targets: st.targets }
  const errors = []
  for (const t of st.targets) {
    let ident
    try { ident = await liveIdentity(env[t.name]) } catch (e) {
      errors.push(`${t.name}: identity query failed (${e.code || e.name}) — fail closed`); continue
    }
    const r = checkLiveIdentity({ name: t.name, ...ident, hostEndpointSha256: t.endpointSha256, allowlist })
    if (!r.ok) errors.push(...r.errors)
    else log(`  ${t.name}: endpoint ${short(r.endpointSha256)} timeline ${short(r.timelineSha256)} — allow-listed, non-production`)
  }
  return { ok: errors.length === 0, errors, env, targets: st.targets }
}

const isMain = process.argv[1] && import.meta.url.endsWith(process.argv[1].replace(/\\/g, "/").split("/").pop())
if (isMain) {
  const i = process.argv.indexOf("--env-file")
  const envFile = i > 0 ? process.argv[i + 1] : undefined
  const res = await assertTestEnvironment({ envFile, staticOnly: process.argv.includes("--static-only") })
  if (!res.ok) {
    console.error("TEST ENVIRONMENT REFUSED:")
    for (const e of res.errors) console.error(`  - ${e}`)
    process.exit(1)
  }
  console.log("TEST ENVIRONMENT VERIFIED (isolated, allow-listed, integrations disabled)")
}
