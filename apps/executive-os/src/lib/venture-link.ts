// Signed manager submission links (2026-10-18 stabilisation).
//
// /api/venture-report used to accept anonymous POSTs for any guessable venture
// slug, writing rows and sending Telegram alerts. Each manager link now carries a
// per-venture key: HMAC-SHA256 over the slug, keyed with AUTH_SECRET under a
// dedicated label (domain separation — the key is useless for anything else).
// No new secret to manage; rotating AUTH_SECRET also invalidates all links.
// Generate links with: node scripts/venture-links.mjs (reads AUTH_SECRET from env).

import crypto from 'node:crypto'
import { safeEqual } from '@mgi/auth'

const LABEL = 'mgi-venture-report-link:v1:'
const MIN_SECRET_LENGTH = 32

/** Per-venture submissions accepted per rolling hour (spam / alert-flood cap). */
export const VENTURE_REPORTS_PER_HOUR = 20

export function ventureLinkSecret(): string | null {
  const s = process.env.AUTH_SECRET ?? process.env.NEXTAUTH_SECRET
  return s && s.length >= MIN_SECRET_LENGTH ? s : null
}

export function ventureLinkKey(slug: string, secret: string): string {
  return crypto.createHmac('sha256', secret).update(LABEL + slug).digest('base64url').slice(0, 32)
}

export function isValidVentureKey(slug: string, key: unknown, secret: string): boolean {
  if (typeof key !== 'string' || key.length === 0) return false
  return safeEqual(key, ventureLinkKey(slug, secret))
}
