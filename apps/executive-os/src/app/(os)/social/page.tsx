import { getSocialPosts, getSocialStats } from '@/lib/social-data'
import { PostComposer, PostCard, PostFilter, SocialStatsBar, PlatformCoverageCard } from '@/components/social'
import { Suspense } from 'react'

export const dynamic = 'force-dynamic'
export const revalidate = 0

interface Props {
  searchParams: Promise<{ company?: string; status?: string }>
}

export default async function SocialPage({ searchParams }: Props) {
  const { company, status } = await searchParams

  const [posts, stats] = await Promise.all([
    getSocialPosts({ companyId: company, status }),
    getSocialStats(),
  ])

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-white text-xl font-semibold tracking-tight">Social Command</h1>
          <p className="text-[#64748B] text-xs mt-0.5">
            {stats.scheduled} scheduled · {stats.drafts} drafts · {stats.publishedThisWeek} published this week
          </p>
        </div>
      </div>

      <SocialStatsBar drafts={stats.drafts} scheduled={stats.scheduled} publishedThisWeek={stats.publishedThisWeek} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <PostComposer />
          <Suspense fallback={null}>
            <PostFilter />
          </Suspense>
          <div className="flex flex-col gap-3">
            {posts.length === 0 ? (
              <div className="rounded-xl bg-[#111827] border border-[#1F2D40] p-6 text-center">
                <p className="text-[#475569] text-sm">No posts match the current filter.</p>
              </div>
            ) : (
              posts.map((post) => <PostCard key={post.id} post={post} />)
            )}
          </div>
        </div>
        <div>
          <PlatformCoverageCard />
        </div>
      </div>
    </div>
  )
}
