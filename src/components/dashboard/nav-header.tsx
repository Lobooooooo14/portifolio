"use client"

import { usePathname } from "next/navigation"
import { sidebarItems } from "@/components/dashboard/nav-main"

import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"

export default function SidebarInsetHeader() {
  const pathname = usePathname()

  const item = sidebarItems.find(item => item.url === pathname)

  return (
    <header className="sticky top-0 z-50 bg-background border-b border-b-divider flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
      <div className="flex items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1" />

        {item && (
          <>
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />

            <h1 className="text-lg font-semibold">{item.name}</h1>
          </>
        )}
      </div>
    </header>
  )
}
