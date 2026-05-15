'use client'

import { useState } from 'react'
import { PROGRAMS } from '@/lib/programs'

const hl = "var(--font-headline, 'Nunito', system-ui, sans-serif)"

interface Props {
  program: string
  source?: string | null
  label?: string
}

export default function RegisterButton({ program, source, label }: Props) {
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState<string | null>(null)

  const config = PROGRAMS[program]

  const btnLabel = label ?? (
    program === 'dominion-life'  ? 'Reserve My Seat →'       :
    program === 'men-on-duty'    ? 'Join The Brotherhood →'  :
    program === 'ceo-on-mission' ? 'Apply For Mentorship →'  :
    'Register & Pay →'
  )

  async function handleClick() {
    if (!config) return
    setLoading(true)
    setError(null)

    try {
      const regRes = await fetch('/api/registration/create', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ program, source: source ?? null }),
      })
      if (regRes.ok) {
        const data = await regRes.json() as { reference?: string }
        if (data.reference) sessionStorage.setItem('rogers_registration_ref', data.reference)
      }

      const initRes = await fetch('/api/payunit/initiate', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ program, programName: config.name, amount: config.amount }),
      })

      if (initRes.ok) {
        const { checkoutUrl } = await initRes.json() as { checkoutUrl?: string }
        if (checkoutUrl) { window.location.href = checkoutUrl; return }
      }

      window.location.href = config.payunitLink
    } catch {
      window.location.href = config.payunitLink
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <style>{`
        @media (max-width: 768px) {
          .rn-register-btn {
            width: 100% !important;
            max-width: 100% !important;
            justify-content: center !important;
          }
        }
      `}</style>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
        <button
          type="button"
          onClick={handleClick}
          disabled={loading}
          className="rn-register-btn"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
            background: loading
              ? 'rgba(58,12,163,0.4)'
              : 'linear-gradient(135deg, #f72585, #7209b7)',
            color: '#fff',
            border: 'none',
            padding: '16px 40px',
            borderRadius: '999px',
            fontSize: 'clamp(0.95rem, 2.5vw, 1.05rem)',
            fontFamily: hl,
            fontWeight: 700,
            letterSpacing: '0.02em',
            cursor: loading ? 'not-allowed' : 'pointer',
            boxShadow: loading ? 'none' : '0 8px 28px rgba(247,37,133,0.40)',
            minHeight: 52,
            maxWidth: 360,
            boxSizing: 'border-box' as const,
            transition: 'transform 0.2s, box-shadow 0.2s, opacity 0.2s',
            opacity: loading ? 0.6 : 1,
          }}
          onMouseEnter={e => {
            if (!loading) {
              const el = e.currentTarget as HTMLButtonElement
              el.style.transform = 'translateY(-2px)'
              el.style.boxShadow = '0 12px 36px rgba(247,37,133,0.55)'
            }
          }}
          onMouseLeave={e => {
            const el = e.currentTarget as HTMLButtonElement
            el.style.transform = 'translateY(0)'
            el.style.boxShadow = loading ? 'none' : '0 8px 28px rgba(247,37,133,0.40)'
          }}
        >
          {loading ? 'Preparing…' : btnLabel}
        </button>
        {error && <p style={{ color: '#f72585', fontSize: 13, margin: 0, fontFamily: hl }}>{error}</p>}
      </div>
    </>
  )
}
