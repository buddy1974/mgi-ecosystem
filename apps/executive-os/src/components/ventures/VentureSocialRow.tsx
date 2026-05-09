import type { VentureConfig } from '@/lib/ventures-config'

const PLATFORM_LABELS: Record<string, string> = {
  facebook: 'Facebook',
  instagram: 'Instagram',
  linkedin: 'LinkedIn',
  twitter: 'X / Twitter',
  youtube: 'YouTube',
  tiktok: 'TikTok',
}

const PLATFORM_COLORS: Record<string, string> = {
  facebook:  'bg-blue-900/40 text-blue-300 border-blue-800',
  instagram: 'bg-pink-900/40 text-pink-300 border-pink-800',
  linkedin:  'bg-sky-900/40 text-sky-300 border-sky-800',
  twitter:   'bg-slate-800/60 text-slate-300 border-slate-700',
  youtube:   'bg-red-900/40 text-red-300 border-red-800',
  tiktok:    'bg-purple-900/40 text-purple-300 border-purple-800',
}

export function VentureSocialRow({ venture }: { venture: VentureConfig }) {
  const active = Object.entries(venture.social).filter(([, url]) => url)

  if (active.length === 0) {
    return (
      <div className="rounded-xl bg-[#111827] border border-[#1F2D40] p-4">
        <p className="text-[#64748B] text-xs uppercase tracking-wider font-semibold mb-3">Social Presence</p>
        <p className="text-[#475569] text-sm">No social accounts configured yet.</p>
      </div>
    )
  }

  return (
    <div className="rounded-xl bg-[#111827] border border-[#1F2D40] p-4">
      <p className="text-[#64748B] text-xs uppercase tracking-wider font-semibold mb-3">
        Social Presence — {active.length} platform{active.length !== 1 ? 's' : ''}
      </p>
      <div className="flex flex-wrap gap-2">
        {active.map(([platform, url]) => (
          <a
            key={platform}
            href={url as string}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-medium border hover:opacity-80 transition-opacity ${PLATFORM_COLORS[platform] ?? 'bg-[#1E293B] text-[#94A3B8] border-[#1F2D40]'}`}
          >
            {PLATFORM_LABELS[platform] ?? platform}
          </a>
        ))}
      </div>
    </div>
  )
}
