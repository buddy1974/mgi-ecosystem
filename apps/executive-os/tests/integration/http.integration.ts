// Integration tests against an ISOLATED local test server + Neon test branch (Phase 3B matrix §6.1).
// Never run directly: use `pnpm --filter executive-os test:integration`, which first verifies the
// test database identity and refuses production. Requires:
//   TEST_BASE_URL (e.g. http://localhost:3100), TEST_ADMIN_EMAIL/PASSWORD, TEST_USER_EMAIL/PASSWORD,
//   CRON_SECRET (test value) — all from the git-ignored .env.test.local; fixtures seeded beforehand.
import { test, describe, before, after } from "node:test"
import assert from "node:assert/strict"

const BASE = process.env.TEST_BASE_URL ?? ""
const enabled = /^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(BASE)
const ADMIN = { email: process.env.TEST_ADMIN_EMAIL ?? "", password: process.env.TEST_ADMIN_PASSWORD ?? "" }
const USER  = { email: process.env.TEST_USER_EMAIL ?? "",  password: process.env.TEST_USER_PASSWORD ?? "" }

type Jar = Map<string, string>
const jarHeader = (jar: Jar) => [...jar].map(([k, v]) => `${k}=${v}`).join("; ")
function absorb(jar: Jar, res: Response) {
  for (const c of res.headers.getSetCookie()) {
    const [pair] = c.split(";"); const i = pair.indexOf("=")
    const k = pair.slice(0, i).trim(), v = pair.slice(i + 1).trim()
    if (v === "" || /max-age=0/i.test(c)) jar.delete(k); else jar.set(k, v)
  }
}
async function req(path: string, init: RequestInit & { jar?: Jar } = {}) {
  const headers = new Headers(init.headers)
  if (init.jar?.size) headers.set("cookie", jarHeader(init.jar))
  const res = await fetch(BASE + path, { ...init, headers, redirect: "manual" })
  if (init.jar) absorb(init.jar, res)
  return res
}
const json = (body: unknown, jar?: Jar, method = "POST") =>
  ({ method, jar, headers: { "content-type": "application/json" }, body: JSON.stringify(body) })

async function signIn(email: string, password: string): Promise<{ jar: Jar; ok: boolean }> {
  const jar: Jar = new Map()
  const csrf = await (await req("/api/auth/csrf", { jar })).json() as { csrfToken: string }
  await req("/api/auth/callback/credentials", {
    method: "POST", jar,
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ csrfToken: csrf.csrfToken, email, password, callbackUrl: `${BASE}/dashboard` }),
  })
  const ok = [...jar.keys()].some((k) => k.includes("session-token"))
  return { jar, ok }
}

