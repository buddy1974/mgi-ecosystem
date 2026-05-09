'use client'

import type { BookingRequest } from '@mgi/database'
import { format } from 'date-fns'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

const COMPANY_NAMES: Record<string, string> = {
  nmi: 'NMI Education', horeb: 'Horeb Solutions', lq: 'Librairie du Quartier',
  dros: 'DROS Construction', rogers: 'Rogers Nforgwei', mgi: 'MGI Holding',
}

interface Props { booking: BookingRequest }

export function BookingRequestCard({ booking }: Props) {
  const router = useRouter()
  const [loading, setLoading] = useState<'confirm' | 'decline' | null>(null)

  async function handleAction(action: 'confirm' | 'decline') {
    setLoading(action)
    try {
      await fetch(`/api/bookings/${booking.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action }),
      })
      router.refresh()
    } finally {
      setLoading(null)
    }
  }

  return (
    <div className="rounded-xl bg-[#111827] border border-[#1F2D40] p-4">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <p className="text-white font-medium text-sm">{booking.requesterName}</p>
            {booking.companyId && (
              <span className="text-[10px] text-[#64748B] bg-[#1E293B] px-2 py-0.5 rounded">
                {COMPANY_NAMES[booking.companyId] ?? booking.companyId}
              </span>
            )}
          </div>
          <p className="text-[#94A3B8] text-xs mb-1">{booking.requesterEmail}</p>
          <p className="text-[#CBD5E1] text-xs">{booking.purpose}</p>
        </div>
        <div className="text-right flex-shrink-0">
          <p className="text-white text-xs font-mono">{format(new Date(booking.requestedDate), 'MMM d, HH:mm')}</p>
          <p className="text-[#64748B] text-[10px]">{booking.duration} min</p>
        </div>
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => handleAction('confirm')}
          disabled={loading !== null}
          className="flex-1 py-1.5 rounded-lg text-xs font-semibold bg-emerald-900/40 text-emerald-300 border border-emerald-800 hover:bg-emerald-900/60 disabled:opacity-50 transition-colors"
        >
          {loading === 'confirm' ? '...' : 'Confirm'}
        </button>
        <button
          onClick={() => handleAction('decline')}
          disabled={loading !== null}
          className="flex-1 py-1.5 rounded-lg text-xs font-semibold bg-red-900/30 text-red-400 border border-red-900 hover:bg-red-900/50 disabled:opacity-50 transition-colors"
        >
          {loading === 'decline' ? '...' : 'Decline'}
        </button>
      </div>
    </div>
  )
}
