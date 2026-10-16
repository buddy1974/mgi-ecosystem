// Synthetic fixtures for isolated integration tests (Phase 3B).
// Usage (from apps/executive-os):
//   npx tsx scripts/test-env/fixtures.ts seed
//   npx tsx scripts/test-env/fixtures.ts cleanup
// Refuses to run unless assertTestEnvironment() passes (static + live identity).
// All fixture rows use the id prefix "t3b-" and reserved test email domains.
// Credentials come from the git-ignored .env.test.local and are never printed.

export const FIXTURE_PREFIX = "t3b-"
const SYNTHETIC_EMAIL = /@([a-z0-9-]+\.)*(test|invalid|example\.(com|org|net))$/i

export function assertSyntheticEmail(name: string, email: string | undefined): string {
  if (!email || !SYNTHETIC_EMAIL.test(email)) {
    throw new Error(`${name} must be a synthetic address on a reserved test domain (.test, .invalid, example.com/org/net)`)
  }
  return email.trim().toLowerCase()
}

async function main(mode: string) {
  // Dynamic import keeps the guard native ESM (it uses top-level await; a static
  // import is transpiled to CJS by tsx and fails).
  const { assertTestEnvironment } = await import("./assert-test-db.mjs")
  const res = await assertTestEnvironment({ log: () => {} })
  if (!res.ok) {
    console.error("REFUSED — fixtures not touched:")
    for (const e of res.errors) console.error(`  - ${e}`)
    process.exit(1)
  }
  const env = res.env as Record<string, string>
  // Point Prisma at the verified test database before it is imported.
  Object.assign(process.env, env)
  const { prisma } = await import("@mgi/database")
  const { hashPassword, MIN_PASSWORD_LENGTH } = await import("../../../../packages/auth/src/password")

  const admin = { email: assertSyntheticEmail("TEST_ADMIN_EMAIL", env.TEST_ADMIN_EMAIL), pw: env.TEST_ADMIN_PASSWORD }
  const user  = { email: assertSyntheticEmail("TEST_USER_EMAIL", env.TEST_USER_EMAIL),  pw: env.TEST_USER_PASSWORD }
  const disabledEmail = "t3b-disabled@example.test"
  const inviteeEmail  = "t3b-invitee@example.test"

  if (mode === "cleanup") {
    const emails = [admin.email, user.email, disabledEmail, inviteeEmail]
    const u = await prisma.user.deleteMany({ where: { email: { in: emails } } })
    const a = await prisma.approval.deleteMany({ where: { id: { startsWith: FIXTURE_PREFIX } } })
    const m = await prisma.message.deleteMany({ where: { id: { startsWith: FIXTURE_PREFIX } } })
    const r = await prisma.ventureReport.deleteMany({ where: { title: { startsWith: "[T3B]" } } })
    console.log(`cleanup: users ${u.count}, approvals ${a.count}, messages ${m.count}, venture reports ${r.count}`)
    return
  }
  if (mode !== "seed") throw new Error('mode must be "seed" or "cleanup"')
  for (const [n, p] of [["TEST_ADMIN_PASSWORD", admin.pw], ["TEST_USER_PASSWORD", user.pw]] as const) {
    if (!p || p.length < MIN_PASSWORD_LENGTH) throw new Error(`${n} must be set (min ${MIN_PASSWORD_LENGTH} chars)`)
  }

  const upsertUser = (email: string, globalRole: "SUPER_ADMIN" | "USER", status: string, pw?: string) =>
    prisma.user.upsert({
      where:  { email },
      update: { globalRole, status, password: pw ? hashPassword(pw) : null, inviteToken: null, inviteExpires: null },
      create: { email, name: `T3B ${globalRole}`, globalRole, status, password: pw ? hashPassword(pw) : null },
    })
  await upsertUser(admin.email, "SUPER_ADMIN", "active", admin.pw)
  await upsertUser(user.email, "USER", "active", user.pw)
  await upsertUser(disabledEmail, "USER", "disabled")
  await prisma.user.deleteMany({ where: { email: inviteeEmail } })

  await prisma.approval.upsert({
    where:  { id: `${FIXTURE_PREFIX}approval-1` },
    update: { status: "PENDING" },
    create: { id: `${FIXTURE_PREFIX}approval-1`, companyId: "horeb", category: "OPERATIONS",
              title: "[T3B] Test approval", description: "Synthetic fixture", requestedBy: "T3B fixture" },
  })
  await prisma.message.upsert({
    where:  { id: `${FIXTURE_PREFIX}message-1` },
    update: { isRead: false },
    create: { id: `${FIXTURE_PREFIX}message-1`, companyId: "horeb", source: "INTERNAL", fromName: "T3B fixture",
              body: "[T3B] Synthetic message", receivedAt: new Date() },
  })
  console.log("seed: 3 users, 1 approval, 1 message (synthetic)")
}

const mode = process.argv[2]
if (mode) main(mode).then(() => process.exit(0)).catch((e) => { console.error(`fixtures failed: ${(e as Error).message}`); process.exit(1) })
