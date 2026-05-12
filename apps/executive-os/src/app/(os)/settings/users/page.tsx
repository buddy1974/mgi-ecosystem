import { redirect } from 'next/navigation'
import { auth } from '@/auth'
import { prisma } from '@mgi/database'
import { InviteUserForm } from '@/components/settings/InviteUserForm'

export const dynamic = 'force-dynamic'
export const revalidate = 0

const ROLE_LABELS: Record<string, string> = {
  SUPER_ADMIN:    'Super Admin',
  ADMIN:          'Admin',
  USER:           'Member',
}

const STATUS_COLORS: Record<string, string> = {
  active:   'text-emerald-400 bg-emerald-900/20 ring-emerald-500/20',
  invited:  'text-amber-400 bg-amber-900/20 ring-amber-500/20',
  suspended:'text-red-400 bg-red-900/20 ring-red-500/20',
}

export default async function UsersPage() {
  const session = await auth()
  if (!session) redirect('/login')

  const users = await prisma.user.findMany({
    orderBy: { createdAt: 'desc' },
    select: {
      id: true, email: true, name: true,
      globalRole: true, status: true, createdAt: true,
    },
  })

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-light text-white">Team Members</h1>
          <p className="text-[#64748B] text-[11px] uppercase tracking-widest mt-1 font-mono">
            {users.length} MEMBER{users.length !== 1 ? 'S' : ''} · ACCESS CONTROL
          </p>
        </div>
        <InviteUserForm />
      </div>

      <div className="rounded-xl border border-[#1F2D40] bg-[#111827] overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[#1F2D40]">
              <th className="px-4 py-3 text-left text-xs text-[#64748B] uppercase tracking-wider font-medium">Name</th>
              <th className="px-4 py-3 text-left text-xs text-[#64748B] uppercase tracking-wider font-medium">Email</th>
              <th className="px-4 py-3 text-left text-xs text-[#64748B] uppercase tracking-wider font-medium">Role</th>
              <th className="px-4 py-3 text-left text-xs text-[#64748B] uppercase tracking-wider font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b border-[#1F2D40] last:border-0 hover:bg-white/[0.02] transition-colors">
                <td className="px-4 py-3 font-medium text-[#CBD5E1]">
                  {user.name ?? <span className="text-[#475569] italic">No name</span>}
                </td>
                <td className="px-4 py-3 text-[#64748B]">{user.email}</td>
                <td className="px-4 py-3">
                  <span className="inline-flex items-center rounded-full border border-[#1F2D40] px-2 py-0.5 text-xs text-[#94A3B8]">
                    {ROLE_LABELS[user.globalRole] ?? user.globalRole}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ring-1 ring-inset ${STATUS_COLORS[user.status] ?? STATUS_COLORS.active}`}>
                    {user.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {users.length === 0 && (
          <div className="py-12 text-center text-[#475569] text-sm">
            No team members yet
          </div>
        )}
      </div>
    </div>
  )
}
