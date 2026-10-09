// Test-environment guard — pure logic (Phase 3B, 2026-10-09).
// Shared verbatim between mgi-ecosystem/apps/executive-os and nmi-automation-os/dashboard.
//
// Purpose: refuse to run any database-writing test unless the target is a
// verified, explicitly allow-listed NON-production database, and no real
// outbound integration (Telegram, n8n, email, PayUnit, AI, Google, WhatsApp)
// is configured. Fails closed whenever identity cannot be established.
// Never prints credentials or full connection strings.

import { createHash } from "node:crypto"
import { readFileSync, existsSync } from "node:fs"
import { join } from "node:path"

export const CONFIRMATION_VALUE = "isolated-test-database"

// SHA-256 fingerprints of PRODUCTION Neon identities (values themselves are not
// stored). Captured read-only on 2026-10-09 from `neon.endpoint_id` and
// `neon.timeline_id`. Both systems are listed in both repos.
export const PRODUCTION_FINGERPRINTS = Object.freeze({
  endpoint: Object.freeze([
    "e84280c30d787c89d3b33b99c16bc5ad980fa3f56891710db1bdcf5c76d2540f", // MGI Executive OS
    "d7c09355a8a712d4406f5421c381e50a4bb4ce056adf4605f18a5e461c2ef70d", // NMI Automation OS
  ]),
  timeline: Object.freeze([
    "e42bc62fe32494028bfb110857207486528fd01b8911af60764cabfa4d07699a", // MGI Executive OS
    "978fc29a18133cb47c9341ecd140b2fffa5357a72fefe387986fde934d1ce728", // NMI Automation OS
  ]),
})

export const sha256 = (s) => createHash("sha256").update(String(s)).digest("hex")
export const short = (hex) => (hex ? `${hex.slice(0, 8)}…` : "none")

/** Neon endpoint ID from a hostname, e.g. ep-xyz-123-pooler.region.aws.neon.tech → ep-xyz-123 */
export function endpointFromHost(host) {
  return String(host).split(".")[0].replace(/-pooler$/, "")
}

/**
 * Minimal .env parser (KEY=VALUE, # comments, optional quotes). Never logs values.
 * @param {string} text
 * @returns {Record<string, string>}
 */
export function parseEnvText(text) {
  /** @type {Record<string, string>} */
  const out = {}
  for (const raw of String(text).split(/\r?\n/)) {
    const line = raw.trim()
    if (!line || line.startsWith("#")) continue
    const i = line.indexOf("=")
    if (i <= 0) continue
    const key = line.slice(0, i).trim().replace(/^export\s+/, "")
    let val = line.slice(i + 1).trim()
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) val = val.slice(1, -1)
    out[key] = val
  }
  return out
}

/** Names of keys defined in the app's own .env files (which Next.js would auto-load). */
export function envKeysFromAppFiles(appDir) {
  const files = [".env", ".env.local", ".env.production", ".env.production.local", ".env.development", ".env.development.local"]
  const keys = new Set()
  for (const f of files) {
    const p = join(appDir, f)
    if (existsSync(p)) for (const k of Object.keys(parseEnvText(readFileSync(p, "utf8")))) keys.add(k)
  }
  return [...keys]
}

/** Allow-list file: one SHA-256 timeline fingerprint per line (git-ignored, written by the operator). */
export function readAllowlist(path) {
  if (!existsSync(path)) return []
  return readFileSync(path, "utf8").split(/\r?\n/).map((l) => l.trim().toLowerCase()).filter((l) => /^[0-9a-f]{64}$/.test(l))
}

/**
 * Static checks (no network). Returns { ok, errors[], targets[] }.
 * - explicit confirmation flag
 * - every DB variable present, parseable, on a Neon host, not a production endpoint
 * - every forbidden integration variable blank
 * - allow-list present (fail closed if empty)
 */
export function checkStaticConfig({ env, dbVars, forbiddenVars, allowlist, production = PRODUCTION_FINGERPRINTS }) {
  const errors = []
  const targets = []
  if (env.TEST_ENV_CONFIRM !== CONFIRMATION_VALUE) {
    errors.push(`TEST_ENV_CONFIRM must equal "${CONFIRMATION_VALUE}"`)
  }
  for (const name of dbVars) {
    const url = env[name]
    if (!url) { errors.push(`${name} is not set`); continue }
    let host
    try { host = new URL(url).hostname } catch { errors.push(`${name} is not a valid URL`); continue }
    if (!host.endsWith(".neon.tech")) errors.push(`${name} host is not a Neon host (identity cannot be verified)`)
    const ep = endpointFromHost(host)
    const epHash = sha256(ep)
    if (production.endpoint.includes(epHash)) errors.push(`${name} points at a PRODUCTION endpoint (${short(epHash)}) — refused`)
    targets.push({ name, host, endpointSha256: epHash })
  }
  for (const name of forbiddenVars) {
    if (env[name] !== undefined && env[name] !== "") errors.push(`${name} must be blank in the test environment`)
  }
  if (!allowlist || allowlist.length === 0) errors.push("test DB allow-list is missing or empty (fail closed)")
  return { ok: errors.length === 0, errors, targets }
}

/**
 * Live identity check from values read with a READ ONLY query:
 *   select current_setting('neon.timeline_id', true), current_setting('neon.endpoint_id', true)
 */
/**
 * @param {{ name: string, timelineId: string|null, endpointId: string|null, hostEndpointSha256?: string|null,
 *          allowlist: string[], production?: { endpoint: readonly string[], timeline: readonly string[] } }} args
 */
export function checkLiveIdentity({ name, timelineId, endpointId, hostEndpointSha256 = null, allowlist, production = PRODUCTION_FINGERPRINTS }) {
  const errors = []
  if (!timelineId || !endpointId) {
    errors.push(`${name}: database identity could not be established (fail closed)`)
    return { ok: false, errors }
  }
  const tl = sha256(timelineId)
  const ep = sha256(endpointId)
  if (production.timeline.includes(tl)) errors.push(`${name}: connected to a PRODUCTION timeline (${short(tl)}) — refused`)
  if (production.endpoint.includes(ep)) errors.push(`${name}: connected to a PRODUCTION endpoint (${short(ep)}) — refused`)
  if (hostEndpointSha256 && ep !== hostEndpointSha256) errors.push(`${name}: endpoint reported by the server does not match the URL host`)
  if (!allowlist.includes(tl)) errors.push(`${name}: timeline ${short(tl)} is not in the test allow-list`)
  return { ok: errors.length === 0, errors, timelineSha256: tl, endpointSha256: ep }
}

/**
 * Child-process environment for a test server/build: starts from the current
 * environment, removes every key Next.js would otherwise load from the app's
 * own .env files, applies the test env, and blanks any remaining app-file key
 * (blank values are NOT overridden by @next/env — verified 2026-10-09).
 */
export function buildChildEnv({ baseEnv, testEnv, appFileKeys }) {
  const child = { ...baseEnv }
  for (const k of appFileKeys) delete child[k]
  Object.assign(child, testEnv)
  for (const k of appFileKeys) if (!(k in testEnv)) child[k] = ""
  return child
}
