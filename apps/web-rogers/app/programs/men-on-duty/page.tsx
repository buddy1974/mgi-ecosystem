import Link from 'next/link'
import RegisterButton from '@/components/RegisterButton'
import { SquareBars } from '@/components/SquareBars'
import { WaveDivider } from '@/components/WaveDivider'
import { ScrollReveal } from '@/components/ScrollReveal'

const hl     = "var(--font-headline, 'Nunito', system-ui, sans-serif)"
const serif  = "Georgia, 'Times New Roman', serif"
const purple = '#3a0ca3'
const pink   = '#f72585'
const sky    = '#4361ee'
const navy   = '#1e3a8a'

// TODO: replace all placeholder content with real content from Rogers' team

const TESTIMONIALS = [
  {
    quote: "Men On Duty taught me that duty is not a burden — it is a privilege. I stopped resenting my responsibilities at home and started seeing them as the arena where I prove who I am.", // TODO: real testimonial
    name: 'Patrice Nganou',
    city: 'Douala',
    year: '2024',
  },
  {
    quote: "My wife noticed the change before I did. That's how I knew it was real.", // TODO: real testimonial
    name: 'Antoine Fouda',
    city: 'Buea',
    year: '2023',
  },
  {
    quote: "Men On Duty doesn't fix your schedule — it fixes your values. The schedule fixes itself.", // TODO: real testimonial
    name: 'Christian Awah',
    city: 'Limbe',
    year: '2024',
  },
]

const SCHEDULE = [
  {
    week: 'Week 1', theme: 'Foundations', subtitle: 'What does it mean to be a man on duty?',
    points: ['The definition of duty', 'The four arenas', 'Self-assessment and current state'],
  },
  {
    week: 'Week 2', theme: 'The Home', subtitle: 'Leading where it counts most',
    points: ['Husband, father, protector', 'The conversations most men avoid'],
  },
  {
    week: 'Week 3', theme: 'The Work', subtitle: 'Vocation as calling, not just career',
    points: ['Faith at work', 'Integrity under pressure', 'Leading teams with character'],
  },
  {
    week: 'Week 4', theme: 'The Self', subtitle: 'Discipline, health, and spiritual foundation',
    points: ['Morning rituals', 'Physical discipline', 'Prayer and Scripture as leadership tools'],
  },
  {
    week: 'Week 5', theme: 'The Community', subtitle: 'Every man on duty builds beyond himself',
    points: ['Mentorship', 'Generosity', 'Civic responsibility'],
  },
  {
    week: 'Week 6', theme: 'The Commitment', subtitle: 'Your 90-day Men On Duty plan',
    points: ['Each man presents his personal plan', 'Group accountability begins', 'Graduation ceremony'],
  },
]

const FAQ = [
  {
    q: 'Is this an online or in-person program?',
    a: 'Men On Duty runs as a cohort with weekly live sessions. // TODO: confirm format — online / in-person / hybrid with Rogers',
  },
  {
    q: 'How long are the weekly sessions?',
    a: 'Each session runs approximately 90 minutes. // TODO: confirm with Rogers',
  },
  {
    q: 'Can I join mid-cohort if I miss the start date?',
    a: 'No — the cohort model requires all participants to begin together. Join the waitlist for the next cohort.',
  },
  {
    q: 'Is this only for married men?',
    a: 'No. Men On Duty is for men of all relationship statuses. The content on family applies to anyone who will be a husband or father, and the other arenas apply to every man regardless.',
  },
  {
    q: 'What happens after the 6 weeks?',
    a: 'You graduate into the Men On Duty alumni network and have access to all future cohort sessions at a discounted rate.',
  },
]

