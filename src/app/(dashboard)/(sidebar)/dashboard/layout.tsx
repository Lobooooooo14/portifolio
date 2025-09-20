import SidebarInsetHeader from "@/components/dashboard/nav-header"
import { DashboardSidebar } from "@/components/dashboard/sidebar"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <DashboardSidebar />
      <main className="flex w-full h-screen flex-1 flex-col">
        <SidebarInset>
          <SidebarInsetHeader />
          {children}
        </SidebarInset>
      </main>
    </SidebarProvider>
  )
}
