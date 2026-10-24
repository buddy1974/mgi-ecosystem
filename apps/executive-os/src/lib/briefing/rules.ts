// Notification rules — pure functions, unit tested in tests/briefing-rules.test.ts.
// Fewer, useful alerts: only CRITICAL/HIGH may interrupt; everything else waits for a digest
// or the morning brief.
import type { EventKind, Priority } from './types'

type Facts = Record<string, unknown>

const num = (v: unknown): number => (typeof v === 'number' && Number.isFinite(v) ? v : 0)

const BASE: Record<EventKind, Priority> = {
  SALES_CHANGE: 'NORMAL',
  RECEIVABLE_OVERDUE: 'NORMAL',
  DISTRIBUTOR_UPDATE: 'LOW',
  STOCK_EXCEPTION: 'NORMAL',
  PIRACY_SUSPECTED: 'HIGH',
  CONSTRUCTION_INQUIRY: 'NORMAL',
  QUOTATION_FOLLOW_UP: 'LOW',
  PROJECT_DECISION_PENDING: 'NORMAL',
  PROGRAMME_REGISTRATION: 'LOW',
  REGISTRATION_INCOMPLETE: 'LOW',
  COMPETITOR_SIGNAL: 'NORMAL',
  BUSINESS_INQUIRY: 'NORMAL',
  MEETING_RESOLUTION: 'NORMAL',
  COMMITMENT_OVERDUE: 'HIGH',
  COMMITMENT_BLOCKED: 'NORMAL',
  COMMITMENT_DELIVERED: 'NORMAL',
  COMMITMENT_UNBLOCKED: 'LOW',
  APPROVAL_REQUEST: 'HIGH',
  APPROVAL_DECIDED: 'LOW',
  OPERATIONAL_FAILURE: 'HIGH',
}

export const THRESHOLDS = {
  /** Receivable overdue: amount (XAF) or age that makes it HIGH. */
  receivableHighAmount: 2_000_000,
  receivableHighDays: 60,
  /** Week-on-week sales change that is worth an alert (fraction). */
  salesChangeHigh: 0.25,
  /** Estimated construction contract value (XAF) that is worth an alert. */
  inquiryHighValue: 50_000_000,
  /** Suspected pirated copies that make a case CRITICAL. */
  piracyCriticalCopies: 1_000,
  /** Unposted POS tickets that make a sync failure CRITICAL. */
  syncCriticalTickets: 10,
} as const

export function classifyPriority(kind: EventKind, facts: Facts = {}): Priority {
  switch (kind) {
    case 'RECEIVABLE_OVERDUE':
      return num(facts.outstanding) >= THRESHOLDS.receivableHighAmount || num(facts.daysOverdue) >= THRESHOLDS.receivableHighDays
        ? 'HIGH' : 'NORMAL'
    case 'SALES_CHANGE':
      return Math.abs(num(facts.changePct)) >= THRESHOLDS.salesChangeHigh * 100 ? 'HIGH' : 'LOW'
    case 'CONSTRUCTION_INQUIRY':
      return num(facts.estimatedValue) >= THRESHOLDS.inquiryHighValue ? 'HIGH' : 'NORMAL'
    case 'PIRACY_SUSPECTED':
      return num(facts.suspectedCopies) >= THRESHOLDS.piracyCriticalCopies ? 'CRITICAL' : 'HIGH'
    case 'STOCK_EXCEPTION':
      return facts.stockout === true && facts.topTitle === true ? 'HIGH' : 'NORMAL'
    case 'COMMITMENT_BLOCKED':
      // Only a block that waits on the President/management needs to interrupt him.
      return facts.delayCause === 'MANAGEMENT_DEPENDENCY' ? 'HIGH' : 'NORMAL'
    case 'OPERATIONAL_FAILURE':
      return num(facts.unpostedTickets) >= THRESHOLDS.syncCriticalTickets || facts.severity === 'critical'
        ? 'CRITICAL' : 'HIGH'
    default:
      return BASE[kind]
  }
}

export const RATE_LIMITS = {
  /** Immediate alerts per recipient per rolling hour before overflow goes to the digest. */
  alertsPerHour: 4,
  /** Hard ceiling, CRITICAL included — prevents notification storms. */
  criticalPerHour: 8,
} as const

/** Douala is UTC+1 all year (no DST). */
export const DOUALA_OFFSET_MS = 60 * 60 * 1000

export function doualaHour(now: Date): number {
  return new Date(now.getTime() + DOUALA_OFFSET_MS).getUTCHours()
}

/** 22:00–06:00 Douala time: HIGH alerts wait for the morning brief, CRITICAL still goes out. */
export function isQuietHours(now: Date): boolean {
  const h = doualaHour(now)
  return h >= 22 || h < 6
}

/** EXEC_ALERTS_PER_HOUR overrides the default (1–20), e.g. for a live demo walk-through. */
export function alertsPerHour(env: NodeJS.ProcessEnv = process.env): number {
  const n = Number(env.EXEC_ALERTS_PER_HOUR)
  return Number.isInteger(n) && n >= 1 && n <= 20 ? n : RATE_LIMITS.alertsPerHour
}

export type Routing = { routing: 'ALERT' | 'DIGEST'; reason: string }

export function routeEvent(
  priority: Priority,
  ctx: { now: Date; alertsLastHour: number; recipientAllowsAlert: boolean; limit?: number },
): Routing {
  if (!ctx.recipientAllowsAlert) return { routing: 'DIGEST', reason: 'below recipient alert threshold' }
  if (priority === 'CRITICAL') {
    return ctx.alertsLastHour >= RATE_LIMITS.criticalPerHour
      ? { routing: 'DIGEST', reason: 'hourly alert ceiling reached' }
      : { routing: 'ALERT', reason: 'critical' }
  }
  if (priority !== 'HIGH') return { routing: 'DIGEST', reason: 'routine' }
  if (isQuietHours(ctx.now)) return { routing: 'DIGEST', reason: 'quiet hours' }
  if (ctx.alertsLastHour >= (ctx.limit ?? RATE_LIMITS.alertsPerHour)) return { routing: 'DIGEST', reason: 'hourly alert limit reached' }
  return { routing: 'ALERT', reason: 'high' }
}

/** Retry schedule for failed Telegram deliveries; after the last one the row is FAILED. */
export const RETRY_DELAYS_MS = [60_000, 5 * 60_000, 30 * 60_000] as const

export function nextRetry(attempts: number, now: Date, retryAfterSec?: number): Date | null {
  if (attempts > RETRY_DELAYS_MS.length) return null
  const base = RETRY_DELAYS_MS[Math.min(attempts, RETRY_DELAYS_MS.length) - 1]
  const wait = Math.max(base, (retryAfterSec ?? 0) * 1000)
  return new Date(now.getTime() + wait)
}

/** Business date (YYYY-MM-DD) in Douala, used for morning-brief dedupe keys. */
export function doualaDate(now: Date): string {
  return new Date(now.getTime() + DOUALA_OFFSET_MS).toISOString().slice(0, 10)
}

/** Start of the Douala business day containing `now`, as a UTC instant. */
export function doualaDayStart(now: Date): Date {
  const d = doualaDate(now)
  return new Date(new Date(`${d}T00:00:00.000Z`).getTime() - DOUALA_OFFSET_MS)
}
