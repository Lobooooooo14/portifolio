import { LucidePlus } from "lucide-react"
import { CreateProjectDialog } from "@/components/dashboard/projects/create-project-dialog"
import DataTable from "@/components/dashboard/projects/table"
import { Button } from "@/components/ui/button"
import { Dialog, DialogTrigger } from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"

export default async function Page() {
  return (
    <section className="flex flex-1 justify-center">
      <Dialog>
        <CreateProjectDialog />

        <div className="w-5/6 space-y-6 p-4 mt-8">
          <div className="flex justify-between">
            <h2 className="text-2xl font-semibold">Manage your projects</h2>
            <DialogTrigger asChild>
              <Button>
                New project <LucidePlus />
              </Button>
            </DialogTrigger>
          </div>

          <Separator orientation="horizontal" />

          <DataTable />
        </div>
      </Dialog>
    </section>
  )
}
