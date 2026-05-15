'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

const serif = "Georgia, 'Times New Roman', serif"
const hl    = "var(--font-headline, 'Nunito', system-ui, sans-serif)"

export default function RegisteredPage() {
  const [reference, setReference] = useState<string | null>(null)

  useEffect(() => {
    const ref = sessionStorage.getItem('rogers_registration_ref')
    if (ref) setReference(ref)
  }, [])

  return (
    <main style={{
      minHeight: '100vh',
      background: 'linear-gradient(160deg, #0d0120 0%, #1a0533 60%, #0d0120 100%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '80px 24px',
    }}>

      {/* Check mark */}
      <div style={{
        width: 72, height: 72,
        borderRadius: '50%',
        border: '2px solid rgba(247,37,133,0.6)',
        background: 'rgba(247,37,133,0.08)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 32, color: '#f72585',
        marginBottom: 40,
        boxShadow: '0 0 40px rgba(247,37,133,0.2)',
      }}>
        ✓
      </div>

      {/* Eyebrow */}
      <p style={{
        color: '#f72585',
        fontSize: 11,
        letterSpacing: '0.4em',
        textTransform: 'uppercase',
        fontWeight: 700,
        marginBottom: 20,
        fontFamily: hl,
      }}>
        Your Seat Is Reserved
      </p>

      {/* Headline */}
      <h1 style={{
        fontFamily: serif,
        color: '#ffffff',
        fontSize: 'clamp(2rem, 5vw, 3.2rem)',
        fontWeight: 400,
        letterSpacing: '0.02em',
        textAlign: 'center',
        maxWidth: 580,
        lineHeight: 1.25,
        marginBottom: 24,
      }}>
        Welcome to the journey.
      </h1>

      {/* Sub-copy */}
      <p style={{
        color: 'rgba(255,255,255,0.60)',
        fontSize: 17,
        lineHeight: 1.75,
        textAlign: 'center',
        maxWidth: 500,
        marginBottom: 48,
        fontFamily: hl,
      }}>
        Your registration is confirmed. Complete your payment to secure your place — seats are strictly limited and fill fast.
      </p>

      {/* Reference badge */}
      {reference && (
        <div style={{
          background: 'rgba(255,255,255,0.06)',
          border: '1px solid rgba(255,255,255,0.14)',
          borderRadius: 12,
          padding: '20px 40px',
          marginBottom: 48,
          textAlign: 'center',
        }}>
          <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase', margin: '0 0 8px', fontFamily: hl }}>
            Reference Number
          </p>
          <p style={{ color: '#ffffff', fontFamily: 'monospace', fontSize: 20, fontWeight: 700, margin: 0, letterSpacing: '0.12em' }}>
            {reference}
          </p>
        </div>
      )}

      {/* Payment instructions */}
      <div style={{
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.10)',
        borderRadius: 16,
        padding: '36px 40px',
        maxWidth: 520,
        width: '100%',
        marginBottom: 48,
      }}>
        <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: 11, letterSpacing: '0.3em', textTransform: 'uppercase', margin: '0 0 20px', fontFamily: hl }}>
          Payment Instructions
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div>
            <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: 12, margin: '0 0 4px', fontFamily: hl }}>MTN Mobile Money</p>
            <p style={{ color: '#ffffff', fontFamily: 'monospace', fontSize: 14, margin: 0, letterSpacing: '0.05em' }}>
              *126*4*926667*AMOUNT#
            </p>
          </div>
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: 14 }}>
            <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: 12, margin: '0 0 4px', fontFamily: hl }}>Orange Money</p>
            <p style={{ color: '#ffffff', fontFamily: 'monospace', fontSize: 14, margin: 0, letterSpacing: '0.05em' }}>
              #150*47*890422*AMOUNT#
            </p>
          </div>
          {reference && (
            <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: 14 }}>
              <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: 12, margin: '0 0 4px', fontFamily: hl }}>
                Include your reference in all messages
              </p>
              <p style={{ color: '#f72585', fontFamily: 'monospace', fontSize: 14, margin: 0, fontWeight: 700 }}>
                {reference}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* WhatsApp CTA — primary action */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
        <a
          href={`https://wa.me/237683493220?text=${encodeURIComponent(`Hello, I just registered for a Rogers Nforgwei program.${reference ? ` My reference is ${reference}.` : ''} Here is my payment proof.`)}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 10,
            background: 'linear-gradient(135deg, #f72585, #7209b7)',
            color: '#ffffff',
            padding: '16px 40px',
            borderRadius: '999px',
            fontFamily: hl,
            fontWeight: 700,
            fontSize: '1rem',
            textDecoration: 'none',
            boxShadow: '0 8px 32px rgba(247,37,133,0.40)',
            letterSpacing: '0.02em',
          }}
        >
          Send Payment Proof on WhatsApp →
        </a>

        <Link
          href="/programs/dominion-life"
          style={{
            color: 'rgba(255,255,255,0.40)',
            fontFamily: hl,
            fontSize: 13,
            textDecoration: 'none',
            letterSpacing: '0.02em',
          }}
        >
          ← Back to Programs
        </Link>
      </div>
    </main>
  )
}
