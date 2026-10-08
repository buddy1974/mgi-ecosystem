import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@mgi/database'
import { requireSession, requireSuperAdmin } from '@/lib/require-auth'
import { triggerN8nWorkflow } from '@/lib/n8n'
import { InviteUserSchema } from '@/lib/schemas'
import crypto from 'crypto'

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  // Only SUPER_ADMIN may invite users to the executive OS
  const userOrError = await requireSession()
  if (userOrError instanceof NextResponse) return userOrError

  const adminOrError = requireSuperAdmin(userOrError)
  if (adminOrError instanceof NextResponse) return adminOrError

  const result = InviteUserSchema.safeParse(await req.json())
  if (!result.success) {
    return NextResponse.json(
      { error: 'Validation failed', issues: result.error.flatten().fieldErrors },
      { status: 400 }
    )
  }
  const { email, name, role } = result.data

  const inviteToken   = crypto.randomBytes(32).toString('hex')
  const inviteExpires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)

  const user = await prisma.user.upsert({
    where:  { email },
    update: { inviteToken, inviteExpires, status: 'invited', name },
    create: { email, name, status: 'invited', inviteToken, inviteExpires },
  })

  const inviteUrl = `${process.env.NEXT_PUBLIC_APP_URL ?? 'https://os.mgi-ventures.com'}/auth/accept-invite?token=${inviteToken}`

  triggerN8nWorkflow('mgi-approval-alert', {
    title:       `You've been invited to MGI Executive OS`,
    requestedBy: userOrError.name ?? 'The MGI Team',
    entity:      'MGI Executive OS',
    priority:    'normal',
    reviewUrl:   inviteUrl,
  }).catch(console.error)

  return NextResponse.json({ success: true, userId: user.id, inviteUrl })
}
