// ─── GLOBAL ROLE ─────────────────────────────────────────────────────────────
export type GlobalRole = 'SUPER_ADMIN' | 'USER'

// ─── COMPANY ROLE ─────────────────────────────────────────────────────────────
export type CompanyRole = 'ADMIN' | 'MANAGER' | 'STAFF' | 'GUEST'

// ─── COMPANY SLUGS ─────────────────────────────────────────────────────────────
export type CompanySlug =
  | 'rogers'
  | 'nmi'
  | 'horeb'
  | 'librarie'
  | 'dros'
  | 'abbaland'

// ─── COMPANY ──────────────────────────────────────────────────────────────────
export interface Company {
  id: string
  name: string
  slug: CompanySlug
  domain: string
  logo?: string | null
  active: boolean
  createdAt: Date
}

// ─── COMPANY MEMBERSHIP ───────────────────────────────────────────────────────
export interface CompanyMembership {
  companyId: string
  companySlug: string
  companyName: string
  role: CompanyRole
}

// ─── MGI SESSION ──────────────────────────────────────────────────────────────
export interface MGIUser {
  id: string
  email: string
  name: string
  avatar?: string | null
  globalRole: GlobalRole
  activeCompanyId: string
  memberships: CompanyMembership[]
}

// ─── NOTIFICATION CHANNELS ────────────────────────────────────────────────────
export type NotificationChannel = 'in_app' | 'email' | 'push'

export type NotificationPriority = 'URGENT' | 'HIGH' | 'NORMAL' | 'LOW'

// ─── APPROVAL STATUS ──────────────────────────────────────────────────────────
export type ApprovalStatus = 'PENDING' | 'APPROVED' | 'REJECTED' | 'DELEGATED'

// ─── TASK STATUS ─────────────────────────────────────────────────────────────
export type TaskStatus = 'TODO' | 'IN_PROGRESS' | 'BLOCKED' | 'DONE' | 'CANCELLED'

export type TaskPriority = 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT'

// ─── SOCIAL POST STATUS ───────────────────────────────────────────────────────
export type SocialPostStatus =
  | 'DRAFT'
  | 'AWAITING_APPROVAL'
  | 'APPROVED'
  | 'SCHEDULED'
  | 'PUBLISHED'
  | 'FAILED'

export type SocialPlatform = 'linkedin' | 'instagram' | 'tiktok' | 'youtube' | 'facebook'

// ─── AUDIT ACTION ─────────────────────────────────────────────────────────────
export type AuditAction =
  | 'CREATE'
  | 'UPDATE'
  | 'DELETE'
  | 'APPROVE'
  | 'REJECT'
  | 'DELEGATE'
  | 'LOGIN'
  | 'LOGOUT'
  | 'VIEW'

// ─── VENTURE HEALTH ───────────────────────────────────────────────────────────
export type HealthStatus = 'active' | 'attention' | 'risk' | 'build'

export interface VentureHealth {
  score: number        // 0–100
  status: HealthStatus
  lastSync: Date
}
