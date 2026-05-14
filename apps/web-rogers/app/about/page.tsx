import Image from 'next/image'
import Link from 'next/link'
import { SquareBars } from '@/components/SquareBars'

const serif = "Georgia, 'Times New Roman', serif"
const sans  = "var(--font-body, 'Nunito', 'Plus Jakarta Sans', system-ui, sans-serif)"

const purple = '#3a0ca3'
const pink   = '#f72585'
const sky    = '#4361ee'
const light  = '#f1f1f1'

const STAT_CARDS = [
  { number: '12+',  label: 'Years of Ministry'        },
  { number: '500+', label: 'Leaders Mentored'          },
  { number: '8',    label: 'Nations Reached'           },
  { number: '3',    label: 'Transformation Programs'   },
]

const PROGRAMS = [
  {
    name: "Dominion Life Men's Conference",
    who:  'For men ready to stop drifting and start leading.',
    promise: 'A transformative gathering where men step into God-given authority — as fathers, leaders, and builders.',
    href: '/programs/dominion-life',
  },
  {
    name: 'Men On Duty',
    who:  'For men who want their faith, family, and career to move as one.',
    promise: 'Stop being present in body and absent in spirit. Start showing up fully — everywhere it counts.',
    href: '/programs/men-on-duty',
  },
  {
    name: 'CEO On Mission',
    who:  'For executives and entrepreneurs who lead from conviction.',
    promise: 'Build an enterprise anchored in purpose — and scale it without losing your soul.',
    href: '/programs/ceo-on-mission',
  },
]

const TEASE_TESTIMONIALS = [
  {
    quote: "I came to Dominion Life skeptical. I left with a clarity I had been searching for over ten years. Rogers doesn't motivate you — he recalibrates you.",
    name: 'Emmanuel K.',
    city: 'Douala',
    program: "Dominion Life 2023",
  },
  {
    quote: "CEO On Mission gave me language for something I had been living but couldn't articulate. My faith is not separate from my business. It is my competitive advantage.",
    name: 'Daniel M.',
    city: 'Yaoundé',
    program: 'CEO On Mission 2024',
  },
]

