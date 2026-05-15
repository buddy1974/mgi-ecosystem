'use client'

import { useState } from 'react'
import { SquareBars } from '@/components/SquareBars'
import { WaveDivider } from '@/components/WaveDivider'

const hl     = "var(--font-headline, 'Nunito', system-ui, sans-serif)"
const serif  = "Georgia, 'Times New Roman', serif"
const purple = '#3a0ca3'
const pink   = '#f72585'
const sky    = '#4361ee'

const PROFILES = [
  {
    icon: '🏢',
    title: 'The Executive',
    desc: "You lead a company or organization. The strategy is clear. The culture is struggling. You want your leadership to come from conviction, not pressure.", // TODO: real coaching profile
  },
  {
    icon: '🚀',
    title: 'The Entrepreneur',
    desc: "You are building something. The market is uncertain. You want your faith to be the architecture of your business — not just a background value.", // TODO: real coaching profile
  },
  {
    icon: '⛪',
    title: 'The Ministry Leader',
    desc: "You lead a church, ministry, or faith organization. You are growing. You need someone who has walked this road and can help you avoid the pitfalls.", // TODO: real coaching profile
  },
]

const STEPS = [
  {
    num: '01',
    title: 'Application',
    desc: "Submit your application below. We review within 72 hours.", // TODO: confirm with Rogers
  },
  {
    num: '02',
    title: 'Discovery Call',
    desc: "Rogers speaks with you directly for 30 minutes. This is not a sales call. It is a mutual assessment — Rogers needs to know you are ready.", // TODO: confirm
  },
  {
    num: '03',
    title: 'Engagement Begins',
    desc: "If accepted, your engagement starts within 2 weeks.", // TODO: confirm timeline
  },
  {
    num: '04',
    title: 'Monthly Sessions',
    desc: "Sessions over [X] months. Between-session work and accountability structured around your specific situation.", // TODO: confirm format with Rogers
  },
  {
    num: '05',
    title: 'Graduation + Continued Connection',
    desc: "Coaching graduates are invited into Rogers' inner circle of leaders for ongoing access and community.", // TODO: confirm
  },
]

