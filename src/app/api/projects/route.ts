import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import { listProjects } from "@/utils/db"

export async function GET(_request: NextRequest) {
  const projects = await listProjects(db)

  return NextResponse.json(projects)
}
