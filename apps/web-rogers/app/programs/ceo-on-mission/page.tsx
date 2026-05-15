import Link from 'next/link'
import RegisterButton from '@/components/RegisterButton'
import { SquareBars } from '@/components/SquareBars'
import { WaveDivider } from '@/components/WaveDivider'

const hl     = "var(--font-headline, 'Nunito', system-ui, sans-serif)"
const serif  = "Georgia, 'Times New Roman', serif"
const purple = '#3a0ca3'
const pink   = '#f72585'
const sky    = '#4361ee'
const indigo = '#312e81'

// TODO: replace all placeholder content with real content from Rogers' team

const TESTIMONIALS = [
  {
    quote: "CEO On Mission gave me language for something I had been living but couldn't articulate. My faith is not separate from my business. It is my competitive advantage.", // TODO: real testimonial
    name: 'Daniel Mfoula',
    city: 'Yaoundé',
    year: '2024',
  },
  {
    quote: "I came as an entrepreneur who goes to church. I left as a man who builds from conviction. Rogers helped me understand the difference — and it changed how I lead my team.", // TODO: real testimonial
    name: 'Richard Essomba',
    city: 'Douala',
    year: '2023',
  },
  {
    quote: "Three CEO coaching engagements and two mastermind programs before this. None of them integrated faith, family, and business the way Rogers does. It was the missing piece.", // TODO: real testimonial
    name: 'Michel Ngassa',
    city: 'Abidjan',
    year: '2024',
  },
]

const SCHEDULE = [
  {
    day: 'Day 1', theme: 'Mission', subtitle: 'Why are you really doing this?',
    points: [
      'The CEO On Mission framework — 5 principles of conviction-led enterprise', // TODO: confirm framework name
      'Personal mission workshop — each executive builds their statement',
      'Evening: roundtable dinner — 6 executives per table with Rogers rotating',
    ],
  },
  {
    day: 'Day 2', theme: 'Execution', subtitle: 'How does conviction show up at 9am on a Monday?',
    points: [
      'Culture, people, and legacy — the three CEO decisions that define your company',
      'Case study presentations — each executive presents one real challenge',
      'Peer commitments + accountability structure activation',
    ],
  },
]

const FAQ = [
  {
    q: 'What is the difference between CEO On Mission and Dominion Life?',
    a: 'Dominion Life is a broad men\'s leadership conference. CEO On Mission is specifically for executives and entrepreneurs — it assumes you are already leading an organization and addresses the intersection of faith and enterprise at that level.',
  },
  {
    q: 'Do I need to have a large company to attend?',
    a: 'No. CEO On Mission welcomes founders of early-stage startups, mid-size business owners, and large company executives. What matters is that you are leading something and that your faith conviction is real.',
  },
  {
    q: 'Is there a vetting process?',
    a: 'Yes — to keep the cohort focused, we review all registrations and may reach out before confirming your seat. // TODO: confirm with Rogers if this is the approach',
  },
  {
    q: 'Is there a way to work with Rogers beyond this intensive?',
    a: 'Yes. CEO On Mission graduates are invited to apply for Rogers\' coaching program. See the /coaching page for details.',
  },
  {
    q: 'What does 50,000 XAF include?', // TODO: confirm price
    a: 'Both days of the intensive, all meals during the program, materials and workbook, and access to the CEO On Mission alumni network. Travel and accommodation are separate. // TODO: confirm inclusions with Rogers',
  },
]

