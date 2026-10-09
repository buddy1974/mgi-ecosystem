#!/usr/bin/env node
// Builds and/or starts the app against the verified test environment only.
// Usage: node scripts/test-env/start-test-server.mjs [--build] [--port 3100] [--env-file <path>]
// 1. assertTestEnvironment (static + live READ ONLY identity check) — refuses on any doubt
// 2. child env = current env − keys from the app's .env files + test env; leftover app keys blanked
//    (prevents Next.js from loading production values from .env.local/.env)
// 3. preloads network-guard.cjs (default-deny outbound fetch; only localhost + test DB hosts)
import { spawn } from "node:child_process"
import { fileURLToPath } from "node:url"
import { dirname, join } from "node:path"
import { assertTestEnvironment } from "./assert-test-db.mjs"
import { buildChildEnv, envKeysFromAppFiles } from "./guard-core.mjs"
import * as cfg from "./config.mjs"

const here = dirname(fileURLToPath(import.meta.url))
const arg = (f, d) => { const i = process.argv.indexOf(f); return i > 0 ? process.argv[i + 1] : d }
const port = arg("--port", "3100")
const envFile = arg("--env-file", undefined)

const res = await assertTestEnvironment({ envFile })
if (!res.ok) {
  console.error("REFUSED — test server not started:")
  for (const e of res.errors) console.error(`  - ${e}`)
  process.exit(1)
}

const allowHosts = res.targets.map((t) => t.host)
if (res.env.TEST_ALLOW_AI === "1") allowHosts.push(...cfg.AI_HOSTS)
const child = buildChildEnv({
  baseEnv: process.env,
  testEnv: res.env,
  appFileKeys: envKeysFromAppFiles(cfg.APP_DIR),
})
child.TEST_NETWORK_ALLOW = allowHosts.join(",")
child.NODE_OPTIONS = `${child.NODE_OPTIONS ? child.NODE_OPTIONS + " " : ""}--require ${JSON.stringify(join(here, "network-guard.cjs"))}`
child.NEXT_TELEMETRY_DISABLED = "1"

function run(args) {
  return new Promise((resolve) => {
    const p = spawn("npx", ["next", ...args], { cwd: cfg.APP_DIR, env: child, stdio: "inherit", shell: process.platform === "win32" })
    p.on("exit", (code) => resolve(code ?? 1))
  })
}

if (process.argv.includes("--build")) {
  const code = await run(["build"])
  if (code !== 0) process.exit(code)
}
console.log(`Starting isolated test server on http://localhost:${port} (outbound allow: localhost, ${allowHosts.length} test host(s))`)
process.exit(await run(["start", "-p", port]))
