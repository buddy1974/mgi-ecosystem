// Executive Briefing Centre — shared vocabulary.
// Statuses are stored as strings (additive schema, no new enums); these unions are the
// only accepted values and are enforced at every write (ingest schema, actions).

export const PRIORITIES = ['CRITICAL', 'HIGH', 'NORMAL', 'LOW'] as const
export type Priority = (typeof PRIORITIES)[number]

export const PRIORITY_RANK: Record<Priority, number> = { CRITICAL: 0, HIGH: 1, NORMAL: 2, LOW: 3 }

export const DOMAINS = [
  'SALES', 'RECEIVABLES', 'DISTRIBUTION', 'INVENTORY', 'PIRACY', 'MARKET',
  'INQUIRY', 'PROGRAMME', 'PROJECT', 'GOVERNANCE', 'OPERATIONS', 'PUBLISHING',
] as const
export type Domain = (typeof DOMAINS)[number]

export const RECORD_TYPES = [
  'CUSTOMER', 'PRODUCT', 'ORDER', 'INVOICE', 'PAYMENT', 'STOCK_MOVEMENT', 'STOCK_LEVEL',
  'STOCK_EXCEPTION', 'PIRACY_CASE', 'COMPETITOR_SIGNAL', 'CONSTRUCTION_INQUIRY', 'QUOTATION',
  'PROJECT', 'REGISTRATION', 'APPROVAL_REQUEST', 'SYNC_FAILURE', 'PRINT_JOB', 'BUSINESS_INQUIRY',
] as const
export type RecordType = (typeof RECORD_TYPES)[number]

export const SOURCE_SYSTEMS = ['DEMO', 'NMI', 'ODOO', 'BOOKSHIELD', 'WEB_ROGERS', 'EMAIL', 'MANUAL'] as const
export type SourceSystem = (typeof SOURCE_SYSTEMS)[number]

export const EVENT_KINDS = [
  'SALES_CHANGE', 'RECEIVABLE_OVERDUE', 'DISTRIBUTOR_UPDATE', 'STOCK_EXCEPTION', 'PIRACY_SUSPECTED',
  'CONSTRUCTION_INQUIRY', 'QUOTATION_FOLLOW_UP', 'PROJECT_DECISION_PENDING', 'PROGRAMME_REGISTRATION',
  'REGISTRATION_INCOMPLETE', 'COMPETITOR_SIGNAL', 'BUSINESS_INQUIRY', 'MEETING_RESOLUTION',
  'COMMITMENT_OVERDUE', 'COMMITMENT_BLOCKED', 'COMMITMENT_DELIVERED', 'COMMITMENT_UNBLOCKED',
  'APPROVAL_REQUEST', 'APPROVAL_DECIDED', 'OPERATIONAL_FAILURE',
] as const
export type EventKind = (typeof EVENT_KINDS)[number]

export const EXEC_STATUSES = ['NEW', 'ACKNOWLEDGED', 'ACTION_REQUESTED', 'CLOSED'] as const
export type ExecStatus = (typeof EXEC_STATUSES)[number]

export const COMMITMENT_STATUSES = ['OPEN', 'IN_PROGRESS', 'BLOCKED', 'DELIVERED', 'ACCEPTED', 'CANCELLED'] as const
export type CommitmentStatus = (typeof COMMITMENT_STATUSES)[number]

export const DELAY_CAUSES = ['OWNER', 'RESOURCES', 'PRIORITY_CHANGE', 'MANAGEMENT_DEPENDENCY', 'EXTERNAL'] as const
export type DelayCause = (typeof DELAY_CAUSES)[number]

export const DELAY_CAUSE_LABEL: Record<DelayCause, string> = {
  OWNER: 'Owner delivery problem',
  RESOURCES: 'Missing resources',
  PRIORITY_CHANGE: 'Priorities changed',
  MANAGEMENT_DEPENDENCY: 'Waiting on management decision',
  EXTERNAL: 'External dependency',
}

export type SubjectType = 'RECORD' | 'COMMITMENT' | 'MEETING' | 'DECISION' | 'FINANCE' | 'OUTBOX'

export type NotificationKind = 'ALERT' | 'DIGEST' | 'MORNING_BRIEF'
export type NotificationStatus = 'PENDING' | 'SENDING' | 'SENT' | 'FAILED' | 'DRY_RUN'

export type BriefingMode = 'live' | 'demo'

export const COMPANY_LABEL: Record<string, string> = {
  mgi: 'MGI Group',
  nmi: 'NMI Education',
  dros: 'DROS Construction',
  rogers: 'Rogers Nforgwei Programmes',
  horeb: 'Horeb Solutions',
  lq: 'Librairie du Quartier',
  abba: 'Abba Land Place',
}

export function companyLabel(slug: string): string {
  return COMPANY_LABEL[slug] ?? slug
}

export function isOneOf<T extends string>(list: readonly T[], v: unknown): v is T {
  return typeof v === 'string' && (list as readonly string[]).includes(v)
}
