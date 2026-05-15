import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/seo'
import Image from 'next/image'
import Link from 'next/link'

export const metadata: Metadata = buildMetadata({
  title: 'About Rogers Nforgwei',
  description: 'Apostle Dr. Rogers Ngalla Nforgwei — Knight and Officer of the National Order of Cameroon, former Cambridge University Press Business Development Manager for Africa, founder of NMI Education across 7 countries.',
  path: '/about',
})
import { SquareBars } from '@/components/SquareBars'
import { ScrollReveal } from '@/components/ScrollReveal'

const serif = "Georgia, 'Times New Roman', serif"
const sans  = "var(--font-body, 'Nunito', 'Plus Jakarta Sans', system-ui, sans-serif)"

const purple = '#3a0ca3'
const pink   = '#f72585'
const sky    = '#4361ee'
const light  = '#f1f1f1'

const STAT_CARDS = [
  { number: '47+',  label: 'Families Supported with Scholarships' }, // Across 5 Regions of Cameroon
  { number: '30+',  label: 'Countries — Cambridge University Press' }, // Cambridge University Press Mid Africa Region
  { number: '7',    label: 'Nations — NMI Education'              }, // CEMAC + Senegal, Gabon, Chad, Guinea Conakry, Rwanda
  { number: '1999', label: 'Joined Cambridge University Press'    }, // 26+ Years of Global Leadership
]

const PROGRAMS = [
  {
    name: "Dominion Life Men's Conference",
    who:  'For men ready to stop drifting and start leading.',
    promise: 'A gathering of men called to lead with faith, vision, and authority. Conference format — register online.',
    href: '/programs/dominion-life',
  },
  {
    name: 'Men On Duty',
    who:  'For men who want their faith, family, and career to move as one.',
    promise: 'Structured seminars for men ready to step fully into their purpose in family, work, and community.',
    href: '/programs/men-on-duty',
  },
  {
    name: 'CEO On Mission',
    who:  'For executives and entrepreneurs who lead from conviction.',
    promise: 'Private one-to-one executive coaching for leaders building organisations with kingdom values.',
    href: '/programs/ceo-on-mission',
  },
]

