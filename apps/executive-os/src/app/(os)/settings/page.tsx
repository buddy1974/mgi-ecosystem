export default function SettingsPage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-white text-xl font-semibold tracking-tight">Settings</h1>
        <p className="text-[#64748B] text-xs mt-0.5">System configuration — MGI Executive OS</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {[
          { title: 'Profile & Identity',    description: 'CEO name, email, avatar, timezone',                           status: 'Coming soon' },
          { title: 'Authentication',        description: 'Password management, session settings',                       status: 'Coming soon' },
          { title: 'Notifications',         description: 'Email alerts, push notifications, digest schedule',           status: 'Coming soon' },
          { title: 'Integrations',          description: 'Google Calendar, social media APIs, n8n webhooks',            status: 'Coming soon' },
          { title: 'Team & Delegation',     description: 'Add team members, set permissions per venture',               status: 'Coming soon' },
          { title: 'AI Configuration',      description: 'Briefing frequency, model selection, AI behavior',            status: 'Coming soon' },
        ].map(({ title, description, status }) => (
          <div key={title} className="rounded-xl bg-[#111827] border border-[#1F2D40] p-5">
            <div className="flex items-center justify-between mb-2">
              <p className="text-white font-medium text-sm">{title}</p>
              <span className="text-[10px] px-2 py-0.5 rounded bg-[#1E293B] text-[#475569]">{status}</span>
            </div>
            <p className="text-[#64748B] text-xs">{description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
