import NextAuth from 'next-auth'
import { NextResponse } from 'next/server'

// Edge-safe: JWT-only instance — no Prisma adapter, no email provider
const { auth } = NextAuth({
  session: { strategy: 'jwt' },
  pages: { signIn: '/login', verifyRequest: '/verify' },
  providers: [],
})

export default auth((req) => {
  const { pathname } = req.nextUrl
  const isLoggedIn = !!req.auth

  // ── Always allow: NextAuth routes ──────────────────────────────────────────
  if (pathname.startsWith('/api/auth')) return NextResponse.next()

  // ── Always allow: public pages (no login required) ─────────────────────────
  const isPublicPage =
    pathname.startsWith('/login') ||
    pathname.startsWith('/auth/') ||
    pathname.startsWith('/submit/')
  if (isPublicPage) {
    // Redirect already-logged-in users away from login page
    if (pathname.startsWith('/login') && isLoggedIn) {
      return NextResponse.redirect(new URL('/dashboard', req.nextUrl))
    }
    return NextResponse.next()
  }

  // ── Always allow: public API endpoints (no auth required) ──────────────────
  const isPublicApi =
    pathname === '/api/venture-report' ||
    pathname.startsWith('/api/venture-report/')
  if (isPublicApi) return NextResponse.next()

  // ── Require authentication for everything else ──────────────────────────────
  if (!isLoggedIn) {
    // API routes: return 401 JSON — not a redirect (clients can't follow HTML redirects)
    if (pathname.startsWith('/api/')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    // Page routes: redirect to login
    return NextResponse.redirect(new URL('/login', req.nextUrl))
  }

  return NextResponse.next()
})

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}

