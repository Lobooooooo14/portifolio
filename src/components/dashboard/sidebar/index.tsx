import { Sidebar as SidebarComponent } from "@/components/ui/sidebar"
import Content from "./content"
import Footer from "./footer"

export default function Sidebar({
  ...rest
}: React.ComponentProps<typeof SidebarComponent>) {
  return (
    <SidebarComponent collapsible="icon" {...rest}>
      <Content />
      <Footer />
    </SidebarComponent>
  )
}
