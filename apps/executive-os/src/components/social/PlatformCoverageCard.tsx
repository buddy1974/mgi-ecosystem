import { ENTITY_PLATFORMS, PLATFORM_LABELS, COMPANY_NAMES } from '@/lib/social-config'

const COMPANY_COLORS: Record<string, string> = {
  nmi: '#1D4ED8', horeb: '#0a8348', lq: '#393186', dros: '#023F78', rogers: '#3a0ca3', mgi: '#92400E',
}

export function PlatformCoverageCard() {
  const entities = ['nmi', 'horeb', 'lq', 'rogers', 'mgi']

  return (
    <div className="rounded-xl bg-[#111827] border border-[#1F2D40] p-4">
      <p className="text-[#64748B] text-xs uppercase tracking-widest font-semibold mb-4">Platform Coverage</p>
      <div className="flex flex-col gap-3">
        {entities.map((entity) => {
          const platforms = ENTITY_PLATFORMS[entity] ?? []
          return (
            <div key={entity} className="flex items-center gap-3">
              <div className="w-6 h-6 rounded flex items-center justify-center text-white text-[9px] font-bold flex-shrink-0" style={{ backgroundColor: COMPANY_COLORS[entity] }}>
                {entity.slice(0, 2).toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white text-xs font-medium truncate mb-1">{COMPANY_NAMES[entity]}</p>
                <div className="flex flex-wrap gap-1">
                  {platforms.map((p) => (
                    <span key={p} className="text-[8px] px-1.5 py-0.5 rounded bg-[#1E293B] text-[#64748B]">
                      {PLATFORM_LABELS[p]?.split(' ')[0]}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )
        })}
        <div className="flex items-center gap-3 opacity-40">
          <div className="w-6 h-6 rounded flex items-center justify-center text-white text-[9px] font-bold bg-[#023F78]">DR</div>
          <p className="text-[#475569] text-xs">DROS — no social presence yet</p>
        </div>
      </div>
    </div>
  )
}
