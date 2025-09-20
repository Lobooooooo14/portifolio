import ProjectEditor from "@/components/dashboard/projects/edit/project-editor"

import { projectIdSchema } from "@/utils/validations"

export default async function Page({
  params,
}: {
  params: Promise<{ projectId: string }>
}) {
  const { projectId } = await params

  const parsed = projectIdSchema.safeParse({
    id: projectId,
  })

  if (!parsed.success) {
    return
  }

  return <ProjectEditor projectId={parsed.data.id} />
}
