import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@mgi/database'
import { auth } from '@/auth'
import { triggerN8nWorkflow } from '@/lib/n8n'
import type { ApprovalCategory, ApprovalPriority } from '@mgi/database'

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await req.json()
  const {
    companyId,
    category,
    title,
    description,
    amount,
    currency = 'XAF',
    requestedBy,
    priority = 'NORMAL',
    n8nWorkflow,
  } = body

  if (!companyId || !category || !title || !description || !requestedBy) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  const approval = await prisma.approval.create({
    data: {
      companyId,
      category:    category as ApprovalCategory,
      title,
      description,
      amount:      amount ?? null,
      currency,
      requestedBy,
      priority:    priority as ApprovalPriority,
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
