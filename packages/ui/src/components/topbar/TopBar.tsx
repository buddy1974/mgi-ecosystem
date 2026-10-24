'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

function Breadcrumb() {
  const pathname = usePathname()
  const segments = pathname.split('/').filter(Boolean)

  return (
    <nav className="flex min-w-0 items-center gap-1.5 overflow-hidden text-sm">
      <span className="hidden text-mgi-label sm:inline">MGI Ventures</span>
      {segments.map((segment, i) => (
        <span key={i} className={`flex min-w-0 items-center gap-1.5 ${i < segments.length - 1 ? 'hidden sm:flex' : ''}`}>
          <span className="hidden text-mgi-label sm:inline">/</span>
          <span
            className={`truncate ${
              i === segments.length - 1
                ? 'text-mgi-text capitalize'
                : 'text-mgi-label capitalize'
            }`}
          >
            {/^[a-z0-9]{20,}$|^demo-/.test(segment) ? 'record' : segment.replace(/-/g, ' ')}
          </span>
        </span>
      ))}
    </nav>
  )
}

const MOBILE_NAV = [
  { href: '/briefing', label: 'Briefing' },
  { href: '/briefing/commitments', label: 'Commitments' },
  { href: '/briefing/finance', label: 'Finance' },
  { href: '/dashboard', label: 'Overview' },
  { href: '/approvals', label: 'Approvals' },
  { href: '/operations', label: 'Ops' },
]

// The search box, camera, notification and "+ New" buttons were placeholders with no
// behaviour (removed 2026-10-24: no control may look functional and do nothing).
export function TopBar() {
  const pathname = usePathname()
  return (
    <header className="border-b border-mgi-border bg-mgi-bg">
      <div className="flex h-[52px] items-center gap-3 px-4 md:px-6">
        <Link href="/briefing" className="flex h-7 w-7 shrink-0 items-center justify-center rounded bg-white text-xs font-bold text-black md:hidden" aria-label="MGI Executive OS — Briefing Centre">
          M
        </Link>
        <div className="min-w-0 flex-1">
          <Breadcrumb />
        </div>
      </div>
      {/* Phones: the sidebar is hidden, so the key destinations live here. */}
      <nav aria-label="Main" className="flex gap-1 overflow-x-auto px-3 pb-2 md:hidden">
        {MOBILE_NAV.map((i) => {
          const active = pathname === i.href || (i.href !== '/briefing' && pathname.startsWith(i.href + '/'))
          return (
            <Link key={i.href} href={i.href} className={`whitespace-nowrap rounded-md px-3 py-1.5 text-xs ${active ? 'bg-white/10 text-white' : 'text-mgi-muted'}`}>
              {i.label}
            </Link>
          )
        })}
      </nav>
    </header>
  )
}
