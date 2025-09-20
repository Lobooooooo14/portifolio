import { RedirectType, redirect } from "next/navigation"

export default function Page() {
  return redirect("/dashboard/analytics", RedirectType.replace)
}
