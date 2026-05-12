import Image from "next/image";
import Link from "next/link";

const ventures = [
  {
    name:     "Rogers Nforgwei Platform",
    short:    "Rogers Platform",
    domain:   "rogersnforgwei.com",
    logo:     "/logos/mgi-main.png",
    color:    "#3a0ca3",
    accent:   "#f72585",
    tag:      "Executive Development",
    programs: ["Dominion Life Men's Conference", "Men On Duty", "CEO On Mission"],
  },
  {
    name:    "Horeb Solutions",
    short:   "Horeb Solutions",
    domain:  "horebsolutions.org",
    logo:    "/logos/horeb-solutions.png",
    color:   "#0a8348",
    accent:  "#0fcf70",
    tag:     "Faith-Based Solutions",
    programs: [],
  },
  {
    name:    "NMI Education",
    short:   "NMI Education",
    domain:  "nmieducation.com",
    logo:    "/logos/nmi-main.png",
    color:   "#1a56db",
    accent:  "#60a5fa",
    tag:     "Education",
    programs: [],
  },
  {
    name:    "Librarie du Quartier",
    short:   "Librarie du Quartier",
    domain:  "librairieduquartier.org",
    logo:    "/logos/librairie-du-quartier.png",
    color:   "#393186",
    accent:  "#7c73e6",
    tag:     "Community & Culture",
    programs: [],
  },
  {
    name:    "DROS Construction",
    short:   "DROS Construction",
    domain:  "drosconstruction.com",
    logo:    "/logos/dros-construction.png",
    color:   "#b45309",
    accent:  "#f59e0b",
    tag:     "Construction & Development",
    programs: [],
  },
  {
    name:       "Abba Land Place by Drimp",
    short:      "Abba Land Place",
    domain:     "abbalandplace.com",
    logo:       "/logos/drimp-foundation.png",
    color:      "#023F78",
    accent:     "#3b82f6",
    tag:        "Real Estate",
    programs:   [],
    comingSoon: true,
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0a0a0f] overflow-x-hidden">

      {/* ── Nav ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-[#0a0a0f]/70 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#3a0ca3] flex items-center justify-center">
              <Image src="/logos/mgi-main.png" alt="MGI" width={22} height={22} className="object-contain" />
            </div>
            <span className="font-bold text-white tracking-tight text-lg">MGI Ventures</span>
          </div>
          <Link
            href="https://os.mgi-ventures.com"
            className="text-sm px-5 py-2.5 rounded-xl font-semibold text-white transition-all duration-200"
            style={{ background: "linear-gradient(135deg, #3a0ca3, #f72585)" }}
          >
            Executive OS →
          </Link>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="relative pt-40 pb-28 px-6 text-center overflow-hidden">
        <div
          className="absolute top-20 left-1/4 w-96 h-96 rounded-full opacity-20 blur-3xl pointer-events-none"
          style={{ background: "radial-gradient(circle, #3a0ca3, transparent)" }}
        />
        <div
          className="absolute top-32 right-1/4 w-80 h-80 rounded-full opacity-15 blur-3xl pointer-events-none"
          style={{ background: "radial-gradient(circle, #f72585, transparent)" }}
        />

        <div className="relative max-w-5xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 text-xs text-white/50 mb-10 backdrop-blur-sm bg-white/5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#f72585] inline-block animate-pulse" />
            Multi-Sector Ventures Ecosystem
          </div>
          <h1 className="text-6xl md:text-8xl font-black text-white leading-[1.0] mb-8 tracking-tight">
            Building ventures<br />
            <span
              style={{
                background: "linear-gradient(135deg, #3a0ca3, #f72585)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              that matter.
            </span>
          </h1>
          <p className="text-xl text-white/50 max-w-2xl mx-auto leading-relaxed font-light">
            MGI Ventures is a multi-sector ecosystem spanning education, construction,
            community, faith, and executive development — led by Daddy Rogers Nforgwei.
          </p>
        </div>
      </section>

      {/* ── Ventures Grid ── */}
      <section className="max-w-7xl mx-auto px-6 pb-32">
        <p className="text-xs text-white/30 uppercase tracking-[0.25em] mb-10 font-medium">
          Our Ventures
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ventures.map((v) => (
            <a
              key={v.domain}
              href={v.comingSoon ? "#" : `https://${v.domain}`}
              target={v.comingSoon ? "_self" : "_blank"}
              rel="noopener noreferrer"
              className="group relative rounded-3xl border border-white/8 bg-[#111118] overflow-hidden block transition-all duration-500 hover:-translate-y-1"
              style={{ boxShadow: "0 0 0 1px rgba(255,255,255,0.04)" }}
            >
              {/* Hover glow overlay */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-3xl"
                style={{
                  background: `radial-gradient(ellipse at 50% 0%, ${v.color}33 0%, transparent 70%)`,
                  boxShadow: `0 0 40px ${v.color}22`,
                }}
              />
              {/* Top color bar */}
              <div
                className="h-1 w-full"
                style={{ background: `linear-gradient(90deg, ${v.color}, ${v.accent})` }}
              />

              <div className="p-8 relative">
                {v.comingSoon && (
                  <span className="absolute top-6 right-6 text-xs px-3 py-1 rounded-full border border-white/10 text-white/40 bg-white/5">
                    Coming soon
                  </span>
                )}

                {/* Logo — 80px inside 128px container */}
                <div
                  className="w-32 h-32 rounded-2xl flex items-center justify-center mb-6 mx-auto transition-transform duration-300 group-hover:scale-105"
                  style={{
                    background: `linear-gradient(135deg, ${v.color}33, ${v.accent}22)`,
                    border: `1px solid ${v.color}44`,
                  }}
                >
                  <Image
                    src={v.logo}
                    alt={v.short}
                    width={80}
                    height={80}
                    className="object-contain"
                    style={{ filter: `drop-shadow(0 0 12px ${v.color}88)` }}
                  />
                </div>

                <p
                  className="text-xs font-semibold uppercase tracking-widest mb-3 text-center"
                  style={{ color: v.accent }}
                >
                  {v.tag}
                </p>

                <h3 className="text-2xl font-black text-white text-center mb-2 tracking-tight">
                  {v.short}
                </h3>

                <p className="text-sm text-white/40 text-center mb-6">{v.domain}</p>

                {v.programs.length > 0 && (
                  <div className="pt-5 border-t border-white/5 space-y-2">
                    {v.programs.map((p) => (
                      <div key={p} className="flex items-center gap-2">
                        <span
                          className="w-1 h-1 rounded-full flex-shrink-0"
                          style={{ background: v.accent }}
                        />
                        <p className="text-sm text-white/50">{p}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-white/5 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded-md bg-[#3a0ca3]/60 flex items-center justify-center">
              <Image
                src="/logos/mgi-main.png"
                alt="MGI"
                width={14}
                height={14}
                className="object-contain opacity-70"
              />
            </div>
            <span className="text-sm text-white/30">
              © {new Date().getFullYear()} MGI Ventures. All rights reserved.
            </span>
          </div>
          <Link
            href="https://os.mgi-ventures.com"
            className="text-sm text-white/30 hover:text-white transition-colors"
          >
            Executive OS →
          </Link>
        </div>
      </footer>
    </main>
  );
}
