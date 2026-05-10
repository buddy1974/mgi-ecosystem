import NextAuth from 'next-auth'
import { NextResponse } from 'next/server'

// Edge-safe: JWT-only instance — no Prisma adapter, no email provider
const { auth } = NextAuth({
  session: { strategy: 'jwt' },
  pages: { signIn: '/login', verifyRequest: '/verify' },
  providers: [],
})

export default auth((req) => {
  const isLoggedIn = !!req.auth
  const isAuthPage = req.nextUrl.pathname.startsWith('/login')
  const isApiAuth = req.nextUrl.pathname.startsWith('/api/auth')

  if (isApiAuth) return NextResponse.next()
  if (isAuthPage) {
    if (isLoggedIn) return NextResponse.redirect(new URL('/dashboard', req.nextUrl))
    return NextResponse.next()
  }
  if (!isLoggedIn) {
    return NextResponse.redirect(new URL('/login', req.nextUrl))
  }
  return NextResponse.next()
})

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
