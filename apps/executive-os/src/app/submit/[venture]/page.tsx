'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import { VENTURES, VENTURE_TYPES, VENTURE_URGENCY } from '@/lib/ventures'

export default function SubmitReportPage() {
  const params = useParams()
  const venture = params.venture as string
  const ventureConfig = VENTURES[venture]

  const [form, setForm] = useState({
    type: 'report',
    urgency: 'normal',
    title: '',
    body: '',
    submittedBy: '',
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  if (!ventureConfig) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f1f1f1' }}>
        <p style={{ fontFamily: 'system-ui', color: '#666', fontSize: '1rem' }}>
          Invalid venture link. Please contact the CEO for the correct URL.
        </p>
      </div>
    )
  }

  const accent = ventureConfig.color

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch('/api/venture-report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ venture, ...form }),
      })
      if (res.ok) {
        setStatus('success')
        setForm({ type: 'report', urgency: 'normal', title: '', body: '', submittedBy: '' })
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f1f1f1', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <div style={{ background: '#fff', borderRadius: '16px', padding: '48px 40px', width: '100%', maxWidth: '560px', boxShadow: '0 8px 40px rgba(0,0,0,0.08)' }}>

        {/* Header */}
        <div style={{ marginBottom: '32px' }}>
          <div style={{ width: '40px', height: '6px', background: accent, borderRadius: '2px', marginBottom: '16px' }} />
          <h1 style={{ fontWeight: 800, fontSize: '1.4rem', color: '#111', margin: '0 0 6px', lineHeight: 1.2 }}>
            {ventureConfig.name}
          </h1>
          <p style={{ color: '#666', fontSize: '0.9rem', margin: 0 }}>
            Submit a report, update, or request to the CEO
          </p>
        </div>

        {status === 'success' ? (
          <div style={{ textAlign: 'center', padding: '40px 0' }}>
            <div style={{ fontSize: '3rem', marginBottom: '16px' }}>✅</div>
            <h2 style={{ fontWeight: 700, color: '#111', marginBottom: '8px', fontSize: '1.2rem' }}>Submitted</h2>
            <p style={{ color: '#666', fontSize: '0.9rem', marginBottom: '24px' }}>
              Your submission has been sent to the CEO.
            </p>
            <button
              onClick={() => setStatus('idle')}
              style={{ background: accent, color: '#fff', border: 'none', padding: '12px 28px', borderRadius: '8px', fontWeight: 700, cursor: 'pointer', fontSize: '0.95rem' }}
            >
              Submit Another
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>

            {/* Name */}
            <div>
              <label style={{ display: 'block', fontWeight: 600, fontSize: '0.85rem', color: '#333', marginBottom: '6px' }}>
                Your Name *
              </label>
              <input
                required
                type="text"
                placeholder="e.g. Jean-Pierre Mbarga"
                value={form.submittedBy}
                onChange={e => setForm(f => ({ ...f, submittedBy: e.target.value }))}
                style={{ width: '100%', padding: '12px 14px', borderRadius: '8px', border: '1.5px solid #e0e0e0', fontSize: '0.95rem', boxSizing: 'border-box', outline: 'none' }}
              />
            </div>

            {/* Type */}
            <div>
              <label style={{ display: 'block', fontWeight: 600, fontSize: '0.85rem', color: '#333', marginBottom: '6px' }}>
                Type *
              </label>
              <select
                value={form.type}
                onChange={e => setForm(f => ({ ...f, type: e.target.value }))}
                style={{ width: '100%', padding: '12px 14px', borderRadius: '8px', border: '1.5px solid #e0e0e0', fontSize: '0.95rem', background: '#fff', boxSizing: 'border-box' }}
              >
                {VENTURE_TYPES.map(t => (
                  <option key={t.value} value={t.value}>{t.label}</option>
                ))}
              </select>
            </div>

            {/* Urgency */}
            <div>
              <label style={{ display: 'block', fontWeight: 600, fontSize: '0.85rem', color: '#333', marginBottom: '8px' }}>
                Urgency *
              </label>
              <div style={{ display: 'flex', gap: '10px' }}>
                {VENTURE_URGENCY.map(u => (
                  <button
                    key={u.value}
                    type="button"
                    onClick={() => setForm(f => ({ ...f, urgency: u.value }))}
                    style={{
                      flex: 1,
                      padding: '10px 8px',
                      borderRadius: '8px',
                      border: form.urgency === u.value ? `2px solid ${u.color}` : '1.5px solid #e0e0e0',
                      background: form.urgency === u.value ? `${u.color}18` : '#fff',
                      color: form.urgency === u.value ? u.color : '#666',
                      fontWeight: 600,
                      fontSize: '0.82rem',
                      cursor: 'pointer',
                      transition: 'all 0.15s',
                    }}
                  >
                    {u.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Title */}
            <div>
              <label style={{ display: 'block', fontWeight: 600, fontSize: '0.85rem', color: '#333', marginBottom: '6px' }}>
                Title *
              </label>
              <input
                required
                type="text"
                placeholder="Brief subject line"
                value={form.title}
                onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                style={{ width: '100%', padding: '12px 14px', borderRadius: '8px', border: '1.5px solid #e0e0e0', fontSize: '0.95rem', boxSizing: 'border-box', outline: 'none' }}
              />
            </div>

            {/* Body */}
            <div>
              <label style={{ display: 'block', fontWeight: 600, fontSize: '0.85rem', color: '#333', marginBottom: '6px' }}>
                Details *
              </label>
              <textarea
                required
                rows={5}
                placeholder="Describe the situation, what happened, what decision is needed, or what you are reporting..."
                value={form.body}
                onChange={e => setForm(f => ({ ...f, body: e.target.value }))}
                style={{ width: '100%', padding: '12px 14px', borderRadius: '8px', border: '1.5px solid #e0e0e0', fontSize: '0.95rem', resize: 'vertical', boxSizing: 'border-box', outline: 'none' }}
              />
            </div>

            {status === 'error' && (
              <p style={{ color: '#dc2626', fontSize: '0.85rem', margin: 0 }}>
                Submission failed. Please try again or contact the CEO directly on WhatsApp.
              </p>
            )}

            <button
              type="submit"
              disabled={status === 'loading'}
              style={{
                background: accent,
                color: '#fff',
                border: 'none',
                padding: '16px',
                borderRadius: '8px',
                fontWeight: 700,
                fontSize: '1rem',
                cursor: status === 'loading' ? 'not-allowed' : 'pointer',
                opacity: status === 'loading' ? 0.7 : 1,
                transition: 'opacity 0.2s',
              }}
            >
              {status === 'loading' ? 'Submitting...' : 'Submit to CEO →'}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
