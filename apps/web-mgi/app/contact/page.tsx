import Link from "next/link";

export const metadata = {
  title: "Contact — Mina-Galeed Invest (MGI) Ltd",
  description:
    "Contact Mina-Galeed Invest. Reach us by phone, email, or visit our offices in Biyem-Assi, Yaoundé, Cameroun.",
};

export default function ContactPage() {
  return (
    <main>
      <div className="h-16" />

      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="py-28 px-8" style={{ background: "linear-gradient(160deg, #0d1f10 0%, #111a0d 40%, #131508 100%)" }}>
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xs font-bold tracking-[0.3em] uppercase mb-4" style={{ color: "#4ade80" }}>Get in Touch</p>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-6" style={{ color: "#f4f7f5" }}>Contact MGI</h1>
          <p className="text-base leading-relaxed" style={{ color: "rgba(244,247,245,0.55)" }}>
            We start every engagement with a free situational analysis.
            Reach out — our team will identify exactly where MGI expertise can
            make the biggest impact for your business.
          </p>
        </div>
      </section>

      {/* ── CONTACT CARDS ────────────────────────────────── */}
      <section className="py-24 px-8" style={{ background: "#ffffff" }}>
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {[
              { icon: "📞", label: "Phone",  primary: "(+237) 699 81 25 13",  secondary: "Mon – Fri, 8h – 18h",      href: "tel:+237699812513",                                               cta: "Call Now"       },
              { icon: "✉️", label: "Email",  primary: "info@mgi-ventures.com", secondary: "We respond within 24 hours", href: "mailto:info@mgi-ventures.com",                                    cta: "Send Email"     },
              { icon: "📍", label: "Office", primary: "Biyem-Assi, Yaoundé",  secondary: "Cameroun · BP 30374",       href: "https://maps.google.com/?q=Biyem-Assi,Yaounde,Cameroon",         cta: "Get Directions" },
            ].map((c) => (
              <div key={c.label} className="rounded-2xl p-8 flex flex-col items-center text-center" style={{ background: "#f9fafb", border: "1px solid #e5e7eb" }}>
                <span className="text-4xl mb-4">{c.icon}</span>
                <p className="text-xs font-bold uppercase tracking-[0.2em] mb-2" style={{ color: "#0d6e36" }}>{c.label}</p>
                <p className="text-base font-bold mb-1" style={{ color: "#111827" }}>{c.primary}</p>
                <p className="text-xs mb-6" style={{ color: "#9CA3AF" }}>{c.secondary}</p>
                <a
                  href={c.href}
                  target={c.label === "Office" ? "_blank" : undefined}
                  rel={c.label === "Office" ? "noopener noreferrer" : undefined}
                  className="px-6 py-2.5 rounded-xl text-xs font-bold transition-all hover:opacity-90"
                  style={{ background: "#0d6e36", color: "white" }}
                >
                  {c.cta}
                </a>
              </div>
            ))}
          </div>

          {/* Social media */}
          <div className="rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6" style={{ background: "#f0fdf4", border: "1px solid #bbf7d0" }}>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] mb-2" style={{ color: "#0d6e36" }}>Follow MGI</p>
              <p className="text-sm" style={{ color: "#374151" }}>Stay connected with the latest updates from Mina-Galeed Invest.</p>
            </div>
            <div className="flex gap-4">
              <a href="https://www.linkedin.com/company/mina-galeed-invest" target="_blank" rel="noopener noreferrer" className="px-6 py-3 rounded-xl text-xs font-bold transition-all hover:opacity-80" style={{ background: "#0077b5", color: "white" }}>
                LinkedIn
              </a>
              <a href="https://www.facebook.com/minagaleedinvest" target="_blank" rel="noopener noreferrer" className="px-6 py-3 rounded-xl text-xs font-bold transition-all hover:opacity-80" style={{ background: "#1877f2", color: "white" }}>
                Facebook
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHAT TO EXPECT ───────────────────────────────── */}
      <section className="py-20 px-8" style={{ background: "#f0f7f2" }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-bold tracking-[0.3em] uppercase mb-3" style={{ color: "#0d6e36" }}>Our Process</p>
            <h2 className="text-2xl font-black tracking-tight" style={{ color: "#111827" }}>What Happens When You Contact Us</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { step: "1", title: "Initial Contact",       body: "You reach out by phone or email. We respond within 24 hours." },
              { step: "2", title: "Situational Analysis",  body: "We conduct a free analysis of your business situation and needs." },
              { step: "3", title: "Proposal",              body: "We present a tailored proposal outlining the domains and services that apply to you." },
              { step: "4", title: "Engagement",            body: "We begin the mission with a clear scope, timeline, and measurable outcomes." },
            ].map((s) => (
              <div key={s.step} className="text-center">
                <div className="w-12 h-12 rounded-full flex items-center justify-center text-lg font-black mx-auto mb-4" style={{ background: "#0d6e36", color: "white" }}>
                  {s.step}
                </div>
                <h3 className="text-sm font-bold mb-2" style={{ color: "#111827" }}>{s.title}</h3>
                <p className="text-xs leading-relaxed" style={{ color: "#6B7280" }}>{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BACK TO HOME ─────────────────────────────────── */}
      <section className="py-12 px-8 text-center" style={{ background: "#ffffff" }}>
        <Link href="/" className="text-sm font-medium transition-colors hover:opacity-70" style={{ color: "#0d6e36" }}>
          ← Back to mgi-ventures.com
        </Link>
      </section>
    </main>
  );
}
