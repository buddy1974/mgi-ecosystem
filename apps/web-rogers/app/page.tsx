'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { SquareBars } from '@/components/SquareBars'
import { WaveDivider } from '@/components/WaveDivider'
import { ScriptureDivider } from '@/components/ScriptureDivider'

// ── Brand tokens ──────────────────────────────────────────────────────────────
const purple  = '#3a0ca3'
const pink    = '#f72585'
const sky     = '#4361ee'
const hl      = "var(--font-headline, 'Nunito', system-ui, sans-serif)"

// ── Data ──────────────────────────────────────────────────────────────────────

const METRICS = [
  { value: '12+',    label: 'Years of Ministry'    },
  { value: '500+',   label: 'Leaders Mentored'     },
  { value: '8',      label: 'Nations Reached'      },
  { value: '3',      label: 'Active Programs'      },
  { value: '1,000+', label: 'Community Members'    },
]

const PROGRAMS = [
  {
    name: "Dominion Life Men's Conference",
    outcome: "Walk away knowing exactly who you are, what you're built for, and how to lead — without apology.",
    color: purple,
    href: '/programs/dominion-life',
    tag: 'Annual Conference',
  },
  {
    name: 'Men On Duty',
    outcome: 'Stop drifting. Start leading — in your home, your faith, your work, and your community.',
    color: sky,
    href: '/programs/men-on-duty',
    tag: 'Movement',
  },
  {
    name: 'CEO On Mission',
    outcome: 'Build a business that serves a higher purpose — and scale it without losing your soul.',
    color: pink,
    href: '/programs/ceo-on-mission',
    tag: 'Executive Mentorship',
  },
]

const TESTIMONIALS = [
  {
    quote: "I came skeptical. I left recalibrated. Rogers doesn't just speak — he gives you a framework for your whole life. I made decisions in 3 days that I had been avoiding for 3 years.",
    name: 'Emmanuel Kouassi',
    city: 'Douala',
    program: "Dominion Life",
  },
  {
    quote: "CEO On Mission gave me language for something I had been living but couldn't articulate. My faith is not separate from my business. It is my competitive advantage.",
    name: 'Daniel Mfoula',
    city: 'Yaoundé',
    program: 'CEO On Mission',
  },
  {
    quote: "Men On Duty doesn't fix your schedule — it fixes your values. The schedule fixes itself. My wife noticed the change before I did. That's how I knew it was real.",
    name: 'Christian Awah',
    city: 'Limbe',
    program: 'Men On Duty',
  },
]

const EVENTS = [
  {
    name: "Dominion Life Men's Conference",
    date: 'Q3 2026',
    location: 'Douala, Cameroon',
    status: 'Registration Opening Soon',
    program: 'dominion-life',
  },
  {
    name: 'CEO On Mission Intensive',
    date: 'Q4 2026',
    location: 'Yaoundé, Cameroon',
    status: 'Early Interest List',
    program: 'ceo-on-mission',
  },
  {
    name: 'Men On Duty Retreat',
    date: 'Coming 2026',
    location: 'TBA',
    status: 'Notify Me',
    program: 'men-on-duty',
  },
]

// ── Page ──────────────────────────────────────────────────────────────────────

