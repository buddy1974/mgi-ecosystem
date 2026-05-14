'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'
import { mockPriorities, mockDecisions, type Priority, type Decision } from './data'

const ENTITY_COLORS: Record<string, string> = {
  MGI:       '#D4AF37',
  Rogers:    '#f72585',
  Horeb:     '#0a8348',
  NMI:       '#3B82F6',
  LQ:        '#9c99e0',
  DROS:      '#3a8fd4',
  Drimp:     '#FC9D02',
  'Abba Land': '#c8a96e',
}

function EntityTag({ entity }: { entity: string }) {
  const color = ENTITY_COLORS[entity] ?? '#94A3B8'
  return (
    <span
      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-badge text-[10px] font-semibold tracking-wider border"
      style={{ color, borderColor: `${color}40`, background: `${color}12` }}
    >
      {entity}
    </span>
  )
}

function StatusDot({ status }: { status: Priority['status'] }) {
  const cls =
    status === 'active'   ? 'bg-status-active' :
    status === 'watching' ? 'bg-status-attention' :
                            'bg-mgi-dim'
  const label =
    status === 'active'   ? 'Active' :
    status === 'watching' ? 'Watching' :
                            'Pending'
  return (
    <span className="flex items-center gap-1.5 text-xs text-mgi-muted">
      <span className={`w-1.5 h-1.5 rounded-full ${cls}`} />
      {label}
    </span>
  )
}

function InlineEditTitle({
  value, onChange,
}: { value: string; onChange: (v: string) => void }) {
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState(value)
  const inputRef = useRef<HTMLInputElement>(null)

  const startEdit = () => {
    setDraft(value)
    setEditing(true)
    setTimeout(() => inputRef.current?.focus(), 0)
  }
  const commit = () => {
    onChange(draft.trim() || value)
    setEditing(false)
  }

  if (editing) {
    return (
      <input
        ref={inputRef}
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onBlur={commit}
        onKeyDown={(e) => { if (e.key === 'Enter') commit(); if (e.key === 'Escape') setEditing(false) }}
        className="w-full bg-mgi-input border border-mgi-border rounded px-2 py-0.5 text-base font-semibold text-white outline-none focus:border-rogers-violet"
      />
    )
  }
  return (
    <button
      onClick={startEdit}
      className="text-left text-base font-semibold text-white hover:text-white/80 transition-colors cursor-text group"
      title="Click to edit"
    >
      {value}
      <span className="ml-1.5 opacity-0 group-hover:opacity-40 text-xs text-mgi-muted transition-opacity">edit</span>
    </button>
  )
}

