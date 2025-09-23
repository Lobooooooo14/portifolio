import Sidebar from "@/components/dashboard/sidebar"
import InsetHeader from "@/components/dashboard/sidebar/inset-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <Sidebar />

      <main className="flex w-full h-screen flex-1 flex-col">
        <SidebarInset>
          <InsetHeader />
          {children}
        </SidebarInset>
      </main>
    </SidebarProvider>
  )
}
