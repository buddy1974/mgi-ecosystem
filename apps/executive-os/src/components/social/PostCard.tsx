'use client'

import type { SocialPost } from '@mgi/database'
import { format } from 'date-fns'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { PLATFORM_LABELS, COMPANY_NAMES } from '@/lib/social-config'

const STATUS_STYLES: Record<string, string> = {
  DRAFT:     'bg-slate-800/60 text-slate-400 border-slate-700',
  SCHEDULED: 'bg-blue-900/40 text-blue-300 border-blue-800',
  PUBLISHED: 'bg-emerald-900/40 text-emerald-300 border-emerald-800',
  FAILED:    'bg-red-900/40 text-red-400 border-red-800',
}

const COMPANY_COLORS: Record<string, string> = {
  nmi: '#1D4ED8', horeb: '#0a8348', lq: '#393186', dros: '#023F78', rogers: '#3a0ca3', mgi: '#92400E',
}

interface Props { post: SocialPost }

export function PostCard({ post }: Props) {
  const router = useRouter()
  const [deleting, setDeleting] = useState(false)

  async function handleDelete() {
    if (!confirm('Delete this post?')) return
    setDeleting(true)
    try {
      await fetch(`/api/social/posts/${post.id}`, { method: 'DELETE' })
      router.refresh()
    } finally {
      setDeleting(false)
    }
  }

  return (
    <div
      className="rounded-xl bg-[#111827] border border-[#1F2D40] p-4 hover:border-[#2D4A6A] transition-colors"
      style={post.companyId ? { borderLeftColor: COMPANY_COLORS[post.companyId], borderLeftWidth: 3 } : {}}
    >
      <div className="flex items-start justify-between gap-3 mb-2">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-[10px] font-semibold px-2 py-0.5 rounded" style={{ backgroundColor: `${COMPANY_COLORS[post.companyId]}22`, color: COMPANY_COLORS[post.companyId] ?? '#64748B' }}>
            {COMPANY_NAMES[post.companyId] ?? post.companyId}
          </span>
          <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-[#1E293B] text-[#64748B]">
            {PLATFORM_LABELS[post.platform] ?? post.platform}
          </span>
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${STATUS_STYLES[post.status] ?? STATUS_STYLES.DRAFT}`}>
            {post.status}
          </span>
        </div>
        <button onClick={handleDelete} disabled={deleting} className="text-[#475569] hover:text-red-400 text-xs transition-colors flex-shrink-0">
          {deleting ? '...' : '✕'}
        </button>
      </div>
      <p className="text-[#CBD5E1] text-sm leading-relaxed mb-2 line-clamp-3">{post.content}</p>
      <div className="text-[10px] text-[#475569]">
        {post.status === 'SCHEDULED' && post.scheduledAt && <span>Scheduled: {format(new Date(post.scheduledAt), 'MMM d, HH:mm')}</span>}
        {post.status === 'PUBLISHED' && post.publishedAt && <span>Published: {format(new Date(post.publishedAt), 'MMM d, HH:mm')}</span>}
        {post.status === 'DRAFT' && <span>Draft · Created {format(new Date(post.createdAt), 'MMM d')}</span>}
      </div>
    </div>
  )
}
