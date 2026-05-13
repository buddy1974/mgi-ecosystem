const serif = "'Libre Baskerville', Georgia, 'Times New Roman', serif";
const sans = "'Inter', 'Segoe UI', Arial, sans-serif";

export default function HomePage() {
  const stats = [
    { value: "1.5M+", label: "Books produced annually" },
    { value: "60%", label: "Local market coverage" },
    { value: "Bilingual", label: "French & English publishing" },
    { value: "Africa", label: "Continental distribution" },
  ];

  const services = [
    {
      icon: "📖",
      title: "Educational Publishing",
      description:
        "Bilingual educational materials — French and English — covering primary, secondary, and tertiary levels. Developed with institutional rigour and curriculum alignment.",
      tag: "Core",
    },
    {
      icon: "🖨️",
      title: "Print Infrastructure",
      description:
        "Industrial-scale print production. Anti-piracy printing technology ensures authenticity, protects authors and institutions, and maintains quality standards across every title.",
      tag: "Production",
    },
    {
      icon: "🚛",
      title: "Nationwide Distribution",
      description:
        "Integrated warehousing and logistics capability enabling distribution of educational materials to schools, institutions, and retail networks across Cameroon and beyond.",
      tag: "Distribution",
    },
    {
      icon: "🌍",
      title: "Continental Reach",
      description:
        "Distribution partnerships extending across multiple African countries. NMI Education serves the continental educational supply chain as a trusted publisher and distributor.",
      tag: "Africa",
    },
    {
      icon: "📚",
      title: "Curriculum Solutions",
      description:
        "Complete curriculum-aligned solutions for schools and ministries of education. Textbooks, teacher resources, student workbooks, and pedagogical materials.",
      tag: "Curriculum",
    },
    {
      icon: "🤝",
      title: "Institutional Partnerships",
      description:
        "History of collaboration with international publishing institutions. NMI Education brings global publishing standards to African educational contexts.",
      tag: "Partners",
    },
  ];

  return (
    <main>

      {/* ══ HERO — WHITE/BLUE INSTITUTIONAL ═══════════════ */}
      <section style={{
        background: "#ffffff",
        padding: "0",
        position: "relative", overflow: "hidden",
      }}>
        {/* Top blue bar — institutional header */}
        <div style={{ background: "#003580", height: 4, width: "100%" }} />

        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "7rem 2rem 6rem", position: "relative" }}>

          {/* Large blue institutional backdrop text */}
          <div style={{
            position: "absolute", top: "50%", right: -20,
            transform: "translateY(-50%)",
            fontSize: "clamp(8rem, 15vw, 18rem)",
            fontWeight: 700, color: "rgba(0,53,128,0.035)",
            fontFamily: serif, letterSpacing: "-0.05em",
            userSelect: "none", pointerEvents: "none",
            lineHeight: 1,
          }}>
            NMI
          </div>

          <div style={{ maxWidth: 760, position: "relative" }}>
            {/* Gold credibility bar */}
            <div style={{ width: 56, height: 3, background: "#d4a017", borderRadius: 2, marginBottom: 28 }} />

            <p style={{
              color: "#003580", fontSize: 11, fontWeight: 600,
              letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: 20,
              fontFamily: sans,
            }}>
              Bilingual Publishing Leader in Africa
            </p>
            <h1 style={{
              color: "#0f1c2e",
              fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
              fontWeight: 700, letterSpacing: "-0.02em",
              lineHeight: 1.1, marginBottom: 16,
              fontFamily: serif,
            }}>
              Educating Africa
            </h1>
            <h1 style={{
              color: "#003580",
              fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
              fontWeight: 700, letterSpacing: "-0.02em",
              lineHeight: 1.1, marginBottom: 36,
              fontFamily: serif,
            }}>
              One Book at a Time.
            </h1>
            <p style={{
              color: "#374151", fontSize: 18,
              lineHeight: 1.8, marginBottom: 48, maxWidth: 580,
              fontFamily: sans, fontWeight: 300,
            }}>
              NMI Education is a bilingual educational publisher and distribution
              infrastructure company. 1.5 million books annually. 60% local market
              coverage. Continental African reach.
            </p>
            <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
              <a href="#publishing" style={{
                background: "#003580", color: "white",
                padding: "16px 36px", borderRadius: 6,
                fontSize: 14, fontWeight: 600, textDecoration: "none",
              }}>
                Our Publishing
              </a>
              <a href="#contact" style={{
                background: "transparent",
                border: "2px solid #003580",
                color: "#003580",
                padding: "16px 36px", borderRadius: 6,
                fontSize: 14, fontWeight: 600, textDecoration: "none",
              }}>
                Partner With Us
              </a>
            </div>
          </div>
        </div>

        {/* Bottom blue border */}
        <div style={{ background: "#003580", height: 2, width: "100%", opacity: 0.15 }} />
      </section>

      {/* ══ STATS BAR ════════════════════════════════════ */}
      <section style={{ background: "#003580", padding: "2.5rem 2rem" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", display: "flex", justifyContent: "center", gap: "5rem", flexWrap: "wrap" }}>
          {stats.map((s) => (
            <div key={s.label} style={{ textAlign: "center" }}>
              <p style={{
                color: "#d4a017", fontWeight: 700, fontSize: 32, margin: "0 0 4px",
                letterSpacing: "-0.02em", fontFamily: serif,
              }}>{s.value}</p>
              <p style={{
                color: "rgba(255,255,255,0.6)", fontWeight: 400, fontSize: 12,
                margin: 0, textTransform: "uppercase", letterSpacing: "0.12em",
              }}>{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ══ ABOUT ════════════════════════════════════════ */}
      <section id="about" style={{ padding: "8rem 2rem", background: "#f8fafc" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "center" }}>
          <div>
            {/* Gold credibility bar */}
            <div style={{ width: 40, height: 3, background: "#d4a017", borderRadius: 2, marginBottom: 24 }} />
            <p style={{ color: "#003580", fontSize: 11, fontWeight: 600, letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: 16, fontFamily: sans }}>
              Who We Are
            </p>
            <h2 style={{
              color: "#0f1c2e",
              fontSize: "clamp(2rem, 4vw, 2.8rem)",
              fontWeight: 700, letterSpacing: "-0.02em", lineHeight: 1.15, marginBottom: 28,
              fontFamily: serif,
            }}>
              Africa&apos;s bilingual<br />educational publisher
            </h2>
            <p style={{ color: "#374151", fontSize: 16, lineHeight: 1.85, marginBottom: 24 }}>
              NMI Education is a leading bilingual educational publisher and distribution
              infrastructure company. We produce, print, warehouse, and distribute
              educational materials — in French and English — serving schools, institutions,
              and governments across Cameroon and the African continent.
            </p>
            <p style={{ color: "#374151", fontSize: 16, lineHeight: 1.85, marginBottom: 36 }}>
              With a history of institutional partnership with Cambridge University Press,
              a continental distribution network, and over 1.5 million books produced
              annually, NMI Education operates at a scale that shapes educational
              infrastructure across the region.
            </p>
            <div style={{ padding: "1.5rem 2rem", background: "#e8f1fb", borderRadius: 8, borderLeft: "4px solid #d4a017" }}>
              <p style={{ color: "#003580", fontWeight: 700, fontSize: 15, margin: "0 0 6px", fontFamily: serif, fontStyle: "italic" }}>
                &ldquo;Building Africa&apos;s educational future through quality publishing.&rdquo;
              </p>
              <p style={{ color: "#6B7280", fontSize: 13, margin: 0 }}>NMI Education — Rogers Nforgwei, CEO</p>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            {[
              { icon: "📘", title: "1.5M Books / Year", desc: "Annual production capacity serving the African education market" },
              { icon: "🎓", title: "60% Market Coverage", desc: "Dominant share of the local educational publishing market in Cameroon" },
              { icon: "🌍", title: "Continental Reach", desc: "Distribution active across multiple African countries" },
              { icon: "🔐", title: "Anti-Piracy Printing", desc: "Professional-grade printing with built-in authenticity protection" },
            ].map((v) => (
              <div key={v.title} style={{
                padding: "1.5rem", background: "#ffffff",
                borderRadius: 10, border: "1px solid #e2e8f0",
                boxShadow: "0 1px 6px rgba(0,53,128,0.06)",
              }}>
                <span style={{ fontSize: 28, display: "block", marginBottom: 12 }}>{v.icon}</span>
                <p style={{ color: "#003580", fontWeight: 700, fontSize: 14, margin: "0 0 6px", fontFamily: sans }}>{v.title}</p>
                <p style={{ color: "#6B7280", fontSize: 12, margin: 0, lineHeight: 1.6 }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ PUBLISHING SERVICES ══════════════════════════ */}
      <section id="publishing" style={{ padding: "8rem 2rem", background: "#ffffff" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ marginBottom: 64 }}>
            <div style={{ width: 40, height: 3, background: "#d4a017", borderRadius: 2, marginBottom: 24 }} />
            <p style={{ color: "#003580", fontSize: 11, fontWeight: 600, letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: 16, fontFamily: sans }}>
              What We Do
            </p>
            <h2 style={{ color: "#0f1c2e", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700, letterSpacing: "-0.02em", margin: 0, fontFamily: serif }}>
              End-to-end educational publishing
            </h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24 }}>
            {services.map((s) => (
              <div key={s.title} style={{
                background: "#f8fafc", borderRadius: 10,
                border: "1px solid #e2e8f0", overflow: "hidden",
                boxShadow: "0 1px 6px rgba(0,53,128,0.04)",
              }}>
                <div style={{ height: 3, background: "#003580" }} />
                <div style={{ padding: "2rem" }}>
                  <span style={{
                    background: "#e8f1fb", color: "#003580",
                    fontSize: 10, fontWeight: 600, padding: "3px 10px",
                    borderRadius: 4, letterSpacing: "0.1em", textTransform: "uppercase",
                    display: "inline-block", marginBottom: 20,
                  }}>
                    {s.tag}
                  </span>
                  <span style={{ fontSize: 32, display: "block", marginBottom: 16 }}>{s.icon}</span>
                  <h3 style={{ color: "#0f1c2e", fontWeight: 700, fontSize: 18, marginBottom: 12, fontFamily: serif }}>
                    {s.title}
                  </h3>
                  <p style={{ color: "#6B7280", fontSize: 14, lineHeight: 1.75, margin: 0 }}>
                    {s.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ DISTRIBUTION ═════════════════════════════════ */}
      <section id="distribution" style={{ padding: "8rem 2rem", background: "#003580" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "center" }}>
            <div>
              <div style={{ width: 40, height: 3, background: "#d4a017", borderRadius: 2, marginBottom: 24 }} />
              <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 11, fontWeight: 600, letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: 16 }}>
                Distribution Infrastructure
              </p>
              <h2 style={{
                color: "#ffffff",
                fontSize: "clamp(2rem, 4vw, 2.8rem)",
                fontWeight: 700, letterSpacing: "-0.02em", lineHeight: 1.15, marginBottom: 28,
                fontFamily: serif,
              }}>
                From press to<br />classroom, across Africa
              </h2>
              <p style={{ color: "rgba(255,255,255,0.55)", fontSize: 16, lineHeight: 1.85, marginBottom: 24 }}>
                NMI Education manages the full supply chain from print production through
                warehousing to final delivery to schools and institutions. Our logistics
                infrastructure ensures reliable, timely distribution at national and
                continental scale.
              </p>
              <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 16, lineHeight: 1.85, fontStyle: "italic", fontFamily: serif }}>
                Working with governments, ministries, schools, and distributors
                across Cameroon and multiple African countries.
              </p>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {[
                { step: "01", title: "Print Production", desc: "Industrial-scale, anti-piracy printing infrastructure" },
                { step: "02", title: "Warehousing", desc: "Secure storage and inventory management capability" },
                { step: "03", title: "National Distribution", desc: "Nationwide delivery network in Cameroon" },
                { step: "04", title: "Continental Reach", desc: "Cross-border distribution across African markets" },
              ].map((item) => (
                <div key={item.step} style={{
                  display: "flex", gap: 20, alignItems: "flex-start",
                  padding: "1.2rem 1.5rem",
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: 10,
                }}>
                  <span style={{ color: "#d4a017", fontWeight: 700, fontSize: 14, fontFamily: serif, minWidth: 32 }}>{item.step}</span>
                  <div>
                    <p style={{ color: "#ffffff", fontWeight: 600, fontSize: 14, margin: "0 0 4px" }}>{item.title}</p>
                    <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 13, margin: 0 }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ LEADERSHIP ═══════════════════════════════════ */}
      <section id="leadership" style={{ padding: "8rem 2rem", background: "#f8fafc" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
          <div style={{ width: 40, height: 3, background: "#d4a017", borderRadius: 2, margin: "0 auto 24px" }} />
          <p style={{ color: "#003580", fontSize: 11, fontWeight: 600, letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: 16, fontFamily: sans }}>
            Leadership
          </p>
          <h2 style={{ color: "#0f1c2e", fontSize: "clamp(2rem, 4vw, 2.8rem)", fontWeight: 700, letterSpacing: "-0.02em", marginBottom: 32, fontFamily: serif }}>
            Led by vision, driven by impact
          </h2>

          <div style={{ background: "#ffffff", borderRadius: 12, padding: "3rem", border: "1px solid #e2e8f0", boxShadow: "0 2px 12px rgba(0,53,128,0.06)", textAlign: "left" }}>
            <div style={{ display: "flex", alignItems: "flex-start", gap: 24, flexWrap: "wrap" }}>
              {/* Avatar placeholder */}
              <div style={{
                width: 80, height: 80, borderRadius: "50%",
                background: "#003580",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontWeight: 700, color: "white", fontSize: 24, fontFamily: serif,
                flexShrink: 0,
              }}>RN</div>
              <div style={{ flex: 1, minWidth: 200 }}>
                <p style={{ color: "#0f1c2e", fontWeight: 700, fontSize: 20, margin: "0 0 4px", fontFamily: serif }}>Rogers Nforgwei</p>
                <p style={{ color: "#003580", fontWeight: 600, fontSize: 13, margin: "0 0 16px", letterSpacing: "0.05em" }}>
                  CEO, NMI Education · Businessman · Humanitarian · Man of God
                </p>
                <p style={{ color: "#374151", fontSize: 15, lineHeight: 1.8, margin: 0 }}>
                  Rogers Nforgwei leads NMI Education with a vision for transforming
                  educational infrastructure across Africa through quality bilingual publishing,
                  modern print technology, and continental distribution. Under his leadership,
                  NMI has grown into a foundational institution in African educational publishing.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ MGI ECOSYSTEM ════════════════════════════════ */}
      <section style={{ padding: "4rem 2rem", background: "#0f1c2e" }}>
        <div style={{ maxWidth: 960, margin: "0 auto", textAlign: "center" }}>
          <p style={{ color: "rgba(255,255,255,0.25)", fontSize: 11, fontWeight: 600, letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: 12 }}>
            MGI Ecosystem
          </p>
          <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 15, marginBottom: 24 }}>
            NMI Education is a flagship enterprise of{" "}
            <strong style={{ color: "rgba(255,255,255,0.65)" }}>Mina-Galeed Invest (MGI) Ltd</strong> — Start well, Grow well.
          </p>
          <a href="https://mgi-ventures.com" target="_blank" rel="noopener noreferrer" style={{
            display: "inline-block",
            background: "rgba(0,53,128,0.3)",
            border: "1px solid rgba(0,53,128,0.5)",
            color: "#7db8f7",
            padding: "10px 24px", borderRadius: 6,
            fontSize: 13, fontWeight: 600, textDecoration: "none",
          }}>
            mgi-ventures.com →
          </a>
        </div>
      </section>

      {/* ══ CONTACT ══════════════════════════════════════ */}
      <section id="contact" style={{ padding: "8rem 2rem", background: "#003580" }}>
        <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center" }}>
          <div style={{ width: 40, height: 3, background: "#d4a017", borderRadius: 2, margin: "0 auto 28px" }} />
          <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 11, fontWeight: 600, letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: 16 }}>
            Contact
          </p>
          <h2 style={{
            color: "#ffffff", fontWeight: 700,
            fontSize: "clamp(2rem, 4vw, 2.8rem)",
            letterSpacing: "-0.02em", marginBottom: 20, fontFamily: serif,
          }}>
            Partner with NMI Education
          </h2>
          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 16, lineHeight: 1.75, maxWidth: 520, margin: "0 auto 48px" }}>
            Government institutions, schools, ministries, distributors, and
            publishing partners — contact our team to explore how we can
            serve your educational infrastructure needs.
          </p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <a href="mailto:info@nmieducation.com" style={{
              background: "#d4a017", color: "#0f1c2e",
              padding: "16px 32px", borderRadius: 6,
              fontSize: 14, fontWeight: 700, textDecoration: "none",
            }}>
              info@nmieducation.com
            </a>
            <a href="https://mgi-ventures.com" target="_blank" rel="noopener noreferrer" style={{
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.2)",
              color: "white", padding: "16px 32px", borderRadius: 6,
              fontSize: 14, fontWeight: 600, textDecoration: "none",
            }}>
              MGI Ecosystem →
            </a>
          </div>
        </div>
      </section>

    </main>
  );
}
