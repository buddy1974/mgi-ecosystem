'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

const purple = '#3a0ca3'
const pink   = '#f72585'
const sky    = '#4361ee'
const light  = '#f1f1f1'
const serif  = "Georgia, 'Times New Roman', serif"

type Program = 'All' | 'Dominion Life' | 'Men On Duty' | 'CEO On Mission'

interface Testimonial {
  id: string
  name: string
  city: string
  program: 'Dominion Life' | 'Men On Duty' | 'CEO On Mission'
  year: string
  quote: string
  highlight?: boolean
}

// TODO: ALL testimonials below are placeholder. Rogers to supply real names,
// quotes, and program categories. See ROGERSNFORGWEI_Content-Collection-Brief.docx
const TESTIMONIALS: Testimonial[] = [
  // DOMINION LIFE
  {
    id: '1',
    name: 'Emmanuel Kouassi',
    city: 'Douala',
    program: 'Dominion Life',
    year: '2023',
    quote: "I came skeptical. I left recalibrated. Rogers doesn't just speak — he gives you a framework for your whole life. I made decisions in 3 days that I had been avoiding for 3 years.",
    highlight: true,
  },
  {
    id: '2',
    name: 'Bernard Tchinda',
    city: 'Bafoussam',
    program: 'Dominion Life',
    year: '2024',
    quote: "The conference asked me the question I had been running from: who are you building this for? I had the answer by Saturday morning. My family felt it when I came home.",
  },
  {
    id: '3',
    name: 'Samuel Mbeki',
    city: 'Yaoundé',
    program: 'Dominion Life',
    year: '2023',
    quote: "I've attended many leadership events. Dominion Life is different because it does not try to inspire you. It tries to convict you — in the best possible way.",
  },
  // MEN ON DUTY
  {
    id: '4',
    name: 'Patrice Nganou',
    city: 'Douala',
    program: 'Men On Duty',
    year: '2024',
    quote: "Men On Duty taught me that duty is not a burden — it is a privilege. I stopped resenting my responsibilities at home and started seeing them as the arena where I prove who I am.",
    highlight: true,
  },
  {
    id: '5',
    name: 'Antoine Fouda',
    city: 'Buea',
    program: 'Men On Duty',
    year: '2023',
    quote: "My wife noticed the change before I did. That's how I knew it was real.",
  },
  {
    id: '6',
    name: 'Christian Awah',
    city: 'Limbe',
    program: 'Men On Duty',
    year: '2024',
    quote: "I was successful by most measures. But I was absent from the things that mattered. Men On Duty doesn't fix your schedule — it fixes your values. The schedule fixes itself.",
  },
  // CEO ON MISSION
  {
    id: '7',
    name: 'Daniel Mfoula',
    city: 'Yaoundé',
    program: 'CEO On Mission',
    year: '2024',
    quote: "CEO On Mission gave me language for something I had been living but couldn't articulate. My faith is not separate from my business. It is my competitive advantage.",
    highlight: true,
  },
  {
    id: '8',
    name: 'Richard Essomba',
    city: 'Douala',
    program: 'CEO On Mission',
    year: '2023',
    quote: "I came as an entrepreneur who goes to church. I left as a man who builds from conviction. Rogers helped me understand the difference — and it changed how I lead my team.",
  },
  {
    id: '9',
    name: 'Michel Ngassa',
    city: 'Abidjan',
    program: 'CEO On Mission',
    year: '2024',
    quote: "Three CEO coaching engagements and two mastermind programs before this. None of them integrated faith, family, and business the way Rogers does. It was the missing piece.",
  },
]

const FILTERS: { label: string; value: Program }[] = [
  { label: 'All Programs',     value: 'All'           },
  { label: 'Dominion Life',    value: 'Dominion Life' },
  { label: 'Men On Duty',      value: 'Men On Duty'   },
  { label: 'CEO On Mission',   value: 'CEO On Mission'},
]

