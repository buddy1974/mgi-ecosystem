// Pure sign-in policy — no I/O, so it can be unit tested and reused.
//
// Only accounts that already exist in the database AND are active may sign in.
// This closes open self-registration through the magic-link provider
// (PrismaAdapter would otherwise create a user for any email address).

export interface SignInCandidate {
  status: string | null
  globalRole: string | null
}

export function normalizeEmail(email: unknown): string | null {
  if (typeof email !== 'string') return null
  const e = email.trim().toLowerCase()
  return e.length > 3 && e.includes('@') ? e : null
}

// Sign-in identifier: an email address OR a plain username (e.g. "admin").
// Usernames: lowercase letters, digits, '.', '_', '-', 3–32 chars, starting with a letter.
// Stored in the same unique users.email column; invitations remain email-only.
const USERNAME_RE = /^[a-z][a-z0-9._-]{2,31}$/

export function normalizeLoginId(id: unknown): string | null {
  if (typeof id !== 'string') return null
  const v = id.trim().toLowerCase()
  if (v.includes('@')) return normalizeEmail(v)
  return USERNAME_RE.test(v) ? v : null
}

export function isAllowedToSignIn(user: SignInCandidate | null | undefined): boolean {
  if (!user) return false
  return user.status === 'active'
}
