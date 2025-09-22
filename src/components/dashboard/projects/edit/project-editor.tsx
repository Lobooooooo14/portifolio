"use client"

import { useMutation, useQuery } from "@tanstack/react-query"
import isEqual from "lodash/isEqual"
import { LucideArrowLeft, LucideSave } from "lucide-react"
import Link from "next/link"
import type React from "react"
import { createContext, useEffect, useState } from "react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Skeleton } from "@/components/ui/skeleton"
import VisibilityBadge from "@/components/visibility"
import { useIsMobile } from "@/hooks/use-mobile"
import {
  type ErrorResponse,
  type GetProjectType,
  getProject,
  updateProject,
} from "@/http/api"
import type { ProjectType } from "@/utils/db"
import { projectUpdateSchema } from "@/utils/validations"
import Content from "./editor/content"
import { EditorSidebar } from "./sidebar"

export interface ProjectDataContextType {
  data: ProjectType | null
  setData: (data: React.SetStateAction<ProjectType | null>) => void
}

export const ProjectDataContext = createContext<ProjectDataContextType>({
  data: null,
  setData: () => {},
})

export default function ProjectEditor({
  projectId,
}: {
  projectId: ProjectType["id"]
}) {
  const [data, setData] = useState<ProjectType | null>(null)
  const [lastData, setLastData] = useState<ProjectType | null>(null)
  const isMobile = useIsMobile()

  const projectQuery = useQuery<GetProjectType, ErrorResponse>({
    queryKey: ["project", projectId],
    queryFn: () => getProject(projectId),
  })

  const mutation = useMutation({
    mutationFn: (data: ProjectType) => updateProject(projectId, data),
    onSuccess: () => {
      projectQuery.refetch()
    },
  })

  // TODO: refactor
  useEffect(() => {
    if (projectQuery.data?.success) {
      setData(projectQuery.data.data)
      setLastData(projectQuery.data.data)
    }
  }, [projectQuery.data])

  function handleSave(data: ProjectType) {
    const parsed = projectUpdateSchema.safeParse(data)

    if (!parsed.success) {
      toast.error("Error saving project!", {
        description: parsed.error.message,
        richColors: true,
        duration: 5000,
      })
      return
    }

    toast.success("Project saved!", {
      duration: 2000,
      richColors: true,
    })

    mutation.mutate(data)
    setLastData(data)
  }

  return (
    <ProjectDataContext.Provider value={{ data, setData }}>
      <SidebarProvider sidebarWidth="24rem">
        <SidebarInset>
          <header className="sticky top-0 z-50 bg-background flex h-16 shrink-0 items-center gap-2 border-b px-4">
            <Link href="/dashboard/projects">
              <LucideArrowLeft className="h-4 w-4" />
            </Link>

            {!data && projectQuery.isLoading && (
              <>
                <Skeleton className="h-8 w-[20%]" />
                <Skeleton className="h-8 w-[10%]" />
                <Skeleton className="h-8 w-8" />
              </>
            )}

            {data && (
              <>
                <h1 className="text-lg font-semibold truncate max-w-[20%]">
                  {data.title}
                </h1>
                <VisibilityBadge visibility={data.visibility} />
                <Button
                  variant="ghost"
                  onClick={() => handleSave(data)}
                  disabled={
                    isEqual(lastData, data) ||
                    !projectUpdateSchema.safeParse(data).success
                  }
                >
                  <LucideSave className="h-6 w-6" />
                  {!isEqual(lastData, data) && !isMobile && (
                    <span className="text-sm text-muted-foreground">
                      Unsaved changes
                    </span>
                  )}
                </Button>
              </>
            )}

            <SidebarTrigger className="-mr-1 ml-auto rotate-180" />
          </header>

          {!data && projectQuery.isLoading && (
            <div className="p-4 flex flex-col gap-4 items-center">
              {Array.from({ length: 10 }).map((_, i) => (
                <Skeleton key={i} className="w-[80%] h-8 rounded-lg" />
              ))}
            </div>
          )}

          {data && <Content project={data} />}
        </SidebarInset>

        <EditorSidebar />
      </SidebarProvider>
    </ProjectDataContext.Provider>
  )
}
