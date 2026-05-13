export default function HomePage() {
  const heading = "'Anton', Impact, Arial Black, sans-serif";
  const body = "'Nunito', 'Century Gothic', Arial, sans-serif";

  const programs = [
    {
      title: "Community Development",
      desc: "Empowering local communities with tools, training, and resources to build sustainable futures.",
      icon: "🏘",
    },
    {
      title: "Family Support",
      desc: "Providing essential support to vulnerable families — food security, shelter, and access to education.",
      icon: "👨‍👩‍👧‍👦",
    },
    {
      title: "Youth Empowerment",
      desc: "Equipping the next generation with skills, mentorship, and opportunities to thrive.",
      icon: "🌱",
    },
    {
      title: "Health & Dignity",
      desc: "Restoring dignity through healthcare access, hygiene programs, and community wellness initiatives.",
      icon: "❤️",
    },
  ];

  const stats = [
    { value: "5,000+", label: "Families Reached" },
    { value: "12+",    label: "Communities Served" },
    { value: "3",      label: "Countries Active" },
    { value: "2019",   label: "Founded" },
  ];

  return (
    <main style={{ minHeight: "100vh", fontFamily: body, background: "#FFFFFF" }}>

      {/* ── NAV ── */}
      <nav style={{
        position: "sticky", top: 0, zIndex: 100,
        background: "#023F78",
        padding: "0 3rem",
        height: 68,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        boxShadow: "0 2px 20px rgba(2,63,120,0.3)",
      }}>
        <div>
          <p style={{
            color: "#FFFFFF", fontFamily: heading,
            fontSize: 22, letterSpacing: "0.04em",
            margin: 0, lineHeight: 1,
          }}>
            DRIMP FOUNDATION
          </p>
          <p style={{
            color: "rgba(255,255,255,0.55)", fontFamily: body,
            fontSize: 9, letterSpacing: "0.25em", textTransform: "uppercase",
            margin: "2px 0 0",
          }}>
            Transforming Communities
          </p>
        </div>

        <div style={{ display: "flex", gap: 32, alignItems: "center" }}>
          {["About", "Programs", "Impact", "Contact"].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} style={{
              color: "rgba(255,255,255,0.8)", fontSize: 14, fontWeight: 600,
              textDecoration: "none", fontFamily: body,
              letterSpacing: "0.03em",
            }}>
              {item}
            </a>
          ))}
          <a href="https://mgi-ventures.com" target="_blank" rel="noopener noreferrer" style={{
            color: "rgba(252,157,2,0.8)", fontSize: 11, fontWeight: 600,
            textDecoration: "none", fontFamily: body,
            letterSpacing: "0.15em", textTransform: "uppercase",
          }}>
            MGI →
          </a>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section style={{
        background: "linear-gradient(135deg, #023F78 0%, #012d5a 60%, #01234a 100%)",
        padding: "100px 3rem",
        position: "relative", overflow: "hidden",
        minHeight: 520,
        display: "flex", alignItems: "center",
      }}>
        {/* Orange accent circle — brand element */}
        <div style={{
          position: "absolute", top: -120, right: -80,
          width: 500, height: 500, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(252,157,2,0.12) 0%, transparent 65%)",
          pointerEvents: "none",
        }} />
        <div style={{
          position: "absolute", bottom: -60, left: -60,
          width: 300, height: 300, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(252,157,2,0.06) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />

        <div style={{ maxWidth: 1200, margin: "0 auto", width: "100%", position: "relative", zIndex: 5 }}>
          {/* Orange accent bar */}
          <div style={{
            width: 60, height: 4, background: "#FC9D02",
            borderRadius: 2, marginBottom: 32,
          }} />

          <h1 style={{
            color: "#FFFFFF", fontFamily: heading,
            fontSize: "clamp(3rem, 6vw, 5.5rem)",
            lineHeight: 1.05, letterSpacing: "0.02em",
            marginBottom: 8, textTransform: "uppercase",
          }}>
            Transforming
          </h1>
          <h1 style={{
            color: "#FC9D02", fontFamily: heading,
            fontSize: "clamp(3rem, 6vw, 5.5rem)",
            lineHeight: 1.05, letterSpacing: "0.02em",
            marginBottom: 8, textTransform: "uppercase",
          }}>
            Communities.
          </h1>
          <h1 style={{
            color: "rgba(255,255,255,0.85)", fontFamily: heading,
            fontSize: "clamp(3rem, 6vw, 5.5rem)",
            lineHeight: 1.05, letterSpacing: "0.02em",
            marginBottom: 40, textTransform: "uppercase",
          }}>
            Restoring Dignity.
          </h1>

          <p style={{
            color: "rgba(255,255,255,0.7)", fontSize: "clamp(16px, 2vw, 20px)",
            lineHeight: 1.75, maxWidth: 580, marginBottom: 48,
            fontFamily: body, fontWeight: 400,
          }}>
            Drimp Foundation is committed to uplifting vulnerable families and communities
            through sustainable social impact programs across Africa.
          </p>

          <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
            <a href="#programs" style={{
              background: "#FC9D02", color: "#0f1e33",
              padding: "16px 40px", borderRadius: 4,
              fontSize: 14, fontWeight: 700, textDecoration: "none",
              fontFamily: body, letterSpacing: "0.08em", textTransform: "uppercase",
            }}>
              Our Programs
            </a>
            <a href="#about" style={{
              background: "transparent",
              border: "2px solid rgba(255,255,255,0.3)",
              color: "rgba(255,255,255,0.85)",
              padding: "16px 40px", borderRadius: 4,
              fontSize: 14, fontWeight: 600, textDecoration: "none",
              fontFamily: body, letterSpacing: "0.08em", textTransform: "uppercase",
            }}>
              Learn More
            </a>
          </div>
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <section style={{
        background: "#FC9D02",
        padding: "32px 3rem",
      }}>
        <div style={{
          maxWidth: 1200, margin: "0 auto",
          display: "grid", gridTemplateColumns: "repeat(4, 1fr)",
          gap: 24, textAlign: "center",
        }}>
          {stats.map((stat) => (
            <div key={stat.label}>
              <p style={{
                color: "#023F78", fontFamily: heading,
                fontSize: "clamp(2rem, 4vw, 3rem)", lineHeight: 1,
                margin: "0 0 4px", textTransform: "uppercase",
              }}>
                {stat.value}
              </p>
              <p style={{
                color: "rgba(2,63,120,0.75)", fontFamily: body,
                fontSize: 12, fontWeight: 700, margin: 0,
                letterSpacing: "0.15em", textTransform: "uppercase",
              }}>
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" style={{
        background: "#f7f9fc",
        padding: "96px 3rem",
      }}>
        <div style={{
          maxWidth: 1200, margin: "0 auto",
          display: "grid", gridTemplateColumns: "1fr 1fr",
          gap: 80, alignItems: "center",
        }}>
          <div>
            {/* Orange accent bar */}
            <div style={{
              width: 48, height: 4, background: "#FC9D02",
              borderRadius: 2, marginBottom: 24,
            }} />
            <h2 style={{
              color: "#023F78", fontFamily: heading,
              fontSize: "clamp(2rem, 3.5vw, 3rem)",
              textTransform: "uppercase", letterSpacing: "0.03em",
              marginBottom: 24, lineHeight: 1.1,
            }}>
              Who We Are
            </h2>
            <p style={{
              color: "#4a5a6e", fontSize: 17, lineHeight: 1.85,
              marginBottom: 20, fontFamily: body, fontWeight: 400,
            }}>
              Drimp Foundation is a humanitarian organization dedicated to transforming
              lives by addressing the root causes of poverty and social inequality.
              We believe every family deserves dignity, opportunity, and a path forward.
            </p>
            <p style={{
              color: "#4a5a6e", fontSize: 17, lineHeight: 1.85,
              marginBottom: 32, fontFamily: body, fontWeight: 400,
            }}>
              Through community-driven programs, we work directly with families and
              local leaders to create lasting change — not charity, but sustainable
              transformation that empowers communities to rise on their own terms.
            </p>
            <a href="mailto:info@drimpfoundation.org" style={{
              display: "inline-block",
              background: "#023F78", color: "#FFFFFF",
              padding: "14px 32px", borderRadius: 4,
              fontSize: 13, fontWeight: 700, textDecoration: "none",
              fontFamily: body, letterSpacing: "0.1em", textTransform: "uppercase",
            }}>
              Partner With Us
            </a>
          </div>

          {/* Visual — orange/navy composition */}
          <div style={{
            background: "#023F78",
            borderRadius: 8,
            padding: "60px 48px",
            position: "relative", overflow: "hidden",
          }}>
            <div style={{
              position: "absolute", top: -40, right: -40,
              width: 200, height: 200, borderRadius: "50%",
              background: "rgba(252,157,2,0.15)",
              pointerEvents: "none",
            }} />
            <h3 style={{
              color: "#FC9D02", fontFamily: heading,
              fontSize: 28, textTransform: "uppercase",
              letterSpacing: "0.04em", marginBottom: 32,
            }}>
              Our Mission
            </h3>
            <p style={{
              color: "rgba(255,255,255,0.85)",
              fontFamily: body, fontSize: 17, lineHeight: 1.85,
              fontStyle: "italic", fontWeight: 300,
            }}>
              &ldquo;To restore dignity and transform communities by empowering families
              with sustainable resources, education, and support — building a stronger
              Africa from the ground up.&rdquo;
            </p>
            <div style={{
              width: 40, height: 3, background: "#FC9D02",
              borderRadius: 2, marginTop: 32,
            }} />
          </div>
        </div>
      </section>

      {/* ── PROGRAMS ── */}
      <section id="programs" style={{
        background: "#FFFFFF",
        padding: "96px 3rem",
      }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ marginBottom: 56, textAlign: "center" }}>
            <div style={{
              width: 48, height: 4, background: "#FC9D02",
              borderRadius: 2, margin: "0 auto 24px",
            }} />
            <h2 style={{
              color: "#023F78", fontFamily: heading,
              fontSize: "clamp(2rem, 3.5vw, 3rem)",
              textTransform: "uppercase", letterSpacing: "0.03em",
              marginBottom: 16, lineHeight: 1.1,
            }}>
              Our Programs
            </h2>
            <p style={{
              color: "#4a5a6e", fontSize: 17, maxWidth: 580, margin: "0 auto",
              fontFamily: body, lineHeight: 1.75, fontWeight: 400,
            }}>
              Purpose-built initiatives designed to create measurable, lasting change
              in every community we serve.
            </p>
          </div>

          <div style={{
            display: "grid", gridTemplateColumns: "repeat(2, 1fr)",
            gap: 24,
          }}>
            {programs.map((program) => (
              <div key={program.title} style={{
                background: "#f7f9fc",
                border: "1px solid #e8f0f9",
                borderLeft: "4px solid #023F78",
                borderRadius: 8,
                padding: "36px 32px",
              }}>
                <div style={{ fontSize: 36, marginBottom: 16 }}>{program.icon}</div>
                <h3 style={{
                  color: "#023F78", fontFamily: heading,
                  fontSize: 22, textTransform: "uppercase",
                  letterSpacing: "0.04em", marginBottom: 12,
                }}>
                  {program.title}
                </h3>
                <p style={{
                  color: "#4a5a6e", fontFamily: body,
                  fontSize: 15, lineHeight: 1.8, margin: 0, fontWeight: 400,
                }}>
                  {program.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── IMPACT STRIP ── */}
      <section id="impact" style={{
        background: "#023F78",
        padding: "80px 3rem",
        textAlign: "center",
      }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <div style={{
            width: 48, height: 4, background: "#FC9D02",
            borderRadius: 2, margin: "0 auto 32px",
          }} />
          <h2 style={{
            color: "#FFFFFF", fontFamily: heading,
            fontSize: "clamp(2rem, 3.5vw, 3rem)",
            textTransform: "uppercase", letterSpacing: "0.03em",
            marginBottom: 24, lineHeight: 1.1,
          }}>
            The Change We Create
          </h2>
          <p style={{
            color: "rgba(255,255,255,0.75)", fontFamily: body,
            fontSize: 18, lineHeight: 1.85, marginBottom: 48, fontWeight: 300,
          }}>
            Every program is designed for measurable, lasting impact. We track outcomes,
            listen to communities, and adapt continuously — because true transformation
            requires more than good intentions.
          </p>
          <a href="mailto:info@drimpfoundation.org" style={{
            display: "inline-block",
            background: "#FC9D02", color: "#0f1e33",
            padding: "16px 48px", borderRadius: 4,
            fontSize: 14, fontWeight: 700, textDecoration: "none",
            fontFamily: body, letterSpacing: "0.1em", textTransform: "uppercase",
          }}>
            Support Our Work
          </a>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" style={{
        background: "#f7f9fc",
        padding: "96px 3rem",
      }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ marginBottom: 56 }}>
            <div style={{
              width: 48, height: 4, background: "#FC9D02",
              borderRadius: 2, marginBottom: 24,
            }} />
            <h2 style={{
              color: "#023F78", fontFamily: heading,
              fontSize: "clamp(2rem, 3.5vw, 3rem)",
              textTransform: "uppercase", letterSpacing: "0.03em",
              marginBottom: 16, lineHeight: 1.1,
            }}>
              Get In Touch
            </h2>
            <p style={{
              color: "#4a5a6e", fontFamily: body, fontSize: 17, lineHeight: 1.75,
              maxWidth: 560, fontWeight: 400,
            }}>
              Whether you want to partner with us, support our programs, or learn more
              about our work — we&apos;d love to hear from you.
            </p>
          </div>

          <div style={{
            display: "grid", gridTemplateColumns: "repeat(3, 1fr)",
            gap: 24,
          }}>
            {[
              { label: "Email", value: "info@drimpfoundation.org", href: "mailto:info@drimpfoundation.org" },
              { label: "Website", value: "drimpfoundation.org", href: "https://www.drimpfoundation.org" },
              { label: "Ecosystem", value: "mgi-ventures.com", href: "https://mgi-ventures.com" },
            ].map((item) => (
              <a key={item.label} href={item.href} style={{
                display: "block", textDecoration: "none",
                background: "#FFFFFF",
                border: "1px solid #e8f0f9",
                borderTop: "3px solid #FC9D02",
                borderRadius: 8, padding: "32px 28px",
              }}>
                <p style={{
                  color: "#FC9D02", fontFamily: body,
                  fontSize: 10, fontWeight: 700,
                  letterSpacing: "0.25em", textTransform: "uppercase",
                  margin: "0 0 8px",
                }}>
                  {item.label}
                </p>
                <p style={{
                  color: "#023F78", fontFamily: body,
                  fontSize: 15, fontWeight: 600,
                  margin: 0, wordBreak: "break-word",
                }}>
                  {item.value}
                </p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{
        background: "#012d5a",
        padding: "40px 3rem",
      }}>
        <div style={{
          maxWidth: 1200, margin: "0 auto",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          flexWrap: "wrap", gap: 16,
        }}>
          <div>
            <p style={{
              color: "#FFFFFF", fontFamily: heading,
              fontSize: 18, letterSpacing: "0.04em",
              margin: "0 0 4px", textTransform: "uppercase",
            }}>
              DRIMP FOUNDATION
            </p>
            <p style={{
              color: "rgba(255,255,255,0.4)", fontFamily: body,
              fontSize: 11, letterSpacing: "0.15em",
              textTransform: "uppercase", margin: 0,
            }}>
              Transforming Communities · Restoring Dignity
            </p>
          </div>

          <div style={{ display: "flex", gap: 32 }}>
            <a href="https://mgi-ventures.com" target="_blank" rel="noopener noreferrer" style={{
              color: "rgba(252,157,2,0.6)", fontSize: 11,
              textDecoration: "none", fontFamily: body,
              letterSpacing: "0.15em", textTransform: "uppercase",
              fontWeight: 600,
            }}>
              An MGI Ventures Enterprise →
            </a>
          </div>
        </div>

        <div style={{
          maxWidth: 1200, margin: "24px auto 0",
          borderTop: "1px solid rgba(255,255,255,0.08)",
          paddingTop: 20,
          display: "flex", justifyContent: "space-between",
          flexWrap: "wrap", gap: 8,
        }}>
          <p style={{
            color: "rgba(255,255,255,0.25)", fontSize: 11,
            margin: 0, fontFamily: body,
            letterSpacing: "0.1em", textTransform: "uppercase",
          }}>
            © {new Date().getFullYear()} Drimp Foundation · All rights reserved
          </p>
          <p style={{
            color: "rgba(255,255,255,0.25)", fontSize: 11,
            margin: 0, fontFamily: body,
            letterSpacing: "0.1em", textTransform: "uppercase",
          }}>
            Mina-Galeed Invest (MGI) Ltd
          </p>
        </div>
      </footer>
    </main>
  );
}
