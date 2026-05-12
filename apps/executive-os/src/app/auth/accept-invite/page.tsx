'use client'

import { useState, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'

function AcceptInviteForm() {
  const params   = useSearchParams()
  const router   = useRouter()
  const token    = params.get('token')
  const [password, setPassword] = useState('')
  const [loading, setLoading]   = useState(false)
  const [error, setError]       = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!token) return
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/users/accept-invite', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ token, password }),
      })
      if (res.ok) {
        router.push('/login?invited=true')
      } else {
        const data = await res.json()
        setError(data.error ?? 'Something went wrong')
      }
    } finally {
      setLoading(false)
    }
  }

  if (!token) {
    return (
      <p className="text-sm text-red-400">
        Invalid invite link — no token found.
      </p>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-xs text-[#64748B] uppercase tracking-wider mb-1.5">
          Password
        </label>
        <input
          type="password"
          placeholder="Create a password (min 8 characters)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          minLength={8}
          required
          className="w-full rounded-lg border border-[#1F2D40] bg-[#0D1117] px-3 py-2 text-sm text-[#F1F5F9] placeholder:text-[#475569] focus:border-[#3a0ca3] focus:outline-none"
        />
      </div>
      {error && <p className="text-sm text-red-400">{error}</p>}
      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-lg bg-[#3a0ca3] py-2 text-sm font-medium text-white hover:bg-[#4a1cb3] disabled:opacity-50 transition-colors"
      >
        {loading ? 'Setting up…' : 'Accept invitation →'}
      </button>
    </form>
  )
}

export default function AcceptInvitePage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0D1117]">
      <div className="w-full max-w-md rounded-2xl border border-[#1F2D40] bg-[#111827] p-8">
        <div className="mb-6">
          <h1 className="text-xl font-semibold text-[#F1F5F9]">Set your password</h1>
          <p className="text-sm text-[#64748B] mt-1">
            You've been invited to MGI Executive OS. Create a password to get started.
          </p>
        </div>
        <Suspense fallback={<p className="text-sm text-[#64748B]">Loading…</p>}>
          <AcceptInviteForm />
        </Suspense>
      </div>
    </div>
  )
}
