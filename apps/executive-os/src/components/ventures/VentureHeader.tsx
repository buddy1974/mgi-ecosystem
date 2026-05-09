import type { VentureConfig } from '@/lib/ventures-config'

interface Props {
  venture: VentureConfig
  stats: { messages: number; approvals: number }
}

export function VentureHeader({ venture, stats }: Props) {
  return (
    <div
      className="rounded-xl p-6 mb-6 relative overflow-hidden"
      style={{
        background: `linear-gradient(135deg, ${venture.primaryColor}22 0%, #0C0F1A 60%)`,
        border: `1px solid ${venture.primaryColor}33`,
        borderLeft: `4px solid ${venture.primaryColor}`,
      }}
    >
      <div className="flex items-center gap-4">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-lg flex-shrink-0"
          style={{ backgroundColor: venture.primaryColor }}
        >
          {venture.name.slice(0, 2).toUpperCase()}
        </div>
        <div className="flex-1 min-w-0">
          <h1 className="text-white font-semibold text-lg leading-tight">{venture.name}</h1>
          <p className="text-[#64748B] text-xs mt-0.5">{venture.domain}</p>
          {venture.tagline && (
            <p className="text-[#94A3B8] text-xs mt-1 italic">{venture.tagline}</p>
          )}
        </div>
        <div className="flex gap-4 text-right flex-shrink-0">
          <div>
            <div className="text-white font-bold text-lg">{stats.messages}</div>
            <div className="text-[#64748B] text-[10px] uppercase tracking-wider">Messages</div>
          </div>
          <div>
            <div
              className="font-bold text-lg"
              style={{ color: stats.approvals > 0 ? '#F87171' : '#64748B' }}
            >
              {stats.approvals}
            </div>
            <div className="text-[#64748B] text-[10px] uppercase tracking-wider">Pending</div>
          </div>
        </div>
      </div>
    </div>
  )
}
