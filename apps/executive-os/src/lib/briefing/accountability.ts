// Committed vs Delivered — pure, unit tested. Measures agreed deliverables, not activity:
// no attendance, presence or keystroke data exists or is inferred. A delay is attributed to
// the owner only when its recorded cause is OWNER (or no cause was given); missing
// resources, changed priorities, management dependencies and external causes are shown
// separately so the President can see where the organisation, not the person, is the issue.

export interface CommitmentLike {
  ownerRole: string
  ownerName: string
  companySlug: string
  status: string
  dueAt: Date
  deliveredAt: Date | null
  delayCause: string | null
}

export interface OwnerStats {
  ownerRole: string
  ownerName: string
  companySlug: string
  total: number
  deliveredOnTime: number
  deliveredLate: number
  overdueOpen: number
  open: number
  blocked: number
  ownerAttributableDelays: number
  systemicDelays: number
  onTimeRate: number | null
}

const DONE = ['DELIVERED', 'ACCEPTED']

export function isOverdue(c: CommitmentLike, now: Date): boolean {
  return !DONE.includes(c.status) && c.status !== 'CANCELLED' && c.dueAt < now
}

export function deliveryStats(list: CommitmentLike[], now: Date): OwnerStats[] {
  const by = new Map<string, OwnerStats>()
  for (const c of list) {
    if (c.status === 'CANCELLED') continue
    const key = `${c.companySlug}|${c.ownerRole}|${c.ownerName}`
    const s = by.get(key) ?? {
      ownerRole: c.ownerRole, ownerName: c.ownerName, companySlug: c.companySlug, total: 0, deliveredOnTime: 0, deliveredLate: 0,
      overdueOpen: 0, open: 0, blocked: 0, ownerAttributableDelays: 0, systemicDelays: 0, onTimeRate: null,
    }
    s.total++
    const done = DONE.includes(c.status) && c.deliveredAt
    const late = done ? c.deliveredAt! > c.dueAt : isOverdue(c, now)
    if (done && !late) s.deliveredOnTime++
    else if (done && late) s.deliveredLate++
    else if (late) s.overdueOpen++
    else s.open++
    if (c.status === 'BLOCKED') s.blocked++
    if (late) {
      if (!c.delayCause || c.delayCause === 'OWNER') s.ownerAttributableDelays++
      else s.systemicDelays++
    }
    by.set(key, s)
  }
  for (const s of by.values()) {
    const decided = s.deliveredOnTime + s.deliveredLate + s.overdueOpen
    s.onTimeRate = decided ? Math.round((s.deliveredOnTime / decided) * 100) : null
  }
  return [...by.values()].sort((a, b) => a.companySlug.localeCompare(b.companySlug) || a.ownerRole.localeCompare(b.ownerRole))
}
