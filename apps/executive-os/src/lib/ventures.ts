import { VENTURES as VENTURE_CONFIGS } from './ventures-config'

export const VENTURES = Object.fromEntries(
  Object.entries(VENTURE_CONFIGS).map(([slug, v]) => [
    slug,
    {
      name: v.name,
      domain: v.domain,
      slug: v.slug,
      color: v.primaryColor,
    },
  ])
) as Record<string, { name: string; domain: string; slug: string; color: string }>

export const VENTURE_TYPES = [
  { value: 'report',           label: 'Activity Report'  },
  { value: 'incident',         label: 'Incident'         },
  { value: 'update',           label: 'Project Update'   },
  { value: 'approval_request', label: 'Approval Request' },
] as const

export const VENTURE_URGENCY = [
  { value: 'normal',   label: 'Normal',       color: '#6b7280' },
  { value: 'urgent',   label: 'Urgent',       color: '#d97706' },
  { value: 'critical', label: 'Critical 🔴',  color: '#dc2626' },
] as const
