'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { COMPANY_NAMES } from '@/lib/social-config'

const STATUSES = ['ALL', 'DRAFT', 'SCHEDULED', 'PUBLISHED']
const COMPANIES = ['nmi', 'horeb', 'lq', 'dros', 'rogers', 'mgi']

export function PostFilter() {
  const router = useRouter()
  const sp = useSearchParams()

  function update(key: string, value: string) {
    const params = new URLSearchParams(sp.toString())
    if (value === 'ALL') { params.delete(key) } else { params.set(key, value) }
    router.push(`/social?${params.toString()}`)
  }

  const activeStatus = sp.get('status') ?? 'ALL'
  const activeCompany = sp.get('company') ?? 'ALL'

  return (
    <div className="flex flex-wrap gap-2 mb-4">
      <select value={activeCompany} onChange={(e) => update('company', e.target.value)} className="bg-[#111827] border border-[#1F2D40] rounded-lg px-3 py-1.5 text-white text-xs focus:outline-none">
        <option value="ALL">All entities</option>
        {COMPANIES.map((c) => <option key={c} value={c}>{COMPANY_NAMES[c]}</option>)}
      </select>
      <div className="flex gap-1">
        {STATUSES.map((s) => (
          <button key={s} onClick={() => update('status', s)} className={`px-3 py-1.5 rounded-lg text-[10px] font-semibold uppercase tracking-wide transition-colors ${activeStatus === s ? 'bg-[#1E293B] text-white border border-[#334155]' : 'text-[#64748B] hover:text-white'}`}>
            {s === 'ALL' ? 'All' : s.charAt(0) + s.slice(1).toLowerCase()}
          </button>
        ))}
      </div>
    </div>
  )
}
