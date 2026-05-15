import Image from "next/image";
import {
  HOREB_SERVICES,
  HOREB_STATS,
  HOREB_AGENCIES,
  HOREB_PARTNERS_RELAY,
  HOREB_PARTNERS_RETAIL,
  HOREB_VISION_MISSION,
  HOREB_MGI,
  HOREB_CONTACT,
} from "../data/horeb-content";

// ── Agency region grouping for section display ─────────────────
const REGION_GROUPS = [
  { label: "Au Centre", key: "Centre" },
  { label: "Au Littoral", key: "Littoral" },
  { label: "À l'Ouest", key: "Ouest" },
  { label: "Au Nord", key: "Nord" },
];

// ── Shared yellow CTA style ────────────────────────────────────
const ctaYellow: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: 8,
  background: "var(--horeb-yellow)",
  color: "var(--horeb-deep-green)",
  fontFamily: "'Montserrat', sans-serif",
  fontWeight: 700,
  fontSize: "clamp(0.85rem,2vw,0.95rem)",
  padding: "clamp(12px,3vw,15px) clamp(20px,5vw,30px)",
  borderRadius: 999,
  textDecoration: "none",
  minHeight: 44,
  letterSpacing: "0.01em",
  whiteSpace: "nowrap" as const,
};

const sectionPad: React.CSSProperties = {
  padding: "clamp(3.5rem,7vw,7rem) clamp(1rem,5vw,2rem)",
};

