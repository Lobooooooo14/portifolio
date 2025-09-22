"use client"

import { useGSAP } from "@gsap/react"
import { useQuery } from "@tanstack/react-query"
import { gsap } from "gsap"
import { LucideRotateCcw } from "lucide-react"
import { createContext, useEffect, useRef, useState } from "react"
import { columns } from "@/components/dashboard/projects/columns"
import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/ui/data-table"
import { Skeleton } from "@/components/ui/skeleton"
import {
  type ErrorResponse,
  getProjects,
  type ListProjectsType,
} from "@/http/api"
import type { ProjectType } from "@/utils/db"

gsap.registerPlugin(useGSAP)

export const ProjectsDataTableContext = createContext<{
  // biome-ignore lint/suspicious/noExplicitAny: ignore
  refetch: () => Promise<any>
} | null>(null)

export default function ProjectsDataTable() {
  const [data, setData] = useState<ProjectType[]>([])
  const iconRef = useRef(null)
  const [canRefetch, setCanRefetch] = useState(true)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const {
    data: projectsData,
    isLoading,
    isFetching,
    refetch,
  } = useQuery<ListProjectsType, ErrorResponse>({
    queryKey: ["projects"],
    queryFn: () => getProjects(),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  })

  useGSAP(() => {
    if (isFetching) {
      gsap.to(iconRef.current, {
        rotation: "-=360",
        repeat: -1,
        duration: 1,
        ease: "none",
      })
    } else {
      gsap.killTweensOf(iconRef.current)
      gsap.to(iconRef.current, {
        rotation: 0,
        duration: 0.5,
        ease: "power2.out",
      })
    }
  }, [isFetching])

  // TODO: refactor
  useEffect(() => {
    if (projectsData) {
      const { data, success } = projectsData
      if (!success || !data) return

      setData(
        data.sort((a, b) => {
          if (a.title < b.title) return -1
          if (a.title > b.title) return 1
          return 0
        })
      )
    }
  }, [projectsData])

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  function handleRefetch() {
    if (!isFetching && canRefetch) {
      refetch()
      setCanRefetch(false)
      timeoutRef.current = setTimeout(() => {
        setCanRefetch(true)
      }, 5000)
    }
  }

  if (isLoading) {
    return <Skeleton className="h-48" />
  }

  return (
    <ProjectsDataTableContext.Provider value={{ refetch }}>
      <div>
        <div className="mt-4 mb-2 flex justify-between items-center">
          <p className="text-sm text-muted-foreground">
            Total projects: {data.length}
          </p>
          <Button
            variant="ghost"
            size="icon"
            className="size-8"
            onClick={handleRefetch}
            disabled={isFetching || !canRefetch}
          >
            <LucideRotateCcw ref={iconRef} />
          </Button>
        </div>

        <DataTable
          aria-disabled={isFetching}
          columns={columns}
          data={data.map(project => ({
            id: project.id,
            title: project.title,
            slug: project.slug,
            shortDescription: project.shortDescription,
            visibility: project.visibility,
          }))}
        />
      </div>
    </ProjectsDataTableContext.Provider>
  )
}
