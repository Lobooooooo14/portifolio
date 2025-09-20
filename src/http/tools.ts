import type { ProjectVisibility } from "@/utils/db"

type ServerError = {
  message: string
  code: string
  status: number
}

interface ChangeProjectVisibilityProps {
  projectid: string
  newVisibility: ProjectVisibility
  onSuccess?: () => void
  onError?: (error: ServerError) => void
}

interface DeleteProjectProps {
  projectid: string
  onSuccess?: () => Promise<void>
  onError?: (error: ServerError) => void
}

export async function changeProjectVisibility({
  projectid,
  newVisibility,
  onSuccess,
  onError,
}: ChangeProjectVisibilityProps): Promise<void> {
  const response = await fetch(`/api/projects/${projectid}`, {
    method: "PATCH",
    body: JSON.stringify({ visibility: newVisibility }),
  })

  if (!onError || !onSuccess) return

  if (response.status === 204) {
    onSuccess()
    return
  }

  if (response.headers.get("Content-Type") === "application/json") {
    const error = await response.json()

    onError(error)
    return
  }

  onError({
    message: "Unknown error",
    code: "UNKNOWN_ERROR",
    status: 500,
  })
}

export async function deleteProject({
  projectid,
  onSuccess,
  onError,
}: DeleteProjectProps): Promise<void> {
  const response = await fetch(`/api/projects/${projectid}`, {
    method: "DELETE",
  })

  if (!onError || !onSuccess) return

  if (response.status === 204) {
    await onSuccess()
    return
  }

  if (response.headers.get("Content-Type") === "application/json") {
    const error = await response.json()

    onError(error)
    return
  }

  onError({
    message: "Unknown error",
    code: "UNKNOWN_ERROR",
    status: 500,
  })
}
