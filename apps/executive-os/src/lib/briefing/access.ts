import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { requirePageUser, getActiveUser } from '@/lib/require-auth'
import type { MGIUser } from '@mgi/types'

// Briefing-centre access. Unlike the older (os) pages (any active account sees all
// ventures — known risk), briefing content is company-scoped:
// - SUPER_ADMIN / ADMIN (executives): every company, may decide.
// - USER: only companies with a membership (read fresh from the DB, not the JWT);
//   may decide only where the membership role is ADMIN.
// A record the user may not see answers 404, exactly like a record that does not exist.

export interface BriefingAccess {
  user: MGIUser
  actor: string
  companies: '*' | string[]
  decideCompanies: '*' | string[]
}

export async function accessFor(user: MGIUser): Promise<BriefingAccess> {
  const actor = user.name || user.email || user.id
  if (user.globalRole === 'SUPER_ADMIN' || user.globalRole === 'ADMIN') {
    return { user, actor, companies: '*', decideCompanies: '*' }
  }
  const memberships = await prisma.companyMembership.findMany({
    where: { userId: user.id },
    select: { role: true, company: { select: { slug: true, active: true } } },
  })
  const active = memberships.filter((m) => m.company.active)
  return {
    user,
    actor,
    companies: active.map((m) => m.company.slug),
    decideCompanies: active.filter((m) => m.role === 'ADMIN').map((m) => m.company.slug),
  }
}

export function canView(a: BriefingAccess, companySlug: string): boolean {
  return a.companies === '*' || a.companies.includes(companySlug)
}

export function canDecide(a: BriefingAccess, companySlug: string): boolean {
  return a.decideCompanies === '*' || a.decideCompanies.includes(companySlug)
}

/** Prisma filter limiting a query to the companies this user may see. */
export function companyFilter(a: BriefingAccess): { companySlug?: { in: string[] } } {
  return a.companies === '*' ? {} : { companySlug: { in: a.companies } }
}

/** Page guard: signed in + active (else /login or 404). */
export async function requireBriefingPage(): Promise<BriefingAccess> {
  const user = await requirePageUser()
  return accessFor(user)
}

/** Server-action guard: throws (→ error boundary) instead of redirecting. */
export async function requireBriefingAction(): Promise<BriefingAccess> {
  const user = await getActiveUser()
  if (!user) throw new Error('Unauthorized')
  return accessFor(user)
}

export function viewOr404(a: BriefingAccess, companySlug: string): void {
  if (!canView(a, companySlug)) notFound()
}
