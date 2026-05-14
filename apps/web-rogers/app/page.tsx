import Link from "next/link";
import Image from "next/image";

export default function HomePage() {
  const programs = [
    {
      name: "Dominion Life Men's Conference",
      description:
        "A transformative gathering equipping men to lead with purpose, faith, and excellence. Building men who impact their families, communities, and nations.",
      color: "#3a0ca3",
      icon: "🏛️",
      href: "/programs/dominion-life",
    },
    {
      name: "Men On Duty",
      description:
        "A movement activating men to be present, responsible, and purposeful in every area of life — family, faith, career, and community.",
      color: "#4361ee",
      icon: "⚡",
      href: "/programs/men-on-duty",
    },
    {
      name: "CEO On Mission",
      description:
        "Empowering business leaders and entrepreneurs to build enterprises driven by vision, values, and lasting impact beyond profit.",
      color: "#f72585",
      icon: "🎯",
      href: "/programs/ceo-on-mission",
    },
  ];

  return (
    <main style={{ background: "#0a0414" }}>

      {/* ══ HERO ══════════════════════════════════════════ */}
      <style>{`
        @media (max-width: 768px) {
          .hero-wrapper { flex-direction: column !important; }
          .hero-image-col { flex: none !important; height: 300px !important; width: 100% !important; }
        }
      `}</style>
      <section className="hero-wrapper" style={{
        minHeight: "92vh",
        display: "flex", alignItems: "stretch",
        background: "linear-gradient(150deg, #060210 0%, #0a0414 40%, #160830 70%, #1a0a40 100%)",
        position: "relative", overflow: "hidden",
      }}>
        {/* Ambient glows */}
        <div style={{ position: "absolute", top: -100, right: -60, width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(67,97,238,0.14) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: -80, left: "45%", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(247,37,133,0.08) 0%, transparent 70%)", pointerEvents: "none" }} />
        {/* Doodle wavy lines */}
        <svg style={{ position: "absolute", top: "38%", right: "4%", opacity: 0.14, pointerEvents: "none" }} width="280" height="60" viewBox="0 0 280 60" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,30 C40,10 80,50 120,30 C160,10 200,50 240,30 C260,20 270,25 280,30" stroke="#4361ee" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
        </svg>
        <svg style={{ position: "absolute", top: "62%", left: "3%", opacity: 0.09, pointerEvents: "none" }} width="200" height="50" viewBox="0 0 200 50" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,25 C30,5 60,45 90,25 C120,5 150,45 180,25 C190,18 195,22 200,25" stroke="#4361ee" strokeWidth="2" fill="none" strokeLinecap="round"/>
        </svg>

        {/* Left — text content (55%) */}
        <div style={{
          flex: "0 0 55%",
          display: "flex", flexDirection: "column", justifyContent: "center",
          padding: "80px 60px 80px 80px",
          position: "relative", zIndex: 2,
        }}>
          {/* Square bar brand element */}
          <div style={{ display: "flex", gap: 0, marginBottom: 32, borderRadius: 3, overflow: "hidden", width: 68 }}>
            <div style={{ width: 40, height: 6, background: "#3a0ca3" }} />
            <div style={{ width: 28, height: 6, background: "#f72585" }} />
          </div>
          <p style={{ color: "#7b90f3", fontSize: 11, fontWeight: 700, letterSpacing: "0.45em", textTransform: "uppercase", marginBottom: 24 }}>
            #Rogers Nforgwei
          </p>
          <h1 style={{ color: "#ffffff", fontSize: "clamp(3rem, 6.5vw, 6rem)", fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 0.95, marginBottom: 10 }}>
            Switch on
          </h1>
          <h1 style={{ color: "#ffffff", fontSize: "clamp(3rem, 6.5vw, 6rem)", fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 0.95, marginBottom: 10 }}>
            the better side
          </h1>
          <h1 style={{ background: "linear-gradient(90deg, #4361ee 0%, #f72585 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", fontSize: "clamp(3rem, 6.5vw, 6rem)", fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 0.95, marginBottom: 44 }}>
            of the future.
          </h1>
          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 18, lineHeight: 1.75, marginBottom: 16, maxWidth: 560, fontWeight: 300 }}>
            Impacting and Changing lives and communities.
          </p>
          <p style={{ color: "rgba(255,255,255,0.25)", fontSize: 13, marginBottom: 56, fontWeight: 300, letterSpacing: "0.04em" }}>
            Business man · Development Director · Humanitarian · Coach and Mentor · CEO NMI Education · Man of God
          </p>
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
            <a href="#programs" style={{ background: "linear-gradient(90deg, #3a0ca3, #4361ee)", color: "white", padding: "16px 36px", borderRadius: 12, fontSize: 14, fontWeight: 700, textDecoration: "none", boxShadow: "0 4px 24px rgba(58,12,163,0.45)" }}>
              Explore Programs
            </a>
            <a href="#about" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.75)", padding: "16px 36px", borderRadius: 12, fontSize: 14, fontWeight: 600, textDecoration: "none" }}>
              About Rogers
            </a>
          </div>
        </div>

        {/* Right — Rogers hero photo (45%) */}
        <div className="hero-image-col" style={{
          flex: "0 0 45%",
          position: "relative",
          display: "flex", alignItems: "flex-end", justifyContent: "center",
          overflow: "hidden",
        }}>
          <Image
            src="/rogers-hero.png"
            alt="Rogers Nforgwei"
            fill
            style={{ objectFit: "contain", objectPosition: "bottom center" }}
            priority
          />
        </div>
      </section>

      {/* ══ IDENTITY STRIP ═══════════════════════════════ */}
      <section style={{ background: "#0d0520", padding: "2.5rem 2rem", borderTop: "1px solid rgba(58,12,163,0.2)", borderBottom: "1px solid rgba(58,12,163,0.2)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", display: "flex", gap: "1.5rem", flexWrap: "wrap", justifyContent: "center" }}>
          {[
            { label: "Business man",        icon: "💼" },
            { label: "Development Director", icon: "📈" },
            { label: "Humanitarian",         icon: "🌍" },
            { label: "Coach & Mentor",       icon: "🤝" },
            { label: "CEO NMI Education",    icon: "🎓" },
            { label: "Man of God",           icon: "✝️" },
          ].map((c) => (
            <div key={c.label} style={{ display: "flex", alignItems: "center", gap: 10, background: "rgba(58,12,163,0.12)", border: "1px solid rgba(67,97,238,0.18)", padding: "11px 20px", borderRadius: 10 }}>
              <span style={{ fontSize: 16 }}>{c.icon}</span>
              <span style={{ color: "rgba(255,255,255,0.55)", fontSize: 13, fontWeight: 500 }}>{c.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ══ ABOUT ════════════════════════════════════════ */}
      <section id="about" style={{ padding: "8rem 2rem", background: "#080318" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "center" }}>
          <div>
            <div style={{ display: "flex", gap: 0, marginBottom: 24, borderRadius: 3, overflow: "hidden", width: 60 }}>
              <div style={{ width: 36, height: 5, background: "#3a0ca3" }} />
              <div style={{ width: 24, height: 5, background: "#f72585" }} />
            </div>
            <p style={{ color: "#7b90f3", fontSize: 11, fontWeight: 700, letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: 16 }}>About Rogers</p>
            <h2 style={{ color: "#ffffff", fontSize: "clamp(2rem, 4vw, 2.8rem)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: 28 }}>
              Changing lives,<br />one person at a time
            </h2>
            <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 16, lineHeight: 1.85, marginBottom: 24, fontWeight: 300 }}>
              Rogers Nforgwei is a businessman, development director,
              and humanitarian dedicated to impacting and changing lives
              and communities. As the CEO of NMI Education and a coach
              and mentor, he equips individuals and organizations to
              unlock their true potential.
            </p>
            <p style={{ color: "rgba(255,255,255,0.35)", fontSize: 16, lineHeight: 1.85, marginBottom: 36, fontWeight: 300 }}>
              A man of God driven by purpose, Rogers is committed to
              building leaders who switch on the better side of their
              future — in business, family, ministry, and community.
            </p>
            {/* Quote block with doodle */}
            <div style={{ padding: "1.5rem 2rem", background: "rgba(58,12,163,0.18)", borderRadius: 16, borderLeft: "4px solid #f72585", position: "relative", overflow: "hidden" }}>
              <svg style={{ position: "absolute", top: 6, right: 16, opacity: 0.2, pointerEvents: "none" }} width="100" height="25" viewBox="0 0 100 25" xmlns="http://www.w3.org/2000/svg">
                <path d="M0,12 C15,2 30,22 50,12 C70,2 85,22 100,12" stroke="#4361ee" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
              </svg>
              <p style={{ color: "rgba(255,255,255,0.65)", fontWeight: 300, fontSize: 15, margin: "0 0 8px", fontStyle: "italic", lineHeight: 1.65 }}>
                &ldquo;Success is not final, failure is not fatal. It is the courage to continue that counts.&rdquo;
              </p>
              <p style={{ color: "#7b90f3", fontSize: 12, margin: 0, fontWeight: 500 }}>— Rogers Nforgwei</p>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            {[
              { icon: "💼", title: "Business Leader", desc: "Building enterprises that create lasting economic value and opportunity" },
              { icon: "🌍", title: "Humanitarian",    desc: "Committed to positive change wherever there is need in communities" },
              { icon: "🎓", title: "Educator",        desc: "CEO of NMI Education — transforming learning and human capital" },
              { icon: "✝️", title: "Man of God",      desc: "Purpose rooted in faith, integrity, and service to God and people" },
            ].map((v) => (
              <div key={v.title} style={{ padding: "1.5rem", background: "rgba(255,255,255,0.03)", borderRadius: 16, border: "1px solid rgba(58,12,163,0.28)" }}>
                <span style={{ fontSize: 28, display: "block", marginBottom: 12 }}>{v.icon}</span>
                <p style={{ color: "#ffffff", fontWeight: 700, fontSize: 14, margin: "0 0 6px" }}>{v.title}</p>
                <p style={{ color: "rgba(255,255,255,0.3)", fontSize: 12, margin: 0, fontWeight: 300 }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ PROGRAMS ═════════════════════════════════════ */}
      <section id="programs" style={{ padding: "8rem 2rem", background: "#0a0414" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <div style={{ display: "flex", gap: 0, justifyContent: "center", marginBottom: 24, borderRadius: 3, overflow: "hidden", width: 68, margin: "0 auto 24px" }}>
              <div style={{ width: 40, height: 5, background: "#3a0ca3" }} />
              <div style={{ width: 28, height: 5, background: "#f72585" }} />
            </div>
            <p style={{ color: "#7b90f3", fontSize: 11, fontWeight: 700, letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: 16 }}>Programs & Initiatives</p>
            <h2 style={{ color: "#ffffff", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 800, letterSpacing: "-0.03em", margin: 0 }}>
              Built to transform lives
            </h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 28 }}>
            {programs.map((p) => (
              <Link key={p.name} href={p.href} style={{ textDecoration: "none", display: "block" }}>
                <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(58,12,163,0.28)", borderRadius: 20, overflow: "hidden", height: "100%" }}>
                  {/* Square bar top — brand element */}
                  <div style={{ display: "flex" }}>
                    <div style={{ flex: 1, height: 4, background: p.color }} />
                    <div style={{ flex: 1, height: 4, background: "#f72585", opacity: 0.55 }} />
                  </div>
                  <div style={{ padding: "2.5rem 2rem" }}>
                    <span style={{ fontSize: 36, display: "block", marginBottom: 20 }}>{p.icon}</span>
                    <h3 style={{ color: "#ffffff", fontWeight: 800, fontSize: 20, marginBottom: 16, letterSpacing: "-0.02em" }}>{p.name}</h3>
                    <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 14, lineHeight: 1.75, margin: "0 0 20px", fontWeight: 300 }}>{p.description}</p>
                    <span style={{ color: "#7b90f3", fontSize: 13, fontWeight: 600 }}>Learn more →</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══ VISION / QUOTE ═══════════════════════════════ */}
      <section id="vision" style={{ padding: "8rem 2rem", background: "linear-gradient(135deg, #160830 0%, #1a0a40 50%, #0d0330 100%)", position: "relative", overflow: "hidden" }}>
        <svg style={{ position: "absolute", top: "20%", left: "2%", opacity: 0.1, pointerEvents: "none" }} width="320" height="70" viewBox="0 0 320 70" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,35 C50,10 100,60 150,35 C200,10 250,60 300,35 C310,28 316,32 320,35" stroke="#4361ee" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
        </svg>
        <svg style={{ position: "absolute", bottom: "18%", right: "4%", opacity: 0.08, pointerEvents: "none" }} width="240" height="55" viewBox="0 0 240 55" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,27 C35,7 70,47 110,27 C150,7 185,47 220,27 C230,21 236,24 240,27" stroke="#4361ee" strokeWidth="2" fill="none" strokeLinecap="round"/>
        </svg>

        <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center", position: "relative" }}>
          <div style={{ display: "flex", gap: 0, justifyContent: "center", marginBottom: 28, borderRadius: 3, overflow: "hidden", width: 68, margin: "0 auto 28px" }}>
            <div style={{ width: 40, height: 5, background: "#3a0ca3" }} />
            <div style={{ width: 28, height: 5, background: "#f72585" }} />
          </div>
          <p style={{ color: "#7b90f3", fontSize: 11, fontWeight: 700, letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: 24 }}>Vision & Values</p>
          <h2 style={{ color: "#ffffff", fontSize: "clamp(2.2rem, 4.5vw, 3.5rem)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.15, marginBottom: 32 }}>
            &ldquo;Success is not final, failure is not fatal.
            It is the courage to continue that counts.&rdquo;
          </h2>
          <p style={{ color: "#f72585", fontWeight: 600, fontSize: 15, marginBottom: 64, letterSpacing: "0.05em" }}>
            — Rogers Nforgwei
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 20, maxWidth: 720, margin: "0 auto" }}>
            {[
              { v: "Purpose", d: "Everything starts and ends with purpose — know yours, pursue it relentlessly." },
              { v: "Courage", d: "The courage to begin, to persist, and to rise again is the foundation of success." },
              { v: "Impact",  d: "Measure success by the lives you transform and the communities you build." },
              { v: "Faith",   d: "Rooted in faith, driven by conviction — God's purpose cannot be stopped." },
            ].map((val) => (
              <div key={val.v} style={{ padding: "1.8rem", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(67,97,238,0.18)", borderRadius: 16, textAlign: "left" }}>
                <p style={{ color: "#4361ee", fontWeight: 800, fontSize: 15, margin: "0 0 10px", letterSpacing: "-0.01em" }}>{val.v}</p>
                <p style={{ color: "rgba(255,255,255,0.3)", fontSize: 13, lineHeight: 1.7, margin: 0, fontWeight: 300 }}>{val.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ MGI ECOSYSTEM ════════════════════════════════ */}
      <section style={{ padding: "4rem 2rem", background: "#060210", borderTop: "1px solid rgba(58,12,163,0.15)" }}>
        <div style={{ maxWidth: 960, margin: "0 auto", textAlign: "center" }}>
          <p style={{ color: "rgba(255,255,255,0.2)", fontSize: 11, fontWeight: 700, letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: 12 }}>MGI Ecosystem</p>
          <p style={{ color: "rgba(255,255,255,0.35)", fontSize: 15, marginBottom: 24, fontWeight: 300 }}>
            Rogers Nforgwei leads the{" "}
            <strong style={{ color: "rgba(255,255,255,0.55)", fontWeight: 700 }}>Mina-Galeed Invest (MGI) Ltd</strong> ecosystem — Start well, Grow well.
          </p>
          <a href="https://mgi-ventures.com" target="_blank" rel="noopener noreferrer" style={{ display: "inline-block", background: "rgba(58,12,163,0.18)", border: "1px solid rgba(67,97,238,0.28)", color: "#7b90f3", padding: "10px 24px", borderRadius: 10, fontSize: 13, fontWeight: 600, textDecoration: "none" }}>
            mgi-ventures.com →
          </a>
        </div>
      </section>

      {/* ══ CONTACT ══════════════════════════════════════ */}
      <section id="contact" style={{ padding: "8rem 2rem", background: "linear-gradient(135deg, #0a0414 0%, #160830 100%)", borderTop: "1px solid rgba(58,12,163,0.2)" }}>
        <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center" }}>
          <div style={{ display: "flex", gap: 0, justifyContent: "center", marginBottom: 28, borderRadius: 3, overflow: "hidden", width: 68, margin: "0 auto 28px" }}>
            <div style={{ width: 40, height: 5, background: "#3a0ca3" }} />
            <div style={{ width: 28, height: 5, background: "#f72585" }} />
          </div>
          <p style={{ color: "#7b90f3", fontSize: 11, fontWeight: 700, letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: 16 }}>Connect</p>
          <h2 style={{ color: "#ffffff", fontWeight: 800, fontSize: "clamp(2rem, 4vw, 2.8rem)", letterSpacing: "-0.03em", marginBottom: 20 }}>
            Let&apos;s switch on<br />the better side together
          </h2>
          <p style={{ color: "rgba(255,255,255,0.35)", fontSize: 16, lineHeight: 1.75, maxWidth: 480, margin: "0 auto 48px", fontWeight: 300 }}>
            Ready to be coached, mentored, or collaborate on impact?
            Reach out — Rogers is building people who build the future.
          </p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <a href="mailto:rogers@rogersnforgwei.com" style={{ background: "linear-gradient(90deg, #3a0ca3, #4361ee)", color: "white", padding: "16px 32px", borderRadius: 12, fontSize: 14, fontWeight: 700, textDecoration: "none", boxShadow: "0 4px 24px rgba(58,12,163,0.4)" }}>
              rogers@rogersnforgwei.com
            </a>
            <a href="#programs" style={{ background: "rgba(247,37,133,0.12)", border: "1px solid rgba(247,37,133,0.28)", color: "#f72585", padding: "16px 32px", borderRadius: 12, fontSize: 14, fontWeight: 700, textDecoration: "none" }}>
              View Programs
            </a>
          </div>
        </div>
      </section>

    </main>
  );
}
