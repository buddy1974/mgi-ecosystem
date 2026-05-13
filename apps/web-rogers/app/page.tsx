export default function HomePage() {
  const programs = [
    {
      name: "Dominion Life Men's Conference",
      slug: "dominion-life",
      color: "#3a0ca3",
      accent: "#7c3aed",
      glow: "rgba(58,12,163,0.35)",
      tag: "Conference",
      description:
        "An annual gathering of men called to rise — in character, in leadership, in purpose. Dominion Life is a space for transformation, accountability, and the rediscovery of what it means to be a man of influence.",
      pillars: ["Character & Identity", "Leadership Development", "Faith & Purpose", "Community & Accountability"],
    },
    {
      name: "Men On Duty",
      slug: "men-on-duty",
      color: "#7c2d12",
      accent: "#dc2626",
      glow: "rgba(124,45,18,0.35)",
      tag: "Movement",
      description:
        "Men On Duty is a movement for men who refuse to be passive. It is about showing up — in family, in work, in society — with intention, strength, and responsibility. Men on duty don't wait. They lead.",
      pillars: ["Responsibility & Presence", "Family Leadership", "Professional Excellence", "Social Impact"],
    },
    {
      name: "CEO On Mission",
      slug: "ceo-on-mission",
      color: "#064e3b",
      accent: "#059669",
      glow: "rgba(6,78,59,0.35)",
      tag: "Executive Mentoring",
      description:
        "An executive mentoring program for CEOs and founders navigating the complexity of building organizations with both commercial success and human depth. CEO On Mission is about leading with clarity, resilience, and purpose beyond profit.",
      pillars: ["Strategic Clarity", "Resilient Leadership", "Purpose-Driven Growth", "CEO Peer Community"],
    },
  ];

  return (
    <main style={{ overflowX: "hidden" }}>

      {/* ══ HERO ══════════════════════════════════════════ */}
      <section
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          padding: "8rem 2rem 6rem",
          background: "linear-gradient(160deg, #0a0414 0%, #0d0620 50%, #060211 100%)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background: "radial-gradient(ellipse at 50% 40%, rgba(58,12,163,0.22) 0%, rgba(247,37,133,0.06) 40%, transparent 70%)",
        }} />

        <div style={{ position: "relative", maxWidth: 800, margin: "0 auto" }}>
          <p style={{ color: "#f72585", fontSize: 11, fontWeight: 700, letterSpacing: "0.35em", textTransform: "uppercase", marginBottom: 24 }}>
            Founder · CEO · Leader
          </p>

          <h1 style={{ color: "#ffffff", fontSize: "clamp(3rem, 8vw, 6rem)", fontWeight: 900, letterSpacing: "-0.03em", lineHeight: 1.05, marginBottom: 28 }}>
            Rogers<br />
            <span style={{ color: "#3a0ca3" }}>Nforgwei</span>
          </h1>

          <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "clamp(1rem, 2vw, 1.2rem)", lineHeight: 1.7, maxWidth: 560, margin: "0 auto 48px" }}>
            Founder & CEO of Mina-Galeed Invest (MGI) Ltd. Building enterprises,
            developing leaders, and advancing a vision of purposeful growth across
            Cameroun and beyond.
          </p>

          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <a href="#programs" style={{ background: "#3a0ca3", color: "white", padding: "16px 36px", borderRadius: 12, fontSize: 14, fontWeight: 700, textDecoration: "none", letterSpacing: "0.02em" }}>
              Explore Programs
            </a>
            <a href="#contact" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.15)", color: "white", padding: "16px 36px", borderRadius: 12, fontSize: 14, fontWeight: 700, textDecoration: "none" }}>
              Get in Touch
            </a>
          </div>
        </div>

        <div style={{ position: "absolute", bottom: 40, left: "50%", transform: "translateX(-50%)", color: "rgba(255,255,255,0.2)", fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase" }}>
          Scroll
        </div>
      </section>

      {/* ══ ABOUT ═════════════════════════════════════════ */}
      <section id="about" style={{ padding: "8rem 2rem", background: "#ffffff" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "center" }}>
          <div>
            <p style={{ color: "#3a0ca3", fontSize: 11, fontWeight: 700, letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: 16 }}>About Rogers</p>
            <h2 style={{ color: "#111827", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 900, letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: 28 }}>
              Building enterprises.<br />Developing leaders.
            </h2>
            <p style={{ color: "#374151", fontSize: 16, lineHeight: 1.8, marginBottom: 20 }}>
              Rogers Nforgwei is the Founder and CEO of Mina-Galeed Invest (MGI) Ltd —
              a holding company he founded in 2019 to accompany businesses through their
              development cycles. Under his leadership, MGI has grown into a multi-sector
              ecosystem of 6 ventures spanning education, logistics, culture, real estate,
              construction, and advisory services.
            </p>
            <p style={{ color: "#374151", fontSize: 16, lineHeight: 1.8, marginBottom: 32 }}>
              Beyond business, Rogers leads transformational programs for men and executives,
              driven by a conviction that sustainable enterprise is built by people of
              character, clarity, and purpose.
            </p>
            <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
              {[
                { label: "Founded MGI", value: "2019"    },
                { label: "Ventures",    value: "6"       },
                { label: "Programs",    value: "3"       },
                { label: "Base",        value: "Yaoundé" },
              ].map((s) => (
                <div key={s.label} style={{ textAlign: "center", padding: "16px 24px", background: "#f5f0ff", borderRadius: 12, border: "1px solid #e9d5ff" }}>
                  <p style={{ color: "#3a0ca3", fontWeight: 900, fontSize: 20, margin: 0 }}>{s.value}</p>
                  <p style={{ color: "#6B7280", fontSize: 11, margin: "4px 0 0", textTransform: "uppercase", letterSpacing: "0.1em" }}>{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div style={{ background: "linear-gradient(145deg, #3a0ca322, #f7258514)", border: "1px solid #3a0ca335", borderRadius: 24, padding: "3rem" }}>
            <p style={{ color: "#3a0ca3", fontSize: 11, fontWeight: 700, letterSpacing: "0.25em", textTransform: "uppercase", marginBottom: 20 }}>Areas of Focus</p>
            {[
              { icon: "🏢", area: "Enterprise Building",    detail: "Founding and scaling multi-sector ventures through MGI" },
              { icon: "👥", area: "Leadership Development",  detail: "Transformational programs for men and CEOs" },
              { icon: "🌍", area: "African Enterprise",      detail: "Building credible, scalable businesses in Cameroun" },
              { icon: "⚡", area: "Executive Mentoring",     detail: "One-on-one guidance for founders navigating growth" },
            ].map((a) => (
              <div key={a.area} style={{ display: "flex", gap: 16, marginBottom: 24 }}>
                <span style={{ fontSize: 24, flexShrink: 0 }}>{a.icon}</span>
                <div>
                  <p style={{ color: "#111827", fontWeight: 700, fontSize: 14, margin: "0 0 4px" }}>{a.area}</p>
                  <p style={{ color: "#6B7280", fontSize: 13, margin: 0 }}>{a.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ PROGRAMS ══════════════════════════════════════ */}
      <section id="programs" style={{ padding: "8rem 2rem", background: "#060211" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <p style={{ color: "#f72585", fontSize: 11, fontWeight: 700, letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: 16 }}>Programs</p>
            <h2 style={{ color: "#ffffff", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 900, letterSpacing: "-0.03em", margin: 0 }}>
              Three Transformational Platforms
            </h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 24 }}>
            {programs.map((p) => (
              <div
                key={p.slug}
                style={{
                  background: `linear-gradient(145deg, ${p.color}20 0%, rgba(255,255,255,0.03) 100%)`,
                  border: `1px solid ${p.color}40`,
                  borderRadius: 20,
                  overflow: "hidden",
                  boxShadow: `0 8px 40px ${p.glow}`,
                }}
              >
                <div style={{ height: 4, background: `linear-gradient(90deg, ${p.color}, ${p.accent})` }} />
                <div style={{ padding: "2rem" }}>
                  <span style={{ background: `${p.color}25`, color: p.accent, fontSize: 10, fontWeight: 700, padding: "4px 12px", borderRadius: 20, letterSpacing: "0.15em", textTransform: "uppercase", border: `1px solid ${p.color}35` }}>
                    {p.tag}
                  </span>
                  <h3 style={{ color: "#ffffff", fontWeight: 900, fontSize: 20, marginTop: 20, marginBottom: 16, lineHeight: 1.2, letterSpacing: "-0.02em" }}>
                    {p.name}
                  </h3>
                  <p style={{ color: "rgba(255,255,255,0.55)", fontSize: 14, lineHeight: 1.75, marginBottom: 28 }}>
                    {p.description}
                  </p>
                  <div style={{ borderTop: `1px solid ${p.color}25`, paddingTop: 20 }}>
                    <p style={{ color: p.accent, fontSize: 10, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 12 }}>Pillars</p>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                      {p.pillars.map((pillar) => (
                        <span key={pillar} style={{ background: `${p.color}18`, border: `1px solid ${p.color}30`, color: "rgba(255,255,255,0.7)", fontSize: 11, padding: "4px 12px", borderRadius: 8 }}>
                          {pillar}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ VISION ════════════════════════════════════════ */}
      <section id="vision" style={{ padding: "8rem 2rem", background: "#ffffff" }}>
        <div style={{ maxWidth: 960, margin: "0 auto", textAlign: "center" }}>
          <p style={{ color: "#3a0ca3", fontSize: 11, fontWeight: 700, letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: 16 }}>Vision</p>
          <h2 style={{ color: "#111827", fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 900, letterSpacing: "-0.02em", lineHeight: 1.2, marginBottom: 40 }}>
            &ldquo;Build enterprises that outlast the builder,<br />
            and develop leaders who outlast their season.&rdquo;
          </h2>
          <p style={{ color: "#6B7280", fontSize: 16, lineHeight: 1.8, maxWidth: 680, margin: "0 auto 48px" }}>
            Rogers Nforgwei believes the greatest contribution of a leader is
            not what they build — but who they build. His work through MGI and
            through his programs is rooted in a conviction that Africa&apos;s
            next generation of enterprise must be led by people of both
            competence and character.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 24, maxWidth: 800, margin: "0 auto" }}>
            {[
              { value: "Character",  icon: "⚖️", desc: "Leadership rooted in integrity"      },
              { value: "Competence", icon: "🎯", desc: "Excellence in every domain"          },
              { value: "Community",  icon: "🤝", desc: "Building together, not alone"        },
              { value: "Legacy",     icon: "🌍", desc: "Structures that outlast the founder" },
            ].map((v) => (
              <div key={v.value} style={{ padding: "2rem 1.5rem", background: "#f5f0ff", borderRadius: 16, border: "1px solid #e9d5ff" }}>
                <span style={{ fontSize: 28, display: "block", marginBottom: 12 }}>{v.icon}</span>
                <p style={{ color: "#3a0ca3", fontWeight: 900, fontSize: 16, margin: "0 0 6px" }}>{v.value}</p>
                <p style={{ color: "#6B7280", fontSize: 12, margin: 0 }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ MGI ECOSYSTEM LINK ════════════════════════════ */}
      <section style={{ padding: "5rem 2rem", background: "#0a0414" }}>
        <div style={{ maxWidth: 960, margin: "0 auto", textAlign: "center" }}>
          <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 11, fontWeight: 700, letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: 16 }}>The Ecosystem</p>
          <h2 style={{ color: "#ffffff", fontWeight: 900, fontSize: 28, marginBottom: 16, letterSpacing: "-0.02em" }}>
            Mina-Galeed Invest (MGI) Ltd
          </h2>
          <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 15, marginBottom: 36, maxWidth: 480, margin: "0 auto 36px" }}>
            The holding company Rogers founded in 2019 — 6 ventures, 7 expertise domains, serving SMEs across Cameroun.
          </p>
          <a
            href="https://mgi-ventures.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: "inline-block", background: "rgba(58,12,163,0.2)", border: "1px solid rgba(58,12,163,0.5)", color: "white", padding: "14px 32px", borderRadius: 12, fontSize: 14, fontWeight: 700, textDecoration: "none", letterSpacing: "0.02em" }}
          >
            Visit mgi-ventures.com →
          </a>
        </div>
      </section>

      {/* ══ CONTACT ═══════════════════════════════════════ */}
      <section id="contact" style={{ padding: "8rem 2rem", background: "#3a0ca3" }}>
        <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center" }}>
          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 11, fontWeight: 700, letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: 16 }}>Contact</p>
          <h2 style={{ color: "#ffffff", fontWeight: 900, fontSize: "clamp(1.8rem, 4vw, 2.8rem)", letterSpacing: "-0.02em", marginBottom: 16 }}>
            Connect with Rogers
          </h2>
          <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 16, lineHeight: 1.7, marginBottom: 48, maxWidth: 480, margin: "0 auto 48px" }}>
            For speaking engagements, executive mentoring inquiries, program partnerships, or media requests.
          </p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <a href="mailto:rogers@rogersnforgwei.com" style={{ background: "white", color: "#3a0ca3", padding: "16px 36px", borderRadius: 12, fontSize: 14, fontWeight: 700, textDecoration: "none" }}>
              rogers@rogersnforgwei.com
            </a>
            <a href="https://mgi-ventures.com/contact" style={{ background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.25)", color: "white", padding: "16px 36px", borderRadius: 12, fontSize: 14, fontWeight: 700, textDecoration: "none" }}>
              MGI Contact Page →
            </a>
          </div>
          <p style={{ color: "rgba(255,255,255,0.35)", fontSize: 12, marginTop: 40 }}>
            Yaoundé, Cameroun · rogersnforgwei.com
          </p>
        </div>
      </section>

    </main>
  );
}
