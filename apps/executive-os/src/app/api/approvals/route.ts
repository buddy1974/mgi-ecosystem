import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@mgi/database'
import { triggerN8nWorkflow } from '@/lib/n8n'
import { requireSession, requireCompanyAccess } from '@/lib/require-auth'
import { CreateApprovalSchema } from '@/lib/schemas'

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  const userOrError = await requireSession()
  if (userOrError instanceof NextResponse) return userOrError

  const result = CreateApprovalSchema.safeParse(await req.json())
  if (!result.success) {
    return NextResponse.json(
      { error: 'Validation failed', issues: result.error.flatten().fieldErrors },
      { status: 400 }
    )
  }
  const { companyId, category, title, description, amount, currency, requestedBy, priority, n8nWorkflow } = result.data

  // Verify the requesting user belongs to this company and has create permission
  const accessOrError = await requireCompanyAccess(userOrError, companyId, 'approvals.create')
  if (accessOrError instanceof NextResponse) return accessOrError

  const approval = await prisma.approval.create({
    data: {
      companyId,
      category,
      title,
      description,
      amount:      amount ?? null,
      currency,
      requestedBy,
      priority,
      n8nWorkflow: n8nWorkflow ?? null,
    },
  })

  // Fire n8n notification — non-blocking
  triggerN8nWorkflow('mgi-approval-alert', {
    id:          approval.id,
    title:       approval.title,
    requestedBy: approval.requestedBy,
    entity:      companyId,
    priority:    approval.priority,
    reviewUrl:   `${process.env.NEXT_PUBLIC_APP_URL ?? 'https://os.mgi-ventures.com'}/approvals`,
    createdAt:   approval.createdAt.toISOString(),
  }).catch(console.error)

  return NextResponse.json(approval, { status: 201 })
}
