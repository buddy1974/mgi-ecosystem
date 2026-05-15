'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useMediaQuery } from '@/components/useMediaQuery'

const hl     = "var(--font-headline, 'Nunito', system-ui, sans-serif)"
const purple = '#3a0ca3'
const pink   = '#f72585'

const fadeUp = {
  hidden:  { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }
  })
}

const FLOAT_CARDS = [
  { label: '30+',    sub: 'Nations Reached', top: '5%',   left: '-14%'  },
  { label: '1999',   sub: 'Cambridge Entry', top: '5%',   right: '-14%' },
  { label: 'Knight', sub: '& Officer',       bottom: '22%', left: '-14%'  },
  { label: '7',      sub: 'Countries — NMI', bottom: '22%', right: '-14%' },
]

export function HeroSection() {
  const isMobile = useMediaQuery('(max-width: 900px)')

  return (
    <>
      <style>{`
        @media (max-width: 900px) {
          .hero-editorial-grid {
            grid-template-columns: 1fr !important;
            gap: 0 !important;
            padding: 0 0 64px !important;
          }
          .hero-float-cards  { display: none !important; }
          .hero-portrait-col { order: -1; height: 320px !important; border-radius: 0 !important; margin-bottom: 0 !important; }
          .hero-portrait-col > div { border-radius: 0 !important; }
          .hero-content-col  { padding: 40px 24px 0 !important; }
          .hero-cta-row      { flex-direction: column !important; gap: 12px !important; }
          .hero-cta-primary  { width: 100% !important; text-align: center !important; justify-content: center !important; }
          .hero-cta-secondary { width: 100% !important; text-align: center !important; justify-content: center !important; }
        }
      `}</style>

      <section
        className="depth-bg"
        style={{
          background: `linear-gradient(150deg, #0a0120 0%, ${purple} 55%, #1e0a60 100%)`,
          position: 'relative',
          overflow: 'visible',
        }}
      >
        {/* Ambient glow */}
        <div style={{ position: 'absolute', bottom: -120, left: '40%', width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle, rgba(247,37,133,0.07) 0%, transparent 70%)', pointerEvents: 'none', zIndex: 0 }} />

        <div
          className="hero-editorial-grid"
          style={{
            maxWidth: '1280px',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
            gap: isMobile ? 0 : '80px',
            alignItems: 'center',
            padding: isMobile ? '0 0 64px' : '120px 48px',
            position: 'relative',
            zIndex: 1,
          }}
        >
          {/* ── LEFT / BOTTOM: authority content ── */}
          <div className="hero-content-col" style={isMobile ? { padding: '40px 24px 0' } : {}}>
            {/* Authority tag pill */}
            <motion.div custom={0} variants={fadeUp} initial="hidden" animate="visible">
              <div
                className="glass-panel"
                style={{ display: 'inline-flex', padding: '8px 18px', marginBottom: '28px' }}
              >
                <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.12em', opacity: 0.75, fontFamily: hl, textTransform: 'uppercase' as const, color: '#ffffff' }}>
                  Apostle · Author · Executive · Coach
                </span>
              </div>
            </motion.div>

            {/* Eyebrow */}
            <motion.p
              custom={0.5} variants={fadeUp} initial="hidden" animate="visible"
              style={{ color: '#7b90f3', fontFamily: hl, fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase' as const, marginBottom: 16, lineHeight: 1 }}
            >
              Rogers Nforgwei
            </motion.p>

            {/* H1 */}
            <motion.div custom={1} variants={fadeUp} initial="hidden" animate="visible">
              <h1 style={{ color: '#ffffff', fontFamily: hl, fontSize: 'clamp(2.4rem, 5.5vw, 5.5rem)', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1.05, marginBottom: 0 }}>
                You were built
              </h1>
              <h1 style={{ color: '#ffffff', fontFamily: hl, fontSize: 'clamp(2.4rem, 5.5vw, 5.5rem)', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1.05, marginBottom: 0 }}>
                for more than
              </h1>
              <h1 style={{ background: 'linear-gradient(90deg, #7b90f3 0%, #f72585 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontFamily: hl, fontSize: 'clamp(2.4rem, 5.5vw, 5.5rem)', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1.05, marginBottom: 24 }}>
                this.
              </h1>
            </motion.div>

            {/* Subheadline */}
            <motion.p
              custom={2} variants={fadeUp} initial="hidden" animate="visible"
              style={{ color: 'rgba(255,255,255,0.72)', fontFamily: hl, fontSize: 'clamp(1rem, 2.2vw, 1.1rem)', lineHeight: 1.8, marginBottom: 40, maxWidth: 480, fontWeight: 300 }}
            >
              Faith-Based Coaching &amp; Mentorship in Leadership, Business and Personal Development
            </motion.p>

            {/* CTA row */}
            <motion.div
              custom={3} variants={fadeUp} initial="hidden" animate="visible"
              className="hero-cta-row"
              style={{ display: 'flex', gap: 14, flexWrap: 'wrap' as const, alignItems: 'center' }}
            >
              <a
                href="/#programs"
                className="btn-premium hero-cta-primary"
                style={{
                  background: pink, color: '#ffffff',
                  padding: '16px 32px', borderRadius: '999px',
                  textDecoration: 'none', fontFamily: hl,
                  fontWeight: 700, fontSize: '1rem',
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                  boxShadow: '0 6px 28px rgba(247,37,133,0.42)',
                  transition: 'all 0.25s ease',
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLAnchorElement
                  el.style.transform = 'translateY(-2px)'
                  el.style.boxShadow = '0 10px 36px rgba(247,37,133,0.58)'
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLAnchorElement
                  el.style.transform = 'translateY(0)'
                  el.style.boxShadow = '0 6px 28px rgba(247,37,133,0.42)'
                }}
              >
                Explore Programs
              </a>
              <a
                href="/about"
                className="hero-cta-secondary"
                style={{
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.16)',
                  borderRadius: '999px', padding: '16px 30px',
                  textDecoration: 'none', fontFamily: hl,
                  fontWeight: 600, fontSize: '0.95rem',
                  color: 'rgba(255,255,255,0.85)',
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  backdropFilter: 'blur(10px)', transition: 'all 0.25s ease',
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(255,255,255,0.10)' }}
                onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(255,255,255,0.06)' }}
              >
                About Rogers
              </a>
            </motion.div>
          </div>

          {/* ── RIGHT / TOP: portrait — comes first on mobile via order: -1 ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
            className="hero-portrait-col"
            style={{ position: 'relative', height: isMobile ? '320px' : '580px' }}
          >
            <div style={{ position: 'relative', height: '100%', borderRadius: isMobile ? 0 : '28px', overflow: 'hidden' }}>
              <Image
                src="/images/rogers-hero.png"
                alt="Apostle Dr. Rogers Ngalla Nforgwei"
                fill
                style={{ objectFit: 'cover', objectPosition: 'center top' }}
                priority
              />
              <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0, height: '45%',
                background: 'linear-gradient(to top, rgba(10,1,32,0.90), transparent)',
              }} />
            </div>

            {/* Floating glass metric cards — desktop only */}
            <div className="hero-float-cards">
              {FLOAT_CARDS.map((card, i) => {
                const posStyle: React.CSSProperties = {}
                if (card.top)    posStyle.top    = card.top
                if (card.bottom) posStyle.bottom = card.bottom
                if (card.left)   posStyle.left   = card.left
                if (card.right)  posStyle.right  = card.right

                return (
                  <motion.div
                    key={card.label}
                    className="glass-panel"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 + i * 0.15, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    style={{ position: 'absolute', ...posStyle, padding: '14px 18px', minWidth: '110px', textAlign: 'center' as const, zIndex: 10 }}
                  >
                    <div style={{ fontSize: 22, fontWeight: 700, color: '#ffffff', fontFamily: hl }}>{card.label}</div>
                    <div style={{ fontSize: 12, opacity: 0.6, marginTop: 4, color: '#ffffff', fontFamily: hl }}>{card.sub}</div>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
