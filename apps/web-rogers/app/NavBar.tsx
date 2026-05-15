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
  { label: 'Contact',  href: '/contact'           },
  { label: 'WhatsApp', href: 'https://wa.me/237683493220' },
]

const hl = "var(--font-headline, 'Nunito', system-ui, sans-serif)"

export default function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <>
      <style>{`
        @media (max-width: 860px) {
          .rn-nav-links   { display: none !important; }
          .rn-reserve-cta { display: none !important; }
          .rn-hamburger   { display: flex !important; }
          .rn-pill        { padding: 8px 16px !important; }
          .rn-logo-wrap   { padding: 6px 12px !important; }
        }
        @media (min-width: 861px) {
          .rn-hamburger   { display: none !important; }
        }
      `}</style>

      {/* Sticky outer wrapper — positions the pill in the page flow */}
      <div style={{
        position: 'sticky',
        top: '16px',
        zIndex: 1000,
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        padding: '0 24px',
        pointerEvents: 'none',
      }}>
        {/* The glass pill */}
        <nav
          className="rn-pill"
          style={{
            maxWidth: '1280px',
            width: '100%',
            minHeight: '68px',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            background: 'rgba(13,1,32,0.80)',
            border: '1px solid rgba(255,255,255,0.12)',
            borderRadius: '999px',
            padding: '10px 20px',
            boxShadow: '0 10px 35px rgba(0,0,0,0.30)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            pointerEvents: 'all',
          }}
        >
          {/* Logo capsule */}
          <a href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
            <div
              className="rn-logo-wrap"
              style={{
                background: 'rgba(255,255,255,0.08)',
                border: '1px solid rgba(255,255,255,0.15)',
                borderRadius: '999px',
                padding: '10px 16px',
                display: 'flex',
                alignItems: 'center',
                boxShadow: '0 4px 18px rgba(0,0,0,0.12)',
              }}
            >
              <Image
                src="/logos/favicon.png"
                alt="Rogers Nforgwei"
                width={120}
                height={40}
                style={{ objectFit: 'contain' }}
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
                  textDecoration: 'none',
                  fontFamily: hl,
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

          {/* CTA + Hamburger */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <a
              className="rn-reserve-cta btn-premium"
              href="/programs/dominion-life?source=navbar#registration"
              style={{
                background: '#f72585',
                color: '#ffffff',
                padding: '11px 28px',
                borderRadius: '999px',
                textDecoration: 'none',
                fontFamily: hl,
                fontWeight: 700,
                fontSize: '0.875rem',
                letterSpacing: '0.02em',
                whiteSpace: 'nowrap',
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
      </div>

      {/* Mobile fullscreen overlay */}
      {menuOpen && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 999,
          background: 'rgba(10,2,25,0.97)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 36,
        }}>
          <button
            onClick={() => setMenuOpen(false)}
            style={{ position: 'absolute', top: 24, right: 24, background: 'transparent', border: 'none', color: '#f72585', fontSize: 28, cursor: 'pointer', lineHeight: 1 }}
          >
            ✕
          </button>
          {[...NAV_LINKS, ...MOBILE_EXTRA_LINKS].map(link => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              style={{
                color: 'rgba(255,255,255,0.85)',
                fontSize: 26, fontWeight: 600, textDecoration: 'none',
                letterSpacing: '0.05em',
                fontFamily: hl,
              }}
            >
              {link.label}
            </a>
          ))}
          <a
            href="/programs/dominion-life?source=navbar#registration"
            onClick={() => setMenuOpen(false)}
            style={{
              marginTop: 16,
              background: '#f72585', color: '#fff',
              padding: '14px 40px', borderRadius: '999px',
              fontFamily: hl,
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
