export function PriorityIndicator({ priority }: { priority: string }) {
  if (priority === 'CRITICAL') {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-red-900/50 text-red-400 border border-red-800">
        ⚠ Critical
      </span>
    )
  }
  if (priority === 'HIGH') {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-amber-900/40 text-amber-400">
        ↑ High
      </span>
    )
  }
  return null
}
