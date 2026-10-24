import NextAuth from 'next-auth'
import { NextResponse } from 'next/server'
import { classifyRoute } from './src/lib/route-policy'

// Edge-safe: JWT-only instance — no Prisma adapter, no email provider
const { auth } = NextAuth({
  session: { strategy: 'jwt' },
  pages: { signIn: '/login', verifyRequest: '/verify' },
  providers: [],
})

export default auth((req) => {
  const { pathname } = req.nextUrl
  // Require an actual user, not just a truthy auth object (GHSA-8fpg-xm3f-6cx3: on
  // configuration errors req.auth can be a non-session object — existence checks fail open).
  const isLoggedIn = !!req.auth?.user
  const access = classifyRoute(pathname)

  if (access === 'next-auth' || access === 'public-api') return NextResponse.next()

  if (access === 'public-page') {
    // Redirect already-logged-in users away from the login page
    if (pathname.startsWith('/login') && isLoggedIn) {
      return NextResponse.redirect(new URL('/dashboard', req.nextUrl))
    }
    return NextResponse.next()
  }

  // Protected: require authentication
  if (!isLoggedIn) {
    // API routes: 401 JSON — not a redirect (clients can't follow HTML redirects)
    if (pathname.startsWith('/api/')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    // Deep links (e.g. from Telegram) return to the exact page after sign-in. Only same-site
    // paths are passed on; the login page validates again (lib/briefing/links.ts safeNextPath).
    const login = new URL('/login', req.nextUrl)
    if (pathname.startsWith('/briefing')) login.searchParams.set('next', pathname + req.nextUrl.search)
    return NextResponse.redirect(login)
  }

  return NextResponse.next()
})

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
