import { AuthError } from 'next-auth'
import { redirect } from 'next/navigation'
import { signIn } from '@/auth'

// SECURITY: this page must never offer one-click or pre-filled sign-in.
// Guarded by tests/security.test.ts.

const ERROR_MESSAGES: Record<string, string> = {
  CredentialsSignin: 'Invalid email or password.',
  AccessDenied: 'This account is not authorised for MGI Executive OS.',
  Verification: 'The sign-in link is invalid or has expired.',
}

async function credentialsAction(formData: FormData) {
  'use server'
  try {
    await signIn('credentials', {
      email: formData.get('email'),
      password: formData.get('password'),
      redirectTo: '/dashboard',
    })
  } catch (error) {
    if (error instanceof AuthError) redirect(`/login?error=${encodeURIComponent(error.type)}`)
    throw error
  }
}

async function magicLinkAction(formData: FormData) {
  'use server'
  try {
    await signIn('nodemailer', {
      email: formData.get('email'),
      redirectTo: '/dashboard',
    })
  } catch (error) {
    if (error instanceof AuthError) redirect(`/login?error=${encodeURIComponent(error.type)}`)
    throw error
  }
}

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const { error } = await searchParams
  const errorKey = typeof error === 'string' ? error : undefined
  const errorMessage = errorKey ? (ERROR_MESSAGES[errorKey] ?? 'Sign-in failed.') : null
  const magicLinkEnabled = Boolean(process.env.EMAIL_SERVER)

  return (
    <div className="flex min-h-screen items-center justify-center bg-mgi-bg">
      <div className="w-full max-w-sm space-y-8 px-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <p className="font-mono text-xs tracking-widest text-mgi-label uppercase">
            V1.0 · LEITSTELLE
          </p>
          <h1 className="text-3xl font-semibold text-mgi-text">
            MGI Executive OS
          </h1>
          <p className="text-mgi-muted text-sm">
            Secure access — MGI Ventures ecosystem
          </p>
        </div>

        {errorMessage && (
          <p role="alert" className="rounded-md border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-300">
            {errorMessage}
          </p>
        )}

        {/* Email + password */}
        <form action={credentialsAction} className="space-y-4">
          <div className="space-y-2">
            <label
              htmlFor="cred-email"
              className="block text-xs font-medium uppercase tracking-widest text-mgi-muted"
            >
              Email or username
            </label>
            <input
              id="cred-email"
              name="email"
              type="text"
              autoCapitalize="none"
              spellCheck={false}
              required
              autoComplete="username"
              className="w-full rounded-md border border-mgi-border bg-mgi-input px-4 py-3 text-sm text-mgi-text placeholder:text-mgi-label focus:border-white focus:outline-none focus:ring-1 focus:ring-white transition-colors"
            />
          </div>
          <div className="space-y-2">
            <label
              htmlFor="password"
              className="block text-xs font-medium uppercase tracking-widest text-mgi-muted"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              placeholder="••••••••••"
              autoComplete="current-password"
              className="w-full rounded-md border border-mgi-border bg-mgi-input px-4 py-3 text-sm text-mgi-text placeholder:text-mgi-label focus:border-white focus:outline-none focus:ring-1 focus:ring-white transition-colors"
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-md bg-white px-4 py-3 text-sm font-semibold text-black hover:bg-gray-100 transition-colors"
          >
            Sign in →
          </button>
        </form>

        {magicLinkEnabled && (
          <>
            {/* Divider */}
            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-mgi-border" />
              <span className="text-[11px] text-mgi-label uppercase tracking-widest">or</span>
              <div className="flex-1 h-px bg-mgi-border" />
            </div>

            {/* Magic link login — existing active accounts only (see auth.ts signIn callback) */}
            <form action={magicLinkAction} className="space-y-4">
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="block text-xs font-medium uppercase tracking-widest text-mgi-muted"
                >
                  Email — magic link
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="w-full rounded-md border border-mgi-border bg-mgi-input px-4 py-3 text-sm text-mgi-text placeholder:text-mgi-label focus:border-white focus:outline-none focus:ring-1 focus:ring-white transition-colors"
                />
              </div>
              <button
                type="submit"
                className="w-full rounded-md border border-mgi-border bg-transparent px-4 py-3 text-sm font-medium text-mgi-muted hover:text-white hover:border-white/30 transition-colors"
              >
                Send magic link
              </button>
            </form>
          </>
        )}

        <p className="text-center text-xs text-mgi-label">
          Restricted access · MGI Ventures internal only
        </p>
      </div>
    </div>
  )
}
