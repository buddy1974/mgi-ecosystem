import Link from 'next/link'
import type { VentureConfig } from '@/lib/ventures-config'

export function VentureProgramsCard({ venture }: { venture: VentureConfig }) {
  if (venture.programs.length === 0) return null

  return (
    <div className="rounded-xl bg-[#111827] border border-[#1F2D40] p-4">
      <p className="text-[#64748B] text-xs uppercase tracking-wider font-semibold mb-3">
        Programs & Services
      </p>
      <div className="flex flex-col gap-1.5">
        {venture.programs.map((program, i) => {
          const config = venture.programConfigs?.[i]
          const content = (
            <div className="flex items-center gap-2 text-sm text-[#CBD5E1]">
              <span
                className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                style={{ backgroundColor: venture.accentColor }}
              />
              {program}
            </div>
          )

          return config ? (
            <Link
              key={config.slug}
              href={`/ventures/${venture.slug}/programs/${config.slug}`}
              className="hover:text-white transition-colors"
            >
              {content}
            </Link>
          ) : (
            <div key={program}>{content}</div>
          )
        })}
      </div>
    </div>
  )
}
