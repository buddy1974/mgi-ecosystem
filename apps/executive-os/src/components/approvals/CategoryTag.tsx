const CATEGORY_COLORS: Record<string, string> = {
  FINANCE:     'bg-amber-900/40 text-amber-300',
  PROCUREMENT: 'bg-orange-900/40 text-orange-300',
  HIRING:      'bg-sky-900/40 text-sky-300',
  MARKETING:   'bg-pink-900/40 text-pink-300',
  OPERATIONS:  'bg-teal-900/40 text-teal-300',
  LEGAL:       'bg-indigo-900/40 text-indigo-300',
}

export function CategoryTag({ category }: { category: string }) {
  const colors = CATEGORY_COLORS[category] ?? 'bg-mgi-card text-mgi-muted'
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase ${colors}`}>
      {category}
    </span>
  )
}
