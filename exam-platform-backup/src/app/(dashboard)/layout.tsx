import { Navbar } from '@/components/layout/navbar'
import { Sidebar } from '@/components/layout/sidebar'

export default function DashboardLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <div className="h-full relative bg-[#020202] text-white selection:bg-primary/30 selection:text-primary">
      {/* Background Intelligence Layer */}
      <div className="fixed inset-0 mesh-gradient opacity-10 pointer-events-none" />
      <div className="fixed inset-0 noise pointer-events-none" />

      <div className="hidden h-full md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 z-[80]">
        <Sidebar />
      </div>
      
      <main className="md:pl-72 min-h-screen relative z-10">
        <Navbar />
        <div className="px-6 pb-12">
          {children}
        </div>
      </main>
    </div>
  )
}
