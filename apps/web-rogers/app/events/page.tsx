'use client'

import { useState } from 'react'
import Link from 'next/link'
import { SquareBars } from '@/components/SquareBars'
import { WaveDivider } from '@/components/WaveDivider'

const hl     = "var(--font-headline, 'Nunito', system-ui, sans-serif)"
const serif  = "Georgia, 'Times New Roman', serif"
const purple = '#3a0ca3'
const pink   = '#f72585'
const sky    = '#4361ee'

// TODO: replace all date/location/price data with confirmed real event details

const UPCOMING_EVENTS = [
  {
    id: 'dominion-life-2026',
    name: "Dominion Life Men's Conference",
    type: 'Conference',
    date: 'October 2026 — Date TBA',      // TODO: real date
    location: 'Douala, Cameroon',          // TODO: real venue
    price: '50,000 XAF',                   // TODO: confirm price
    program: 'dominion-life',
    status: 'registration-opening-soon' as const,
    seatsRemaining: 200,                   // TODO: real number
    color: purple,
    description: 'Three days that reorganize your priorities, your identity, and your direction as a man.',
  },
  {
    id: 'men-on-duty-cohort-2026',
    name: 'Men On Duty — Cohort 4',
    type: 'Cohort',
    date: 'September 2026 — Date TBA',    // TODO: real date
    location: 'Online + Douala',          // TODO: confirm format
    price: '50,000 XAF',                   // TODO: confirm price
    program: 'men-on-duty',
    status: 'registration-opening-soon' as const,
    seatsRemaining: 50,                   // TODO: real number
    color: '#1e3a8a',
    description: 'Six weeks. Six arenas. One framework for a man who owns his responsibilities.',
  },
  {
    id: 'ceo-on-mission-2026',
    name: 'CEO On Mission Intensive',
    type: 'Executive Intensive',
    date: 'Q4 2026 — Date TBA',           // TODO: real date
    location: 'Yaoundé, Cameroon',        // TODO: confirm
    price: '50,000 XAF',                   // TODO: confirm price
    program: 'ceo-on-mission',
    status: 'registration-opening-soon' as const,
    seatsRemaining: 30,                   // TODO: real number
    color: '#312e81',
    description: 'Two days for executives and entrepreneurs who lead from conviction, not just strategy.',
  },
]

const PAST_EVENTS = [
  { name: "Dominion Life Men's Conference 2024", location: 'Douala', stat: '217 men attended' }, // TODO: real number
  { name: 'Men On Duty — Cohort 3',              location: 'Online', stat: '48 men graduated'  }, // TODO: real number
  { name: 'CEO On Mission Intensive 2023',        location: 'Yaoundé', stat: '32 executives'   }, // TODO: real number
]

const STATUS_LABELS: Record<string, string> = {
  'open': 'Registration Open',
  'registration-opening-soon': 'Registration Opening Soon',
  'sold-out': 'Sold Out',
}

