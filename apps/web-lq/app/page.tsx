const navFont = "'Helvetica Neue', Helvetica, Arial, sans-serif";
const bodyFont = "Georgia, 'Garamond', 'Times New Roman', serif";

export default function HomePage() {
  const catalogue = [
    {
      icon: "📖",
      title: "Manuels scolaires",
      description:
        "Tous les manuels du primaire, secondaire et supérieur. Programmes officiels camerounais, éditions agréées par le MINESEC et le MINESUP.",
      tag: "Scolaire",
      color: "#393186",
    },
    {
      icon: "📚",
      title: "Livres généraux",
      description:
        "Romans, essais, littérature africaine, ouvrages de développement personnel et biographies. Une sélection curatée pour tous les lecteurs.",
      tag: "Littérature",
      color: "#EF7F1B",
    },
    {
      icon: "✏️",
      title: "Fournitures scolaires",
      description:
        "Cahiers, stylos, compas, rapporteurs, cartables et tout le matériel nécessaire à la réussite scolaire — disponible toute l'année.",
      tag: "Fournitures",
      color: "#5a52c4",
    },
    {
      icon: "🗂️",
      title: "Papeterie & Bureau",
      description:
        "Rames de papier, classeurs, blocs-notes, stylos professionnels et fournitures de bureau pour entreprises et administrations.",
      tag: "Bureau",
      color: "#c2590f",
    },
    {
      icon: "🎨",
      title: "Matériels artistiques",
      description:
        "Crayons de couleur, aquarelles, carnets de croquis et matériels pour les arts plastiques et la créativité.",
      tag: "Art",
      color: "#7c3aed",
    },
    {
      icon: "🎓",
      title: "Matériels pédagogiques",
      description:
        "Cartes murales, globes, matériels de sciences et outils didactiques pour établissements scolaires et enseignants.",
      tag: "Pédagogie",
      color: "#0a8348",
    },
  ];

  const services = [
    {
      icon: "🚚",
      title: "Commande & Livraison",
      body: "Passez vos commandes groupées pour établissements scolaires. Service de livraison rapide sur Yaoundé et Douala.",
    },
    {
      icon: "📋",
      title: "Listes scolaires",
      body: "Déposez votre liste scolaire — nous préparons votre kit complet. Idéal pour les parents et les établissements en début d'année.",
    },
    {
      icon: "🏫",
      title: "Partenariats établissements",
      body: "Conventions avec écoles, lycées et universités pour l'approvisionnement régulier en manuels et fournitures.",
    },
    {
      icon: "🔍",
      title: "Recherche de titres",
      body: "Un ouvrage introuvable ? Notre équipe recherche et commande tout titre sur demande — livres techniques, parascolaires, importés.",
    },
  ];

  return (
    <main>

      {/* ══ HERO ══════════════════════════════════════════ */}
      <section style={{
        minHeight: "88vh",
        display: "flex", alignItems: "center",
        background: "linear-gradient(150deg, #1a1630 0%, #2d2660 50%, #393186 100%)",
        padding: "6rem 2rem",
        position: "relative", overflow: "hidden",
      }}>
        {/* Orange circle — brand cue (from PDF) */}
        <div style={{
          position: "absolute", top: -60, right: 80,
          width: 180, height: 180, borderRadius: "50%",
          background: "rgba(239,127,27,0.12)",
          pointerEvents: "none",
        }} />
        <div style={{
          position: "absolute", top: 20, right: 140,
          width: 80, height: 80, borderRadius: "50%",
          background: "rgba(239,127,27,0.08)",
          pointerEvents: "none",
        }} />
        {/* Coloured background accent — from PDF */}
        <div style={{
          position: "absolute", bottom: -80, left: "55%",
          width: 360, height: 360, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(239,127,27,0.06) 0%, rgba(57,49,134,0.04) 50%, transparent 70%)",
          pointerEvents: "none",
        }} />
        {/* Wavy line — brand cue (from PDF graphical elements) */}
        <svg style={{ position: "absolute", bottom: 60, left: "5%", opacity: 0.15, pointerEvents: "none" }}
          width="260" height="55" viewBox="0 0 260 55" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,27 C35,7 70,47 110,27 C150,7 185,47 225,27 C240,19 250,23 260,27"
            stroke="#7b90f3" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
        </svg>

        <div style={{ maxWidth: 1280, margin: "0 auto", width: "100%", position: "relative" }}>
          <div style={{ maxWidth: 680 }}>
            <p style={{
              color: "#EF7F1B", fontSize: 11, fontWeight: 700,
              letterSpacing: "0.35em", textTransform: "uppercase", marginBottom: 24,
              fontFamily: navFont,
            }}>
              Livres · Fournitures · Cameroun
            </p>
            <h1 style={{
              color: "#ffffff",
              fontSize: "clamp(2.8rem, 6vw, 5rem)",
              fontWeight: 900, letterSpacing: "-0.03em",
              lineHeight: 1.05, marginBottom: 12,
              fontFamily: navFont,
            }}>
              Votre librairie
            </h1>
            <h1 style={{
              color: "#EF7F1B",
              fontSize: "clamp(2.8rem, 6vw, 5rem)",
              fontWeight: 900, letterSpacing: "-0.03em",
              lineHeight: 1.05, marginBottom: 36,
              fontFamily: navFont,
            }}>
              de référence
            </h1>
            <p style={{
              color: "rgba(255,255,255,0.6)", fontSize: 18,
              lineHeight: 1.75, marginBottom: 48, maxWidth: 520,
              fontFamily: bodyFont,
            }}>
              Librairie du Quartier — manuels scolaires, livres, fournitures
              et papeterie. La culture à portée de main, à Yaoundé et Douala.
            </p>
            <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
              <a href="#catalogue" style={{
                background: "#EF7F1B", color: "#ffffff",
                padding: "16px 36px", borderRadius: 12,
                fontSize: 14, fontWeight: 800, textDecoration: "none",
                fontFamily: navFont,
                boxShadow: "0 4px 20px rgba(239,127,27,0.35)",
              }}>
                Voir le catalogue
              </a>
              <a href="#librairies" style={{
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.2)",
                color: "white",
                padding: "16px 36px", borderRadius: 12,
                fontSize: 14, fontWeight: 700, textDecoration: "none",
                fontFamily: navFont,
              }}>
                Nos librairies
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ══ WAVY LINE SEPARATOR (brand element) ══════════ */}
      <div style={{ background: "#393186", overflow: "hidden", lineHeight: 0 }}>
        <svg viewBox="0 0 1440 32" xmlns="http://www.w3.org/2000/svg" style={{ display: "block" }}>
          <path d="M0,16 C240,32 480,0 720,16 C960,32 1200,0 1440,16 L1440,32 L0,32 Z" fill="#ffffff" />
        </svg>
      </div>

      {/* ══ ABOUT ════════════════════════════════════════ */}
      <section id="about" style={{ padding: "8rem 2rem", background: "#ffffff" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "center" }}>
          <div>
            <p style={{
              color: "#393186", fontSize: 11, fontWeight: 700,
              letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: 16, fontFamily: navFont,
            }}>
              Qui sommes-nous
            </p>
            <h2 style={{
              color: "#111827",
              fontSize: "clamp(2rem, 4vw, 2.8rem)",
              fontWeight: 900, letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: 28, fontFamily: navFont,
            }}>
              La librairie<br />du quartier
            </h2>
            <p style={{ color: "#374151", fontSize: 16, lineHeight: 1.85, marginBottom: 24, fontFamily: bodyFont }}>
              Librairie du Quartier est votre partenaire culturel et éducatif
              au Cameroun. Nous mettons à votre disposition une large gamme
              de livres, manuels scolaires, fournitures et papeterie —
              pour les élèves, les étudiants, les enseignants et les professionnels.
            </p>
            <p style={{ color: "#374151", fontSize: 16, lineHeight: 1.85, marginBottom: 32, fontFamily: bodyFont }}>
              Deux librairies au service de vos besoins : à Yaoundé
              (Rond-Point Express, Biyem-Assi) et à Douala (PK 10,
              face Boulangerie Saker).
            </p>
            <div style={{ padding: "1.5rem 2rem", background: "#fef3e8", borderRadius: 16, borderLeft: "4px solid #EF7F1B" }}>
              <p style={{ color: "#393186", fontWeight: 700, fontSize: 16, margin: "0 0 6px", fontStyle: "italic", fontFamily: bodyFont }}>
                &ldquo;La culture à portée de main.&rdquo;
              </p>
              <p style={{ color: "#6B7280", fontSize: 13, margin: 0, fontFamily: navFont }}>Librairie du Quartier</p>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            {[
              { icon: "📚", title: "Large catalogue", desc: "Milliers de titres en stock, scolaires et généraux" },
              { icon: "🎯", title: "Sélection curatée", desc: "Des choix pertinents pour chaque niveau scolaire" },
              { icon: "🤝", title: "Service personnalisé", desc: "Une équipe à votre écoute pour chaque besoin" },
              { icon: "🚀", title: "Commandes rapides", desc: "Livraison et préparation de listes scolaires" },
            ].map((v) => (
              <div key={v.title} style={{
                padding: "1.5rem", background: "#f9fafb",
                borderRadius: 16, border: "1px solid #e5e7eb",
              }}>
                {/* Orange circle accent — from PDF */}
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                  <div style={{ width: 28, height: 28, borderRadius: "50%", background: "#EF7F1B", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <span style={{ fontSize: 14 }}>{v.icon}</span>
                  </div>
                </div>
                <p style={{ color: "#111827", fontWeight: 700, fontSize: 14, margin: "0 0 6px", fontFamily: navFont }}>{v.title}</p>
                <p style={{ color: "#6B7280", fontSize: 12, margin: 0, fontFamily: bodyFont }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ CATALOGUE ════════════════════════════════════ */}
      <section id="catalogue" style={{ padding: "8rem 2rem", background: "#fef3e8" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            {/* Orange circle — brand cue */}
            <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#EF7F1B", margin: "0 auto 16px" }} />
            <p style={{
              color: "#393186", fontSize: 11, fontWeight: 700,
              letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: 16, fontFamily: navFont,
            }}>
              Notre catalogue
            </p>
            <h2 style={{ color: "#111827", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 900, letterSpacing: "-0.03em", margin: 0, fontFamily: navFont }}>
              Ce que nous proposons
            </h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24 }}>
            {catalogue.map((c) => (
              <div key={c.title} style={{
                background: "#ffffff", borderRadius: 20,
                border: "1px solid #e5e7eb", overflow: "hidden",
                boxShadow: "0 2px 12px rgba(57,49,134,0.06)",
              }}>
                <div style={{ height: 4, background: `linear-gradient(90deg, #393186, ${c.color})` }} />
                <div style={{ padding: "2rem" }}>
                  <span style={{
                    background: "#fef3e8", color: "#c2590f",
                    fontSize: 10, fontWeight: 700, padding: "3px 10px",
                    borderRadius: 20, letterSpacing: "0.1em", textTransform: "uppercase",
                    border: "1px solid #fed7aa", display: "inline-block", marginBottom: 20,
                    fontFamily: navFont,
                  }}>
                    {c.tag}
                  </span>
                  <span style={{ fontSize: 32, display: "block", marginBottom: 16 }}>{c.icon}</span>
                  <h3 style={{ color: "#111827", fontWeight: 800, fontSize: 18, marginBottom: 12, fontFamily: navFont }}>
                    {c.title}
                  </h3>
                  <p style={{ color: "#6B7280", fontSize: 14, lineHeight: 1.7, margin: 0, fontFamily: bodyFont }}>
                    {c.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ NOS LIBRAIRIES (real locations from PDF) ═════ */}
      <section id="librairies" style={{ padding: "8rem 2rem", background: "#ffffff" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#EF7F1B", margin: "0 auto 16px" }} />
            <p style={{ color: "#393186", fontSize: 11, fontWeight: 700, letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: 16, fontFamily: navFont }}>
              Nos librairies
            </p>
            <h2 style={{ color: "#111827", fontSize: "clamp(1.8rem, 3vw, 2.5rem)", fontWeight: 900, letterSpacing: "-0.02em", margin: 0, fontFamily: navFont }}>
              Deux librairies pour vous servir
            </h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32, maxWidth: 900, margin: "0 auto" }}>
            {/* Yaoundé */}
            <div style={{
              padding: "2.5rem", background: "#f5f3ff",
              borderRadius: 20, border: "2px solid #393186",
              textAlign: "center",
            }}>
              {/* Orange circle */}
              <div style={{
                width: 56, height: 56, borderRadius: "50%",
                background: "#393186", margin: "0 auto 20px",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <span style={{ fontSize: 24 }}>📍</span>
              </div>
              <p style={{ color: "#393186", fontWeight: 800, fontSize: 20, margin: "0 0 8px", fontFamily: navFont }}>LQ — Yaoundé</p>
              <p style={{ color: "#374151", fontSize: 15, margin: "0 0 4px", fontFamily: navFont, fontWeight: 600 }}>Rond-Point Express</p>
              <p style={{ color: "#6B7280", fontSize: 14, margin: "0 0 20px", fontFamily: bodyFont }}>
                À-côté de CAMTEL Biyem-Assi
              </p>
              <div style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap" }}>
                <a href="tel:+237654080187" style={{
                  background: "#393186", color: "white",
                  padding: "10px 20px", borderRadius: 10, fontSize: 14,
                  textDecoration: "none", fontWeight: 700, fontFamily: navFont,
                }}>
                  654-080-187
                </a>
                <a href="tel:+237698736153" style={{
                  background: "rgba(57,49,134,0.1)", color: "#393186",
                  padding: "10px 20px", borderRadius: 10, fontSize: 14,
                  textDecoration: "none", fontWeight: 700, fontFamily: navFont,
                  border: "1px solid rgba(57,49,134,0.25)",
                }}>
                  698-736-153
                </a>
              </div>
            </div>

            {/* Douala */}
            <div style={{
              padding: "2.5rem", background: "#fef3e8",
              borderRadius: 20, border: "2px solid #EF7F1B",
              textAlign: "center",
            }}>
              <div style={{
                width: 56, height: 56, borderRadius: "50%",
                background: "#EF7F1B", margin: "0 auto 20px",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <span style={{ fontSize: 24 }}>📍</span>
              </div>
              <p style={{ color: "#c2590f", fontWeight: 800, fontSize: 20, margin: "0 0 8px", fontFamily: navFont }}>LQ — Douala</p>
              <p style={{ color: "#374151", fontSize: 15, margin: "0 0 4px", fontFamily: navFont, fontWeight: 600 }}>PK 10</p>
              <p style={{ color: "#6B7280", fontSize: 14, margin: "0 0 20px", fontFamily: bodyFont }}>
                Face Boulangerie Saker
              </p>
              <div style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap" }}>
                <a href="tel:+237654080187" style={{
                  background: "#EF7F1B", color: "white",
                  padding: "10px 20px", borderRadius: 10, fontSize: 14,
                  textDecoration: "none", fontWeight: 700, fontFamily: navFont,
                }}>
                  654-080-187
                </a>
                <a href="tel:+237698736153" style={{
                  background: "rgba(239,127,27,0.1)", color: "#c2590f",
                  padding: "10px 20px", borderRadius: 10, fontSize: 14,
                  textDecoration: "none", fontWeight: 700, fontFamily: navFont,
                  border: "1px solid rgba(239,127,27,0.3)",
                }}>
                  698-736-153
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ SERVICES ═════════════════════════════════════ */}
      <section style={{ padding: "8rem 2rem", background: "#1a1630" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#EF7F1B", margin: "0 auto 16px" }} />
            <p style={{ color: "#EF7F1B", fontSize: 11, fontWeight: 700, letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: 16, fontFamily: navFont }}>
              Nos services
            </p>
            <h2 style={{ color: "#ffffff", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 900, letterSpacing: "-0.03em", margin: 0, fontFamily: navFont }}>
              Plus qu&apos;une librairie
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 24 }}>
            {services.map((s) => (
              <div key={s.title} style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(57,49,134,0.35)",
                borderRadius: 20, padding: "2rem",
              }}>
                <div style={{
                  width: 48, height: 48, borderRadius: "50%",
                  background: "rgba(239,127,27,0.15)", marginBottom: 20,
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <span style={{ fontSize: 24 }}>{s.icon}</span>
                </div>
                <h3 style={{ color: "#EF7F1B", fontWeight: 800, fontSize: 16, marginBottom: 12, fontFamily: navFont }}>
                  {s.title}
                </h3>
                <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 14, lineHeight: 1.75, margin: 0, fontFamily: bodyFont }}>
                  {s.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ MGI ECOSYSTEM ════════════════════════════════ */}
      <section style={{ padding: "4rem 2rem", background: "#f9fafb", borderTop: "1px solid #e5e7eb" }}>
        <div style={{ maxWidth: 960, margin: "0 auto", textAlign: "center" }}>
          <p style={{ color: "#9CA3AF", fontSize: 11, fontWeight: 700, letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: 12, fontFamily: navFont }}>
            Groupe MGI
          </p>
          <p style={{ color: "#374151", fontSize: 15, marginBottom: 24, fontFamily: bodyFont }}>
            Librairie du Quartier est une entreprise du groupe{" "}
            <strong style={{ fontFamily: navFont }}>Mina-Galeed Invest (MGI) Ltd</strong> — Start well, Grow well.
          </p>
          <a href="https://mgi-ventures.com" target="_blank" rel="noopener noreferrer" style={{
            display: "inline-block", background: "#f5f3ff",
            border: "1px solid #ddd6fe", color: "#393186",
            padding: "10px 24px", borderRadius: 10,
            fontSize: 13, fontWeight: 700, textDecoration: "none", fontFamily: navFont,
          }}>
            mgi-ventures.com →
          </a>
        </div>
      </section>

      {/* ══ CONTACT ══════════════════════════════════════ */}
      <section id="contact" style={{ padding: "8rem 2rem", background: "#393186" }}>
        <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center" }}>
          {/* Orange circle brand cue */}
          <div style={{ width: 16, height: 16, borderRadius: "50%", background: "#EF7F1B", margin: "0 auto 24px" }} />
          <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 11, fontWeight: 700, letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: 16, fontFamily: navFont }}>
            Contactez-nous
          </p>
          <h2 style={{ color: "#ffffff", fontWeight: 900, fontSize: "clamp(2rem, 4vw, 2.8rem)", letterSpacing: "-0.02em", marginBottom: 20, fontFamily: navFont }}>
            Venez nous rendre visite
          </h2>
          <p style={{ color: "rgba(255,255,255,0.55)", fontSize: 16, lineHeight: 1.75, maxWidth: 480, margin: "0 auto 48px", fontFamily: bodyFont }}>
            Besoin d&apos;un titre particulier, d&apos;une liste scolaire ou d&apos;une commande
            groupée ? Contactez notre équipe ou venez directement dans l&apos;une
            de nos deux librairies.
          </p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <a href="mailto:contact@librairieduquartier.org" style={{
              background: "#EF7F1B", color: "#ffffff",
              padding: "16px 32px", borderRadius: 12,
              fontSize: 14, fontWeight: 700, textDecoration: "none", fontFamily: navFont,
            }}>
              contact@librairieduquartier.org
            </a>
            <a href="tel:+237654080187" style={{
              background: "rgba(255,255,255,0.1)",
              border: "1px solid rgba(255,255,255,0.2)",
              color: "white", padding: "16px 32px", borderRadius: 12,
              fontSize: 14, fontWeight: 700, textDecoration: "none", fontFamily: navFont,
            }}>
              654-080-187 / 698-736-153
            </a>
          </div>
        </div>
      </section>

    </main>
  );
}
