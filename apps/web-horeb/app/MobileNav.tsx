"use client";
import { useState } from "react";

const links = [
  { label: "Accueil", href: "/" },
  { label: "Services", href: "#services" },
  { label: "À propos", href: "#a-propos" },
  { label: "Agences", href: "#agences" },
  { label: "Partenaires", href: "#partenaires" },
  { label: "Contact", href: "#contact" },
];

export default function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Hamburger button — mobile only */}
      <button
        onClick={() => setOpen(!open)}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 5,
          padding: 8,
          background: "transparent",
          border: "none",
          cursor: "pointer",
        }}
        className="md:hidden"
        aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
      >
        <span
          style={{
            display: "block",
            width: 22,
            height: 2,
            background: "var(--horeb-yellow)",
            transition: "all 0.3s",
            transform: open ? "rotate(45deg) translate(5px, 5px)" : "none",
          }}
        />
        <span
          style={{
            display: "block",
            width: 22,
            height: 2,
            background: "var(--horeb-yellow)",
            transition: "all 0.3s",
            opacity: open ? 0 : 1,
          }}
        />
        <span
          style={{
            display: "block",
            width: 22,
            height: 2,
            background: "var(--horeb-yellow)",
            transition: "all 0.3s",
            transform: open ? "rotate(-45deg) translate(5px, -5px)" : "none",
          }}
        />
      </button>

      {/* Slide-in overlay */}
      {open && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "var(--horeb-dark-green)",
            zIndex: 999,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 36,
          }}
          className="md:hidden"
        >
          {/* Close button */}
          <button
            onClick={() => setOpen(false)}
            style={{
              position: "absolute",
              top: 24,
              right: 24,
              background: "transparent",
              border: "none",
              color: "var(--horeb-yellow)",
              fontSize: 28,
              cursor: "pointer",
              lineHeight: 1,
            }}
            aria-label="Fermer le menu"
          >
            ✕
          </button>

          {/* Logo mark in overlay */}
          <div style={{ marginBottom: 8 }}>
            <span style={{ color: "var(--horeb-yellow)", fontSize: 22, fontWeight: 900, fontFamily: "'Montserrat', sans-serif" }}>
              Horeb Solutions
            </span>
          </div>

          {/* Nav links */}
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setOpen(false)}
              style={{
                color: "rgba(255,255,255,0.85)",
                fontSize: 26,
                fontWeight: 600,
                textDecoration: "none",
                letterSpacing: "0.03em",
                fontFamily: "'Montserrat', sans-serif",
              }}
            >
              {link.label}
            </a>
          ))}

          {/* CTA */}
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: "var(--horeb-yellow)",
              color: "var(--horeb-dark-green)",
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 800,
              fontSize: 16,
              padding: "14px 32px",
              borderRadius: 999,
              textDecoration: "none",
              minHeight: 48,
              marginTop: 8,
            }}
          >
            Commander →
          </a>
        </div>
      )}
    </>
  );
}
