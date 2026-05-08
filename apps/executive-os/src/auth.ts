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
      name: 'Dev Access',
      credentials: {
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        // Auth.js v5: credentials is typed from the credentials object above
        // cast explicitly to avoid type mismatch
        const password = credentials?.password as string | undefined
        if (password === 'essen2026') {
          return {
            id: '1',
            name: 'Rogers Nforgwei',
            email: 'rogers@mgi-ventures.com',
          }
        }
        return null
      },
    }),
  ],
})
