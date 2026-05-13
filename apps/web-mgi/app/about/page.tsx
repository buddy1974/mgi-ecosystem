import Link from "next/link";

export const metadata = {
  title: "About — Mina-Galeed Invest (MGI) Ltd",
  description:
    "A holding company that accompanies businesses through their development cycles. At the heart of SME performance since 2019.",
};

export default function AboutPage() {
  return (
    <main>
      {/* ── NAV SPACER ───────────────────────────────────── */}
      <div className="h-16" />

      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="py-28 px-8" style={{ background: "linear-gradient(160deg, #0d1f10 0%, #111a0d 40%, #131508 100%)" }}>
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xs font-bold tracking-[0.3em] uppercase mb-4" style={{ color: "#4ade80" }}>
            About MGI
          </p>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-6" style={{ color: "#f4f7f5" }}>
            Mina-Galeed Invest (MGI) Ltd
          </h1>
          <p className="text-xl font-medium mb-4" style={{ color: "rgba(244,247,245,0.7)" }}>
            At the Heart of SME Performance
          </p>
          <p className="text-base leading-relaxed max-w-2xl mx-auto" style={{ color: "rgba(244,247,245,0.5)" }}>
            A holding company that accompanies businesses through their development cycles.
            Since 2019, empowering SMEs across Cameroon with expert advisory,
            operational support, and technology solutions.
          </p>
        </div>
      </section>

      {/* ── WHO WE ARE ───────────────────────────────────── */}
      <section className="py-24 px-8" style={{ background: "#ffffff" }}>
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-xs font-bold tracking-[0.3em] uppercase mb-3" style={{ color: "#0d6e36" }}>Our Mission</p>
            <h2 className="text-3xl font-black tracking-tight mb-6" style={{ color: "#111827" }}>Start well. Grow well.</h2>
            <p className="text-base leading-relaxed mb-4" style={{ color: "#374151" }}>
              Mina-Galeed Invest (MGI) Ltd is a holding company founded in Yaoundé, Cameroun in 2019
              with a clear mission: to accompany businesses through every stage of their development cycle.
            </p>
            <p className="text-base leading-relaxed mb-4" style={{ color: "#374151" }}>
              We combine highly qualified human expertise, proven methodologies, and
              cutting-edge technology to deliver a comprehensive, end-to-end support
              system for SMEs seeking to build solid foundations and accelerate growth.
            </p>
            <p className="text-base leading-relaxed" style={{ color: "#374151" }}>
              From legal structuring at creation to digital transformation at scale,
              our multidisciplinary teams conduct in-depth situational analyses to
              deliver tailored, measurable, and results-oriented solutions.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: "Founded",  value: "2019"     },
              { label: "Domains",  value: "7"        },
              { label: "Ventures", value: "6"        },
              { label: "Location", value: "Yaoundé"  },
              { label: "Country",  value: "Cameroun" },
              { label: "Slogan",   value: "Start well" },
            ].map((s) => (
              <div key={s.label} className="rounded-2xl p-5 text-center" style={{ background: "#f0fdf4", border: "1px solid #bbf7d0" }}>
                <p className="text-xl font-black mb-1" style={{ color: "#0d6e36" }}>{s.value}</p>
                <p className="text-xs" style={{ color: "#6B7280" }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── VALUES ───────────────────────────────────────── */}
      <section className="py-24 px-8" style={{ background: "#f0f7f2" }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-xs font-bold tracking-[0.3em] uppercase mb-3" style={{ color: "#0d6e36" }}>Our Foundation</p>
            <h2 className="text-3xl font-black tracking-tight" style={{ color: "#111827" }}>Our Values</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { value: "Integrity",       icon: "⚖️", description: "We operate with the highest standards of honesty and ethical conduct in every engagement." },
              { value: "Excellence",      icon: "★",  description: "We hold ourselves to the highest professional standards, delivering quality in every domain." },
              { value: "Confidentiality", icon: "🔒", description: "Client information and business intelligence are handled with absolute discretion." },
              { value: "Innovation",      icon: "◈",  description: "We continuously evolve our methods and tools to meet the challenges of a fast-changing business environment." },
            ].map((v) => (
              <div key={v.value} className="rounded-2xl p-7" style={{ background: "#ffffff", border: "1px solid #e5e7eb" }}>
                <span className="text-3xl mb-4 block">{v.icon}</span>
                <h3 className="text-lg font-black mb-3" style={{ color: "#111827" }}>{v.value}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "#6B7280" }}>{v.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5 REASONS ────────────────────────────────────── */}
      <section className="py-24 px-8" style={{ background: "#ffffff" }}>
        <div className="max-w-7xl mx-auto">
          <div className="mb-14">
            <p className="text-xs font-bold tracking-[0.3em] uppercase mb-3" style={{ color: "#0d6e36" }}>Why MGI</p>
            <h2 className="text-3xl font-black tracking-tight" style={{ color: "#111827" }}>5 Reasons to Choose Us</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {[
              { n: "01", title: "A Tailored Approach",      desc: "We analyze your specific situation before prescribing any solution. No templates — only what fits your reality." },
              { n: "02", title: "Cutting-Edge Technologies", desc: "We leverage the latest enterprise tools and platforms to deliver modern, scalable solutions." },
              { n: "03", title: "End-to-End Support",        desc: "From the first analysis to implementation and follow-up, we stay with you throughout the journey." },
              { n: "04", title: "Measurable Impact",         desc: "Every engagement is designed around clear, quantifiable outcomes your business can track." },
              { n: "05", title: "Results-Driven Evaluation", desc: "We evaluate results, not effort. Our success is measured by yours." },
            ].map((r) => (
              <div key={r.n} className="rounded-2xl p-6 flex flex-col" style={{ background: "#f9fafb", border: "1px solid #e5e7eb" }}>
                <span className="text-3xl font-black mb-4" style={{ color: "#d1fae5" }}>{r.n}</span>
                <h3 className="text-sm font-black mb-2" style={{ color: "#111827" }}>{r.title}</h3>
                <p className="text-xs leading-relaxed" style={{ color: "#6B7280" }}>{r.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── OUR STRENGTHS ────────────────────────────────── */}
      <section className="py-24 px-8" style={{ background: "#f0f7f2" }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-xs font-bold tracking-[0.3em] uppercase mb-3" style={{ color: "#0d6e36" }}>Our Assets</p>
            <h2 className="text-3xl font-black tracking-tight" style={{ color: "#111827" }}>What Makes MGI Different</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: "👥", title: "Human Resources",            body: "Highly qualified experts in each domain, selected for their deep sector knowledge and operational experience." },
              { icon: "🔍", title: "Our Methods",                body: "We conduct a thorough situational analysis before every engagement — to identify your real needs, not assumed ones." },
              { icon: "⚡", title: "Technology & Infrastructure", body: "State-of-the-art material and technological means to deliver precision, speed, and scalable results." },
            ].map((s) => (
              <div key={s.title} className="rounded-2xl p-8 text-center" style={{ background: "#ffffff", border: "1px solid #e5e7eb" }}>
                <span className="text-4xl mb-5 block">{s.icon}</span>
                <h3 className="text-lg font-black mb-3" style={{ color: "#111827" }}>{s.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "#6B7280" }}>{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TRUSTED BY ───────────────────────────────────── */}
      <section className="py-20 px-8" style={{ background: "#ffffff" }}>
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-xs font-bold tracking-[0.3em] uppercase mb-8" style={{ color: "#0d6e36" }}>Trusted By</p>
          <div className="flex flex-wrap justify-center gap-6 items-center">
            {["NMI Education", "Horeb Solutions Sarl", "Librairie du Quartier Sarl", "DROS — Drimp One Stop", "RIMP Foundation"].map((client) => (
              <span key={client} className="px-5 py-2.5 rounded-full text-sm font-medium" style={{ background: "#f0fdf4", color: "#0d6e36", border: "1px solid #bbf7d0" }}>
                {client}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT CTA ──────────────────────────────────── */}
      <section id="contact" className="py-24 px-8" style={{ background: "#0d6e36" }}>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-black mb-4" style={{ color: "#ffffff" }}>Ready to start well?</h2>
          <p className="text-base mb-10 max-w-xl mx-auto leading-relaxed" style={{ color: "rgba(255,255,255,0.7)" }}>
            Contact our team for a free situational analysis. We&apos;ll identify exactly
            where MGI expertise can make the biggest difference for your business.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <a href="tel:+237699812513" className="px-8 py-4 rounded-xl text-sm font-bold transition-all hover:opacity-90" style={{ background: "white", color: "#0d6e36" }}>
              (+237) 699 81 25 13
            </a>
            <a href="mailto:info@mgi-holdings.com" className="px-8 py-4 rounded-xl text-sm font-bold transition-all" style={{ background: "rgba(255,255,255,0.12)", color: "white", border: "1px solid rgba(255,255,255,0.25)" }}>
              info@mgi-holdings.com
            </a>
          </div>
          <p className="text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>
            Siège social: Biyem-Assi, Yaoundé – Cameroun · BP 30374
          </p>
          <div className="mt-8">
            <Link href="/" className="text-sm font-medium transition-colors" style={{ color: "rgba(255,255,255,0.5)" }}>
              ← Back to homepage
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
