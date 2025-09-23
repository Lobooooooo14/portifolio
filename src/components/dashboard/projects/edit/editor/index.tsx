import { useContext } from "react"
import { ProjectDataContext } from "../project-editor"

export default function Content() {
  const project = useContext(ProjectDataContext)

  if (!project.data) {
    return null
  }

  return (
    <main>
      <pre className="whitespace-pre-wrap break-words">
        {JSON.stringify(project.data, null, 2)}
      </pre>
    </main>
  )
}
