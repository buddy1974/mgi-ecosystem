"use client";
import { useState } from "react";
import Image from "next/image";

export default function HomePage() {
  const serif = "'Cormorant Garamond', Georgia, serif";
  const sans = "'DM Sans', sans-serif";
  const [menuOpen, setMenuOpen] = useState(false);

  const pillars = [
    {
      title: "Exclusive Retreats",
      desc: "Private, curated spaces designed for rest, reflection, and renewal. Away from the noise — immersed in the extraordinary.",
      icon: "◈",
    },
    {
      title: "Executive Hospitality",
      desc: "Purpose-built for leaders, entrepreneurs, and visionaries. A sanctuary where decisions feel lighter and clarity comes naturally.",
      icon: "◇",
    },
    {
      title: "Cultural Immersion",
      desc: "Rooted in African excellence. Every detail — from architecture to cuisine — celebrates the richness of our heritage.",
      icon: "◉",
    },
    {
      title: "Refined Experiences",
      desc: "Curated programming, world-class service, and environments that inspire. Not just a stay — a transformation.",
      icon: "◈",
    },
  ];

  const values = [
    { label: "Privacy",    desc: "Your retreat is yours alone." },
    { label: "Excellence", desc: "No detail is too small." },
    { label: "Heritage",   desc: "Proudly rooted in Africa." },
    { label: "Purpose",    desc: "Every visit leaves a mark." },
  ];

  return (
    <main style={{ minHeight: "100vh", fontFamily: sans, background: "#0a0706", color: "#f7f2e8" }}>

      {/* ── TOP NAV ── */}
      <header style={{
        position: "relative", zIndex: 10,
        padding: "2.5rem 3rem",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        maxWidth: 1280, margin: "0 auto", width: "100%", boxSizing: "border-box",
      }}>
        <div>
          <Image
            src="/logos/abbaland.png"
            alt="Abba Land Place"
            width={140}
            height={60}
            style={{ objectFit: "contain", display: "block", marginBottom: 4 }}
            priority
          />
          <p style={{
            color: "rgba(200,169,110,0.4)", fontFamily: sans,
            fontSize: 9, fontWeight: 400, letterSpacing: "0.3em",
            margin: "2px 0 0", textTransform: "uppercase",
          }}>
            A Premium Destination · Cameroun
          </p>
        </div>
        <a href="https://mgi-ventures.com" target="_blank" rel="noopener noreferrer" style={{
          color: "rgba(200,169,110,0.35)", fontSize: 11,
          textDecoration: "none", fontFamily: sans,
          letterSpacing: "0.15em", textTransform: "uppercase", fontWeight: 400,
        }}>
          An MGI Ventures Enterprise →
        </a>
        {/* Hamburger — mobile only */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          style={{ display: "flex", flexDirection: "column", gap: 5, padding: 8, background: "transparent", border: "none", cursor: "pointer" }}
          className="md:hidden"
          aria-label="Toggle menu"
        >
          <span style={{ display: "block", width: 22, height: 2, background: "#c8a96e", transition: "all 0.3s", transform: menuOpen ? "rotate(45deg) translate(5px, 5px)" : "none" }} />
          <span style={{ display: "block", width: 22, height: 2, background: "#c8a96e", transition: "all 0.3s", opacity: menuOpen ? 0 : 1 }} />
          <span style={{ display: "block", width: 22, height: 2, background: "#c8a96e", transition: "all 0.3s", transform: menuOpen ? "rotate(-45deg) translate(5px, -5px)" : "none" }} />
        </button>
      </header>

      {/* Mobile menu overlay */}
      {menuOpen && (
        <div
          style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "#0a0706", zIndex: 999, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 40 }}
          className="md:hidden"
        >
          <button onClick={() => setMenuOpen(false)} style={{ position: "absolute", top: 24, right: 24, background: "transparent", border: "none", color: "#c8a96e", fontSize: 28, cursor: "pointer", lineHeight: 1 }}>✕</button>
          {[
            { label: "Vision",            href: "#vision"   },
            { label: "Experience",        href: "#pillars"  },
            { label: "Register Interest", href: "#register" },
          ].map((link) => (
            <a key={link.label} href={link.href} onClick={() => setMenuOpen(false)} style={{ color: "rgba(247,242,232,0.85)", fontSize: 28, fontWeight: 600, textDecoration: "none", letterSpacing: "0.05em", fontFamily: "system-ui, sans-serif" }}>
              {link.label}
            </a>
          ))}
        </div>
      )}

      {/* ── HERO ── */}
      <section style={{
        background: "linear-gradient(165deg, #0a0706 0%, #110d07 40%, #1e1509 100%)",
        padding: "80px 3rem 100px",
        position: "relative", overflow: "hidden",
        textAlign: "center",
      }}>
        {/* Ambient glows */}
        <div style={{
          position: "absolute", top: -200, right: -100, width: 700, height: 700,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(200,169,110,0.06) 0%, transparent 65%)",
          pointerEvents: "none",
        }} />
        <div style={{
          position: "absolute", bottom: -150, left: -100, width: 500, height: 500,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(200,169,110,0.04) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />
        {/* Grid texture */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage:
            "linear-gradient(rgba(200,169,110,0.02) 1px, transparent 1px)," +
            "linear-gradient(90deg, rgba(200,169,110,0.02) 1px, transparent 1px)",
          backgroundSize: "80px 80px", pointerEvents: "none",
        }} />

        <div style={{ position: "relative", zIndex: 5, maxWidth: 900, margin: "0 auto" }}>
          {/* Top line */}
          <div style={{ width: 48, height: 1, background: "#c8a96e", margin: "0 auto 40px", opacity: 0.6 }} />

          {/* Eyebrow */}
          <p style={{
            color: "rgba(200,169,110,0.5)", fontSize: 10, fontWeight: 400,
            letterSpacing: "0.55em", textTransform: "uppercase",
            marginBottom: 28, fontFamily: sans,
          }}>
            Coming Soon · Abba Land Place
          </p>

          {/* Headline */}
          <h1 style={{
            color: "#f7f2e8", fontFamily: serif,
            fontSize: "clamp(3.5rem, 8vw, 7rem)",
            fontWeight: 300, letterSpacing: "0.06em",
            lineHeight: 1.05, marginBottom: 12, textTransform: "uppercase",
          }}>
            Something
          </h1>
          <h1 style={{
            color: "#c8a96e", fontFamily: serif,
            fontSize: "clamp(3.5rem, 8vw, 7rem)",
            fontWeight: 300, letterSpacing: "0.06em",
            lineHeight: 1.05, marginBottom: 12, textTransform: "uppercase", fontStyle: "italic",
          }}>
            Exceptional
          </h1>
          <h1 style={{
            color: "#f7f2e8", fontFamily: serif,
            fontSize: "clamp(3.5rem, 8vw, 7rem)",
            fontWeight: 300, letterSpacing: "0.06em",
            lineHeight: 1.05, marginBottom: 48, textTransform: "uppercase",
          }}>
            Is Coming.
          </h1>

          {/* Divider */}
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 40, justifyContent: "center" }}>
            <div style={{ width: 60, height: 1, background: "rgba(200,169,110,0.3)" }} />
            <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#c8a96e", opacity: 0.5 }} />
            <div style={{ width: 60, height: 1, background: "rgba(200,169,110,0.3)" }} />
          </div>

          <p style={{
            color: "rgba(247,242,232,0.55)", fontSize: "clamp(15px, 2vw, 20px)",
            lineHeight: 1.85, maxWidth: 600, margin: "0 auto 48px",
            fontFamily: serif, fontWeight: 300, fontStyle: "italic",
          }}>
            A premium hospitality destination currently in preparation.
            Designed for those who seek the extraordinary in every moment —
            where African excellence meets world-class refinement.
          </p>

          {/* CTA */}
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <a href="mailto:info@abbalandplace.com" style={{
              background: "#c8a96e", color: "#110d07",
              padding: "16px 40px", borderRadius: 2,
              fontSize: 12, fontWeight: 600, textDecoration: "none",
              fontFamily: sans, letterSpacing: "0.2em", textTransform: "uppercase",
            }}>
              Express Interest
            </a>
            <a href="https://mgi-ventures.com" target="_blank" rel="noopener noreferrer" style={{
              background: "transparent",
              border: "1px solid rgba(200,169,110,0.2)",
              color: "rgba(200,169,110,0.55)",
              padding: "16px 40px", borderRadius: 2,
              fontSize: 12, fontWeight: 400, textDecoration: "none",
              fontFamily: sans, letterSpacing: "0.2em", textTransform: "uppercase",
            }}>
              Explore MGI
            </a>
          </div>
        </div>
      </section>

      {/* ── VISION ── */}
      <section style={{
        background: "#110d07",
        padding: "96px 3rem",
        borderTop: "1px solid rgba(200,169,110,0.08)",
      }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ width: 48, height: 1, background: "#c8a96e", marginBottom: 48, opacity: 0.5 }} />
          <div style={{
            display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "start",
          }}>
            <div>
              <p style={{
                color: "rgba(200,169,110,0.5)", fontSize: 10, letterSpacing: "0.4em",
                textTransform: "uppercase", fontFamily: sans, marginBottom: 20,
              }}>
                Our Vision
              </p>
              <h2 style={{
                color: "#f7f2e8", fontFamily: serif,
                fontSize: "clamp(2rem, 3.5vw, 3.2rem)",
                fontWeight: 300, letterSpacing: "0.04em", lineHeight: 1.2,
                marginBottom: 32, textTransform: "uppercase",
              }}>
                Where Africa&apos;s<br />
                <span style={{ color: "#c8a96e", fontStyle: "italic" }}>Finest Hospitality</span><br />
                Takes Shape
              </h2>
              <p style={{
                color: "rgba(247,242,232,0.5)", fontSize: 17, lineHeight: 1.9,
                fontFamily: serif, fontWeight: 300, fontStyle: "italic",
              }}>
                Abba Land Place is being built with a singular purpose: to create a destination
                that honours African hospitality at its highest expression. A place where guests
                don&apos;t just visit — they return transformed.
              </p>
            </div>
            <div style={{ paddingTop: 48 }}>
              <p style={{
                color: "rgba(247,242,232,0.45)", fontSize: 16, lineHeight: 2,
                fontFamily: sans, fontWeight: 300,
              }}>
                We are building something that goes beyond luxury. Every space, every service,
                every detail is being designed with intentionality — to create an environment
                where executives, visionaries, and families can experience genuine rest and
                authentic African elegance.
              </p>
              <div style={{ width: 32, height: 1, background: "#c8a96e", marginTop: 40, opacity: 0.4 }} />
            </div>
          </div>
        </div>
      </section>

      {/* ── PILLARS ── */}
      <section style={{
        background: "#0a0706",
        padding: "96px 3rem",
        borderTop: "1px solid rgba(200,169,110,0.06)",
      }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <p style={{
              color: "rgba(200,169,110,0.5)", fontSize: 10, letterSpacing: "0.4em",
              textTransform: "uppercase", fontFamily: sans, marginBottom: 20,
            }}>
              What We Are Building
            </p>
            <h2 style={{
              color: "#f7f2e8", fontFamily: serif,
              fontSize: "clamp(2rem, 3.5vw, 3rem)",
              fontWeight: 300, letterSpacing: "0.05em", textTransform: "uppercase",
            }}>
              The Four Pillars
            </h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 2 }}>
            {pillars.map((p, i) => (
              <div key={i} style={{
                background: "#110d07",
                padding: "48px 40px",
                borderTop: "1px solid rgba(200,169,110,0.12)",
                borderLeft: i % 2 === 0 ? "none" : "1px solid rgba(200,169,110,0.06)",
              }}>
                <p style={{
                  color: "#c8a96e", fontSize: 20, marginBottom: 20, fontFamily: serif,
                }}>
                  {p.icon}
                </p>
                <h3 style={{
                  color: "#e2c98e", fontFamily: serif,
                  fontSize: 22, fontWeight: 400, letterSpacing: "0.08em",
                  textTransform: "uppercase", marginBottom: 16,
                }}>
                  {p.title}
                </h3>
                <p style={{
                  color: "rgba(247,242,232,0.45)", fontFamily: sans,
                  fontSize: 15, lineHeight: 1.85, fontWeight: 300,
                }}>
                  {p.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── VALUES STRIP ── */}
      <section style={{
        background: "#1e1509",
        padding: "64px 3rem",
        borderTop: "1px solid rgba(200,169,110,0.08)",
        borderBottom: "1px solid rgba(200,169,110,0.08)",
      }}>
        <div style={{
          maxWidth: 1200, margin: "0 auto",
          display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 40,
          textAlign: "center",
        }}>
          {values.map((v) => (
            <div key={v.label}>
              <div style={{ width: 24, height: 1, background: "#c8a96e", margin: "0 auto 20px", opacity: 0.5 }} />
              <p style={{
                color: "#c8a96e", fontFamily: serif,
                fontSize: 18, fontWeight: 400, letterSpacing: "0.15em",
                textTransform: "uppercase", marginBottom: 10,
              }}>
                {v.label}
              </p>
              <p style={{
                color: "rgba(247,242,232,0.35)", fontFamily: sans,
                fontSize: 12, fontWeight: 300, letterSpacing: "0.05em",
              }}>
                {v.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── REGISTER INTEREST ── */}
      <section style={{
        background: "#110d07",
        padding: "96px 3rem",
        textAlign: "center",
      }}>
        <div style={{ maxWidth: 640, margin: "0 auto" }}>
          <div style={{ width: 48, height: 1, background: "#c8a96e", margin: "0 auto 40px", opacity: 0.4 }} />
          <h2 style={{
            color: "#f7f2e8", fontFamily: serif,
            fontSize: "clamp(1.8rem, 3vw, 2.8rem)",
            fontWeight: 300, letterSpacing: "0.05em", textTransform: "uppercase",
            marginBottom: 24,
          }}>
            Be Among the First
          </h2>
          <p style={{
            color: "rgba(247,242,232,0.45)", fontFamily: serif,
            fontSize: 17, lineHeight: 1.85, fontWeight: 300, fontStyle: "italic",
            marginBottom: 48,
          }}>
            Register your interest to receive exclusive updates, priority access,
            and first-mover privileges when Abba Land Place opens its doors.
          </p>
          <a href="mailto:info@abbalandplace.com?subject=Interest — Abba Land Place" style={{
            display: "inline-block",
            background: "#c8a96e", color: "#110d07",
            padding: "18px 56px", borderRadius: 2,
            fontSize: 12, fontWeight: 600, textDecoration: "none",
            fontFamily: sans, letterSpacing: "0.25em", textTransform: "uppercase",
          }}>
            Register Interest
          </a>
          <p style={{
            color: "rgba(200,169,110,0.25)", fontFamily: sans,
            fontSize: 11, marginTop: 24, letterSpacing: "0.1em",
          }}>
            info@abbalandplace.com
          </p>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{
        position: "relative", zIndex: 5,
        padding: "2rem 3rem",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        maxWidth: 1280, margin: "0 auto", width: "100%", boxSizing: "border-box",
        borderTop: "1px solid rgba(200,169,110,0.08)",
      }}>
        <p style={{
          color: "rgba(200,169,110,0.2)", fontSize: 10,
          margin: 0, fontFamily: sans, letterSpacing: "0.15em", textTransform: "uppercase",
        }}>
          © {new Date().getFullYear()} Abba Land Place · All rights reserved
        </p>
        <p style={{
          color: "rgba(200,169,110,0.2)", fontSize: 10,
          margin: 0, fontFamily: sans, letterSpacing: "0.15em", textTransform: "uppercase",
        }}>
          Mina-Galeed Invest (MGI) Ltd
        </p>
      </footer>
    </main>
  );
}
