import { LucidePlus } from "lucide-react"
import ProjectsDataTable from "@/components/dashboard/projects/projects-data-table"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

export default async function Page() {
  return (
    <section className="flex flex-1 justify-center">
      <div className="w-3/4 space-y-6 p-4 mt-8">
        <div className="flex justify-between">
          <h2 className="text-2xl font-semibold">Manage your projects</h2>
          <Button>
            New project <LucidePlus />
          </Button>
        </div>

        <Separator orientation="horizontal" />

        <ProjectsDataTable />
      </div>
    </section>
  )
}
