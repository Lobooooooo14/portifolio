import type { ProjectType } from "@/utils/db"

export default function Content({ project }: { project: ProjectType }) {
  return (
    <main>
      <pre className="whitespace-pre-wrap break-words">
        {JSON.stringify(project, null, 2)}
      </pre>
    </main>
  )
}
