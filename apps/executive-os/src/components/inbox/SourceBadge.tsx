const SOURCE_CONFIG = {
  EMAIL:    { label: 'Email',    color: 'bg-blue-900 text-blue-300',     icon: '✉' },
  WHATSAPP: { label: 'WhatsApp', color: 'bg-green-900 text-green-300',   icon: '💬' },
  LINKEDIN: { label: 'LinkedIn', color: 'bg-sky-900 text-sky-300',       icon: 'in' },
  INSTAGRAM:{ label: 'Instagram',color: 'bg-pink-900 text-pink-300',     icon: '◈' },
  TIKTOK:   { label: 'TikTok',   color: 'bg-neutral-800 text-white',     icon: '♪' },
  FACEBOOK: { label: 'Facebook', color: 'bg-indigo-900 text-indigo-300', icon: 'f' },
  INTERNAL: { label: 'Internal', color: 'bg-mgi-card text-mgi-muted',    icon: '⊙' },
} as const

type Source = keyof typeof SOURCE_CONFIG

export function SourceBadge({ source }: { source: Source }) {
  const cfg = SOURCE_CONFIG[source] ?? SOURCE_CONFIG.INTERNAL
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase ${cfg.color}`}>
      <span>{cfg.icon}</span>
      {cfg.label}
    </span>
  )
}
