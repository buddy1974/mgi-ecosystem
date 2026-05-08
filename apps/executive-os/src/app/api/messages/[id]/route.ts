import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@mgi/database'
import { auth } from '@/auth'

export const dynamic = 'force-dynamic'

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { id } = await params
  const body = await req.json()
  const message = await prisma.message.update({
    where: { id },
    data: body,
  })

  return NextResponse.json(message)
}
