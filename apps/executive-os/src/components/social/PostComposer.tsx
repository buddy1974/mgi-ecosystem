'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ENTITY_PLATFORMS, PLATFORM_CHAR_LIMITS, PLATFORM_LABELS, COMPANY_NAMES } from '@/lib/social-config'

const COMPANIES = ['nmi', 'horeb', 'lq', 'rogers', 'mgi']

export function PostComposer() {
  const router = useRouter()
  const [companyId, setCompanyId] = useState('nmi')
  const [platform, setPlatform] = useState('FACEBOOK')
  const [content, setContent] = useState('')
  const [scheduledAt, setScheduledAt] = useState('')
  const [loading, setLoading] = useState(false)
  const [saved, setSaved] = useState(false)

  const platforms = ENTITY_PLATFORMS[companyId] ?? []
  const charLimit = PLATFORM_CHAR_LIMITS[platform] ?? 3000
  const remaining = charLimit - content.length

  function handleCompanyChange(c: string) {
    setCompanyId(c)
    const available = ENTITY_PLATFORMS[c] ?? []
    if (!available.includes(platform)) setPlatform(available[0] ?? 'FACEBOOK')
  }

  async function handleSubmit(status: 'DRAFT' | 'SCHEDULED') {
    if (!content.trim()) return
    if (status === 'SCHEDULED' && !scheduledAt) return
    setLoading(true)
    try {
      await fetch('/api/social/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ companyId, platform, content, status, scheduledAt: scheduledAt || undefined }),
      })
      setContent('')
      setScheduledAt('')
      setSaved(true)
      setTimeout(() => setSaved(false), 2000)
      router.refresh()
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="rounded-xl bg-[#111827] border border-[#1F2D40] p-5 mb-6">
      <p className="text-[#64748B] text-xs uppercase tracking-widest font-semibold mb-4">New Post</p>
      <div className="flex gap-3 mb-4">
        <select value={companyId} onChange={(e) => handleCompanyChange(e.target.value)} className="flex-1 bg-[#0C0F1A] border border-[#1F2D40] rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#334155]">
          {COMPANIES.map((c) => <option key={c} value={c}>{COMPANY_NAMES[c]}</option>)}
        </select>
        <select value={platform} onChange={(e) => setPlatform(e.target.value)} className="flex-1 bg-[#0C0F1A] border border-[#1F2D40] rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#334155]">
          {platforms.map((p) => <option key={p} value={p}>{PLATFORM_LABELS[p]}</option>)}
        </select>
      </div>
      <div className="relative mb-3">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder={`Write your ${PLATFORM_LABELS[platform] ?? platform} post...`}
          rows={4}
          className="w-full bg-[#0C0F1A] border border-[#1F2D40] rounded-lg px-3 py-2.5 text-white text-sm placeholder-[#475569] focus:outline-none focus:border-[#334155] resize-none"
          maxLength={charLimit}
        />
        <span className={`absolute bottom-2 right-3 text-[10px] ${remaining < 50 ? 'text-red-400' : 'text-[#475569]'}`}>{remaining}</span>
      </div>
      <div className="flex gap-3 items-center mb-4">
        <input type="datetime-local" value={scheduledAt} onChange={(e) => setScheduledAt(e.target.value)} className="flex-1 bg-[#0C0F1A] border border-[#1F2D40] rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#334155]" />
        <span className="text-[#475569] text-xs">optional schedule time</span>
      </div>
      <div className="flex gap-2">
        <button onClick={() => handleSubmit('DRAFT')} disabled={loading || !content.trim()} className="px-4 py-2 rounded-lg text-xs font-semibold bg-[#1E293B] text-[#94A3B8] border border-[#1F2D40] hover:text-white disabled:opacity-40 transition-colors">
          {saved ? '✓ Saved' : 'Save Draft'}
        </button>
        <button onClick={() => handleSubmit('SCHEDULED')} disabled={loading || !content.trim() || !scheduledAt} className="px-4 py-2 rounded-lg text-xs font-semibold bg-blue-900/40 text-blue-300 border border-blue-800 hover:bg-blue-900/60 disabled:opacity-40 transition-colors">
          Schedule
        </button>
      </div>
    </div>
  )
}
