import NextAuth, { CredentialsSignin } from 'next-auth'
import { headers } from 'next/headers'
import Credentials from 'next-auth/providers/credentials'
import Nodemailer from 'next-auth/providers/nodemailer'
import { prisma } from '@mgi/database'
import { authConfig, isAllowedToSignIn, normalizeLoginId, verifyPassword } from '@mgi/auth'
import { clientIpFrom, isLoginThrottled, recordLoginAttempt } from '@/lib/login-throttle'

// Security model (Phase 2B, 2026-10-08):
// - No shared password, no one-click access. Every sign-in is tied to a real,
//   active row in the users table.
// - Credentials: per-user email + password (PBKDF2 hash set via invite
//   acceptance or the admin-set-password script).
// - Magic link (only when EMAIL_SERVER is configured): restricted by the
//   signIn callback to existing active users — no self-registration.
// - Abuse protection (2026-10-18): failed credentials attempts and magic-link
//   requests are counted per login id and per IP in audit_logs (shared across
//   instances, see lib/login-throttle.ts); unknown accounts cost the same time
//   as known ones and get the same responses.

const MAGIC_LINK_MAX_AGE_SECONDS = 15 * 60

/** Surfaces as ?error=CredentialsSignin&code=rate_limited — says nothing about the account. */
class LoginRateLimited extends CredentialsSignin {
  code = 'rate_limited'
}

async function requestIp(request?: Request): Promise<string> {
  if (request?.headers) return clientIpFrom(request.headers)
  try {
    return clientIpFrom(await headers())
  } catch {
    return 'unknown'
  }
}

const SESSION_MAX_AGE_SECONDS = 60 * 60 * 12 // 12 hours

export const { auth, handlers, signIn, signOut } = NextAuth({
  ...authConfig,
  session: { strategy: 'jwt', maxAge: SESSION_MAX_AGE_SECONDS },
  providers: [
    ...(process.env.EMAIL_SERVER
      ? [
          Nodemailer({
            maxAge: MAGIC_LINK_MAX_AGE_SECONDS,
            server: process.env.EMAIL_SERVER,
            from: process.env.EMAIL_FROM ?? 'noreply@mgi-ventures.com',
          }),
        ]
      : []),
    Credentials({
      name: 'Executive Access',
      credentials: {
        email: { label: 'Email or username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, request) {
        const email = normalizeLoginId(credentials?.email) // email or username
        const password = credentials?.password
        if (!email || typeof password !== 'string' || password.length === 0) return null

        const ip = await requestIp(request)
        if (await isLoginThrottled('credentials', email, ip)) throw new LoginRateLimited()

        const user = await prisma.user.findUnique({
          where: { email },
          select: { id: true, email: true, name: true, status: true, globalRole: true, password: true },
        })
        // Always run a hash comparison (verifyPassword burns a dummy hash when there is
        // no stored one) so unknown accounts take as long as known ones.
        const ok = verifyPassword(password, user?.password ?? null)
        if (!user || !ok || !isAllowedToSignIn(user)) {
          await recordLoginAttempt('credentials', email, ip, user?.id)
          return null
        }

        return { id: user.id, email: user.email, name: user.name ?? user.email }
      },
    }),
  ],
  callbacks: {
    ...authConfig.callbacks,
    async signIn({ user, email: emailInfo }) {
      const email = normalizeLoginId(user?.email)
      if (!email) return false
      const dbUser = await prisma.user.findUnique({
        where: { email },
        select: { status: true, globalRole: true },
      })

      // Magic-link request: throttle, and answer unknown/blocked addresses exactly like
      // known ones (redirect to /verify without sending) so accounts cannot be enumerated.
      if (emailInfo?.verificationRequest) {
        const ip = await requestIp()
        if (await isLoginThrottled('magicLink', email, ip)) return '/verify'
        await recordLoginAttempt('magicLink', email, ip)
        return isAllowedToSignIn(dbUser) ? true : '/verify'
      }

      return isAllowedToSignIn(dbUser)
    },
  },
})
