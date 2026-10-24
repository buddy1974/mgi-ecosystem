import Link from 'next/link'

// Shown for unknown ids and for records outside the viewer's companies (the two are
// deliberately indistinguishable). Demo resets also invalidate links from older demo runs.
export default function BriefingNotFound() {
  return (
    <div className="mx-auto max-w-xl space-y-3 py-16 text-center">
      <p className="font-mono text-xs uppercase tracking-widest text-mgi-label">404</p>
      <h1 className="text-xl font-light text-white">This item is not available</h1>
      <p className="text-sm text-mgi-muted">
        It does not exist, or it belongs to a company your account cannot see. Links from an earlier demo
        run stop working when the demo data is reset.
      </p>
      <Link href="/briefing" className="inline-block rounded-md bg-white px-4 py-2 text-sm font-semibold text-black">
        Back to the briefing centre
      </Link>
    </div>
  )
}
