// Shown by Auth.js after a magic link is requested (pages.verifyRequest = '/verify').
export default function VerifyRequestPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-mgi-bg">
      <div className="w-full max-w-sm space-y-4 px-6 text-center">
        <h1 className="text-2xl font-semibold text-mgi-text">Check your email</h1>
        <p className="text-sm text-mgi-muted">
          If this address belongs to an authorised MGI Executive OS account, a sign-in link
          has been sent. The link expires shortly and can be used once.
        </p>
        <a href="/login" className="inline-block text-xs text-mgi-label underline">
          Back to sign in
        </a>
      </div>
    </div>
  )
}