function PriorityCard({
  priority,
  onUpdate,
  onRemove,
}: {
  priority: Priority
  onUpdate: (p: Priority) => void
  onRemove: (id: string) => void
}) {
  return (
    <div className={`bg-mgi-card rounded-card border transition-colors ${
      priority.urgent ? 'border-l-2 border-l-status-risk border-mgi-border' : 'border-mgi-border'
    }`}>
      <div className="p-4">
        {/* Top row */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-2 flex-wrap">
            <EntityTag entity={priority.entity} />
            {priority.deadline && (
              <span className="text-[10px] text-mgi-muted tracking-wide">{priority.deadline}</span>
            )}
          </div>
          <div className="flex items-center gap-2 shrink-0">
            {priority.urgent && (
              <button
                onClick={() => onUpdate({ ...priority, urgent: false })}
                className="flex items-center gap-1 px-2 py-0.5 rounded-badge text-[10px] font-bold bg-status-risk-bg text-status-risk border border-status-risk/30 hover:opacity-80 transition-opacity"
                title="Click to remove urgent flag"
              >
                🔴 URGENT
              </button>
            )}
            {!priority.urgent && (
              <button
                onClick={() => onUpdate({ ...priority, urgent: true })}
                className="text-[10px] text-mgi-label hover:text-status-risk transition-colors px-1.5"
                title="Flag as urgent"
              >
                ⚑
              </button>
            )}
          </div>
        </div>

        {/* Title */}
        <InlineEditTitle
          value={priority.title}
          onChange={(title) => onUpdate({ ...priority, title })}
        />

        {/* Description */}
        <p className="mt-1.5 text-sm text-mgi-muted leading-relaxed line-clamp-2">
          {priority.description}
        </p>

        {/* Bottom row */}
        <div className="flex items-center justify-between mt-4">
          <StatusDot status={priority.status} />
          <div className="flex items-center gap-2">
            <button
              onClick={() => onUpdate({
                ...priority,
                status: priority.status === 'active' ? 'watching' : 'active'
              })}
              className="text-xs text-mgi-muted hover:text-white transition-colors px-2 py-1 rounded hover:bg-white/5"
            >
              {priority.status === 'active' ? '→ Watching' : '→ Active'}
            </button>
            <button
              onClick={() => onRemove(priority.id)}
              className="text-xs text-mgi-label hover:text-status-risk transition-colors px-2 py-1 rounded hover:bg-status-risk-bg"
            >
              Done ✓
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function DecisionRow({ decision }: { decision: Decision }) {
  const color = ENTITY_COLORS[decision.entity] ?? '#94A3B8'
  return (
    <div className="grid grid-cols-[1fr_80px_2fr_60px] gap-4 px-4 py-3 items-start border-b border-mgi-border last:border-0 hover:bg-mgi-card-hover/40 transition-colors">
      <p className="text-sm font-medium text-white leading-snug">{decision.title}</p>
      <span
        className="text-[10px] font-semibold px-2 py-0.5 rounded-badge border self-start"
        style={{ color, borderColor: `${color}40`, background: `${color}12` }}
      >
        {decision.entity}
      </span>
      <p className="text-xs text-mgi-muted leading-relaxed line-clamp-2">{decision.context}</p>
      <span className="text-xs text-mgi-dim tabular-nums self-start">
        {decision.daysOpen}d open
      </span>
    </div>
  )
}

export default function PriorityTrackerPage() {
  const [priorities, setPriorities] = useState<Priority[]>(mockPriorities)
  const [decisions] = useState<Decision[]>(mockDecisions)

  const update = (p: Priority) =>
    setPriorities((prev) => prev.map((x) => (x.id === p.id ? p : x)))
  const remove = (id: string) =>
    setPriorities((prev) => prev.filter((x) => x.id !== id))

  const urgent = priorities.filter((p) => p.urgent)
  const top = priorities.filter((p) => !p.urgent)

  return (
    <div className="flex flex-col gap-6 p-6 max-w-5xl">

      {/* Page header */}
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Priority Tracker</h1>
          <p className="text-sm text-mgi-muted mt-0.5">
            CEO command view — focus areas, flags, and open decisions
          </p>
        </div>
        <Link
          href="/dashboard"
          className="text-xs text-mgi-muted hover:text-white transition-colors px-3 py-1.5 rounded border border-mgi-border hover:border-mgi-dim"
        >
          ← Dashboard
        </Link>
      </div>

      {/* ── TOP PRIORITIES ── */}
      <section>
        <div className="flex items-center gap-3 mb-3">
          <p className="text-[11px] uppercase tracking-widest font-semibold text-mgi-label">
            Top Priorities
          </p>
          <span className="bg-mgi-card border border-mgi-border text-mgi-muted text-[10px] px-1.5 py-0.5 rounded-badge font-medium">
            {top.length}
          </span>
        </div>
        {top.length === 0 ? (
          <div className="bg-mgi-card rounded-card border border-mgi-border px-4 py-6 text-center text-sm text-mgi-muted">
            No active priorities — all clear.
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {top.map((p) => (
              <PriorityCard key={p.id} priority={p} onUpdate={update} onRemove={remove} />
            ))}
          </div>
        )}
      </section>

      {/* ── URGENT FLAGS ── */}
      <section>
        <div className="flex items-center gap-3 mb-3">
          <p className="text-[11px] uppercase tracking-widest font-semibold text-mgi-label">
            Urgent Flags
          </p>
          {urgent.length > 0 && (
            <span className="bg-status-risk-bg text-status-risk text-[10px] font-bold px-1.5 py-0.5 rounded-badge">
              {urgent.length}
            </span>
          )}
        </div>
        {urgent.length === 0 ? (
          <div className="bg-mgi-card rounded-card border border-mgi-border px-4 py-6 text-center text-sm text-mgi-muted">
            No urgent flags. Good.
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {urgent.map((p) => (
              <PriorityCard key={p.id} priority={p} onUpdate={update} onRemove={remove} />
            ))}
          </div>
        )}
      </section>

      {/* ── ACTIVE DECISIONS ── */}
      <section>
        <div className="flex items-center gap-3 mb-3">
          <p className="text-[11px] uppercase tracking-widest font-semibold text-mgi-label">
            Active Decisions
          </p>
          <span className="bg-mgi-card border border-mgi-border text-mgi-muted text-[10px] px-1.5 py-0.5 rounded-badge font-medium">
            {decisions.length}
          </span>
        </div>
        <div className="bg-mgi-card rounded-card border border-mgi-border overflow-hidden">
          <div className="grid grid-cols-[1fr_80px_2fr_60px] gap-4 px-4 py-2 border-b border-mgi-border">
            {['Decision', 'Entity', 'Context', 'Open'].map((h) => (
              <p key={h} className="text-[10px] uppercase tracking-widest font-semibold text-mgi-label">{h}</p>
            ))}
          </div>
          {decisions.map((d) => <DecisionRow key={d.id} decision={d} />)}
        </div>
      </section>

    </div>
  )
}