export default function EventsPage() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  return (
    <main style={{ background: '#0d0120', fontFamily: hl, paddingTop: 76 }}>
      <style>{`
        @keyframes pulse {
          0%, 100% { box-shadow: 0 0 0 2px rgba(34,197,94,0.3); }
          50%       { box-shadow: 0 0 0 5px rgba(34,197,94,0.1); }
        }
        @media (max-width: 768px) {
          .events-grid { grid-template-columns: 1fr !important; }
          .past-grid   { grid-template-columns: 1fr !important; }
        }
      `}</style>

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section style={{
        background: `linear-gradient(150deg, #0a0120 0%, ${purple} 60%, #1a0a50 100%)`,
        padding: '80px 2rem 72px', textAlign: 'center',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ maxWidth: 720, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }}>
            <SquareBars color={sky} />
          </div>
          <h1 style={{ color: '#ffffff', fontFamily: serif, fontSize: 'clamp(2.2rem, 4.5vw, 3.8rem)', fontWeight: 400, letterSpacing: '0.02em', lineHeight: 1.1, marginBottom: 20 }}>
            Every gathering is a turning point.
          </h1>
          <div style={{ width: 56, height: 2, background: pink, margin: '0 auto 24px', opacity: 0.7 }} />
          <p style={{ color: 'rgba(255,255,255,0.70)', fontSize: 17, lineHeight: 1.8, maxWidth: 580, margin: '0 auto', fontWeight: 300 }}>
            Upcoming conferences, retreats, cohorts, and intensives in the Rogers Nforgwei ecosystem. Reserve your seat before they fill.
          </p>
        </div>
      </section>

      <WaveDivider fromColor={purple} toColor="#f8f7ff" />

      {/* ── UPCOMING EVENTS ──────────────────────────────────────────────── */}
      <section style={{ background: '#f8f7ff', padding: '5rem 2rem' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <SquareBars color={purple} />
            <p style={{ color: purple, fontFamily: hl, fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: 12 }}>Upcoming Events</p>
            <h2 style={{ color: purple, fontFamily: hl, fontSize: 'clamp(2rem, 3.5vw, 2.4rem)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.1, margin: 0 }}>
              The next gathering is forming.
            </h2>
          </div>

          <div className="events-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
            {UPCOMING_EVENTS.map(ev => (
              <div key={ev.id} style={{ background: '#fff', borderRadius: 16, padding: '1.75rem', boxShadow: '0 2px 20px rgba(58,12,163,0.08)', borderTop: `4px solid ${ev.color}`, display: 'flex', flexDirection: 'column', gap: 12 }}>
                {/* Type badge */}
                <span style={{ background: 'rgba(58,12,163,0.07)', color: purple, fontFamily: hl, fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', padding: '4px 10px', borderRadius: 4, alignSelf: 'flex-start' }}>
                  {ev.type}
                </span>

                {/* Name */}
                <h3 style={{ color: purple, fontFamily: hl, fontWeight: 800, fontSize: 17, lineHeight: 1.25, margin: 0 }}>{ev.name}</h3>

                {/* Date + Location */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                  <p style={{ color: '#4a4a6a', fontFamily: hl, fontSize: 13, margin: 0 }}>📅 {ev.date}</p>
                  <p style={{ color: '#4a4a6a', fontFamily: hl, fontSize: 13, margin: 0 }}>📍 {ev.location}</p>
                </div>

                {/* Description */}
                <p style={{ color: '#6b7280', fontSize: 14, lineHeight: 1.75, margin: 0, flex: 1 }}>{ev.description}</p>

                {/* Price + Seats */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span style={{ color: purple, fontFamily: hl, fontWeight: 700, fontSize: 15 }}>{ev.price}</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span style={{ display: 'inline-block', width: 8, height: 8, borderRadius: '50%', background: '#22c55e', boxShadow: '0 0 0 2px rgba(34,197,94,0.3)', animation: 'pulse 2s infinite' }} />
                    <span style={{ color: '#22c55e', fontFamily: hl, fontSize: '0.72rem', fontWeight: 600 }}>{STATUS_LABELS[ev.status]}</span>
                  </span>
                </div>
                <p style={{ color: '#9ca3af', fontFamily: hl, fontSize: 12, margin: 0 }}>{ev.seatsRemaining} seats available</p>

                {/* CTA */}
                <Link href={`/programs/${ev.program}`} style={{ background: pink, color: '#fff', padding: '11px 24px', borderRadius: 8, fontFamily: hl, fontWeight: 700, fontSize: 13, textDecoration: 'none', textAlign: 'center', boxShadow: '0 4px 16px rgba(247,37,133,0.25)' }}>
                  Learn More + Join Waitlist →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <WaveDivider fromColor="#f8f7ff" toColor="#111028" />

      {/* ── PAST EVENTS ──────────────────────────────────────────────────── */}
      <section style={{ background: '#111028', padding: '5rem 2rem' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 44 }}>
            <SquareBars color={sky} />
            <p style={{ color: '#7b90f3', fontFamily: hl, fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: 12 }}>Past Events</p>
            <h2 style={{ color: '#ffffff', fontFamily: hl, fontSize: 'clamp(2rem, 3.5vw, 2.4rem)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.1, margin: 0 }}>
              Where men have gathered before.
            </h2>
          </div>
          {/* TODO: replace with real past event photos and data */}
          <div className="past-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
            {PAST_EVENTS.map(ev => (
              <div key={ev.name} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 16, padding: '2rem', aspectRatio: '4/3', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
                {/* TODO: real event photo as background */}
                <div style={{ width: '100%', flex: 1, background: 'rgba(58,12,163,0.15)', borderRadius: 8, marginBottom: 16, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ color: 'rgba(255,255,255,0.15)', fontFamily: hl, fontSize: 13 }}>Photo coming soon</span>
                </div>
                <p style={{ color: '#ffffff', fontFamily: hl, fontWeight: 700, fontSize: 15, margin: '0 0 4px' }}>{ev.name}</p>
                <p style={{ color: 'rgba(255,255,255,0.45)', fontFamily: hl, fontSize: 13, margin: '0 0 6px' }}>📍 {ev.location}</p>
                <p style={{ color: pink, fontFamily: hl, fontWeight: 600, fontSize: 13, margin: 0 }}>{ev.stat}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <WaveDivider fromColor="#111028" toColor="#ffffff" />

      {/* ── NEVER MISS AN EVENT ───────────────────────────────────────────── */}
      <section style={{ background: '#ffffff', padding: '5rem 2rem' }}>
        <div style={{ maxWidth: 560, margin: '0 auto', textAlign: 'center' }}>
          <SquareBars color={purple} />
          <p style={{ color: purple, fontFamily: hl, fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: 12 }}>Stay Informed</p>
          <h2 style={{ color: purple, fontFamily: hl, fontSize: 'clamp(2rem, 3.5vw, 2.2rem)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: 16 }}>Be the first to know.</h2>
          <p style={{ color: '#4a4a6a', fontSize: 16, lineHeight: 1.8, maxWidth: 440, margin: '0 auto 32px', fontWeight: 300 }}>
            New events and cohorts are announced to the community first. Enter your email to be notified.
          </p>
          {/* TODO Phase 39: wire to n8n + email system */}
          {submitted ? (
            <div style={{ background: purple, borderRadius: 16, padding: '2rem' }}>
              <p style={{ color: '#ffffff', fontFamily: hl, fontWeight: 700, fontSize: 18, margin: '0 0 6px' }}>You&apos;re on the list.</p>
              <p style={{ color: 'rgba(255,255,255,0.6)', fontFamily: hl, fontSize: 14, margin: 0 }}>We&apos;ll let you know before the next event opens.</p>
            </div>
          ) : (
            <form onSubmit={e => { e.preventDefault(); if (email) setSubmitted(true) }} style={{ display: 'flex', gap: 12, maxWidth: 480, margin: '0 auto', flexWrap: 'wrap', justifyContent: 'center' }}>
              <input type="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder="Your email address"
                style={{ flex: 1, minWidth: 200, padding: '13px 18px', border: '2px solid rgba(58,12,163,0.18)', borderRadius: 8, fontSize: 14, outline: 'none', background: '#fff', color: purple, fontFamily: hl }} />
              <button type="submit" style={{ background: pink, color: '#fff', padding: '13px 28px', borderRadius: 8, fontFamily: hl, fontWeight: 700, fontSize: 14, border: 'none', cursor: 'pointer', boxShadow: '0 4px 16px rgba(247,37,133,0.3)' }}>
                Notify Me
              </button>
            </form>
          )}
        </div>
      </section>
    </main>
  )
}
