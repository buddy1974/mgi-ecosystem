import Image from "next/image";
import Link from "next/link";

/* ─── OFFICIAL BRAND DATA — DO NOT MODIFY without brand approval ─── */
const ventures = [
  {
    name:     "Rogers Nforgwei Platform",
    short:    "Rogers Nforgwei Platform",
    domain:   "rogersnforgwei.com",
    logo:     "/logos/mgi-main.png",
    primary:  "#3a0ca3",
    accent:   "#f72585",
    tag:      "Executive Development",
    tagline:  "Switch on the better side of the future.",
    programs: ["Dominion Life Men's Conference", "Men On Duty", "CEO On Mission"],
    comingSoon: false,
  },
  {
    name:     "Horeb Solutions",
    short:    "Horeb Solutions",
    domain:   "horebsolutions.org",
    logo:     "/logos/horeb-solutions.png",
    primary:  "#0a8348",
    accent:   "#fdda2b",
    tag:      "Logistics",
    tagline:  "Reliability in motion. Your logistics, our priority.",
    programs: [],
    comingSoon: false,
  },
  {
    name:     "NMI Education",
    short:    "NMI Education",
    domain:   "nmieducation.com",
    logo:     "/logos/nmi-main.png",
    primary:  "#1a56db",
    accent:   "#60a5fa",
    tag:      "Education",
    tagline:  "Empowering minds. Building futures.",
    programs: [],
    comingSoon: false,
  },
  {
    name:     "Librairie du Quartier",
    short:    "Librairie du Quartier",
    domain:   "librairieduquartier.org",
    logo:     "/logos/librairie-du-quartier.png",
    primary:  "#393186",
    accent:   "#EF7F1B",
    tag:      "Community & Culture",
    tagline:  "Your neighborhood. Your knowledge.",
    programs: [],
    comingSoon: false,
  },
  {
    name:     "DROS Construction",
    short:    "DROS Construction",
    domain:   "drosconstruction.com",
    logo:     "/logos/dros-construction.png",
    primary:  "#1c3a2e",
    accent:   "#a3855a",
    tag:      "Construction & Development",
    tagline:  "Building structures that stand the test of time.",
    programs: [],
    comingSoon: false,
  },
  {
    name:       "Abba Land Place",
    short:      "Abba Land Place",
    domain:     "abbalandplace.com",
    logo:       "/logos/drimp-foundation.png",
    primary:    "#023F78",
    accent:     "#FC9D02",
    tag:        "Real Estate",
    tagline:    "Premium land. Premium living.",
    programs:   [],
    comingSoon: true,
  },
];

