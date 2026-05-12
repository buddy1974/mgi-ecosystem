import Image from 'next/image'
import Link from 'next/link'

interface Venture {
  name:       string
  short:      string
  domain:     string
  logo:       string
  color:      string
  tag:        string
  programs:   string[]
  comingSoon?: boolean
}

const ventures: Venture[] = [
  {
    name:     'Rogers Nforgwei Platform',
    short:    'Rogers Platform',
    domain:   'rogersnforgwei.com',
    logo:     '/logos/mgi-main.png',
    color:    '#3a0ca3',
    tag:      'Executive Development',
    programs: ["Dominion Life Men's Conference", 'Men On Duty', 'CEO On Mission'],
  },
  {
    name:     'Horeb Solutions',
    short:    'Horeb',
    domain:   'horebsolutions.org',
    logo:     '/logos/horeb-solutions.png',
    color:    '#0a8348',
    tag:      'Faith-Based Solutions',
    programs: [],
  },
  {
    name:     'NMI Education',
    short:    'NMI',
    domain:   'nmieducation.com',
    logo:     '/logos/nmi-main.png',
    color:    '#1a56db',
    tag:      'Education',
    programs: [],
  },
  {
    name:     'Librarie du Quartier',
    short:    'LQ',
    domain:   'librairieduquartier.org',
    logo:     '/logos/librairie-du-quartier.png',
    color:    '#393186',
    tag:      'Community & Culture',
    programs: [],
  },
  {
    name:     'DROS Construction',
    short:    'DROS',
    domain:   'drosconstruction.com',
    logo:     '/logos/dros-construction.png',
    color:    '#555555',
    tag:      'Construction & Development',
    programs: [],
  },
  {
    name:       'Abba Land Place by Drimp',
    short:      'Abba Land',
    domain:     'abbalandplace.com',
    logo:       '/logos/drimp-foundation.png',
    color:      '#023F78',
    tag:        'Real Estate',
    programs:   [],
    comingSoon: true,
  },
]

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-[#1f1f2e] bg-[#0a0a0f]/80 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image src="/logos/mgi-main.png" alt="MGI" width={32} height={32} className="rounded" />
            <span className="font-semibold text-white tracking-tight">MGI Ventures</span>
          </div>
          <Link
            href="https://os.mgi-ventures.com"
            className="text-sm px-4 py-2 rounded-lg bg-[#3a0ca3] text-white hover:bg-[#4a1cb3] transition-colors"
          >
            Executive OS →
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-24 px-6 text-center max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#1f1f2e] text-xs text-[#8888a0] mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-[#3a0ca3] inline-block" />
          Multi-Sector Ventures Ecosystem
        </div>
        <h1 className="text-5xl md:text-7xl font-bold text-white leading-[1.1] mb-6">
          Building ventures<br />
          <span className="text-[#3a0ca3]">that matter.</span>
        </h1>
        <p className="text-lg text-[#8888a0] max-w-2xl mx-auto leading-relaxed">
          MGI Ventures is a multi-sector ecosystem spanning education, construction,
          community, faith, and executive development — led by Rogers Nforgwei.
        </p>
      </section>

      {/* Ventures Grid */}
      <section className="max-w-6xl mx-auto px-6 pb-24">
        <p className="text-xs text-[#8888a0] uppercase tracking-widest mb-8">Our Ventures</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {ventures.map((v) => (
            <a
              key={v.domain}
              href={v.comingSoon ? '#' : `https://${v.domain}`}
              target={v.comingSoon ? '_self' : '_blank'}
              rel="noopener noreferrer"
              className="group relative rounded-2xl border border-[#1f1f2e] bg-[#111118] p-6 hover:border-[#3a0ca3]/40 transition-all duration-300 block"
            >
              {v.comingSoon && (
                <span className="absolute top-4 right-4 text-xs px-2 py-0.5 rounded-full border border-[#1f1f2e] text-[#8888a0]">
                  Coming soon
                </span>
              )}
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                style={{ backgroundColor: v.color + '22' }}
              >
                <Image src={v.logo} alt={v.short} width={28} height={28} className="object-contain" />
              </div>
              <p className="text-xs text-[#8888a0] mb-1">{v.tag}</p>
              <h3 className="font-semibold text-white mb-1">{v.short}</h3>
              <p className="text-xs text-[#8888a0]">{v.domain}</p>
              {v.programs.length > 0 && (
                <div className="mt-4 pt-4 border-t border-[#1f1f2e] space-y-1">
                  {v.programs.map((p) => (
                    <p key={p} className="text-xs text-[#8888a0]">· {p}</p>
                  ))}
                </div>
              )}
            </a>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#1f1f2e] py-12 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Image src="/logos/mgi-main.png" alt="MGI" width={24} height={24} className="rounded opacity-60" />
            <span className="text-sm text-[#8888a0]">
              © {new Date().getFullYear()} MGI Ventures. All rights reserved.
            </span>
          </div>
          <Link href="https://os.mgi-ventures.com" className="text-sm text-[#8888a0] hover:text-white transition-colors">
            Executive OS →
          </Link>
        </div>
      </footer>
    </main>
  )
}
