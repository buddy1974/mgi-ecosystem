import type { NextAuthConfig } from 'next-auth'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { prisma } from '@mgi/database'
import type { MGIUser, CompanyMembership, GlobalRole } from '@mgi/types'

export const authConfig: NextAuthConfig = {
  adapter: PrismaAdapter(prisma),
  session: { strategy: 'jwt' },
  pages: {
    signIn: '/login',
    verifyRequest: '/verify',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        // First sign in — hydrate token with MGI claims
        const dbUser = await prisma.user.findUnique({
          where: { email: user.email! },
          include: {
            memberships: {
              include: { company: true },
            },
          },
        })

        if (dbUser) {
          token.userId = dbUser.id
          token.globalRole = dbUser.globalRole as GlobalRole
          token.memberships = dbUser.memberships.map((m) => ({
            companyId: m.companyId,
            companySlug: m.company.slug,
            companyName: m.company.name,
            role: m.role,
          })) as CompanyMembership[]

          // Set default activeCompanyId to first membership or empty
          token.activeCompanyId = dbUser.memberships[0]?.companyId ?? ''
        }
      }
      return token
    },

    async session({ session, token }) {
      if (token) {
        session.user = {
          ...session.user,
          id: token.userId as string,
          globalRole: token.globalRole as GlobalRole,
          activeCompanyId: token.activeCompanyId as string,
          memberships: (token.memberships ?? []) as CompanyMembership[],
        } as MGIUser & typeof session.user
      }
      return session
    },
  },
  providers: [], // Providers injected per-app (Resend magic link + credentials)
}