const values = [
  { label: "Integrity",       icon: "◈" },
  { label: "Excellence",      icon: "◆" },
  { label: "Confidentiality", icon: "◉" },
  { label: "Innovation",      icon: "◐" },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#07070d] text-white overflow-x-hidden">

      {/* ── NAV ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/[0.06] bg-[#07070d]/80 backdrop-blur-2xl">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{ background: "linear-gradient(135deg,#3a0ca3,#f72585)" }}
            >
              <Image
                src="/logos/mgi-main.png"
                alt="MGI"
                width={22}
                height={22}
                className="object-contain invert"
              />
            </div>
            <div>
              <span className="font-bold text-white text-sm tracking-tight leading-none block">
                Mina-Galeed Invest
              </span>
              <span className="text-[10px] text-white/30 tracking-widest uppercase leading-none block">
                MGI Ltd · Est. 2019
              </span>
            </div>
          </div>
          <Link
            href="https://os.mgi-ventures.com"
            className="hidden md:flex items-center gap-2 text-sm px-5 py-2.5 rounded-xl font-semibold text-white transition-all duration-200 hover:brightness-110"
            style={{ background: "linear-gradient(135deg,#3a0ca3,#f72585)" }}
          >
            Executive OS <span className="opacity-70">→</span>
          </Link>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="relative pt-44 pb-32 px-6 overflow-hidden">
        {/* Ambient glows */}
        <div
          className="absolute top-0 left-1/3 w-[600px] h-[600px] rounded-full opacity-[0.08] blur-[120px] pointer-events-none"
          style={{ background: "#3a0ca3" }}
        />
        <div
          className="absolute top-20 right-1/4 w-[400px] h-[400px] rounded-full opacity-[0.06] blur-[100px] pointer-events-none"
          style={{ background: "#f72585" }}
        />

        <div className="relative max-w-5xl mx-auto text-center">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs text-white/40 border border-white/[0.08] bg-white/[0.03] mb-10 tracking-widest uppercase">
            <span className="w-1 h-1 rounded-full bg-[#f72585] inline-block" />
            Holding Company · Yaoundé, Cameroon · Since 2019
          </div>

          {/* Main headline */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[0.95] mb-8">
            <span className="text-white">Start well.</span>
            <br />
            <span
              style={{
                background: "linear-gradient(135deg,#3a0ca3 0%,#4361ee 40%,#f72585 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Grow well.
            </span>
          </h1>

          {/* Sub-headline */}
          <p className="text-lg md:text-xl text-white/40 max-w-2xl mx-auto leading-relaxed font-light mb-4">
            Mina-Galeed Invest (MGI) Ltd is a holding company supporting businesses
            across their full development cycles — from legal structuring to digital
            transformation and strategic growth.
          </p>
          <p className="text-sm text-white/25 tracking-widest uppercase">
            Rogers Nforgwei · Founder & CEO
          </p>
        </div>
      </section>

      {/* ── VALUES ── */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {values.map((v) => (
            <div
              key={v.label}
              className="rounded-2xl border border-white/[0.06] bg-white/[0.02] px-5 py-4 text-center"
            >
              <p className="text-2xl mb-2 text-white/20">{v.icon}</p>
              <p className="text-sm font-semibold text-white/60 tracking-wide">{v.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── PORTFOLIO ── */}
      <section className="max-w-7xl mx-auto px-6 pb-32">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-xs text-white/25 uppercase tracking-[0.3em] mb-2">Portfolio</p>
            <h2 className="text-3xl font-black text-white tracking-tight">Our Ventures</h2>
          </div>
          <p className="text-sm text-white/25 hidden md:block">6 companies · 5 sectors</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {ventures.map((v) => (
            <a
              key={v.domain}
              href={v.comingSoon ? "#" : `https://${v.domain}`}
              target={v.comingSoon ? "_self" : "_blank"}
              rel="noopener noreferrer"
              className="group relative rounded-3xl border border-white/[0.07] bg-[#0f0f18] overflow-hidden flex flex-col transition-all duration-500 hover:-translate-y-1.5 hover:border-white/15 cursor-pointer"
            >
              {/* Hover glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                style={{ background: `radial-gradient(ellipse at 50% -10%,${v.primary}28 0%,transparent 65%)` }}
              />

              {/* Brand color top bar */}
              <div
                className="h-[3px] w-full flex-shrink-0"
                style={{ background: `linear-gradient(90deg,${v.primary},${v.accent})` }}
              />

              <div className="flex flex-col flex-1 p-7 relative">
                {/* Coming soon */}
                {v.comingSoon && (
                  <span className="absolute top-5 right-5 text-[10px] font-semibold px-2.5 py-1 rounded-full border border-white/10 text-white/30 bg-white/[0.04] tracking-wider uppercase">
                    Coming soon
                  </span>
                )}

                {/* Logo container */}
                <div
                  className="w-28 h-28 rounded-2xl mx-auto mb-6 flex items-center justify-center transition-transform duration-300 group-hover:scale-105 flex-shrink-0"
                  style={{
                    background: `linear-gradient(145deg,${v.primary}28,${v.accent}18)`,
                    border: `1.5px solid ${v.primary}40`,
                    boxShadow: `0 8px 32px ${v.primary}18`,
                  }}
                >
                  <Image
                    src={v.logo}
                    alt={v.short}
                    width={72}
                    height={72}
                    className="object-contain"
                    style={{ filter: `drop-shadow(0 0 10px ${v.primary}60)` }}
                  />
                </div>

                {/* Sector tag */}
                <p
                  className="text-[11px] font-bold uppercase tracking-[0.2em] text-center mb-2"
                  style={{ color: v.accent }}
                >
                  {v.tag}
                </p>

                {/* Company name */}
                <h3 className="text-xl font-black text-white text-center leading-tight mb-2 tracking-tight">
                  {v.short}
                </h3>

                {/* Official tagline */}
                <p className="text-sm text-white/40 text-center leading-relaxed mb-3 italic">
                  &ldquo;{v.tagline}&rdquo;
                </p>

                {/* Domain */}
                <p className="text-xs text-white/20 text-center tracking-wide mb-4">
                  {v.domain}
                </p>

                {/* Programs */}
                {v.programs.length > 0 && (
                  <div className="mt-auto pt-5 border-t border-white/[0.06] space-y-2">
                    {v.programs.map((p) => (
                      <div key={p} className="flex items-center gap-2.5">
                        <span
                          className="w-1 h-1 rounded-full flex-shrink-0"
                          style={{ background: v.accent }}
                        />
                        <p className="text-xs text-white/40">{p}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* ── POSITIONING STRIP ── */}
      <section className="border-y border-white/[0.05] bg-white/[0.015] py-16 px-6 mb-0">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-2xl md:text-3xl font-bold text-white/60 leading-relaxed">
            &ldquo;At the heart of business performance.&rdquo;
          </p>
          <p className="text-sm text-white/25 mt-3 tracking-widest uppercase">
            Mina-Galeed Invest (MGI) Ltd · Yaoundé, Cameroon
          </p>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ background: "linear-gradient(135deg,#3a0ca3,#f72585)" }}
            >
              <Image
                src="/logos/mgi-main.png"
                alt="MGI"
                width={18}
                height={18}
                className="object-contain invert"
              />
            </div>
            <div>
              <p className="text-sm font-semibold text-white/50">Mina-Galeed Invest (MGI) Ltd</p>
              <p className="text-xs text-white/20">© {new Date().getFullYear()} · All rights reserved</p>
            </div>
          </div>
          <div className="flex items-center gap-6 text-xs text-white/25">
            <span>Yaoundé, Cameroon</span>
            <Link
              href="https://os.mgi-ventures.com"
              className="text-white/40 hover:text-white transition-colors font-medium"
            >
              Executive OS →
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
