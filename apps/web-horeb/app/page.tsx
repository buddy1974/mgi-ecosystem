import {
  HOREB_SERVICES,
  HOREB_STATS,
  HOREB_AGENCIES,
  HOREB_PARTNERS_RELAY,
  HOREB_PARTNERS_RETAIL,
  HOREB_WHY_US,
  HOREB_VISION_MISSION,
  HOREB_MGI_SECTION,
  HOREB_CONTACT,
} from "../data/horeb-content";

// ── Shared CTA button style ────────────────────────────────────
const ctaYellow: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: 8,
  background: "var(--horeb-yellow)",
  color: "var(--horeb-dark-green)",
  fontFamily: "'Montserrat', sans-serif",
  fontWeight: 800,
  fontSize: "clamp(0.85rem,2vw,0.95rem)",
  padding: "clamp(12px,3vw,16px) clamp(20px,5vw,32px)",
  borderRadius: 999,
  border: "none",
  cursor: "pointer",
  textDecoration: "none",
  minHeight: 44,
  letterSpacing: "0.01em",
};

// ── Shared section eyebrow label style ────────────────────────
function Label({ children, light = false }: { children: string; light?: boolean }) {
  return (
    <p
      style={{
        color: light ? "rgba(255,255,255,0.5)" : "var(--horeb-green)",
        fontSize: 11,
        fontWeight: 700,
        letterSpacing: "0.35em",
        textTransform: "uppercase",
        marginBottom: 16,
        fontFamily: "'Montserrat', sans-serif",
      }}
    >
      {children}
    </p>
  );
}

// ── Shared section padding ─────────────────────────────────────
const sectionPad: React.CSSProperties = {
  padding: "clamp(4rem,8vw,8rem) clamp(1rem,5vw,2rem)",
};

