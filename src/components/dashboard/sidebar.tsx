import { Sidebar, SidebarContent, SidebarFooter } from "@/components/ui/sidebar"
import SidebarNavMain from "./nav-main"
import SidebarNavUser from "./nav-user"

export function DashboardSidebar({
  ...rest
}: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...rest}>
      <SidebarContent>
        <SidebarNavMain />
      </SidebarContent>
      <SidebarFooter>
        <SidebarNavUser />
      </SidebarFooter>
    </Sidebar>
  )
}
