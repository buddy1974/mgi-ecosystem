import { signIn } from '@/auth'

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-mgi-bg">
      <div className="w-full max-w-sm space-y-8 px-6">
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
              Email address
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
            className="w-full rounded-md bg-white px-4 py-3 text-sm font-semibold text-black hover:bg-gray-100 transition-colors"
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
