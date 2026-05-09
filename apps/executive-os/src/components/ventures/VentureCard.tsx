import Link from 'next/link'
import type { VentureConfig } from '@/lib/ventures-config'

interface Props {
  venture: VentureConfig
  stats: { messages: number; approvals: number }
}

const SOCIAL_ICONS: Record<string, string> = {
  facebook: 'fb',
  instagram: 'ig',
  linkedin: 'in',
  twitter: 'x',
  youtube: 'yt',
  tiktok: 'tk',
}

export function VentureCard({ venture, stats }: Props) {
  const activeSocial = Object.keys(venture.social).filter(
    (k) => venture.social[k as keyof typeof venture.social]
  )

  return (
    <Link
      href={`/ventures/${venture.slug}`}
      className="block rounded-xl bg-[#111827] border border-[#1F2D40] p-5 hover:border-[#2D4A6A] transition-all"
      style={{ borderLeftColor: venture.primaryColor, borderLeftWidth: 3 }}
    >
      <div className="flex items-start justify-between mb-3">
        <div
          className="w-9 h-9 rounded-lg flex items-center justify-center text-white text-xs font-bold"
          style={{ backgroundColor: venture.primaryColor }}
        >
          {venture.name.slice(0, 2).toUpperCase()}
        </div>
        {stats.approvals > 0 && (
          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-red-900/40 text-red-400 border border-red-800">
            {stats.approvals} PENDING
          </span>
        )}
      </div>

      <h3 className="text-white font-semibold text-sm mb-0.5">{venture.name}</h3>
      <p className="text-[#64748B] text-[11px] mb-3">{venture.domain}</p>

      {venture.tagline && (
        <p className="text-[#94A3B8] text-[11px] italic mb-3 line-clamp-1">{venture.tagline}</p>
      )}

      <div className="flex items-center justify-between">
        <div className="flex gap-3 text-[11px] text-[#64748B]">
          <span>{stats.messages} msg</span>
          <span>{stats.approvals} approvals</span>
        </div>
        <div className="flex gap-1">
          {activeSocial.slice(0, 4).map((platform) => (
            <span key={platform} className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-[#1E293B] text-[#64748B]">
              {SOCIAL_ICONS[platform] ?? platform.slice(0, 2)}
            </span>
          ))}
          {activeSocial.length === 0 && (
            <span className="text-[9px] text-[#475569]">no social</span>
          )}
        </div>
      </div>
    </Link>
  )
}
