/**
 * schemas.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * Central Zod validation schemas for all executive-os API routes.
 * Import the schema you need and call .safeParse(body) before any DB operation.
 *
 * Usage:
 *   const result = CreateApprovalSchema.safeParse(await req.json())
 *   if (!result.success) {
 *     return NextResponse.json(
 *       { error: 'Validation failed', issues: result.error.flatten().fieldErrors },
 *       { status: 400 }
 *     )
 *   }
 *   const body = result.data // fully typed, safe to pass to Prisma
 */

import { z } from 'zod'

// ── Approvals ──────────────────────────────────────────────────────────────────

export const CreateApprovalSchema = z.object({
  companyId:   z.string().min(1, 'Company ID is required'),
  category:    z.enum(['FINANCE', 'PROCUREMENT', 'HIRING', 'MARKETING', 'OPERATIONS', 'LEGAL']),
  title:       z.string().min(1, 'Title is required').max(200),
  description: z.string().min(1, 'Description is required').max(5000),
  requestedBy: z.string().min(1, 'Requester name is required').max(100),
  amount:      z.number().positive().optional(),
  currency:    z.string().min(1).max(10).default('XAF'),
  priority:    z.enum(['CRITICAL', 'HIGH', 'NORMAL', 'LOW']).default('NORMAL'),
  n8nWorkflow: z.string().optional(),
})

export const PatchApprovalSchema = z.object({
  action:        z.enum(['approve', 'reject', 'delegate']),
  delegatedTo:   z.string().max(100).optional(),
  rejectionNote: z.string().max(2000).optional(),
})

// ── Messages ───────────────────────────────────────────────────────────────────

export const PatchMessageSchema = z
  .object({
    isRead:     z.boolean().optional(),
    isArchived: z.boolean().optional(),
    isStarred:  z.boolean().optional(),
    aiActToday: z.boolean().optional(),
  })
  .refine(
    (d) => Object.values(d).some((v) => v !== undefined),
    { message: 'At least one field must be provided' }
  )

// ── Social Posts ───────────────────────────────────────────────────────────────

export const CreateSocialPostSchema = z.object({
  companyId:   z.string().min(1, 'Company ID is required'),
  platform:    z.enum(['FACEBOOK', 'INSTAGRAM', 'LINKEDIN', 'TWITTER', 'YOUTUBE', 'TIKTOK']),
  content:     z.string().min(1, 'Content is required').max(10000),
  status:      z.enum(['DRAFT', 'AWAITING_APPROVAL', 'APPROVED', 'SCHEDULED', 'PUBLISHED', 'FAILED']),
  scheduledAt: z.string().datetime({ message: 'Must be a valid ISO 8601 datetime' }).optional(),
})

export const PatchSocialPostSchema = z.object({
  status:      z.enum(['DRAFT', 'AWAITING_APPROVAL', 'APPROVED', 'SCHEDULED', 'PUBLISHED', 'FAILED']).optional(),
  content:     z.string().min(1).max(10000).optional(),
  scheduledAt: z.string().datetime().nullable().optional(),
})

// ── Users / Invite ─────────────────────────────────────────────────────────────

export const InviteUserSchema = z.object({
  email:     z.string().email('Must be a valid email address'),
  name:      z.string().min(1).max(100).optional(),
  role:      z.enum(['ADMIN', 'MANAGER', 'STAFF', 'GUEST']),
  companyId: z.string().optional(),
})

// ── Venture Reports ────────────────────────────────────────────────────────────

export const VentureReportSchema = z.object({
  venture:     z.string().min(1, 'Venture slug is required'),
  type:        z.enum(['report', 'incident', 'update', 'approval_request']),
  urgency:     z.enum(['normal', 'urgent', 'critical']).default('normal'),
  title:       z.string().min(1, 'Title is required').max(200),
  body:        z.string().min(1, 'Details are required').max(10000),
  submittedBy: z.string().min(1, 'Your name is required').max(100),
})

export const VentureReplySchema = z.object({
  id:    z.string().min(1, 'Report ID is required'),
  reply: z.string().min(1, 'Reply cannot be empty').max(5000),
})

// ── Bookings ───────────────────────────────────────────────────────────────────

export const BookingActionSchema = z.object({
  action:         z.enum(['confirm', 'decline']),
  declinedReason: z.string().max(2000).optional(),
})