// TODO: Replace ALL testimonials below with real testimonials from Rogers
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
          .about-story-grid    { grid-template-columns: 1fr !important; }
          .about-stats-grid    { grid-template-columns: repeat(2, 1fr) !important; }
          .about-programs-grid { grid-template-columns: 1fr !important; }
          .about-tease-grid    { grid-template-columns: 1fr !important; }
          .about-cta-btns      { flex-direction: column !important; align-items: center !important; }
          .section-premium     { padding-top: 80px !important; padding-bottom: 80px !important; }
        }
        @media (max-width: 480px) {
          .about-stats-grid    { grid-template-columns: 1fr !important; }
        }
      `}</style>

      {/* ══ SECTION 1 — HERO BANNER ══════════════════════════════════════════ */}
      <section className="section-premium" style={{
        background: purple,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        position: 'relative', overflow: 'hidden',
        textAlign: 'center',
      }}>
        {/* Ambient glow */}
        <div style={{ position: 'absolute', top: -60, right: -60, width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(67,97,238,0.25) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <svg style={{ position: 'absolute', bottom: 0, left: 0, right: 0, opacity: 0.06, pointerEvents: 'none' }} viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path d="M0,30 C200,55 400,5 600,30 C800,55 1000,5 1200,30 C1320,45 1380,35 1440,30" stroke="#fff" strokeWidth="2" fill="none"/>
          <path d="M0,45 C200,70 400,20 600,45 C800,70 1000,20 1200,45 C1320,60 1380,50 1440,45" stroke="#fff" strokeWidth="1.5" fill="none"/>
        </svg>

        <div style={{ position: 'relative', zIndex: 2, maxWidth: 760, margin: '0 auto', padding: '0 2rem' }}>
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
            Apostle. Executive. Nation Builder.
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
            Rogers Ngalla Nforgwei &mdash; Apostle &middot; Doctor of Applied Theology &middot; Knight &amp; Officer of the National Orders of Cameroon
          </p>
        </div>
      </section>

      {/* ══ SECTION 2 — ORIGIN STORY ════════════════════════════════════════ */}
      <section className="section-premium" style={{ background: light }}>
        <ScrollReveal>
          <div
            className="about-story-grid"
            style={{ maxWidth: 1100, margin: '0 auto', padding: '0 2rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'center' }}
          >
            {/* Left — photo */}
            <div style={{ position: 'relative' }}>
              <div style={{ borderRadius: 28, overflow: 'hidden', background: purple, aspectRatio: '3/4', position: 'relative', maxHeight: 560 }}>
                <Image
                  src="/rogers-hero.png"
                  alt="Apostle Dr. Rogers Ngalla Nforgwei — Publisher, Minister, Nation Builder, Yaoundé, Cameroon"
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
                Rogers Ngalla Nforgwei grew up in Mbabi, Wat village, Donga Mantung Division,
                in the Northwest Region of Cameroon. He joined Cambridge University Press in
                1999 and steadily rose to become Business Development Manager for Africa —
                directing business across more than 30 countries. He is the only Black African
                from sub-Saharan Africa to have held that level of responsibility within the
                organisation.
              </p>
              <p style={{ color: '#4c4c4c', fontSize: 16, lineHeight: 1.9, marginBottom: 20, fontWeight: 300 }}>
                In 2007, he founded NMI Education in Yaound&eacute;, now one of the leading school
                textbook publishing companies in Cameroon, with a footprint spanning the CEMAC
                sub-region, Senegal, Gabon, Chad, Guinea Conakry, and Rwanda &mdash; and more than
                100 people earning their livelihood through the company.
              </p>
              <p style={{ color: '#4c4c4c', fontSize: 16, lineHeight: 1.9, marginBottom: 36, fontWeight: 300 }}>
                A Doctorate in Applied Theology (Kingdom Life University, California), keynote speaker
                at CCBP24, and co-founder of the DRIMP Foundation with his wife Delphine &mdash; Rogers
                brings the same kingdom-minded conviction to every program he leads.
              </p>
              <div style={{ display: 'flex', gap: 12 }}>
                <a href="#about-work" style={{ background: purple, color: '#fff', padding: '14px 28px', borderRadius: '999px', fontSize: 13, fontWeight: 700, textDecoration: 'none' }}>
                  See the Work
                </a>
                <Link href="/programs/dominion-life" style={{ background: 'rgba(255,255,255,0.06)', border: `1px solid rgba(58,12,163,0.3)`, color: purple, padding: '14px 28px', borderRadius: '999px', fontSize: 13, fontWeight: 700, textDecoration: 'none', backdropFilter: 'blur(10px)' }}>
                  Explore Programs
                </Link>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* ══ SECTION 3 — IDENTITY STATEMENT ══════════════════════════════════ */}
      <section className="section-premium" style={{ background: purple, textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, rgba(67,97,238,0.18) 0%, transparent 65%)', pointerEvents: 'none' }} />
        <ScrollReveal>
          <div style={{ maxWidth: 820, margin: '0 auto', position: 'relative', zIndex: 1, padding: '0 2rem' }}>
            <p style={{ color: sky, fontSize: 11, fontWeight: 700, letterSpacing: '0.45em', textTransform: 'uppercase', marginBottom: 32 }}>
              Who Rogers Is
            </p>
            {/* Pull quote — editorial serif, generous breathing room */}
            <div style={{ padding: '48px 0', marginBottom: 40, borderTop: '1px solid rgba(255,255,255,0.15)', borderBottom: '1px solid rgba(255,255,255,0.15)' }}>
              <h2 style={{
                fontFamily: serif,
                color: '#ffffff',
                fontSize: 'clamp(1.7rem, 3.5vw, 2.8rem)',
                fontWeight: 400,
                letterSpacing: '0.02em',
                lineHeight: 1.55,
                fontStyle: 'italic',
                margin: 0,
              }}>
                A faith leader who thinks like a CEO.<br />
                A publisher who builds nations.<br />
                A mentor who was once mentored only by hardship.<br />
                Rogers Ngalla Nforgwei is the embodiment of what happens when faith,
                discipline, and relentless work occupy the same man.
              </h2>
            </div>
            <div style={{ display: 'flex', gap: 4, justifyContent: 'center' }}>
              <div style={{ width: 20, height: 6, background: pink, borderRadius: 1 }} />
              <div style={{ width: 12, height: 6, background: pink, borderRadius: 1, opacity: 0.6 }} />
              <div style={{ width: 8, height: 6, background: pink, borderRadius: 1, opacity: 0.35 }} />
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* ══ SECTION 4 — THE WORK ════════════════════════════════════════════ */}
      <section id="about-work" className="section-premium" style={{ background: light }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 2rem' }}>
          <ScrollReveal>
            <div style={{ textAlign: 'center', marginBottom: 52 }}>
              <SquareBars color={purple} />
              <p style={{ color: purple, fontSize: 11, fontWeight: 700, letterSpacing: '0.4em', textTransform: 'uppercase', marginBottom: 12 }}>
                The Work
              </p>
              <h2 style={{ color: purple, fontFamily: serif, fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', fontWeight: 400, letterSpacing: '0.02em', margin: 0 }}>
                Fifteen years. One consistent mission.
              </h2>
            </div>
          </ScrollReveal>

          {/* Stats block — glass panel */}
          <div
            className="glass-panel about-stats-grid"
            style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 0, marginBottom: 56, overflow: 'hidden', background: 'rgba(58,12,163,0.04)' }}
          >
            {STAT_CARDS.map((s, i) => (
              <ScrollReveal key={s.label} delay={i * 0.12}>
                <div style={{ padding: '2rem 1.5rem', borderRight: i < 3 ? '1px solid rgba(58,12,163,0.1)' : 'none', textAlign: 'center' }}>
                  <p style={{ color: purple, fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, letterSpacing: '-0.04em', margin: '0 0 8px' }}>{s.number}</p>
                  <p style={{ color: '#6b7280', fontSize: 13, margin: 0, lineHeight: 1.4 }}>{s.label}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal>
            <div style={{ textAlign: 'center' }}>
              <h3 style={{ color: purple, fontSize: 'clamp(1.3rem, 2.5vw, 1.7rem)', fontWeight: 700, marginBottom: 12, letterSpacing: '-0.02em' }}>
                Three programs. One mission.
              </h3>
              <p style={{ color: '#4c4c4c', fontSize: 15, lineHeight: 1.8, maxWidth: 520, margin: '0 auto 32px', fontWeight: 300 }}>
                Dominion Life, Men On Duty, and CEO On Mission are not events.
                They are turning points. Each one designed to answer a different
                question a man is living with.
              </p>
              <Link href="/programs/dominion-life" style={{ display: 'inline-block', background: pink, color: '#fff', padding: '16px 36px', borderRadius: '999px', fontSize: 14, fontWeight: 700, textDecoration: 'none', boxShadow: '0 4px 20px rgba(247,37,133,0.3)' }}>
                Explore the Programs →
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ══ SECTION 5 — PULL QUOTE ═══════════════════════════════════════════ */}
      <section className="section-premium" style={{ background: '#111', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 60% 50%, rgba(58,12,163,0.12) 0%, transparent 60%)', pointerEvents: 'none' }} />
        <ScrollReveal>
          <div style={{ maxWidth: 760, margin: '0 auto', position: 'relative', zIndex: 1, padding: '0 2rem' }}>
            <p style={{ color: sky, fontSize: 11, fontWeight: 700, letterSpacing: '0.4em', textTransform: 'uppercase', marginBottom: 28 }}>
              On Purpose
            </p>
            <p style={{ color: 'rgba(255,255,255,0.15)', fontFamily: serif, fontSize: 'clamp(3rem, 6vw, 5rem)', lineHeight: 1, marginBottom: 24, display: 'block' }}>
              &ldquo;
            </p>
            <blockquote style={{ fontFamily: serif, fontStyle: 'italic', color: '#ffffff', fontSize: 'clamp(1.4rem, 2.8vw, 2.2rem)', lineHeight: 1.55, fontWeight: 400, margin: '0 0 32px' }}>
              I came from nothing and I think today I am impacting a lot of people.
            </blockquote>
            <p style={{ color: pink, fontSize: 13, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', margin: 0 }}>
              — Rogers Ngalla Nforgwei
            </p>
          </div>
        </ScrollReveal>
      </section>

      {/* ══ SECTION 6 — PROGRAMS HE BUILT ══════════════════════════════════ */}
      <section className="section-premium" style={{ background: 'linear-gradient(145deg, #3a0ca3 0%, #1a0577 100%)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 2rem' }}>
          <ScrollReveal>
            <div style={{ textAlign: 'center', marginBottom: 52 }}>
              <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: 11, fontWeight: 700, letterSpacing: '0.4em', textTransform: 'uppercase', marginBottom: 12 }}>
                Programs He Built
              </p>
              <h2 style={{ color: '#ffffff', fontFamily: serif, fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', fontWeight: 400, letterSpacing: '0.02em', margin: 0 }}>
                Forged from lived questions.
              </h2>
            </div>
          </ScrollReveal>

          <div
            className="about-programs-grid"
            style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}
          >
            {PROGRAMS.map((p, i) => (
              <ScrollReveal key={p.name} delay={i * 0.12}>
                <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', height: '100%', background: 'rgba(255,255,255,0.08)', borderRadius: 16, border: '1px solid rgba(255,255,255,0.12)' }}>
                  <h3 style={{ color: '#ffffff', fontSize: 17, fontWeight: 700, marginBottom: 10, lineHeight: 1.3 }}>{p.name}</h3>
                  <p style={{ color: sky, fontSize: 13, fontWeight: 500, marginBottom: 12, lineHeight: 1.5 }}>{p.who}</p>
                  <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: 13, lineHeight: 1.7, fontWeight: 300, flex: 1, marginBottom: 20 }}>{p.promise}</p>
                  <Link href={p.href} style={{ color: sky, fontSize: 13, fontWeight: 700, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                    Learn More →
                  </Link>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══ SECTION 7 — SOCIAL PROOF TEASE ══════════════════════════════════ */}
      <section className="section-premium" style={{ background: light }}>
        <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 2rem' }}>
          <ScrollReveal>
            <div style={{ textAlign: 'center', marginBottom: 48 }}>
              <SquareBars color={sky} />
              <p style={{ color: sky, fontSize: 11, fontWeight: 700, letterSpacing: '0.4em', textTransform: 'uppercase', marginBottom: 12 }}>
                Transformation Stories
              </p>
              <h2 style={{ color: purple, fontFamily: serif, fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', fontWeight: 400, letterSpacing: '0.02em', margin: 0 }}>
                What happens when men step in.
              </h2>
            </div>
          </ScrollReveal>

          <div
            className="about-tease-grid"
            style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 40 }}
          >
            {TEASE_TESTIMONIALS.map((t, i) => (
              <ScrollReveal key={t.name} delay={i * 0.12}>
                <div className="card-editorial" style={{ padding: '2rem', position: 'relative' }}>
                  <div style={{ fontSize: 64, lineHeight: 1, opacity: 0.06, fontFamily: serif, position: 'absolute', top: 12, left: 16, color: purple }}>&ldquo;</div>
                  <p style={{ color: pink, fontFamily: serif, fontSize: '2.5rem', lineHeight: 1, marginBottom: 12 }}>&ldquo;</p>
                  <p style={{ color: '#3a3a3a', fontFamily: serif, fontStyle: 'italic', fontSize: 15, lineHeight: 1.75, marginBottom: 20, position: 'relative', zIndex: 1 }}>
                    {t.quote}
                  </p>
                  <div style={{ borderTop: '1px solid #f0f0f0', paddingTop: 14 }}>
                    <p style={{ color: purple, fontWeight: 700, fontSize: 14, margin: '0 0 3px' }}>{t.name}</p>
                    <p style={{ color: '#9ca3af', fontSize: 12, margin: 0 }}>{t.city} · {t.program}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal>
            <div style={{ textAlign: 'center' }}>
              <Link href="/testimonials" style={{ display: 'inline-block', background: 'transparent', border: `2px solid ${pink}`, color: pink, padding: '14px 32px', borderRadius: '999px', fontSize: 14, fontWeight: 700, textDecoration: 'none' }}>
                See All Transformation Stories →
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ══ SECTION 8 — FINAL CTA STRIP ════════════════════════════════════ */}
      <section className="section-premium" style={{ background: pink, textAlign: 'center' }}>
        <ScrollReveal>
          <div style={{ maxWidth: 600, margin: '0 auto', padding: '0 2rem' }}>
            <h2 style={{ color: '#ffffff', fontFamily: serif, fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', fontWeight: 400, marginBottom: 16, letterSpacing: '0.02em' }}>
              Ready to take your first step?
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.82)', fontSize: 16, lineHeight: 1.75, marginBottom: 36, fontWeight: 300 }}>
              Choose the program that fits where you are. Reserve your seat today.
            </p>
            <div className="about-cta-btns" style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/#programs" style={{ background: '#ffffff', color: pink, padding: '16px 36px', borderRadius: '999px', fontSize: 14, fontWeight: 700, textDecoration: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.15)' }}>
                Reserve Your Seat
              </Link>
              <a href="https://wa.me/237683493220" target="_blank" rel="noopener noreferrer" style={{ background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.3)', color: '#ffffff', padding: '16px 36px', borderRadius: '999px', fontSize: 14, fontWeight: 700, textDecoration: 'none', backdropFilter: 'blur(10px)' }}>
                Talk to Us First
              </a>
            </div>
          </div>
        </ScrollReveal>
      </section>

    </main>
  )
}
