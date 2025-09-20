"use client"

import { useContext } from "react"
import LoadingCircle from "@/components/loading-circle"
import { Sidebar, SidebarContent, SidebarHeader } from "@/components/ui/sidebar"
import SidebarNavMain from "./nav-main"
import { ProjectDataContext } from "./project-editor"

export function EditorSidebar({
  ...rest
}: React.ComponentProps<typeof Sidebar>) {
  const project = useContext(ProjectDataContext)

  return (
    <Sidebar side="right" {...rest}>
      {project.data ? (
        <>
          <SidebarHeader>
            <h2 className="text-2xl font-semibold text-center">
              Metadata editor
            </h2>
          </SidebarHeader>
          <SidebarContent>
            <SidebarNavMain />
          </SidebarContent>
        </>
      ) : (
        <div className="flex items-center justify-center h-full">
          <LoadingCircle />
        </div>
      )}
    </Sidebar>
  )
}
