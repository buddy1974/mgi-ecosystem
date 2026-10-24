import type { SubjectType } from './types'

// Deep links from Telegram into the OS. Every link points at one exact record page; the
// page itself enforces sign-in and company access, so a forwarded link reveals nothing.

const ID_RE = /^[A-Za-z0-9_-]{1,64}$/

export function subjectPath(subjectType: SubjectType, id: string): string {
  if (!ID_RE.test(id)) throw new Error('invalid record id')
  switch (subjectType) {
    case 'RECORD': return `/briefing/records/${id}`
    case 'COMMITMENT': return `/briefing/commitments/${id}`
    case 'MEETING': return `/briefing/meetings/${id}`
    case 'DECISION': return `/briefing/meetings/decision/${id}`
    case 'FINANCE': return `/briefing/finance/${id}`
    case 'OUTBOX': return '/briefing/notifications'
  }
}

/**
 * Base URL for links in messages. Must be https, except loopback for local development.
 * Returns null when unset/invalid — callers then refuse to send an alert with a broken link.
 */
export function briefingBaseUrl(env: NodeJS.ProcessEnv = process.env): string | null {
  const raw = env.EXEC_OS_BASE_URL?.trim()
  if (!raw) return null
  let u: URL
  try { u = new URL(raw) } catch { return null }
  const loopback = u.hostname === 'localhost' || u.hostname === '127.0.0.1'
  if (u.protocol !== 'https:' && !(u.protocol === 'http:' && loopback)) return null
  if (u.username || u.password || u.search || u.hash) return null
  return u.origin
}

export function absoluteLink(path: string, env: NodeJS.ProcessEnv = process.env): string | null {
  const base = briefingBaseUrl(env)
  return base ? `${base}${path}` : null
}

/**
 * Post-login return path. Only same-site briefing/OS paths are accepted (no scheme, no
 * protocol-relative "//", no backslashes) — prevents open redirects through /login?next=.
 */
export function safeNextPath(raw: unknown): string | null {
  if (typeof raw !== 'string' || raw.length > 200) return null
  if (!raw.startsWith('/') || raw.startsWith('//') || raw.includes('\\') || /[\r\n\t]/.test(raw)) return null
  if (!/^\/[A-Za-z0-9/_\-?=&.%]*$/.test(raw)) return null
  if (raw.startsWith('/api/') || raw.startsWith('/login')) return null
  return raw
}

/** Earliest selectable due date for forms (tomorrow, YYYY-MM-DD). Kept out of render code. */
export function minDueDate(now: Date = new Date()): string {
  return new Date(now.getTime() + 86_400_000).toISOString().slice(0, 10)
}
