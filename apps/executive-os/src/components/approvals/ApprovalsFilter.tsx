'use client'

import { useRouter, useSearchParams } from 'next/navigation'

const CATEGORIES = ['ALL', 'FINANCE', 'PROCUREMENT', 'HIRING', 'MARKETING', 'OPERATIONS', 'LEGAL'] as const

export function ApprovalsFilter() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const active = searchParams.get('category') ?? 'ALL'

  const setCategory = (cat: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (cat === 'ALL') {
      params.delete('category')
    } else {
      params.set('category', cat)
    }
    router.push(`/approvals?${params.toString()}`)
  }

  return (
    <div className="flex items-center gap-1 flex-wrap">
      {CATEGORIES.map(cat => (
        <button
          key={cat}
          onClick={() => setCategory(cat)}
          className={`px-3 py-1 rounded text-[11px] font-medium transition-colors ${
            active === cat ? 'bg-white text-black' : 'text-mgi-muted hover:text-white'
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  )
}
