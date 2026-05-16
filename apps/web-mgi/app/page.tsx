"use client";

import React from "react";
import Image from "next/image";
import {
  MGI_META,
  MGI_SERVICES,
  MGI_VALUES,
  MGI_PARTNERS,
  MGI_CONTACT,
  MGI_VENTURES,
} from "../data/mgi-content";

/* ── Square marker — used throughout per brochure ───────── */
function Sq({ size = 14, color = "#000" }: { size?: number; color?: string }) {
  return (
    <span
      style={{
        display: "inline-block",
        width: size,
        height: size,
        background: color,
        flexShrink: 0,
        marginTop: 2,
      }}
    />
  );
}

/* ── Bullet item (green ■ prefix) ───────────────────────── */
function Bullet({ text, light = false }: { text: string; light?: boolean }) {
  return (
    <li
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: 10,
        color: light ? "rgba(255,255,255,0.92)" : "var(--mgi-text)",
        fontSize: "clamp(0.82rem, 1.8vw, 0.92rem)",
        lineHeight: 1.6,
      }}
    >
      <Sq size={10} color={light ? "var(--mgi-light)" : "var(--mgi-green)"} />
      <span>{text}</span>
    </li>
  );
}

/* ── Service block — alternating image / content ────────── */
function ServiceBlock({
  service,
  imageLeft,
  shade,
}: {
  service: (typeof MGI_SERVICES)[0];
  imageLeft: boolean;
  shade: string;
}) {
  const imgPanel = (
    <div
      className="service-img-mobile"
      style={{
        position: "relative",
        minHeight: 440,
        border: `6px solid ${shade}`,
        overflow: "hidden",
      }}
    >
      <Image
        src={service.image}
        alt={service.imageAlt}
        fill
        style={{ objectFit: "cover" }}
        sizes="(max-width: 768px) 100vw, 50vw"
      />
    </div>
  );

  const contentPanel = (
    <div
      style={{
        background: shade,
        padding: "clamp(2rem, 5vw, 3.5rem)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        minHeight: 440,
      }}
    >
      {/* Heading with black square marker */}
      <div style={{ display: "flex", alignItems: "flex-start", gap: 12, marginBottom: "1.25rem" }}>
        <Sq size={16} color="#000" />
        <h3
          style={{
            color: "#fff",
            fontWeight: 900,
            fontSize: "clamp(1.3rem, 3vw, 1.75rem)",
            lineHeight: 1.15,
            margin: 0,
          }}
        >
          {service.title}
        </h3>
      </div>

      {/* Description */}
      <p
        style={{
          color: "rgba(255,255,255,0.88)",
          fontSize: "clamp(0.85rem, 1.8vw, 0.95rem)",
          lineHeight: 1.75,
          marginBottom: "1.5rem",
        }}
      >
        {service.description}
      </p>

      {/* Bullets */}
      <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
        {service.bullets.map((b) => (
          <Bullet key={b} text={b} light />
        ))}
      </ul>
    </div>
  );

  return (
    <div
      className="service-block"
      style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}
    >
      {imageLeft ? imgPanel : contentPanel}
      {imageLeft ? contentPanel : imgPanel}
    </div>
  );
}

