// Security regression tests — Phase 2B (2026-10-08).
// Run: pnpm --filter executive-os test   (node:test + tsx, no network, no database)
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, readdirSync, statSync } from 'node:fs'
import { join, relative, sep } from 'node:path'
import crypto from 'node:crypto'

import { classifyRoute } from '../src/lib/route-policy'
import { InviteUserSchema, AcceptInviteSchema, PatchMessageSchema } from '../src/lib/schemas'
import { escapeTelegramHtml, buildSubmissionAlert } from '../src/lib/telegram'
import { hashPassword, verifyPassword, safeEqual } from '../../../packages/auth/src/password'
import { isAllowedToSignIn, normalizeEmail } from '../../../packages/auth/src/sign-in-policy'

const APP = join(__dirname, '..')
const read = (p: string) => readFileSync(join(APP, p), 'utf8')

function walk(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const full = join(dir, name)
    return statSync(full).isDirectory() ? walk(full) : [full]
  })
}

// ── C1: no public one-click / shared-password login ─────────────────────────
test('login page has no quick access or server-side password injection', () => {
  const src = read('src/app/login/page.tsx')
  assert.doesNotMatch(src, /quick access/i)
  assert.doesNotMatch(src, /OS_PASSWORD/)
  assert.doesNotMatch(src, /process\.env\.[A-Z_]*PASSWORD/)
  assert.doesNotMatch(src, /password:\s*(expected|process)/i)
})