export default function HomePage() {
  return (
    <main style={{ overflowX: "hidden" }}>

      {/* ══ 1. HERO ════════════════════════════════════════════════ */}
      <section
        id="accueil"
        style={{
          background: "linear-gradient(135deg, var(--horeb-dark-green) 0%, var(--horeb-green) 100%)",
          minHeight: "88vh",
          display: "flex",
          alignItems: "center",
          padding: "clamp(4rem,8vw,6rem) clamp(1rem,5vw,2rem)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div style={{ maxWidth: 1280, margin: "0 auto", width: "100%", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(2rem,5vw,4rem)", alignItems: "center" }} className="hero-grid">
          {/* Left — text */}
          <div style={{ position: "relative", zIndex: 2 }}>
            <h1
              style={{
                color: "var(--horeb-white)",
                fontSize: "clamp(1.9rem,5vw,3.6rem)",
                fontWeight: 900,
                letterSpacing: "-0.03em",
                lineHeight: 1.08,
                marginBottom: 20,
                fontFamily: "'Montserrat', sans-serif",
              }}
            >
              Vos manuels scolaires,{" "}
              <span style={{ color: "var(--horeb-yellow)" }}>fournitures et matériels didactiques</span>{" "}
              partout au Cameroun
            </h1>
            <p
              style={{
                color: "rgba(255,255,255,0.75)",
                fontSize: "clamp(0.95rem,2vw,1.05rem)",
                lineHeight: 1.75,
                marginBottom: 36,
                maxWidth: 540,
                fontFamily: "'Roboto', sans-serif",
              }}
            >
              Horeb Solutions Sarl assure la diffusion et la distribution de manuels scolaires,
              fournitures scolaires et matériels didactiques grâce à un réseau d&apos;agences, de
              partenaires relais et de détaillants répartis sur le territoire camerounais.
            </p>

            {/* CTAs */}
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginBottom: 48 }}>
              <a href="#contact" style={ctaYellow}>Contacter Horeb Solutions →</a>
              <a
                href="#reseau"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  background: "transparent",
                  border: "2px solid rgba(255,255,255,0.5)",
                  color: "var(--horeb-white)",
                  fontFamily: "'Montserrat', sans-serif",
                  fontWeight: 600,
                  fontSize: "clamp(0.85rem,2vw,0.9rem)",
                  padding: "clamp(10px,3vw,13px) clamp(18px,5vw,26px)",
                  borderRadius: 999,
                  textDecoration: "none",
                  minHeight: 44,
                  whiteSpace: "nowrap",
                }}
              >
                Découvrir notre réseau
              </a>
            </div>

            {/* Trust badges strip */}
            <div
              style={{
                display: "flex",
                gap: 0,
                flexWrap: "wrap",
                borderTop: "1px solid rgba(255,255,255,0.15)",
                paddingTop: 24,
              }}
            >
              {HOREB_STATS.map((stat, i) => (
                <div
                  key={i}
                  style={{
                    padding: "8px 16px 8px 0",
                    marginRight: 16,
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                  }}
                >
                  <span
                    style={{
                      color: "var(--horeb-yellow)",
                      fontWeight: 900,
                      fontSize: "clamp(1rem,2.5vw,1.25rem)",
                      fontFamily: "'Montserrat', sans-serif",
                      lineHeight: 1,
                    }}
                  >
                    {stat.value}
                  </span>
                  {stat.label && (
                    <span style={{ color: "rgba(255,255,255,0.6)", fontSize: 10, fontFamily: "'Roboto', sans-serif", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                      {stat.label}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right — image + floating trust card */}
          <div style={{ position: "relative" }}>
            {/* Floating trust card */}
            <div
              style={{
                position: "absolute",
                top: -16,
                right: 0,
                zIndex: 10,
                background: "var(--horeb-white)",
                borderRadius: 12,
                padding: "12px 18px",
                boxShadow: "0 8px 32px rgba(0,0,0,0.18)",
                maxWidth: 180,
              }}
            >
              <p style={{ color: "var(--horeb-green)", fontWeight: 700, fontSize: 12, margin: "0 0 4px", fontFamily: "'Montserrat', sans-serif" }}>
                Votre partenaire de confiance pour l&apos;éducation
              </p>
              <p style={{ color: "var(--horeb-muted)", fontSize: 11, margin: 0, fontFamily: "'Roboto', sans-serif" }}>
                📅 Depuis 2019
              </p>
            </div>

            {/* Hero image */}
            <div
              style={{
                position: "relative",
                width: "100%",
                height: "clamp(320px,45vw,540px)",
                borderRadius: 20,
                overflow: "hidden",
                boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
              }}
            >
              <Image
                src="/hero.png"
                alt="Manuels scolaires et fournitures — Horeb Solutions Cameroun"
                fill
                style={{ objectFit: "cover" }}
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(0,95,50,0.15) 0%, transparent 60%)" }} />
            </div>
          </div>
        </div>

        {/* Mobile: stack hero image below text */}
        <style>{`
          @media (max-width: 768px) {
            .hero-grid {
              grid-template-columns: 1fr !important;
            }
          }
        `}</style>
      </section>

      {/* ══ 2. SERVICES ════════════════════════════════════════════ */}
      <section id="services" style={{ ...sectionPad, background: "var(--horeb-off-white)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "clamp(2rem,5vw,3.5rem)" }}>
            <p style={{ color: "var(--horeb-green)", fontSize: 11, fontWeight: 700, letterSpacing: "0.35em", textTransform: "uppercase", marginBottom: 14, fontFamily: "'Montserrat', sans-serif" }}>
              CE QUE NOUS DISTRIBUONS
            </p>
            <h2 style={{ color: "var(--horeb-text-dark)", fontSize: "clamp(1.8rem,4vw,2.8rem)", fontWeight: 900, letterSpacing: "-0.03em", marginBottom: 14, fontFamily: "'Montserrat', sans-serif" }}>
              Ce que nous distribuons
            </h2>
            <p style={{ color: "var(--horeb-muted)", fontSize: "clamp(0.9rem,2vw,1rem)", maxWidth: 600, margin: "0 auto", fontFamily: "'Roboto', sans-serif", lineHeight: 1.7 }}>
              Nous accompagnons les établissements, librairies, partenaires commerciaux et acteurs de l&apos;éducation avec une offre adaptée aux besoins du terrain.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 24 }}>
            {HOREB_SERVICES.map((service) => (
              <div
                key={service.id}
                style={{
                  background: "var(--horeb-white)",
                  borderRadius: 16,
                  overflow: "hidden",
                  boxShadow: "0 2px 20px rgba(0,0,0,0.07)",
                  border: "1px solid rgba(0,122,61,0.07)",
                }}
              >
                {/* Card image */}
                <div style={{ position: "relative", width: "100%", height: 200 }}>
                  <Image
                    src={service.image}
                    alt={service.imageAlt}
                    fill
                    style={{ objectFit: "cover" }}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, transparent 60%, rgba(0,0,0,0.18))" }} />
                  {/* Green icon badge at image/text boundary */}
                  <div
                    style={{
                      position: "absolute",
                      bottom: -18,
                      left: 20,
                      width: 40,
                      height: 40,
                      borderRadius: "50%",
                      background: "var(--horeb-green)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 18,
                      boxShadow: "0 4px 12px rgba(0,122,61,0.3)",
                      border: "3px solid var(--horeb-white)",
                    }}
                  >
                    {service.icon}
                  </div>
                </div>
                {/* Card content */}
                <div style={{ padding: "2rem 1.5rem 1.5rem" }}>
                  <h3 style={{ color: "var(--horeb-green)", fontWeight: 800, fontSize: 17, marginBottom: 10, fontFamily: "'Montserrat', sans-serif" }}>
                    {service.title}
                  </h3>
                  <p style={{ color: "var(--horeb-muted)", fontSize: 14, lineHeight: 1.7, margin: 0, fontFamily: "'Roboto', sans-serif" }}>
                    {service.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 3. ABOUT + VISION & MISSION ════════════════════════════ */}
      <section id="a-propos" style={{ ...sectionPad, background: "var(--horeb-white)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "clamp(2rem,5vw,5rem)", alignItems: "start" }}>

            {/* Left — About text + image */}
            <div>
              <p style={{ color: "var(--horeb-green)", fontSize: 11, fontWeight: 700, letterSpacing: "0.35em", textTransform: "uppercase", marginBottom: 14, fontFamily: "'Montserrat', sans-serif" }}>
                À PROPOS DE NOUS
              </p>
              <h2 style={{ color: "var(--horeb-text-dark)", fontSize: "clamp(1.6rem,3.5vw,2.4rem)", fontWeight: 900, letterSpacing: "-0.03em", lineHeight: 1.15, marginBottom: 20, fontFamily: "'Montserrat', sans-serif" }}>
                Une entreprise engagée pour l&apos;accès aux ressources éducatives
              </h2>
              <p style={{ color: "var(--horeb-muted)", fontSize: "clamp(0.9rem,2vw,1rem)", lineHeight: 1.8, marginBottom: 16, fontFamily: "'Roboto', sans-serif" }}>
                Horeb Solutions Sarl est une entreprise camerounaise spécialisée dans la diffusion et la
                distribution de manuels scolaires, fournitures scolaires et matériels didactiques. Créée
                en 2019, l&apos;entreprise s&apos;est donnée pour mission de rapprocher les ressources éducatives
                des établissements, librairies, familles et utilisateurs finaux à travers un réseau
                structuré de distribution.
              </p>
              <p style={{ color: "var(--horeb-muted)", fontSize: "clamp(0.9rem,2vw,1rem)", lineHeight: 1.8, marginBottom: 28, fontFamily: "'Roboto', sans-serif" }}>
                Grâce à ses agences et partenaires répartis sur le territoire national, Horeb Solutions
                facilite l&apos;accès aux manuels scolaires et accompagne les acteurs de l&apos;éducation avec
                un service de proximité, fiable et organisé.
              </p>
              <div style={{ position: "relative", width: "100%", height: 260, borderRadius: 16, overflow: "hidden", boxShadow: "0 8px 32px rgba(0,0,0,0.1)" }}>
                <Image
                  src="/kids-with-books.png"
                  alt="Élèves avec manuels scolaires — Horeb Solutions Cameroun"
                  fill
                  style={{ objectFit: "cover" }}
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>

            {/* Right — Vision & Mission cards */}
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              {[HOREB_VISION_MISSION.vision, HOREB_VISION_MISSION.mission].map((card) => (
                <div
                  key={card.title}
                  style={{
                    background: "var(--horeb-white)",
                    border: "1px solid rgba(0,122,61,0.12)",
                    borderRadius: 16,
                    padding: "clamp(1.5rem,3vw,2rem)",
                    boxShadow: "0 2px 16px rgba(0,0,0,0.05)",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "flex-start", gap: 16, marginBottom: 14 }}>
                    <div
                      style={{
                        width: 44,
                        height: 44,
                        borderRadius: "50%",
                        background: "rgba(0,122,61,0.08)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 20,
                        flexShrink: 0,
                        border: "2px solid rgba(0,122,61,0.15)",
                      }}
                    >
                      {card.icon}
                    </div>
                    <h3 style={{ color: "var(--horeb-green)", fontWeight: 800, fontSize: 17, margin: 0, fontFamily: "'Montserrat', sans-serif" }}>
                      {card.title}
                    </h3>
                  </div>
                  <p style={{ color: "var(--horeb-muted)", fontSize: "clamp(0.9rem,2vw,0.95rem)", lineHeight: 1.75, margin: 0, fontFamily: "'Roboto', sans-serif" }}>
                    {card.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ 4. DISTRIBUTION NETWORK MAP ════════════════════════════ */}
      <section id="reseau" style={{ ...sectionPad, background: "var(--horeb-off-white)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "clamp(2rem,5vw,3.5rem)" }}>
            <p style={{ color: "var(--horeb-green)", fontSize: 11, fontWeight: 700, letterSpacing: "0.35em", textTransform: "uppercase", marginBottom: 14, fontFamily: "'Montserrat', sans-serif" }}>
              NOTRE RÉSEAU
            </p>
            <h2 style={{ color: "var(--horeb-text-dark)", fontSize: "clamp(1.6rem,3.5vw,2.6rem)", fontWeight: 900, letterSpacing: "-0.03em", marginBottom: 14, fontFamily: "'Montserrat', sans-serif" }}>
              Un réseau de distribution présent sur le territoire camerounais
            </h2>
            <p style={{ color: "var(--horeb-muted)", fontSize: "clamp(0.9rem,2vw,1rem)", maxWidth: 640, margin: "0 auto", fontFamily: "'Roboto', sans-serif", lineHeight: 1.7 }}>
              Pour atteindre ses objectifs de distribution, Horeb Solutions s&apos;appuie sur un vaste réseau
              d&apos;agences, de partenaires relais et de partenaires détaillants répartis sur l&apos;ensemble du
              territoire camerounais.
            </p>
          </div>

          {/* Stats row */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 20, marginBottom: "clamp(2.5rem,5vw,4rem)" }}>
            {[
              { value: "6", label: "Agences Horeb" },
              { value: "10", label: "Partenaires relais" },
              { value: "6", label: "Partenaires détaillants" },
              { value: "✓", label: "Présence dans les principales régions du Cameroun" },
            ].map((stat) => (
              <div
                key={stat.label}
                style={{
                  background: "var(--horeb-white)",
                  borderRadius: 14,
                  padding: "1.5rem",
                  textAlign: "center",
                  border: "1px solid rgba(0,122,61,0.1)",
                  boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
                }}
              >
                <p style={{ color: "var(--horeb-green)", fontSize: "clamp(1.8rem,4vw,2.5rem)", fontWeight: 900, margin: "0 0 6px", fontFamily: "'Montserrat', sans-serif" }}>
                  {stat.value}
                </p>
                <p style={{ color: "var(--horeb-muted)", fontSize: 13, margin: 0, fontFamily: "'Roboto', sans-serif", lineHeight: 1.4 }}>
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

          {/* City grid by region — no external map library */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 14 }}>
            {[
              { region: "Centre", agencies: ["Yaoundé — Simbock", "Yaoundé — Etoa Meki", "Yaoundé — Elig-Edzoa"], relay: ["Yaoundé Emia"] },
              { region: "Littoral", agencies: ["Douala — Bonabéri", "Douala — Ndogsibi"], relay: ["Douala Mbopi", "Nkongsamba"] },
              { region: "Ouest", agencies: ["Bafoussam"], relay: ["Dschang"] },
              { region: "Nord", agencies: ["Garoua"], relay: [] },
              { region: "Adamaoua", agencies: [], relay: ["Ngaoundéré"] },
              { region: "Extrême-Nord", agencies: [], relay: ["Maroua"] },
              { region: "Est", agencies: [], relay: ["Bertoua"] },
              { region: "Nord-Ouest", agencies: [], relay: ["Bamenda"] },
              { region: "Sud-Ouest", agencies: [], relay: ["Buea", "Limbe"] },
            ].map((r) => (
              <div
                key={r.region}
                style={{
                  background: "var(--horeb-white)",
                  borderRadius: 12,
                  padding: "1rem 1.25rem",
                  border: "1px solid rgba(0,122,61,0.1)",
                }}
              >
                <p style={{ color: "var(--horeb-green)", fontWeight: 700, fontSize: 10, textTransform: "uppercase", letterSpacing: "0.12em", margin: "0 0 8px", fontFamily: "'Montserrat', sans-serif" }}>
                  {r.region}
                </p>
                {r.agencies.map((a) => (
                  <div key={a} style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 5 }}>
                    <span style={{ fontSize: 10 }}>🟢</span>
                    <span style={{ color: "var(--horeb-text)", fontSize: 12, fontFamily: "'Roboto', sans-serif", fontWeight: 500 }}>{a}</span>
                  </div>
                ))}
                {r.relay.map((c) => (
                  <div key={c} style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 5 }}>
                    <span style={{ fontSize: 10 }}>🟡</span>
                    <span style={{ color: "var(--horeb-muted)", fontSize: 12, fontFamily: "'Roboto', sans-serif" }}>{c}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>

          {/* Legend */}
          <div style={{ display: "flex", gap: 24, justifyContent: "center", flexWrap: "wrap", marginTop: 24 }}>
            {[["🟢", "Agences Horeb"], ["🟡", "Partenaires relais"], ["🔵", "Partenaires détaillants"]].map(([icon, label]) => (
              <div key={label} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span>{icon}</span>
                <span style={{ color: "var(--horeb-muted)", fontSize: 13, fontFamily: "'Roboto', sans-serif" }}>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 5. AGENCIES ════════════════════════════════════════════ */}
      <section id="agences" style={{ ...sectionPad, background: "var(--horeb-white)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "clamp(2rem,5vw,3.5rem)" }}>
            <p style={{ color: "var(--horeb-green)", fontSize: 11, fontWeight: 700, letterSpacing: "0.35em", textTransform: "uppercase", marginBottom: 14, fontFamily: "'Montserrat', sans-serif" }}>
              NOS AGENCES
            </p>
            <h2 style={{ color: "var(--horeb-text-dark)", fontSize: "clamp(1.6rem,3.5vw,2.6rem)", fontWeight: 900, letterSpacing: "-0.03em", fontFamily: "'Montserrat', sans-serif" }}>
              Présents au plus près de vous
            </h2>
          </div>

          {REGION_GROUPS.map((group) => {
            const agencies = HOREB_AGENCIES.filter((a) => a.region === group.key);
            if (agencies.length === 0) return null;
            return (
              <div key={group.key} style={{ marginBottom: 40 }}>
                <p style={{ color: "var(--horeb-green)", fontWeight: 700, fontSize: 13, textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 16, fontFamily: "'Montserrat', sans-serif", borderBottom: "2px solid rgba(0,122,61,0.12)", paddingBottom: 8 }}>
                  {group.label}
                </p>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 16 }}>
                  {agencies.map((agency) => (
                    <div
                      key={agency.id}
                      style={{
                        background: "var(--horeb-off-white)",
                        borderRadius: 14,
                        overflow: "hidden",
                        border: "1px solid rgba(0,122,61,0.1)",
                      }}
                    >
                      <div style={{ height: 4, background: "var(--horeb-green)" }} />
                      <div style={{ padding: "1.25rem" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
                          <div>
                            <p style={{ color: "var(--horeb-text-dark)", fontWeight: 800, fontSize: 16, margin: 0, fontFamily: "'Montserrat', sans-serif" }}>
                              {agency.city}
                            </p>
                            <p style={{ color: "var(--horeb-muted)", fontSize: 13, margin: "2px 0 0", fontFamily: "'Roboto', sans-serif" }}>
                              {agency.zone}
                            </p>
                          </div>
                          <span style={{ background: "rgba(0,122,61,0.08)", color: "var(--horeb-green)", fontSize: 10, fontWeight: 700, padding: "3px 10px", borderRadius: 999, letterSpacing: "0.06em", fontFamily: "'Montserrat', sans-serif", flexShrink: 0, marginLeft: 8 }}>
                            {agency.region}
                          </span>
                        </div>

                        {agency.note && (
                          <p style={{ color: "var(--horeb-gold)", fontSize: 11, margin: "0 0 10px", fontStyle: "italic", fontFamily: "'Roboto', sans-serif" }}>
                            ℹ️ {agency.note}
                          </p>
                        )}

                        {agency.phone && agency.phoneTel ? (
                          <a
                            href={agency.phoneTel}
                            style={{ color: "var(--horeb-green)", fontWeight: 600, fontSize: 14, textDecoration: "none", display: "block", fontFamily: "'Roboto', sans-serif" }}
                          >
                            📞 {agency.phone}
                          </a>
                        ) : (
                          <div>
                            <p style={{ color: "var(--horeb-muted)", fontSize: 12, margin: "0 0 4px", fontStyle: "italic", fontFamily: "'Roboto', sans-serif" }}>
                              Numéro non communiqué
                            </p>
                            <a
                              href={HOREB_CONTACT.phoneTel}
                              style={{ color: "var(--horeb-green)", fontWeight: 600, fontSize: 13, textDecoration: "none", fontFamily: "'Roboto', sans-serif" }}
                            >
                              📞 Contactez le siège : {HOREB_CONTACT.phoneFull}
                            </a>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ══ 6. PARTENAIRES RELAIS ══════════════════════════════════ */}
      <section style={{ ...sectionPad, background: "var(--horeb-off-white)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "clamp(2rem,5vw,3rem)" }}>
            <p style={{ color: "var(--horeb-green)", fontSize: 11, fontWeight: 700, letterSpacing: "0.35em", textTransform: "uppercase", marginBottom: 14, fontFamily: "'Montserrat', sans-serif" }}>
              PARTENAIRES RELAIS
            </p>
            <h2 style={{ color: "var(--horeb-text-dark)", fontSize: "clamp(1.6rem,3.5vw,2.4rem)", fontWeight: 900, letterSpacing: "-0.03em", marginBottom: 14, fontFamily: "'Montserrat', sans-serif" }}>
              10 partenaires relais agréés sur le territoire
            </h2>
            <p style={{ color: "var(--horeb-muted)", fontSize: "clamp(0.9rem,2vw,1rem)", maxWidth: 540, margin: "0 auto", fontFamily: "'Roboto', sans-serif" }}>
              Nos partenaires relais étendent notre réseau de distribution dans les villes secondaires du Cameroun.
            </p>
          </div>

          {/* Scroll strip — mobile horizontal, desktop flex wrap */}
          <div
            style={{
              display: "flex",
              gap: 12,
              overflowX: "auto",
              scrollSnapType: "x mandatory",
              paddingBottom: 12,
              WebkitOverflowScrolling: "touch",
            }}
          >
            {HOREB_PARTNERS_RELAY.map((partner) => (
              <div
                key={partner.city}
                style={{
                  flexShrink: 0,
                  scrollSnapAlign: "start",
                  border: "2px solid var(--horeb-green)",
                  borderRadius: 12,
                  padding: "12px 22px",
                  textAlign: "center",
                  minWidth: 130,
                  background: "var(--horeb-white)",
                }}
              >
                <p style={{ color: "var(--horeb-text-dark)", fontWeight: 700, fontSize: 15, margin: "0 0 3px", fontFamily: "'Roboto', sans-serif" }}>
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

      {/* ══ 7. PARTENAIRES DÉTAILLANTS ═════════════════════════════ */}
      <section style={{ ...sectionPad, background: "var(--horeb-white)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "clamp(2rem,5vw,3rem)" }}>
            <p style={{ color: "var(--horeb-green)", fontSize: 11, fontWeight: 700, letterSpacing: "0.35em", textTransform: "uppercase", marginBottom: 14, fontFamily: "'Montserrat', sans-serif" }}>
              PARTENAIRES DÉTAILLANTS
            </p>
            <h2 style={{ color: "var(--horeb-text-dark)", fontSize: "clamp(1.6rem,3.5vw,2.4rem)", fontWeight: 900, letterSpacing: "-0.03em", marginBottom: 14, fontFamily: "'Montserrat', sans-serif" }}>
              Trouvez nos produits dans votre quartier
            </h2>
            <p style={{ color: "var(--horeb-muted)", fontSize: "clamp(0.9rem,2vw,1rem)", maxWidth: 540, margin: "0 auto", fontFamily: "'Roboto', sans-serif" }}>
              Nos partenaires détaillants distribuent directement dans les quartiers et marchés locaux.
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16 }}>
            {HOREB_PARTNERS_RETAIL.map((partner) => (
              <div
                key={`${partner.city}-${partner.zone}`}
                style={{
                  background: "var(--horeb-off-white)",
                  borderRadius: 14,
                  padding: "1.25rem 1.5rem",
                  border: "1px solid rgba(0,122,61,0.1)",
                  textAlign: "center",
                }}
              >
                <p style={{ color: "var(--horeb-text-dark)", fontWeight: 700, fontSize: 16, margin: "0 0 4px", fontFamily: "'Roboto', sans-serif" }}>
                  {partner.city}
                </p>
                <p style={{ color: "var(--horeb-green)", fontSize: 13, margin: 0, fontFamily: "'Roboto', sans-serif", fontWeight: 600 }}>
                  {partner.zone}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 8. GALLERY ═════════════════════════════════════════════ */}
      <section style={{ ...sectionPad, background: "var(--horeb-off-white)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "clamp(2rem,5vw,3rem)" }}>
            <p style={{ color: "var(--horeb-green)", fontSize: 11, fontWeight: 700, letterSpacing: "0.35em", textTransform: "uppercase", marginBottom: 14, fontFamily: "'Montserrat', sans-serif" }}>
              GALERIE
            </p>
            <h2 style={{ color: "var(--horeb-text-dark)", fontSize: "clamp(1.6rem,3.5vw,2.4rem)", fontWeight: 900, letterSpacing: "-0.03em", fontFamily: "'Montserrat', sans-serif" }}>
              La distribution en action
            </h2>
          </div>

          {/* Horizontal scroll on mobile, grid on desktop */}
          <div
            style={{
              display: "flex",
              gap: 16,
              overflowX: "auto",
              scrollSnapType: "x mandatory",
              paddingBottom: 12,
              WebkitOverflowScrolling: "touch",
            }}
          >
            {[
              { src: "/truck-loading.png", alt: "Chargement camion Horeb Solutions — logistique scolaire Cameroun" },
              { src: "/warehouse-books.png", alt: "Entrepôt manuels scolaires — stock Horeb Solutions" },
              { src: "/workers.png", alt: "Équipe Horeb Solutions — distribution scolaire Cameroun" },
            ].map((img) => (
              <div
                key={img.src}
                style={{
                  flexShrink: 0,
                  scrollSnapAlign: "start",
                  position: "relative",
                  width: "clamp(260px,35vw,380px)",
                  height: 260,
                  borderRadius: 14,
                  overflow: "hidden",
                  border: "2px solid rgba(0,122,61,0.1)",
                }}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  style={{ objectFit: "cover" }}
                  sizes="(max-width: 640px) 280px, 380px"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 9. B2B CTA ═════════════════════════════════════════════ */}
      <section
        style={{
          background: "linear-gradient(135deg, var(--horeb-dark-green) 0%, var(--horeb-green) 100%)",
          padding: "clamp(3.5rem,7vw,6rem) clamp(1rem,5vw,2rem)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div style={{ maxWidth: 1280, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "clamp(2rem,5vw,4rem)", alignItems: "center" }}>
          {/* Left — text */}
          <div>
            <h2
              style={{
                color: "var(--horeb-white)",
                fontSize: "clamp(1.5rem,3.5vw,2.4rem)",
                fontWeight: 900,
                letterSpacing: "-0.03em",
                lineHeight: 1.2,
                marginBottom: 20,
                fontFamily: "'Montserrat', sans-serif",
              }}
            >
              Vous êtes une école, une librairie, un éditeur ou un partenaire commercial ?
            </h2>
            <p style={{ color: "rgba(255,255,255,0.75)", fontSize: "clamp(0.9rem,2vw,1rem)", lineHeight: 1.75, marginBottom: 32, fontFamily: "'Roboto', sans-serif" }}>
              Horeb Solutions vous accompagne dans la diffusion et la distribution de manuels scolaires,
              fournitures scolaires et matériels didactiques à travers un réseau structuré au Cameroun.
            </p>
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
              <a href={HOREB_CONTACT.emailLink} style={ctaYellow}>Écrire à Horeb Solutions →</a>
              <a
                href={HOREB_CONTACT.phoneTel}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  background: "transparent",
                  border: "2px solid rgba(255,255,255,0.5)",
                  color: "var(--horeb-white)",
                  fontFamily: "'Montserrat', sans-serif",
                  fontWeight: 600,
                  fontSize: "clamp(0.85rem,2vw,0.9rem)",
                  padding: "clamp(10px,3vw,13px) clamp(18px,5vw,26px)",
                  borderRadius: 999,
                  textDecoration: "none",
                  minHeight: 44,
                  whiteSpace: "nowrap",
                }}
              >
                Appeler maintenant
              </a>
            </div>
          </div>

          {/* Right — image */}
          <div style={{ position: "relative", height: "clamp(240px,30vw,380px)", borderRadius: 18, overflow: "hidden", boxShadow: "0 16px 48px rgba(0,0,0,0.25)" }}>
            <Image
              src="/book-deal.png"
              alt="Partenariat Horeb Solutions — distribution scolaire Cameroun"
              fill
              style={{ objectFit: "cover" }}
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div style={{ position: "absolute", inset: 0, background: "rgba(0,75,41,0.2)" }} />
          </div>
        </div>
      </section>

      {/* ══ 10. CONTACT ════════════════════════════════════════════ */}
      <section id="contact" style={{ ...sectionPad, background: "var(--horeb-white)" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
          <p style={{ color: "var(--horeb-green)", fontSize: 11, fontWeight: 700, letterSpacing: "0.35em", textTransform: "uppercase", marginBottom: 14, fontFamily: "'Montserrat', sans-serif" }}>
            CONTACT
          </p>
          <h2 style={{ color: "var(--horeb-text-dark)", fontSize: "clamp(1.6rem,3.5vw,2.4rem)", fontWeight: 900, letterSpacing: "-0.03em", marginBottom: 40, fontFamily: "'Montserrat', sans-serif" }}>
            Contactez-nous
          </h2>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 20, marginBottom: 40 }}>
            {[
              { icon: "📍", label: HOREB_CONTACT.address, href: undefined },
              { icon: "📮", label: HOREB_CONTACT.bp, href: undefined },
              { icon: "📞", label: HOREB_CONTACT.phoneFull, href: HOREB_CONTACT.phoneTel },
              { icon: "📧", label: HOREB_CONTACT.email, href: HOREB_CONTACT.emailLink },
            ].map((item) => (
              <div
                key={item.label}
                style={{
                  background: "var(--horeb-off-white)",
                  borderRadius: 14,
                  padding: "1.5rem",
                  border: "1px solid rgba(0,122,61,0.1)",
                }}
              >
                <span style={{ fontSize: 24, display: "block", marginBottom: 10 }}>{item.icon}</span>
                {item.href ? (
                  <a href={item.href} style={{ color: "var(--horeb-green)", fontSize: 15, textDecoration: "none", fontWeight: 600, fontFamily: "'Roboto', sans-serif" }}>
                    {item.label}
                  </a>
                ) : (
                  <span style={{ color: "var(--horeb-muted)", fontSize: 14, fontFamily: "'Roboto', sans-serif", lineHeight: 1.5 }}>
                    {item.label}
                  </span>
                )}
              </div>
            ))}
          </div>

          <p style={{ color: "var(--horeb-muted)", fontSize: 14, marginBottom: 8, fontFamily: "'Roboto', sans-serif" }}>
            Suivez-nous sur
          </p>
          <p style={{ color: "var(--horeb-green)", fontSize: 16, fontWeight: 700, margin: 0, fontFamily: "'Montserrat', sans-serif" }}>
            {HOREB_CONTACT.social}
          </p>
        </div>
      </section>

    </main>
  );
}
