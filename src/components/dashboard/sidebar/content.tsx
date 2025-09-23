"use client"

import { LucideChartLine, LucideLayoutGrid } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { cn } from "@/lib/utils"

export const sidebarItems = [
  {
    name: "Analytics",
    url: "/dashboard/analytics",
    icon: LucideChartLine,
  },
  {
    name: "Projects",
    url: "/dashboard/projects",
    icon: LucideLayoutGrid,
  },
]

export default function Content() {
  const pathname = usePathname()

  return (
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupContent>
          <SidebarMenu>
            {sidebarItems.map((item, i) => (
              <SidebarMenuItem key={`${item.name}-${i}`}>
                <SidebarMenuButton asChild>
                  <Link
                    href={item.url}
                    className={cn("hover:bg-sidebar-accent/50", {
                      "bg-sidebar-accent text-sidebar-accent-foreground":
                        pathname === item.url,
                    })}
                  >
                    <item.icon />
                    <span>{item.name}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
  )
}
