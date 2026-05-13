export default function HomePage() {
  const products = [
    {
      icon: "📚",
      title: "Manuels scolaires",
      description: "Distribution nationale de manuels scolaires agréés. Nous couvrons l'ensemble du territoire camerounais pour assurer la disponibilité des ouvrages dans toutes les régions.",
      tag: "Core",
      color: "#0a8348",
    },
    {
      icon: "🖊️",
      title: "Fournitures scolaires",
      description: "Cahiers, stylos, cartables et tout le matériel nécessaire à la réussite scolaire, distribués avec la même fiabilité que nos manuels.",
      tag: "Distribution",
      color: "#15a3eb",
    },
    {
      icon: "🎓",
      title: "Matériels didactiques",
      description: "Outils pédagogiques et matériels d'enseignement pour établissements scolaires, distribués à travers notre réseau national d'agents agréés.",
      tag: "Éducation",
      color: "#fdda2b",
    },
    {
      icon: "🗂️",
      title: "Fournitures de bureau",
      description: "Papeterie et fournitures de bureau pour entreprises et administrations, livrées efficacement grâce à notre infrastructure logistique.",
      tag: "B2B",
      color: "#ce9c66",
    },
  ];

  const strengths = [
    {
      icon: "🚛",
      title: "Flotte logistique",
      body: "Logistique de qualité composée d'une dizaine de véhicules et de grands camions opérant dans les métropoles de Yaoundé et Douala.",
    },
    {
      icon: "🌍",
      title: "Réseau national agréé",
      body: "Réseau d'une dizaine d'agents distributeurs agréés couvrant l'ensemble du territoire national du Cameroun.",
    },
    {
      icon: "👥",
      title: "Personnel expérimenté",
      body: "Une équipe de professionnels de la logistique et de la distribution, expérimentée et engagée au service de vos opérations.",
    },
    {
      icon: "📊",
      title: "Suivi en temps réel",
      body: "Dispositif de vente et suivi des stocks en temps réel — visibilité totale sur votre chaîne d'approvisionnement.",
    },
  ];

  const offices = [
    { city: "Yaoundé — Gare",    tel: "(+237) 676 165 716" },
    { city: "Yaoundé — Acacias", tel: "(+237) 699 276 185" },
    { city: "Douala — Ville",    tel: "(+237) 674 879 647" },
    { city: "Douala — Bonaberi", tel: "(+237) 683 318 223" },
    { city: "Bafoussam",         tel: "(+237) 650 121 811" },
  ];

  return (
    <main>

      {/* ══ HERO ══════════════════════════════════════════ */}
      <section style={{
        minHeight: "90vh",
        display: "flex", alignItems: "center",
        background: "linear-gradient(135deg, #052e16 0%, #0a5c30 50%, #0a8348 100%)",
        padding: "6rem 2rem",
        position: "relative", overflow: "hidden",
      }}>
        <div style={{ position: "absolute", top: -120, right: -80, width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(253,218,43,0.15) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 30% 60%, rgba(10,131,72,0.3) 0%, transparent 60%)", pointerEvents: "none" }} />
        {/* Decorative wavy line — from charte */}
        <svg style={{ position: "absolute", bottom: 60, right: "10%", opacity: 0.12, pointerEvents: "none" }} width="200" height="80" viewBox="0 0 200 80" xmlns="http://www.w3.org/2000/svg">
          <path d="M10,40 C30,10 60,70 90,40 C110,20 120,55 140,40 C155,28 165,50 180,40" stroke="#0a8348" strokeWidth="3" fill="none" strokeLinecap="round"/>
          <path d="M20,60 C35,40 55,80 80,60 C95,48 105,68 120,60" stroke="#0a8348" strokeWidth="2" fill="none" strokeLinecap="round"/>
        </svg>

        <div style={{ maxWidth: 1280, margin: "0 auto", width: "100%", position: "relative" }}>
          <div style={{ maxWidth: 720 }}>
            <p style={{ color: "#fdda2b", fontSize: 11, fontWeight: 700, letterSpacing: "0.35em", textTransform: "uppercase", marginBottom: 24, fontFamily: "'Montserrat', sans-serif" }}>
              Logistique · Distribution · Cameroun
            </p>
            <h1 style={{ color: "#ffffff", fontSize: "clamp(2.8rem, 6vw, 5.5rem)", fontWeight: 900, letterSpacing: "-0.03em", lineHeight: 1.05, marginBottom: 12, fontFamily: "'Roboto', sans-serif" }}>
              Vos manuels scolaires
            </h1>
            <h1 style={{ color: "#fdda2b", fontSize: "clamp(2.8rem, 6vw, 5.5rem)", fontWeight: 900, letterSpacing: "-0.03em", lineHeight: 1.05, marginBottom: 32, fontFamily: "'Roboto', sans-serif" }}>
              partout au Cameroun
            </h1>
            <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 18, lineHeight: 1.7, marginBottom: 16, maxWidth: 560, fontFamily: "'Roboto', sans-serif" }}>
              Horeb Solutions Sarl — votre partenaire de la distribution.
            </p>
            <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 15, fontStyle: "italic", marginBottom: 48, maxWidth: 560 }}>
              Notre mission est d&apos;offrir une logistique fiable et dynamique,
              en plaçant votre succès au cœur de nos priorités.
            </p>
            <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
              <a href="#products" style={{ background: "#fdda2b", color: "#052e16", padding: "16px 36px", borderRadius: 12, fontSize: 14, fontWeight: 800, textDecoration: "none", fontFamily: "'Roboto', sans-serif" }}>
                Nos produits
              </a>
              <a href="#contact" style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.25)", color: "white", padding: "16px 36px", borderRadius: 12, fontSize: 14, fontWeight: 700, textDecoration: "none" }}>
                Nous contacter
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ══ MISSION BAR ══════════════════════════════════ */}
      <section style={{ background: "#0a8348", padding: "2rem" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", display: "flex", justifyContent: "center", alignItems: "center", gap: "3rem", flexWrap: "wrap" }}>
          <p style={{ color: "#fdda2b", fontWeight: 800, fontSize: 16, margin: 0, fontStyle: "italic", fontFamily: "'Roboto', sans-serif" }}>Fiabilité en mouvement.</p>
          <span style={{ color: "rgba(255,255,255,0.2)", fontSize: 24 }}>·</span>
          <p style={{ color: "#ffffff", fontWeight: 600, fontSize: 16, margin: 0, fontFamily: "'Roboto', sans-serif" }}>Votre logistique, notre priorité.</p>
          <span style={{ color: "rgba(255,255,255,0.2)", fontSize: 24 }}>·</span>
          <p style={{ color: "rgba(255,255,255,0.65)", fontWeight: 500, fontSize: 14, margin: 0, fontFamily: "'Montserrat', sans-serif" }}>5 agences · Yaoundé · Douala · Bafoussam</p>
        </div>
      </section>

      {/* ══ ABOUT ════════════════════════════════════════ */}
      <section id="about" style={{ padding: "8rem 2rem", background: "#ffffff" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "center" }}>
          <div>
            <p style={{ color: "#0a8348", fontSize: 11, fontWeight: 700, letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: 16, fontFamily: "'Montserrat', sans-serif" }}>Qui sommes-nous</p>
            <h2 style={{ color: "#111827", fontSize: "clamp(2rem, 4vw, 2.8rem)", fontWeight: 900, letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: 28, fontFamily: "'Roboto', sans-serif" }}>
              Votre partenaire<br />de la distribution
            </h2>
            <p style={{ color: "#374151", fontSize: 16, lineHeight: 1.85, marginBottom: 24, fontFamily: "'Roboto', sans-serif" }}>
              Notre mission est d&apos;offrir une logistique fiable et dynamique,
              en plaçant votre succès au cœur de nos priorités. Nous sommes votre
              partenaire en mouvement, garantissant l&apos;efficacité et la durabilité
              de vos opérations.
            </p>
            <div style={{ padding: "1.5rem 2rem", background: "#f0fdf4", borderRadius: 16, borderLeft: "4px solid #fdda2b" }}>
              <p style={{ color: "#0a8348", fontWeight: 700, fontSize: 16, margin: "0 0 6px", fontStyle: "italic", fontFamily: "'Roboto', sans-serif" }}>
                &ldquo;Fiabilité en mouvement.&rdquo;
              </p>
              <p style={{ color: "#6B7280", fontSize: 13, margin: 0, fontFamily: "'Roboto', sans-serif" }}>
                Votre logistique, notre priorité. — Horeb Solutions Sarl
              </p>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            {[
              { icon: "⚡", title: "Fiabilité",   desc: "Des opérations logistiques fiables, partout au Cameroun" },
              { icon: "🎯", title: "Efficacité",  desc: "Optimisation continue pour des délais de livraison maîtrisés" },
              { icon: "🤝", title: "Partenariat", desc: "Votre succès est au cœur de nos priorités" },
              { icon: "🔄", title: "Durabilité",  desc: "Des solutions logistiques durables pour votre croissance" },
            ].map((v) => (
              <div key={v.title} style={{ padding: "1.5rem", background: "#f9fafb", borderRadius: 16, border: "1px solid #e5e7eb" }}>
                <span style={{ fontSize: 28, display: "block", marginBottom: 12 }}>{v.icon}</span>
                <p style={{ color: "#111827", fontWeight: 700, fontSize: 14, margin: "0 0 6px", fontFamily: "'Roboto', sans-serif" }}>{v.title}</p>
                <p style={{ color: "#6B7280", fontSize: 12, margin: 0, fontFamily: "'Roboto', sans-serif" }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ PRODUCTS ═════════════════════════════════════ */}
      <section id="products" style={{ padding: "8rem 2rem", background: "#f0fdf4" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <p style={{ color: "#0a8348", fontSize: 11, fontWeight: 700, letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: 16, fontFamily: "'Montserrat', sans-serif" }}>Nos produits</p>
            <h2 style={{ color: "#111827", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 900, letterSpacing: "-0.03em", margin: 0, fontFamily: "'Roboto', sans-serif" }}>
              Ce que nous distribuons
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24 }}>
            {products.map((p) => (
              <div key={p.title} style={{ background: "#ffffff", borderRadius: 20, border: "1px solid #e5e7eb", overflow: "hidden", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}>
                <div style={{ height: 4, background: `linear-gradient(90deg, #0a8348, ${p.color})` }} />
                <div style={{ padding: "2rem" }}>
                  <span style={{ background: "#f0fdf4", color: "#0a8348", fontSize: 10, fontWeight: 700, padding: "3px 10px", borderRadius: 20, letterSpacing: "0.1em", textTransform: "uppercase", border: "1px solid #bbf7d0", display: "inline-block", marginBottom: 20, fontFamily: "'Montserrat', sans-serif" }}>
                    {p.tag}
                  </span>
                  <span style={{ fontSize: 32, display: "block", marginBottom: 16 }}>{p.icon}</span>
                  <h3 style={{ color: "#111827", fontWeight: 800, fontSize: 18, marginBottom: 12, fontFamily: "'Roboto', sans-serif" }}>{p.title}</h3>
                  <p style={{ color: "#6B7280", fontSize: 14, lineHeight: 1.7, margin: 0, fontFamily: "'Roboto', sans-serif" }}>{p.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ DISTRIBUTION STRENGTHS ═══════════════════════ */}
      <section id="distribution" style={{ padding: "8rem 2rem", background: "#052e16" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <p style={{ color: "#fdda2b", fontSize: 11, fontWeight: 700, letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: 16, fontFamily: "'Montserrat', sans-serif" }}>Notre force</p>
            <h2 style={{ color: "#ffffff", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 900, letterSpacing: "-0.03em", margin: 0, fontFamily: "'Roboto', sans-serif" }}>
              Une logistique nationale de qualité
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 24 }}>
            {strengths.map((s) => (
              <div key={s.title} style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(10,131,72,0.3)", borderRadius: 20, padding: "2rem" }}>
                <span style={{ fontSize: 36, display: "block", marginBottom: 20 }}>{s.icon}</span>
                <h3 style={{ color: "#fdda2b", fontWeight: 800, fontSize: 16, marginBottom: 12, fontFamily: "'Roboto', sans-serif" }}>{s.title}</h3>
                <p style={{ color: "rgba(255,255,255,0.55)", fontSize: 14, lineHeight: 1.7, margin: 0, fontFamily: "'Roboto', sans-serif" }}>{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ OFFICES ══════════════════════════════════════ */}
      <section style={{ padding: "6rem 2rem", background: "#ffffff" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <p style={{ color: "#0a8348", fontSize: 11, fontWeight: 700, letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: 16, fontFamily: "'Montserrat', sans-serif" }}>Nos agences</p>
            <h2 style={{ color: "#111827", fontSize: "clamp(1.8rem, 3vw, 2.5rem)", fontWeight: 900, letterSpacing: "-0.02em", margin: 0, fontFamily: "'Roboto', sans-serif" }}>
              Présents partout au Cameroun
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16 }}>
            {offices.map((o) => (
              <div key={o.city} style={{ padding: "1.5rem", background: "#f0fdf4", borderRadius: 16, border: "1px solid #bbf7d0", textAlign: "center" }}>
                {/* Green circle icon — brand element */}
                <div style={{ width: 36, height: 36, borderRadius: "50%", background: "#0a8348", margin: "0 auto 12px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ color: "white", fontSize: 16 }}>📍</span>
                </div>
                <p style={{ color: "#0a8348", fontWeight: 700, fontSize: 14, margin: "0 0 8px", fontFamily: "'Roboto', sans-serif" }}>{o.city}</p>
                <a href={`tel:${o.tel.replace(/\s|\(|\)/g, "")}`} style={{ color: "#374151", fontSize: 13, textDecoration: "none", fontFamily: "'Roboto', sans-serif" }}>{o.tel}</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ MGI ECOSYSTEM ════════════════════════════════ */}
      <section style={{ padding: "4rem 2rem", background: "#f9fafb", borderTop: "1px solid #e5e7eb" }}>
        <div style={{ maxWidth: 960, margin: "0 auto", textAlign: "center" }}>
          <p style={{ color: "#9CA3AF", fontSize: 11, fontWeight: 700, letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: 12, fontFamily: "'Montserrat', sans-serif" }}>Groupe MGI</p>
          <p style={{ color: "#374151", fontSize: 15, marginBottom: 24, fontFamily: "'Roboto', sans-serif" }}>
            Horeb Solutions Sarl est une entreprise du groupe{" "}
            <strong>Mina-Galeed Invest (MGI) Ltd</strong> — Start well, Grow well.
          </p>
          <a href="https://mgi-ventures.com" target="_blank" rel="noopener noreferrer" style={{ display: "inline-block", background: "#f0fdf4", border: "1px solid #bbf7d0", color: "#0a8348", padding: "10px 24px", borderRadius: 10, fontSize: 13, fontWeight: 700, textDecoration: "none", fontFamily: "'Roboto', sans-serif" }}>
            mgi-ventures.com →
          </a>
        </div>
      </section>

      {/* ══ CONTACT ══════════════════════════════════════ */}
      <section id="contact" style={{ padding: "8rem 2rem", background: "#0a8348" }}>
        <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center" }}>
          <p style={{ color: "rgba(255,255,255,0.55)", fontSize: 11, fontWeight: 700, letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: 16, fontFamily: "'Montserrat', sans-serif" }}>Contactez-nous</p>
          <h2 style={{ color: "#ffffff", fontWeight: 900, fontSize: "clamp(2rem, 4vw, 2.8rem)", letterSpacing: "-0.02em", marginBottom: 16, fontFamily: "'Roboto', sans-serif" }}>
            Parlons de vos besoins
          </h2>
          <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 16, lineHeight: 1.7, maxWidth: 480, margin: "0 auto 12px", fontFamily: "'Roboto', sans-serif" }}>
            Votre logistique, notre priorité. Contactez l&apos;agence la plus proche
            ou écrivez-nous directement.
          </p>
          <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 14, marginBottom: 48, fontStyle: "italic" }}>
            Siège social : Immeuble CCA, Marché Central Yaoundé — BP 31750
          </p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap", marginBottom: 36 }}>
            <a href="mailto:info@horebsolutions.org" style={{ background: "white", color: "#0a8348", padding: "16px 32px", borderRadius: 12, fontSize: 14, fontWeight: 700, textDecoration: "none", fontFamily: "'Roboto', sans-serif" }}>
              info@horebsolutions.org
            </a>
            <a href="tel:+237222233560" style={{ background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.25)", color: "white", padding: "16px 32px", borderRadius: 12, fontSize: 14, fontWeight: 700, textDecoration: "none" }}>
              +237 222 23 35 60
            </a>
          </div>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            {offices.map((o) => (
              <a key={o.city} href={`tel:${o.tel.replace(/\s|\(|\)/g, "")}`} style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.14)", color: "rgba(255,255,255,0.65)", padding: "8px 16px", borderRadius: 8, fontSize: 12, textDecoration: "none", fontFamily: "'Roboto', sans-serif" }}>
                {o.city}: {o.tel}
              </a>
            ))}
          </div>
        </div>
      </section>

    </main>
  );
}