/* ── Venture card ────────────────────────────────────────── */
function VentureCard({ v }: { v: (typeof MGI_VENTURES)[0] }) {
  const [imgFailed, setImgFailed] = React.useState(false);
  const href = "externalLink" in v && v.externalLink ? v.externalLink : `https://${v.domain}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: "flex",
        flexDirection: "column",
        background: `linear-gradient(145deg, ${v.color}35 0%, #161e1a 100%)`,
        border: `1px solid ${v.color}50`,
        borderRadius: 16,
        overflow: "hidden",
        textDecoration: "none",
        transition: "transform 0.3s",
      }}
    >
      <div style={{ height: 3, background: `linear-gradient(90deg, ${v.color}, ${v.accent})` }} />
      <div style={{ padding: "1.5rem", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", flex: 1 }}>
        {imgFailed ? (
          <div style={{ width: 80, height: 80, borderRadius: 12, background: `${v.color}25`, border: `1px solid ${v.color}40`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1rem" }}>
            <span style={{ color: v.accent, fontWeight: 700, fontSize: 18 }}>{v.initials}</span>
          </div>
        ) : (
          <div style={{ width: 80, height: 80, borderRadius: 12, background: `${v.color}20`, border: `1px solid ${v.color}35`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1rem", overflow: "hidden" }}>
            <img src={v.logo} alt={v.initials} width={60} height={60} style={{ objectFit: "contain" }} onError={() => setImgFailed(true)} />
          </div>
        )}
        <p style={{ color: v.accent, fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: 6 }}>{v.tag}</p>
        <h3 style={{ color: "#f4f7f5", fontWeight: 800, fontSize: 15, marginBottom: 6 }}>{v.name}</h3>
        <p style={{ color: "rgba(244,247,245,0.35)", fontSize: 11, fontStyle: "italic" }}>&ldquo;{v.tagline}&rdquo;</p>
      </div>
    </a>
  );
}

/* ══ PAGE ════════════════════════════════════════════════════ */
export default function Home() {
  const shades = [
    "var(--mgi-block-1)",
    "var(--mgi-block-2)",
    "var(--mgi-block-3)",
    "var(--mgi-block-4)",
    "var(--mgi-block-5)",
    "var(--mgi-block-6)",
    "var(--mgi-block-7)",
  ];

  return (
    <main style={{ overflowX: "hidden" }}>

      {/* ══ 1. HERO ════════════════════════════════════════════ */}
      <section id="accueil">
        {/* Two-column hero */}
        <div
          className="hero-grid"
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}
        >
          {/* Left — brand content */}
          <div
            style={{
              background: "linear-gradient(155deg, #e4f1e8 0%, #d0e8d7 100%)",
              padding: "clamp(3rem,6vw,5rem) clamp(2rem,5vw,4rem)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              minHeight: "clamp(480px,60vh,700px)",
            }}
          >
            {/* Logo row */}
            <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: "clamp(1.5rem,3vw,2.5rem)" }}>
              <Image
                src="/logos/mgi-main.png"
                alt="Mina-Galeed Invest"
                width={90}
                height={90}
                style={{ objectFit: "contain" }}
                priority
              />
              <div>
                <p style={{ color: "var(--mgi-dark)", fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", margin: 0 }}>
                  MINA-GALEED INVEST
                </p>
                <p style={{ color: "var(--mgi-muted)", fontSize: 10, margin: "2px 0 0" }}>
                  {MGI_META.since}
                </p>
              </div>
            </div>

            {/* Headline */}
            <h1
              style={{
                color: "var(--mgi-text)",
                fontWeight: 900,
                fontSize: "clamp(2rem,5vw,3.6rem)",
                lineHeight: 1.05,
                letterSpacing: "-0.02em",
                marginBottom: "1rem",
              }}
            >
              Start well,
              <br />
              <span style={{ color: "var(--mgi-green)" }}>Grow well.</span>
            </h1>

            <p style={{ color: "var(--mgi-dark)", fontWeight: 700, fontSize: "clamp(0.9rem,2vw,1.05rem)", marginBottom: "0.75rem" }}>
              {MGI_META.positioning}
            </p>

            <p
              style={{
                color: "var(--mgi-muted)",
                fontSize: "clamp(0.85rem,1.8vw,0.95rem)",
                lineHeight: 1.75,
                marginBottom: "2rem",
                maxWidth: 480,
              }}
            >
              {MGI_META.descriptionLong}
            </p>

            {/* CTAs */}
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <a
                href="#expertise"
                style={{
                  background: "var(--mgi-green)",
                  color: "#fff",
                  padding: "clamp(11px,2vw,14px) clamp(20px,4vw,28px)",
                  borderRadius: 6,
                  fontWeight: 700,
                  textDecoration: "none",
                  fontSize: "clamp(0.85rem,2vw,0.95rem)",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  minHeight: 44,
                }}
              >
                Découvrir nos expertises →
              </a>
              <a
                href="#contact"
                style={{
                  border: "2px solid var(--mgi-green)",
                  color: "var(--mgi-green)",
                  padding: "clamp(9px,2vw,12px) clamp(18px,4vw,26px)",
                  borderRadius: 6,
                  fontWeight: 700,
                  textDecoration: "none",
                  fontSize: "clamp(0.85rem,2vw,0.95rem)",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  minHeight: 44,
                  background: "transparent",
                }}
              >
                Demander un accompagnement
              </a>
            </div>

            <p style={{ color: "var(--mgi-muted)", fontSize: 12, marginTop: "1.75rem" }}>
              🌐 {MGI_META.website}
            </p>
          </div>

          {/* Right — hero photo */}
          <div style={{ position: "relative", minHeight: "clamp(360px,50vw,700px)", overflow: "hidden" }}>
            <Image
              src="/mgi-images/hero.jpeg"
              alt="Conseil et accompagnement des entreprises — Mina-Galeed Invest"
              fill
              style={{ objectFit: "cover" }}
              priority
              sizes="50vw"
            />
            {/* White inner frame overlay */}
            <div
              style={{
                position: "absolute",
                inset: 20,
                border: "3px solid rgba(255,255,255,0.55)",
                borderRadius: 10,
                pointerEvents: "none",
              }}
            />
          </div>
        </div>

        {/* Bottom identity strip */}
        <div
          style={{
            background: "var(--mgi-dark)",
            padding: "clamp(2rem,4vw,3rem) clamp(1.5rem,4vw,3rem)",
            textAlign: "center",
          }}
        >
          <h2
            style={{
              color: "#fff",
              fontWeight: 900,
              fontSize: "clamp(1.5rem,4vw,2.5rem)",
              letterSpacing: "-0.01em",
              marginBottom: "0.4rem",
            }}
          >
            Mina-Galeed Invest Ltd.
          </h2>
          <p style={{ color: "var(--mgi-light)", fontWeight: 600, marginBottom: "0.35rem", fontSize: "clamp(0.95rem,2vw,1.1rem)" }}>
            {MGI_META.positioning}
          </p>
          <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 13, marginBottom: "1.5rem" }}>
            https://www.mina-galeed.com
          </p>
          <div style={{ display: "flex", gap: 24, justifyContent: "center", flexWrap: "wrap" }}>
            <a
              href={MGI_CONTACT.facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "rgba(255,255,255,0.5)", display: "flex", alignItems: "center", gap: 6, fontSize: 12, textDecoration: "none" }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
              {MGI_CONTACT.facebook}
            </a>
            <a
              href={MGI_CONTACT.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "rgba(255,255,255,0.5)", display: "flex", alignItems: "center", gap: 6, fontSize: 12, textDecoration: "none" }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
              {MGI_CONTACT.linkedin}
            </a>
          </div>
        </div>
      </section>

      {/* ══ 2. QUI SOMMES-NOUS ═════════════════════════════════ */}
      <section id="about" style={{ background: "#fff", padding: "clamp(3rem,6vw,6rem) clamp(1rem,4vw,2rem)" }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <div
            style={{
              background: "var(--mgi-dark)",
              borderRadius: 18,
              padding: "clamp(2rem,5vw,3.5rem)",
              textAlign: "center",
              border: "3px solid var(--mgi-green)",
            }}
          >
            {/* Heading with black square */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 14, marginBottom: "1.5rem" }}>
              <Sq size={18} color="#000" />
              <h2
                style={{
                  color: "#fff",
                  fontWeight: 900,
                  fontSize: "clamp(1.4rem,3.5vw,2rem)",
                  margin: 0,
                }}
              >
                Qui sommes-nous ?
              </h2>
            </div>
            <p
              style={{
                color: "rgba(255,255,255,0.88)",
                fontSize: "clamp(0.95rem,2.2vw,1.1rem)",
                lineHeight: 1.85,
                maxWidth: 560,
                margin: "0 auto",
              }}
            >
              {MGI_META.description}
            </p>
            <p
              style={{
                color: "var(--mgi-light)",
                fontSize: "clamp(0.85rem,2vw,0.95rem)",
                marginTop: "1.25rem",
                fontStyle: "italic",
              }}
            >
              Depuis 2019 · Yaoundé, Cameroun · {MGI_META.website}
            </p>
          </div>
        </div>
      </section>

      {/* ══ 3. NOTRE SLOGAN / NOS VALEURS / NOS ATOUTS ═════════ */}
      <section
        style={{
          background: "var(--mgi-pale)",
          padding: "clamp(3rem,6vw,6rem) clamp(1rem,4vw,2rem)",
        }}
      >
        <div
          className="values-grid"
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1fr 1.6fr 1.2fr",
            gap: "clamp(1.5rem,4vw,3rem)",
            alignItems: "start",
          }}
        >
          {/* Col 1 — Notre slogan */}
          <div>
            <div
              style={{
                background: "var(--mgi-green)",
                borderRadius: 16,
                padding: "2rem 1.5rem",
                textAlign: "center",
              }}
            >
              <p
                style={{
                  color: "rgba(255,255,255,0.6)",
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  marginBottom: "1rem",
                }}
              >
                Notre slogan
              </p>
              <p
                style={{
                  color: "#fff",
                  fontWeight: 900,
                  fontSize: "clamp(1.1rem,2.5vw,1.4rem)",
                  lineHeight: 1.3,
                  fontStyle: "italic",
                }}
              >
                {MGI_VALUES.slogan}
              </p>
            </div>
          </div>

          {/* Col 2 — Nos Valeurs + Cinq raisons */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.75rem" }}>
            {/* Valeurs */}
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: "1rem" }}>
                <span style={{ fontSize: 18 }}>👆</span>
                <h3
                  style={{
                    color: "var(--mgi-green)",
                    fontWeight: 800,
                    fontSize: "clamp(1rem,2.5vw,1.2rem)",
                    margin: 0,
                  }}
                >
                  Nos Valeurs
                </h3>
              </div>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 8 }}>
                {MGI_VALUES.valeurs.map((v) => (
                  <Bullet key={v} text={v} />
                ))}
              </ul>
            </div>

            {/* Cinq raisons */}
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: "1rem" }}>
                <span style={{ fontSize: 18 }}>👆</span>
                <h3
                  style={{
                    color: "var(--mgi-green)",
                    fontWeight: 800,
                    fontSize: "clamp(1rem,2.5vw,1.2rem)",
                    margin: 0,
                  }}
                >
                  Cinq raisons de nous choisir
                </h3>
              </div>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 8 }}>
                {MGI_VALUES.raisons.map((r) => (
                  <Bullet key={r} text={r} />
                ))}
              </ul>
            </div>
          </div>

          {/* Col 3 — Nos atouts */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: "1rem" }}>
              <span style={{ fontSize: 18 }}>👆</span>
              <h3
                style={{
                  color: "var(--mgi-green)",
                  fontWeight: 800,
                  fontSize: "clamp(1rem,2.5vw,1.2rem)",
                  margin: 0,
                }}
              >
                Nos atouts
              </h3>
            </div>
            <p style={{ color: "var(--mgi-muted)", fontSize: "clamp(0.82rem,1.8vw,0.9rem)", lineHeight: 1.65, marginBottom: "1rem" }}>
              {MGI_VALUES.atoutsIntro}
            </p>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 12 }}>
              {MGI_VALUES.atouts.map((a) => (
                <li key={a.label} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                  <Sq size={10} color="var(--mgi-green)" />
                  <span style={{ fontSize: "clamp(0.82rem,1.8vw,0.9rem)", color: "var(--mgi-text)", lineHeight: 1.6 }}>
                    <strong style={{ color: "var(--mgi-green)" }}>{a.label} :</strong>{" "}
                    {a.desc}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ══ 4. EXPERTISE HEADER BLOCK ══════════════════════════ */}
      <section
        id="expertise"
        style={{
          background: "var(--mgi-dark)",
          padding: "clamp(3rem,5vw,5rem) clamp(1.5rem,4vw,3rem)",
        }}
      >
        <div
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "1.5rem",
          }}
        >
          <div>
            <h2
              style={{
                color: "#fff",
                fontWeight: 900,
                fontSize: "clamp(1.8rem,5vw,3.5rem)",
                lineHeight: 1.0,
                margin: 0,
                letterSpacing: "-0.02em",
                textTransform: "uppercase",
              }}
            >
              NOS DOMAINES
              <br />
              D&rsquo;EXPERTISE
            </h2>
          </div>
          <div style={{ flexShrink: 0 }}>
            <Image
              src="/logos/mgi-main.png"
              alt="MGI"
              width={80}
              height={80}
              style={{ objectFit: "contain", opacity: 0.9 }}
            />
          </div>
        </div>
      </section>

      {/* ══ 5. 7 SERVICE BLOCKS ════════════════════════════════ */}
      <section>
        {MGI_SERVICES.map((service, i) => (
          <ServiceBlock
            key={service.id}
            service={service}
            imageLeft={i % 2 === 0}
            shade={shades[i]}
          />
        ))}
      </section>

      {/* ══ 6. NOUS FONT CONFIANCE ═════════════════════════════ */}
      <section
        id="partenaires"
        style={{ background: "#fff" }}
      >
        <div
          className="partners-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 3fr",
            minHeight: 380,
          }}
        >
          {/* Green title panel */}
          <div
            style={{
              background: "var(--mgi-dark)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "clamp(2.5rem,5vw,4rem) clamp(1.5rem,4vw,3rem)",
            }}
          >
            <h2
              style={{
                color: "#fff",
                fontWeight: 900,
                fontSize: "clamp(1.6rem,4vw,2.8rem)",
                lineHeight: 1.1,
                textAlign: "center",
                textTransform: "uppercase",
                letterSpacing: "-0.01em",
                margin: 0,
              }}
            >
              NOUS FONT
              <br />
              CONFIANCE
            </h2>
          </div>

          {/* Logo grid */}
          <div
            style={{
              padding: "clamp(2rem,5vw,4rem)",
              display: "flex",
              alignItems: "center",
              border: "1px solid #e5e7eb",
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "clamp(1rem,3vw,2rem)",
                width: "100%",
              }}
            >
              {MGI_PARTNERS.map((partner) => (
                <div
                  key={partner.name}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "clamp(0.75rem,2vw,1.25rem)",
                    border: "1px solid #e5e7eb",
                    borderRadius: 8,
                    minHeight: 90,
                  }}
                >
                  <Image
                    src={partner.logo}
                    alt={partner.name}
                    width={110}
                    height={70}
                    style={{ objectFit: "contain" }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ 7. NOS VENTURES (bottom) ═══════════════════════════ */}
      <section
        id="ventures"
        style={{
          background: "#0c1015",
          padding: "clamp(3.5rem,6vw,6rem) clamp(1rem,4vw,2rem)",
        }}
      >
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          {/* Header */}
          <div style={{ marginBottom: "clamp(2rem,4vw,3.5rem)" }}>
            <p
              style={{
                color: "var(--mgi-light)",
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                marginBottom: "0.5rem",
              }}
            >
              Écosystème MGI
            </p>
            <h2
              style={{
                color: "#f4f7f5",
                fontWeight: 900,
                fontSize: "clamp(1.5rem,4vw,2.5rem)",
                letterSpacing: "-0.02em",
                marginBottom: "0.5rem",
              }}
            >
              Nos Ventures
            </h2>
            <p style={{ color: "rgba(244,247,245,0.4)", fontSize: 13 }}>
              7 entreprises · 5 secteurs · Un même écosystème
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: 18,
            }}
          >
            {MGI_VENTURES.map((v) => (
              <VentureCard key={v.domain} v={v} />
            ))}
          </div>

          {/* Executive OS CTA */}
          <div
            style={{
              marginTop: "2rem",
              padding: "clamp(1.5rem,3vw,2rem) clamp(1.5rem,4vw,2.5rem)",
              borderRadius: 14,
              background: "rgba(11,148,68,0.12)",
              border: "1px solid rgba(11,148,68,0.3)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "1rem",
            }}
          >
            <div>
              <p style={{ color: "#f4f7f5", fontWeight: 700, fontSize: 15, margin: "0 0 4px" }}>
                MGI Executive OS
              </p>
              <p style={{ color: "rgba(244,247,245,0.45)", fontSize: 13, margin: 0 }}>
                Tableau de bord centralisé pour la gestion de l&apos;écosystème MGI.
              </p>
            </div>
            <a
              href="https://os.mgi-ventures.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: "var(--mgi-green)",
                color: "#fff",
                padding: "10px 22px",
                borderRadius: 8,
                fontWeight: 700,
                fontSize: 13,
                textDecoration: "none",
                flexShrink: 0,
              }}
            >
              Accéder à Executive OS →
            </a>
          </div>
        </div>
      </section>

      {/* ══ 8. CONTACT / FOOTER ════════════════════════════════ */}
      <footer
        id="contact"
        style={{
          background: "var(--mgi-dark)",
          padding: "clamp(3rem,6vw,5rem) clamp(1rem,4vw,2rem)",
        }}
      >
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          {/* Heading */}
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: "clamp(2rem,4vw,3rem)" }}>
            <Sq size={18} color="#000" />
            <h2
              style={{
                color: "#fff",
                fontWeight: 900,
                fontSize: "clamp(1.5rem,4vw,2.2rem)",
                margin: 0,
              }}
            >
              Nos contacts
            </h2>
          </div>

          {/* Contact icon grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
              gap: "clamp(1.25rem,3vw,2rem)",
              marginBottom: "clamp(2rem,4vw,3rem)",
            }}
          >
            {[
              { icon: "📍", label: "Siège social", value: MGI_CONTACT.siege, href: undefined },
              { icon: "📮", label: "Boîte postale", value: MGI_CONTACT.bp, href: undefined },
              { icon: "📞", label: "Téléphone", value: MGI_CONTACT.phone, href: MGI_CONTACT.phoneTel },
              { icon: "📧", label: "Email", value: MGI_CONTACT.email, href: MGI_CONTACT.emailLink },
              { icon: "🌐", label: "Site web", value: MGI_CONTACT.website, href: MGI_CONTACT.websiteUrl },
            ].map((item) => (
              <div key={item.label} style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ fontSize: 20 }}>{item.icon}</span>
                  <span
                    style={{
                      color: "var(--mgi-light)",
                      fontSize: 10,
                      fontWeight: 700,
                      textTransform: "uppercase",
                      letterSpacing: "0.12em",
                    }}
                  >
                    {item.label}
                  </span>
                </div>
                {item.href ? (
                  <a
                    href={item.href}
                    style={{
                      color: "rgba(255,255,255,0.75)",
                      fontSize: "clamp(0.82rem,1.8vw,0.9rem)",
                      textDecoration: "none",
                      lineHeight: 1.5,
                    }}
                  >
                    {item.value}
                  </a>
                ) : (
                  <span
                    style={{
                      color: "rgba(255,255,255,0.65)",
                      fontSize: "clamp(0.82rem,1.8vw,0.9rem)",
                      lineHeight: 1.5,
                    }}
                  >
                    {item.value}
                  </span>
                )}
              </div>
            ))}
          </div>

          {/* Bottom bar */}
          <div
            style={{
              borderTop: "1px solid rgba(255,255,255,0.08)",
              paddingTop: "1.75rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "1rem",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <Image
                src="/logos/mgi-main.png"
                alt="MGI"
                width={32}
                height={32}
                style={{ objectFit: "contain", opacity: 0.8 }}
              />
              <p style={{ color: "rgba(255,255,255,0.3)", fontSize: 12, margin: 0 }}>
                © {new Date().getFullYear()} Mina-Galeed Invest (MGI) Ltd · Tous droits réservés
              </p>
            </div>

            <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
              <a
                href={MGI_CONTACT.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "rgba(255,255,255,0.35)", display: "flex", alignItems: "center", gap: 6, fontSize: 12, textDecoration: "none" }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
                LinkedIn
              </a>
              <a
                href={MGI_CONTACT.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "rgba(255,255,255,0.35)", display: "flex", alignItems: "center", gap: 6, fontSize: 12, textDecoration: "none" }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
                Facebook
              </a>
            </div>
          </div>
        </div>
      </footer>

    </main>
  );
}
