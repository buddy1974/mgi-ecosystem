const COMPANY_COLORS: Record<string, string> = {
  nmi:    'bg-blue-900/50 text-blue-300 border border-blue-800',
  horeb:  'bg-emerald-900/50 text-emerald-300 border border-emerald-800',
  lq:     'bg-purple-900/50 text-purple-300 border border-purple-800',
  dros:   'bg-red-900/50 text-red-300 border border-red-800',
  rogers: 'bg-violet-900/50 text-violet-300 border border-violet-800',
  mgi:    'bg-amber-900/50 text-amber-300 border border-amber-800',
}

const COMPANY_NAMES: Record<string, string> = {
  nmi:    'NMI Education',
  horeb:  'Horeb Solutions',
  lq:     'Librairie du Quartier',
  dros:   'DROS Construction',
  rogers: 'Rogers Nforgwei',
  mgi:    'MGI Holding',
}

export function CompanyTag({ companyId }: { companyId: string }) {
  const colors = COMPANY_COLORS[companyId] ?? 'bg-mgi-card text-mgi-muted border border-mgi-border'
  const name = COMPANY_NAMES[companyId] ?? companyId
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase ${colors}`}>
      {name}
    </span>
  )
}
