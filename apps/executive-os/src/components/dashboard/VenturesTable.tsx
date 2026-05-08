import { VentureRow } from './VentureRow'
import type { NmiHealthScore } from '@/lib/nmi-bridge'

interface VenturesTableProps {
  nmiHealth: NmiHealthScore
}

export function VenturesTable({ nmiHealth }: VenturesTableProps) {
  const ventures = [
    {
      name: 'Rogers Nforgwei',
      description: 'Personal platform · rogersnforgwei.com',
      domain: 'rogersnforgwei.com',
      avatarColor: '#3a0ca3',
      avatarInitial: 'R',
      healthScore: 85,
      status: 'active' as const,
    },
    {
      name: 'NMI Education',
      description: 'Publishing & education · nmieducation.com',
      domain: 'nmieducation.com',
      logoSrc: '/logos/nmi.png',
      avatarColor: '#1E293B',
      avatarInitial: 'N',
      healthScore: nmiHealth.score,
      status: nmiHealth.status,
    },
    {
      name: 'Horeb Solutions',
      description: 'Business services · horebsolutions.org',
      domain: 'horebsolutions.org',
      logoSrc: '/logos/horeb-solutions.png',
      avatarColor: '#1E293B',
      avatarInitial: 'H',
      healthScore: 72,
      status: 'attention' as const,
    },
    {
      name: 'Librarie du Quartier',
      description: 'Bookstore · librairieduquartier.org',
      domain: 'librairieduquartier.org',
      logoSrc: '/logos/librairie.png',
      avatarColor: '#1E293B',
      avatarInitial: 'L',
      healthScore: 68,
      status: 'attention' as const,
    },
    {
      name: 'DROS Construction',
      description: 'Construction · drosconstruction.com',
      domain: 'drosconstruction.com',
      logoSrc: '/logos/dros-construction.png',
      avatarColor: '#1E293B',
      avatarInitial: 'D',
      healthScore: 55,
      status: 'build' as const,
    },
    {
      name: 'Abba Land Place',
      description: 'Real estate · abbalandplace.com',
      domain: 'abbalandplace.com',
      logoSrc: '/logos/abba-land.png',
      avatarColor: '#1E293B',
      avatarInitial: 'A',
      healthScore: 20,
      status: 'build' as const,
      growth: 'Coming soon',
    },
  ]

  return (
    <div className="bg-mgi-card rounded-card border border-mgi-border overflow-hidden">
      <div className="px-4 py-3 border-b border-mgi-border flex items-center justify-between">
        <h2 className="text-[11px] uppercase tracking-widest font-semibold text-mgi-label">
          Ventures
        </h2>
        <span className="text-[11px] text-mgi-dim">{ventures.length} entities</span>
      </div>
      <table className="w-full">
        <thead>
          <tr className="border-b border-mgi-border">
            {['Company', 'Health', 'Revenue', 'Growth', 'Status'].map((h) => (
              <th key={h} className="px-4 py-2 text-left text-[10px] uppercase tracking-widest text-mgi-label font-semibold">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {ventures.map((v) => (
            <VentureRow key={v.domain} {...v} />
          ))}
        </tbody>
      </table>
    </div>
  )
}
