export default function HomePage() {
  const serif = "'Cormorant Garamond', Georgia, serif";
  const sans = "'DM Sans', sans-serif";

  return (
    <main style={{
      minHeight: "100vh",
      background: "linear-gradient(165deg, #0a0706 0%, #110d07 40%, #1e1509 100%)",
      display: "flex", flexDirection: "column",
      position: "relative", overflow: "hidden",
    }}>

      {/* ── Architectural grid overlay — subtle texture ── */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage:
          "linear-gradient(rgba(200,169,110,0.02) 1px, transparent 1px)," +
          "linear-gradient(90deg, rgba(200,169,110,0.02) 1px, transparent 1px)",
        backgroundSize: "80px 80px",
        pointerEvents: "none",
      }} />

      {/* ── Warm glow — ambient light from upper right ── */}
      <div style={{
        position: "absolute", top: -200, right: -100,
        width: 700, height: 700, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(200,169,110,0.06) 0%, transparent 65%)",
        pointerEvents: "none",
      }} />

      {/* ── Secondary warm glow lower left ── */}
      <div style={{
        position: "absolute", bottom: -150, left: -100,
        width: 500, height: 500, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(200,169,110,0.04) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      {/* ── TOP NAV ── */}
      <header style={{
        position: "relative", zIndex: 10,
        padding: "2.5rem 3rem",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        maxWidth: 1280, margin: "0 auto", width: "100%", boxSizing: "border-box",
      }}>
        {/* Wordmark */}
        <div>
          <p style={{
            color: "#c8a96e", fontFamily: serif,
            fontSize: 22, fontWeight: 500, letterSpacing: "0.12em",
            margin: 0, textTransform: "uppercase",
          }}>
            Abba Land Place
          </p>
          <p style={{
            color: "rgba(200,169,110,0.4)", fontFamily: sans,
            fontSize: 9, fontWeight: 400, letterSpacing: "0.3em",
            margin: "2px 0 0", textTransform: "uppercase",
          }}>
            A Premium Destination
          </p>
        </div>

        {/* MGI affiliation */}
        <a href="https://mgi-ventures.com" target="_blank" rel="noopener noreferrer" style={{
          color: "rgba(200,169,110,0.35)", fontSize: 11,
          textDecoration: "none", fontFamily: sans,
          letterSpacing: "0.15em", textTransform: "uppercase",
          fontWeight: 400,
        }}>
          An MGI Ventures Enterprise →
        </a>
      </header>

      {/* ── MAIN CONTENT ── */}
      <div style={{
        flex: 1, display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        padding: "4rem 3rem",
        position: "relative", zIndex: 5,
        textAlign: "center",
      }}>

        {/* Thin gold line — architectural detail */}
        <div style={{
          width: 48, height: 1, background: "#c8a96e",
          margin: "0 auto 40px", opacity: 0.6,
        }} />

        {/* Eyebrow */}
        <p style={{
          color: "rgba(200,169,110,0.5)", fontSize: 10, fontWeight: 400,
          letterSpacing: "0.55em", textTransform: "uppercase",
          marginBottom: 28, fontFamily: sans,
        }}>
          Coming Soon
        </p>

        {/* Main headline — Cormorant Garamond elegant display */}
        <h1 style={{
          color: "#f7f2e8",
          fontFamily: serif,
          fontSize: "clamp(3.5rem, 8vw, 7rem)",
          fontWeight: 300, letterSpacing: "0.06em",
          lineHeight: 1.05,
          marginBottom: 12,
          textTransform: "uppercase",
        }}>
          Something
        </h1>
        <h1 style={{
          color: "#c8a96e",
          fontFamily: serif,
          fontSize: "clamp(3.5rem, 8vw, 7rem)",
          fontWeight: 300, letterSpacing: "0.06em",
          lineHeight: 1.05,
          marginBottom: 12,
          textTransform: "uppercase",
          fontStyle: "italic",
        }}>
          Exceptional
        </h1>
        <h1 style={{
          color: "#f7f2e8",
          fontFamily: serif,
          fontSize: "clamp(3.5rem, 8vw, 7rem)",
          fontWeight: 300, letterSpacing: "0.06em",
          lineHeight: 1.05,
          marginBottom: 60,
          textTransform: "uppercase",
        }}>
          Is Coming.
        </h1>

        {/* Thin gold separator */}
        <div style={{
          display: "flex", alignItems: "center", gap: 16,
          marginBottom: 40, justifyContent: "center",
        }}>
          <div style={{ width: 60, height: 1, background: "rgba(200,169,110,0.3)" }} />
          <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#c8a96e", opacity: 0.5 }} />
          <div style={{ width: 60, height: 1, background: "rgba(200,169,110,0.3)" }} />
        </div>

        {/* Subline */}
        <p style={{
          color: "rgba(247,242,232,0.45)", fontSize: "clamp(15px, 2vw, 18px)",
          lineHeight: 1.85, marginBottom: 12, maxWidth: 520, margin: "0 auto 16px",
          fontFamily: serif, fontWeight: 300, fontStyle: "italic",
        }}>
          A premium hospitality destination.
          An elevated experience designed for those who value
          the exceptional in every detail.
        </p>
        <p style={{
          color: "rgba(200,169,110,0.35)", fontSize: 13,
          marginBottom: 64, fontFamily: sans, fontWeight: 300,
          letterSpacing: "0.1em",
        }}>
          Abba Land Place · Cameroun
        </p>

        {/* CTA */}
        <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap", marginBottom: 72 }}>
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

        {/* Thin gold line */}
        <div style={{ width: 48, height: 1, background: "#c8a96e", margin: "0 auto", opacity: 0.3 }} />
      </div>

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
