"use client"

import { useContext } from "react"
import { Button } from "@/components/ui/button"
import { ProjectDataContext } from "./project-editor"

export default function SidebarNavFooter() {
  const project = useContext(ProjectDataContext)

  return (
    <div className="border-t-2 pt-2">
      <Button className="w-full">Save</Button>
    </div>
  )
}