export default function MenOnDutyPage() {
  return (
    <main style={{ background: '#0d0120', fontFamily: hl, paddingTop: 140 }}>
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
        background: `linear-gradient(150deg, #0a0120 0%, ${purple} 45%, ${navy} 100%)`,
        padding: '80px 2rem 72px', textAlign: 'center',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 40% 40%, rgba(30,58,138,0.25) 0%, transparent 60%)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: 820, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }}>
            <SquareBars color={sky} />
          </div>
          <p style={{ color: sky, fontFamily: hl, fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: 20 }}>
            Seminar Format · Paid Registration
          </p>
          <h1 style={{ color: '#ffffff', fontFamily: serif, fontSize: 'clamp(2.4rem, 5vw, 4.2rem)', fontWeight: 400, letterSpacing: '0.02em', lineHeight: 1.1, marginBottom: 24 }}>
            {/* TODO: replace with real headline from Rogers */}
            You were given a role.<br />This is where you learn to own it.
          </h1>
          <div style={{ width: 60, height: 2, background: pink, margin: '0 auto 24px', opacity: 0.7 }} />
          <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: 18, lineHeight: 1.8, maxWidth: 600, margin: '0 auto 36px', fontWeight: 300 }}>
            Structured seminars for men who refuse to settle for half a life.
          </p>
          <div className="prog-stat-row" style={{ display: 'flex', gap: 32, justifyContent: 'center', marginBottom: 40 }}>
            {[
              { label: 'Duration',   value: '6 Weeks'           }, // TODO: confirm
              { label: 'Next Cohort', value: 'Sept 2026 (TBA)'  }, // TODO: real date
              { label: 'Cohort Size', value: '50 Participants'  }, // TODO: confirm
            ].map(s => (
              <div key={s.label} style={{ textAlign: 'center' }}>
                <p style={{ color: '#ffffff', fontFamily: hl, fontWeight: 700, fontSize: '1.2rem', lineHeight: 1, marginBottom: 4 }}>{s.value}</p>
                <p style={{ color: 'rgba(255,255,255,0.50)', fontFamily: hl, fontSize: '0.72rem', letterSpacing: '0.12em', textTransform: 'uppercase', margin: 0 }}>{s.label}</p>
              </div>
            ))}
          </div>
          <div className="prog-ctas" style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="#registration" className="btn-premium" style={{ background: pink, color: '#fff', padding: '16px 40px', borderRadius: '999px', fontFamily: hl, fontWeight: 700, fontSize: '1rem', textDecoration: 'none', boxShadow: '0 6px 28px rgba(247,37,133,0.38)', display: 'inline-block' }}>
              Reserve Your Seat
            </a>
            <a href="#schedule" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.14)', color: 'rgba(255,255,255,0.85)', padding: '16px 36px', borderRadius: '999px', fontFamily: hl, fontWeight: 600, fontSize: '0.95rem', textDecoration: 'none', backdropFilter: 'blur(10px)', display: 'inline-block' }}>
              Explore Schedule
            </a>
          </div>
        </div>
      </section>

      {/* ── 2. SOCIAL PROOF BAR ──────────────────────────────────────────── */}
      <section style={{ background: '#0d0120', padding: '3rem 2rem', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', display: 'flex', justifyContent: 'center', gap: 0, alignItems: 'center', flexWrap: 'wrap' }}>
          {[
            { value: '200+', label: 'Past Participants'        }, // TODO: real number
            { value: '5',    label: 'Countries Represented'   }, // TODO: real number
            { value: '3',    label: 'Cohorts Completed'        }, // TODO: real number
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
              Men On Duty is built for the man who carries real responsibility — at home, at work, in his community — but has never been given a framework for doing it well. Over six weeks, you will rebuild your understanding of what it means to be a man on duty in every arena of your life.
            </p>
          </div>
          <div style={{ paddingTop: 16 }}>
            {[
              'A clear understanding of your responsibilities — and which ones you have been neglecting',          // TODO: real outcome
              'A daily rhythm that integrates faith, family, work, and self — without sacrificing any',            // TODO: real outcome
              'Language to lead your family in the way a man is supposed to lead it',                              // TODO: real outcome
              'A cohort of men walking the same path — your ongoing accountability circle',                        // TODO: real outcome
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
                'You are a husband or father who wants to be more present and intentional at home',  // TODO: confirm
                'You are a young man (18–30) transitioning into adult responsibility',               // TODO: confirm
                'Your wife or family has told you that you need to change',                          // TODO: confirm
                'You want to integrate your faith belief with your daily behavior',                  // TODO: confirm
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
                'You want a quick fix or motivation boost without sustained commitment',                   // TODO: confirm
                'You are not willing to do weekly assignments between sessions',                          // TODO: confirm
                'You are an executive seeking advanced leadership strategy (see CEO On Mission)',         // TODO: confirm
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
      <section id="schedule" className="section-premium" style={{ background: '#f8f7ff' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 2rem' }}>
          <ScrollReveal>
            <div style={{ textAlign: 'center', marginBottom: 48 }}>
              <SquareBars color={purple} />
              <p style={{ color: purple, fontFamily: hl, fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: 12 }}>The Experience</p>
              <h2 style={{ color: purple, fontFamily: hl, fontSize: 'clamp(2rem, 3.5vw, 2.4rem)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.1, margin: 0 }}>
                Six weeks. One standard.
              </h2>
            </div>
          </ScrollReveal>
          <div style={{ background: 'rgba(58,12,163,0.03)', borderRadius: 16, border: '1px solid rgba(58,12,163,0.08)', display: 'flex', flexDirection: 'column', gap: 0 }}>
            {SCHEDULE.map((w, i) => (
              <div key={i} style={{ display: 'flex', gap: 32, padding: '2rem 2.5rem', borderBottom: i < SCHEDULE.length - 1 ? '1px solid rgba(58,12,163,0.08)' : 'none' }}>
                <div style={{ flexShrink: 0, width: 80 }}>
                  <p style={{ color: pink, fontFamily: hl, fontWeight: 800, fontSize: '0.72rem', letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: 4 }}>{w.week}</p>
                  <p style={{ color: purple, fontFamily: hl, fontWeight: 800, fontSize: 16, margin: 0 }}>{w.theme}</p>
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ color: '#4a4a6a', fontStyle: 'italic', fontSize: 15, marginBottom: 12 }}>{w.subtitle}</p>
                  {w.points.map((pt, j) => (
                    <div key={j} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', marginBottom: 8 }}>
                      <span style={{ color: sky, fontSize: 14, flexShrink: 0, marginTop: 2 }}>·</span>
                      <p style={{ color: '#1a1a2e', fontSize: 14, lineHeight: 1.75, margin: 0 }}>{/* TODO: real schedule content */}{pt}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <WaveDivider fromColor="#f8f7ff" toColor={purple} />

      {/* ── 6. TESTIMONIALS ──────────────────────────────────────────────── */}
      <section className="section-premium" style={{ background: purple }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 2rem' }}>
          <ScrollReveal>
            <div style={{ textAlign: 'center', marginBottom: 44 }}>
              <SquareBars color={pink} />
              <h2 style={{ color: '#ffffff', fontFamily: hl, fontSize: 'clamp(2rem, 3.5vw, 2.4rem)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.1, margin: 0 }}>
                What men who attended say.
              </h2>
            </div>
          </ScrollReveal>
          <div className="prog-grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
            {TESTIMONIALS.map((t, i) => (
              <ScrollReveal key={i} delay={i * 0.12}>
                <div style={{ padding: '2rem', position: 'relative', background: 'rgba(255,255,255,0.08)', borderLeft: '3px solid rgba(247,37,133,0.55)', borderRadius: 16, border: '1px solid rgba(255,255,255,0.10)', borderLeftWidth: 3 }}>
                  <div style={{ fontSize: 64, lineHeight: 1, opacity: 0.08, fontFamily: serif, position: 'absolute', top: 16, left: 20, color: '#ffffff' }}>&ldquo;</div>
                  <p style={{ color: 'rgba(255,255,255,0.80)', fontFamily: serif, fontStyle: 'italic', fontSize: '1.05rem', lineHeight: 1.8, marginBottom: 24, position: 'relative', zIndex: 1 }}>
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: 16 }}>
                    <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'rgba(255,255,255,0.12)', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, fontWeight: 700, color: '#ffffff', fontFamily: hl }}>
                      {t.name[0]}
                    </div>
                    <div>
                      <p style={{ color: '#7b90f3', fontFamily: hl, fontWeight: 700, fontSize: 14, margin: '0 0 2px' }}>{t.name}</p>
                      <p style={{ color: 'rgba(255,255,255,0.45)', fontFamily: hl, fontSize: '0.8rem', margin: 0 }}>{t.city} · Men On Duty {t.year}</p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <WaveDivider fromColor={purple} toColor="#ffffff" />

      {/* ── 7. FAQ ───────────────────────────────────────────────────────── */}
      <section className="section-premium" style={{ background: '#ffffff' }}>
        <div style={{ maxWidth: 800, margin: '0 auto', padding: '0 2rem' }}>
          <ScrollReveal>
            <div style={{ textAlign: 'center', marginBottom: 44 }}>
              <SquareBars color={purple} />
              <h2 style={{ color: purple, fontFamily: hl, fontSize: 'clamp(2rem, 3.5vw, 2.4rem)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.1, margin: 0 }}>
                Questions you probably have.
              </h2>
            </div>
          </ScrollReveal>
          {FAQ.map((item, i) => (
            <ScrollReveal key={i} delay={i * 0.06}>
              <div style={{ padding: '1.75rem 2rem', marginBottom: 12, borderBottom: '1px solid rgba(58,12,163,0.08)', background: 'transparent' }}>
                <p style={{ color: purple, fontFamily: hl, fontWeight: 700, fontSize: 16, marginBottom: 10 }}>{item.q}</p>
                <p style={{ color: '#4a4a6a', fontSize: 15, lineHeight: 1.8, margin: 0 }}>{item.a}</p>
              </div>
            </ScrollReveal>
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
            <p style={{ color: 'rgba(255,255,255,0.50)', fontFamily: hl, fontSize: '0.8rem', margin: 0 }}>Per cohort participant · 6 weeks included</p>
          </div>
          <div style={{ marginBottom: 32 }}>
            {[
              'Register online below. All bookings are digital — no phone calls required.', // TODO: Rogers to provide — dates, venue, price, schedule
              'FAQs below answer the most common questions.',
              "If you're still stuck, use the contact page for general enquiries.",
            ].map((line, i) => (
              <p key={i} style={{ color: 'rgba(255,255,255,0.55)', fontFamily: hl, fontSize: 14, margin: '4px 0' }}>{line}</p>
            ))}
          </div>
          <div className="prog-grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 36, textAlign: 'left' }}>
            {[
              { icon: '📋', label: 'Weekly session materials'  },
              { icon: '👥', label: 'Cohort community'          },
              { icon: '🎓', label: "Rogers' direct coaching"   },
              { icon: '💬', label: 'Alumni network access'     },
              { icon: '📊', label: 'Personal assessment tools' },
              { icon: '📲', label: 'WhatsApp follow-up group'  },
            ].map((item) => (
              <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.06)', borderRadius: 10, padding: '10px 14px' }}>
                <span style={{ fontSize: 16 }}>{item.icon}</span>
                <span style={{ color: 'rgba(255,255,255,0.80)', fontFamily: hl, fontSize: 13 }}>{item.label}</span>
              </div>
            ))}
          </div>
          {/* PayUnit button — preserved from Phase 33 */}
          <RegisterButton program="men-on-duty" />
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