export default function HomePage() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  return (
    <main>
      <style>{`
        @keyframes pulse {
          0%, 100% { box-shadow: 0 0 0 2px rgba(34,197,94,0.3); }
          50%       { box-shadow: 0 0 0 5px rgba(34,197,94,0.1); }
        }
        @media (max-width: 768px) {
          .hero-wrapper      { flex-direction: column !important; }
          .hero-image-col    { flex: none !important; height: 320px !important; width: 100% !important; min-height: unset !important; }
          .story-grid        { grid-template-columns: 1fr !important; }
          .programs-grid     { grid-template-columns: 1fr !important; }
          .testimonials-grid { grid-template-columns: 1fr !important; }
          .events-grid       { grid-template-columns: 1fr !important; }
          .coaching-grid     { grid-template-columns: 1fr !important; }
          .social-proof-grid { grid-template-columns: repeat(3, 1fr) !important; }
          .metrics-sep       { display: none !important; }
          .hero-ctas         { flex-direction: column !important; align-items: flex-start !important; }
        }
        @media (max-width: 480px) {
          .social-proof-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>

      {/* ══ 1. HERO ══════════════════════════════════════════════════════════ */}
      <section className="hero-wrapper" style={{
        paddingTop: 76,
        minHeight: '100vh',
        display: 'flex', alignItems: 'stretch',
        background: `linear-gradient(150deg, #0a0120 0%, ${purple} 55%, #1e0a60 100%)`,
        position: 'relative', overflow: 'hidden',
      }}>
        {/* Ambient glow */}
        <div style={{ position: 'absolute', bottom: -80, left: '40%', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(247,37,133,0.07) 0%, transparent 70%)', pointerEvents: 'none' }} />

        {/* LEFT — copy (55%) */}
        <div style={{
          flex: '0 0 55%',
          display: 'flex', flexDirection: 'column', justifyContent: 'center',
          padding: '80px 60px 80px 80px',
          position: 'relative', zIndex: 2,
        }}>
          <div style={{ display: 'flex', gap: 0, marginBottom: 32, borderRadius: 3, overflow: 'hidden', width: 68 }}>
            <div style={{ width: 40, height: 6, background: purple }} />
            <div style={{ width: 28, height: 6, background: pink }} />
          </div>

          <p style={{ color: '#7b90f3', fontFamily: hl, fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: 24, lineHeight: 1 }}>
            Rogers Nforgwei
          </p>

          <h1 style={{ color: '#ffffff', fontFamily: hl, fontSize: 'clamp(2.8rem, 6vw, 5.5rem)', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1.05, marginBottom: 0 }}>
            You were built
          </h1>
          <h1 style={{ color: '#ffffff', fontFamily: hl, fontSize: 'clamp(2.8rem, 6vw, 5.5rem)', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1.05, marginBottom: 0 }}>
            for more than
          </h1>
          <h1 style={{ background: 'linear-gradient(90deg, #7b90f3 0%, #f72585 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontFamily: hl, fontSize: 'clamp(2.8rem, 6vw, 5.5rem)', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1.05, marginBottom: 32 }}>
            this.
          </h1>

          <p style={{ color: 'rgba(255,255,255,0.80)', fontFamily: hl, fontSize: 17, lineHeight: 1.8, marginBottom: 44, maxWidth: 520, fontWeight: 300 }}>
            Join thousands of men and leaders across Africa stepping into purpose, clarity, and lasting impact — through programs, mentorship, and a transformational community.
          </p>

          <div className="hero-ctas" style={{ display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'center' }}>
            <a
              href="/#programs"
              style={{
                background: pink, color: '#ffffff',
                padding: '16px 40px', borderRadius: 8,
                textDecoration: 'none', fontFamily: hl, fontWeight: 700,
                fontSize: '1rem', letterSpacing: '0.02em',
                display: 'inline-flex', alignItems: 'center', gap: 8,
                transition: 'all 0.2s ease',
                boxShadow: '0 6px 28px rgba(247,37,133,0.38)',
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLAnchorElement
                el.style.transform = 'translateY(-2px)'
                el.style.boxShadow = '0 10px 36px rgba(247,37,133,0.55)'
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLAnchorElement
                el.style.transform = 'translateY(0)'
                el.style.boxShadow = '0 6px 28px rgba(247,37,133,0.38)'
              }}
            >
              Explore Programs
            </a>
            <a
              href="/about"
              style={{
                border: '2px solid rgba(67,97,238,0.6)',
                color: 'rgba(255,255,255,0.85)',
                background: 'rgba(67,97,238,0.08)',
                padding: '14px 36px', borderRadius: 8,
                textDecoration: 'none', fontFamily: hl,
                fontWeight: 600, fontSize: '0.95rem',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLAnchorElement
                el.style.background = 'rgba(67,97,238,0.18)'
                el.style.borderColor = 'rgba(67,97,238,0.9)'
                el.style.color = '#ffffff'
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLAnchorElement
                el.style.background = 'rgba(67,97,238,0.08)'
                el.style.borderColor = 'rgba(67,97,238,0.6)'
                el.style.color = 'rgba(255,255,255,0.85)'
              }}
            >
              About Rogers
            </a>
            <a
              href="https://wa.me/237683493220"
              target="_blank" rel="noopener noreferrer"
              style={{ color: 'rgba(255,255,255,0.50)', fontFamily: hl, fontSize: 13, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 6, transition: 'color 0.2s' }}
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.85)' }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.50)' }}
            >
              <span style={{ fontSize: 16 }}>💬</span> WhatsApp
            </a>
          </div>
        </div>

        {/* RIGHT — Rogers photo, full-bleed (45%) */}
        <div className="hero-image-col" style={{
          flex: '0 0 45%',
          position: 'relative', overflow: 'hidden',
          minHeight: 600,
        }}>
          <Image
            src="/rogers-hero.png"
            alt="Rogers Nforgwei"
            fill
            style={{ objectFit: 'cover', objectPosition: 'top center' }}
            priority
          />
          {/* Left fade — blends into text column */}
          <div style={{
            position: 'absolute', inset: 0,
            background: `linear-gradient(to right, ${purple} 0%, transparent 30%)`,
            zIndex: 1,
          }} />
          {/* Bottom fade */}
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0, height: 200,
            background: `linear-gradient(to top, #0a0120 0%, transparent 100%)`,
            zIndex: 1,
          }} />
          {/* Floating stat chip */}
          <div style={{
            position: 'absolute', bottom: 40, right: 32, zIndex: 2,
            background: 'rgba(255,255,255,0.08)',
            backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
            border: '1px solid rgba(255,255,255,0.12)',
            borderRadius: 14, padding: '18px 24px',
          }}>
            <p style={{ fontFamily: hl, fontWeight: 800, fontSize: '2rem', color: '#ffffff', lineHeight: 1, marginBottom: 4 }}>500+</p>
            <p style={{ fontFamily: hl, fontWeight: 400, fontSize: '0.72rem', color: 'rgba(255,255,255,0.65)', letterSpacing: '0.08em', textTransform: 'uppercase', margin: 0 }}>Leaders Transformed</p>
          </div>
          {/* Floating quote chip */}
          <div style={{
            position: 'absolute', top: 48, right: 28, zIndex: 2,
            background: 'rgba(247,37,133,0.15)',
            border: '1px solid rgba(247,37,133,0.3)',
            borderRadius: 100, padding: '8px 16px',
          }}>
            <p style={{ fontFamily: hl, fontWeight: 600, fontSize: '0.75rem', color: 'rgba(255,255,255,0.9)', margin: 0 }}>8 Nations Reached</p>
          </div>
        </div>
      </section>

      {/* WAVE: Hero → Social Proof */}
      <WaveDivider fromColor={`linear-gradient(150deg, #0a0120, #1e0a60)`} toColor="#0d0120" />

      {/* ══ 2. SOCIAL PROOF BAR ══════════════════════════════════════════════ */}
      <section style={{ background: '#0d0120', padding: '3.5rem 2rem', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <div
          className="social-proof-grid"
          style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', alignItems: 'center' }}
        >
          {METRICS.map((m, i) => (
            <div key={m.label} style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{ textAlign: 'center', padding: '0 20px', flex: 1 }}>
                <p style={{ fontFamily: hl, fontWeight: 800, fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', color: '#ffffff', lineHeight: 1, marginBottom: 6 }}>{m.value}</p>
                <p style={{ fontFamily: hl, fontWeight: 400, fontSize: '0.72rem', color: 'rgba(255,255,255,0.55)', letterSpacing: '0.10em', textTransform: 'uppercase', margin: 0 }}>{m.label}</p>
              </div>
              {i < METRICS.length - 1 && (
                <div className="metrics-sep" style={{ width: 1, height: 40, background: pink, opacity: 0.3, flexShrink: 0 }} />
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ══ 3. ROGERS STORY ══════════════════════════════════════════════════ */}
      <section id="story" style={{ background: '#f8f7ff', padding: '6rem 2rem' }}>
        <div
          className="story-grid"
          style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'center' }}
        >
          {/* Photo */}
          <div style={{ position: 'relative' }}>
            <div style={{ borderRadius: 20, overflow: 'hidden', background: purple, aspectRatio: '3/4', position: 'relative', maxHeight: 540 }}>
              <Image src="/rogers-hero.png" alt="Rogers Nforgwei" fill style={{ objectFit: 'cover', objectPosition: 'top center', mixBlendMode: 'luminosity', opacity: 0.85 }} />
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '2rem', background: 'linear-gradient(to top, rgba(58,12,163,0.97) 0%, transparent 100%)' }}>
                <p style={{ color: 'rgba(255,255,255,0.9)', fontStyle: 'italic', fontSize: 14, lineHeight: 1.65, margin: '0 0 8px' }}>
                  &ldquo;A man doesn&apos;t have a professional life and a spiritual life. He has one life.&rdquo;
                </p>
                <p style={{ color: pink, fontSize: 11, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', margin: 0 }}>— Rogers Nforgwei</p>
              </div>
            </div>
          </div>

          {/* Narrative */}
          <div>
            <SquareBars color={sky} />
            <p style={{ color: sky, fontFamily: hl, fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: 16, lineHeight: 1 }}>
              The Man Behind the Mission
            </p>
            <h2 style={{ color: purple, fontFamily: hl, fontSize: 'clamp(2rem, 3.5vw, 2.6rem)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: 24 }}>
              Changing lives,<br />one person at a time.
            </h2>
            <p style={{ color: '#1a1a2e', fontSize: 16, lineHeight: 1.8, marginBottom: 18, fontWeight: 300, maxWidth: 520 }}>
              Rogers Nforgwei is a businessman, development director, and humanitarian who has spent over 15 years building people and institutions that create lasting change across Africa.
            </p>
            <p style={{ color: '#4a4a6a', fontSize: 16, lineHeight: 1.8, marginBottom: 32, fontWeight: 300, maxWidth: 520 }}>
              Rooted in faith and driven by purpose, Rogers believes every man and leader carries untapped potential that, when activated, reshapes families, communities, and nations.
            </p>
            <a
              href="/about"
              style={{ color: sky, fontFamily: hl, fontWeight: 600, fontSize: '0.9rem', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 6, transition: 'gap 0.2s ease' }}
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.gap = '10px' }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.gap = '6px' }}
            >
              Read the full story <span style={{ fontSize: '1.1em' }}>→</span>
            </a>
          </div>
        </div>
      </section>

      {/* ══ 4. PROGRAMS ══════════════════════════════════════════════════════ */}
      <section id="programs" style={{ background: '#f1f1f1', padding: '6rem 2rem', borderTop: '1px solid rgba(58,12,163,0.07)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 52 }}>
            <SquareBars color={purple} />
            <p style={{ color: purple, fontFamily: hl, fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: 12, lineHeight: 1 }}>
              Programs & Initiatives
            </p>
            <h2 style={{ color: purple, fontFamily: hl, fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.1, margin: '0 auto', maxWidth: 480 }}>
              Choose your transformation.
            </h2>
          </div>

          <div className="programs-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
            {PROGRAMS.map((p) => (
              <Link key={p.name} href={p.href} style={{ textDecoration: 'none', display: 'block' }}>
                <div
                  className="program-card"
                  style={{ background: '#ffffff', border: '1px solid rgba(58,12,163,0.10)', borderRadius: 20, overflow: 'hidden', height: '100%', display: 'flex', flexDirection: 'column', transition: 'transform 0.2s, box-shadow 0.2s' }}
                  onMouseEnter={e => {
                    const el = e.currentTarget as HTMLDivElement
                    el.style.transform = 'translateY(-4px)'
                    el.style.boxShadow = '0 12px 40px rgba(58,12,163,0.13)'
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLDivElement
                    el.style.transform = 'translateY(0)'
                    el.style.boxShadow = 'none'
                  }}
                >
                  <div style={{ display: 'flex' }}>
                    <div style={{ flex: 1, height: 4, background: p.color }} />
                    <div style={{ flex: 1, height: 4, background: pink, opacity: 0.5 }} />
                  </div>
                  <div style={{ padding: '2rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <span style={{ background: 'rgba(58,12,163,0.07)', color: purple, fontFamily: hl, fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', padding: '4px 10px', borderRadius: 4, display: 'inline-block', marginBottom: 16 }}>{p.tag}</span>
                    <h3 style={{ color: purple, fontFamily: hl, fontWeight: 800, fontSize: 18, marginBottom: 12, letterSpacing: '-0.02em', lineHeight: 1.25 }}>{p.name}</h3>
                    <p style={{ color: '#4a4a6a', fontSize: 14, lineHeight: 1.8, margin: '0 0 20px', fontWeight: 300, flex: 1 }}>{p.outcome}</p>
                    <span style={{ color: sky, fontFamily: hl, fontSize: '0.9rem', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                      Secure your place <span style={{ fontSize: '1.1em' }}>→</span>
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* SCRIPTURE DIVIDER + WAVE: Programs → Testimonials */}
      <ScriptureDivider
        verse="Iron sharpens iron, and one man sharpens another."
        citation="Proverbs 27:17"
      />
      <WaveDivider fromColor="#0d0120" toColor={purple} />

      {/* ══ 5. TESTIMONIALS ══════════════════════════════════════════════════ */}
      <section style={{ padding: '6rem 2rem', background: purple }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <SquareBars color={pink} />
            <p style={{ color: 'rgba(255,255,255,0.50)', fontFamily: hl, fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: 12, lineHeight: 1 }}>
              Transformation Stories
            </p>
            <h2 style={{ color: '#ffffff', fontFamily: hl, fontSize: 'clamp(2rem, 3.5vw, 2.6rem)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.1, margin: 0 }}>
              Lives changed. Missions activated.
            </h2>
          </div>

          <div className="testimonials-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24, marginBottom: 36 }}>
            {TESTIMONIALS.map((t, i) => (
              <div key={i} style={{ background: 'rgba(255,255,255,0.07)', borderLeft: `3px solid ${pink}`, borderRadius: 16, padding: '2rem', border: `1px solid rgba(255,255,255,0.10)`, borderLeftWidth: 3, borderLeftColor: pink }}>
                <p style={{ color: 'rgba(247,37,133,0.20)', fontFamily: 'Georgia, serif', fontSize: '4rem', lineHeight: 0.8, marginBottom: 16 }}>&ldquo;</p>
                <p style={{ color: 'rgba(255,255,255,0.80)', fontFamily: 'Georgia, serif', fontStyle: 'italic', fontSize: '1.05rem', lineHeight: 1.8, marginBottom: 20 }}>
                  {t.quote}
                </p>
                <div style={{ borderTop: '1px solid rgba(255,255,255,0.10)', paddingTop: 16 }}>
                  <p style={{ color: '#7b90f3', fontFamily: hl, fontWeight: 700, fontSize: 14, margin: '0 0 3px' }}>{t.name}</p>
                  <p style={{ color: 'rgba(255,255,255,0.50)', fontFamily: hl, fontSize: '0.8rem', margin: 0 }}>{t.city} · {t.program}</p>
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center' }}>
            <Link
              href="/testimonials"
              style={{ color: 'rgba(255,255,255,0.70)', fontFamily: hl, fontWeight: 600, fontSize: '0.9rem', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 6 }}
            >
              See all transformation stories <span>→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ══ 6. EVENTS ════════════════════════════════════════════════════════ */}
      <section id="events" style={{ background: '#111028', padding: '6rem 2rem' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 52 }}>
            <SquareBars color={sky} />
            <p style={{ color: '#7b90f3', fontFamily: hl, fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: 12, lineHeight: 1 }}>
              Upcoming Events
            </p>
            <h2 style={{ color: '#ffffff', fontFamily: hl, fontSize: 'clamp(2rem, 3.5vw, 2.6rem)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.1, margin: 0 }}>
              The next gathering is forming.
            </h2>
          </div>

          <div className="events-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
            {EVENTS.map((ev) => (
              <div key={ev.name} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 16, padding: '2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
                  <span style={{
                    display: 'inline-block', width: 8, height: 8, borderRadius: '50%',
                    background: '#22c55e', boxShadow: '0 0 0 2px rgba(34,197,94,0.3)',
                    animation: 'pulse 2s infinite',
                  }} />
                  <span style={{ color: '#22c55e', fontFamily: hl, fontSize: '0.75rem', fontWeight: 600 }}>{ev.status}</span>
                </div>
                <h3 style={{ color: '#ffffff', fontFamily: hl, fontWeight: 700, fontSize: 16, marginBottom: 10, lineHeight: 1.3 }}>{ev.name}</h3>
                <p style={{ color: 'rgba(255,255,255,0.50)', fontFamily: hl, fontSize: 13, margin: '0 0 4px' }}>{ev.date}</p>
                <p style={{ color: 'rgba(255,255,255,0.35)', fontFamily: hl, fontSize: 12, margin: '0 0 20px' }}>{ev.location}</p>
                <Link
                  href={`/programs/${ev.program}`}
                  style={{ color: sky, fontFamily: hl, fontWeight: 600, fontSize: '0.85rem', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 4 }}
                >
                  Learn More →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 7. LEAD MAGNET ═══════════════════════════════════════════════════ */}
      <section style={{ padding: '6rem 2rem', background: '#ffffff' }}>
        <div style={{ maxWidth: 680, margin: '0 auto', textAlign: 'center' }}>
          <SquareBars color={purple} />
          <p style={{ color: purple, fontFamily: hl, fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: 12, lineHeight: 1 }}>
            Free Resource
          </p>
          <h2 style={{ color: purple, fontFamily: hl, fontSize: 'clamp(2rem, 3.5vw, 2.4rem)', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: 16, lineHeight: 1.15 }}>
            The 5 Pillars of<br />Purpose-Driven Leadership
          </h2>
          <p style={{ color: '#4a4a6a', fontSize: 16, lineHeight: 1.8, maxWidth: 520, margin: '0 auto 36px', fontWeight: 300 }}>
            A free guide by Rogers Nforgwei — 15+ years of leadership experience distilled into five principles every man and leader must master.
          </p>

          {submitted ? (
            <div style={{ background: purple, borderRadius: 16, padding: '2.5rem' }}>
              <p style={{ color: '#ffffff', fontSize: 20, fontFamily: hl, fontWeight: 800, margin: '0 0 8px' }}>You&apos;re in!</p>
              <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 14, margin: 0 }}>Check your inbox — your guide is on its way.</p>
            </div>
          ) : (
            <form
              onSubmit={(e) => { e.preventDefault(); if (email) setSubmitted(true) }}
              style={{ display: 'flex', gap: 12, maxWidth: 480, margin: '0 auto', flexWrap: 'wrap', justifyContent: 'center' }}
            >
              <input
                type="email" value={email} onChange={e => setEmail(e.target.value)}
                placeholder="Your email address" required
                style={{ flex: 1, minWidth: 200, padding: '14px 20px', border: '2px solid rgba(58,12,163,0.18)', borderRadius: 8, fontSize: 14, outline: 'none', background: '#fff', color: purple, fontFamily: hl }}
              />
              <button
                type="submit"
                style={{ background: pink, color: '#fff', padding: '14px 28px', borderRadius: 8, fontSize: 14, fontFamily: hl, fontWeight: 700, border: 'none', cursor: 'pointer', whiteSpace: 'nowrap', boxShadow: '0 4px 18px rgba(247,37,133,0.3)' }}
              >
                Send My Guide
              </button>
            </form>
          )}
          <p style={{ color: '#888', fontFamily: hl, fontSize: 12, marginTop: 12 }}>No spam. Unsubscribe any time.</p>
        </div>
      </section>

      {/* WAVE: Lead Magnet → Community */}
      <WaveDivider fromColor="#ffffff" toColor={`linear-gradient(135deg, ${purple}, ${sky})`} />

      {/* ══ 8. COMMUNITY ═════════════════════════════════════════════════════ */}
      <section id="community" style={{ padding: '6rem 2rem', background: `linear-gradient(135deg, ${purple} 0%, ${sky} 100%)`, textAlign: 'center' }}>
        <div style={{ maxWidth: 680, margin: '0 auto' }}>
          <SquareBars color="rgba(255,255,255,0.5)" />
          <p style={{ color: 'rgba(255,255,255,0.55)', fontFamily: hl, fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: 16, lineHeight: 1 }}>
            The Community
          </p>
          <h2 style={{ color: '#ffffff', fontFamily: hl, fontSize: 'clamp(2rem, 3.5vw, 2.6rem)', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: 16, lineHeight: 1.1 }}>
            1,000+ men already moving.
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.80)', fontSize: 16, lineHeight: 1.8, maxWidth: 520, margin: '0 auto 36px', fontWeight: 300 }}>
            The Men On Duty community is growing across Africa and beyond. Daily encouragement, accountability, and real conversation — with men who are done drifting. The next man who steps in could be you.
          </p>
          <a
            href="https://wa.me/237683493220?text=Hi%20Rogers%2C%20I%20want%20to%20join%20the%20community"
            target="_blank" rel="noopener noreferrer"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 10,
              background: '#25D366', color: '#fff',
              padding: '16px 36px', borderRadius: 8,
              fontFamily: hl, fontWeight: 700, fontSize: '1rem',
              textDecoration: 'none',
              boxShadow: '0 4px 24px rgba(37,211,102,0.35)',
            }}
          >
            <span style={{ fontSize: 20 }}>💬</span>
            Join the Movement
          </a>
        </div>
      </section>

      {/* ══ 9. COACHING INQUIRY ══════════════════════════════════════════════ */}
      <section id="coaching" style={{ padding: '6rem 2rem', background: '#f8f7ff' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <SquareBars color={purple} />
            <p style={{ color: purple, fontFamily: hl, fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: 12, lineHeight: 1 }}>
              Work With Rogers
            </p>
            <h2 style={{ color: purple, fontFamily: hl, fontSize: 'clamp(2rem, 3.5vw, 2.4rem)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.1, margin: 0 }}>
              Ready to go further?
            </h2>
          </div>

          <div className="coaching-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
            <div style={{ background: '#ffffff', borderRadius: 20, padding: '2.5rem', border: '1px solid rgba(58,12,163,0.10)', boxShadow: '0 2px 20px rgba(58,12,163,0.06)' }}>
              <div style={{ width: 48, height: 48, background: 'rgba(58,12,163,0.08)', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, marginBottom: 20 }}>🎯</div>
              <h3 style={{ color: purple, fontFamily: hl, fontWeight: 800, fontSize: 20, marginBottom: 12 }}>Personal Coaching</h3>
              <p style={{ color: '#4a4a6a', fontSize: 14, lineHeight: 1.8, margin: '0 0 24px', fontWeight: 300, maxWidth: 360 }}>
                1-on-1 coaching for leaders, entrepreneurs, and men of purpose. Break through your limitations and build the life you were designed for.
              </p>
              <a
                href="https://wa.me/237683493220?text=Hi%20Rogers%2C%20I%27m%20interested%20in%20personal%20coaching"
                target="_blank" rel="noopener noreferrer"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  background: purple, color: '#fff',
                  padding: '12px 24px', borderRadius: 8,
                  fontFamily: hl, fontWeight: 700, fontSize: 13, textDecoration: 'none',
                  boxShadow: '0 4px 16px rgba(58,12,163,0.25)',
                }}
              >
                Apply via WhatsApp →
              </a>
            </div>

            <div style={{ background: '#ffffff', borderRadius: 20, padding: '2.5rem', border: '1px solid rgba(58,12,163,0.10)', boxShadow: '0 2px 20px rgba(58,12,163,0.06)' }}>
              <div style={{ width: 48, height: 48, background: 'rgba(247,37,133,0.08)', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, marginBottom: 20 }}>🎙️</div>
              <h3 style={{ color: purple, fontFamily: hl, fontWeight: 800, fontSize: 20, marginBottom: 12 }}>Speaking & Events</h3>
              <p style={{ color: '#4a4a6a', fontSize: 14, lineHeight: 1.8, margin: '0 0 24px', fontWeight: 300, maxWidth: 360 }}>
                Invite Rogers to speak at your conference, corporate event, or church gathering. A transformational voice for any platform of purpose.
              </p>
              <a
                href="https://wa.me/237683493220?text=Hi%20Rogers%2C%20I%27d%20like%20to%20invite%20you%20to%20speak%20at%20my%20event"
                target="_blank" rel="noopener noreferrer"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  background: pink, color: '#fff',
                  padding: '12px 24px', borderRadius: 8,
                  fontFamily: hl, fontWeight: 700, fontSize: 13, textDecoration: 'none',
                  boxShadow: '0 4px 16px rgba(247,37,133,0.25)',
                }}
              >
                Inquire via WhatsApp →
              </a>
            </div>
          </div>
        </div>
      </section>

    </main>
  )
}
