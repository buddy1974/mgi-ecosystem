"use client";
import { useState } from "react";

const links = [
  { label: "Accueil", href: "/" },
  { label: "À propos", href: "#a-propos" },
  { label: "Services", href: "#services" },
  { label: "Réseau", href: "#reseau" },
  { label: "Agences", href: "#agences" },
  { label: "Contact", href: "#contact" },
];

export default function MobileNav() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        style={{ display: "flex", flexDirection: "column", gap: 5, padding: 10, background: "transparent", border: "none", cursor: "pointer" }}
        className="md:hidden"
        aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
      >
        {[
          open ? "rotate(45deg) translate(5px, 5px)" : "none",
          "none",
          open ? "rotate(-45deg) translate(5px, -5px)" : "none",
        ].map((transform, i) => (
          <span
            key={i}
            style={{
              display: "block",
              width: 22,
              height: 2,
              background: "var(--horeb-yellow)",
              transition: "all 0.3s",
              transform,
              opacity: i === 1 && open ? 0 : 1,
            }}
          />
        ))}
      </button>

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
            gap: 32,
          }}
          className="md:hidden"
        >
          <button
            onClick={() => setOpen(false)}
            style={{ position: "absolute", top: 24, right: 24, background: "transparent", border: "none", color: "var(--horeb-yellow)", fontSize: 28, cursor: "pointer", lineHeight: 1 }}
            aria-label="Fermer le menu"
          >
            ✕
          </button>
          <span style={{ color: "var(--horeb-yellow)", fontSize: 18, fontWeight: 900, fontFamily: "'Montserrat', sans-serif", marginBottom: 8 }}>
            Horeb Solutions
          </span>
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setOpen(false)}
              style={{ color: "rgba(255,255,255,0.88)", fontSize: 26, fontWeight: 600, textDecoration: "none", letterSpacing: "0.03em", fontFamily: "'Montserrat', sans-serif" }}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: "var(--horeb-yellow)",
              color: "var(--horeb-deep-green)",
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
            Nous contacter →
          </a>
        </div>
      )}
    </>
  );
}
