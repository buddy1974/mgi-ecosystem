import Image from 'next/image'
import { StatusBadge } from './StatusBadge'

type Status = 'active' | 'attention' | 'risk' | 'build'

interface VentureRowProps {
  name: string
  description: string
  domain: string
  logoSrc?: string
  avatarColor: string
  avatarInitial: string
  healthScore: number
  status: Status
  revenue?: string
  growth?: string
}

export function VentureRow({
  name, description, logoSrc, avatarColor, avatarInitial,
  healthScore, status, revenue, growth,
}: VentureRowProps) {
  const barColor =
    healthScore >= 80 ? 'bg-status-active' :
    healthScore >= 60 ? 'bg-status-attention' : 'bg-status-risk'

  return (
    <tr className="border-b border-mgi-border hover:bg-mgi-card-hover transition-colors">
      <td className="px-4 py-3">
        <div className="flex items-center gap-3">
          <div
            className="w-9 h-9 rounded-lg flex items-center justify-center overflow-hidden shrink-0"
            style={{ background: avatarColor }}
          >
            {logoSrc ? (
              <Image src={logoSrc} alt={name} width={36} height={36} className="object-contain" />
            ) : (
              <span className="text-white font-bold text-sm">{avatarInitial}</span>
            )}
          </div>
          <div>
            <p className="text-sm font-semibold text-white">{name}</p>
            <p className="text-xs text-mgi-muted">{description}</p>
          </div>
        </div>
      </td>
      <td className="px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="w-20 h-1.5 bg-mgi-border rounded-full overflow-hidden">
            <div className={`h-full rounded-full ${barColor}`} style={{ width: `${healthScore}%` }} />
          </div>
          <span className="text-xs text-mgi-muted tabular-nums">{healthScore}/100</span>
        </div>
      </td>
      <td className="px-4 py-3 text-sm text-mgi-muted tabular-nums">{revenue ?? '–'}</td>
      <td className="px-4 py-3 text-sm">
        {growth
          ? <span className="text-delta-up">{growth}</span>
          : <span className="text-mgi-muted">–</span>
        }
      </td>
      <td className="px-4 py-3"><StatusBadge status={status} /></td>
    </tr>
  )
}
