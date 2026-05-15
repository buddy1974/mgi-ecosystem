'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { SquareBars } from '@/components/SquareBars'
import { WaveDivider } from '@/components/WaveDivider'
import { ScriptureDivider } from '@/components/ScriptureDivider'
import { HeroSection } from '@/components/HeroSection'

// ── Brand tokens ──────────────────────────────────────────────────────────────
const purple  = '#3a0ca3'
const pink    = '#f72585'
const sky     = '#4361ee'
const hl      = "var(--font-headline, 'Nunito', system-ui, sans-serif)"

// ── Fade-up scroll animation variant ─────────────────────────────────────────
const fadeUp = {
  hidden:  { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: (i ?? 0) * 0.12, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  }),
}

// ── Data ──────────────────────────────────────────────────────────────────────
const PROGRAMS = [
  {
    name: "Dominion Life Men's Conference",
    outcome: "A gathering of men called to lead with faith, vision, and authority. Conference format — register online.",
    color: purple,
    href: '/programs/dominion-life',
    tag: 'Annual Conference',
  },
  {
    name: 'Men On Duty',
    outcome: 'Structured seminars for men ready to step fully into their purpose in family, work, and community.',
    color: sky,
    href: '/programs/men-on-duty',
    tag: 'Movement',
  },
  {
    name: 'CEO On Mission',
    outcome: 'Private one-to-one executive coaching for leaders building organisations with kingdom values.',
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

const PROOF_STATS = [
  { value: '30+',   label: 'Nations Reached'          },
  { value: '7',     label: 'Countries — NMI Education' },
  { value: '47+',   label: 'Families Supported'        },
  { value: '2×',    label: 'Presidential Honors'       },
  { value: '26+',   label: 'Years of Leadership'       },
]

// ── Section divider ───────────────────────────────────────────────────────────
const SectionDivider = () => (
  <div style={{
    width: '100%',
    height: '1px',
    background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.06), transparent)',
    maxWidth: '1280px',
    margin: '0 auto',
  }} />
)

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
          .story-grid        { grid-template-columns: 1fr !important; }
          .programs-asymmetric { grid-template-columns: 1fr !important !important; }
          .testimonials-grid { grid-template-columns: 1fr !important; }
          .events-grid       { grid-template-columns: 1fr !important; }
          .coaching-grid     { grid-template-columns: 1fr !important; }
          .metrics-strip     { flex-wrap: wrap !important; gap: 24px !important; }
          .section-premium   { padding-top: 80px !important; padding-bottom: 80px !important; }
        }
        @media (max-width: 480px) {
          .metrics-strip     { gap: 16px !important; }
        }
      `}</style>

      {/* ══ 1. HERO ══════════════════════════════════════════════════════════ */}
      <HeroSection />

      <SectionDivider />

      {/* ══ 2. SOCIAL PROOF METRICS STRIP ════════════════════════════════════ */}
      <div style={{ background: '#0d0120', padding: '0 2rem' }}>
        <div
          className="glass-panel metrics-strip"
          style={{
            display: 'flex',
            justifyContent: 'space-around',
            padding: '28px 48px',
            maxWidth: '1280px',
            margin: '0 auto',
          }}
        >
          {PROOF_STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              style={{
                textAlign: 'center' as const,
                padding: '0 24px',
                borderRight: i < PROOF_STATS.length - 1 ? '1px solid rgba(255,255,255,0.08)' : 'none',
              }}
            >
              <div style={{ fontSize: 28, fontWeight: 700, color: '#ffffff', fontFamily: hl }}>{stat.value}</div>
              <div style={{ fontSize: 13, opacity: 0.5, marginTop: 6, color: '#ffffff', fontFamily: hl }}>{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>

      <SectionDivider />

      {/* ══ 3. ROGERS STORY ══════════════════════════════════════════════════ */}
      <section id="story" className="section-premium" style={{ background: '#f8f7ff' }}>
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <div
            className="story-grid"
            style={{ maxWidth: 1100, margin: '0 auto', padding: '0 2rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'center' }}
          >
            {/* Photo */}
            <div style={{ position: 'relative' }}>
              <div style={{ borderRadius: 28, overflow: 'hidden', background: purple, aspectRatio: '3/4', position: 'relative', maxHeight: 540 }}>
                <Image src="/images/rogers-frontpage.png" alt="Apostle Dr. Rogers Ngalla Nforgwei" fill style={{ objectFit: 'cover', objectPosition: 'top center', mixBlendMode: 'luminosity', opacity: 0.85 }} />
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
                {/* Verified biography — Rogers Ngalla Nforgwei */}
                Apostle Dr. Rogers Ngalla Nforgwei was born in Mbabi, Wat village, Donga Mantung Division, Northwest Region, Cameroon. From humble beginnings, he rose to become Business Development Manager for Africa at Cambridge University Press — overseeing 30+ countries — and founder of NMI Education, one of Cameroon&apos;s leading publishing companies, now operating across 7 nations.
              </p>
              <p style={{ color: '#4a4a6a', fontSize: 16, lineHeight: 1.8, marginBottom: 32, fontWeight: 300, maxWidth: 520 }}>
                A holder of a Doctorate in Applied Theology from Kingdom Life University, California, and twice honored by President Paul Biya — Knight (2016) and Officer (2023) of the National Orders of Cameroon — Rogers brings kingdom-minded leadership to every room he enters.
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
        </motion.div>
      </section>

      <SectionDivider />

      {/* ══ 4. PROGRAMS ══════════════════════════════════════════════════════ */}
      <section id="programs" className="section-premium" style={{ background: '#0d0120' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 2rem' }}>

          {/* ── Section header ── */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            style={{ textAlign: 'center', marginBottom: '56px' }}
          >
            <div style={{
              display: 'inline-block',
              background: 'rgba(247,37,133,0.12)',
              border: '1px solid rgba(247,37,133,0.3)',
              borderRadius: '999px',
              padding: '6px 20px',
              marginBottom: '24px',
            }}>
              <span style={{
                fontSize: '11px',
                fontWeight: 700,
                letterSpacing: '0.18em',
                textTransform: 'uppercase' as const,
                color: '#f72585',
                fontFamily: hl,
              }}>
                Transformation Programs
              </span>
            </div>
            <h2 style={{
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              fontWeight: 800,
              lineHeight: 1.1,
              color: '#ffffff',
              marginBottom: '20px',
              letterSpacing: '-0.02em',
              fontFamily: hl,
            }}>
              Choose Your Arena.<br />
              <span style={{ color: '#f72585' }}>Begin Your Transformation.</span>
            </h2>
            <p style={{
              fontSize: 'clamp(1rem, 2vw, 1.2rem)',
              color: 'rgba(255,255,255,0.6)',
              maxWidth: '560px',
              margin: '0 auto 16px',
              lineHeight: 1.7,
              fontFamily: hl,
              fontWeight: 300,
            }}>
              Three distinct programs. One mission — equip men and leaders to fulfil
              their God-given assignment with clarity, authority, and impact.
            </p>
          </motion.div>

          {/* ── Asymmetric grid — Dominion Life large + two stacked ── */}
          <div
            className="programs-asymmetric"
            style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 28 }}
          >

            {/* ── DOMINION LIFE — Large Card (1.4fr) ── */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              style={{
                background: 'linear-gradient(135deg, rgba(58,12,163,0.45) 0%, rgba(114,9,183,0.3) 100%)',
                border: '1px solid rgba(247,37,133,0.25)',
                borderRadius: '24px',
                padding: 'clamp(32px, 4vw, 48px)',
                position: 'relative',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                gap: '24px',
              }}
            >
              {/* Background glow */}
              <div style={{
                position: 'absolute', top: '-60px', right: '-60px',
                width: '280px', height: '280px',
                background: 'radial-gradient(circle, rgba(247,37,133,0.12) 0%, transparent 70%)',
                pointerEvents: 'none',
              }} />

              {/* Program number + badges */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' as const }}>
                <span style={{ fontSize: '48px', fontWeight: 800, color: 'rgba(247,37,133,0.25)', lineHeight: 1 }}>01</span>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' as const }}>
                  <span style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase' as const, background: 'rgba(247,37,133,0.15)', border: '1px solid rgba(247,37,133,0.4)', borderRadius: '999px', padding: '4px 12px', color: '#f72585' }}>Flagship</span>
                  <span style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase' as const, background: 'rgba(67,97,238,0.15)', border: '1px solid rgba(67,97,238,0.35)', borderRadius: '999px', padding: '4px 12px', color: '#4361ee' }}>Next Dates Coming</span>{/* TODO: awaiting Rogers content — replace with real dates */}
                </div>
              </div>

              {/* Title + tagline */}
              <div>
                <h3 style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)', fontWeight: 800, color: '#ffffff', lineHeight: 1.15, marginBottom: '10px', letterSpacing: '-0.02em', fontFamily: hl }}>
                  Dominion Life<br />Men&apos;s Conference
                </h3>
                <p style={{ fontSize: '1.05rem', fontStyle: 'italic', color: 'rgba(255,255,255,0.55)', lineHeight: 1.6 }}>
                  &ldquo;Where men discover who they were built to be.&rdquo;
                </p>
              </div>

              {/* WHO strip */}
              <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '12px', padding: '14px 18px', borderLeft: '3px solid #f72585' }}>
                <p style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase' as const, color: '#f72585', marginBottom: '6px', fontFamily: hl }}>For You If —</p>
                <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.6 }}>
                  You are a man seeking spiritual authority · a leader feeling the weight
                  of your assignment · a father who wants his legacy to outlive him · an
                  executive ready to align success with purpose
                </p>
              </div>

              {/* What transforms */}
              <div>
                <p style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase' as const, color: 'rgba(255,255,255,0.4)', marginBottom: '14px', fontFamily: hl }}>What Transforms</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {[
                    'Spiritual authority — you understand your position and walk in it',
                    'Life dominion — clarity over your calling, family, and business',
                    'Brotherhood — a network of men committed to the same standard',
                    'Identity — the confusion about who you are dissolves permanently',
                  ].map((item, i) => (
                    <div key={i} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                      <span style={{ flexShrink: 0, width: '22px', height: '22px', borderRadius: '50%', background: 'rgba(247,37,133,0.2)', border: '1px solid rgba(247,37,133,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 700, color: '#f72585', marginTop: '1px' }}>{i + 1}</span>
                      <span style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.75)', lineHeight: 1.5 }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Divider */}
              <div style={{ height: '1px', background: 'rgba(255,255,255,0.08)' }} />

              {/* Format strip */}
              <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' as const }}>
                {[
                  { label: 'Format', value: 'Conference · In-Person + Online' },
                  { label: 'Reach', value: '30+ Nations · 26+ Years' },
                ].map(({ label, value }) => (
                  <div key={label}>
                    <p style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase' as const, color: 'rgba(255,255,255,0.35)', marginBottom: '2px', fontFamily: hl }}>{label}</p>
                    <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)', fontWeight: 500 }}>{value}</p>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '4px' }}>
                <a
                  href="/#contact" /* TODO: awaiting Rogers content — replace with real registration URL */
                  style={{
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                    background: 'linear-gradient(135deg, #f72585, #7209b7)',
                    color: '#ffffff', fontWeight: 700, fontSize: '0.95rem',
                    padding: '14px 28px', borderRadius: '999px', textDecoration: 'none',
                    letterSpacing: '0.02em', boxShadow: '0 8px 24px rgba(247,37,133,0.35)',
                    transition: 'transform 0.2s, box-shadow 0.2s', fontFamily: hl,
                  }}
                >
                  Register Your Interest →
                </a>
                <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.35)', textAlign: 'center' as const, fontFamily: hl }}>
                  Limited seats per conference · Next dates announced soon
                </p>
              </div>
            </motion.div>

            {/* ── Right stacked column ── */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>

              {/* ── MEN ON DUTY — Right top card ── */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: 'easeOut', delay: 0.12 }}
                style={{
                  background: 'linear-gradient(135deg, rgba(13,1,32,0.8) 0%, rgba(58,12,163,0.2) 100%)',
                  border: '1px solid rgba(67,97,238,0.25)',
                  borderRadius: '20px',
                  padding: 'clamp(24px, 3vw, 36px)',
                  display: 'flex', flexDirection: 'column', gap: '18px',
                  position: 'relative', overflow: 'hidden', flex: 1,
                }}
              >
                <div style={{ position: 'absolute', bottom: '-40px', left: '-40px', width: '200px', height: '200px', background: 'radial-gradient(circle, rgba(67,97,238,0.1) 0%, transparent 70%)', pointerEvents: 'none' }} />

                {/* Number + badge */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ fontSize: '36px', fontWeight: 800, color: 'rgba(67,97,238,0.3)', lineHeight: 1 }}>02</span>
                  <span style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase' as const, background: 'rgba(67,97,238,0.15)', border: '1px solid rgba(67,97,238,0.35)', borderRadius: '999px', padding: '3px 10px', color: '#4361ee' }}>Active Program</span>
                </div>

                {/* Title + tagline */}
                <div>
                  <h3 style={{ fontSize: 'clamp(1.3rem, 2.5vw, 1.7rem)', fontWeight: 800, color: '#ffffff', lineHeight: 1.2, marginBottom: '8px', letterSpacing: '-0.015em', fontFamily: hl }}>
                    Men On Duty
                  </h3>
                  <p style={{ fontSize: '0.88rem', fontStyle: 'italic', color: 'rgba(255,255,255,0.5)', lineHeight: 1.55 }}>
                    &ldquo;Stand up. Show up. Be the man they need.&rdquo;
                  </p>
                </div>

                {/* FOR strip */}
                <div style={{ borderLeft: '2px solid #4361ee', paddingLeft: '12px' }}>
                  <p style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase' as const, color: '#4361ee', marginBottom: '4px', fontFamily: hl }}>For You If —</p>
                  <p style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.65)', lineHeight: 1.55 }}>
                    You are a husband, father, or man of God who knows he has more to give —
                    and is ready to stop letting life lead him
                  </p>
                </div>

                {/* Transformation bullets */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {[
                    'Lead your home with authority',
                    'Husband your wife with intention',
                    'Father your children into destiny',
                  ].map((item, i) => (
                    <div key={i} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                      <span style={{ flexShrink: 0, width: '6px', height: '6px', borderRadius: '50%', background: '#4361ee', marginTop: '7px' }} />
                      <span style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.5 }}>{item}</span>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <a
                  href="/programs/men-on-duty"
                  style={{
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                    background: 'rgba(67,97,238,0.15)', border: '1px solid rgba(67,97,238,0.4)',
                    color: '#4361ee', fontWeight: 700, fontSize: '0.88rem',
                    padding: '12px 22px', borderRadius: '999px', textDecoration: 'none',
                    letterSpacing: '0.02em', transition: 'background 0.2s, border-color 0.2s',
                    marginTop: '4px', fontFamily: hl,
                  }}
                >
                  Explore Program →
                </a>
              </motion.div>

              {/* ── CEO ON MISSION — Right bottom card ── */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: 'easeOut', delay: 0.24 }}
                style={{
                  background: 'linear-gradient(135deg, rgba(13,1,32,0.8) 0%, rgba(114,9,183,0.2) 100%)',
                  border: '1px solid rgba(114,9,183,0.3)',
                  borderRadius: '20px',
                  padding: 'clamp(24px, 3vw, 36px)',
                  display: 'flex', flexDirection: 'column', gap: '18px',
                  position: 'relative', overflow: 'hidden', flex: 1,
                }}
              >
                <div style={{ position: 'absolute', top: '-30px', right: '-30px', width: '180px', height: '180px', background: 'radial-gradient(circle, rgba(114,9,183,0.1) 0%, transparent 70%)', pointerEvents: 'none' }} />

                {/* Number + badge */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ fontSize: '36px', fontWeight: 800, color: 'rgba(114,9,183,0.35)', lineHeight: 1 }}>03</span>
                  <span style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase' as const, background: 'rgba(114,9,183,0.15)', border: '1px solid rgba(114,9,183,0.4)', borderRadius: '999px', padding: '3px 10px', color: '#7209b7' }}>Executive Program</span>
                </div>

                {/* Title + tagline */}
                <div>
                  <h3 style={{ fontSize: 'clamp(1.3rem, 2.5vw, 1.7rem)', fontWeight: 800, color: '#ffffff', lineHeight: 1.2, marginBottom: '8px', letterSpacing: '-0.015em', fontFamily: hl }}>
                    CEO On Mission
                  </h3>
                  <p style={{ fontSize: '0.88rem', fontStyle: 'italic', color: 'rgba(255,255,255,0.5)', lineHeight: 1.55 }}>
                    &ldquo;Business built on God&apos;s blueprint.&rdquo;
                  </p>
                </div>

                {/* FOR strip */}
                <div style={{ borderLeft: '2px solid #7209b7', paddingLeft: '12px' }}>
                  <p style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase' as const, color: '#7209b7', marginBottom: '4px', fontFamily: hl }}>For You If —</p>
                  <p style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.65)', lineHeight: 1.55 }}>
                    You are a CEO, executive, or entrepreneur who wants their business to
                    carry eternal weight — not just financial results
                  </p>
                </div>

                {/* Transformation bullets */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {[
                    'Strategy aligned to God-given purpose',
                    'Leadership from identity — not ego',
                    'Build a business that outlasts you',
                  ].map((item, i) => (
                    <div key={i} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                      <span style={{ flexShrink: 0, width: '6px', height: '6px', borderRadius: '50%', background: '#7209b7', marginTop: '7px' }} />
                      <span style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.5 }}>{item}</span>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <a
                  href="/programs/ceo-on-mission"
                  style={{
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                    background: 'rgba(114,9,183,0.15)', border: '1px solid rgba(114,9,183,0.4)',
                    color: '#b040fb', fontWeight: 700, fontSize: '0.88rem',
                    padding: '12px 22px', borderRadius: '999px', textDecoration: 'none',
                    letterSpacing: '0.02em', transition: 'background 0.2s, border-color 0.2s',
                    marginTop: '4px', fontFamily: hl,
                  }}
                >
                  Explore Program →
                </a>
              </motion.div>

            </div>
          </div>

          {/* ── Urgency strip below program grid ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: 'easeOut', delay: 0.3 }}
            style={{
              marginTop: '48px',
              padding: '24px 32px',
              background: 'rgba(247,37,133,0.06)',
              border: '1px solid rgba(247,37,133,0.15)',
              borderRadius: '16px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '16px',
              textAlign: 'center' as const,
            }}
          >
            <p style={{ fontSize: 'clamp(1rem, 2vw, 1.15rem)', color: 'rgba(255,255,255,0.75)', lineHeight: 1.6, maxWidth: '600px', fontFamily: hl }}>
              Daddy Rogers leads a limited number of intensive programs each year.{' '}
              <span style={{ color: '#f72585', fontWeight: 600 }}>Seats fill months in advance.</span>{' '}
              Register your interest now to be notified first.
            </p>
            <a
              href="/#contact" /* TODO: awaiting Rogers content — replace with actual booking URL */
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                background: 'linear-gradient(135deg, #f72585, #7209b7)',
                color: '#ffffff', fontWeight: 700, fontSize: '1rem',
                padding: '14px 32px', borderRadius: '999px', textDecoration: 'none',
                boxShadow: '0 8px 28px rgba(247,37,133,0.3)', letterSpacing: '0.02em',
                fontFamily: hl,
              }}
            >
              Register Your Interest — It&apos;s Free
            </a>
            <p style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.3)', fontFamily: hl }}>
              No commitment · No payment · Just your name and program preference
            </p>
          </motion.div>

        </div>
      </section>

      {/* SCRIPTURE DIVIDER + WAVE */}
      <ScriptureDivider
        verse="Iron sharpens iron, and one man sharpens another."
        citation="Proverbs 27:17"
      />
      <WaveDivider fromColor="#0d0120" toColor={purple} />

      <SectionDivider />

      {/* ══ 5. TESTIMONIALS ══════════════════════════════════════════════════ */}
      <section className="section-premium" style={{ background: purple }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 2rem' }}>
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            style={{ textAlign: 'center', marginBottom: 48 }}
          >
            <SquareBars color={pink} />
            <p style={{ color: 'rgba(255,255,255,0.50)', fontFamily: hl, fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: 12, lineHeight: 1 }}>
              Transformation Stories
            </p>
            <h2 style={{ color: '#ffffff', fontFamily: hl, fontSize: 'clamp(2rem, 3.5vw, 2.6rem)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.1, margin: 0 }}>
              Lives changed. Missions activated.
            </h2>
          </motion.div>

          <div className="testimonials-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24, marginBottom: 36 }}>
            {TESTIMONIALS.map((t, i) => (
              <motion.div
                key={i}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-80px' }}
                style={{
                  padding: '2rem',
                  position: 'relative',
                  background: 'rgba(255,255,255,0.08)',
                  borderLeft: '3px solid rgba(247,37,133,0.55)',
                  borderRadius: 16,
                  border: '1px solid rgba(255,255,255,0.10)',
                  borderLeftWidth: 3,
                  borderLeftColor: 'rgba(247,37,133,0.55)',
                }}
              >
                {/* Faint serif quote icon */}
                <p style={{ color: 'rgba(247,37,133,0.20)', fontFamily: 'Georgia, serif', fontSize: '4rem', lineHeight: 0.8, marginBottom: 16 }}>&ldquo;</p>
                <p style={{ color: 'rgba(255,255,255,0.85)', fontFamily: 'Georgia, serif', fontStyle: 'italic', fontSize: '1.05rem', lineHeight: 1.8, marginBottom: 24 }}>
                  {t.quote}
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, borderTop: '1px solid rgba(255,255,255,0.10)', paddingTop: 16 }}>
                  <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'rgba(247,37,133,0.18)', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15, fontWeight: 700, color: pink, fontFamily: hl }}>
                    {t.name[0]}
                  </div>
                  <div>
                    <p style={{ color: '#7b90f3', fontFamily: hl, fontWeight: 700, fontSize: 14, margin: '0 0 2px' }}>{t.name}</p>
                    <p style={{ color: 'rgba(255,255,255,0.45)', fontFamily: hl, fontSize: '0.8rem', margin: 0 }}>{t.city} · {t.program}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            style={{ textAlign: 'center' }}
          >
            <Link
              href="/testimonials"
              style={{ color: 'rgba(255,255,255,0.70)', fontFamily: hl, fontWeight: 600, fontSize: '0.9rem', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 6 }}
            >
              See all transformation stories <span>→</span>
            </Link>
          </motion.div>
        </div>
      </section>

      <SectionDivider />

      {/* ══ 6. EVENTS ════════════════════════════════════════════════════════ */}
      <section id="events" className="section-premium" style={{ background: '#0d0120' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 2rem' }}>
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            style={{ textAlign: 'center', marginBottom: 52 }}
          >
            <SquareBars color={sky} />
            <p style={{ color: '#7b90f3', fontFamily: hl, fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: 12, lineHeight: 1 }}>
              Upcoming Events
            </p>
            <h2 style={{ color: '#ffffff', fontFamily: hl, fontSize: 'clamp(2rem, 3.5vw, 2.6rem)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.1, margin: 0 }}>
              The next gathering is forming.
            </h2>
          </motion.div>

          <div className="events-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
            {EVENTS.map((ev, i) => (
              <motion.div
                key={ev.name}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-80px' }}
                style={{ padding: '2rem', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 16, transition: 'border-color 0.25s ease' }}
              >
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
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* ══ 7. LEAD MAGNET ═══════════════════════════════════════════════════ */}
      <section className="section-premium" style={{ background: '#ffffff' }}>
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <div style={{ maxWidth: 680, margin: '0 auto', textAlign: 'center', padding: '0 2rem' }}>
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
              <div style={{ background: purple, borderRadius: 28, padding: '2.5rem' }}>
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
                  style={{ flex: 1, minWidth: 200, padding: '16px 20px', border: '1px solid rgba(58,12,163,0.18)', borderRadius: '999px', fontSize: 14, outline: 'none', background: '#fff', color: purple, fontFamily: hl }}
                />
                <button
                  type="submit"
                  className="btn-premium"
                  style={{ background: pink, color: '#fff', padding: '16px 28px', borderRadius: '999px', fontSize: 14, fontFamily: hl, fontWeight: 700, border: 'none', cursor: 'pointer', whiteSpace: 'nowrap', boxShadow: '0 4px 18px rgba(247,37,133,0.35)' }}
                >
                  Send My Guide
                </button>
              </form>
            )}
            <p style={{ color: '#888', fontFamily: hl, fontSize: 12, marginTop: 12 }}>No spam. Unsubscribe any time.</p>
          </div>
        </motion.div>
      </section>

      {/* WAVE: Lead Magnet → Community */}
      <WaveDivider fromColor="#ffffff" toColor={`linear-gradient(135deg, ${purple}, ${sky})`} />

      <SectionDivider />

      {/* ══ 8. COMMUNITY ═════════════════════════════════════════════════════ */}
      <section id="community" className="section-premium" style={{ background: `linear-gradient(135deg, ${purple} 0%, ${sky} 100%)`, textAlign: 'center' }}>
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <div style={{ maxWidth: 680, margin: '0 auto', padding: '0 2rem' }}>
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
              className="btn-premium"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 10,
                background: '#25D366', color: '#fff',
                padding: '16px 36px', borderRadius: '999px',
                fontFamily: hl, fontWeight: 700, fontSize: '1rem',
                textDecoration: 'none',
                boxShadow: '0 4px 24px rgba(37,211,102,0.35)',
              }}
            >
              <span style={{ fontSize: 20 }}>💬</span>
              Join the Movement
            </a>
          </div>
        </motion.div>
      </section>

      <SectionDivider />

      {/* ══ 9. COACHING INQUIRY ══════════════════════════════════════════════ */}
      <section id="coaching" className="section-premium" style={{ background: '#f8f7ff' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto', padding: '0 2rem' }}>
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            style={{ textAlign: 'center', marginBottom: 48 }}
          >
            <SquareBars color={purple} />
            <p style={{ color: purple, fontFamily: hl, fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: 12, lineHeight: 1 }}>
              Work With Rogers
            </p>
            <h2 style={{ color: purple, fontFamily: hl, fontSize: 'clamp(2rem, 3.5vw, 2.4rem)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.1, margin: 0 }}>
              Ready to go further?
            </h2>
          </motion.div>

          <div className="coaching-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
            <motion.div
              custom={0}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              className="card-editorial"
              style={{ padding: '2.5rem' }}
            >
              <div style={{ width: 48, height: 48, background: 'rgba(58,12,163,0.08)', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, marginBottom: 20 }}>🎯</div>
              <h3 style={{ color: purple, fontFamily: hl, fontWeight: 800, fontSize: 20, marginBottom: 12 }}>Personal Coaching</h3>
              <p style={{ color: '#4a4a6a', fontSize: 14, lineHeight: 1.8, margin: '0 0 24px', fontWeight: 300, maxWidth: 360 }}>
                1-on-1 coaching for leaders, entrepreneurs, and men of purpose. Break through your limitations and build the life you were designed for.
              </p>
              <a
                href="https://wa.me/237683493220?text=Hi%20Rogers%2C%20I%27m%20interested%20in%20personal%20coaching"
                target="_blank" rel="noopener noreferrer"
                className="btn-premium"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  background: purple, color: '#fff',
                  padding: '14px 24px', borderRadius: '999px',
                  fontFamily: hl, fontWeight: 700, fontSize: 13, textDecoration: 'none',
                  boxShadow: '0 4px 16px rgba(58,12,163,0.25)',
                }}
              >
                Apply via WhatsApp →
              </a>
            </motion.div>

            <motion.div
              custom={1}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              className="card-editorial"
              style={{ padding: '2.5rem' }}
            >
              <div style={{ width: 48, height: 48, background: 'rgba(247,37,133,0.08)', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, marginBottom: 20 }}>🎙️</div>
              <h3 style={{ color: purple, fontFamily: hl, fontWeight: 800, fontSize: 20, marginBottom: 12 }}>Speaking &amp; Events</h3>
              <p style={{ color: '#4a4a6a', fontSize: 14, lineHeight: 1.8, margin: '0 0 24px', fontWeight: 300, maxWidth: 360 }}>
                Invite Rogers to speak at your conference, corporate event, or church gathering. A transformational voice for any platform of purpose.
              </p>
              <a
                href="https://wa.me/237683493220?text=Hi%20Rogers%2C%20I%27d%20like%20to%20invite%20you%20to%20speak%20at%20my%20event"
                target="_blank" rel="noopener noreferrer"
                className="btn-premium"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  background: pink, color: '#fff',
                  padding: '14px 24px', borderRadius: '999px',
                  fontFamily: hl, fontWeight: 700, fontSize: 13, textDecoration: 'none',
                  boxShadow: '0 4px 16px rgba(247,37,133,0.25)',
                }}
              >
                Inquire via WhatsApp →
              </a>
            </motion.div>
          </div>
        </div>
      </section>

    </main>
  )
}
