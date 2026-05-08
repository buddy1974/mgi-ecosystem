import { Sidebar } from '@mgi/ui'
import { TopBar } from '@mgi/ui'
export default async function OSLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // DEV BYPASS — remove before Phase 2
  const session = { user: { name: 'Rogers Nforgwei', email: 'rogers@mgi-ventures.com' } }

  return (
    <div className="flex h-screen overflow-hidden bg-mgi-bg">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <TopBar />
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
