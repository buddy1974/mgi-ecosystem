import RegisterButton from '@/components/RegisterButton';

export default function MenOnDutyPage() {
  const serif = "Georgia, 'Times New Roman', serif";
  const sans = "'Segoe UI', system-ui, sans-serif";
  const purple = "#3a0ca3";
  const pink = "#f72585";

  const pillars = [
    { title: "Fatherhood",    desc: "Raising children who inherit values, not just wealth. Practical discipleship for fathers who want to leave a generational mark." },
    { title: "Marriage",      desc: "Covenant-grade relationships. Building partnerships of purpose, honour, and deep friendship with your spouse." },
    { title: "Career & Business", desc: "Vocation as calling. Integrating faith and work so that what you do becomes an extension of who you are." },
    { title: "Community",     desc: "Men On Duty men are known by their presence — in the neighbourhood, in the church, in the marketplace." },
    { title: "Mentorship",    desc: "Every man who grows has a responsibility to turn around and reach back. Structured mentorship is built into the program." },
    { title: "Inner Life",    desc: "Sobriety of soul. Accountability, prayer, and the disciplines that sustain a man through every season." },
  ];

  return (
    <main style={{ minHeight: "100vh", background: "#06010f", color: "#f0eeff", fontFamily: sans }}>

      {/* NAV */}
      <nav style={{ padding: "1.5rem 3rem", display: "flex", alignItems: "center",
        justifyContent: "space-between", maxWidth: 1200, margin: "0 auto" }}>
        <a href="/" style={{ color: pink, textDecoration: "none", fontSize: 13,
          letterSpacing: "0.15em", textTransform: "uppercase", fontWeight: 600 }}>
          ← Rogers Nforgwei
        </a>
      </nav>

      {/* HERO */}
      <section style={{
        padding: "80px 3rem 96px", textAlign: "center",
        background: `linear-gradient(160deg, #06010f 0%, #0d0520 55%, #06010f 100%)`,
        position: "relative", overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", top: -100, left: "50%", transform: "translateX(-50%)",
          width: 600, height: 600, borderRadius: "50%",
          background: `radial-gradient(circle, ${purple}20 0%, transparent 65%)`,
          pointerEvents: "none",
        }} />
        <div style={{ position: "relative", zIndex: 2, maxWidth: 820, margin: "0 auto" }}>
          <p style={{ color: pink, fontSize: 10, letterSpacing: "0.55em",
            textTransform: "uppercase", marginBottom: 24, fontWeight: 600 }}>
            Year-Round Program
          </p>
          <h1 style={{ fontFamily: serif, fontSize: "clamp(2.8rem, 6vw, 5rem)",
            fontWeight: 400, letterSpacing: "0.04em", lineHeight: 1.1,
            color: "#f0eeff", marginBottom: 16 }}>
            Men On Duty
          </h1>
          <div style={{ width: 48, height: 2, background: pink, margin: "32px auto 32px", opacity: 0.5 }} />
          <p style={{ fontSize: 18, lineHeight: 1.85, color: "rgba(240,238,255,0.55)",
            fontFamily: serif, fontStyle: "italic", maxWidth: 600, margin: "0 auto 40px" }}>
            A year-round community of men committed to showing up — in their homes,
            their work, and their world. Not occasionally. As a way of life.
          </p>
          <a href="mailto:info@rogersnforgwei.com?subject=Men On Duty Membership"
            style={{ display: "inline-block", background: pink, color: "#fff",
              padding: "15px 48px", borderRadius: 3, fontSize: 12,
              fontWeight: 700, textDecoration: "none", letterSpacing: "0.2em",
              textTransform: "uppercase" }}>
            Join the Community
          </a>
        </div>
      </section>

      {/* 6 PILLARS */}
      <section style={{ padding: "80px 3rem", maxWidth: 1100, margin: "0 auto" }}>
        <p style={{ color: pink, fontSize: 10, letterSpacing: "0.4em",
          textTransform: "uppercase", marginBottom: 16, fontWeight: 600 }}>
          The Six Pillars
        </p>
        <h2 style={{ fontFamily: serif, fontSize: "clamp(1.8rem, 2.5vw, 2.4rem)",
          fontWeight: 400, color: "#f0eeff", lineHeight: 1.2, marginBottom: 48,
          letterSpacing: "0.02em", maxWidth: 500 }}>
          What Men On Duty<br />Holds You To
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 2 }}>
          {pillars.map((p, i) => (
            <div key={i} style={{
              padding: "36px 32px",
              background: "rgba(58,12,163,0.07)",
              borderTop: `2px solid ${pink}30`,
            }}>
              <p style={{ color: pink, fontWeight: 700, fontSize: 14,
                marginBottom: 10, letterSpacing: "0.04em" }}>{p.title}</p>
              <p style={{ color: "rgba(240,238,255,0.4)", fontSize: 14, lineHeight: 1.75 }}>
                {p.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "80px 3rem", textAlign: "center",
        borderTop: "1px solid rgba(58,12,163,0.2)" }}>
        <div style={{ maxWidth: 520, margin: "0 auto" }}>
          <h2 style={{ fontFamily: serif, fontSize: "clamp(1.6rem, 2.5vw, 2.2rem)",
            color: "#f0eeff", fontWeight: 400, marginBottom: 16 }}>
            Be a Man On Duty
          </h2>
          <p style={{ color: "rgba(240,238,255,0.4)", fontSize: 15, lineHeight: 1.8, marginBottom: 36 }}>
            Membership is open to men who are ready to commit — not to a program,
            but to a standard of life that honours God and serves others.
          </p>
          <a href="mailto:info@rogersnforgwei.com?subject=Men On Duty Membership"
            style={{ display: "inline-block", background: pink, color: "#fff",
              padding: "15px 48px", borderRadius: 3, fontSize: 12, fontWeight: 700,
              textDecoration: "none", letterSpacing: "0.2em", textTransform: "uppercase" }}>
            Apply for Membership
          </a>
        </div>
      </section>

      {/* REGISTRATION */}
      <section style={{
        padding: '80px 40px', textAlign: 'center',
        borderTop: '1px solid rgba(247,37,133,0.15)',
      }}>
        <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.8rem', marginBottom: '8px', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
          Secure your place
        </p>
        <h2 style={{ color: '#fff', fontSize: '2rem', marginBottom: '32px', fontFamily: serif }}>
          Register Now
        </h2>
        <RegisterButton program="men-on-duty" />
        <div style={{ marginTop: '40px', color: 'rgba(255,255,255,0.35)', fontSize: '0.8rem', lineHeight: 1.8 }}>
          <p>Payment via MTN MoMo or Orange Money</p>
          <p>Manual: MTN <strong style={{ color: 'rgba(255,255,255,0.6)' }}>*126*4*926667*AMOUNT#</strong> · Orange <strong style={{ color: 'rgba(255,255,255,0.6)' }}>#150*47*890422*AMOUNT#</strong></p>
          <p>Proof via WhatsApp: <a href="https://wa.me/237683493220" style={{ color: '#f72585' }}>+237 683 493 220</a></p>
        </div>
      </section>

      <footer style={{ padding: "2rem 3rem", textAlign: "center",
        borderTop: "1px solid rgba(240,238,255,0.05)" }}>
        <p style={{ color: "rgba(240,238,255,0.2)", fontSize: 11,
          letterSpacing: "0.12em", textTransform: "uppercase" }}>
          © {new Date().getFullYear()} Rogers Nforgwei · Men On Duty
        </p>
      </footer>
    </main>
  );
}
