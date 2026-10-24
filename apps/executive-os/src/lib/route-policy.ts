// Edge-safe route classification used by middleware.ts.
// Pure function, no imports — unit tested in tests/security.test.ts.
//
// Anything not explicitly listed here requires an authenticated session.
// Public API routes listed here MUST perform their own verification
// (Zod validation, invite token, or shared cron secret).

export type RouteAccess = 'next-auth' | 'public-page' | 'public-api' | 'protected'

// Exact page, or the page plus sub-paths (e.g. /login and /login/...)
const PUBLIC_PAGE_ROOTS = ['/login', '/verify', '/icon'] as const
// Sub-paths only (e.g. /submit/horeb, /auth/accept-invite)
const PUBLIC_PAGE_PREFIXES = ['/auth/', '/submit/'] as const

const PUBLIC_API_EXACT = [
  '/api/venture-report',          // public manager submission — Zod validated
  '/api/users/accept-invite',     // verified by single-use invite token
  '/api/social/posts/publish-due', // verified by x-cron-secret header
  '/api/briefing/ingest',          // verified by x-exec-briefing-token (fails closed)
  '/api/briefing/run',             // machine token, or SUPER_ADMIN session checked in the route
] as const

export function classifyRoute(pathname: string): RouteAccess {
  if (pathname === '/api/auth' || pathname.startsWith('/api/auth/')) return 'next-auth'
  if ((PUBLIC_API_EXACT as readonly string[]).includes(pathname)) return 'public-api'
  if (PUBLIC_PAGE_ROOTS.some((p) => pathname === p || pathname.startsWith(`${p}/`))) return 'public-page'
  if (PUBLIC_PAGE_PREFIXES.some((p) => pathname.startsWith(p))) return 'public-page'
  return 'protected'
}
