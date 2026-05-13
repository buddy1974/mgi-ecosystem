export default function HomePage() {
  const services = [
    {
      icon: "🏗️",
      title: "Construction & Bâtiment",
      description:
        "Conception et réalisation de bâtiments résidentiels, commerciaux et industriels. De la fondation à la finition, selon les normes en vigueur.",
      tag: "Core",
      color: "#1e3a5f",
    },
    {
      icon: "🛣️",
      title: "Infrastructures & VRD",
      description:
        "Voirie, réseaux divers, assainissement et aménagement de terrain. Des infrastructures durables pour des projets d'envergure.",
      tag: "Infrastructure",
      color: "#2d5a8e",
    },
    {
      icon: "🔧",
      title: "Rénovation & Réhabilitation",
      description:
        "Rénovation complète de bâtiments existants, réhabilitation de structures, mise aux normes et modernisation d'espaces.",
      tag: "Rénovation",
      color: "#1e4a6f",
    },
    {
      icon: "📐",
      title: "Études & Ingénierie",
      description:
        "Études techniques, plans architecturaux, suivi de chantier et maîtrise d'œuvre. Une expertise de bout en bout pour vos projets.",
      tag: "Ingénierie",
      color: "#f59e0b",
    },
  ];

  const values = [
    { icon: "⚙️", title: "Qualité", body: "Matériaux sélectionnés, techniques maîtrisées, finitions soignées — chaque chantier est une référence." },
    { icon: "⏱️", title: "Respect des délais", body: "Nous livrons dans les temps. La gestion rigoureuse des plannings est au cœur de notre méthode." },
    { icon: "🔒", title: "Sécurité", body: "Standards de sécurité stricts sur tous nos chantiers, pour la protection de nos équipes et de nos clients." },
    { icon: "📊", title: "Transparence", body: "Devis détaillés, suivi régulier et communication claire à chaque étape de votre projet." },
  ];

  return (
    <main>

      {/* ══ HERO ══════════════════════════════════════════ */}
      <section style={{
        minHeight: "90vh",
        display: "flex", alignItems: "center",
        background: "linear-gradient(150deg, #0f1f33 0%, #1e3a5f 60%, #2d5a8e 100%)",
        padding: "6rem 2rem",
        position: "relative", overflow: "hidden",
      }}>
        {/* Amber accent glow */}
        <div style={{
          position: "absolute", top: -100, right: -80,
          width: 500, height: 500, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(245,158,11,0.12) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />
        {/* Grid pattern overlay */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          pointerEvents: "none",
        }} />

        <div style={{ maxWidth: 1280, margin: "0 auto", width: "100%", position: "relative" }}>
          <div style={{ maxWidth: 720 }}>
            <p style={{
              color: "#f59e0b", fontSize: 11, fontWeight: 700,
              letterSpacing: "0.35em", textTransform: "uppercase", marginBottom: 24,
            }}>
              Construction · Infrastructures · Cameroun
            </p>
            <h1 style={{
              color: "#ffffff",
              fontSize: "clamp(2.8rem, 6vw, 5.5rem)",
              fontWeight: 900, letterSpacing: "-0.03em",
              lineHeight: 1.05, marginBottom: 12,
            }}>
              Construire avec
            </h1>
            <h1 style={{
              color: "#f59e0b",
              fontSize: "clamp(2.8rem, 6vw, 5.5rem)",
              fontWeight: 900, letterSpacing: "-0.03em",
              lineHeight: 1.05, marginBottom: 36,
            }}>
              excellence
            </h1>
            <p style={{
              color: "rgba(255,255,255,0.65)", fontSize: 18,
              lineHeight: 1.75, marginBottom: 48, maxWidth: 540,
            }}>
              DROS Construction — votre partenaire de confiance pour tous vos
              projets de construction, d&apos;infrastructure et de rénovation au Cameroun.
              Qualité, fiabilité, expertise.
            </p>
            <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
              <a href="#contact" style={{
                background: "#f59e0b", color: "#0f1f33",
                padding: "16px 36px", borderRadius: 12,
                fontSize: 14, fontWeight: 800, textDecoration: "none",
              }}>
                Demander un devis
              </a>
              <a href="#services" style={{
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.2)",
                color: "white",
                padding: "16px 36px", borderRadius: 12,
                fontSize: 14, fontWeight: 700, textDecoration: "none",
              }}>
                Nos services
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ══ STATS BAR ════════════════════════════════════ */}
      <section style={{ background: "#f59e0b", padding: "2rem" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", display: "flex", justifyContent: "center", gap: "4rem", flexWrap: "wrap" }}>
          {[
            { value: "10+", label: "Années d'expérience" },
            { value: "50+", label: "Projets réalisés" },
            { value: "100%", label: "Satisfaction client" },
            { value: "5+", label: "Régions couvertes" },
          ].map((s) => (
            <div key={s.label} style={{ textAlign: "center" }}>
              <p style={{ color: "#0f1f33", fontWeight: 900, fontSize: 28, margin: "0 0 4px", letterSpacing: "-0.02em" }}>{s.value}</p>
              <p style={{ color: "rgba(15,31,51,0.65)", fontWeight: 600, fontSize: 12, margin: 0, textTransform: "uppercase", letterSpacing: "0.1em" }}>{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ══ ABOUT ════════════════════════════════════════ */}
      <section id="about" style={{ padding: "8rem 2rem", background: "#ffffff" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "center" }}>
          <div>
            <p style={{ color: "#1e3a5f", fontSize: 11, fontWeight: 700, letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: 16 }}>
              Qui sommes-nous
            </p>
            <h2 style={{ color: "#111827", fontSize: "clamp(2rem, 4vw, 2.8rem)", fontWeight: 900, letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: 28 }}>
              L&apos;expertise<br />au service de vos projets
            </h2>
            <p style={{ color: "#374151", fontSize: 16, lineHeight: 1.85, marginBottom: 24 }}>
              DROS Construction est une entreprise de construction et d&apos;ingénierie
              au Cameroun. Spécialisée dans les bâtiments résidentiels, commerciaux,
              les infrastructures et la rénovation, elle accompagne ses clients de
              la conception à la livraison clés en main.
            </p>
            <p style={{ color: "#374151", fontSize: 16, lineHeight: 1.85, marginBottom: 32 }}>
              Chaque projet est traité avec rigueur, dans le respect des délais
              et des standards de qualité les plus élevés.
            </p>
            <div style={{ padding: "1.5rem 2rem", background: "#eff6ff", borderRadius: 16, borderLeft: "4px solid #f59e0b" }}>
              <p style={{ color: "#1e3a5f", fontWeight: 800, fontSize: 16, margin: "0 0 6px", fontStyle: "italic" }}>
                &ldquo;Construire avec excellence.&rdquo;
              </p>
              <p style={{ color: "#6B7280", fontSize: 13, margin: 0 }}>DROS Construction</p>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            {values.map((v) => (
              <div key={v.title} style={{ padding: "1.5rem", background: "#f9fafb", borderRadius: 16, border: "1px solid #e5e7eb" }}>
                <span style={{ fontSize: 28, display: "block", marginBottom: 12 }}>{v.icon}</span>
                <p style={{ color: "#111827", fontWeight: 700, fontSize: 14, margin: "0 0 6px" }}>{v.title}</p>
                <p style={{ color: "#6B7280", fontSize: 12, margin: 0 }}>{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ SERVICES ═════════════════════════════════════ */}
      <section id="services" style={{ padding: "8rem 2rem", background: "#f8fafc" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <p style={{ color: "#1e3a5f", fontSize: 11, fontWeight: 700, letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: 16 }}>
              Ce que nous faisons
            </p>
            <h2 style={{ color: "#111827", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 900, letterSpacing: "-0.03em", margin: 0 }}>
              Nos domaines d&apos;expertise
            </h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24 }}>
            {services.map((s) => (
              <div key={s.title} style={{
                background: "#ffffff", borderRadius: 20,
                border: "1px solid #e5e7eb", overflow: "hidden",
                boxShadow: "0 2px 12px rgba(30,58,95,0.06)",
              }}>
                <div style={{ height: 4, background: `linear-gradient(90deg, #1e3a5f, ${s.color})` }} />
                <div style={{ padding: "2rem" }}>
                  <span style={{
                    background: "#eff6ff", color: "#1e3a5f",
                    fontSize: 10, fontWeight: 700, padding: "3px 10px",
                    borderRadius: 20, letterSpacing: "0.1em", textTransform: "uppercase",
                    border: "1px solid #bfdbfe", display: "inline-block", marginBottom: 20,
                  }}>
                    {s.tag}
                  </span>
                  <span style={{ fontSize: 32, display: "block", marginBottom: 16 }}>{s.icon}</span>
                  <h3 style={{ color: "#111827", fontWeight: 800, fontSize: 18, marginBottom: 12 }}>
                    {s.title}
                  </h3>
                  <p style={{ color: "#6B7280", fontSize: 14, lineHeight: 1.7, margin: 0 }}>
                    {s.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ PROJECTS (placeholder) ═══════════════════════ */}
      <section id="projects" style={{ padding: "8rem 2rem", background: "#0f1f33" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <p style={{ color: "#f59e0b", fontSize: 11, fontWeight: 700, letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: 16 }}>
              Nos réalisations
            </p>
            <h2 style={{ color: "#ffffff", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 900, letterSpacing: "-0.03em", marginBottom: 20 }}>
              Des projets qui parlent d&apos;eux-mêmes
            </h2>
            <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 16, margin: 0 }}>
              Portfolio de réalisations — bientôt disponible.
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
            {[1, 2, 3].map((i) => (
              <div key={i} style={{
                height: 200, background: "rgba(255,255,255,0.04)",
                borderRadius: 16, border: "1px solid rgba(245,158,11,0.1)",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <p style={{ color: "rgba(255,255,255,0.15)", fontSize: 13, margin: 0 }}>Projet {i} — À venir</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ MGI ECOSYSTEM ════════════════════════════════ */}
      <section style={{ padding: "4rem 2rem", background: "#f9fafb", borderTop: "1px solid #e5e7eb" }}>
        <div style={{ maxWidth: 960, margin: "0 auto", textAlign: "center" }}>
          <p style={{ color: "#9CA3AF", fontSize: 11, fontWeight: 700, letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: 12 }}>
            Groupe MGI
          </p>
          <p style={{ color: "#374151", fontSize: 15, marginBottom: 24 }}>
            DROS Construction est une entreprise du groupe{" "}
            <strong>Mina-Galeed Invest (MGI) Ltd</strong> — Start well, Grow well.
          </p>
          <a href="https://mgi-ventures.com" target="_blank" rel="noopener noreferrer" style={{
            display: "inline-block", background: "#eff6ff",
            border: "1px solid #bfdbfe", color: "#1e3a5f",
            padding: "10px 24px", borderRadius: 10,
            fontSize: 13, fontWeight: 700, textDecoration: "none",
          }}>
            mgi-ventures.com →
          </a>
        </div>
      </section>

      {/* ══ CONTACT ══════════════════════════════════════ */}
      <section id="contact" style={{ padding: "8rem 2rem", background: "#1e3a5f" }}>
        <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center" }}>
          <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 11, fontWeight: 700, letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: 16 }}>
            Contactez-nous
          </p>
          <h2 style={{ color: "#ffffff", fontWeight: 900, fontSize: "clamp(2rem, 4vw, 2.8rem)", letterSpacing: "-0.02em", marginBottom: 16 }}>
            Parlons de votre projet
          </h2>
          <p style={{ color: "rgba(255,255,255,0.55)", fontSize: 16, lineHeight: 1.75, maxWidth: 480, margin: "0 auto 48px" }}>
            Un projet de construction, de rénovation ou d&apos;infrastructure ?
            Contactez-nous pour un devis gratuit et sans engagement.
          </p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <a href="mailto:info@drosconstruction.com" style={{
              background: "#f59e0b", color: "#0f1f33",
              padding: "16px 32px", borderRadius: 12,
              fontSize: 14, fontWeight: 800, textDecoration: "none",
            }}>
              info@drosconstruction.com
            </a>
            <a href="https://mgi-ventures.com" target="_blank" rel="noopener noreferrer" style={{
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.2)",
              color: "white", padding: "16px 32px", borderRadius: 12,
              fontSize: 14, fontWeight: 700, textDecoration: "none",
            }}>
              Groupe MGI →
            </a>
          </div>
        </div>
      </section>

    </main>
  );
}
