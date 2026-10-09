// Test-environment safety guard — unit + process-level tests (Phase 3B). No network, no database.
import { test, describe } from "node:test"
import assert from "node:assert/strict"
import { mkdtempSync, writeFileSync, rmSync } from "node:fs"
import { tmpdir } from "node:os"
import { join } from "node:path"
import { spawnSync } from "node:child_process"
import { createRequire } from "node:module"

import {
  CONFIRMATION_VALUE, PRODUCTION_FINGERPRINTS, sha256, endpointFromHost, parseEnvText,
  checkStaticConfig, checkLiveIdentity, buildChildEnv, envKeysFromAppFiles,
} from "../scripts/test-env/guard-core.mjs"
import { FORBIDDEN_VARS } from "../scripts/test-env/config.mjs"

const GUARD = join(__dirname, "..", "scripts", "test-env", "network-guard.cjs")
const TEST_HOST = "ep-test-branch-123456-pooler.eu-central-1.aws.neon.tech"
const PROD_HOST = "ep-fake-production-999-pooler.eu-central-1.aws.neon.tech"
const FAKE_PROD = { endpoint: [sha256(endpointFromHost(PROD_HOST))], timeline: [sha256("prod-timeline")] }
const allowlist = [sha256("test-timeline")]
const base = { TEST_ENV_CONFIRM: CONFIRMATION_VALUE, DATABASE_URL: `postgresql://u:p@${TEST_HOST}/neondb` }

describe("static configuration checks", () => {
  test("committed production fingerprints are well-formed SHA-256 values", () => {
    for (const h of [...PRODUCTION_FINGERPRINTS.endpoint, ...PRODUCTION_FINGERPRINTS.timeline]) assert.match(h, /^[0-9a-f]{64}$/)
    assert.equal(PRODUCTION_FINGERPRINTS.endpoint.length, 2)
    assert.equal(PRODUCTION_FINGERPRINTS.timeline.length, 2)
  })
  test("a correct isolated configuration passes", () => {
    const r = checkStaticConfig({ env: base, dbVars: ["DATABASE_URL"], forbiddenVars: FORBIDDEN_VARS, allowlist, production: FAKE_PROD })
    assert.deepEqual(r.errors, []); assert.equal(r.ok, true)
  })
  test("missing explicit confirmation is refused", () => {
    const r = checkStaticConfig({ env: { ...base, TEST_ENV_CONFIRM: "yes" }, dbVars: ["DATABASE_URL"], forbiddenVars: [], allowlist, production: FAKE_PROD })
    assert.equal(r.ok, false); assert.match(r.errors.join(), /TEST_ENV_CONFIRM/)
  })
  test("a production endpoint host is refused before any connection", () => {
    const env = { ...base, DATABASE_URL: `postgresql://u:p@${PROD_HOST}/neondb` }
    const r = checkStaticConfig({ env, dbVars: ["DATABASE_URL"], forbiddenVars: [], allowlist, production: FAKE_PROD })
    assert.equal(r.ok, false); assert.match(r.errors.join(), /PRODUCTION endpoint/)
  })
  test("non-Neon or unparsable database URLs are refused (identity unverifiable)", () => {
    for (const url of ["postgresql://u:p@db.example.com/x", "not a url"]) {
      const r = checkStaticConfig({ env: { ...base, DATABASE_URL: url }, dbVars: ["DATABASE_URL"], forbiddenVars: [], allowlist, production: FAKE_PROD })
      assert.equal(r.ok, false, url)
    }
  })
  test("missing database variable is refused", () => {
    const r = checkStaticConfig({ env: { TEST_ENV_CONFIRM: CONFIRMATION_VALUE }, dbVars: ["DATABASE_URL"], forbiddenVars: [], allowlist, production: FAKE_PROD })
    assert.equal(r.ok, false)
  })
  test("any configured outbound integration is refused", () => {
    for (const v of ["TELEGRAM_BOT_TOKEN", "N8N_SECRET", "EMAIL_SERVER", "PAYUNIT_API_KEY", "OS_PASSWORD"]) {
      const r = checkStaticConfig({ env: { ...base, [v]: "something" }, dbVars: ["DATABASE_URL"], forbiddenVars: FORBIDDEN_VARS, allowlist, production: FAKE_PROD })
      assert.equal(r.ok, false, v)
    }
  })
  test("empty allow-list fails closed", () => {
    const r = checkStaticConfig({ env: base, dbVars: ["DATABASE_URL"], forbiddenVars: [], allowlist: [], production: FAKE_PROD })
    assert.equal(r.ok, false); assert.match(r.errors.join(), /allow-list/)
  })
  test("env parser handles quotes/comments and never needs to print values", () => {
    assert.deepEqual(parseEnvText('# c\nA="1"\nexport B=\'2\'\nC=3=4\n\nbad'), { A: "1", B: "2", C: "3=4" })
  })
})