export default function AboutPage() {
  return (
    <main style={{ background: '#0a0414', fontFamily: sans }}>
      <style>{`
        @media (max-width: 768px) {
          .about-story-grid  { grid-template-columns: 1fr !important; }
          .about-stats-grid  { grid-template-columns: repeat(2, 1fr) !important; }
          .about-programs-grid { grid-template-columns: 1fr !important; }
          .about-tease-grid  { grid-template-columns: 1fr !important; }
          .about-cta-btns    { flex-direction: column !important; align-items: center !important; }
        }
        @media (max-width: 480px) {
          .about-stats-grid  { grid-template-columns: 1fr !important; }
        }
      `}</style>

      {/* ══ SECTION 1 — HERO BANNER ══════════════════════════════════════════ */}
      <section style={{
        background: purple,
        minHeight: 480,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '100px 2rem 80px',
        position: 'relative', overflow: 'hidden',
        textAlign: 'center',
      }}>
        {/* Ambient glow */}
        <div style={{ position: 'absolute', top: -60, right: -60, width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(67,97,238,0.25) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <svg style={{ position: 'absolute', bottom: 0, left: 0, right: 0, opacity: 0.06, pointerEvents: 'none' }} viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path d="M0,30 C200,55 400,5 600,30 C800,55 1000,5 1200,30 C1320,45 1380,35 1440,30" stroke="#fff" strokeWidth="2" fill="none"/>
          <path d="M0,45 C200,70 400,20 600,45 C800,70 1000,20 1200,45 C1320,60 1380,50 1440,45" stroke="#fff" strokeWidth="1.5" fill="none"/>
        </svg>

        <div style={{ position: 'relative', zIndex: 2, maxWidth: 760, margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 24 }}>
            <SquareBars color={pink} />
          </div>
          <h1 style={{
            fontFamily: serif,
            color: '#ffffff',
            fontSize: 'clamp(2.2rem, 5vw, 4rem)',
            fontWeight: 400,
            letterSpacing: '0.02em',
            lineHeight: 1.15,
            marginBottom: 24,
          }}>
            The story behind the mission.
          </h1>
          <div style={{ width: 64, height: 2, background: pink, margin: '0 auto 28px', opacity: 0.7 }} />
          <p style={{
            color: 'rgba(255,255,255,0.62)',
            fontSize: 18,
            lineHeight: 1.8,
            fontWeight: 300,
            maxWidth: 600,
            margin: '0 auto',
          }}>
            Not credentials. Not a CV. The real journey — from where he started
            to what he now builds in men across 8 nations.
          </p>
        </div>
      </section>

      {/* ══ SECTION 2 — ORIGIN STORY ════════════════════════════════════════ */}
      <section style={{ background: light, padding: '6rem 2rem' }}>
        <div
          className="about-story-grid"
          style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'center' }}
        >
          {/* Left — photo */}
          <div style={{ position: 'relative' }}>
            <div style={{ borderRadius: 20, overflow: 'hidden', background: purple, aspectRatio: '3/4', position: 'relative', maxHeight: 560 }}>
              <Image
                src="/rogers-hero.png"
                alt="Rogers Nforgwei"
                fill
                style={{ objectFit: 'cover', objectPosition: 'top center', mixBlendMode: 'luminosity', opacity: 0.82 }}
              />
              {/* Bottom quote overlay */}
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '2rem 1.75rem', background: 'linear-gradient(to top, rgba(58,12,163,0.97) 0%, transparent 100%)' }}>
                <p style={{ color: 'rgba(255,255,255,0.9)', fontFamily: serif, fontStyle: 'italic', fontSize: 14, lineHeight: 1.65, margin: '0 0 8px' }}>
                  &ldquo;A man doesn&apos;t have a professional life and a spiritual life and a family life. He has one life.&rdquo;
                </p>
                <p style={{ color: pink, fontSize: 11, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', margin: 0 }}>
                  — Rogers Nforgwei
                </p>
              </div>
            </div>
            {/* Decorative dot */}
            <div style={{ position: 'absolute', top: -16, left: -16, width: 72, height: 72, borderRadius: '50%', border: `2px solid rgba(247,37,133,0.25)`, background: 'rgba(247,37,133,0.06)', pointerEvents: 'none' }} />
          </div>

          {/* Right — narrative */}
          <div>
            <SquareBars color={sky} />
            <p style={{ color: sky, fontSize: 11, fontWeight: 700, letterSpacing: '0.4em', textTransform: 'uppercase', marginBottom: 16 }}>
              The Beginning
            </p>
            <h2 style={{ color: purple, fontFamily: serif, fontSize: 'clamp(1.7rem, 3vw, 2.4rem)', fontWeight: 400, letterSpacing: '0.02em', lineHeight: 1.2, marginBottom: 28 }}>
              He didn&apos;t start with authority.<br />He started with a question.
            </h2>
            <p style={{ color: '#4c4c4c', fontSize: 16, lineHeight: 1.9, marginBottom: 20, fontWeight: 300 }}>
              Rogers Nforgwei grew up understanding one truth about men: potential
              without direction becomes frustration. He watched men around him —
              capable, gifted, carrying something real — drift without a framework
              for who they were called to be. That tension never left him.
            </p>
            <p style={{ color: '#4c4c4c', fontSize: 16, lineHeight: 1.9, marginBottom: 20, fontWeight: 300 }}>
              The shift came when faith and leadership collided in his own life.
              Not as a theological concept, but as a lived confrontation. He found
              himself leading organizations, raising a family, building a business —
              and realizing that none of those arenas could be separated. A man
              doesn&apos;t have a professional life and a spiritual life and a family life.
              He has one life. And it either has a center, or it doesn&apos;t.
            </p>
            <p style={{ color: '#4c4c4c', fontSize: 16, lineHeight: 1.9, marginBottom: 36, fontWeight: 300 }}>
              That discovery became Dominion Life. Then Men On Duty. Then CEO On Mission.
              Not programs he designed from a whiteboard, but frameworks forged from
              the questions he lived with — and the answers that changed everything.
            </p>
            <div style={{ display: 'flex', gap: 12 }}>
              <a href="#about-work" style={{ background: purple, color: '#fff', padding: '12px 28px', borderRadius: 10, fontSize: 13, fontWeight: 700, textDecoration: 'none' }}>
                See the Work
              </a>
              <Link href="/programs/dominion-life" style={{ background: 'transparent', border: `2px solid ${purple}`, color: purple, padding: '12px 28px', borderRadius: 10, fontSize: 13, fontWeight: 700, textDecoration: 'none' }}>
                Explore Programs
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ══ SECTION 3 — IDENTITY STATEMENT ══════════════════════════════════ */}
      <section style={{ background: purple, padding: '6rem 2rem', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, rgba(67,97,238,0.18) 0%, transparent 65%)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: 820, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <p style={{ color: sky, fontSize: 11, fontWeight: 700, letterSpacing: '0.45em', textTransform: 'uppercase', marginBottom: 32 }}>
            Who Rogers Is
          </p>
          <h2 style={{
            fontFamily: serif,
            color: '#ffffff',
            fontSize: 'clamp(1.7rem, 3.5vw, 2.8rem)',
            fontWeight: 400,
            letterSpacing: '0.02em',
            lineHeight: 1.55,
            fontStyle: 'italic',
            marginBottom: 40,
          }}>
            &ldquo;A pastor who thinks like a CEO.<br />
            An entrepreneur who leads from faith.<br />
            A mentor who builds men who build nations.&rdquo;
          </h2>
          <div style={{ display: 'flex', gap: 4, justifyContent: 'center' }}>
            <div style={{ width: 20, height: 6, background: pink, borderRadius: 1 }} />
            <div style={{ width: 12, height: 6, background: pink, borderRadius: 1, opacity: 0.6 }} />
            <div style={{ width: 8, height: 6, background: pink, borderRadius: 1, opacity: 0.35 }} />
          </div>
        </div>
      </section>

      {/* ══ SECTION 4 — THE WORK ════════════════════════════════════════════ */}
      <section id="about-work" style={{ background: light, padding: '6rem 2rem' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 52 }}>
            <SquareBars color={purple} />
            <p style={{ color: purple, fontSize: 11, fontWeight: 700, letterSpacing: '0.4em', textTransform: 'uppercase', marginBottom: 12 }}>
              The Work
            </p>
            <h2 style={{ color: purple, fontFamily: serif, fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', fontWeight: 400, letterSpacing: '0.02em', margin: 0 }}>
              Fifteen years. One consistent mission.
            </h2>
          </div>

          <div
            className="about-stats-grid"
            style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20, marginBottom: 56 }}
          >
            {STAT_CARDS.map(s => (
              <div key={s.label} style={{ background: '#fff', borderRadius: 16, padding: '2rem 1.5rem', borderLeft: `4px solid ${pink}`, boxShadow: '0 2px 16px rgba(58,12,163,0.07)' }}>
                <p style={{ color: purple, fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, letterSpacing: '-0.04em', margin: '0 0 8px' }}>{s.number}</p>
                <p style={{ color: '#6b7280', fontSize: 13, margin: 0, lineHeight: 1.4 }}>{s.label}</p>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center' }}>
            <h3 style={{ color: purple, fontSize: 'clamp(1.3rem, 2.5vw, 1.7rem)', fontWeight: 700, marginBottom: 12, letterSpacing: '-0.02em' }}>
              Three programs. One mission.
            </h3>
            <p style={{ color: '#4c4c4c', fontSize: 15, lineHeight: 1.8, maxWidth: 520, margin: '0 auto 32px', fontWeight: 300 }}>
              Dominion Life, Men On Duty, and CEO On Mission are not events.
              They are turning points. Each one designed to answer a different
              question a man is living with.
            </p>
            <Link href="/programs/dominion-life" style={{ display: 'inline-block', background: pink, color: '#fff', padding: '14px 36px', borderRadius: 10, fontSize: 14, fontWeight: 700, textDecoration: 'none', boxShadow: '0 4px 20px rgba(247,37,133,0.3)' }}>
              Explore the Programs →
            </Link>
          </div>
        </div>
      </section>

      {/* ══ SECTION 5 — PULL QUOTE FEATURE ══════════════════════════════════ */}
      {/* TODO: replace with real YouTube URL when Rogers provides video */}
      <section style={{ background: '#111', padding: '6rem 2rem', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 60% 50%, rgba(58,12,163,0.12) 0%, transparent 60%)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: 760, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <p style={{ color: sky, fontSize: 11, fontWeight: 700, letterSpacing: '0.4em', textTransform: 'uppercase', marginBottom: 28 }}>
            On Purpose
          </p>
          <p style={{ color: 'rgba(255,255,255,0.15)', fontFamily: serif, fontSize: 'clamp(3rem, 6vw, 5rem)', lineHeight: 1, marginBottom: 24, display: 'block' }}>
            &ldquo;
          </p>
          <blockquote style={{ fontFamily: serif, fontStyle: 'italic', color: '#ffffff', fontSize: 'clamp(1.4rem, 2.8vw, 2.2rem)', lineHeight: 1.55, fontWeight: 400, margin: '0 0 32px' }}>
            The greatest threat to a man is not failure. It is succeeding at the wrong thing.
          </blockquote>
          <p style={{ color: pink, fontSize: 13, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', margin: 0 }}>
            — Rogers Nforgwei, Dominion Life 2024
          </p>
        </div>
      </section>

      {/* ══ SECTION 6 — PROGRAMS HE BUILT ══════════════════════════════════ */}
      <section style={{ background: 'linear-gradient(145deg, #3a0ca3 0%, #1a0577 100%)', padding: '6rem 2rem' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 52 }}>
            <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: 11, fontWeight: 700, letterSpacing: '0.4em', textTransform: 'uppercase', marginBottom: 12 }}>
              Programs He Built
            </p>
            <h2 style={{ color: '#ffffff', fontFamily: serif, fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', fontWeight: 400, letterSpacing: '0.02em', margin: 0 }}>
              Forged from lived questions.
            </h2>
          </div>

          <div
            className="about-programs-grid"
            style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}
          >
            {PROGRAMS.map((p) => (
              <div key={p.name} style={{ background: 'rgba(255,255,255,0.07)', backdropFilter: 'blur(8px)', borderRadius: 16, padding: '2rem', border: '1px solid rgba(255,255,255,0.12)', display: 'flex', flexDirection: 'column' }}>
                <h3 style={{ color: '#ffffff', fontSize: 17, fontWeight: 700, marginBottom: 10, lineHeight: 1.3 }}>{p.name}</h3>
                <p style={{ color: sky, fontSize: 13, fontWeight: 500, marginBottom: 12, lineHeight: 1.5 }}>{p.who}</p>
                <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: 13, lineHeight: 1.7, fontWeight: 300, flex: 1, marginBottom: 20 }}>{p.promise}</p>
                <Link href={p.href} style={{ color: sky, fontSize: 13, fontWeight: 700, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                  Learn More →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ SECTION 7 — SOCIAL PROOF TEASE ══════════════════════════════════ */}
      <section style={{ background: light, padding: '6rem 2rem' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <SquareBars color={sky} />
            <p style={{ color: sky, fontSize: 11, fontWeight: 700, letterSpacing: '0.4em', textTransform: 'uppercase', marginBottom: 12 }}>
              Transformation Stories
            </p>
            <h2 style={{ color: purple, fontFamily: serif, fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', fontWeight: 400, letterSpacing: '0.02em', margin: 0 }}>
              What happens when men step in.
            </h2>
          </div>

          <div
            className="about-tease-grid"
            style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 40 }}
          >
            {TEASE_TESTIMONIALS.map((t) => (
              <div key={t.name} style={{ background: '#fff', borderRadius: 16, padding: '2rem', borderLeft: `4px solid ${pink}`, boxShadow: '0 2px 16px rgba(58,12,163,0.07)' }}>
                <p style={{ color: pink, fontFamily: serif, fontSize: '2.5rem', lineHeight: 1, marginBottom: 12 }}>&ldquo;</p>
                <p style={{ color: '#3a3a3a', fontFamily: serif, fontStyle: 'italic', fontSize: 15, lineHeight: 1.75, marginBottom: 20 }}>
                  {t.quote}
                </p>
                <div style={{ borderTop: '1px solid #f0f0f0', paddingTop: 14 }}>
                  <p style={{ color: purple, fontWeight: 700, fontSize: 14, margin: '0 0 3px' }}>{t.name}</p>
                  <p style={{ color: '#9ca3af', fontSize: 12, margin: 0 }}>{t.city} · {t.program}</p>
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center' }}>
            <Link href="/testimonials" style={{ display: 'inline-block', background: 'transparent', border: `2px solid ${pink}`, color: pink, padding: '13px 32px', borderRadius: 10, fontSize: 14, fontWeight: 700, textDecoration: 'none' }}>
              See All Transformation Stories →
            </Link>
          </div>
        </div>
      </section>

      {/* ══ SECTION 8 — FINAL CTA STRIP ════════════════════════════════════ */}
      <section style={{ background: pink, padding: '5rem 2rem', textAlign: 'center' }}>
        <div style={{ maxWidth: 600, margin: '0 auto' }}>
          <h2 style={{ color: '#ffffff', fontFamily: serif, fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', fontWeight: 400, marginBottom: 16, letterSpacing: '0.02em' }}>
            Ready to take your first step?
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.82)', fontSize: 16, lineHeight: 1.75, marginBottom: 36, fontWeight: 300 }}>
            Choose the program that fits where you are. Reserve your seat today.
          </p>
          <div className="about-cta-btns" style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/#programs" style={{ background: '#ffffff', color: pink, padding: '15px 36px', borderRadius: 10, fontSize: 14, fontWeight: 700, textDecoration: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.15)' }}>
              Reserve Your Seat
            </Link>
            <a href="https://wa.me/237683493220" target="_blank" rel="noopener noreferrer" style={{ background: 'transparent', border: '2px solid rgba(255,255,255,0.7)', color: '#ffffff', padding: '15px 36px', borderRadius: 10, fontSize: 14, fontWeight: 700, textDecoration: 'none' }}>
              Talk to Us First
            </a>
          </div>
        </div>
      </section>

    </main>
  )
}