export default function CEOOnMissionPage() {
  return (
    <main style={{ background: '#0d0120', fontFamily: hl, paddingTop: 76 }}>
      <style>{`
        @media (max-width: 768px) {
          .prog-grid-2 { grid-template-columns: 1fr !important; }
          .prog-grid-3 { grid-template-columns: 1fr !important; }
          .prog-stat-row { flex-wrap: wrap !important; gap: 24px !important; }
          .prog-ctas { flex-direction: column !important; align-items: flex-start !important; }
        }
      `}</style>

      {/* ── 1. HERO ──────────────────────────────────────────────────────── */}
      <section style={{
        background: `linear-gradient(150deg, #0a0120 0%, ${purple} 45%, ${indigo} 100%)`,
        padding: '80px 2rem 72px', textAlign: 'center',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 40%, rgba(49,46,129,0.30) 0%, transparent 60%)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: 820, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }}>
            <SquareBars color={sky} />
          </div>
          <p style={{ color: sky, fontFamily: hl, fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: 20 }}>
            CEO On Mission · Executive Mentorship Program {/* TODO: confirm label */}
          </p>
          <h1 style={{ color: '#ffffff', fontFamily: serif, fontSize: 'clamp(2.4rem, 5vw, 4.2rem)', fontWeight: 400, letterSpacing: '0.02em', lineHeight: 1.1, marginBottom: 24 }}>
            {/* TODO: replace with real headline from Rogers */}
            You built something.<br />Now let&apos;s make sure it&apos;s built on something that lasts.
          </h1>
          <div style={{ width: 60, height: 2, background: pink, margin: '0 auto 24px', opacity: 0.7 }} />
          <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: 18, lineHeight: 1.8, maxWidth: 600, margin: '0 auto 36px', fontWeight: 300 }}>
            {/* TODO: confirm subheadline */}
            For executives and entrepreneurs who lead organizations but feel the tension between their business ambitions and their deeper convictions. This is where that tension becomes your competitive advantage.
          </p>
          <div className="prog-stat-row" style={{ display: 'flex', gap: 32, justifyContent: 'center', marginBottom: 40 }}>
            {[
              { label: 'Duration',    value: '2 Days'          }, // TODO: confirm
              { label: 'Next Date',   value: 'Q4 2026 (TBA)'  }, // TODO: real date
              { label: 'Cohort Size', value: '30 Executives'  }, // TODO: confirm
            ].map(s => (
              <div key={s.label} style={{ textAlign: 'center' }}>
                <p style={{ color: '#ffffff', fontFamily: hl, fontWeight: 700, fontSize: '1.2rem', lineHeight: 1, marginBottom: 4 }}>{s.value}</p>
                <p style={{ color: 'rgba(255,255,255,0.50)', fontFamily: hl, fontSize: '0.72rem', letterSpacing: '0.12em', textTransform: 'uppercase', margin: 0 }}>{s.label}</p>
              </div>
            ))}
          </div>
          <div className="prog-ctas" style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="#registration" style={{ background: pink, color: '#fff', padding: '15px 40px', borderRadius: 8, fontFamily: hl, fontWeight: 700, fontSize: '1rem', textDecoration: 'none', boxShadow: '0 6px 28px rgba(247,37,133,0.38)' }}>
              Reserve Your Seat
            </a>
            <a href="#schedule" style={{ border: '2px solid rgba(67,97,238,0.6)', color: 'rgba(255,255,255,0.85)', background: 'rgba(67,97,238,0.08)', padding: '13px 36px', borderRadius: 8, fontFamily: hl, fontWeight: 600, fontSize: '0.95rem', textDecoration: 'none' }}>
              Explore Schedule
            </a>
          </div>
        </div>
      </section>

      {/* ── 2. SOCIAL PROOF BAR ──────────────────────────────────────────── */}
      <section style={{ background: '#0d0120', padding: '3rem 2rem', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', display: 'flex', justifyContent: 'center', gap: 0, alignItems: 'center', flexWrap: 'wrap' }}>
          {[
            { value: '100+', label: 'Executives Mentored'     }, // TODO: real number
            { value: '6',    label: 'Countries Represented'   }, // TODO: real number
            { value: '3',    label: 'Intensives Completed'    }, // TODO: real number
          ].map((m, i) => (
            <div key={m.label} style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{ textAlign: 'center', padding: '0 40px' }}>
                <p style={{ fontFamily: hl, fontWeight: 800, fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', color: '#ffffff', lineHeight: 1, marginBottom: 6 }}>{m.value}</p>
                <p style={{ fontFamily: hl, fontSize: '0.72rem', color: 'rgba(255,255,255,0.50)', letterSpacing: '0.10em', textTransform: 'uppercase', margin: 0 }}>{m.label}</p>
              </div>
              {i < 2 && <div style={{ width: 1, height: 40, background: pink, opacity: 0.3 }} />}
            </div>
          ))}
        </div>
      </section>

      <WaveDivider fromColor="#0d0120" toColor="#f8f7ff" />

      {/* ── 3. TRANSFORMATION PROMISE ────────────────────────────────────── */}
      <section style={{ background: '#f8f7ff', padding: '5rem 2rem' }}>
        <div className="prog-grid-2" style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'start' }}>
          <div>
            <SquareBars color={sky} />
            <p style={{ color: sky, fontFamily: hl, fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: 12 }}>What Changes</p>
            <h2 style={{ color: purple, fontFamily: hl, fontSize: 'clamp(2rem, 3.5vw, 2.6rem)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: 24 }}>What you leave with.</h2>
            <p style={{ color: '#1a1a2e', fontSize: '1.1rem', lineHeight: 1.8, maxWidth: 480, fontWeight: 300 }}>
              {/* TODO: replace with real transformation promise from Rogers */}
              CEO On Mission is an intensive for leaders who have already achieved. The question it answers is not &ldquo;how do I succeed?&rdquo; but &ldquo;what am I building, and why?&rdquo; Over two days, Rogers works through the frameworks he has refined over 12 years of coaching executives at the intersection of faith, leadership, and enterprise.
            </p>
          </div>
          <div style={{ paddingTop: 16 }}>
            {[
              'A Mission Statement for your enterprise that integrates your faith conviction, not just your business logic', // TODO: real outcome
              'Clarity on the 3 decisions every CEO must make about culture, people, and legacy',                           // TODO: real outcome
              'A peer group of executives who lead from the same conviction — your ongoing strategic circle',               // TODO: real outcome
              "Rogers' personal assessment of your leadership gaps and strengths",                                          // TODO: real outcome
            ].map((outcome, i) => (
              <div key={i} style={{ display: 'flex', gap: 14, alignItems: 'flex-start', marginBottom: 20 }}>
                <span style={{ color: pink, fontSize: 18, flexShrink: 0, marginTop: 2 }}>✓</span>
                <p style={{ color: '#1a1a2e', fontSize: 15, lineHeight: 1.75, margin: 0 }}>{outcome}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. WHO IT'S FOR ──────────────────────────────────────────────── */}
      <section style={{ background: '#ffffff', padding: '5rem 2rem' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <SquareBars color={purple} />
            <h2 style={{ color: purple, fontFamily: hl, fontSize: 'clamp(2rem, 3.5vw, 2.4rem)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.1 }}>Is this for you?</h2>
          </div>
          <div className="prog-grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem' }}>
            <div style={{ background: '#f8f7ff', borderRadius: 16, padding: '2.5rem', borderTop: `4px solid ${purple}` }}>
              <h3 style={{ color: purple, fontFamily: hl, fontWeight: 800, fontSize: 18, marginBottom: 24 }}>This is for you if...</h3>
              {[
                'You are a founder, CEO, or senior executive who leads from faith',               // TODO: confirm
                'You feel the tension between ambition and calling',                               // TODO: confirm
                'You want your company to mean something beyond revenue',                          // TODO: confirm
                'You have tried secular leadership programs and found them incomplete',            // TODO: confirm
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', marginBottom: 14 }}>
                  <span style={{ color: purple, fontSize: 16, flexShrink: 0, marginTop: 2 }}>—</span>
                  <p style={{ color: '#1a1a2e', fontSize: 15, lineHeight: 1.7, margin: 0 }}>{item}</p>
                </div>
              ))}
            </div>
            <div style={{ background: '#fafafa', borderRadius: 16, padding: '2.5rem', borderTop: '4px solid #d1d5db' }}>
              <h3 style={{ color: '#6b7280', fontFamily: hl, fontWeight: 800, fontSize: 18, marginBottom: 24 }}>This is not for you if...</h3>
              {[
                'You are looking for business tactics, marketing strategies, or financial frameworks',       // TODO: confirm
                'You are not willing to examine the spiritual foundation of your leadership',                // TODO: confirm
                'You are not yet leading anything — Dominion Life or Men On Duty may be better first steps', // TODO: confirm
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', marginBottom: 14 }}>
                  <span style={{ color: '#9ca3af', fontSize: 16, flexShrink: 0, marginTop: 2 }}>—</span>
                  <p style={{ color: '#6b7280', fontSize: 15, lineHeight: 1.7, margin: 0 }}>{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <WaveDivider fromColor="#ffffff" toColor="#f8f7ff" />

      {/* ── 5. SCHEDULE ──────────────────────────────────────────────────── */}
      <section id="schedule" style={{ background: '#f8f7ff', padding: '5rem 2rem' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <SquareBars color={purple} />
            <p style={{ color: purple, fontFamily: hl, fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: 12 }}>The Experience</p>
            <h2 style={{ color: purple, fontFamily: hl, fontSize: 'clamp(2rem, 3.5vw, 2.4rem)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.1, margin: 0 }}>
              Two days that shift how you lead.
            </h2>
          </div>
          {SCHEDULE.map((day, i) => (
            <div key={i} style={{ display: 'flex', gap: 32, padding: '2.5rem 0', borderBottom: '1px solid rgba(58,12,163,0.08)' }}>
              <div style={{ flexShrink: 0, width: 80 }}>
                <p style={{ color: pink, fontFamily: hl, fontWeight: 800, fontSize: '0.72rem', letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: 4 }}>{day.day}</p>
                <p style={{ color: purple, fontFamily: hl, fontWeight: 800, fontSize: 18, margin: 0 }}>{day.theme}</p>
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ color: '#4a4a6a', fontStyle: 'italic', fontSize: 15, marginBottom: 16 }}>{day.subtitle}</p>
                {day.points.map((pt, j) => (
                  <div key={j} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', marginBottom: 10 }}>
                    <span style={{ color: sky, fontSize: 14, flexShrink: 0, marginTop: 2 }}>·</span>
                    <p style={{ color: '#1a1a2e', fontSize: 14, lineHeight: 1.75, margin: 0 }}>{/* TODO: real schedule content */}{pt}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <WaveDivider fromColor="#f8f7ff" toColor={purple} />

      {/* ── 6. TESTIMONIALS ──────────────────────────────────────────────── */}
      <section style={{ background: purple, padding: '5rem 2rem' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 44 }}>
            <SquareBars color={pink} />
            <h2 style={{ color: '#ffffff', fontFamily: hl, fontSize: 'clamp(2rem, 3.5vw, 2.4rem)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.1, margin: 0 }}>
              What executives who attended say.
            </h2>
          </div>
          <div className="prog-grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
            {TESTIMONIALS.map((t, i) => (
              <div key={i} style={{ background: 'rgba(255,255,255,0.07)', borderLeft: `3px solid ${pink}`, borderRadius: 16, padding: '2rem', border: '1px solid rgba(255,255,255,0.10)', borderLeftWidth: 3, borderLeftColor: pink }}>
                <p style={{ color: 'rgba(247,37,133,0.25)', fontFamily: serif, fontSize: '3.5rem', lineHeight: 0.8, marginBottom: 12 }}>&ldquo;</p>
                <p style={{ color: 'rgba(255,255,255,0.80)', fontFamily: serif, fontStyle: 'italic', fontSize: '1.05rem', lineHeight: 1.8, marginBottom: 20 }}>{t.quote}</p>
                <div style={{ borderTop: '1px solid rgba(255,255,255,0.10)', paddingTop: 14 }}>
                  <p style={{ color: '#7b90f3', fontFamily: hl, fontWeight: 700, fontSize: 14, margin: '0 0 3px' }}>{t.name}</p>
                  <p style={{ color: 'rgba(255,255,255,0.45)', fontFamily: hl, fontSize: '0.8rem', margin: 0 }}>{t.city} · CEO On Mission {t.year}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <WaveDivider fromColor={purple} toColor="#ffffff" />

      {/* ── 7. FAQ ───────────────────────────────────────────────────────── */}
      <section style={{ background: '#ffffff', padding: '5rem 2rem' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 44 }}>
            <SquareBars color={purple} />
            <h2 style={{ color: purple, fontFamily: hl, fontSize: 'clamp(2rem, 3.5vw, 2.4rem)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.1, margin: 0 }}>
              Questions you probably have.
            </h2>
          </div>
          {FAQ.map((item, i) => (
            <div key={i} style={{ padding: '1.75rem 0', borderBottom: '1px solid #f0f0f0' }}>
              <p style={{ color: purple, fontFamily: hl, fontWeight: 700, fontSize: 16, marginBottom: 10 }}>{item.q}</p>
              <p style={{ color: '#4a4a6a', fontSize: 15, lineHeight: 1.8, margin: 0 }}>{item.a}</p>
            </div>
          ))}
        </div>
      </section>

      <WaveDivider fromColor="#ffffff" toColor={purple} />

      {/* ── 8. REGISTRATION / PRICE ANCHOR ───────────────────────────────── */}
      <section id="registration" style={{ background: purple, padding: '5rem 2rem', textAlign: 'center' }}>
        <div style={{ maxWidth: 680, margin: '0 auto' }}>
          <SquareBars color={pink} />
          <p style={{ color: '#7b90f3', fontFamily: hl, fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: 12 }}>Your Investment</p>
          <h2 style={{ color: '#ffffff', fontFamily: hl, fontSize: 'clamp(2rem, 3.5vw, 2.4rem)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: 8 }}>Reserve your seat.</h2>
          <div style={{ margin: '24px auto', display: 'inline-block', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 16, padding: '24px 48px' }}>
            <p style={{ color: '#ffffff', fontFamily: hl, fontWeight: 800, fontSize: 'clamp(2rem, 4vw, 3rem)', lineHeight: 1, marginBottom: 6 }}>
              50,000 XAF {/* TODO: confirm price with Rogers */}
            </p>
            <p style={{ color: 'rgba(255,255,255,0.50)', fontFamily: hl, fontSize: '0.8rem', margin: 0 }}>Per executive · Both days + meals included</p>
          </div>
          <div style={{ marginBottom: 32 }}>
            {['Less than one business dinner.', 'Two days that re-align the next decade.', 'The seat is limited. The opportunity is not.'].map((line, i) => (
              <p key={i} style={{ color: 'rgba(255,255,255,0.55)', fontFamily: hl, fontSize: 14, margin: '4px 0' }}>{line}</p>
            ))}
          </div>
          <div className="prog-grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 36, textAlign: 'left' }}>
            {[
              { icon: '📋', label: 'Workbook & materials'       },
              { icon: '🍽️', label: 'All meals included'         }, // TODO: confirm
              { icon: '🎓', label: "Rogers' direct teaching"    },
              { icon: '💬', label: 'Alumni network access'      },
              { icon: '🤝', label: 'Peer executive group'       },
              { icon: '📊', label: "Rogers' leadership assessment"}, // TODO: confirm
            ].map((item) => (
              <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.06)', borderRadius: 10, padding: '10px 14px' }}>
                <span style={{ fontSize: 16 }}>{item.icon}</span>
                <span style={{ color: 'rgba(255,255,255,0.80)', fontFamily: hl, fontSize: 13 }}>{item.label}</span>
              </div>
            ))}
          </div>
          {/* PayUnit button — preserved from Phase 33 */}
          <RegisterButton program="ceo-on-mission" />
          <div style={{ marginTop: 28, display: 'flex', flexDirection: 'column', gap: 8 }}>
            <p style={{ color: 'rgba(255,255,255,0.40)', fontFamily: hl, fontSize: 13, margin: 0 }}>Payment via MTN MoMo or Orange Money</p>
            <p style={{ color: 'rgba(255,255,255,0.30)', fontFamily: hl, fontSize: 12, margin: 0 }}>
              MTN: <strong style={{ color: 'rgba(255,255,255,0.55)' }}>*126*4*926667*AMOUNT#</strong> &nbsp;·&nbsp;
              Orange: <strong style={{ color: 'rgba(255,255,255,0.55)' }}>#150*47*890422*AMOUNT#</strong>
            </p>
            <p style={{ color: 'rgba(255,255,255,0.30)', fontFamily: hl, fontSize: 12, margin: 0 }}>
              Proof via WhatsApp: <a href="https://wa.me/237683493220" style={{ color: pink }}>+237 683 493 220</a> {/* TODO: confirm number */}
            </p>
          </div>
        </div>
      </section>
      <div style={{ background: purple, padding: '2rem', textAlign: 'center', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <Link href="/" style={{ color: 'rgba(255,255,255,0.35)', fontFamily: hl, fontSize: 13, textDecoration: 'none' }}>← Back to Rogers Nforgwei</Link>
      </div>
    </main>
  )
}
