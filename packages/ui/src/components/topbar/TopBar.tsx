'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

function Breadcrumb() {
  const pathname = usePathname()
  const segments = pathname.split('/').filter(Boolean)

  return (
    <nav className="flex items-center gap-1.5 text-sm">
      <span className="text-mgi-label">MGI Ventures</span>
      {segments.map((segment, i) => (
        <span key={i} className="flex items-center gap-1.5">
          <span className="text-mgi-label">/</span>
          <span
            className={
              i === segments.length - 1
                ? 'text-mgi-text capitalize'
                : 'text-mgi-label capitalize'
            }
          >
            {segment.replace(/-/g, ' ')}
          </span>
        </span>
      ))}
    </nav>
  )
}

export function TopBar() {
  return (
    <header className="flex h-[52px] items-center gap-4 border-b border-mgi-border bg-mgi-bg px-6">
      <div className="flex-1 min-w-0">
        <Breadcrumb />
      </div>

      <button className="hidden md:flex items-center gap-2 rounded-md border border-mgi-border bg-mgi-input px-3 py-1.5 text-sm text-mgi-label hover:border-white/20 hover:text-mgi-muted transition-colors w-72">
        <span>🔍</span>
        <span className="flex-1 text-left truncate">Search across ecosystem…</span>
        <kbd className="font-mono text-[10px] text-mgi-label border border-mgi-border rounded px-1">
          ⌘K
        </kbd>
      </button>

      <div className="flex items-center gap-3">
        <button className="text-mgi-label hover:text-white transition-colors text-base" title="Camera">
          📷
        </button>
        <button className="relative text-mgi-label hover:text-white transition-colors text-base" title="Notifications">
          🔔
          <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-red-500 text-[8px] font-bold text-white">
            3
          </span>
        </button>
        <button className="flex items-center gap-1.5 rounded-md bg-white px-3 py-1.5 text-xs font-semibold text-black hover:bg-gray-100 transition-colors">
          + New
        </button>
      </div>
    </header>
  )
}
