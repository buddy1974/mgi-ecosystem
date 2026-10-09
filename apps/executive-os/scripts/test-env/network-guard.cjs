// Test-only outbound network guard (Phase 3B). Preloaded into test servers with
//   NODE_OPTIONS=--require <this file>
// Default-deny: every fetch() to a host that is not localhost or listed in
// TEST_NETWORK_ALLOW (comma-separated hostnames, set by start-test-server.mjs to
// the verified test database hosts) is rejected before any bytes leave the
// machine. Blocks Telegram, n8n, Resend, Anthropic, OpenAI, PayUnit, Google,
// Meta/WhatsApp, OSM, etc. Never logs request bodies or headers.
"use strict"

const LOCAL = new Set(["localhost", "127.0.0.1", "::1", "[::1]"])
const allow = new Set(
  String(process.env.TEST_NETWORK_ALLOW || "").split(",").map((h) => h.trim().toLowerCase()).filter(Boolean),
)

function hostOf(input) {
  try {
    if (typeof input === "string") return new URL(input).hostname.toLowerCase()
    if (input instanceof URL) return input.hostname.toLowerCase()
    if (input && typeof input.url === "string") return new URL(input.url).hostname.toLowerCase()
  } catch { /* fall through */ }
  return null
}

const realFetch = globalThis.fetch
if (typeof realFetch === "function" && !globalThis.__testNetworkGuardInstalled) {
  globalThis.__testNetworkGuardInstalled = true
  globalThis.fetch = function guardedFetch(input, init) {
    const host = hostOf(input)
    if (host && (LOCAL.has(host) || allow.has(host))) return realFetch.call(this, input, init)
    const err = new Error(`[test-network-guard] blocked outbound request to ${host ?? "unknown host"}`)
    err.code = "TEST_NETWORK_BLOCKED"
    return Promise.reject(err)
  }
}
