import type { MGIUser, CompanyRole } from '@mgi/types'

// Permission map — what each role can do
const ROLE_PERMISSIONS: Record<CompanyRole, string[]> = {
  ADMIN: ['*'], // full access
  MANAGER: [
    'tasks.*',
    'approvals.view',
    'approvals.create',
    'calendar.*',
    'social.*',
    'reports.view',
    'team.view',
  ],
  STAFF: [
    'tasks.view',
    'tasks.create',
    'tasks.update.own',
    'approvals.view',
    'approvals.create',
    'calendar.view',
    'social.create',
  ],
  GUEST: ['tasks.view.assigned', 'calendar.view.own'],
}

export function hasPermission(
  user: MGIUser,
  permission: string,
  companyId?: string
): boolean {
  // SUPER_ADMIN bypasses all checks
  if (user.globalRole === 'SUPER_ADMIN') return true

  const targetCompanyId = companyId ?? user.activeCompanyId
  const membership = user.memberships.find((m) => m.companyId === targetCompanyId)

  if (!membership) return false

  const allowed = ROLE_PERMISSIONS[membership.role] ?? []
  if (allowed.includes('*')) return true

  // Check exact match or wildcard namespace match
  return allowed.some((p) => {
    if (p === permission) return true
    if (p.endsWith('.*')) {
      const ns = p.replace('.*', '')
      return permission.startsWith(ns + '.')
    }
    return false
  })
}

export function requirePermission(
  user: MGIUser,
  permission: string,
  companyId?: string
): void {
  if (!hasPermission(user, permission, companyId)) {
    throw new Error(`Forbidden: missing permission "${permission}"`)
  }
}

export function getUserCompanyRole(user: MGIUser, companyId: string): CompanyRole | null {
  return user.memberships.find((m) => m.companyId === companyId)?.role ?? null
}
