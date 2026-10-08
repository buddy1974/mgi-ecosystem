// Augments the next-auth Session type so that session.user is typed as MGIUser
// throughout executive-os, eliminating unsafe `as MGIUser` casts in route handlers.
import type { DefaultSession } from 'next-auth'
import type { MGIUser } from '@mgi/types'

declare module 'next-auth' {
  interface Session {
    user: MGIUser & DefaultSession['user']
  }
}
