// Login abuse protection (2026-10-18 stabilisation).
//
// Shared across all serverless instances because the counters live in the
// existing audit_logs table (no schema change): every failed credentials
// sign-in and every magic-link request writes one row, and new attempts are
// refused while recent rows exceed the limits below. In-memory counters are
// not used — they reset on cold start and are not shared between instances.
//
// Keys:
//  - account: the normalised login id as typed (known or unknown), so the
//    limit does not reveal whether an account exists;
//  - ip: the client address from Vercel's x-forwarded-for / x-real-ip.
// Locks are temporary (sliding window) — no permanent lockout to exploit.

import { prisma } from '@mgi/database'

export const THROTTLE_WINDOW_MS = 15 * 60 * 1000

export const LIMITS = {
  credentials: { perAccount: 8, perIp: 30 },
  magicLink: { perAccount: 3, perIp: 10 },
} as const

export type ThrottleKind = keyof typeof LIMITS

const RESOURCE: Record<ThrottleKind, string> = {
  credentials: 'auth.login_failure',
  magicLink: 'auth.magic_link_request',
}

/** Pure policy: blocked when either counter has reached its limit. */
export function isThrottled(kind: ThrottleKind, counts: { account: number; ip: number }): boolean {
  const limit = LIMITS[kind]
  return counts.account >= limit.perAccount || counts.ip >= limit.perIp
}

/** Client IP from request headers. Vercel overwrites x-forwarded-for, so it is not client-spoofable there. */
export function clientIpFrom(headers: Headers | undefined | null): string {
  const fwd = headers?.get('x-forwarded-for')?.split(',')[0]?.trim()
  return fwd || headers?.get('x-real-ip')?.trim() || 'unknown'
}

function accountKey(loginId: string): string {
  return loginId.trim().toLowerCase().slice(0, 254)
}

export async function isLoginThrottled(kind: ThrottleKind, loginId: string, ip: string): Promise<boolean> {
  const since = new Date(Date.now() - THROTTLE_WINDOW_MS)
  const resource = RESOURCE[kind]
  const [account, byIp] = await Promise.all([
    prisma.auditLog.count({ where: { resource, resourceId: accountKey(loginId), createdAt: { gte: since } } }),
    ip === 'unknown'
      ? Promise.resolve(0)
      : prisma.auditLog.count({ where: { resource, ipAddress: ip, createdAt: { gte: since } } }),
  ])
  return isThrottled(kind, { account, ip: byIp })
}

/** Records one attempt. Never throws: a failed audit write must not break sign-in. */
export async function recordLoginAttempt(
  kind: ThrottleKind,
  loginId: string,
  ip: string,
  userId?: string | null,
): Promise<void> {
  try {
    await prisma.auditLog.create({
      data: {
        action: 'LOGIN',
        resource: RESOURCE[kind],
        resourceId: accountKey(loginId),
        userId: userId ?? null,
        ipAddress: ip === 'unknown' ? null : ip,
      },
    })
  } catch (err) {
    console.error('[login-throttle] audit write failed:', (err as Error).message)
  }
}
