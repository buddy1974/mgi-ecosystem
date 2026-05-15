import RegisterButton from '@/components/RegisterButton';

export default function CEOOnMissionPage() {
  const serif = "Georgia, 'Times New Roman', serif";
  const sans = "'Segoe UI', system-ui, sans-serif";
  const purple = "#3a0ca3";
  const pink = "#f72585";

  const modules = [
    { num: "01", title: "The Executive Identity",       desc: "Who you are precedes what you build. Establishing the inner architecture of the values-led CEO." },
    { num: "02", title: "Mission-Driven Strategy",      desc: "Building companies around purpose, not just profit. Designing a business that has something to say." },
    { num: "03", title: "Culture Architecture",         desc: "The organisation takes the shape of its leader. Building cultures that outlast your presence." },
    { num: "04", title: "Governance & Accountability",  desc: "Structures that protect your organisation and your integrity. Boards, systems, and honest counsel." },
    { num: "05", title: "Growth & Multiplication",      desc: "Scaling with wisdom. How to grow without losing soul, quality, or team alignment." },
    { num: "06", title: "Legacy & Succession",          desc: "The CEO's final assignment: building something that does not need you to survive." },
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
        background: "linear-gradient(135deg, #3a0ca3 0%, #4361ee 100%)",
        position: "relative", overflow: "hidden",
      }}>
        <svg style={{ position: "absolute", right: "-40px", bottom: "20px", opacity: 0.08, pointerEvents: "none" }}
          width="300" height="200" viewBox="0 0 300 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 100 Q75 20 150 100 Q225 180 300 100" stroke="#4361ee" strokeWidth="3" fill="none"/>
          <path d="M0 130 Q75 50 150 130 Q225 210 300 130" stroke="#4361ee" strokeWidth="2" fill="none"/>
          <path d="M0 70 Q75 -10 150 70 Q225 150 300 70" stroke="#4361ee" strokeWidth="2" fill="none"/>
        </svg>
        <div style={{ position: "relative", zIndex: 2, maxWidth: 820, margin: "0 auto" }}>
          <p style={{ color: pink, fontSize: 10, letterSpacing: "0.55em",
            textTransform: "uppercase", marginBottom: 24, fontWeight: 600 }}>
            One-to-One · Paid Coaching · Application Required
          </p>
          <h1 style={{ fontFamily: serif, fontSize: "clamp(2.8rem, 6vw, 5rem)",
            fontWeight: 400, letterSpacing: "0.04em", lineHeight: 1.1,
            color: "#f0eeff", marginBottom: 16 }}>
            CEO On Mission
          </h1>
          <div style={{ width: 48, height: 2, background: pink, margin: "32px auto 32px", opacity: 0.5 }} />
          <p style={{ fontSize: 18, lineHeight: 1.85, color: "rgba(240,238,255,0.55)",
            fontFamily: serif, fontStyle: "italic", maxWidth: 620, margin: "0 auto 40px" }}>
            An executive mentorship program for founders, CEOs, and senior leaders who
            want to build companies of lasting significance — not just commercial success.
          </p>
          <a href="#apply" style={{
            display: "inline-block", background: pink, color: "#fff",
            padding: "15px 48px", borderRadius: 3, fontSize: 12,
            fontWeight: 700, textDecoration: "none", letterSpacing: "0.2em",
            textTransform: "uppercase",
          }}>
            Apply for the Program
          </a>
        </div>
      </section>

      {/* 6 MODULES */}
      <section style={{ background: "#f1f1f1", padding: "80px 3rem" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ display: "flex", gap: "4px", marginBottom: 12 }}>
            <div style={{ width: 20, height: 6, background: "#3a0ca3", borderRadius: 1 }} />
            <div style={{ width: 12, height: 6, background: "#f72585", borderRadius: 1 }} />
            <div style={{ width: 8, height: 6, background: "#4361ee", borderRadius: 1 }} />
          </div>
          <p style={{ color: "#3a0ca3", fontSize: 10, letterSpacing: "0.4em",
            textTransform: "uppercase", marginBottom: 16, fontWeight: 600 }}>
            Program Curriculum
          </p>
          <h2 style={{ fontFamily: serif, fontSize: "clamp(1.8rem, 2.5vw, 2.4rem)",
            fontWeight: 700, color: "#3a0ca3", lineHeight: 1.2, marginBottom: 48,
            letterSpacing: "0.02em", maxWidth: 480 }}>
            Six Modules.<br />One Transformation.
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {modules.map((m, i) => (
              <div key={i} style={{
                display: "grid", gridTemplateColumns: "80px 1fr",
                gap: 40, padding: "32px 0",
                borderBottom: "1px solid rgba(58,12,163,0.08)",
                alignItems: "start",
              }}>
                <p style={{ color: "#f72585", fontFamily: serif,
                  fontSize: 32, fontWeight: 400, lineHeight: 1, opacity: 0.6 }}>{m.num}</p>
                <div>
                  <p style={{ color: "#3a0ca3", fontWeight: 700, fontSize: 16,
                    marginBottom: 8, letterSpacing: "0.02em" }}>{m.title}</p>
                  <p style={{ color: "#4c4c4c", fontSize: 14, lineHeight: 1.75 }}>
                    {m.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHO IT IS FOR */}
      <section style={{ background: "#f1f1f1", padding: "64px 3rem",
        borderTop: "1px solid rgba(58,12,163,0.1)" }}>
        <div style={{ maxWidth: 900, margin: "0 auto",
          display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64 }}>
          <div>
            <p style={{ color: "#3a0ca3", fontSize: 10, letterSpacing: "0.4em",
              textTransform: "uppercase", marginBottom: 16, fontWeight: 600 }}>
              Who This Is For
            </p>
            {[
              "Founders building their first or second company",
              "CEOs navigating rapid growth or transition",
              "Senior leaders preparing for executive roles",
              "Entrepreneurs who want faith and work integrated",
            ].map((item) => (
              <div key={item} style={{ display: "flex", gap: 12,
                alignItems: "flex-start", marginBottom: 14 }}>
                <span style={{ color: "#f72585", marginTop: 2, flexShrink: 0 }}>—</span>
                <p style={{ color: "#4c4c4c", fontSize: 15, lineHeight: 1.6 }}>
                  {item}
                </p>
              </div>
            ))}
          </div>
          <div>
            <p style={{ color: "#3a0ca3", fontSize: 10, letterSpacing: "0.4em",
              textTransform: "uppercase", marginBottom: 16, fontWeight: 600 }}>
              Program Format
            </p>
            {[
              "Cohort-based: small groups of 8–12 leaders",
              "6-month intensive engagement",
              "Monthly group sessions + 1:1 coaching calls",
              "In-person retreat (annual)",
              "Peer accountability partnerships",
            ].map((item) => (
              <div key={item} style={{ display: "flex", gap: 12,
                alignItems: "flex-start", marginBottom: 14 }}>
                <span style={{ color: "#f72585", marginTop: 2, flexShrink: 0 }}>—</span>
                <p style={{ color: "#4c4c4c", fontSize: 15, lineHeight: 1.6 }}>
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* APPLY */}
      <section id="apply" style={{ padding: "80px 3rem", textAlign: "center" }}>
        <div style={{ maxWidth: 520, margin: "0 auto" }}>
          <h2 style={{ fontFamily: serif, fontSize: "clamp(1.6rem, 2.5vw, 2.2rem)",
            color: "#f0eeff", fontWeight: 400, marginBottom: 16 }}>
            Apply for the Next Cohort
          </h2>
          <p style={{ color: "rgba(240,238,255,0.4)", fontSize: 15, lineHeight: 1.8, marginBottom: 36 }}>
            {/* TODO: Rogers to provide — dates, venue, price, schedule */}
            This is an application-based engagement. Complete the form below to begin.
            All communication is handled digitally. Rogers will review applications
            and respond via the platform &mdash; no phone calls at this stage.
          </p>
          <a href="mailto:info@rogersnforgwei.com?subject=CEO On Mission Application"
            style={{ display: "inline-block", background: pink, color: "#fff",
              padding: "15px 48px", borderRadius: 3, fontSize: 12, fontWeight: 700,
              textDecoration: "none", letterSpacing: "0.2em", textTransform: "uppercase" }}>
            Submit Application
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
        <RegisterButton program="ceo-on-mission" />
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
          © {new Date().getFullYear()} Rogers Nforgwei · CEO On Mission
        </p>
      </footer>
    </main>
  );
}
