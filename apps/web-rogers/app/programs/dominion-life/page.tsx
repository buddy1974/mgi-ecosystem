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

// TODO: replace all placeholder content with real content from Rogers' team

const TESTIMONIALS = [
  {
    quote: "I came skeptical. I left recalibrated. Rogers doesn't just speak — he gives you a framework for your whole life. I made decisions in 3 days that I had been avoiding for 3 years.", // TODO: real testimonial
    name: 'Emmanuel Kouassi',
    city: 'Douala',
    year: '2023',
  },
  {
    quote: "The conference asked me the question I had been running from: who are you building this for? I had the answer by Saturday morning. My family felt it when I came home.", // TODO: real testimonial
    name: 'Bernard Tchinda',
    city: 'Bafoussam',
    year: '2024',
  },
  {
    quote: "I've attended many leadership events. Dominion Life is different because it does not try to inspire you. It tries to convict you — in the best possible way.", // TODO: real testimonial
    name: 'Samuel Mbeki',
    city: 'Yaoundé',
    year: '2023',
  },
]

const SCHEDULE = [
  {
    day: 'Day 1', theme: 'Identity', subtitle: '"Who are you when no one is watching?"',
    points: [
      'The gap between your private self and your public role',
      'The four identity distortions that keep men stuck',
      'Individual assessment: your leadership style and its blind spots',
      'Evening: table discussions — men share their current reality',
    ],
  },
  {
    day: 'Day 2', theme: 'Dominion', subtitle: '"What are you actually building?"',
    points: [
      'Rogers teaches: the Dominion Framework — 5 domains every man leads',
      'Family, faith, finance, vocation, and community — one man, five arenas',
      'Workshop: your current score in each domain',
      'Afternoon: peer coaching triads — men speak truth to each other',
    ],
  },
  {
    day: 'Day 3', theme: 'Decision', subtitle: '"What do you do tomorrow morning?"',
    points: [
      'The 90-day commitment framework',
      'Every man writes and reads his commitment aloud',
      'Closing ceremony + community access activation',
      'Testimonies from alumni who attended past editions',
    ],
  },
]

const FAQ = [
  {
    q: 'Who is this conference for?',
    a: 'Dominion Life is for men who are serious about closing the gap between who they are and who they are called to be. We welcome men from all vocations, backgrounds, and stages of life. The only requirement is a genuine desire to grow.',
  },
  {
    q: 'Do I need to be a Christian to attend?',
    a: 'Dominion Life is faith-based — Rogers teaches from a Christian worldview and the program has spiritual elements. You do not need to be a practicing Christian to attend and benefit, but the framework is rooted in faith and Scripture.',
  },
  {
    q: 'What is included in the 50,000 XAF investment?', // TODO: confirm inclusions
    a: 'Conference registration, all sessions, printed workbook and materials, and access to the Dominion Life alumni community. Accommodation and travel are not included. // TODO: confirm with Rogers',
  },
  {
    q: 'How many people attend?',
    a: 'The conference is capped at 200 participants to ensure every man gets personal attention and genuine community.',
  },
  {
    q: 'What happens after the conference?',
    a: "You will be added to the Dominion Life alumni WhatsApp community. Rogers' team follows up within 30 days to check on your 90-day commitment progress.",
  },
]