function Initials({ name }: { name: string }) {
  const parts = name.trim().split(' ')
  const initials = parts.length >= 2
    ? `${parts[0][0]}${parts[parts.length - 1][0]}`
    : parts[0].slice(0, 2)
  return (
    <div style={{
      width: 40, height: 40, borderRadius: '50%',
      background: purple, color: '#fff',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: 13, fontWeight: 700, flexShrink: 0,
      letterSpacing: '0.05em',
    }}>
      {initials.toUpperCase()}
    </div>
  )
}

export function TestimonialsSection() {
  const [activeFilter, setActiveFilter] = useState<Program>('All')
  const [formData, setFormData] = useState({ name: '', program: 'Dominion Life', story: '' })
  const [formStatus, setFormStatus] = useState<'idle' | 'success'>('idle')

  const filtered = activeFilter === 'All'
    ? TESTIMONIALS
    : TESTIMONIALS.filter(t => t.program === activeFilter)

  const featured = activeFilter === 'All'
    ? TESTIMONIALS.find(t => t.program === 'Dominion Life' && t.highlight)
    : TESTIMONIALS.find(t => t.program === activeFilter && t.highlight)

  function handleFormSubmit(e: React.FormEvent) {
    e.preventDefault()
    // TODO Phase 39: wire to n8n or DB
    console.log('Story submission:', formData)
    setFormStatus('success')
  }

  return (
    <>
      <style>{`
        @media (max-width: 768px) {
          .test-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .test-video-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 540px) {
          .test-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      {/* ── Filter Bar ─────────────────────────────────────────────────────── */}
      <section style={{ background: '#fff', padding: '2rem', position: 'sticky', top: 70, zIndex: 10, borderBottom: '1px solid #f0f0f0', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
        <div style={{ maxWidth: 700, margin: '0 auto', display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
          {FILTERS.map(f => (
            <button
              key={f.value}
              onClick={() => setActiveFilter(f.value)}
              style={{
                padding: '9px 20px',
                borderRadius: 40,
                border: `2px solid ${purple}`,
                background: activeFilter === f.value ? purple : 'transparent',
                color: activeFilter === f.value ? '#fff' : purple,
                fontSize: 13,
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.15s',
                fontFamily: 'inherit',
              }}
            >
              {f.label}
            </button>
          ))}
        </div>
      </section>

      {/* ── Featured Highlight ─────────────────────────────────────────────── */}
      {featured && (
        <section style={{ background: purple, padding: '4rem 2rem', textAlign: 'center' }}>
          <div style={{ maxWidth: 760, margin: '0 auto' }}>
            <p style={{ color: 'rgba(255,255,255,0.2)', fontFamily: serif, fontSize: '4rem', lineHeight: 1, marginBottom: 8 }}>&ldquo;</p>
            <blockquote style={{ fontFamily: serif, fontStyle: 'italic', color: '#ffffff', fontSize: 'clamp(1.2rem, 2.5vw, 1.8rem)', lineHeight: 1.65, fontWeight: 400, margin: '0 0 28px' }}>
              {featured.quote}
            </blockquote>
            <p style={{ color: sky, fontSize: 13, fontWeight: 600, letterSpacing: '0.05em' }}>
              — {featured.name}, {featured.city} · {featured.program} {featured.year}
            </p>
          </div>
        </section>
      )}

      {/* ── Testimonials Grid ──────────────────────────────────────────────── */}
      <section style={{ background: light, padding: '5rem 2rem' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <p style={{ color: '#9ca3af', fontSize: 12, textAlign: 'center', marginBottom: 32, fontWeight: 500 }}>
            {filtered.length} {filtered.length === 1 ? 'story' : 'stories'}
            {activeFilter !== 'All' ? ` · ${activeFilter}` : ''}
          </p>
          <div
            className="test-grid"
            style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}
          >
            {filtered.map((t, index) => (
              <motion.div
                key={t.id}
                className="card-editorial"
                whileInView={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: 20 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
                style={{ padding: '36px', position: 'relative', display: 'flex', flexDirection: 'column' }}
              >
                {/* Large quote icon — very faint, editorial */}
                <div style={{ fontSize: 80, lineHeight: 0.8, opacity: 0.07, fontFamily: serif, position: 'absolute', top: 12, left: 18, color: purple }}>&ldquo;</div>

                {/* Quote text */}
                <p style={{ color: '#3a3a3a', fontFamily: serif, fontStyle: 'italic', fontSize: 15, lineHeight: 1.8, flex: 1, marginBottom: 24, position: 'relative', zIndex: 1 }}>
                  &ldquo;{t.quote}&rdquo;
                </p>

                {/* Profile row */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, borderTop: '1px solid rgba(58,12,163,0.07)', paddingTop: 16 }}>
                  <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'rgba(58,12,163,0.10)', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 700, color: purple }}>
                    {t.name[0]}
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 14, color: purple }}>{t.name}</div>
                    <div style={{ fontSize: 12, color: '#6b7280' }}>{t.city} · {t.program} · {t.year}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Video Testimonial Placeholders ────────────────────────────────── */}
      {/* TODO: replace placeholder cards with real YouTube embeds when Rogers provides video links */}
      <section style={{ background: '#111', padding: '5rem 2rem' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 44 }}>
            <p style={{ color: sky, fontSize: 11, fontWeight: 700, letterSpacing: '0.4em', textTransform: 'uppercase', marginBottom: 12 }}>
              Video Testimonials
            </p>
            <h2 style={{ color: '#ffffff', fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', fontWeight: 700, letterSpacing: '-0.02em', margin: 0 }}>
              Hear it directly.
            </h2>
          </div>
          <div
            className="test-video-grid"
            style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}
          >
            {[
              { caption: 'Rogers Nforgwei — Watch on YouTube', href: 'https://www.youtube.com/watch?v=yg7pQSnNMUY' },
              { caption: 'Patrice N. — Men On Duty 2024', href: null },    // TODO: Rogers to supply YouTube URL
              { caption: 'Daniel M. — CEO On Mission 2024', href: null },  // TODO: Rogers to supply YouTube URL
            ].map((v) => (
              v.href ? (
                <a key={v.caption} href={v.href} target="_blank" rel="noopener noreferrer" style={{ background: '#1a1a1a', borderRadius: 16, aspectRatio: '16/9', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12, border: `1px solid ${pink}`, cursor: 'pointer', textDecoration: 'none' }}>
                  <div style={{ width: 52, height: 52, borderRadius: '50%', background: 'rgba(247,37,133,0.25)', border: `2px solid ${pink}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ color: pink, fontSize: 20, marginLeft: 3 }}>▶</span>
                  </div>
                  <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 12, margin: 0, textAlign: 'center', padding: '0 12px' }}>{v.caption}</p>
                </a>
              ) : (
                <div key={v.caption} style={{ background: '#1a1a1a', borderRadius: 16, aspectRatio: '16/9', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12, border: '1px solid rgba(255,255,255,0.08)', cursor: 'not-allowed' }}>
                  <div style={{ width: 52, height: 52, borderRadius: '50%', background: 'rgba(247,37,133,0.15)', border: `2px solid ${pink}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ color: pink, fontSize: 20, marginLeft: 3 }}>▶</span>
                  </div>
                  <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: 12, margin: 0, textAlign: 'center', padding: '0 12px' }}>{v.caption}</p>
                </div>
              )
            ))}
          </div>
        </div>
      </section>

      {/* ── Submit Your Story ──────────────────────────────────────────────── */}
      <section style={{ background: light, padding: '5rem 2rem' }}>
        <div style={{ maxWidth: 520, margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ color: purple, fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 12 }}>
            Did you attend a program?
          </h2>
          <p style={{ color: '#6b7280', fontSize: 15, lineHeight: 1.75, marginBottom: 36 }}>
            Share what happened. Your story becomes someone else&apos;s first step.
          </p>

          {formStatus === 'success' ? (
            <div style={{ background: '#fff', borderRadius: 16, padding: '2.5rem', boxShadow: '0 2px 20px rgba(58,12,163,0.08)' }}>
              <p style={{ fontSize: '2.5rem', marginBottom: 12 }}>🙏</p>
              <p style={{ color: purple, fontWeight: 700, fontSize: 18, marginBottom: 8 }}>Thank you for sharing.</p>
              <p style={{ color: '#6b7280', fontSize: 14 }}>Your story is in good hands. We&apos;ll be in touch.</p>
            </div>
          ) : (
            <form onSubmit={handleFormSubmit} style={{ background: '#fff', borderRadius: 16, padding: '2.5rem', boxShadow: '0 2px 20px rgba(58,12,163,0.08)', display: 'flex', flexDirection: 'column', gap: 16, textAlign: 'left' }}>
              <div>
                <label style={{ display: 'block', color: '#374151', fontWeight: 600, fontSize: 13, marginBottom: 6 }}>Your Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={e => setFormData(d => ({ ...d, name: e.target.value }))}
                  placeholder="e.g. Jean-Marc Atangana"
                  style={{ width: '100%', padding: '11px 14px', border: '1.5px solid #e5e7eb', borderRadius: 8, fontSize: 14, boxSizing: 'border-box', outline: 'none', fontFamily: 'inherit' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', color: '#374151', fontWeight: 600, fontSize: 13, marginBottom: 6 }}>Program Attended</label>
                <select
                  value={formData.program}
                  onChange={e => setFormData(d => ({ ...d, program: e.target.value }))}
                  style={{ width: '100%', padding: '11px 14px', border: '1.5px solid #e5e7eb', borderRadius: 8, fontSize: 14, background: '#fff', boxSizing: 'border-box', fontFamily: 'inherit' }}
                >
                  <option>Dominion Life</option>
                  <option>Men On Duty</option>
                  <option>CEO On Mission</option>
                </select>
              </div>
              <div>
                <label style={{ display: 'block', color: '#374151', fontWeight: 600, fontSize: 13, marginBottom: 6 }}>Your Story</label>
                <textarea
                  required
                  rows={4}
                  value={formData.story}
                  onChange={e => setFormData(d => ({ ...d, story: e.target.value }))}
                  placeholder="What happened? What changed? How do you describe the experience to someone who hasn't been yet?"
                  style={{ width: '100%', padding: '11px 14px', border: '1.5px solid #e5e7eb', borderRadius: 8, fontSize: 14, resize: 'vertical', boxSizing: 'border-box', outline: 'none', fontFamily: 'inherit' }}
                />
              </div>
              <button
                type="submit"
                style={{ background: pink, color: '#fff', border: 'none', padding: '14px', borderRadius: 10, fontSize: 15, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}
              >
                Share My Story
              </button>
            </form>
          )}
        </div>
      </section>

      {/* ── CTA Strip ──────────────────────────────────────────────────────── */}
      <section style={{ background: pink, padding: '5rem 2rem', textAlign: 'center' }}>
        <div style={{ maxWidth: 560, margin: '0 auto' }}>
          <h2 style={{ color: '#ffffff', fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 14 }}>
            Their story can be yours.
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.82)', fontSize: 16, lineHeight: 1.75, marginBottom: 32, fontWeight: 300 }}>
            Choose your program. Reserve your seat.
          </p>
          <Link href="/#programs" style={{ display: 'inline-block', background: '#ffffff', color: pink, padding: '15px 40px', borderRadius: 10, fontSize: 14, fontWeight: 700, textDecoration: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.15)' }}>
            Reserve Your Seat →
          </Link>
        </div>
      </section>
    </>
  )
}
