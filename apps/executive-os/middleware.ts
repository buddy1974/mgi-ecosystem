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
  const isLoggedIn = !!req.auth
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
    return NextResponse.redirect(new URL('/login', req.nextUrl))
  }

  return NextResponse.next()
})

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