export default function DominionLifePage() {
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
        background: `linear-gradient(150deg, #0a0120 0%, ${purple} 55%, #1a0a50 100%)`,
        padding: '80px 2rem 72px', textAlign: 'center',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 60% 40%, rgba(67,97,238,0.18) 0%, transparent 60%)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: 820, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }}>
            <SquareBars color={sky} />
          </div>
          <p style={{ color: sky, fontFamily: hl, fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: 20 }}>
            Dominion Life Men&apos;s Conference · Conference Format · Paid Registration
          </p>
          <h1 style={{ color: '#ffffff', fontFamily: serif, fontSize: 'clamp(2.4rem, 5vw, 4.2rem)', fontWeight: 400, letterSpacing: '0.02em', lineHeight: 1.1, marginBottom: 24 }}>
            {/* TODO: replace with real headline from Rogers */}
            Rise to the version of yourself<br />your family is waiting for.
          </h1>
          <div style={{ width: 60, height: 2, background: pink, margin: '0 auto 24px', opacity: 0.7 }} />
          <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: 18, lineHeight: 1.8, maxWidth: 600, margin: '0 auto 36px', fontWeight: 300 }}>
            A gathering of men called to lead &mdash; in faith, family, and influence.
          </p>
          {/* Stats row */}
          <div className="prog-stat-row" style={{ display: 'flex', gap: 32, justifyContent: 'center', marginBottom: 40 }}>
            {[
              { label: 'Duration', value: '3 Days'            }, // TODO: confirm
              { label: 'Next Date', value: 'Oct 2026 (TBA)'   }, // TODO: real date
              { label: 'Capacity', value: '200 Seats'         }, // TODO: confirm
            ].map(s => (
              <div key={s.label} style={{ textAlign: 'center' }}>
                <p style={{ color: '#ffffff', fontFamily: hl, fontWeight: 700, fontSize: '1.2rem', lineHeight: 1, marginBottom: 4 }}>{s.value}</p>
                <p style={{ color: 'rgba(255,255,255,0.50)', fontFamily: hl, fontSize: '0.72rem', letterSpacing: '0.12em', textTransform: 'uppercase', margin: 0 }}>{s.label}</p>
              </div>
            ))}
          </div>
          <div className="prog-ctas" style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="#registration" className="btn-premium" style={{ background: pink, color: '#fff', padding: '16px 40px', borderRadius: '999px', fontFamily: hl, fontWeight: 700, fontSize: '1rem', textDecoration: 'none', boxShadow: '0 6px 28px rgba(247,37,133,0.38)', transition: 'all 0.25s ease', display: 'inline-block' }}>
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
            { value: '500+',  label: 'Past Attendees'        }, // TODO: real number
            { value: '8',     label: 'Countries Represented' }, // TODO: real number
            { value: '5+',    label: 'Years Running'         }, // TODO: real number
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
              Dominion Life is not a motivational conference. It is a structured confrontation with the version of yourself that keeps choosing comfort over calling. Over three days, you will work through the frameworks, conversations, and decisions that most men avoid for years. You leave with clarity, a plan, and a community.
            </p>
            <p style={{ color: '#4a4a6a', fontSize: 15, lineHeight: 1.8, maxWidth: 480, fontWeight: 300, marginTop: 16 }}>
              {/* Verified coach bio — Apostle Dr. Rogers Ngalla Nforgwei */}
              Led by Apostle Dr. Rogers Ngalla Nforgwei — Doctor of Applied Theology (Kingdom Life University, California), Business Development Manager for Africa at Cambridge University Press overseeing 30+ countries, Knight of the Order of Valor (2016) and Officer of the National Orders of Cameroon (2023).
            </p>
          </div>
          <div style={{ paddingTop: 16 }}>
            {[
              'A clear personal leadership framework — where you are leading and where you are drifting', // TODO: real outcome
              'Resolved tension between your professional identity and your home identity',               // TODO: real outcome
              'A 90-day written commitment you make to yourself — witnessed by the room',                // TODO: real outcome
              'Access to the Dominion Life alumni community for ongoing accountability',                 // TODO: real outcome
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
                'You feel successful by external measures but unfulfilled by internal ones',       // TODO: confirm
                "Your family would describe you as \"absent\" even when physically present",        // TODO: confirm
                'You have been meaning to "get serious" for years but haven\'t yet',               // TODO: confirm
                'You are aged 25–55 in any vocation — pastor, entrepreneur, employee, executive', // TODO: confirm
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
                'You are looking for entertainment or a feel-good weekend',           // TODO: confirm
                'You are not willing to be honest with yourself in a group setting',  // TODO: confirm
                'You have already done this work and want advanced material (see CEO On Mission)', // TODO: confirm
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
            <div style={{ textAlign: 'center', marginBottom: 52 }}>
              <SquareBars color={purple} />
              <p style={{ color: purple, fontFamily: hl, fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: 12 }}>The Experience</p>
              <h2 style={{ color: purple, fontFamily: hl, fontSize: 'clamp(2rem, 3.5vw, 2.4rem)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.1, margin: 0 }}>
                What happens when you step in.
              </h2>
            </div>
          </ScrollReveal>
          <div style={{ background: 'rgba(58,12,163,0.03)', borderRadius: 16, border: '1px solid rgba(58,12,163,0.08)', display: 'flex', flexDirection: 'column', gap: 0 }}>
            {SCHEDULE.map((day, i) => (
              <div key={i} style={{ display: 'flex', gap: 32, padding: '2.5rem', borderBottom: i < SCHEDULE.length - 1 ? '1px solid rgba(58,12,163,0.08)' : 'none' }}>
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
                      <p style={{ color: 'rgba(255,255,255,0.45)', fontFamily: hl, fontSize: '0.8rem', margin: 0 }}>{t.city} · Dominion Life {t.year}</p>
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

          {/* Price display */}
          <div style={{ margin: '24px auto', display: 'inline-block', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 16, padding: '24px 48px' }}>
            <p style={{ color: '#ffffff', fontFamily: hl, fontWeight: 800, fontSize: 'clamp(2rem, 4vw, 3rem)', lineHeight: 1, marginBottom: 6 }}>
              50,000 XAF {/* TODO: confirm price with Rogers */}
            </p>
            <p style={{ color: 'rgba(255,255,255,0.50)', fontFamily: hl, fontSize: '0.8rem', margin: 0 }}>Per attendee · All sessions included</p>
          </div>

          {/* Value anchors */}
          <div style={{ marginBottom: 32 }}>
            {[
              'Register online below. All bookings are digital — no phone calls required.', // TODO: Rogers to provide — dates, venue, price, schedule
              'FAQs below answer the most common questions.',
              "If you're still stuck, use the contact page for general enquiries.",
            ].map((line, i) => (
              <p key={i} style={{ color: 'rgba(255,255,255,0.55)', fontFamily: hl, fontSize: 14, margin: '4px 0' }}>{line}</p>
            ))}
          </div>

          {/* What's included */}
          <div className="prog-grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 36, textAlign: 'left' }}>
            {[
              { icon: '📋', label: 'Conference materials'     }, // TODO: confirm
              { icon: '🤝', label: 'Networking with leaders'  }, // TODO: real number
              { icon: '🎓', label: "Rogers' direct teaching"  },
              { icon: '💬', label: 'Alumni community access'  },
              { icon: '📜', label: 'Certificate of completion'}, // TODO: confirm
              { icon: '📲', label: 'WhatsApp follow-up group' },
            ].map((item) => (
              <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.06)', borderRadius: 10, padding: '10px 14px' }}>
                <span style={{ fontSize: 16 }}>{item.icon}</span>
                <span style={{ color: 'rgba(255,255,255,0.80)', fontFamily: hl, fontSize: 13 }}>{item.label}</span>
              </div>
            ))}
          </div>

          {/* PayUnit button — preserved from Phase 33 */}
          <RegisterButton program="dominion-life" />

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
        <Link href="/" style={{ color: 'rgba(255,255,255,0.35)', fontFamily: hl, fontSize: 13, textDecoration: 'none' }}>
          ← Back to Rogers Nforgwei
        </Link>
      </div>
    </main>
  )
}
