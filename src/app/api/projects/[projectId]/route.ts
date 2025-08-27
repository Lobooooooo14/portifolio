import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import { getSession, safeParseBody } from "@/utils/api"
import {
  deleteProject,
  editProject,
  getProjectById,
  ProjectVisibility,
} from "@/utils/db"
import { projectIdSchema, projectUpdateSchema } from "@/utils/validations"

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ projectId: string }> }
) {
  const session = await getSession(request.headers)

  const { projectId } = await params

  const parsed = projectIdSchema.safeParse({
    id: projectId,
  })

  if (!parsed.success) {
    return NextResponse.json(
      {
        success: false,
        code: "BAD_REQUEST",
        message: "Invalid project ID",
      },
      { status: 400 }
    )
  }

  const project = await getProjectById(db, parsed.data.id)

  if (
    !project ||
    (!session && project.visibility === ProjectVisibility.PRIVATE)
  ) {
    return NextResponse.json(
      {
        success: false,
        code: "NOT_FOUND",
        message: "Project not found",
      },
      { status: 404 }
    )
  }

  return NextResponse.json(
    {
      success: true,
      data: project,
    },
    { status: 200 }
  )
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ projectId: string }> }
) {
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

  const { projectId } = await params

  const parsed = projectIdSchema.safeParse({
    id: projectId,
  })

  if (!parsed.success) {
    return NextResponse.json(
      {
        success: false,
        code: "BAD_REQUEST",
        message: "Invalid project ID",
      },
      { status: 400 }
    )
  }

  const project = await getProjectById(db, parsed.data.id)

  if (!project) {
    return NextResponse.json(
      {
        success: false,
        code: "NOT_FOUND",
        message: "Project not found",
      },
      { status: 404 }
    )
  }

  await deleteProject(db, project.id)

  return new NextResponse(null, { status: 204 })
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ projectId: string }> }
) {
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

  const { projectId } = await params

  const parsedProjectId = projectIdSchema.safeParse({
    id: projectId,
  })

  if (!parsedProjectId.success) {
    return NextResponse.json(
      {
        success: false,
        code: "BAD_REQUEST",
        message: "Invalid project ID",
      },
      { status: 400 }
    )
  }

  const body = await safeParseBody(request)

  const parsedBody = projectUpdateSchema.safeParse(body)

  if (!parsedBody.success) {
    return NextResponse.json(
      {
        success: false,
        code: "BAD_REQUEST",
        message: "Invalid request body",
      },
      { status: 400 }
    )
  }

  await editProject(db, parsedProjectId.data.id, parsedBody.data)

  return new NextResponse(null, { status: 204 })
}
