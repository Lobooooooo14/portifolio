import type { ProjectType } from "@/utils/db"

export type ApiResponseProjects = {
  success: boolean
  data: ProjectType[]
}

export type ApiResponseProject = {
  success: boolean
  data: ProjectType
}

export async function getProjects(): Promise<ApiResponseProjects> {
  const response = await fetch("/api/projects", {
    method: "GET",
  })

  return response.json()
}

export async function getProject(
  projectId: string
): Promise<ApiResponseProject> {
  const response = await fetch(`/api/projects/${projectId}`, {
    method: "GET",
  })

  return response.json()
}

export async function updateProject(projectId: string, project: ProjectType) {
  // biome-ignore lint/correctness/noUnusedVariables: ignore
  const { createdAt, id, ...data } = project

  console.log(data)

  await fetch(`/api/projects/${projectId}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  })
}

export async function deleteProject(projectId: string): Promise<void> {
  await fetch(`/api/projects/${projectId}`, {
    method: "DELETE",
  })
}
