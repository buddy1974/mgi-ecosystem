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

export function isAllowedToSignIn(user: SignInCandidate | null | undefined): boolean {
  if (!user) return false
  return user.status === 'active'
}
