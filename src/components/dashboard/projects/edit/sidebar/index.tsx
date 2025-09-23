"use client"

import { useContext } from "react"
import LoadingCircle from "@/components/loading-circle"
import { Sidebar } from "@/components/ui/sidebar"
import { ProjectDataContext } from "../project-editor"
import Content from "./content"
import Footer from "./footer"
import Header from "./header"

export function EditorSidebar({
  ...rest
}: React.ComponentProps<typeof Sidebar>) {
  const project = useContext(ProjectDataContext)

  return (
    <Sidebar side="right" {...rest}>
      {project.data ? (
        <>
          <Header />
          <Content />
          <Footer />
        </>
      ) : (
        <div className="flex items-center justify-center h-full">
          <LoadingCircle />
        </div>
      )}
    </Sidebar>
  )
}
