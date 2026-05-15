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
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            style={{ textAlign: 'center', marginBottom: 56 }}
          >
            <SquareBars color={purple} />
            <p style={{ color: '#7b90f3', fontFamily: hl, fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: 12, lineHeight: 1 }}>
              Programs &amp; Initiatives
            </p>
            <h2 style={{ color: '#ffffff', fontFamily: hl, fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.1, margin: '0 auto', maxWidth: 480 }}>
              Choose your transformation.
            </h2>
          </motion.div>

          {/* Asymmetric grid — Dominion Life large + two stacked */}
          <div
            className="programs-asymmetric"
            style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 28 }}
          >
            {/* Large card — Dominion Life */}
            <motion.div
              className="card-premium"
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 24 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              style={{ overflow: 'hidden' }}
            >
              <Link href={PROGRAMS[0].href} style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', height: '100%', padding: '48px', minHeight: 340 }}>
                <div style={{ display: 'flex', marginBottom: 24 }}>
                  <div style={{ height: 4, width: 40, background: PROGRAMS[0].color, borderRadius: 2 }} />
                  <div style={{ height: 4, width: 28, background: pink, opacity: 0.5, borderRadius: 2, marginLeft: 4 }} />
                </div>
                <span style={{ background: 'rgba(58,12,163,0.18)', color: '#7b90f3', fontFamily: hl, fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', padding: '4px 12px', borderRadius: 4, display: 'inline-block', marginBottom: 20 }}>{PROGRAMS[0].tag}</span>
                <h3 style={{ color: '#ffffff', fontFamily: hl, fontWeight: 800, fontSize: 24, marginBottom: 16, letterSpacing: '-0.02em', lineHeight: 1.2 }}>{PROGRAMS[0].name}</h3>
                <p style={{ color: 'rgba(255,255,255,0.60)', fontSize: 15, lineHeight: 1.8, fontWeight: 300, flex: 1, marginBottom: 28 }}>{PROGRAMS[0].outcome}</p>
                <span style={{ color: pink, fontFamily: hl, fontSize: '0.9rem', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                  Secure your place <span style={{ fontSize: '1.1em' }}>→</span>
                </span>
              </Link>
            </motion.div>

            {/* Right stacked: Men On Duty + CEO On Mission */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
              {PROGRAMS.slice(1).map((p, idx) => (
                <motion.div
                  key={p.name}
                  className="card-premium"
                  whileInView={{ opacity: 1, y: 0 }}
                  initial={{ opacity: 0, y: 24 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.7, delay: 0.12 * (idx + 1), ease: [0.22, 1, 0.36, 1] }}
                  style={{ flex: 1, overflow: 'hidden' }}
                >
                  <Link href={p.href} style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', height: '100%', padding: '36px' }}>
                    <div style={{ display: 'flex', marginBottom: 16 }}>
                      <div style={{ height: 3, width: 32, background: p.color, borderRadius: 2 }} />
                      <div style={{ height: 3, width: 20, background: pink, opacity: 0.5, borderRadius: 2, marginLeft: 4 }} />
                    </div>
                    <span style={{ background: 'rgba(58,12,163,0.18)', color: '#7b90f3', fontFamily: hl, fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', padding: '3px 10px', borderRadius: 4, display: 'inline-block', marginBottom: 14 }}>{p.tag}</span>
                    <h3 style={{ color: '#ffffff', fontFamily: hl, fontWeight: 800, fontSize: 18, marginBottom: 10, letterSpacing: '-0.02em', lineHeight: 1.3 }}>{p.name}</h3>
                    <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: 14, lineHeight: 1.75, fontWeight: 300, flex: 1, marginBottom: 20 }}>{p.outcome}</p>
                    <span style={{ color: sky, fontFamily: hl, fontSize: '0.85rem', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: 5 }}>
                      Secure your place →
                    </span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
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
                className="card-premium"
                style={{ padding: '2rem', position: 'relative' }}
              >
                {/* Faint quote icon */}
                <div style={{ fontSize: 64, lineHeight: 1, opacity: 0.08, fontFamily: 'Georgia, serif', position: 'absolute', top: 16, left: 20, color: '#ffffff' }}>&ldquo;</div>
                <p style={{ color: 'rgba(255,255,255,0.80)', fontFamily: 'Georgia, serif', fontStyle: 'italic', fontSize: '1.05rem', lineHeight: 1.8, marginBottom: 24, position: 'relative', zIndex: 1 }}>
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: 16 }}>
                  <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'rgba(255,255,255,0.12)', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, fontWeight: 700, color: '#ffffff', fontFamily: hl }}>
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
                className="card-premium"
                style={{ padding: '2rem' }}
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
              className="card-premium"
              style={{ padding: '2.5rem', background: '#ffffff' }}
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
              className="card-premium"
              style={{ padding: '2.5rem', background: '#ffffff' }}
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
