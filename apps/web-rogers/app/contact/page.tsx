'use client'

import { useState } from 'react'
import { SquareBars } from '@/components/SquareBars'
import { WaveDivider } from '@/components/WaveDivider'

const hl     = "var(--font-headline, 'Nunito', system-ui, sans-serif)"
const purple = '#3a0ca3'
const pink   = '#f72585'
const sky    = '#4361ee'

const PATHWAYS = [
  {
    icon: '💬',
    title: 'General Questions',
    desc: 'For questions about programs, registration, or anything else.',
    actions: [
      { label: 'WhatsApp', href: 'https://wa.me/237683493220', style: 'primary' }, // TODO: confirm number
      { label: 'Email',    href: 'mailto:info@rogersnforgwei.com', style: 'secondary' }, // TODO: confirm email
    ],
  },
  {
    icon: '🎤',
    title: 'Speaking Inquiries',
    desc: 'Rogers speaks at conferences, corporate events, churches, and leadership forums.',
    actions: [
      { label: 'Submit Speaking Inquiry', href: '#inquiry-form', style: 'primary' },
    ],
  },
  {
    icon: '📰',
    title: 'Media & Press',
    desc: 'For media features, interviews, podcast invitations, and press requests.',
    actions: [
      { label: 'Submit Media Inquiry', href: '#inquiry-form', style: 'primary' },
    ],
  },
]

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', type: 'general', message: '' })
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    // TODO Phase 39: wire to n8n
    console.log('Contact inquiry:', form)
    setSubmitted(true)
  }

  return (
    <main style={{ background: '#0d0120', fontFamily: hl, paddingTop: 76 }}>

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section style={{
        background: `linear-gradient(150deg, #0a0120 0%, ${purple} 60%, #1a0a50 100%)`,
        padding: '72px 2rem 64px', textAlign: 'center',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ maxWidth: 640, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }}>
            <SquareBars color={sky} />
          </div>
          <h1 style={{ color: '#ffffff', fontFamily: hl, fontSize: 'clamp(2.2rem, 4.5vw, 3.5rem)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: 20 }}>
            Let&apos;s connect.
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.70)', fontSize: 17, lineHeight: 1.8, maxWidth: 520, margin: '0 auto', fontWeight: 300 }}>
            Whether you have a question, a speaking inquiry, or just want to know where to start — this is the right place.
          </p>
        </div>
      </section>

      <WaveDivider fromColor={purple} toColor="#f8f7ff" />

      {/* ── THREE PATHWAYS ────────────────────────────────────────────────── */}
      <section style={{ background: '#f8f7ff', padding: '5rem 2rem' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <SquareBars color={purple} />
            <h2 style={{ color: purple, fontFamily: hl, fontSize: 'clamp(2rem, 3.5vw, 2.4rem)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.1, margin: 0 }}>
              How can we help?
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
            {PATHWAYS.map(p => (
              <div key={p.title} style={{ background: '#ffffff', borderRadius: 16, padding: '2.5rem', boxShadow: '0 2px 20px rgba(58,12,163,0.07)', display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div style={{ fontSize: 32 }}>{p.icon}</div>
                <h3 style={{ color: purple, fontFamily: hl, fontWeight: 800, fontSize: 18, margin: 0 }}>{p.title}</h3>
                <p style={{ color: '#4a4a6a', fontSize: 15, lineHeight: 1.75, margin: 0, flex: 1 }}>{p.desc}</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {p.actions.map(a => (
                    <a key={a.label} href={a.href}
                      target={a.href.startsWith('http') ? '_blank' : undefined}
                      rel={a.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      style={{
                        background: a.style === 'primary' ? pink : 'transparent',
                        border: a.style === 'secondary' ? `2px solid ${purple}` : 'none',
                        color: a.style === 'primary' ? '#fff' : purple,
                        padding: '11px 20px', borderRadius: 8,
                        fontFamily: hl, fontWeight: 700, fontSize: 13, textDecoration: 'none',
                        textAlign: 'center', display: 'block',
                        ...(a.style === 'primary' ? { boxShadow: '0 4px 16px rgba(247,37,133,0.25)' } : {}),
                      }}>
                      {a.label}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <WaveDivider fromColor="#f8f7ff" toColor="#0d0120" />

      {/* ── INQUIRY FORM ──────────────────────────────────────────────────── */}
      <section id="inquiry-form" style={{ background: '#0d0120', padding: '5rem 2rem' }}>
        <div style={{ maxWidth: 620, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <SquareBars color={sky} />
            <h2 style={{ color: '#ffffff', fontFamily: hl, fontSize: 'clamp(1.8rem, 3vw, 2.2rem)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: 12 }}>Send a Message</h2>
            <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: 15, lineHeight: 1.8, margin: 0 }}>
              We respond to all inquiries within 48 hours. {/* TODO: confirm response time */}
            </p>
          </div>

          {submitted ? (
            <div style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 16, padding: '3rem', textAlign: 'center' }}>
              <p style={{ fontSize: '2.5rem', marginBottom: 16 }}>✅</p>
              <p style={{ color: '#ffffff', fontFamily: hl, fontWeight: 700, fontSize: 20, marginBottom: 8 }}>Message sent.</p>
              <p style={{ color: 'rgba(255,255,255,0.60)', fontSize: 15, margin: 0 }}>We&apos;ll be in touch shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {[
                { key: 'name',  label: 'Full Name *',   type: 'text',  placeholder: 'Your full name'     },
                { key: 'email', label: 'Email *',        type: 'email', placeholder: 'your@email.com'    },
                { key: 'phone', label: 'Phone (optional)', type: 'text', placeholder: '+237 6XX XXX XXX' },
              ].map(f => (
                <div key={f.key}>
                  <label style={{ display: 'block', color: 'rgba(255,255,255,0.70)', fontFamily: hl, fontWeight: 600, fontSize: 13, marginBottom: 6 }}>{f.label}</label>
                  <input type={f.type} placeholder={f.placeholder}
                    required={f.label.includes('*')}
                    value={form[f.key as keyof typeof form] as string}
                    onChange={e => setForm(d => ({ ...d, [f.key]: e.target.value }))}
                    style={{ width: '100%', padding: '12px 16px', background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 8, color: '#ffffff', fontFamily: hl, fontSize: 14, outline: 'none', boxSizing: 'border-box' }}
                  />
                </div>
              ))}
              <div>
                <label style={{ display: 'block', color: 'rgba(255,255,255,0.70)', fontFamily: hl, fontWeight: 600, fontSize: 13, marginBottom: 6 }}>Type of Inquiry</label>
                <select value={form.type} onChange={e => setForm(d => ({ ...d, type: e.target.value }))}
                  style={{ width: '100%', padding: '12px 16px', background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 8, color: '#ffffff', fontFamily: hl, fontSize: 14, outline: 'none', boxSizing: 'border-box' }}>
                  <option value="general">General Question</option>
                  <option value="speaking">Speaking Inquiry</option>
                  <option value="media">Media / Press</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label style={{ display: 'block', color: 'rgba(255,255,255,0.70)', fontFamily: hl, fontWeight: 600, fontSize: 13, marginBottom: 6 }}>Message *</label>
                <textarea required rows={5} placeholder="What would you like to discuss?"
                  value={form.message} onChange={e => setForm(d => ({ ...d, message: e.target.value }))}
                  style={{ width: '100%', padding: '12px 16px', background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 8, color: '#ffffff', fontFamily: hl, fontSize: 14, outline: 'none', resize: 'vertical', boxSizing: 'border-box' }}
                />
              </div>
              <button type="submit" style={{ background: pink, color: '#fff', padding: '15px', borderRadius: 8, fontFamily: hl, fontWeight: 700, fontSize: '1rem', border: 'none', cursor: 'pointer', boxShadow: '0 6px 28px rgba(247,37,133,0.38)', marginTop: 8 }}>
                Send Message
              </button>
            </form>
          )}
        </div>
      </section>
    </main>
  )
}
