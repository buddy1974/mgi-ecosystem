import RegisterButton from '@/components/RegisterButton';

export default function DominionLifePage() {
  const serif = "Georgia, 'Times New Roman', serif";
  const sans = "'Segoe UI', system-ui, sans-serif";
  const purple = "#3a0ca3";
  const pink = "#f72585";

  return (
    <main style={{ minHeight: "100vh", background: "#06010f", color: "#f0eeff", fontFamily: sans }}>

      {/* NAV */}
      <nav style={{
        padding: "1.5rem 3rem", display: "flex", alignItems: "center",
        justifyContent: "space-between", maxWidth: 1200, margin: "0 auto",
      }}>
        <a href="/" style={{ color: pink, textDecoration: "none", fontSize: 13,
          letterSpacing: "0.15em", textTransform: "uppercase", fontWeight: 600 }}>
          ← Rogers Nforgwei
        </a>
        <a href="https://mgi-ventures.com" target="_blank" rel="noopener noreferrer"
          style={{ color: "rgba(240,238,255,0.25)", fontSize: 11, textDecoration: "none",
          letterSpacing: "0.15em", textTransform: "uppercase" }}>
          MGI Ventures →
        </a>
      </nav>

      {/* HERO */}
      <section style={{
        padding: "80px 3rem 96px", textAlign: "center",
        background: "linear-gradient(135deg, #3a0ca3 0%, #4361ee 100%)",
        position: "relative", overflow: "hidden",
      }}>
        {/* DoodleWave */}
        <svg style={{ position: "absolute", right: "-40px", bottom: "20px", opacity: 0.08, pointerEvents: "none" }}
          width="300" height="200" viewBox="0 0 300 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 100 Q75 20 150 100 Q225 180 300 100" stroke="#4361ee" strokeWidth="3" fill="none"/>
          <path d="M0 130 Q75 50 150 130 Q225 210 300 130" stroke="#4361ee" strokeWidth="2" fill="none"/>
          <path d="M0 70 Q75 -10 150 70 Q225 150 300 70" stroke="#4361ee" strokeWidth="2" fill="none"/>
        </svg>
        <div style={{ position: "relative", zIndex: 2, maxWidth: 820, margin: "0 auto" }}>
          <p style={{ color: pink, fontSize: 10, letterSpacing: "0.55em",
            textTransform: "uppercase", marginBottom: 24, fontWeight: 600 }}>
            Annual Conference
          </p>
          <h1 style={{ fontFamily: serif, fontSize: "clamp(2.8rem, 6vw, 5rem)",
            fontWeight: 400, letterSpacing: "0.04em", lineHeight: 1.1,
            color: "#f0eeff", marginBottom: 16 }}>
            Dominion Life<br />
            <span style={{ color: pink, fontStyle: "italic" }}>Men&apos;s Conference</span>
          </h1>
          <div style={{ width: 48, height: 2, background: pink, margin: "32px auto 32px", opacity: 0.5 }} />
          <p style={{ fontSize: 18, lineHeight: 1.85, color: "rgba(240,238,255,0.55)",
            fontFamily: serif, fontStyle: "italic", maxWidth: 600, margin: "0 auto 40px" }}>
            A gathering of men called to lead with purpose, walk with integrity,
            and build a legacy that outlasts them.
          </p>
          <a href="#register" style={{
            display: "inline-block", background: pink, color: "#fff",
            padding: "15px 48px", borderRadius: 3, fontSize: 12,
            fontWeight: 700, textDecoration: "none", letterSpacing: "0.2em",
            textTransform: "uppercase",
          }}>
            Register Now
          </a>
        </div>
      </section>

      {/* ABOUT */}
      <section style={{ background: "#f1f1f1", padding: "80px 3rem" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "start" }}>
          <div>
            <div style={{ display: "flex", gap: "4px", marginBottom: 12 }}>
              <div style={{ width: 20, height: 6, background: "#3a0ca3", borderRadius: 1 }} />
              <div style={{ width: 12, height: 6, background: "#f72585", borderRadius: 1 }} />
              <div style={{ width: 8, height: 6, background: "#4361ee", borderRadius: 1 }} />
            </div>
            <p style={{ color: "#3a0ca3", fontSize: 10, letterSpacing: "0.4em",
              textTransform: "uppercase", marginBottom: 16, fontWeight: 600 }}>
              About The Conference
            </p>
            <h2 style={{ fontFamily: serif, fontSize: "clamp(1.8rem, 2.5vw, 2.4rem)",
              fontWeight: 700, color: "#3a0ca3", lineHeight: 1.25, marginBottom: 24,
              letterSpacing: "0.02em" }}>
              Built for Men Who<br />Refuse Mediocrity
            </h2>
            <p style={{ color: "#4c4c4c", lineHeight: 1.85, fontSize: 16, marginBottom: 20 }}>
              Dominion Life is not a religious event. It is a leadership formation
              encounter. Every year, men from across Cameroon and beyond gather to
              confront what holds them back — and leave with renewed vision, unshakeable
              conviction, and practical tools for transformation.
            </p>
            <p style={{ color: "#4c4c4c", lineHeight: 1.85, fontSize: 16 }}>
              Led by Apostle Rogers Nforgwei, the conference fuses faith, executive
              thinking, and community — producing men who lead homes, businesses, and
              nations with dominion authority.
            </p>
          </div>
          <div style={{ paddingTop: 40 }}>
            {[
              { title: "Vision & Purpose",    desc: "Reconnect with the why behind your life. Receive clarity that cuts through distraction and reignites your sense of calling." },
              { title: "Leadership Formation", desc: "Practical frameworks for leading with integrity in business, family, and community. No theory — only proven principles." },
              { title: "Brotherhood",          desc: "Forge accountable relationships with men who challenge you to grow and refuse to let you settle for less than your potential." },
              { title: "Spiritual Authority",  desc: "Walk in the understanding of your God-given dominion — over fear, limitation, and circumstance." },
            ].map((item) => (
              <div key={item.title} style={{ marginBottom: 28, paddingBottom: 28,
                borderBottom: "1px solid rgba(58,12,163,0.1)" }}>
                <p style={{ color: "#f72585", fontWeight: 700, fontSize: 14,
                  marginBottom: 6, letterSpacing: "0.05em" }}>{item.title}</p>
                <p style={{ color: "#4c4c4c", fontSize: 14, lineHeight: 1.7 }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REGISTER CTA */}
      <section id="register" style={{
        padding: "80px 3rem", textAlign: "center",
        background: "rgba(58,12,163,0.1)",
        borderTop: "1px solid rgba(58,12,163,0.2)",
        borderBottom: "1px solid rgba(58,12,163,0.2)",
      }}>
        <div style={{ maxWidth: 560, margin: "0 auto" }}>
          <h2 style={{ fontFamily: serif, fontSize: "clamp(1.6rem, 2.5vw, 2.2rem)",
            color: "#f0eeff", fontWeight: 400, marginBottom: 16, letterSpacing: "0.03em" }}>
            Reserve Your Place
          </h2>
          <p style={{ color: "rgba(240,238,255,0.4)", fontSize: 15, lineHeight: 1.8, marginBottom: 36 }}>
            Registration opens annually. Contact us to be notified for the next edition
            and to receive early access information.
          </p>
          <a href="mailto:info@rogersnforgwei.com?subject=Dominion Life Registration"
            style={{ display: "inline-block", background: pink, color: "#fff",
              padding: "15px 48px", borderRadius: 3, fontSize: 12, fontWeight: 700,
              textDecoration: "none", letterSpacing: "0.2em", textTransform: "uppercase" }}>
            Contact for Registration
          </a>
        </div>
      </section>

      {/* REGISTRATION */}
      <section style={{
        padding: '80px 40px', textAlign: 'center',
        background: '#3a0ca3',
      }}>
        <p style={{ color: '#7b90f3', fontSize: '0.8rem', marginBottom: '8px', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
          Secure your place
        </p>
        <h2 style={{ color: '#fff', fontSize: '2rem', marginBottom: '32px', fontFamily: serif, fontWeight: 800 }}>
          Register Now
        </h2>
        <RegisterButton program="dominion-life" />
        <div style={{ marginTop: '40px', color: 'rgba(255,255,255,0.35)', fontSize: '0.8rem', lineHeight: 1.8 }}>
          <p>Payment via MTN MoMo or Orange Money</p>
          <p>Manual: MTN <strong style={{ color: 'rgba(255,255,255,0.6)' }}>*126*4*926667*AMOUNT#</strong> · Orange <strong style={{ color: 'rgba(255,255,255,0.6)' }}>#150*47*890422*AMOUNT#</strong></p>
          <p>Proof via WhatsApp: <a href="https://wa.me/237683493220" style={{ color: '#f72585' }}>+237 683 493 220</a></p>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ padding: "2rem 3rem", textAlign: "center",
        borderTop: "1px solid rgba(240,238,255,0.05)" }}>
        <p style={{ color: "rgba(240,238,255,0.2)", fontSize: 11,
          letterSpacing: "0.12em", textTransform: "uppercase" }}>
          © {new Date().getFullYear()} Rogers Nforgwei · Dominion Life Men&apos;s Conference
        </p>
      </footer>
    </main>
  );
}
