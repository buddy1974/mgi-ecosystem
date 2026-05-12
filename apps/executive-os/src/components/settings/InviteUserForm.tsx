'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export function InviteUserForm() {
  const router = useRouter()
  const [open, setOpen]       = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState('')
  const [success, setSuccess] = useState('')
  const [form, setForm]       = useState({ email: '', name: '', role: 'USER' })

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess('')
    try {
      const res = await fetch('/api/users/invite', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(form),
      })
      if (res.ok) {
        setSuccess('Invite sent!')
        setForm({ email: '', name: '', role: 'USER' })
        setTimeout(() => { setOpen(false); setSuccess(''); router.refresh() }, 1500)
      } else {
        const data = await res.json()
        setError(data.error ?? 'Failed to send invite')
      }
    } finally {
      setLoading(false)
    }
  }

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="rounded-lg border border-[#1F2D40] bg-[#111827] px-3 py-1.5 text-xs text-[#94A3B8] hover:border-[#334155] hover:text-[#CBD5E1] transition-colors"
      >
        + Invite member
      </button>
    )
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl border border-[#1F2D40] bg-[#111827] p-6 shadow-2xl">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-semibold text-[#F1F5F9]">Invite team member</h2>
          <button onClick={() => setOpen(false)} className="text-[#475569] hover:text-[#94A3B8] text-xl leading-none">&times;</button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="block text-xs text-[#64748B] uppercase tracking-wider mb-1">Email</label>
            <input
              type="email" required
              value={form.email}
              onChange={(e) => setForm(f => ({ ...f, email: e.target.value }))}
              className="w-full rounded-lg border border-[#1F2D40] bg-[#0D1117] px-3 py-2 text-sm text-[#F1F5F9] placeholder:text-[#475569] focus:border-[#3a0ca3] focus:outline-none"
              placeholder="team@mgi-ventures.com"
            />
          </div>
          <div>
            <label className="block text-xs text-[#64748B] uppercase tracking-wider mb-1">Name</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm(f => ({ ...f, name: e.target.value }))}
              className="w-full rounded-lg border border-[#1F2D40] bg-[#0D1117] px-3 py-2 text-sm text-[#F1F5F9] placeholder:text-[#475569] focus:border-[#3a0ca3] focus:outline-none"
              placeholder="Full name"
            />
          </div>
          <div>
            <label className="block text-xs text-[#64748B] uppercase tracking-wider mb-1">Role</label>
            <select
              value={form.role}
              onChange={(e) => setForm(f => ({ ...f, role: e.target.value }))}
              className="w-full rounded-lg border border-[#1F2D40] bg-[#0D1117] px-3 py-2 text-sm text-[#F1F5F9] focus:border-[#3a0ca3] focus:outline-none"
            >
              <option value="USER">Member</option>
              <option value="ADMIN">Admin</option>
              <option value="SUPER_ADMIN">Super Admin</option>
            </select>
          </div>

          {error   && <p className="text-xs text-red-400">{error}</p>}
          {success && <p className="text-xs text-emerald-400">{success}</p>}

          <div className="flex gap-2 pt-1">
            <button
              type="button" onClick={() => setOpen(false)}
              className="flex-1 rounded-lg border border-[#1F2D40] py-2 text-xs text-[#64748B] hover:text-[#94A3B8] transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit" disabled={loading}
              className="flex-1 rounded-lg bg-[#3a0ca3] py-2 text-xs font-medium text-white hover:bg-[#4a1cb3] disabled:opacity-50 transition-colors"
            >
              {loading ? 'Sending…' : 'Send invite'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
