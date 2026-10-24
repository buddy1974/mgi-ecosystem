// Security regression tests — final stabilisation (2026-10-18).
// Run: pnpm --filter executive-os test   (node:test + tsx, no network, no database)
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, readdirSync, statSync } from 'node:fs'
import { join, relative, sep } from 'node:path'

import { isThrottled, clientIpFrom, LIMITS } from '../src/lib/login-throttle'
import { ventureLinkKey, isValidVentureKey } from '../src/lib/venture-link'
import { classifyRoute } from '../src/lib/route-policy'
import { VentureReportSchema } from '../src/lib/schemas'
import { hashPassword, verifyPassword } from '../../../packages/auth/src/password'

const APP = join(__dirname, '..')
const read = (p: string) => readFileSync(join(APP, p), 'utf8')
function walk(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const full = join(dir, name)
    return statSync(full).isDirectory() ? walk(full) : [full]
  })
}

// ── Framework version ────────────────────────────────────────────────────────
test('Next.js is pinned to 16.3.8 (patches every published 16.x advisory) in manifest and lockfile', () => {
  const pkg = JSON.parse(read('package.json'))
  assert.equal(pkg.dependencies.next, '16.3.8')
  assert.equal(pkg.devDependencies['eslint-config-next'], '16.3.8')
  const lock = readFileSync(join(APP, '../../pnpm-lock.yaml'), 'utf8').replace(/\r\n/g, '\n')
  const from = lock.indexOf('\n  apps/executive-os:')
  const importer = lock.slice(from, lock.indexOf('\n  apps/', from + 5))
  assert.match(importer, /\n {6}next:\n {8}specifier: 16\.3\.8\n {8}version: 16\.3\.8\(/)
})

test('Auth.js is pinned past GHSA-8fpg-xm3f-6cx3 / GHSA-7rqj-j65f-68wh (next-auth beta.32, @auth/core 0.41.3)', () => {
  assert.equal(JSON.parse(read('package.json')).dependencies['next-auth'], '5.0.0-beta.32')
  const authPkg = JSON.parse(readFileSync(join(APP, '../../packages/auth/package.json'), 'utf8'))
  assert.equal(authPkg.dependencies['next-auth'], '5.0.0-beta.32')
  assert.equal(authPkg.dependencies['@auth/prisma-adapter'], '2.11.3')
  const lock = readFileSync(join(APP, '../../pnpm-lock.yaml'), 'utf8')
  assert.doesNotMatch(lock, /@auth\/core@0\.41\.[0-2]\b/)
  assert.doesNotMatch(lock, /next-auth@5\.0\.0-beta\.(?:[0-9]|[12][0-9]|3[01])\b/)
})

test('session checks require a user, not a truthy auth object (GHSA-8fpg-xm3f-6cx3)', () => {
  assert.match(read('middleware.ts'), /const isLoggedIn = !!req\.auth\?\.user/)
  assert.doesNotMatch(read('middleware.ts'), /!!req\.auth\s*$/m)
  assert.match(read('src/app/(os)/layout.tsx'), /if \(!session\?\.user\) redirect\('\/login'\)/)
})

// ── Login throttle ───────────────────────────────────────────────────────────
test('credentials throttle: blocks at 8 failures per login id or 30 per IP in the window', () => {
  assert.equal(isThrottled('credentials', { account: 7, ip: 29 }), false)
  assert.equal(isThrottled('credentials', { account: 8, ip: 0 }), true)
  assert.equal(isThrottled('credentials', { account: 0, ip: 30 }), true)
  assert.equal(LIMITS.magicLink.perAccount, 3)
  assert.equal(isThrottled('magicLink', { account: 3, ip: 0 }), true)
})

test('client IP comes from the first x-forwarded-for hop, then x-real-ip', () => {
  assert.equal(clientIpFrom(new Headers({ 'x-forwarded-for': '203.0.113.9, 10.0.0.1' })), '203.0.113.9')
  assert.equal(clientIpFrom(new Headers({ 'x-real-ip': '198.51.100.7' })), '198.51.100.7')
  assert.equal(clientIpFrom(new Headers()), 'unknown')
  assert.equal(clientIpFrom(undefined), 'unknown')
})

test('authorize checks the throttle before the user lookup and records every failure', () => {
  const src = read('src/auth.ts')
  const authorize = src.slice(src.indexOf('async authorize('), src.indexOf('callbacks:'))
  assert.ok(authorize.indexOf('isLoginThrottled') > -1, 'throttle checked')
  assert.ok(authorize.indexOf('isLoginThrottled') < authorize.indexOf('prisma.user.findUnique'), 'before lookup')
  assert.match(authorize, /recordLoginAttempt\('credentials'/)
  assert.match(authorize, /throw new LoginRateLimited\(\)/)
})

test('magic-link request: throttled, and unknown addresses get the same /verify answer (no enumeration)', () => {
  const src = read('src/auth.ts')
  assert.match(src, /verificationRequest/)
  assert.match(src, /isLoginThrottled\('magicLink'/)
  assert.match(src, /isAllowedToSignIn\(dbUser\) \? true : '\/verify'/)
  assert.match(src, /maxAge: MAGIC_LINK_MAX_AGE_SECONDS/)
})

test('unknown accounts cost the same PBKDF2 work as known ones (no timing oracle)', () => {
  const stored = hashPassword('correct horse battery staple')
  const time = (fn: () => void) => { const t = process.hrtime.bigint(); for (let i = 0; i < 5; i++) fn(); return Number(process.hrtime.bigint() - t) }
  const known = time(() => verifyPassword('wrong password here', stored))
  const unknown = time(() => verifyPassword('wrong password here', null))
  const malformed = time(() => verifyPassword('wrong password here', 'malformed'))
  assert.ok(unknown > known * 0.5, `unknown ${unknown} vs known ${known}`)
  assert.ok(malformed > known * 0.5, `malformed ${malformed} vs known ${known}`)
  assert.equal(verifyPassword('x', null), false)
  assert.equal(verifyPassword('correct horse battery staple', stored), true)
})

// ── Venture report links ─────────────────────────────────────────────────────
const SECRET = 'test-secret-'.padEnd(48, 'x')

test('venture link key is per venture and per secret', () => {
  const k = ventureLinkKey('horeb', SECRET)
  assert.equal(k.length, 32)
  assert.equal(isValidVentureKey('horeb', k, SECRET), true)
  assert.equal(isValidVentureKey('dros', k, SECRET), false, 'key of another venture')
  assert.equal(isValidVentureKey('horeb', k, SECRET.replace('x', 'y')), false, 'other secret')
  for (const bad of [undefined, null, '', 'x', k.slice(0, 31), 42]) assert.equal(isValidVentureKey('horeb', bad, SECRET), false)
})

test('operator link script derives the same key as the server', async () => {
  const script = read('scripts/venture-links.mjs')
  assert.match(script, /mgi-venture-report-link:v1:/)
  assert.match(script, /digest\('base64url'\)\.slice\(0, 32\)/)
})

test('venture-report route fails closed, requires the key and caps submissions', () => {
  const file = read('src/app/api/venture-report/route.ts')
  const src = file.slice(file.indexOf('export async function POST'))
  assert.match(src, /ventureLinkSecret\(\)/)
  assert.match(src, /status: 503/)
  assert.match(src, /isValidVentureKey\(venture, key, secret\)/)
  assert.match(src, /status: 403/)
  assert.match(src, /VENTURE_REPORTS_PER_HOUR/)
  assert.match(src, /status: 429/)
  assert.ok(src.indexOf('isValidVentureKey') < src.indexOf('ventureReport.create'), 'key checked before the write')
  assert.ok(src.indexOf('isValidVentureKey') < src.indexOf('sendOperationsAlert'), 'key checked before the alert')
  assert.equal(VentureReportSchema.safeParse({ venture: 'horeb', key: 'k'.repeat(65), type: 'report', title: 't', body: 'b', submittedBy: 's' }).success, false)
  assert.equal(classifyRoute('/api/venture-report'), 'public-api', 'still reachable by managers without an account')
})

// ── Page-level authorisation ─────────────────────────────────────────────────
test('every server-rendered (os) page that reads data calls requirePageUser()', () => {
  const pages = walk(join(APP, 'src/app/(os)')).filter((f) => f.endsWith(`${sep}page.tsx`))
  const missing = pages.filter((f) => {
    const s = readFileSync(f, 'utf8')
    if (/^['"]use client['"]/.test(s.trimStart())) return false
    const readsData = /@mgi\/database|@\/lib\/[a-z-]+-data|getDashboardData|prisma\./.test(s)
    // requireBriefingPage() is the briefing-centre wrapper; checked below to call requirePageUser() first.
    return readsData && !/await (requirePageUser|requireBriefingPage)\(\)/.test(s)
  }).map((f) => relative(APP, f))
  assert.deepEqual(missing, [])
  const wrapper = read('src/lib/briefing/access.ts')
  const body = wrapper.slice(wrapper.indexOf('export async function requireBriefingPage'))
  assert.match(body.split('\n').slice(0, 3).join('\n'), /const user = await requirePageUser\(\)/)
})

// ── Security headers ─────────────────────────────────────────────────────────
test('security headers configured for every path', () => {
  const src = read('next.config.ts')
  assert.match(src, /source: "\/:path\*"/)
  assert.match(src, /"X-Frame-Options", value: "DENY"/)
  assert.match(src, /"X-Content-Type-Options", value: "nosniff"/)
  assert.match(src, /Referrer-Policy/)
})
