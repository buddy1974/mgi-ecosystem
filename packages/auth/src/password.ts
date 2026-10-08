import crypto from 'crypto'

// PBKDF2-SHA512 password hashing. Format: "<saltHex>:<hashHex>".
// Compatible with hashes already written by /api/users/accept-invite.
// Node runtime only — never import from middleware (edge).

const ITERATIONS = 100_000
const KEY_LENGTH = 64
const DIGEST = 'sha512'

export const MIN_PASSWORD_LENGTH = 12

export function hashPassword(password: string): string {
  const salt = crypto.randomBytes(16).toString('hex')
  const hash = crypto.pbkdf2Sync(password, salt, ITERATIONS, KEY_LENGTH, DIGEST).toString('hex')
  return `${salt}:${hash}`
}

export function verifyPassword(password: string, stored: string | null | undefined): boolean {
  if (!stored || typeof password !== 'string' || password.length === 0) return false
  const [salt, hashHex] = stored.split(':')
  if (!salt || !hashHex) return false
  const expected = Buffer.from(hashHex, 'hex')
  if (expected.length !== KEY_LENGTH) return false
  const actual = crypto.pbkdf2Sync(password, salt, ITERATIONS, KEY_LENGTH, DIGEST)
  return crypto.timingSafeEqual(actual, expected)
}

/** Constant-time comparison for shared secrets (cron/webhook headers). */
export function safeEqual(a: string | null | undefined, b: string | null | undefined): boolean {
  if (typeof a !== 'string' || typeof b !== 'string') return false
  const ha = crypto.createHash('sha256').update(a).digest()
  const hb = crypto.createHash('sha256').update(b).digest()
  return crypto.timingSafeEqual(ha, hb) && a.length === b.length
}
