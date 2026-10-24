import type { Domain, Priority } from './types'
import { PRIORITY_RANK } from './types'

// Who may receive which briefing content. Recipients are referenced by key everywhere
// (outbox rows, logs); chat ids live only in environment variables, never in the DB or Git.
export interface Recipient {
  key: string
  label: string
  /** Env var holding the live Telegram chat id. */
  chatIdEnv: string
  companies: '*' | readonly string[]
  domains: '*' | readonly Domain[]
  /** Lowest priority that may be pushed as an immediate alert. */
  minAlertPriority: Priority
  morningBrief: boolean
  digest: boolean
}

export const RECIPIENTS: readonly Recipient[] = [
  {
    // The President's private chat with the bot. Group-wide executive content.
    key: 'president',
    label: 'President (private chat)',
    chatIdEnv: 'TELEGRAM_PRESIDENT_CHAT_ID',
    companies: '*',
    domains: '*',
    minAlertPriority: 'HIGH',
    morningBrief: true,
    digest: true,
  },
  {
    // The existing "MGI — Operations" group (managers are members). Receives only
    // operational failures — never finance, commitments/performance or piracy details.
    key: 'operations',
    label: 'MGI — Operations group',
    chatIdEnv: 'OPERATIONS_CHAT_ID',
    companies: '*',
    domains: ['OPERATIONS'],
    minAlertPriority: 'CRITICAL',
    morningBrief: false,
    digest: false,
  },
]

export function getRecipient(key: string): Recipient | undefined {
  return RECIPIENTS.find((r) => r.key === key)
}

export function mayReceive(r: Recipient, ev: { companySlug: string; domain: string }): boolean {
  const companyOk = r.companies === '*' || r.companies.includes(ev.companySlug)
  const domainOk = r.domains === '*' || (r.domains as readonly string[]).includes(ev.domain)
  return companyOk && domainOk
}

export function mayReceiveAlert(r: Recipient, ev: { companySlug: string; domain: string; priority: Priority }): boolean {
  return mayReceive(r, ev) && PRIORITY_RANK[ev.priority] <= PRIORITY_RANK[r.minAlertPriority]
}
