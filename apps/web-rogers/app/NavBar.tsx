'use client'

import { useState } from 'react'
import Image from 'next/image'

const NAV_LINKS = [
  { label: 'Programs', href: '/#programs'   },
  { label: 'About',    href: '/about'        },
  { label: 'Stories',  href: '/testimonials' },
  { label: 'Events',   href: '/#events'      },
  { label: 'Coaching', href: '/#coaching'    },
]

export default function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <>
      <style>{`
        @media (max-width: 860px) {
          .rn-nav-links   { display: none !important; }
          .rn-reserve-cta { display: none !important; }
          .rn-hamburger   { display: flex !important; }
        }
        @media (min-width: 861px) {
          .rn-hamburger   { display: none !important; }
        }
      `}</style>

      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
        height: '76px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 48px',
        background: 'rgba(8, 2, 30, 0.92)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        boxShadow: '0 1px 24px rgba(0,0,0,0.4)',
      }}>

        {/* LOGO */}
        <a href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10 }}>
          <Image
            src="/logos/rogers-nforgwei.png"
            alt="Rogers Nforgwei"
            width={130}
            height={42}
            style={{ objectFit: 'contain', filter: 'brightness(0) invert(1)' }}
            priority
          />
        </a>

        {/* DESKTOP LINKS */}
        <div className="rn-nav-links" style={{ display: 'flex', alignItems: 'center', gap: 36 }}>
          {NAV_LINKS.map(link => (
            <a
              key={link.href}
              href={link.href}
              style={{
                color: 'rgba(255,255,255,0.65)',
                textDecoration: 'none',
                fontFamily: "var(--font-headline, 'Nunito', system-ui, sans-serif)",
                fontWeight: 600,
                fontSize: '0.875rem',
                letterSpacing: '0.03em',
                transition: 'color 0.18s ease',
                whiteSpace: 'nowrap',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = '#ffffff' }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.65)' }}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* RIGHT SIDE: CTA + Hamburger */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <a
            className="rn-reserve-cta"
            href="/#programs"
            style={{
              background: '#f72585',
              color: '#ffffff',
              padding: '11px 28px',
              borderRadius: 7,
              textDecoration: 'none',
              fontFamily: "var(--font-headline, 'Nunito', system-ui, sans-serif)",
              fontWeight: 700,
              fontSize: '0.875rem',
              letterSpacing: '0.02em',
              whiteSpace: 'nowrap',
              transition: 'all 0.18s ease',
              boxShadow: '0 4px 18px rgba(247,37,133,0.35)',
            }}
            onMouseEnter={e => {
              const el = e.currentTarget as HTMLAnchorElement
              el.style.transform = 'translateY(-1px)'
              el.style.boxShadow = '0 6px 24px rgba(247,37,133,0.5)'
            }}
            onMouseLeave={e => {
              const el = e.currentTarget as HTMLAnchorElement
              el.style.transform = 'translateY(0)'
              el.style.boxShadow = '0 4px 18px rgba(247,37,133,0.35)'
            }}
          >
            Reserve Your Seat
          </a>

          {/* HAMBURGER */}
          <button
            className="rn-hamburger"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            style={{
              display: 'none',
              flexDirection: 'column', gap: 5,
              padding: 8, background: 'transparent', border: 'none', cursor: 'pointer',
            }}
          >
            <span style={{ display: 'block', width: 22, height: 2, background: '#f72585', transition: 'all 0.3s', transform: menuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none' }} />
            <span style={{ display: 'block', width: 22, height: 2, background: '#f72585', transition: 'all 0.3s', opacity: menuOpen ? 0 : 1 }} />
            <span style={{ display: 'block', width: 22, height: 2, background: '#f72585', transition: 'all 0.3s', transform: menuOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none' }} />
          </button>
        </div>
      </nav>

      {/* MOBILE OVERLAY */}
      {menuOpen && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 999,
          background: '#0a0219',
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 36,
        }}>
          <button
            onClick={() => setMenuOpen(false)}
            style={{ position: 'absolute', top: 24, right: 24, background: 'transparent', border: 'none', color: '#f72585', fontSize: 28, cursor: 'pointer', lineHeight: 1 }}
          >
            ✕
          </button>
          {NAV_LINKS.map(link => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              style={{
                color: 'rgba(255,255,255,0.85)',
                fontSize: 26, fontWeight: 600, textDecoration: 'none',
                letterSpacing: '0.05em',
                fontFamily: "var(--font-headline, 'Nunito', system-ui, sans-serif)",
              }}
            >
              {link.label}
            </a>
          ))}
          <a
            href="/#programs"
            onClick={() => setMenuOpen(false)}
            style={{
              marginTop: 16,
              background: '#f72585', color: '#fff',
              padding: '14px 36px', borderRadius: 8,
              fontFamily: "var(--font-headline, 'Nunito', system-ui, sans-serif)",
              fontWeight: 700, fontSize: '1rem', textDecoration: 'none',
              boxShadow: '0 4px 18px rgba(247,37,133,0.4)',
            }}
          >
            Reserve Your Seat
          </a>
        </div>
      )}
    </>
  )
}
