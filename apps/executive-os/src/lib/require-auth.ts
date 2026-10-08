/**
 * require-auth.ts
 * ───────────────────────────────────────────────────────────────────────────
 * Centralised authentication and authorization helpers for API route handlers.
 *
 * Pattern:
 *   const userOrError = await requireSession()
 *   if (userOrError instanceof NextResponse) return userOrError
 *   // userOrError is MGIUser — fully typed with memberships + globalRole
 *
 *   const accessOrError = await requireCompanyAccess(userOrError, companyId, 'approvals.create')
 *   if (accessOrError instanceof NextResponse) return accessOrError
 *   // Proceed — access is granted
 */

import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@mgi/database'
import { hasPermission, getUserCompanyRole, isAllowedToSignIn } from '@mgi/auth'
import type { MGIUser, GlobalRole } from '@mgi/types'

// ── Session ──────────────────────────────────────────────────────────────────

/**
 * Returns the authenticated MGIUser or a 401 NextResponse.
 * The account is re-checked against the database on every call so that a
 * deactivated or demoted user loses access immediately (JWTs live up to 12h).
 * Use instanceof NextResponse to check for failure:
 *   const user = await requireSession()
 *   if (user instanceof NextResponse) return user
 */
export async function requireSession(): Promise<MGIUser | NextResponse> {
  const session = await auth()
  const sessionUser = session?.user as MGIUser | undefined
  if (!sessionUser?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const dbUser = await prisma.user.findUnique({
    where: { id: sessionUser.id },
    select: { status: true, globalRole: true },
  })
  if (!isAllowedToSignIn(dbUser)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  return { ...sessionUser, globalRole: dbUser!.globalRole as GlobalRole }
}

// ── Company access ───────────────────────────────────────────────────────────

/**
 * Validates that the user has the required permission for the given company.
 * SUPER_ADMIN bypasses all checks.
 * Returns true on success or a 403 NextResponse on failure.
 *
 *   const access = await requireCompanyAccess(user, companyId, 'approvals.create')
 *   if (access instanceof NextResponse) return access
 */
export async function requireCompanyAccess(
  user: MGIUser,
  companyId: string,
  permission: string
): Promise<true | NextResponse> {
  if (!hasPermission(user, permission, companyId)) {
    return NextResponse.json(
      { error: 'Forbidden: insufficient permissions for this company' },
      { status: 403 }
    )
  }
  return true
}

// ── CEO-only gate ─────────────────────────────────────────────────────────────

/**
 * Requires SUPER_ADMIN global role.
 * Use for actions only Rogers should perform (CEO replies, approvals, etc.).
 */
export function requireSuperAdmin(user: MGIUser): true | NextResponse {
  if (user.globalRole !== 'SUPER_ADMIN') {
    return NextResponse.json(
      { error: 'Forbidden: SUPER_ADMIN required' },
      { status: 403 }
    )
  }
  return true
}

// ── Company ADMIN gate ────────────────────────────────────────────────────────

/**
 * Requires SUPER_ADMIN OR company ADMIN role for the given company.
 * Used for approval decisions, user invites, etc.
 */
export function requireCompanyAdmin(
  user: MGIUser,
  companyId: string
): true | NextResponse {
  if (user.globalRole === 'SUPER_ADMIN') return true
  const role = getUserCompanyRole(user, companyId)
  if (role !== 'ADMIN') {
    return NextResponse.json(
      { error: 'Forbidden: company ADMIN role required' },
      { status: 403 }
    )
  }
  return true
}

// ── IP helper ─────────────────────────────────────────────────────────────────

/**
 * Extracts the client IP from request headers (Vercel edge-safe).
 */
export function getClientIp(req: Request): string {
  return (
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    req.headers.get('x-real-ip') ??
    'unknown'
  )
}