describe("MGI Executive OS — isolated integration (Phase 3B §6.1)", { skip: enabled ? false : "TEST_BASE_URL not set to a localhost test server" }, () => {
  let admin: Jar, user: Jar

  before(async () => {
    // Defence in depth: re-verify the database identity inside the test process (used by M-B5 writes).
    const { assertTestEnvironment } = await import("../../scripts/test-env/assert-test-db.mjs")
    const guard = await assertTestEnvironment({ log: () => {} })
    if (!guard.ok || guard.env?.DATABASE_URL !== process.env.DATABASE_URL) {
      throw new Error("test database identity not verified for this process — aborting before any write")
    }
    const a = await signIn(ADMIN.email, ADMIN.password); assert.ok(a.ok, "fixture admin can sign in"); admin = a.jar
    const u = await signIn(USER.email, USER.password);   assert.ok(u.ok, "fixture user can sign in");  user = u.jar
  })

  test("M-B1 login page has no quick access / injected credential", async () => {
    const html = await (await req("/login")).text()
    assert.doesNotMatch(html, /quick access/i)
    assert.match(html, /name="email"/)
  })
  test("M-B4 only the credentials provider is exposed when EMAIL_SERVER is blank", async () => {
    const providers = await (await req("/api/auth/providers")).json() as Record<string, unknown>
    assert.deepEqual(Object.keys(providers), ["credentials"])
  })
  test("M-B3 wrong password and unknown email do not create a session", async () => {
    assert.equal((await signIn(ADMIN.email, ADMIN.password + "x")).ok, false)
    assert.equal((await signIn("nobody@example.test", "irrelevant-password")).ok, false)
    assert.equal((await signIn("t3b-disabled@example.test", "irrelevant-password")).ok, false)
  })
  test("M-B3 session reflects the database account", async () => {
    const s = await (await req("/api/auth/session", { jar: admin })).json() as { user?: { email?: string; globalRole?: string } }
    assert.equal(s.user?.email, ADMIN.email)
    assert.equal(s.user?.globalRole, "SUPER_ADMIN")
  })
  test("M-C1 protected APIs return 401 JSON without a session", async () => {
    for (const [path, method] of [["/api/messages", "GET"], ["/api/approvals", "POST"], ["/api/users/invite", "POST"]] as const) {
      const r = await req(path, { method })
      assert.equal(r.status, 401, `${method} ${path}`)
    }
  })
  test("M-C2 public manager submission: page renders, invalid body 400, valid body accepted", async () => {
    assert.equal((await req("/submit/horeb")).status, 200)
    assert.equal((await req("/api/venture-report", json({ venture: "horeb" }))).status, 400)
    const ok = await req("/api/venture-report", json({ venture: "horeb", type: "report", urgency: "normal",
      title: "[T3B] integration report", body: "synthetic", submittedBy: "T3B" }))
    assert.equal(ok.status, 200)
  })
  test("M-C3 approval decision: USER forbidden, SUPER_ADMIN allowed", async () => {
    assert.equal((await req("/api/approvals/t3b-approval-1", json({ action: "approve" }, user, "PATCH"))).status, 403)
    assert.equal((await req("/api/approvals/t3b-approval-1", json({ action: "approve" }, admin, "PATCH"))).status, 200)
    assert.equal((await req("/api/approvals/t3b-approval-1", json({ action: "reject" }, admin, "PATCH"))).status, 409)
    const { prisma } = await import("@mgi/database")
    const saved = await prisma.approval.findUniqueOrThrow({ where: { id: "t3b-approval-1" } })
    assert.equal(saved.status, "APPROVED")
  })
  test("M-C4 message PATCH ignores non-allowlisted fields", async () => {
    const r = await req("/api/messages/t3b-message-1", json({ isRead: true, companyId: "evil", body: "x" }, admin, "PATCH"))
    assert.equal(r.status, 200)
    const m = await r.json() as { companyId: string; body: string; isRead: boolean }
    assert.equal(m.companyId, "horeb"); assert.equal(m.isRead, true); assert.notEqual(m.body, "x")
  })
  test("M-C5 invitation: SUPER_ADMIN cannot be granted; invite → accept → sign in; existing account 409", async () => {
    assert.equal((await req("/api/users/invite", json({ email: "t3b-x@example.test", role: "SUPER_ADMIN" }, admin))).status, 400)
    assert.equal((await req("/api/users/invite", json({ email: "t3b-y@example.test", role: "USER" }, user))).status, 403)
    assert.equal((await req("/api/users/invite", json({ email: ADMIN.email, role: "USER" }, admin))).status, 409)
    const inv = await req("/api/users/invite", json({ email: "t3b-invitee@example.test", role: "USER" }, admin))
    assert.equal(inv.status, 200)
    const token = new URL((await inv.json() as { inviteUrl: string }).inviteUrl).searchParams.get("token")!
    assert.equal((await req("/api/users/accept-invite", json({ token, password: "short" }))).status, 400)
    assert.equal((await req("/api/users/accept-invite", json({ token, password: "t3b-invitee-password-ok" }))).status, 200)
    assert.equal((await req("/api/users/accept-invite", json({ token, password: "t3b-invitee-password-ok" }))).status, 400, "single use")
    assert.equal((await signIn("t3b-invitee@example.test", "t3b-invitee-password-ok")).ok, true)
  })
  test("M-C6 publish-due requires the cron secret", async () => {
    assert.equal((await req("/api/social/posts/publish-due", { method: "POST" })).status, 401)
    assert.equal((await req("/api/social/posts/publish-due", { method: "POST", headers: { "x-cron-secret": "wrong" } })).status, 401)
    const ok = await req("/api/social/posts/publish-due", { method: "POST", headers: { "x-cron-secret": process.env.CRON_SECRET ?? "" } })
    assert.equal(ok.status, 200)
  })
  test("M-B5 deactivating an account blocks its existing session on the next API call", async () => {
    const { prisma } = await import("@mgi/database")
    await prisma.user.update({ where: { email: USER.email }, data: { status: "disabled" } })
    try {
      assert.equal((await req("/api/approvals/t3b-approval-1", json({ action: "approve" }, user, "PATCH"))).status, 401)
    } finally {
      await prisma.user.update({ where: { email: USER.email }, data: { status: "active" } })
    }
  })

  after(() => { /* fixtures are removed by `fixtures.ts cleanup` */ })
})
