'use client'

import { useState } from 'react'
import Image from 'next/image'

const NAV_LINKS = [
  { label: 'Programs', href: '/programs/dominion-life' },
  { label: 'Events',   href: '/events'                 },
  { label: 'About',    href: '/about'                  },
  { label: 'Stories',  href: '/testimonials'           },
  { label: 'Coaching', href: '/coaching'               },
]

const MOBILE_EXTRA_LINKS = [
  { label: 'Contact',  href: '/contact'                    },
  { label: 'WhatsApp', href: 'https://wa.me/237683493220'  },
]

const hl = "var(--font-headline, 'Nunito', system-ui, sans-serif)"

export default function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <>
      <style>{`
        @keyframes rn-mobile-slide {
          from { transform: translateX(100%); }
          to   { transform: translateX(0); }
        }
        @media (max-width: 860px) {
          .rn-nav-links   { display: none !important; }
          .rn-reserve-cta { display: none !important; }
          .rn-hamburger   { display: flex !important; }
          .rn-pill        { padding: 8px 16px !important; }
          .rn-logo-wrap   { padding: 8px 14px !important; }
        }
        @media (min-width: 861px) {
          .rn-hamburger   { display: none !important; }
        }
      `}</style>

      {/* Sticky outer wrapper */}
      <div style={{
        position: 'sticky', top: '16px', zIndex: 1000,
        width: '100%', display: 'flex', justifyContent: 'center',
        padding: '0 24px', pointerEvents: 'none',
      }}>
        {/* Glass pill */}
        <nav
          className="rn-pill"
          style={{
            maxWidth: '1280px', width: '100%', minHeight: '68px',
            backdropFilter: 'blur(28px)', WebkitBackdropFilter: 'blur(28px)',
            background: 'rgba(10,1,26,0.85)',
            border: '1px solid rgba(255,255,255,0.11)',
            borderRadius: '999px',
            padding: '10px 20px',
            boxShadow: '0 10px 40px rgba(0,0,0,0.35)',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            pointerEvents: 'all',
          }}
        >
          {/* Logo capsule — high-contrast ivory glass */}
          <a href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
            <div
              className="rn-logo-wrap"
              style={{
                background: 'rgba(255,255,255,0.13)',
                border: '1px solid rgba(255,255,255,0.28)',
                borderRadius: '999px',
                padding: '9px 20px',
                display: 'flex', alignItems: 'center',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                boxShadow: '0 4px 20px rgba(0,0,0,0.20), inset 0 1px 0 rgba(255,255,255,0.14)',
              }}
            >
              <Image
                src="/logos/rogers-nforgwei.png"
                alt="Rogers Nforgwei"
                width={148}
                height={40}
                style={{ objectFit: 'contain', filter: 'brightness(0) invert(1)' }}
                priority
              />
            </div>
          </a>

          {/* Desktop nav links */}
          <div className="rn-nav-links" style={{ display: 'flex', alignItems: 'center', gap: 36 }}>
            {NAV_LINKS.map(link => (
              <a
                key={link.href}
                href={link.href}
                style={{
                  color: 'rgba(255,255,255,0.65)',
                  textDecoration: 'none', fontFamily: hl,
                  fontWeight: 600, fontSize: '0.875rem',
                  letterSpacing: '0.03em',
                  transition: 'color 0.18s ease', whiteSpace: 'nowrap',
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = '#ffffff' }}
                onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.65)' }}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA + Hamburger */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <a
              className="rn-reserve-cta btn-premium"
              href="/programs/dominion-life?source=navbar#registration"
              style={{
                background: '#f72585', color: '#ffffff',
                padding: '11px 28px', borderRadius: '999px',
                textDecoration: 'none', fontFamily: hl,
                fontWeight: 700, fontSize: '0.875rem',
                letterSpacing: '0.02em', whiteSpace: 'nowrap',
                transition: 'all 0.25s ease',
                boxShadow: '0 4px 18px rgba(247,37,133,0.38)',
                display: 'inline-block',
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLAnchorElement
                el.style.transform = 'translateY(-2px)'
                el.style.boxShadow = '0 8px 28px rgba(247,37,133,0.55)'
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLAnchorElement
                el.style.transform = 'translateY(0)'
                el.style.boxShadow = '0 4px 18px rgba(247,37,133,0.38)'
              }}
            >
              Reserve Your Seat
            </a>

            {/* Hamburger — mobile only */}
            <button
              className="rn-hamburger"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
              style={{
                display: 'none', flexDirection: 'column', gap: 5,
                padding: 8, background: 'transparent', border: 'none', cursor: 'pointer',
              }}
            >
              <span style={{ display: 'block', width: 22, height: 2, background: '#f72585', transition: 'all 0.3s', transform: menuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none' }} />
              <span style={{ display: 'block', width: 22, height: 2, background: '#f72585', transition: 'all 0.3s', opacity: menuOpen ? 0 : 1 }} />
              <span style={{ display: 'block', width: 22, height: 2, background: '#f72585', transition: 'all 0.3s', transform: menuOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none' }} />
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile backdrop */}
      {menuOpen && (
        <div
          onClick={() => setMenuOpen(false)}
          style={{
            position: 'fixed', inset: 0, zIndex: 1998,
            background: 'rgba(4,0,12,0.72)',
            backdropFilter: 'blur(6px)',
            WebkitBackdropFilter: 'blur(6px)',
          }}
        />
      )}

      {/* Mobile slide-in panel */}
      {menuOpen && (
        <div style={{
          position: 'fixed', top: 0, right: 0, bottom: 0, zIndex: 1999,
          width: 'min(85vw, 340px)',
          background: 'rgba(8,1,20,0.98)',
          backdropFilter: 'blur(32px)',
          WebkitBackdropFilter: 'blur(32px)',
          borderLeft: '1px solid rgba(255,255,255,0.09)',
          boxShadow: '-32px 0 80px rgba(0,0,0,0.60)',
          display: 'flex', flexDirection: 'column',
          animation: 'rn-mobile-slide 0.28s cubic-bezier(0.22,1,0.36,1)',
        }}>
          {/* Panel header */}
          <div style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            padding: '24px 24px 20px',
            borderBottom: '1px solid rgba(255,255,255,0.07)',
            flexShrink: 0,
          }}>
            <a href="/" onClick={() => setMenuOpen(false)}>
              <Image
                src="/logos/rogers-nforgwei.png"
                alt="Rogers Nforgwei"
                width={120}
                height={34}
                style={{ objectFit: 'contain', filter: 'brightness(0) invert(1)', display: 'block' }}
              />
            </a>
            <button
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
              style={{
                background: 'rgba(255,255,255,0.07)',
                border: '1px solid rgba(255,255,255,0.14)',
                borderRadius: '50%', width: 38, height: 38,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#ffffff', fontSize: 16, cursor: 'pointer', flexShrink: 0,
              }}
            >
              ✕
            </button>
          </div>

          {/* Nav links — large tap targets */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '8px 0' }}>
            {[...NAV_LINKS, ...MOBILE_EXTRA_LINKS].map(link => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                style={{
                  display: 'block',
                  color: 'rgba(255,255,255,0.80)',
                  fontSize: 18, fontWeight: 600,
                  textDecoration: 'none',
                  padding: '18px 24px',
                  fontFamily: hl,
                  letterSpacing: '0.01em',
                  borderBottom: '1px solid rgba(255,255,255,0.05)',
                  transition: 'color 0.15s, background 0.15s',
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLAnchorElement
                  el.style.color = '#ffffff'
                  el.style.background = 'rgba(255,255,255,0.04)'
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLAnchorElement
                  el.style.color = 'rgba(255,255,255,0.80)'
                  el.style.background = 'transparent'
                }}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Sticky CTA */}
          <div style={{
            padding: '20px 24px 32px',
            borderTop: '1px solid rgba(255,255,255,0.07)',
            flexShrink: 0,
          }}>
            <a
              href="/programs/dominion-life?source=navbar#registration"
              onClick={() => setMenuOpen(false)}
              style={{
                display: 'block', textAlign: 'center',
                background: 'linear-gradient(135deg, #f72585, #7209b7)',
                color: '#fff', padding: '16px',
                borderRadius: '999px', fontFamily: hl,
                fontWeight: 700, fontSize: '1rem',
                textDecoration: 'none',
                boxShadow: '0 6px 28px rgba(247,37,133,0.45)',
                letterSpacing: '0.02em',
              }}
            >
              Reserve Your Seat →
            </a>
          </div>
        </div>
      )}
    </>
  )
}