test('auth config has no shared password and enforces a signIn allowlist', () => {
  const src = read('src/auth.ts')
  assert.doesNotMatch(src, /OS_PASSWORD/)
  assert.doesNotMatch(src, /NODE_ENV\s*===\s*'development'\s*\?\s*'/, 'no dev password literal')
  assert.match(src, /async signIn\(/)
  assert.match(src, /isAllowedToSignIn/)
  assert.match(src, /verifyPassword/)
})

test('no source file references OS_PASSWORD', () => {
  const hits = walk(join(APP, 'src')).filter((f) => /\.(ts|tsx)$/.test(f) && readFileSync(f, 'utf8').includes('OS_PASSWORD'))
  assert.deepEqual(hits, [])
})

// ── Sign-in policy ───────────────────────────────────────────────────────────
test('only existing active accounts may sign in', () => {
  assert.equal(isAllowedToSignIn(null), false)
  assert.equal(isAllowedToSignIn(undefined), false)
  assert.equal(isAllowedToSignIn({ status: 'invited', globalRole: 'USER' }), false)
  assert.equal(isAllowedToSignIn({ status: 'disabled', globalRole: 'SUPER_ADMIN' }), false)
  assert.equal(isAllowedToSignIn({ status: 'active', globalRole: 'USER' }), true)
})

test('email normalisation', () => {
  assert.equal(normalizeEmail('  Rogers@Example.COM '), 'rogers@example.com')
  assert.equal(normalizeEmail(''), null)
  assert.equal(normalizeEmail(42), null)
  assert.equal(normalizeEmail('nope'), null)
})

// ── Passwords & secrets ──────────────────────────────────────────────────────
test('password hash round-trip and rejection', () => {
  const stored = hashPassword('correct horse battery staple')
  assert.match(stored, /^[a-f0-9]{32}:[a-f0-9]{128}$/)
  assert.equal(verifyPassword('correct horse battery staple', stored), true)
  assert.equal(verifyPassword('wrong password here', stored), false)
  assert.equal(verifyPassword('', stored), false)
  assert.equal(verifyPassword('x', null), false)
  assert.equal(verifyPassword('x', 'malformed'), false)
})

test('verifies hashes produced by the legacy accept-invite format', () => {
  const salt = crypto.randomBytes(16).toString('hex')
  const legacy = `${salt}:${crypto.pbkdf2Sync('legacy-password-123', salt, 100_000, 64, 'sha512').toString('hex')}`
  assert.equal(verifyPassword('legacy-password-123', legacy), true)
})

test('safeEqual is strict', () => {
  assert.equal(safeEqual('abc', 'abc'), true)
  assert.equal(safeEqual('abc', 'abd'), false)
  assert.equal(safeEqual('abc', null), false)
  assert.equal(safeEqual(undefined, undefined), false)
})

test('n8n client has no hardcoded secret fallback', () => {
  const src = read('src/lib/n8n.ts')
  assert.doesNotMatch(src, /N8N_SECRET\s*\?\?/)
  assert.doesNotMatch(src, /mcp-[a-z]/i)
})

// ── Route policy (middleware) ────────────────────────────────────────────────
test('route classification', () => {
  assert.equal(classifyRoute('/api/auth/session'), 'next-auth')
  assert.equal(classifyRoute('/login'), 'public-page')
  assert.equal(classifyRoute('/verify'), 'public-page')
  assert.equal(classifyRoute('/submit/horeb'), 'public-page')
  assert.equal(classifyRoute('/auth/accept-invite'), 'public-page')
  assert.equal(classifyRoute('/api/venture-report'), 'public-api')
  assert.equal(classifyRoute('/api/users/accept-invite'), 'public-api')
  assert.equal(classifyRoute('/api/social/posts/publish-due'), 'public-api')
  // must stay protected
  for (const p of ['/', '/dashboard', '/settings/users', '/api/approvals', '/api/messages',
    '/api/venture-report/abc/status', '/api/users/invite', '/loginx', '/submit', '/api/authz']) {
    assert.equal(classifyRoute(p), 'protected', p)
  }
})

test('middleware uses the shared route policy', () => {
  assert.match(read('middleware.ts'), /classifyRoute/)
})

// ── Authorisation coverage of API write handlers ─────────────────────────────
test('every non-public API write handler calls requireSession', () => {
  const apiDir = join(APP, 'src', 'app', 'api')
  const offenders = walk(apiDir)
    .filter((f) => f.endsWith(`${sep}route.ts`))
    .filter((f) => {
      const urlPath = '/' + relative(join(APP, 'src', 'app'), f).split(sep).slice(0, -1).join('/')
      if (classifyRoute(urlPath) !== 'protected') return false
      const src = readFileSync(f, 'utf8')
      return /export async function (POST|PUT|PATCH|DELETE)/.test(src) && !src.includes('requireSession(')
    })
  assert.deepEqual(offenders, [])
})

// ── Invitations ──────────────────────────────────────────────────────────────
test('invite schema matches UI roles and never grants SUPER_ADMIN', () => {
  assert.equal(InviteUserSchema.safeParse({ email: 'a@b.co', role: 'USER' }).success, true)
  assert.equal(InviteUserSchema.safeParse({ email: 'a@b.co', role: 'ADMIN' }).success, true)
  assert.equal(InviteUserSchema.safeParse({ email: 'a@b.co', role: 'SUPER_ADMIN' }).success, false)
  const parsed = InviteUserSchema.parse({ email: ' New.Person@Example.com ' })
  assert.equal(parsed.email, 'new.person@example.com')
  assert.equal(parsed.role, 'USER')
  const form = read('src/components/settings/InviteUserForm.tsx')
  assert.doesNotMatch(form, /SUPER_ADMIN/)
})

test('accept-invite requires a well-formed token and a 12+ char password', () => {
  const token = 'a'.repeat(64)
  assert.equal(AcceptInviteSchema.safeParse({ token, password: 'short' }).success, false)
  assert.equal(AcceptInviteSchema.safeParse({ token: 'xyz', password: 'long-enough-password' }).success, false)
  assert.equal(AcceptInviteSchema.safeParse({ token, password: 'long-enough-password' }).success, true)
})

// ── Mass assignment ──────────────────────────────────────────────────────────
test('message PATCH ignores non-allowlisted fields', () => {
  const r = PatchMessageSchema.safeParse({ isRead: true, companyId: 'evil', body: 'x' })
  assert.equal(r.success, true)
  assert.deepEqual(Object.keys(r.success ? r.data : {}).sort(), ['isRead'])
  assert.equal(PatchMessageSchema.safeParse({ companyId: 'evil' }).success, false)
})

// ── Telegram HTML injection ──────────────────────────────────────────────────
test('telegram output escapes user-supplied HTML', () => {
  assert.equal(escapeTelegramHtml('<a href="x">&</a>'), '&lt;a href="x"&gt;&amp;&lt;/a&gt;')
  const msg = buildSubmissionAlert({
    venture: 'Horeb', type: 'report', urgency: 'normal',
    title: '<b>t</b>', body: '<script>x</script>', submittedBy: 'M&M',
  })
  assert.doesNotMatch(msg, /<script>/)
  assert.match(msg, /M&amp;M/)
})