export default function HomePage() {
  return (
    <main style={{ overflowX: "hidden" }}>

      {/* ══ 1. HERO ═══════════════════════════════════════════════ */}
      <section
        id="accueil"
        style={{
          minHeight: "90vh",
          display: "flex",
          alignItems: "center",
          background: "linear-gradient(135deg, var(--horeb-dark-green) 0%, var(--horeb-green) 100%)",
          padding: "clamp(5rem,10vw,8rem) clamp(1rem,5vw,2rem)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Decorative yellow glow */}
        <div
          style={{
            position: "absolute",
            top: -120,
            right: -80,
            width: 500,
            height: 500,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(255,201,40,0.12) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />
        {/* Decorative arc */}
        <svg
          style={{ position: "absolute", bottom: 40, right: "8%", opacity: 0.08, pointerEvents: "none" }}
          width="260"
          height="100"
          viewBox="0 0 260 100"
        >
          <path d="M10,50 C40,10 80,90 120,50 C145,25 160,70 190,50 C210,35 225,62 245,50" stroke="#FFC928" strokeWidth="4" fill="none" strokeLinecap="round" />
          <path d="M20,72 C45,50 70,90 100,72 C118,60 130,82 155,72" stroke="#FFC928" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        </svg>

        <div style={{ maxWidth: 1280, margin: "0 auto", width: "100%", position: "relative" }}>
          <div style={{ maxWidth: 740 }}>
            {/* Eyebrow pill */}
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                background: "var(--horeb-yellow)",
                color: "var(--horeb-dark-green)",
                fontSize: 11,
                fontWeight: 700,
                padding: "6px 18px",
                borderRadius: 999,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                fontFamily: "'Montserrat', sans-serif",
                marginBottom: 28,
              }}
            >
              Votre Partenaire Éducatif National
            </span>

            <h1
              style={{
                color: "#ffffff",
                fontSize: "clamp(2.2rem,6vw,4.5rem)",
                fontWeight: 900,
                letterSpacing: "-0.03em",
                lineHeight: 1.08,
                marginBottom: 24,
                fontFamily: "'Roboto', sans-serif",
              }}
            >
              Vos manuels scolaires
              <br />
              <span style={{ color: "var(--horeb-yellow)" }}>partout au Cameroun</span>
            </h1>

            <p
              style={{
                color: "rgba(255,255,255,0.75)",
                fontSize: "clamp(1rem,2.5vw,1.15rem)",
                lineHeight: 1.7,
                marginBottom: 40,
                maxWidth: 560,
                fontFamily: "'Roboto', sans-serif",
              }}
            >
              Distribution fiable, rapide et nationale de manuels scolaires, fournitures et matériels didactiques.
            </p>

            {/* CTAs */}
            <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 64 }}>
              <a href="#contact" style={ctaYellow}>Passer une Commande →</a>
              <a
                href="#agences"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  background: "transparent",
                  border: "2px solid rgba(255,255,255,0.5)",
                  color: "#ffffff",
                  fontFamily: "'Montserrat', sans-serif",
                  fontWeight: 700,
                  fontSize: "clamp(0.85rem,2vw,0.95rem)",
                  padding: "clamp(10px,3vw,14px) clamp(20px,5vw,30px)",
                  borderRadius: 999,
                  cursor: "pointer",
                  textDecoration: "none",
                  minHeight: 44,
                }}
              >
                Nos Agences
              </a>
            </div>
          </div>

          {/* Stats strip */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
              gap: 1,
              borderTop: "1px solid rgba(255,255,255,0.12)",
              paddingTop: 32,
              maxWidth: 660,
            }}
          >
            {HOREB_STATS.map((stat) => (
              <div key={stat.label} style={{ textAlign: "center", padding: "0 12px" }}>
                <p
                  style={{
                    color: "var(--horeb-yellow)",
                    fontSize: "clamp(1.8rem,4vw,2.5rem)",
                    fontWeight: 900,
                    margin: 0,
                    fontFamily: "'Montserrat', sans-serif",
                    lineHeight: 1,
                  }}
                >
                  {stat.value}{stat.suffix}
                </p>
                <p
                  style={{
                    color: "rgba(255,255,255,0.55)",
                    fontSize: 10,
                    margin: "6px 0 0",
                    fontFamily: "'Roboto', sans-serif",
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                  }}
                >
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 2. SERVICES ════════════════════════════════════════════ */}
      <section id="services" style={{ ...sectionPad, background: "var(--horeb-off-white)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "clamp(2rem,5vw,4rem)" }}>
            <Label>NOS SERVICES</Label>
            <h2
              style={{
                color: "var(--horeb-text)",
                fontSize: "clamp(1.8rem,4vw,3rem)",
                fontWeight: 900,
                letterSpacing: "-0.03em",
                margin: 0,
                fontFamily: "'Roboto', sans-serif",
              }}
            >
              Tout le matériel pédagogique dont vous avez besoin
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 24 }}>
            {HOREB_SERVICES.map((service) => (
              <div
                key={service.id}
                style={{
                  background: "var(--horeb-white)",
                  borderRadius: 16,
                  overflow: "hidden",
                  boxShadow: "0 2px 16px rgba(0,0,0,0.06)",
                  border: "1px solid rgba(0,122,61,0.08)",
                }}
              >
                <div style={{ height: 4, background: "linear-gradient(90deg, var(--horeb-green), var(--horeb-yellow))" }} />
                <div style={{ padding: "clamp(1.5rem,4vw,2rem)" }}>
                  <div
                    style={{
                      width: 52,
                      height: 52,
                      borderRadius: "50%",
                      background: "rgba(0,122,61,0.08)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: 16,
                      fontSize: 24,
                    }}
                  >
                    {service.icon}
                  </div>
                  <h3 style={{ color: "var(--horeb-text)", fontWeight: 800, fontSize: 18, marginBottom: 10, fontFamily: "'Roboto', sans-serif" }}>
                    {service.title}
                  </h3>
                  <p style={{ color: "var(--horeb-text-muted)", fontSize: 14, lineHeight: 1.7, margin: 0, fontFamily: "'Roboto', sans-serif" }}>
                    {service.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 3. ABOUT ═══════════════════════════════════════════════ */}
      <section id="a-propos" style={{ ...sectionPad, background: "var(--horeb-white)" }}>
        <div
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "clamp(2rem,6vw,5rem)",
            alignItems: "center",
          }}
        >
          <div>
            <Label>QUI SOMMES-NOUS</Label>
            <h2
              style={{
                color: "var(--horeb-text)",
                fontSize: "clamp(1.8rem,4vw,2.8rem)",
                fontWeight: 900,
                letterSpacing: "-0.03em",
                lineHeight: 1.1,
                marginBottom: 24,
                fontFamily: "'Roboto', sans-serif",
              }}
            >
              Fiabilité en mouvement
            </h2>
            <p style={{ color: "var(--horeb-text-muted)", fontSize: 16, lineHeight: 1.85, marginBottom: 20, fontFamily: "'Roboto', sans-serif" }}>
              {HOREB_VISION_MISSION.mission}
            </p>
            <p style={{ color: "var(--horeb-text-muted)", fontSize: 15, lineHeight: 1.7, marginBottom: 32, fontFamily: "'Roboto', sans-serif" }}>
              Depuis plus de 26 ans, Horeb Solutions distribue les ressources éducatives sur l&apos;ensemble du territoire camerounais.
            </p>
            <div
              style={{
                padding: "1.25rem 1.5rem",
                background: "rgba(0,122,61,0.05)",
                borderRadius: 12,
                borderLeft: "4px solid var(--horeb-yellow)",
              }}
            >
              <p style={{ color: "var(--horeb-green)", fontWeight: 700, fontSize: 15, margin: "0 0 4px", fontStyle: "italic", fontFamily: "'Roboto', sans-serif" }}>
                &ldquo;Fiabilité en mouvement.&rdquo;
              </p>
              <p style={{ color: "var(--horeb-text-muted)", fontSize: 12, margin: 0, fontFamily: "'Roboto', sans-serif" }}>
                Horeb Solutions Sarl — Yaoundé, Cameroun
              </p>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            {[
              { icon: "⚡", title: "Fiabilité", desc: "Des opérations logistiques fiables sur tout le territoire camerounais" },
              { icon: "🎯", title: "Efficacité", desc: "Délais de livraison maîtrisés, commandes exécutées avec précision" },
              { icon: "🤝", title: "Partenariat", desc: "Votre succès est au cœur de toutes nos priorités" },
              { icon: "♻️", title: "Durabilité", desc: "Des solutions logistiques durables adaptées aux besoins éducatifs" },
            ].map((v) => (
              <div
                key={v.title}
                style={{
                  padding: "1.5rem",
                  background: "var(--horeb-off-white)",
                  borderRadius: 14,
                  border: "1px solid rgba(0,122,61,0.1)",
                }}
              >
                <span style={{ fontSize: 28, display: "block", marginBottom: 10 }}>{v.icon}</span>
                <p style={{ color: "var(--horeb-text)", fontWeight: 700, fontSize: 14, margin: "0 0 6px", fontFamily: "'Roboto', sans-serif" }}>{v.title}</p>
                <p style={{ color: "var(--horeb-text-muted)", fontSize: 12, margin: 0, lineHeight: 1.5, fontFamily: "'Roboto', sans-serif" }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 4. VISION & MISSION ════════════════════════════════════ */}
      <section style={{ ...sectionPad, background: "var(--horeb-off-white)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "clamp(2rem,5vw,4rem)" }}>
            <Label>VISION & MISSION</Label>
          </div>

          {/* Two cards */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24, marginBottom: 40 }}>
            <div
              style={{
                background: "var(--horeb-green)",
                borderRadius: 20,
                padding: "clamp(2rem,4vw,3rem)",
                color: "white",
              }}
            >
              <Label light>Notre Vision</Label>
              <p style={{ fontSize: "clamp(1rem,2.5vw,1.1rem)", lineHeight: 1.75, margin: 0, fontFamily: "'Roboto', sans-serif" }}>
                {HOREB_VISION_MISSION.vision}
              </p>
            </div>
            <div
              style={{
                background: "var(--horeb-white)",
                borderRadius: 20,
                padding: "clamp(2rem,4vw,3rem)",
                border: "2px solid var(--horeb-green)",
              }}
            >
              <Label>Notre Mission</Label>
              <p style={{ color: "var(--horeb-text)", fontSize: "clamp(1rem,2.5vw,1.1rem)", lineHeight: 1.75, margin: 0, fontFamily: "'Roboto', sans-serif" }}>
                {HOREB_VISION_MISSION.mission}
              </p>
            </div>
          </div>

          {/* Value pills */}
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
            {HOREB_VISION_MISSION.values.map((value) => (
              <div
                key={value.label}
                style={{
                  background: "var(--horeb-white)",
                  border: "2px solid var(--horeb-green)",
                  borderRadius: 999,
                  padding: "10px 24px",
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                <span style={{ color: "var(--horeb-green)", fontWeight: 800, fontSize: 14, fontFamily: "'Montserrat', sans-serif" }}>
                  {value.label}
                </span>
                <span style={{ color: "var(--horeb-text-muted)", fontSize: 12 }}>— {value.description}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 5. NATIONAL COVERAGE BANNER ═══════════════════════════ */}
      <section
        style={{
          padding: "clamp(3rem,6vw,5rem) clamp(1rem,5vw,2rem)",
          background: "var(--horeb-green)",
        }}
      >
        <div style={{ maxWidth: 1280, margin: "0 auto", textAlign: "center" }}>
          <h2
            style={{
              color: "var(--horeb-white)",
              fontSize: "clamp(1.6rem,4vw,2.5rem)",
              fontWeight: 900,
              letterSpacing: "-0.02em",
              marginBottom: 16,
              fontFamily: "'Roboto', sans-serif",
            }}
          >
            Un réseau qui couvre tout le Cameroun
          </h2>
          <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "clamp(0.9rem,2.5vw,1.05rem)", maxWidth: 620, margin: "0 auto 48px", fontFamily: "'Roboto', sans-serif", lineHeight: 1.65 }}>
            De Maroua à Kribi, de Bamenda à Bertoua — nos agences et partenaires relais vous servent partout.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 32, maxWidth: 700, margin: "0 auto" }}>
            {HOREB_STATS.map((stat) => (
              <div key={stat.label} style={{ textAlign: "center" }}>
                <p style={{ color: "var(--horeb-yellow)", fontSize: "clamp(2rem,5vw,3rem)", fontWeight: 900, margin: 0, fontFamily: "'Montserrat', sans-serif" }}>
                  {stat.value}{stat.suffix}
                </p>
                <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 12, margin: "8px 0 0", textTransform: "uppercase", letterSpacing: "0.06em", fontFamily: "'Roboto', sans-serif" }}>
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 6. AGENCIES ════════════════════════════════════════════ */}
      <section id="agences" style={{ ...sectionPad, background: "var(--horeb-white)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "clamp(2rem,5vw,4rem)" }}>
            <Label>NOS AGENCES</Label>
            <h2
              style={{
                color: "var(--horeb-text)",
                fontSize: "clamp(1.8rem,4vw,3rem)",
                fontWeight: 900,
                letterSpacing: "-0.03em",
                marginBottom: 12,
                fontFamily: "'Roboto', sans-serif",
              }}
            >
              6 agences directes à votre service
            </h2>
            <p style={{ color: "var(--horeb-text-muted)", fontSize: 16, maxWidth: 540, margin: "0 auto", fontFamily: "'Roboto', sans-serif" }}>
              Visitez l&apos;agence la plus proche de vous — disponibles pour commandes, retraits et renseignements.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
            {HOREB_AGENCIES.map((agency) => (
              <div
                key={agency.id}
                style={{
                  background: "var(--horeb-white)",
                  borderRadius: 16,
                  overflow: "hidden",
                  boxShadow: "0 2px 16px rgba(0,0,0,0.07)",
                  border: "1px solid rgba(0,122,61,0.1)",
                }}
              >
                <div style={{ height: 4, background: "var(--horeb-green)" }} />
                <div style={{ padding: "1.5rem" }}>
                  <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 12 }}>
                    <div>
                      <p style={{ color: "var(--horeb-text)", fontWeight: 800, fontSize: "clamp(1.1rem,2.5vw,1.25rem)", margin: "0 0 2px", fontFamily: "'Montserrat', sans-serif" }}>
                        {agency.city}
                      </p>
                      <p style={{ color: "var(--horeb-text-muted)", fontSize: 13, margin: 0, fontFamily: "'Roboto', sans-serif" }}>
                        {agency.zone}
                      </p>
                    </div>
                    <span
                      style={{
                        background: "rgba(0,122,61,0.1)",
                        color: "var(--horeb-green)",
                        fontSize: 11,
                        fontWeight: 700,
                        padding: "3px 10px",
                        borderRadius: 999,
                        letterSpacing: "0.05em",
                        fontFamily: "'Montserrat', sans-serif",
                        whiteSpace: "nowrap",
                        flexShrink: 0,
                        marginLeft: 8,
                      }}
                    >
                      {agency.region}
                    </span>
                  </div>
                  <p style={{ color: "var(--horeb-text-muted)", fontSize: 13, margin: "0 0 12px", fontFamily: "'Roboto', sans-serif" }}>
                    📍 {agency.address}
                  </p>
                  <a
                    href={`tel:${agency.phone.replace(/\s/g, "")}`}
                    style={{
                      color: "var(--horeb-green)",
                      fontWeight: 600,
                      fontSize: 14,
                      textDecoration: "none",
                      display: "block",
                      marginBottom: 12,
                      fontFamily: "'Roboto', sans-serif",
                    }}
                  >
                    📞 {agency.phone}
                  </a>
                  <a
                    href={`https://maps.google.com/?q=${encodeURIComponent(agency.address)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: "var(--horeb-text-muted)",
                      fontSize: 12,
                      textDecoration: "none",
                      fontFamily: "'Roboto', sans-serif",
                    }}
                  >
                    Obtenir l&apos;itinéraire →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 7. CAMEROON COVERAGE (city grid — no map library) ═════ */}
      <section style={{ ...sectionPad, background: "var(--horeb-off-white)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "clamp(2rem,5vw,4rem)" }}>
            <Label>PRÉSENCE NATIONALE</Label>
            <h2
              style={{
                color: "var(--horeb-text)",
                fontSize: "clamp(1.8rem,4vw,3rem)",
                fontWeight: 900,
                letterSpacing: "-0.03em",
                marginBottom: 12,
                fontFamily: "'Roboto', sans-serif",
              }}
            >
              Notre réseau sur toute l&apos;étendue du territoire
            </h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))", gap: 14, marginBottom: 32 }}>
            {[
              { region: "Centre",       cities: [{ name: "Yaoundé", type: "agence" as const, note: "2 agences" }, { name: "Mbalmayo", type: "relais" as const }] },
              { region: "Littoral",     cities: [{ name: "Douala",   type: "agence" as const, note: "2 agences" }] },
              { region: "Ouest",        cities: [{ name: "Bafoussam", type: "agence" as const }] },
              { region: "Nord",         cities: [{ name: "Garoua",   type: "agence" as const }] },
              { region: "Est",          cities: [{ name: "Bertoua",  type: "relais" as const }] },
              { region: "Sud",          cities: [{ name: "Ebolowa",  type: "relais" as const }, { name: "Kribi", type: "relais" as const }] },
              { region: "Adamaoua",     cities: [{ name: "Ngaoundéré", type: "relais" as const }] },
              { region: "Nord-Ouest",   cities: [{ name: "Bamenda",  type: "relais" as const }] },
              { region: "Sud-Ouest",    cities: [{ name: "Buea",    type: "relais" as const }, { name: "Limbe", type: "relais" as const }, { name: "Kumba", type: "relais" as const }] },
              { region: "Extrême-Nord", cities: [{ name: "Maroua",  type: "relais" as const }] },
            ].map((r) => (
              <div
                key={r.region}
                style={{
                  background: "var(--horeb-white)",
                  borderRadius: 14,
                  padding: "1.25rem",
                  border: "1px solid rgba(0,122,61,0.12)",
                }}
              >
                <p
                  style={{
                    color: "var(--horeb-green)",
                    fontWeight: 700,
                    fontSize: 10,
                    textTransform: "uppercase",
                    letterSpacing: "0.12em",
                    margin: "0 0 10px",
                    fontFamily: "'Montserrat', sans-serif",
                  }}
                >
                  Région {r.region}
                </p>
                {r.cities.map((c) => (
                  <div key={c.name} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                    <span style={{ fontSize: 11 }}>{c.type === "agence" ? "🟢" : "🔵"}</span>
                    <span style={{ color: "var(--horeb-text)", fontWeight: 600, fontSize: 13, fontFamily: "'Roboto', sans-serif" }}>
                      {c.name}
                    </span>
                    {"note" in c && c.note && (
                      <span style={{ color: "var(--horeb-text-muted)", fontSize: 11 }}>({c.note})</span>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>

          {/* Legend */}
          <div style={{ display: "flex", gap: 28, justifyContent: "center", flexWrap: "wrap" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span>🟢</span>
              <span style={{ color: "var(--horeb-text-muted)", fontSize: 13, fontFamily: "'Roboto', sans-serif" }}>Agence directe Horeb</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span>🔵</span>
              <span style={{ color: "var(--horeb-text-muted)", fontSize: 13, fontFamily: "'Roboto', sans-serif" }}>Partenaire relais agréé</span>
            </div>
          </div>
        </div>
      </section>

      {/* ══ 8. PARTNERS RELAY ═════════════════════════════════════ */}
      <section id="partenaires" style={{ ...sectionPad, background: "var(--horeb-white)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "clamp(2rem,5vw,3.5rem)" }}>
            <Label>PARTENAIRES RELAIS</Label>
            <h2
              style={{
                color: "var(--horeb-text)",
                fontSize: "clamp(1.8rem,4vw,3rem)",
                fontWeight: 900,
                letterSpacing: "-0.03em",
                marginBottom: 12,
                fontFamily: "'Roboto', sans-serif",
              }}
            >
              10+ partenaires agréés sur tout le territoire
            </h2>
            <p style={{ color: "var(--horeb-text-muted)", fontSize: 15, maxWidth: 540, margin: "0 auto", fontFamily: "'Roboto', sans-serif", lineHeight: 1.65 }}>
              Nos partenaires relais sont des distributeurs agréés qui étendent notre réseau dans les villes secondaires.
            </p>
          </div>

          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
            {HOREB_PARTNERS_RELAY.map((partner) => (
              <div
                key={partner.city}
                style={{
                  border: "2px solid var(--horeb-green)",
                  borderRadius: 12,
                  padding: "12px 22px",
                  textAlign: "center",
                  minWidth: 130,
                }}
              >
                <p style={{ color: "var(--horeb-text)", fontWeight: 700, fontSize: 15, margin: "0 0 4px", fontFamily: "'Roboto', sans-serif" }}>
                  {partner.city}
                </p>
                <p style={{ color: "var(--horeb-green)", fontSize: 10, margin: 0, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", fontFamily: "'Montserrat', sans-serif" }}>
                  {partner.region}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 9. PARTNERS RETAIL ════════════════════════════════════ */}
      <section style={{ ...sectionPad, background: "var(--horeb-off-white)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "clamp(2rem,5vw,4rem)" }}>
            <Label>POINTS DE VENTE PARTENAIRES</Label>
            <h2
              style={{
                color: "var(--horeb-text)",
                fontSize: "clamp(1.8rem,4vw,3rem)",
                fontWeight: 900,
                letterSpacing: "-0.03em",
                marginBottom: 12,
                fontFamily: "'Roboto', sans-serif",
              }}
            >
              Trouvez nos produits près de chez vous
            </h2>
            <p style={{ color: "var(--horeb-text-muted)", fontSize: 15, maxWidth: 540, margin: "0 auto", fontFamily: "'Roboto', sans-serif" }}>
              Disponibles dans les librairies et établissements partenaires.
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 20 }}>
            {HOREB_PARTNERS_RETAIL.map((partner) => (
              <div
                key={partner.name}
                style={{
                  background: "var(--horeb-white)",
                  borderRadius: 14,
                  padding: "1.5rem",
                  border: "1px solid rgba(0,122,61,0.1)",
                  boxShadow: "0 1px 8px rgba(0,0,0,0.04)",
                }}
              >
                {/* TODO: Replace with verified partner name from Horeb management */}
                <p style={{ color: "var(--horeb-text)", fontWeight: 700, fontSize: 16, margin: "0 0 6px", fontFamily: "'Roboto', sans-serif" }}>
                  {partner.name}
                </p>
                <p style={{ color: "var(--horeb-text-muted)", fontSize: 13, margin: "0 0 14px", fontFamily: "'Roboto', sans-serif" }}>
                  📍 {partner.city}
                </p>
                <span
                  style={{
                    background: "rgba(0,122,61,0.08)",
                    color: "var(--horeb-green)",
                    fontSize: 11,
                    fontWeight: 700,
                    padding: "3px 10px",
                    borderRadius: 999,
                    fontFamily: "'Montserrat', sans-serif",
                  }}
                >
                  {partner.type}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 10. WHY CHOOSE US ═════════════════════════════════════ */}
      <section style={{ ...sectionPad, background: "var(--horeb-white)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "clamp(2rem,5vw,4rem)" }}>
            <Label>POURQUOI NOUS CHOISIR</Label>
            <h2
              style={{
                color: "var(--horeb-text)",
                fontSize: "clamp(1.8rem,4vw,3rem)",
                fontWeight: 900,
                letterSpacing: "-0.03em",
                fontFamily: "'Roboto', sans-serif",
              }}
            >
              La distribution scolaire, c&apos;est notre métier
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
            {HOREB_WHY_US.map((item) => (
              <div
                key={item.title}
                style={{
                  background: "var(--horeb-off-white)",
                  borderRadius: 16,
                  padding: "1.75rem",
                  border: "1px solid rgba(0,122,61,0.08)",
                }}
              >
                <span style={{ fontSize: 32, display: "block", marginBottom: 16 }}>{item.icon}</span>
                <h3 style={{ color: "var(--horeb-text)", fontWeight: 700, fontSize: 17, marginBottom: 10, fontFamily: "'Roboto', sans-serif" }}>
                  {item.title}
                </h3>
                <p style={{ color: "var(--horeb-text-muted)", fontSize: 14, lineHeight: 1.65, margin: 0, fontFamily: "'Roboto', sans-serif" }}>
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 11. GALLERY ═══════════════════════════════════════════ */}
      <section style={{ ...sectionPad, background: "var(--horeb-off-white)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "clamp(2rem,5vw,4rem)" }}>
            <Label>GALERIE</Label>
            <h2
              style={{
                color: "var(--horeb-text)",
                fontSize: "clamp(1.8rem,4vw,3rem)",
                fontWeight: 900,
                letterSpacing: "-0.03em",
                fontFamily: "'Roboto', sans-serif",
              }}
            >
              Horeb Solutions en action
            </h2>
          </div>

          {/* TODO: Replace placeholders with real photos from Horeb management */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 16 }}>
            {["Distribution nationale", "Livraison en régions", "Agence Yaoundé", "Notre équipe"].map((label) => (
              <div
                key={label}
                style={{
                  background: "linear-gradient(135deg, var(--horeb-green), var(--horeb-dark-green))",
                  borderRadius: 16,
                  height: 220,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 12,
                }}
              >
                <span style={{ fontSize: 36 }}>📸</span>
                <p style={{ color: "rgba(255,255,255,0.75)", fontSize: 14, margin: 0, fontFamily: "'Roboto', sans-serif", fontWeight: 500 }}>
                  {label}
                </p>
                <p style={{ color: "rgba(255,255,255,0.35)", fontSize: 11, margin: 0, fontStyle: "italic" }}>
                  Photo à venir
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 12. MGI GROUP ═════════════════════════════════════════ */}
      <section
        style={{
          padding: "clamp(4rem,8vw,6rem) clamp(1rem,5vw,2rem)",
          background: "var(--horeb-dark-green)",
        }}
      >
        <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center" }}>
          <p
            style={{
              color: "rgba(255,255,255,0.35)",
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.35em",
              textTransform: "uppercase",
              marginBottom: 16,
              fontFamily: "'Montserrat', sans-serif",
            }}
          >
            {HOREB_MGI_SECTION.groupName}
          </p>
          <h2
            style={{
              color: "var(--horeb-white)",
              fontSize: "clamp(1.6rem,4vw,2.5rem)",
              fontWeight: 900,
              letterSpacing: "-0.02em",
              marginBottom: 20,
              fontFamily: "'Roboto', sans-serif",
            }}
          >
            {HOREB_MGI_SECTION.tagline}
          </h2>
          <p
            style={{
              color: "rgba(255,255,255,0.6)",
              fontSize: "clamp(0.95rem,2vw,1.05rem)",
              lineHeight: 1.75,
              maxWidth: 560,
              margin: "0 auto 36px",
              fontFamily: "'Roboto', sans-serif",
            }}
          >
            {HOREB_MGI_SECTION.description}
          </p>
          <a
            href={HOREB_MGI_SECTION.ctaUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: "transparent",
              border: "2px solid var(--horeb-yellow)",
              color: "var(--horeb-yellow)",
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 700,
              fontSize: 14,
              padding: "12px 28px",
              borderRadius: 999,
              textDecoration: "none",
              minHeight: 44,
            }}
          >
            {HOREB_MGI_SECTION.ctaLabel} →
          </a>
        </div>
      </section>

      {/* ══ 13. CONTACT ═══════════════════════════════════════════ */}
      <section id="contact" style={{ ...sectionPad, background: "var(--horeb-white)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "clamp(2rem,5vw,4rem)" }}>
            <Label>CONTACT</Label>
            <h2
              style={{
                color: "var(--horeb-text)",
                fontSize: "clamp(1.8rem,4vw,3rem)",
                fontWeight: 900,
                letterSpacing: "-0.03em",
                fontFamily: "'Roboto', sans-serif",
              }}
            >
              Passez votre commande ou posez vos questions
            </h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "clamp(2rem,5vw,4rem)" }}>

            {/* Contact info */}
            <div>
              <h3 style={{ color: "var(--horeb-text)", fontWeight: 700, fontSize: 20, marginBottom: 24, fontFamily: "'Roboto', sans-serif" }}>
                Nos coordonnées
              </h3>
              {[
                { icon: "📍", text: HOREB_CONTACT.address },
                { icon: "📮", text: HOREB_CONTACT.bp },
                { icon: "📞", text: HOREB_CONTACT.phone, href: `tel:${HOREB_CONTACT.phone.replace(/\s/g, "")}` },
                { icon: "📧", text: HOREB_CONTACT.email, href: `mailto:${HOREB_CONTACT.email}` },
                { icon: "💬", text: `WhatsApp: ${HOREB_CONTACT.whatsapp}`, href: `https://wa.me/${HOREB_CONTACT.whatsapp.replace(/[^\d]/g, "")}` },
              ].map((item) => (
                <div key={item.text} style={{ display: "flex", gap: 12, alignItems: "flex-start", marginBottom: 16 }}>
                  <span style={{ fontSize: 20, flexShrink: 0 }}>{item.icon}</span>
                  {"href" in item ? (
                    <a
                      href={item.href}
                      style={{
                        color: "var(--horeb-green)",
                        fontSize: 15,
                        textDecoration: "none",
                        fontWeight: 500,
                        fontFamily: "'Roboto', sans-serif",
                        lineHeight: 1.5,
                      }}
                    >
                      {item.text}
                    </a>
                  ) : (
                    <span style={{ color: "var(--horeb-text-muted)", fontSize: 15, fontFamily: "'Roboto', sans-serif", lineHeight: 1.5 }}>
                      {item.text}
                    </span>
                  )}
                </div>
              ))}
            </div>

            {/* Contact form — TODO: wire to n8n webhook for production */}
            <form
              action={`mailto:${HOREB_CONTACT.email}`}
              method="post"
              encType="text/plain"
              style={{ display: "flex", flexDirection: "column", gap: 16 }}
            >
              <h3 style={{ color: "var(--horeb-text)", fontWeight: 700, fontSize: 20, margin: "0 0 8px", fontFamily: "'Roboto', sans-serif" }}>
                Envoyez-nous un message
              </h3>
              <input
                type="text"
                name="nom"
                placeholder="Votre nom"
                required
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  border: "1px solid rgba(0,122,61,0.25)",
                  borderRadius: 10,
                  fontSize: 15,
                  fontFamily: "'Roboto', sans-serif",
                  outline: "none",
                  color: "var(--horeb-text)",
                  background: "var(--horeb-off-white)",
                }}
              />
              <input
                type="text"
                name="contact"
                placeholder="Email ou numéro de téléphone"
                required
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  border: "1px solid rgba(0,122,61,0.25)",
                  borderRadius: 10,
                  fontSize: 15,
                  fontFamily: "'Roboto', sans-serif",
                  outline: "none",
                  color: "var(--horeb-text)",
                  background: "var(--horeb-off-white)",
                }}
              />
              <textarea
                name="message"
                placeholder="Votre message ou commande"
                rows={5}
                required
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  border: "1px solid rgba(0,122,61,0.25)",
                  borderRadius: 10,
                  fontSize: 15,
                  fontFamily: "'Roboto', sans-serif",
                  outline: "none",
                  color: "var(--horeb-text)",
                  background: "var(--horeb-off-white)",
                  resize: "vertical",
                }}
              />
              <button
                type="submit"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                  background: "var(--horeb-yellow)",
                  color: "var(--horeb-dark-green)",
                  fontFamily: "'Montserrat', sans-serif",
                  fontWeight: 800,
                  fontSize: 15,
                  padding: "14px 32px",
                  borderRadius: 999,
                  border: "none",
                  cursor: "pointer",
                  minHeight: 44,
                }}
              >
                Envoyer le message →
              </button>
            </form>
          </div>
        </div>
      </section>

    </main>
  );
}
