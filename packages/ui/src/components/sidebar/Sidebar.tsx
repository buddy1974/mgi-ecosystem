'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const VENTURES_NAV = [
  { label: 'NMI Education',         href: '/ventures/nmi',    color: '#1D4ED8' },
  { label: 'Horeb Solutions',       href: '/ventures/horeb',  color: '#0a8348' },
  { label: 'Librairie du Quartier', href: '/ventures/lq',     color: '#393186' },
  { label: 'DROS Construction',     href: '/ventures/dros',   color: '#023F78' },
  { label: 'Rogers Nforgwei',       href: '/ventures/rogers', color: '#3a0ca3' },
  { label: 'MGI Holding',           href: '/ventures/mgi',    color: '#92400E' },
]

interface NavItem {
  href: string
  label: string
  icon: string
  badge?: number | string
}

const COMMAND_NAV: NavItem[] = [
  { href: '/priority',   label: 'Priority Tracker',   icon: '🎯' },
  { href: '/dashboard',  label: 'Executive Overview', icon: '🏠' },
  { href: '/operations', label: 'Ops Bridge',         icon: '📡' },
  { href: '/ai',         label: 'AI Assistant',       icon: '🤖', badge: 'Live' },
  { href: '/inbox',      label: 'Communications',     icon: '💬', badge: 14 },
  { href: '/approvals',  label: 'Approval Center',    icon: '✅', badge: 8 },
  { href: '/ventures',   label: 'Ventures',           icon: '🏢' },
  { href: '/calendar',   label: 'Calendar',           icon: '📅' },
  { href: '/social',     label: 'Social Command',     icon: '📣' },
]

const OPERATIONS_NAV: NavItem[] = [
  { href: '/crm',        label: 'CRM',               icon: '👥', badge: 28 },
  { href: '/events',     label: 'Events & Bookings', icon: '📆' },
  { href: '/newsletter', label: 'Newsletter Engine', icon: '📧' },
  { href: '/knowledge',  label: 'Knowledge',         icon: '📚' },
]

function NavLink({ item, collapsed }: { item: NavItem; collapsed: boolean }) {
  const pathname = usePathname()
  const isActive = pathname === item.href || pathname.startsWith(item.href + '/')

  return (
    <Link
      href={item.href}
      className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors ${
        isActive
          ? 'bg-white/10 text-white'
          : 'text-mgi-muted hover:bg-white/5 hover:text-white'
      }`}
    >
      <span className="text-base leading-none">{item.icon}</span>
      {!collapsed && (
        <>
          <span className="flex-1 truncate">{item.label}</span>
          {item.badge !== undefined && (
            <span
              className={`rounded px-1.5 py-0.5 text-xs font-medium ${
                item.badge === 'Live'
                  ? 'bg-emerald-900 text-emerald-400'
                  : 'bg-white/10 text-mgi-muted'
              }`}
            >
              {item.badge}
            </span>
          )}
        </>
      )}
    </Link>
  )
}

interface SidebarProps {
  unreadMessages?: number
  pendingApprovals?: number
  pendingBookings?: number
  scheduledPosts?: number
  newOperationsReports?: number
}

export function Sidebar({ unreadMessages, pendingApprovals, pendingBookings, scheduledPosts, newOperationsReports }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false)
  const commandNav = COMMAND_NAV.map(item => {
    if (item.href === '/inbox' && unreadMessages !== undefined)
      return { ...item, badge: unreadMessages }
    if (item.href === '/approvals' && pendingApprovals !== undefined)
      return { ...item, badge: pendingApprovals }
    if (item.href === '/calendar' && pendingBookings !== undefined && pendingBookings > 0)
      return { ...item, badge: pendingBookings }
    if (item.href === '/social' && scheduledPosts !== undefined && scheduledPosts > 0)
      return { ...item, badge: scheduledPosts }
    if (item.href === '/operations' && newOperationsReports !== undefined && newOperationsReports > 0)
      return { ...item, badge: newOperationsReports }
    return item
  })

  return (
    <aside
      className={`flex flex-col bg-mgi-sidebar border-r border-mgi-border transition-all duration-300 ${
        collapsed ? 'w-14' : 'w-[196px]'
      } min-h-screen`}
    >
      {/* Header */}
      <div className="flex items-center gap-2 px-4 py-4 border-b border-mgi-border">
        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded bg-white text-black text-xs font-bold">
          M
        </div>
        {!collapsed && (
          <div className="min-w-0">
            <p className="text-xs font-semibold text-mgi-text truncate">MGI Executive OS</p>
            <p className="font-mono text-[10px] text-mgi-label">V1.0 · LEITSTELLE</p>
          </div>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="ml-auto text-mgi-label hover:text-white transition-colors shrink-0"
          aria-label="Toggle sidebar"
        >
          {collapsed ? '→' : '←'}
        </button>
      </div>

      {/* CEO Identity */}
      <div className="px-3 py-3 border-b border-mgi-border">
        <div className="flex items-center gap-2 rounded-md px-2 py-1.5 hover:bg-white/5 cursor-pointer transition-colors">
          <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-500 text-[10px] font-bold text-white">
            RN
          </div>
          {!collapsed && (
            <div className="min-w-0 flex-1">
              <p className="text-xs font-medium text-mgi-text truncate">Rogers Nforgwei</p>
              <p className="text-[10px] text-mgi-label truncate">CEO · MGI Ventures</p>
            </div>
          )}
          {!collapsed && <span className="text-mgi-label text-xs shrink-0">▾</span>}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-2 py-3 space-y-4">
        {/* COMMAND */}
        <div>
          {!collapsed && (
            <p className="px-3 pb-1.5 text-[10px] font-semibold uppercase tracking-widest text-mgi-label">
              Command
            </p>
          )}
          <div className="space-y-0.5">
            {commandNav.map((item) => (
              <NavLink key={item.href} item={item} collapsed={collapsed} />
            ))}
          </div>
        </div>

        {/* OPERATIONS */}
        <div>
          {!collapsed && (
            <p className="px-3 pb-1.5 text-[10px] font-semibold uppercase tracking-widest text-mgi-label">
              Operations
            </p>
          )}
          <div className="space-y-0.5">
            {OPERATIONS_NAV.map((item) => (
              <NavLink key={item.href} item={item} collapsed={collapsed} />
            ))}
          </div>
        </div>

        {/* VENTURES */}
        <div>
          {!collapsed && (
            <p className="px-3 pb-1.5 text-[10px] font-semibold uppercase tracking-widest text-mgi-label">
              Ventures
            </p>
          )}
          <div className="space-y-0.5">
            {VENTURES_NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 rounded-md px-3 py-2 text-sm text-mgi-muted hover:bg-white/5 hover:text-white transition-colors"
              >
                <span
                  className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-white"
                  style={{ backgroundColor: item.color }}
                >
                  {item.label.slice(0, 1)}
                </span>
                {!collapsed && <span className="truncate">{item.label}</span>}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      {/* Bottom */}
      <div className="border-t border-mgi-border px-3 py-3">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-amber-500 text-[10px] font-bold text-white">
            RN
          </div>
          {!collapsed && (
            <>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-medium text-mgi-text truncate">Rogers Nforgwei</p>
                <p className="text-[10px] text-mgi-label truncate">rogers@mgi-ventures.com</p>
              </div>
              <Link href="/settings" className="text-mgi-label hover:text-white transition-colors shrink-0">
                ⚙
              </Link>
            </>
          )}
        </div>
      </div>
    </aside>
  )
}