export default function CoachingPage() {
  const [form, setForm] = useState({
    name: '', email: '', phone: '', country: '',
    role: '', building: '', challenge: '', whyNow: '',
    source: 'conference',
  })
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    // TODO Phase 39: wire to n8n → email Rogers + auto-reply to applicant
    console.log('Coaching application:', form)
    setSubmitted(true)
  }

  return (
    <main style={{ background: '#0d0120', fontFamily: hl, paddingTop: 76 }}>
      <style>{`
        @media (max-width: 768px) {
          .coach-profiles { grid-template-columns: 1fr !important; }
          .coach-steps    { grid-template-columns: 1fr !important; }
        }
      `}</style>

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section style={{
        background: `linear-gradient(150deg, #0a0120 0%, ${purple} 60%, #1a0a50 100%)`,
        padding: '80px 2rem 72px', textAlign: 'center',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 60% 40%, rgba(247,37,133,0.08) 0%, transparent 60%)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: 760, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }}>
            <SquareBars color={pink} />
          </div>
          <p style={{ color: pink, fontFamily: hl, fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: 20 }}>
            1:1 Coaching · By Application Only
          </p>
          <h1 style={{ color: '#ffffff', fontFamily: serif, fontSize: 'clamp(2.2rem, 4.5vw, 3.8rem)', fontWeight: 400, letterSpacing: '0.02em', lineHeight: 1.15, marginBottom: 20 }}>
            {/* TODO: confirm headline with Rogers */}
            Coaching is not for everyone.<br />
            It&apos;s for the man who is serious<br />
            about what comes next.
          </h1>
          <div style={{ width: 56, height: 2, background: pink, margin: '0 auto 24px', opacity: 0.7 }} />
          <p style={{ color: 'rgba(255,255,255,0.70)', fontSize: 17, lineHeight: 1.8, maxWidth: 580, margin: '0 auto 36px', fontWeight: 300 }}>
            {/* TODO: confirm subheadline */}
            Rogers works with a small number of executives, entrepreneurs, and ministry leaders each year in a coaching engagement. If you are ready to go deeper, this is where that begins.
          </p>
          <a href="#apply" style={{ background: pink, color: '#fff', padding: '15px 40px', borderRadius: 8, fontFamily: hl, fontWeight: 700, fontSize: '1rem', textDecoration: 'none', display: 'inline-block', boxShadow: '0 6px 28px rgba(247,37,133,0.38)' }}>
            Apply for Coaching
          </a>
        </div>
      </section>

      <WaveDivider fromColor={purple} toColor="#f8f7ff" />

      {/* ── WHAT COACHING IS ─────────────────────────────────────────────── */}
      <section style={{ background: '#f8f7ff', padding: '5rem 2rem' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem' }}>
          <div>
            <SquareBars color={purple} />
            <h2 style={{ color: purple, fontFamily: hl, fontSize: 'clamp(1.8rem, 3vw, 2.2rem)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: 28 }}>
              Coaching with Rogers is...
            </h2>
            {[
              'A structured engagement over 3–6 months', // TODO: confirm format
              'Monthly 1:1 sessions + between-session accountability',
              'Deep work on the intersection of faith, leadership, and enterprise',
              'Honest, direct, and built around your specific situation',
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', marginBottom: 16 }}>
                <span style={{ color: pink, fontSize: 18, flexShrink: 0, marginTop: 2 }}>✓</span>
                <p style={{ color: '#1a1a2e', fontSize: 15, lineHeight: 1.75, margin: 0 }}>{item}</p>
              </div>
            ))}
          </div>
          <div>
            <SquareBars color="#d1d5db" />
            <h2 style={{ color: '#6b7280', fontFamily: hl, fontSize: 'clamp(1.8rem, 3vw, 2.2rem)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: 28 }}>
              What coaching is not...
            </h2>
            {[
              'A counseling or therapy service',
              'A business consulting engagement',
              'A motivational coaching program',
              'A group cohort (for that, see Men On Duty or CEO On Mission)',
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', marginBottom: 16 }}>
                <span style={{ color: '#9ca3af', fontSize: 16, flexShrink: 0, marginTop: 4 }}>—</span>
                <p style={{ color: '#6b7280', fontSize: 15, lineHeight: 1.75, margin: 0 }}>{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <WaveDivider fromColor="#f8f7ff" toColor={purple} />

      {/* ── WHO ROGERS COACHES ────────────────────────────────────────────── */}
      <section style={{ background: purple, padding: '5rem 2rem' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <SquareBars color={pink} />
            <p style={{ color: 'rgba(255,255,255,0.50)', fontFamily: hl, fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: 12 }}>Who Rogers Coaches</p>
            <h2 style={{ color: '#ffffff', fontFamily: hl, fontSize: 'clamp(2rem, 3.5vw, 2.4rem)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.1, margin: 0 }}>
              Three profiles. One standard.
            </h2>
          </div>
          <div className="coach-profiles" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
            {PROFILES.map(p => (
              <div key={p.title} style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.10)', borderRadius: 16, padding: '2.5rem' }}>
                <div style={{ fontSize: 32, marginBottom: 16 }}>{p.icon}</div>
                <h3 style={{ color: '#ffffff', fontFamily: hl, fontWeight: 700, fontSize: 18, marginBottom: 12 }}>{p.title}</h3>
                <p style={{ color: 'rgba(255,255,255,0.70)', fontSize: 15, lineHeight: 1.8, margin: 0 }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <WaveDivider fromColor={purple} toColor="#f8f7ff" />

      {/* ── THE PROCESS ───────────────────────────────────────────────────── */}
      <section style={{ background: '#f8f7ff', padding: '5rem 2rem' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 52 }}>
            <SquareBars color={purple} />
            <p style={{ color: purple, fontFamily: hl, fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: 12 }}>The Process</p>
            <h2 style={{ color: purple, fontFamily: hl, fontSize: 'clamp(2rem, 3.5vw, 2.4rem)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.1, margin: 0 }}>
              How it works.
            </h2>
          </div>
          {STEPS.map((step, i) => (
            <div key={i} style={{ display: 'flex', gap: 32, padding: '2.5rem 0', borderBottom: '1px solid rgba(58,12,163,0.08)', alignItems: 'flex-start' }}>
              <div style={{ flexShrink: 0 }}>
                <p style={{ color: pink, fontFamily: hl, fontWeight: 800, fontSize: '2rem', lineHeight: 1, margin: 0, opacity: 0.6 }}>{step.num}</p>
              </div>
              <div>
                <h3 style={{ color: purple, fontFamily: hl, fontWeight: 700, fontSize: 18, marginBottom: 8 }}>{step.title}</h3>
                <p style={{ color: '#4a4a6a', fontSize: 15, lineHeight: 1.8, margin: 0 }}>{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <WaveDivider fromColor="#f8f7ff" toColor="#0d0120" />

      {/* ── APPLICATION FORM ──────────────────────────────────────────────── */}
      <section id="apply" style={{ background: '#0d0120', padding: '5rem 2rem' }}>
        <div style={{ maxWidth: 680, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 44 }}>
            <SquareBars color={pink} />
            <h2 style={{ color: '#ffffff', fontFamily: hl, fontSize: 'clamp(2rem, 3.5vw, 2.4rem)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: 12 }}>Apply for Coaching</h2>
            <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: 15, lineHeight: 1.8, margin: 0 }}>
              Complete every field. Rogers reads every application personally.
            </p>
          </div>

          {submitted ? (
            <div style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 16, padding: '3rem', textAlign: 'center' }}>
              <p style={{ fontSize: '2.5rem', marginBottom: 16 }}>🙏</p>
              <p style={{ color: '#ffffff', fontFamily: hl, fontWeight: 700, fontSize: 20, marginBottom: 8 }}>Application received.</p>
              <p style={{ color: 'rgba(255,255,255,0.60)', fontSize: 15, margin: 0 }}>
                {/* TODO: confirm response time with Rogers */}
                Rogers&apos; team will contact you within 72 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {[
                { key: 'name',    label: 'Full Name *',           type: 'text',  placeholder: 'Your full name'                 },
                { key: 'email',   label: 'Email *',               type: 'email', placeholder: 'your@email.com'                 },
                { key: 'phone',   label: 'Phone / WhatsApp *',    type: 'text',  placeholder: '+237 6XX XXX XXX'               },
                { key: 'country', label: 'Country *',             type: 'text',  placeholder: 'e.g. Cameroon'                  },
              ].map(f => (
                <div key={f.key}>
                  <label style={{ display: 'block', color: 'rgba(255,255,255,0.70)', fontFamily: hl, fontWeight: 600, fontSize: 13, marginBottom: 6 }}>{f.label}</label>
                  <input required type={f.type} placeholder={f.placeholder}
                    value={form[f.key as keyof typeof form] as string}
                    onChange={e => setForm(d => ({ ...d, [f.key]: e.target.value }))}
                    style={{ width: '100%', padding: '12px 16px', background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 8, color: '#ffffff', fontFamily: hl, fontSize: 14, outline: 'none', boxSizing: 'border-box' }}
                  />
                </div>
              ))}
              {[
                { key: 'role',      label: 'Your role / title / what you lead',               placeholder: 'CEO of XYZ Company, Pastor of ABC Church, etc.' },
                { key: 'building',  label: 'What are you currently working on or building?',  placeholder: 'Describe your current venture or project...' },
                { key: 'challenge', label: 'What is the primary challenge you face as a leader?', placeholder: 'Be specific. Rogers reads this to assess fit.' },
                { key: 'whyNow',    label: 'Why now? What makes this the right moment?',      placeholder: 'What has shifted that makes coaching the right step?' },
              ].map(f => (
                <div key={f.key}>
                  <label style={{ display: 'block', color: 'rgba(255,255,255,0.70)', fontFamily: hl, fontWeight: 600, fontSize: 13, marginBottom: 6 }}>{f.label}</label>
                  <textarea required rows={3} placeholder={f.placeholder}
                    value={form[f.key as keyof typeof form] as string}
                    onChange={e => setForm(d => ({ ...d, [f.key]: e.target.value }))}
                    style={{ width: '100%', padding: '12px 16px', background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 8, color: '#ffffff', fontFamily: hl, fontSize: 14, outline: 'none', resize: 'vertical', boxSizing: 'border-box' }}
                  />
                </div>
              ))}
              <div>
                <label style={{ display: 'block', color: 'rgba(255,255,255,0.70)', fontFamily: hl, fontWeight: 600, fontSize: 13, marginBottom: 6 }}>How did you hear about Rogers?</label>
                <select value={form.source} onChange={e => setForm(d => ({ ...d, source: e.target.value }))}
                  style={{ width: '100%', padding: '12px 16px', background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 8, color: '#ffffff', fontFamily: hl, fontSize: 14, outline: 'none', boxSizing: 'border-box' }}>
                  <option value="conference">Conference</option>
                  <option value="website">Website</option>
                  <option value="referral">Referral</option>
                  <option value="social">Social Media</option>
                </select>
              </div>
              <button type="submit" style={{ background: pink, color: '#fff', padding: '16px', borderRadius: 8, fontFamily: hl, fontWeight: 700, fontSize: '1rem', border: 'none', cursor: 'pointer', boxShadow: '0 6px 28px rgba(247,37,133,0.38)', marginTop: 8 }}>
                Submit Application
              </button>
            </form>
          )}
        </div>
      </section>

      {/* ── TESTIMONIAL PULL QUOTE ────────────────────────────────────────── */}
      <section style={{ background: purple, padding: '5rem 2rem', textAlign: 'center' }}>
        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          <p style={{ color: 'rgba(247,37,133,0.25)', fontFamily: serif, fontSize: '4rem', lineHeight: 0.8, marginBottom: 16 }}>&ldquo;</p>
          <blockquote style={{ fontFamily: serif, fontStyle: 'italic', color: 'rgba(255,255,255,0.85)', fontSize: 'clamp(1.2rem, 2.5vw, 1.7rem)', lineHeight: 1.65, fontWeight: 400, margin: '0 0 24px' }}>
            {/* TODO: replace with real coaching client testimonial */}
            CEO On Mission gave me the language for something I had been living but couldn&apos;t articulate. Coaching with Rogers went deeper. It changed how I wake up.
          </blockquote>
          <p style={{ color: '#7b90f3', fontFamily: hl, fontWeight: 600, fontSize: 14, letterSpacing: '0.05em' }}>
            — Coaching Client, Yaoundé {/* TODO: real client name and program */}
          </p>
        </div>
      </section>
    </main>
  )
}