describe("live identity checks (values as returned by the READ ONLY query)", () => {
  const hostEp = sha256(endpointFromHost(TEST_HOST))
  test("allow-listed non-production branch passes", () => {
    const r = checkLiveIdentity({ name: "DATABASE_URL", timelineId: "test-timeline", endpointId: endpointFromHost(TEST_HOST), hostEndpointSha256: hostEp, allowlist, production: FAKE_PROD })
    assert.deepEqual(r.errors, [])
  })
  test("production timeline is refused even behind a different hostname", () => {
    const r = checkLiveIdentity({ name: "DATABASE_URL", timelineId: "prod-timeline", endpointId: endpointFromHost(TEST_HOST), hostEndpointSha256: hostEp, allowlist: [...allowlist, sha256("prod-timeline")], production: FAKE_PROD })
    assert.equal(r.ok, false); assert.match(r.errors.join(), /PRODUCTION timeline/)
  })
  test("unknown identity fails closed", () => {
    const r = checkLiveIdentity({ name: "DATABASE_URL", timelineId: null, endpointId: null, allowlist, production: FAKE_PROD })
    assert.equal(r.ok, false); assert.match(r.errors.join(), /fail closed/)
  })
  test("timeline not in the allow-list is refused", () => {
    const r = checkLiveIdentity({ name: "DATABASE_URL", timelineId: "other", endpointId: endpointFromHost(TEST_HOST), hostEndpointSha256: hostEp, allowlist, production: FAKE_PROD })
    assert.equal(r.ok, false)
  })
  test("server-reported endpoint must match the URL host", () => {
    const r = checkLiveIdentity({ name: "DATABASE_URL", timelineId: "test-timeline", endpointId: "ep-something-else", hostEndpointSha256: hostEp, allowlist, production: FAKE_PROD })
    assert.equal(r.ok, false)
  })
})

describe("environment isolation from the app's .env files (real @next/env)", () => {
  test("production values in .env.local cannot leak into a test server", () => {
    const dir = mkdtempSync(join(tmpdir(), "t3b-env-"))
    try {
      writeFileSync(join(dir, ".env.local"), "TELEGRAM_BOT_TOKEN=prod-token\nDATABASE_URL=postgresql://prod\nAUTH_SECRET=prod-secret\n")
      const child = buildChildEnv({ baseEnv: { PATH: process.env.PATH ?? "", SystemRoot: process.env.SystemRoot ?? "" },
        testEnv: { DATABASE_URL: "postgresql://test", AUTH_SECRET: "test-secret" }, appFileKeys: envKeysFromAppFiles(dir) })
      const nextEnv = createRequire(createRequire(__filename).resolve("next/package.json")).resolve("@next/env")
      const out = spawnSync(process.execPath, ["-e",
        `require(${JSON.stringify(nextEnv)}).loadEnvConfig(process.argv[1], false, {info(){},error(){}});` +
        `console.log(JSON.stringify({t:process.env.TELEGRAM_BOT_TOKEN,d:process.env.DATABASE_URL,a:process.env.AUTH_SECRET}))`, dir],
        { env: { ...child, NODE_ENV: "production" }, encoding: "utf8" })
      assert.deepEqual(JSON.parse(out.stdout.trim()), { t: "", d: "postgresql://test", a: "test-secret" })
    } finally { rmSync(dir, { recursive: true, force: true }) }
  })
})

describe("outbound network guard (real child process)", () => {
  const run = (code: string, allow = "") => spawnSync(process.execPath, ["--require", GUARD, "-e", code],
    { env: { ...process.env, TEST_NETWORK_ALLOW: allow }, encoding: "utf8", timeout: 20000 })
  test("blocks real integrations before any request is sent", () => {
    const hosts = ["https://api.telegram.org/bot/x", "https://n8n.maxpromo.digital/webhook/x", "https://api.resend.com/emails",
      "https://api.anthropic.com/v1/messages", "https://gateway.payunit.net/api", "https://graph.facebook.com/v1"]
    const r = run(`Promise.allSettled(${JSON.stringify(hosts)}.map(u=>fetch(u))).then(rs=>console.log(JSON.stringify(rs.map(x=>x.reason&&x.reason.code))))`)
    assert.deepEqual(JSON.parse(r.stdout.trim()), hosts.map(() => "TEST_NETWORK_BLOCKED"))
  })
  test("allows localhost", () => {
    const r = run(`const s=require("http").createServer((q,res)=>res.end("ok")).listen(0,async()=>{const t=await (await fetch("http://127.0.0.1:"+s.address().port)).text();console.log(t);s.close()})`)
    assert.equal(r.stdout.trim(), "ok")
  })
  test("allows only explicitly listed hosts", () => {
    const r = run(`fetch("https://example.org/").then(()=>console.log("sent"),e=>console.log(e.code))`, "other.example")
    assert.equal(r.stdout.trim(), "TEST_NETWORK_BLOCKED")
  })
})
