import { notFound } from 'next/navigation'
import Link from 'next/link'
import { VENTURES } from '@/lib/ventures-config'

interface Props {
  params: Promise<{ slug: string; programSlug: string }>
}

export default async function ProgramPage({ params }: Props) {
  const { slug, programSlug } = await params

  const venture = VENTURES[slug]
  if (!venture) notFound()

  const program = venture.programConfigs?.find((p) => p.slug === programSlug)
  if (!program) notFound()

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <div>
        <Link
          href={`/ventures/${slug}`}
          className="inline-flex items-center gap-1.5 text-sm text-[#64748B] hover:text-[#CBD5E1] transition-colors"
        >
          ← {venture.name}
        </Link>
      </div>

      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div
            className="flex h-12 w-12 items-center justify-center rounded-xl text-white text-xs font-bold flex-shrink-0"
            style={{ backgroundColor: venture.primaryColor }}
          >
            {program.shortName}
          </div>
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-[#F1F5F9]">
              {program.name}
            </h1>
            <p className="text-sm text-[#64748B] italic">
              Tagline pending — awaiting content from Jeanette
            </p>
          </div>
        </div>
        <span className="mt-1 inline-flex items-center rounded-full bg-emerald-900/30 px-2.5 py-0.5 text-xs font-medium text-emerald-400 ring-1 ring-inset ring-emerald-500/20 flex-shrink-0">
          Active
        </span>
      </div>

      {/* Quick Actions */}
      <div className="flex flex-wrap gap-2">
        {[
          'Create Approval',
          'Schedule Post',
          'Add Event',
          'View Registrations',
        ].map((label) => (
          <button
            key={label}
            className="rounded-lg border border-[#1F2D40] bg-[#111827] px-3 py-1.5 text-sm text-[#94A3B8] hover:border-[#334155] hover:text-[#CBD5E1] transition-colors"
          >
            {label}
          </button>
        ))}
      </div>

      {/* Overview + Key Dates */}
      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-xl bg-[#111827] border border-[#1F2D40] p-4">
          <p className="text-[#64748B] text-xs uppercase tracking-wider font-semibold mb-3">
            Overview
          </p>
          <div className="rounded-lg border border-dashed border-[#1F2D40] p-4 text-center">
            <p className="text-sm text-[#64748B] italic">Program description pending</p>
            <p className="text-xs text-[#475569] mt-1">
              Content will be added when received from Jeanette
            </p>
          </div>
        </div>

        <div className="rounded-xl bg-[#111827] border border-[#1F2D40] p-4">
          <p className="text-[#64748B] text-xs uppercase tracking-wider font-semibold mb-3">
            Key Dates
          </p>
          <div className="rounded-lg border border-dashed border-[#1F2D40] p-4 text-center">
            <p className="text-sm text-[#64748B] italic">No dates added yet</p>
            <p className="text-xs text-[#475569] mt-1">
              Event dates will appear here once entered
            </p>
          </div>
        </div>
      </div>

      {/* Upcoming Events */}
      <div className="rounded-xl bg-[#111827] border border-[#1F2D40] p-4">
        <p className="text-[#64748B] text-xs uppercase tracking-wider font-semibold mb-3">
          Upcoming Events
        </p>
        <div className="rounded-lg border border-dashed border-[#1F2D40] p-6 text-center">
          <p className="text-sm text-[#64748B] italic">No upcoming events</p>
          <p className="text-xs text-[#475569] mt-1">
            Events added to the Calendar will appear here
          </p>
        </div>
      </div>

      {/* Scheduled Social Posts */}
      <div className="rounded-xl bg-[#111827] border border-[#1F2D40] p-4">
        <p className="text-[#64748B] text-xs uppercase tracking-wider font-semibold mb-3">
          Scheduled Social Posts
        </p>
        <div className="rounded-lg border border-dashed border-[#1F2D40] p-6 text-center">
          <p className="text-sm text-[#64748B] italic">
            No posts scheduled for this program
          </p>
          <Link
            href="/social"
            className="mt-2 inline-block text-xs text-[#64748B] hover:text-[#94A3B8] transition-colors"
          >
            Schedule a post →
          </Link>
        </div>
      </div>
    </div>
  )
}
