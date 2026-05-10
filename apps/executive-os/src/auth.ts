import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import Nodemailer from 'next-auth/providers/nodemailer'
import { authConfig } from '@mgi/auth'

export const { auth, handlers, signIn, signOut } = NextAuth({
  ...authConfig,
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
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const password = credentials?.password as string | undefined
        // Production: use OS_PASSWORD env var
        // Development fallback: 'essen2026' (only when NODE_ENV === 'development')
        const expectedPassword =
          process.env.OS_PASSWORD ??
          (process.env.NODE_ENV === 'development' ? 'essen2026' : null)
        if (!expectedPassword) return null
        if (password === expectedPassword) {
          return { id: '1', name: 'Rogers Nforgwei', email: 'rogers@mgi-ventures.com' }
        }
        return null
      },
    }),
  ],
})
