import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import Nodemailer from 'next-auth/providers/nodemailer'
import { prisma } from '@mgi/database'
import { authConfig, isAllowedToSignIn, normalizeEmail, verifyPassword } from '@mgi/auth'

// Security model (Phase 2B, 2026-10-08):
// - No shared password, no one-click access. Every sign-in is tied to a real,
//   active row in the users table.
// - Credentials: per-user email + password (PBKDF2 hash set via invite
//   acceptance or the admin-set-password script).
// - Magic link (only when EMAIL_SERVER is configured): restricted by the
//   signIn callback to existing active users — no self-registration.

const SESSION_MAX_AGE_SECONDS = 60 * 60 * 12 // 12 hours

export const { auth, handlers, signIn, signOut } = NextAuth({
  ...authConfig,
  session: { strategy: 'jwt', maxAge: SESSION_MAX_AGE_SECONDS },
  providers: [
    ...(process.env.EMAIL_SERVER
      ? [
          Nodemailer({
            server: process.env.EMAIL_SERVER,
            from: process.env.EMAIL_FROM ?? 'noreply@mgi-ventures.com',
          }),
        ]
      : []),
    Credentials({
      name: 'Executive Access',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const email = normalizeEmail(credentials?.email)
        const password = credentials?.password
        if (!email || typeof password !== 'string' || password.length === 0) return null

        const user = await prisma.user.findUnique({
          where: { email },
          select: { id: true, email: true, name: true, status: true, globalRole: true, password: true },
        })
        // Always run a hash comparison to keep timing similar for unknown emails
        const ok = verifyPassword(password, user?.password ?? null)
        if (!user || !ok || !isAllowedToSignIn(user)) return null

        return { id: user.id, email: user.email, name: user.name ?? user.email }
      },
    }),
  ],
  callbacks: {
    ...authConfig.callbacks,
    async signIn({ user }) {
      const email = normalizeEmail(user?.email)
      if (!email) return false
      const dbUser = await prisma.user.findUnique({
        where: { email },
        select: { status: true, globalRole: true },
      })
      return isAllowedToSignIn(dbUser)
    },
  },
})
