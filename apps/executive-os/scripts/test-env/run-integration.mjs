#!/usr/bin/env node
// Runs tests/integration/*.integration.ts ONLY after the test environment is verified.
// The test process gets the test env (not .env.local) and the outbound network guard.
import { spawn } from "node:child_process"
import { fileURLToPath } from "node:url"
import { dirname, join } from "node:path"
import { assertTestEnvironment } from "./assert-test-db.mjs"
import { buildChildEnv, envKeysFromAppFiles } from "./guard-core.mjs"
import * as cfg from "./config.mjs"

const here = dirname(fileURLToPath(import.meta.url))
const res = await assertTestEnvironment()
if (!res.ok) {
  console.error("REFUSED — integration tests not run:")
  for (const e of res.errors) console.error(`  - ${e}`)
  process.exit(1)
}
if (!/^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(res.env.TEST_BASE_URL ?? "")) {
  console.error("REFUSED — TEST_BASE_URL must be a localhost test server (e.g. http://localhost:3100)")
  process.exit(1)
}
const child = buildChildEnv({ baseEnv: process.env, testEnv: res.env, appFileKeys: envKeysFromAppFiles(cfg.APP_DIR) })
child.TEST_NETWORK_ALLOW = res.targets.map((t) => t.host).join(",")
const p = spawn(process.execPath, [
  "--require", join(here, "network-guard.cjs"), "--import", "tsx", "--test", "tests/integration/http.integration.ts",
], { cwd: cfg.APP_DIR, env: child, stdio: "inherit" })
p.on("exit", (code) => process.exit(code ?? 1))
