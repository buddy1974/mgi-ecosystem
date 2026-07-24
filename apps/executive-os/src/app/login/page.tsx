import { signIn } from '@/auth'

export default function LoginPage() {
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

        {/* Dev password login */}
        <form
          action={async (formData: FormData) => {
            'use server'
            await signIn('credentials', {
              password: formData.get('password') as string,
              redirectTo: '/dashboard',
            })
          }}
          className="space-y-4"
        >
          <div className="space-y-2">
            <label
              htmlFor="password"
              className="block text-xs font-medium uppercase tracking-widest text-mgi-muted"
            >
              Dev password
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

        {/* Quick access — one click, no typing. The credential itself is
            never sent to the browser: this server action reads OS_PASSWORD
            on the server and signs in directly, so the restricted-access
            password is never exposed in page source or network traffic. */}
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-mgi-border" />
            <span className="text-[11px] text-mgi-label uppercase tracking-widest">
              Quick access — click to sign in
            </span>
            <div className="flex-1 h-px bg-mgi-border" />
          </div>
          <form
            action={async () => {
              'use server'
              const expectedPassword =
                process.env.OS_PASSWORD ??
                (process.env.NODE_ENV === 'development' ? 'essen2026' : null)
              if (!expectedPassword) return
              await signIn('credentials', {
                password: expectedPassword,
                redirectTo: '/dashboard',
              })
            }}
          >
            <button
              type="submit"
              className="w-full flex items-center justify-between rounded-full border border-mgi-border bg-mgi-input px-5 py-3 text-sm font-medium text-mgi-text hover:border-white/40 hover:bg-mgi-card-hover transition-colors"
            >
              <span>Rogers Nforgwei</span>
              <span className="rounded-badge bg-status-build-bg px-2 py-0.5 text-[11px] font-semibold text-status-build">
                Owner
              </span>
            </button>
          </form>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-3">
          <div className="flex-1 h-px bg-mgi-border" />
          <span className="text-[11px] text-mgi-label uppercase tracking-widest">or</span>
          <div className="flex-1 h-px bg-mgi-border" />
        </div>

        {/* Magic link login */}
        <form
          action={async (formData: FormData) => {
            'use server'
            await signIn('nodemailer', {
              email: formData.get('email'),
              redirectTo: '/dashboard',
            })
          }}
          className="space-y-4"
        >
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
              placeholder="rogers@mgi-ventures.com"
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

        <p className="text-center text-xs text-mgi-label">
          Restricted access · MGI Ventures internal only
        </p>
      </div>
    </div>
  )
}
