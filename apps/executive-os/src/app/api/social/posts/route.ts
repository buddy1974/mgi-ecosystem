import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@mgi/database'
import { requireSession, requireCompanyAccess } from '@/lib/require-auth'
import { CreateSocialPostSchema } from '@/lib/schemas'

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  const userOrError = await requireSession()
  if (userOrError instanceof NextResponse) return userOrError

  const result = CreateSocialPostSchema.safeParse(await req.json())
  if (!result.success) {
    return NextResponse.json(
      { error: 'Validation failed', issues: result.error.flatten().fieldErrors },
      { status: 400 }
    )
  }
  const { companyId, platform, content, status, scheduledAt } = result.data

  // Verify user has social.create permission for this company
  const accessOrError = await requireCompanyAccess(userOrError, companyId, 'social.create')
  if (accessOrError instanceof NextResponse) return accessOrError

  const post = await prisma.socialPost.create({
    data: {
      companyId,
      platform,
      content,
      status,
      scheduledAt: scheduledAt ? new Date(scheduledAt) : null,
      mediaUrls: [],
    },
  })

  return NextResponse.json(post, { status: 201 })
}
