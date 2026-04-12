import { DashboardSidebar } from '@/components/ui/DashboardSidebar'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex-1 bg-background flex pt-24 min-h-screen">
      <DashboardSidebar />
      {/* Admin Content Area */}
      <div className="flex-1 overflow-y-auto">
        {children}
      </div>
    </div>
  )
}
