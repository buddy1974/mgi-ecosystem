'use client'

import { useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { formatDistanceToNow } from 'date-fns'
import type { VentureReport } from '@mgi/database'

const URGENCY_COLORS: Record<string, string> = {
  normal:   '#6b7280',
  urgent:   '#d97706',
  critical: '#dc2626',
}

const TYPE_COLORS: Record<string, { bg: string; text: string }> = {
  report:           { bg: '#1e3a5f', text: '#60a5fa' },
  incident:         { bg: '#450a0a', text: '#f87171' },
  update:           { bg: '#064e3b', text: '#34d399' },
  approval_request: { bg: '#3b0764', text: '#c084fc' },
}

const TYPE_LABELS: Record<string, string> = {
  report:           'Report',
  incident:         'Incident',
  update:           'Update',
  approval_request: 'Approval',
}

const STATUS_LABELS: Record<string, string> = {
  new:          'New',
  acknowledged: 'Acknowledged',
  in_review:    'In Review',
  resolved:     'Resolved',
}

function UrgencyDot({ urgency }: { urgency: string }) {
  const color = URGENCY_COLORS[urgency] ?? '#6b7280'
  return (
    <span
      style={{
        display: 'inline-block',
        width: '8px',
        height: '8px',
        borderRadius: '50%',
        background: color,
        flexShrink: 0,
        ...(urgency === 'critical' ? { animation: 'pulse 1.5s infinite' } : {}),
      }}
    />
  )
}

interface Props {
  reports: VentureReport[]
}

export default function OperationsClient({ reports }: Props) {
  const router = useRouter()
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [filterStatus, setFilterStatus] = useState<'all' | 'new' | 'urgent' | 'critical'>('all')
  const [filterVenture, setFilterVenture] = useState<string>('all')
  const [reply, setReply] = useState('')
  const [replyLoading, setReplyLoading] = useState(false)
  const [replySuccess, setReplySuccess] = useState(false)
  const [statusLoading, setStatusLoading] = useState(false)

  const selected = reports.find(r => r.id === selectedId) ?? null

  // Derived stats
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const stats = useMemo(() => ({
    newCount:         reports.filter(r => r.status === 'new').length,
    urgentCount:      reports.filter(r => r.urgency === 'urgent' || r.urgency === 'critical').length,
    pendingCount:     reports.filter(r => r.status !== 'resolved').length,
    resolvedToday:    reports.filter(r => r.resolvedAt && new Date(r.resolvedAt) >= today).length,
  }), [reports]) // eslint-disable-line react-hooks/exhaustive-deps

  // Unique ventures for filter dropdown
  const ventures = useMemo(() => {
    const seen = new Set<string>()
    const result: { venture: string; ventureName: string }[] = []
    for (const r of reports) {
      if (!seen.has(r.venture)) {
        seen.add(r.venture)
        result.push({ venture: r.venture, ventureName: r.ventureName })
      }
    }
    return result.sort((a, b) => a.ventureName.localeCompare(b.ventureName))
  }, [reports])

  const filtered = useMemo(() => reports.filter(r => {
    if (filterVenture !== 'all' && r.venture !== filterVenture) return false
    if (filterStatus === 'new' && r.status !== 'new') return false
    if (filterStatus === 'urgent' && r.urgency !== 'urgent') return false
    if (filterStatus === 'critical' && r.urgency !== 'critical') return false
    return true
  }), [reports, filterStatus, filterVenture])

  async function handleReply() {
    if (!selected || !reply.trim()) return
    setReplyLoading(true)
    try {
      const res = await fetch('/api/venture-reply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: selected.id, reply }),
      })
      if (res.ok) {
        setReply('')
        setReplySuccess(true)
        setTimeout(() => setReplySuccess(false), 3000)
        router.refresh()
      }
    } finally {
      setReplyLoading(false)
    }
  }

  async function handleStatusChange(newStatus: string) {
    if (!selected) return
    setStatusLoading(true)
    try {
      await fetch(`/api/venture-report/${selected.id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      })
      router.refresh()
    } finally {
      setStatusLoading(false)
    }
  }

  return (
    <>
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>

      <div className="flex flex-col h-full overflow-hidden">
        {/* ── Header ── */}
        <div className="px-6 py-4 border-b border-mgi-border flex-shrink-0">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <h1 className="text-2xl font-light text-white">Operations Bridge</h1>
              <p className="text-mgi-label text-[11px] uppercase tracking-widest mt-1 font-mono">
                {stats.newCount} NEW · {stats.urgentCount} URGENT · {stats.pendingCount} PENDING · {stats.resolvedToday} RESOLVED TODAY
              </p>
            </div>
            <div className="flex gap-2 flex-wrap">
              {/* Status filter */}
              {(['all', 'new', 'urgent', 'critical'] as const).map(f => (
                <button
                  key={f}
                  onClick={() => setFilterStatus(f)}
                  className={`px-3 py-1.5 text-xs rounded border transition-colors ${
                    filterStatus === f
                      ? 'border-white/40 text-white bg-white/10'
                      : 'border-mgi-border text-mgi-muted hover:text-white hover:border-white/20'
                  }`}
                >
                  {f === 'all' ? 'All' : f.charAt(0).toUpperCase() + f.slice(1)}
                </button>
              ))}
              {/* Venture filter */}
              <select
                value={filterVenture}
                onChange={e => setFilterVenture(e.target.value)}
                className="px-3 py-1.5 text-xs rounded border border-mgi-border text-mgi-muted bg-mgi-input hover:text-white transition-colors"
              >
                <option value="all">All Ventures</option>
                {ventures.map(v => (
                  <option key={v.venture} value={v.venture}>{v.ventureName}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* ── Stats Bar ── */}
        <div className="grid grid-cols-4 border-b border-mgi-border flex-shrink-0">
          {[
            { label: 'New',            value: stats.newCount,      color: '#60a5fa' },
            { label: 'Urgent',         value: stats.urgentCount,   color: '#f59e0b' },
            { label: 'Pending',        value: stats.pendingCount,  color: '#94a3b8' },
            { label: 'Resolved Today', value: stats.resolvedToday, color: '#34d399' },
          ].map(s => (
            <div key={s.label} className="px-6 py-3 border-r border-mgi-border last:border-r-0">
              <p className="text-2xl font-bold" style={{ color: s.color }}>{s.value}</p>
              <p className="text-mgi-label text-[10px] uppercase tracking-wider mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>

        {/* ── Body: list + drawer ── */}
        <div className="flex flex-1 overflow-hidden">
          {/* Report List */}
          <div className={`flex-1 overflow-y-auto ${selected ? 'border-r border-mgi-border' : ''}`}>
            {filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-48 text-mgi-muted text-sm">
                <span className="text-2xl mb-2">📭</span>
                No reports match this filter
              </div>
            ) : (
              <div className="divide-y divide-mgi-border">
                {filtered.map(r => {
                  const typeStyle = TYPE_COLORS[r.type] ?? TYPE_COLORS.report
                  const isActive = r.id === selectedId
                  return (
                    <button
                      key={r.id}
                      onClick={() => setSelectedId(isActive ? null : r.id)}
                      className={`w-full text-left px-6 py-4 transition-colors ${
                        isActive ? 'bg-white/5' : 'hover:bg-white/[0.03]'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="flex items-center gap-2 mt-1 flex-shrink-0">
                          <UrgencyDot urgency={r.urgency} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap mb-1">
                            <span
                              className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded"
                              style={{ background: typeStyle.bg, color: typeStyle.text }}
                            >
                              {TYPE_LABELS[r.type] ?? r.type}
                            </span>
                            <span className="text-xs px-2 py-0.5 rounded bg-white/5 text-mgi-muted border border-mgi-border">
                              {r.ventureName}
                            </span>
                            {r.status !== 'new' && (
                              <span className="text-[10px] text-mgi-label">
                                {STATUS_LABELS[r.status] ?? r.status}
                              </span>
                            )}
                          </div>
                          <p className="text-sm font-medium text-white truncate mb-0.5">{r.title}</p>
                          <p className="text-xs text-mgi-muted truncate">{r.body.slice(0, 80)}{r.body.length > 80 ? '…' : ''}</p>
                        </div>
                        <div className="text-right flex-shrink-0 ml-2">
                          <p className="text-[11px] text-mgi-label whitespace-nowrap">
                            {formatDistanceToNow(new Date(r.createdAt), { addSuffix: true })}
                          </p>
                          <p className="text-[11px] text-mgi-dim mt-0.5">{r.submittedBy}</p>
                        </div>
                      </div>
                    </button>
                  )
                })}
              </div>
            )}
          </div>

          {/* Detail Drawer */}
          {selected && (
            <div className="w-[400px] flex-shrink-0 overflow-y-auto flex flex-col">
              {/* Drawer header */}
              <div className="px-5 py-4 border-b border-mgi-border flex-shrink-0">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                      <UrgencyDot urgency={selected.urgency} />
                      <span
                        className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded"
                        style={{
                          background: (TYPE_COLORS[selected.type] ?? TYPE_COLORS.report).bg,
                          color: (TYPE_COLORS[selected.type] ?? TYPE_COLORS.report).text,
                        }}
                      >
                        {TYPE_LABELS[selected.type] ?? selected.type}
                      </span>
                      <span className="text-[10px] text-mgi-label uppercase tracking-wider">
                        {selected.urgency}
                      </span>
                    </div>
                    <h2 className="text-base font-semibold text-white leading-tight">{selected.title}</h2>
                  </div>
                  <button
                    onClick={() => setSelectedId(null)}
                    className="text-mgi-label hover:text-white transition-colors text-lg flex-shrink-0"
                  >
                    ✕
                  </button>
                </div>

                {/* Meta */}
                <div className="mt-3 space-y-1">
                  <p className="text-[11px] text-mgi-label">
                    <span className="text-mgi-dim">Venture: </span>{selected.ventureName}
                  </p>
                  <p className="text-[11px] text-mgi-label">
                    <span className="text-mgi-dim">From: </span>{selected.submittedBy}
                  </p>
                  <p className="text-[11px] text-mgi-label">
                    <span className="text-mgi-dim">Via: </span>{selected.submittedVia}
                    <span className="ml-3 text-mgi-dim">Received: </span>
                    {formatDistanceToNow(new Date(selected.createdAt), { addSuffix: true })}
                  </p>
                </div>
              </div>

              {/* Body */}
              <div className="px-5 py-4 border-b border-mgi-border flex-shrink-0">
                <p className="text-xs text-mgi-label uppercase tracking-wider mb-2">Details</p>
                <p className="text-sm text-white/80 leading-relaxed whitespace-pre-wrap">{selected.body}</p>
              </div>

              {/* Status controls */}
              <div className="px-5 py-4 border-b border-mgi-border flex-shrink-0">
                <p className="text-xs text-mgi-label uppercase tracking-wider mb-2">Status</p>
                <div className="flex gap-2 flex-wrap">
                  {(['new', 'acknowledged', 'in_review', 'resolved'] as const).map(s => (
                    <button
                      key={s}
                      onClick={() => handleStatusChange(s)}
                      disabled={statusLoading || selected.status === s}
                      className={`px-2.5 py-1 text-[11px] rounded border transition-colors disabled:opacity-40 ${
                        selected.status === s
                          ? 'border-white/40 text-white bg-white/10'
                          : 'border-mgi-border text-mgi-muted hover:text-white hover:border-white/20'
                      }`}
                    >
                      {STATUS_LABELS[s]}
                    </button>
                  ))}
                </div>
              </div>

              {/* Existing reply */}
              {selected.ceoReply && (
                <div className="px-5 py-4 border-b border-mgi-border flex-shrink-0 bg-white/[0.02]">
                  <p className="text-xs text-mgi-label uppercase tracking-wider mb-2">CEO Reply</p>
                  <p className="text-sm text-white/80 leading-relaxed whitespace-pre-wrap">{selected.ceoReply}</p>
                  {selected.repliedAt && (
                    <p className="text-[10px] text-mgi-dim mt-1.5">
                      {formatDistanceToNow(new Date(selected.repliedAt), { addSuffix: true })}
                    </p>
                  )}
                </div>
              )}

              {/* Reply composer */}
              <div className="px-5 py-4 flex-shrink-0">
                <p className="text-xs text-mgi-label uppercase tracking-wider mb-2">
                  {selected.ceoReply ? 'Update Reply' : 'Reply'}
                </p>
                <textarea
                  rows={4}
                  value={reply}
                  onChange={e => setReply(e.target.value)}
                  placeholder="Type your response... It will be sent to the Operations Telegram group."
                  className="w-full bg-mgi-input border border-mgi-border rounded-md px-3 py-2.5 text-sm text-white placeholder:text-mgi-label resize-none focus:outline-none focus:border-white/30 transition-colors"
                />
                <div className="flex items-center gap-3 mt-2">
                  <button
                    onClick={handleReply}
                    disabled={replyLoading || !reply.trim()}
                    className="px-4 py-2 bg-rogers-violet text-white text-xs font-semibold rounded transition-opacity disabled:opacity-40 hover:opacity-90"
                  >
                    {replyLoading ? 'Sending...' : 'Send Reply →'}
                  </button>
                  {replySuccess && (
                    <span className="text-xs text-emerald-400">✓ Reply sent via Telegram</span>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
