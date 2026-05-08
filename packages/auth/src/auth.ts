import NextAuth from 'next-auth'
import Nodemailer from 'next-auth/providers/nodemailer'
import { authConfig } from './config'

export const { handlers, auth, signIn, signOut } = NextAuth({
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
  ],
})
