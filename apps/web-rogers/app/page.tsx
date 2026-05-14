'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const SquareBars = () => (
  <div style={{ display: 'flex', gap: '4px', marginBottom: '16px' }}>
    <div style={{ width: '20px', height: '6px', background: '#3a0ca3', borderRadius: '1px' }} />
    <div style={{ width: '12px', height: '6px', background: '#f72585', borderRadius: '1px' }} />
    <div style={{ width: '8px', height: '6px', background: '#4361ee', borderRadius: '1px' }} />
  </div>
);

export default function HomePage() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const serif = "Georgia, 'Times New Roman', serif";

  const programs = [
    {
      name: "Dominion Life Men's Conference",
      outcome: "Walk away knowing exactly who you are, what you're built for, and how to lead — without apology.",
      color: '#3a0ca3',
      href: '/programs/dominion-life',
      tag: 'Annual Conference',
    },
    {
      name: 'Men On Duty',
      outcome: 'Stop drifting. Start leading — in your home, your faith, your work, and your community.',
      color: '#4361ee',
      href: '/programs/men-on-duty',
      tag: 'Movement',
    },
    {
      name: 'CEO On Mission',
      outcome: 'Build a business that serves a higher purpose — and scale it without losing your soul.',
      color: '#f72585',
      href: '/programs/ceo-on-mission',
      tag: 'Executive Mentorship',
    },
  ];

  const testimonials = [
    {
      quote: "Dominion Life reshaped the way I see my calling as a man. I left with a blueprint, not just inspiration.",
      name: "Pastor Emmanuel K.",
      role: "Church Leader, Yaoundé",
      program: "Dominion Life",
    },
    {
      quote: "CEO On Mission gave me the framework to align my business with my faith. The ROI is in every decision I make now.",
      name: "David Fon",
      role: "CEO, Fon Group",
      program: "CEO On Mission",
    },
    {
      quote: "Rogers doesn't just teach — he pours into you. Men On Duty changed how I show up for my family.",
      name: "Marcus Tabi",
      role: "Engineer & Father, Douala",
      program: "Men On Duty",
    },
  ];

  return (
    <main style={{ background: '#0a0414' }}>
      <style>{`
        @media (max-width: 768px) {
          .hero-wrapper { flex-direction: column !important; }
          .hero-image-col { flex: none !important; height: 280px !important; width: 100% !important; }
          .story-grid { grid-template-columns: 1fr !important; }
          .programs-grid { grid-template-columns: 1fr !important; }
          .testimonials-grid { grid-template-columns: 1fr !important; }
          .coaching-grid { grid-template-columns: 1fr !important; }
          .social-proof-grid { grid-template-columns: repeat(3, 1fr) !important; }
          .footer-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 480px) {
          .social-proof-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>

      {/* ══ 1. HERO ══════════════════════════════════════════════ */}
      <section className="hero-wrapper" style={{
        minHeight: '100vh',
        paddingTop: 70,
        display: 'flex', alignItems: 'stretch',
        background: 'linear-gradient(150deg, #060210 0%, #0a0414 40%, #160830 70%, #1a0a40 100%)',
        position: 'relative', overflow: 'hidden',
      }}>
        {/* Ambient glows */}
        <div style={{ position: 'absolute', top: -100, right: -60, width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle, rgba(67,97,238,0.14) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: -80, left: '45%', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(247,37,133,0.08) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <svg style={{ position: 'absolute', top: '40%', right: '4%', opacity: 0.12, pointerEvents: 'none' }} width="280" height="60" viewBox="0 0 280 60" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,30 C40,10 80,50 120,30 C160,10 200,50 240,30 C260,20 270,25 280,30" stroke="#4361ee" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
        </svg>

        {/* Left — visitor-first copy (55%) */}
        <div style={{
          flex: '0 0 55%', display: 'flex', flexDirection: 'column', justifyContent: 'center',
          padding: '80px 60px 80px 80px', position: 'relative', zIndex: 2,
        }}>
          <div style={{ display: 'flex', gap: 0, marginBottom: 32, borderRadius: 3, overflow: 'hidden', width: 68 }}>
            <div style={{ width: 40, height: 6, background: '#3a0ca3' }} />
            <div style={{ width: 28, height: 6, background: '#f72585' }} />
          </div>
          <p style={{ color: '#7b90f3', fontSize: 11, fontWeight: 700, letterSpacing: '0.45em', textTransform: 'uppercase', marginBottom: 24 }}>
            Rogers Nforgwei
          </p>
          <h1 style={{ color: '#ffffff', fontSize: 'clamp(2.8rem, 6vw, 5.5rem)', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 0.95, marginBottom: 10 }}>
            You were built
          </h1>
          <h1 style={{ color: '#ffffff', fontSize: 'clamp(2.8rem, 6vw, 5.5rem)', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 0.95, marginBottom: 10 }}>
            for more than
          </h1>
          <h1 style={{ background: 'linear-gradient(90deg, #4361ee 0%, #f72585 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontSize: 'clamp(2.8rem, 6vw, 5.5rem)', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 0.95, marginBottom: 44 }}>
            this.
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 18, lineHeight: 1.75, marginBottom: 48, maxWidth: 520, fontWeight: 300 }}>
            Join thousands of men and leaders across Africa stepping into purpose, clarity, and lasting impact — through programs, mentorship, and a transformational community.
          </p>
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'center' }}>
            <a href="#programs" style={{ background: 'linear-gradient(90deg, #3a0ca3, #4361ee)', color: 'white', padding: '16px 36px', borderRadius: 12, fontSize: 14, fontWeight: 700, textDecoration: 'none', boxShadow: '0 4px 24px rgba(58,12,163,0.45)' }}>
              Explore Programs
            </a>
            <a href="#story" style={{ background: 'rgba(67,97,238,0.08)', border: '2px solid #4361ee', color: '#4361ee', padding: '16px 36px', borderRadius: 12, fontSize: 14, fontWeight: 600, textDecoration: 'none' }}>
              About Rogers
            </a>
            <a href="https://wa.me/237683493220" target="_blank" rel="noopener noreferrer" style={{ color: 'rgba(255,255,255,0.4)', fontSize: 13, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ fontSize: 16 }}>💬</span> WhatsApp
            </a>
          </div>
        </div>

        {/* Right — Rogers hero photo (45%) */}
        <div className="hero-image-col" style={{
          flex: '0 0 45%', position: 'relative',
          display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
          overflow: 'hidden',
        }}>
          <Image
            src="/rogers-hero.png"
            alt="Rogers Nforgwei"
            fill
            style={{ objectFit: 'contain', objectPosition: 'bottom center' }}
            priority
          />
        </div>
      </section>

      {/* ══ 2. SOCIAL PROOF BAR ══════════════════════════════════ */}
      <section style={{ background: '#0d0520', padding: '3rem 2rem', borderTop: '1px solid rgba(58,12,163,0.2)', borderBottom: '1px solid rgba(58,12,163,0.2)' }}>
        <div className="social-proof-grid" style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '1.5rem', textAlign: 'center' }}>
          {[
            { number: '15+',  label: 'Years of Ministry'   },
            { number: '3',    label: 'Active Programs'     },
            { number: '500+', label: 'Lives Transformed'   },
            { number: '3',    label: 'Countries Reached'   },
            { number: '10K+', label: 'Community Members'   },
          ].map((m) => (
            <div key={m.label} style={{ padding: '1.5rem 1rem' }}>
              <p style={{ color: '#f72585', fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', fontWeight: 800, letterSpacing: '-0.04em', margin: '0 0 6px' }}>{m.number}</p>
              <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: 11, fontWeight: 600, margin: 0, letterSpacing: '0.08em', textTransform: 'uppercase' }}>{m.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ══ 3. ROGERS STORY ══════════════════════════════════════ */}
      <section id="story" style={{ background: '#f1f1f1', padding: '6rem 2rem' }}>
        <div className="story-grid" style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'center' }}>
          {/* Left: narrative */}
          <div>
            <SquareBars />
            <p style={{ color: '#3a0ca3', fontSize: 11, fontWeight: 700, letterSpacing: '0.35em', textTransform: 'uppercase', marginBottom: 16 }}>The Man Behind the Mission</p>
            <h2 style={{ color: '#3a0ca3', fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.15, marginBottom: 24 }}>
              Changing lives,<br />one person at a time.
            </h2>
            <p style={{ color: '#4c4c4c', fontSize: 16, lineHeight: 1.85, marginBottom: 20, fontWeight: 300 }}>
              Rogers Nforgwei is a businessman, development director, and humanitarian who has spent over 15 years building people and institutions that create lasting change across Africa. As CEO of NMI Education and founder of multiple transformational programs, he has impacted thousands of lives.
            </p>
            <p style={{ color: '#4c4c4c', fontSize: 16, lineHeight: 1.85, marginBottom: 36, fontWeight: 300 }}>
              Rooted in faith and driven by purpose, Rogers believes every man and leader carries untapped potential that, when activated, reshapes families, communities, and nations.
            </p>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <a href="#programs" style={{ background: '#3a0ca3', color: '#fff', padding: '12px 28px', borderRadius: 10, fontSize: 13, fontWeight: 700, textDecoration: 'none' }}>
                View Programs
              </a>
              <a href="#coaching" style={{ background: 'transparent', border: '2px solid #3a0ca3', color: '#3a0ca3', padding: '12px 28px', borderRadius: 10, fontSize: 13, fontWeight: 700, textDecoration: 'none' }}>
                Work With Rogers
              </a>
            </div>
          </div>

          {/* Right: photo with quote overlay */}
          <div style={{ position: 'relative' }}>
            <div style={{ borderRadius: 20, overflow: 'hidden', background: '#3a0ca3', aspectRatio: '4/5', position: 'relative', maxHeight: 520 }}>
              <Image
                src="/rogers-hero.png"
                alt="Rogers Nforgwei"
                fill
                style={{ objectFit: 'cover', objectPosition: 'top center', mixBlendMode: 'luminosity', opacity: 0.85 }}
              />
              {/* Quote overlay */}
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '2rem', background: 'linear-gradient(to top, rgba(58,12,163,0.96) 0%, transparent 100%)' }}>
                <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: 15, fontStyle: 'italic', fontFamily: serif, lineHeight: 1.6, margin: '0 0 8px' }}>
                  &ldquo;Switch on the better side of the future.&rdquo;
                </p>
                <p style={{ color: '#f72585', fontSize: 11, fontWeight: 700, margin: 0, letterSpacing: '0.15em', textTransform: 'uppercase' }}>— Rogers Nforgwei</p>
              </div>
            </div>
            <div style={{ position: 'absolute', top: -16, right: -16, width: 80, height: 80, borderRadius: '50%', background: 'rgba(247,37,133,0.1)', border: '2px solid rgba(247,37,133,0.2)', pointerEvents: 'none' }} />
          </div>
        </div>
      </section>

      {/* ══ 4. PROGRAMS ══════════════════════════════════════════ */}
      <section id="programs" style={{ padding: '6rem 2rem', background: '#f1f1f1', borderTop: '1px solid rgba(58,12,163,0.08)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 52 }}>
            <div style={{ display: 'flex', gap: '4px', justifyContent: 'center', marginBottom: '16px' }}>
              <div style={{ width: '20px', height: '6px', background: '#3a0ca3', borderRadius: '1px' }} />
              <div style={{ width: '12px', height: '6px', background: '#f72585', borderRadius: '1px' }} />
              <div style={{ width: '8px', height: '6px', background: '#4361ee', borderRadius: '1px' }} />
            </div>
            <p style={{ color: '#3a0ca3', fontSize: 11, fontWeight: 700, letterSpacing: '0.35em', textTransform: 'uppercase', marginBottom: 12 }}>Programs & Initiatives</p>
            <h2 style={{ color: '#3a0ca3', fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', fontWeight: 800, letterSpacing: '-0.03em', margin: '0 auto', maxWidth: 480, lineHeight: 1.15 }}>
              Choose your transformation.
            </h2>
          </div>

          <div className="programs-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
            {programs.map((p) => (
              <Link key={p.name} href={p.href} style={{ textDecoration: 'none', display: 'block' }}>
                <div className="program-card" style={{ background: '#ffffff', border: '1px solid rgba(58,12,163,0.12)', borderRadius: 20, overflow: 'hidden', height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <div style={{ display: 'flex' }}>
                    <div style={{ flex: 1, height: 4, background: p.color }} />
                    <div style={{ flex: 1, height: 4, background: '#f72585', opacity: 0.5 }} />
                  </div>
                  <div style={{ padding: '2rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <span style={{ background: 'rgba(58,12,163,0.07)', color: '#3a0ca3', fontSize: 10, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', padding: '4px 10px', borderRadius: 4, display: 'inline-block', marginBottom: 16 }}>{p.tag}</span>
                    <h3 style={{ color: '#3a0ca3', fontWeight: 800, fontSize: 18, marginBottom: 12, letterSpacing: '-0.02em', lineHeight: 1.25 }}>{p.name}</h3>
                    <p style={{ color: '#4c4c4c', fontSize: 14, lineHeight: 1.75, margin: '0 0 20px', fontWeight: 300, flex: 1 }}>{p.outcome}</p>
                    <span style={{ color: '#4361ee', fontSize: 13, fontWeight: 700 }}>Secure your place →</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 5. TESTIMONIALS ══════════════════════════════════════ */}
      <section style={{ padding: '6rem 2rem', background: '#3a0ca3' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 11, fontWeight: 700, letterSpacing: '0.35em', textTransform: 'uppercase', marginBottom: 12 }}>Transformation Stories</p>
            <h2 style={{ color: '#ffffff', fontSize: 'clamp(1.8rem, 3.5vw, 2.4rem)', fontWeight: 800, letterSpacing: '-0.03em', margin: 0 }}>
              Lives changed. Missions activated.
            </h2>
          </div>

          <div className="testimonials-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
            {testimonials.map((t, i) => (
              <div key={i} style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 16, padding: '2rem' }}>
                <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: 15, lineHeight: 1.75, fontStyle: 'italic', fontFamily: serif, margin: '0 0 20px' }}>
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: 16 }}>
                  <p style={{ color: '#ffffff', fontWeight: 700, fontSize: 14, margin: '0 0 4px' }}>{t.name}</p>
                  <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 12, margin: '0 0 8px' }}>{t.role}</p>
                  <span style={{ background: 'rgba(247,37,133,0.2)', color: '#f72585', fontSize: 10, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', padding: '3px 8px', borderRadius: 4 }}>{t.program}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 6. UPCOMING EVENT ════════════════════════════════════ */}
      <section id="events" style={{ background: '#060210', position: 'relative', overflow: 'hidden' }}>
        {/* Urgency strip */}
        <div style={{ background: '#f72585', padding: '10px 2rem', textAlign: 'center' }}>
          <p style={{ color: '#fff', fontSize: 12, fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase', margin: 0 }}>
            Seats are limited — Registration closes soon
          </p>
        </div>

        <div style={{ padding: '5rem 2rem' }}>
          <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
            <p style={{ color: '#7b90f3', fontSize: 11, fontWeight: 700, letterSpacing: '0.35em', textTransform: 'uppercase', marginBottom: 16 }}>Next Event</p>
            <h2 style={{ color: '#ffffff', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: 16, lineHeight: 1.1 }}>
              Dominion Life Men&apos;s Conference
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: 16, lineHeight: 1.75, maxWidth: 560, margin: '0 auto 40px', fontWeight: 300 }}>
              A transformative gathering for men ready to step into their God-given authority — as leaders, fathers, and builders. One weekend. Lasting change.
            </p>
            <div style={{ display: 'flex', gap: 32, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 40 }}>
              {[
                { icon: '📍', label: 'Yaoundé, Cameroon' },
                { icon: '📅', label: '2025 · Limited Seats' },
                { icon: '🎟️', label: '50,000 XAF' },
              ].map((d) => (
                <div key={d.label} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontSize: 18 }}>{d.icon}</span>
                  <span style={{ color: 'rgba(255,255,255,0.55)', fontSize: 14 }}>{d.label}</span>
                </div>
              ))}
            </div>
            <Link href="/programs/dominion-life" style={{ background: '#f72585', color: '#fff', padding: '16px 40px', borderRadius: 12, fontSize: 14, fontWeight: 700, textDecoration: 'none', boxShadow: '0 4px 24px rgba(247,37,133,0.4)', display: 'inline-block' }}>
              Register Now →
            </Link>
          </div>
        </div>

        <svg style={{ position: 'absolute', bottom: '10%', right: '3%', opacity: 0.07, pointerEvents: 'none' }} width="280" height="60" viewBox="0 0 280 60" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,30 C40,10 80,50 120,30 C160,10 200,50 240,30 C260,20 270,25 280,30" stroke="#4361ee" strokeWidth="3" fill="none" strokeLinecap="round"/>
        </svg>
      </section>

      {/* ══ 7. LEAD MAGNET ═══════════════════════════════════════ */}
      <section style={{ padding: '6rem 2rem', background: '#f1f1f1' }}>
        <div style={{ maxWidth: 680, margin: '0 auto', textAlign: 'center' }}>
          <SquareBars />
          <p style={{ color: '#3a0ca3', fontSize: 11, fontWeight: 700, letterSpacing: '0.35em', textTransform: 'uppercase', marginBottom: 12 }}>Free Resource</p>
          <h2 style={{ color: '#3a0ca3', fontSize: 'clamp(1.8rem, 3.5vw, 2.4rem)', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: 16, lineHeight: 1.15 }}>
            The 5 Pillars of<br />Purpose-Driven Leadership
          </h2>
          <p style={{ color: '#4c4c4c', fontSize: 16, lineHeight: 1.75, maxWidth: 520, margin: '0 auto 36px', fontWeight: 300 }}>
            A free guide by Rogers Nforgwei — 15+ years of leadership experience distilled into five principles every man and leader must master.
          </p>

          {submitted ? (
            <div style={{ background: '#3a0ca3', borderRadius: 16, padding: '2.5rem', textAlign: 'center' }}>
              <p style={{ color: '#ffffff', fontSize: 20, fontWeight: 800, margin: '0 0 8px' }}>You&apos;re in!</p>
              <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 14, margin: 0 }}>Check your inbox — your guide is on its way.</p>
            </div>
          ) : (
            <form
              onSubmit={(e) => { e.preventDefault(); if (email) setSubmitted(true); }}
              style={{ display: 'flex', gap: 12, maxWidth: 480, margin: '0 auto', flexWrap: 'wrap', justifyContent: 'center' }}
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                required
                style={{ flex: 1, minWidth: 200, padding: '14px 20px', border: '2px solid rgba(58,12,163,0.2)', borderRadius: 10, fontSize: 14, outline: 'none', background: '#fff', color: '#3a0ca3' }}
              />
              <button
                type="submit"
                style={{ background: '#f72585', color: '#fff', padding: '14px 28px', borderRadius: 10, fontSize: 14, fontWeight: 700, border: 'none', cursor: 'pointer', whiteSpace: 'nowrap' }}
              >
                Send My Guide
              </button>
            </form>
          )}
          <p style={{ color: 'rgba(76,76,76,0.45)', fontSize: 12, marginTop: 12 }}>No spam. Unsubscribe any time.</p>
        </div>
      </section>

      {/* ══ 8. COMMUNITY ═════════════════════════════════════════ */}
      <section id="community" style={{ padding: '6rem 2rem', background: 'linear-gradient(135deg, #3a0ca3 0%, #4361ee 100%)', textAlign: 'center' }}>
        <div style={{ maxWidth: 680, margin: '0 auto' }}>
          <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: 11, fontWeight: 700, letterSpacing: '0.35em', textTransform: 'uppercase', marginBottom: 16 }}>The Community</p>
          <h2 style={{ color: '#ffffff', fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: 20, lineHeight: 1.15 }}>
            You don&apos;t have to walk this alone.
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: 16, lineHeight: 1.75, maxWidth: 520, margin: '0 auto 36px', fontWeight: 300 }}>
            Join a growing community of men and leaders across Africa committed to purpose, accountability, and kingdom impact. Daily encouragement, resources, and real conversation.
          </p>
          <a
            href="https://wa.me/237683493220?text=Hi%20Rogers%2C%20I%20want%20to%20join%20the%20community"
            target="_blank" rel="noopener noreferrer"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 10, background: '#25D366', color: '#fff', padding: '16px 36px', borderRadius: 12, fontSize: 14, fontWeight: 700, textDecoration: 'none', boxShadow: '0 4px 24px rgba(37,211,102,0.35)' }}
          >
            <span style={{ fontSize: 20 }}>💬</span>
            Join the WhatsApp Community
          </a>
        </div>
      </section>

      {/* ══ 9. COACHING INQUIRY ══════════════════════════════════ */}
      <section id="coaching" style={{ padding: '6rem 2rem', background: '#f1f1f1' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <SquareBars />
            <p style={{ color: '#3a0ca3', fontSize: 11, fontWeight: 700, letterSpacing: '0.35em', textTransform: 'uppercase', marginBottom: 12 }}>Work With Rogers</p>
            <h2 style={{ color: '#3a0ca3', fontSize: 'clamp(1.8rem, 3.5vw, 2.4rem)', fontWeight: 800, letterSpacing: '-0.03em', margin: 0, lineHeight: 1.15 }}>
              Ready to go further?
            </h2>
          </div>

          <div className="coaching-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
            {/* Personal Coaching */}
            <div style={{ background: '#ffffff', borderRadius: 20, padding: '2.5rem', border: '1px solid rgba(58,12,163,0.12)' }}>
              <div style={{ width: 48, height: 48, background: 'rgba(58,12,163,0.08)', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, marginBottom: 20 }}>🎯</div>
              <h3 style={{ color: '#3a0ca3', fontWeight: 800, fontSize: 20, marginBottom: 12 }}>Personal Coaching</h3>
              <p style={{ color: '#4c4c4c', fontSize: 14, lineHeight: 1.75, margin: '0 0 24px', fontWeight: 300 }}>
                1-on-1 coaching for leaders, entrepreneurs, and men of purpose. Break through your limitations and build the life you were designed for.
              </p>
              <a
                href="https://wa.me/237683493220?text=Hi%20Rogers%2C%20I%27m%20interested%20in%20personal%20coaching"
                target="_blank" rel="noopener noreferrer"
                style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#3a0ca3', color: '#fff', padding: '12px 24px', borderRadius: 10, fontSize: 13, fontWeight: 700, textDecoration: 'none' }}
              >
                Apply via WhatsApp →
              </a>
            </div>

            {/* Speaking & Events */}
            <div style={{ background: '#ffffff', borderRadius: 20, padding: '2.5rem', border: '1px solid rgba(58,12,163,0.12)' }}>
              <div style={{ width: 48, height: 48, background: 'rgba(247,37,133,0.08)', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, marginBottom: 20 }}>🎙️</div>
              <h3 style={{ color: '#3a0ca3', fontWeight: 800, fontSize: 20, marginBottom: 12 }}>Speaking & Events</h3>
              <p style={{ color: '#4c4c4c', fontSize: 14, lineHeight: 1.75, margin: '0 0 24px', fontWeight: 300 }}>
                Invite Rogers to speak at your conference, corporate event, or church gathering. A transformational voice for any platform of purpose.
              </p>
              <a
                href="https://wa.me/237683493220?text=Hi%20Rogers%2C%20I%27d%20like%20to%20invite%20you%20to%20speak%20at%20my%20event"
                target="_blank" rel="noopener noreferrer"
                style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#f72585', color: '#fff', padding: '12px 24px', borderRadius: 10, fontSize: 13, fontWeight: 700, textDecoration: 'none' }}
              >
                Inquire via WhatsApp →
              </a>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
