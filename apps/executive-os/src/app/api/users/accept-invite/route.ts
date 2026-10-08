import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@mgi/database'
import { hashPassword } from '@mgi/auth'
import { AcceptInviteSchema } from '@/lib/schemas'

export const dynamic = 'force-dynamic'

// Public route (see lib/route-policy.ts) — authorised by the single-use invite token.
export async function POST(req: NextRequest) {
  const result = AcceptInviteSchema.safeParse(await req.json().catch(() => null))
  if (!result.success) {
    return NextResponse.json(
      { error: 'Validation failed', issues: result.error.flatten().fieldErrors },
      { status: 400 }
    )
  }
  const { token, password } = result.data

  const user = await prisma.user.findUnique({ where: { inviteToken: token } })

  if (!user || user.status !== 'invited' || !user.inviteExpires || user.inviteExpires < new Date()) {
    return NextResponse.json({ error: 'Invalid or expired invite link' }, { status: 400 })
  }

  await prisma.user.update({
    where: { id: user.id },
    data: {
      password:      hashPassword(password),
      status:        'active',
      inviteToken:   null,
      inviteExpires: null,
    },
  })

  return NextResponse.json({ success: true })
}
