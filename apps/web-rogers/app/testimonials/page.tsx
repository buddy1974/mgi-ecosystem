import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/seo'
import { TestimonialsSection } from './TestimonialsSection'
import { SquareBars } from '@/components/SquareBars'

export const metadata: Metadata = buildMetadata({
  title: 'Transformation Stories',
  description: 'Real testimonials from men and leaders transformed by Apostle Rogers Nforgwei — through Dominion Life, Men On Duty, CEO On Mission, and personal coaching across Cameroon and 30+ nations.',
  path: '/testimonials',
})

const serif = "Georgia, 'Times New Roman', serif"
const purple = '#3a0ca3'
const sky    = '#4361ee'

export default function TestimonialsPage() {
  return (
    <main style={{ background: '#0a0414', fontFamily: "var(--font-body, 'Nunito', system-ui, sans-serif)" }}>

      {/* ══ HERO ════════════════════════════════════════════════════════════ */}
      <section style={{
        background: `linear-gradient(150deg, #060210 0%, ${purple} 60%, #2a0880 100%)`,
        minHeight: 400,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '100px 2rem 80px',
        position: 'relative', overflow: 'hidden',
        textAlign: 'center',
      }}>
        {/* Doodle wave */}
        <svg style={{ position: 'absolute', bottom: 0, left: 0, right: 0, opacity: 0.06, pointerEvents: 'none' }} viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path d="M0,30 C240,55 480,5 720,30 C960,55 1200,5 1440,30" stroke="#fff" strokeWidth="2" fill="none"/>
        </svg>

        <div style={{ maxWidth: 720, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }}>
            <SquareBars color={sky} />
          </div>
          <h1 style={{
            fontFamily: serif,
            color: '#ffffff',
            fontSize: 'clamp(2rem, 5vw, 3.8rem)',
            fontWeight: 400,
            letterSpacing: '0.02em',
            lineHeight: 1.15,
            marginBottom: 24,
          }}>
            What men say after they step in.
          </h1>
          <div style={{ width: 64, height: 2, background: sky, margin: '0 auto 24px', opacity: 0.6 }} />
          <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: 17, lineHeight: 1.8, maxWidth: 580, margin: '0 auto', fontWeight: 300 }}>
            These are not marketing quotes. These are men describing what happened
            to them — in their words, from their programs, in their cities.
          </p>
        </div>
      </section>

      {/* ══ INTERACTIVE SECTIONS (client) ═══════════════════════════════════ */}
      <TestimonialsSection />

    </main>
  )
}
