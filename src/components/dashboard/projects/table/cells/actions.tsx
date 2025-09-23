"use client"

import { useMutation } from "@tanstack/react-query"
import type { Row } from "@tanstack/react-table"
import { LucideCopy, LucideMoreVertical, LucideTrash2 } from "lucide-react"
import { useContext, useEffect } from "react"
import { toast } from "sonner"
import type { ColumnProject } from "@/components/dashboard/projects/columns"
import { ProjectsDataTableContext } from "@/components/dashboard/projects/table"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { deleteProject } from "@/http/api"
import type { ProjectType } from "@/utils/db"

export default function Actions({ row }: { row: Row<ColumnProject> }) {
  const table = useContext(ProjectsDataTableContext)

  const mutationDelete = useMutation({
    mutationFn: async (projectId: ProjectType["id"]) => {
      await deleteProject(projectId)
    },
  })

  useEffect(() => {
    if (mutationDelete.isSuccess && table?.refetch) {
      table.refetch()
      toast.success("Project deleted!", {
        duration: 2000,
        richColors: true,
      })
    }

    if (mutationDelete.isError) {
      toast.error("Error deleting project!", {
        duration: 5000,
        description: `Error: ${mutationDelete.error.message}`,
        richColors: true,
      })
    }
  }, [mutationDelete.status, table?.refetch])

  function handleCopyToClipboard(slug: string) {
    navigator.clipboard.writeText(`${window.location.origin}/projects/${slug}`)

    toast.success("Copied to clipboard!", {
      duration: 2000,
    })
  }

  return (
    <div className="flex justify-end">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <LucideMoreVertical className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end">
          <DropdownMenuItem
            onClick={() => handleCopyToClipboard(row.original.slug)}
          >
            <LucideCopy className="h-4 w-4" />
            Copy project URL
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem
            variant="destructive"
            onClick={() => {
              mutationDelete.mutate(row.original.id)
            }}
          >
            <LucideTrash2 className="h-4 w-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
