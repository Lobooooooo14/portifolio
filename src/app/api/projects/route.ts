import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import { getSession, safeParseBody } from "@/utils/api"
import {
  getProjectBySlug,
  insertProject,
  listProjects,
  ProjectVisibility,
} from "@/utils/db"
import { projectInsertSchema } from "@/utils/validations"

export async function GET(request: NextRequest) {
  const session = await getSession(request.headers)

  const visibilityPermissions: ProjectVisibility[] = [ProjectVisibility.PUBLIC]

  if (session) {
    visibilityPermissions.push(
      ProjectVisibility.PRIVATE,
      ProjectVisibility.UNLISTED
    )
  }

  const projects = await listProjects(db, visibilityPermissions)

  return NextResponse.json({
    success: true,
    data: projects,
  })
}

export async function POST(request: NextRequest) {
  const session = await getSession(request.headers)

  if (!session) {
    return NextResponse.json(
      {
        success: false,
        code: "UNAUTHORIZED",
        message: "Unauthorized",
      },
      { status: 401 }
    )
  }

  const body = await safeParseBody(request)

  const parsed = projectInsertSchema.safeParse(body)

  if (!parsed.success) {
    return NextResponse.json(
      {
        success: false,
        code: "BAD_REQUEST",
        message: "Invalid request body",
      },
      { status: 400 }
    )
  }

  const projectBySlug = await getProjectBySlug(db, parsed.data.slug)

  if (projectBySlug) {
    return NextResponse.json(
      {
        success: false,
        code: "PROJECT_SLUG_ALREADY_EXISTS",
        message: "Project with this slug already exists",
      },
      { status: 409 }
    )
  }

  const project = await insertProject(db, parsed.data)

  return NextResponse.json(
    {
      success: true,
      data: {
        id: project.id,
      },
    },
    {
      status: 201,
    }
  )
}
