import { eq } from "drizzle-orm"
import { BadgesTable, ProjectsTable } from "@/db/schema"
import type { dbType } from "@/lib/db"

export interface Project
  extends Omit<typeof ProjectsTable.$inferInsert, "id" | "createdAt"> {
  badges: string[]
}

export async function insertProject(db: dbType, project: Project) {
  const { badges, ...data } = project

  return await db.transaction(async tx => {
    const [_project] = await tx.insert(ProjectsTable).values(data).returning()

    if (badges.length) {
      await tx.insert(BadgesTable).values(
        badges.map(badge_id => ({
          projectId: _project.id,
          badge_id: badge_id,
        }))
      )
    }

    return _project
  })
}

export async function listProjects(db: dbType) {
  const projects = (await db.query.ProjectsTable.findMany({
    with: {
      badges: true,
    },
  })) as Array<
    typeof ProjectsTable.$inferSelect & {
      badges: (typeof BadgesTable.$inferSelect)[]
    }
  >

  return projects.map(project => ({
    ...project,
    badges: project.badges.map(badge => badge.badge_id),
  }))
}

export async function editProject(
  db: dbType,
  projectId: string,
  project: Project
) {
  const { badges, ...data } = project

  return await db.transaction(async tx => {
    await tx
      .update(ProjectsTable)
      .set(data)
      .where(eq(ProjectsTable.id, projectId))
    if (badges) {
      await tx.delete(BadgesTable).where(eq(BadgesTable.projectId, projectId))

      await tx
        .insert(BadgesTable)
        .values(badges.map(badge => ({ projectId, badge_id: badge })))
    }
  })
}

export async function getProject(db: dbType, projectId: string) {
  return await db.query.ProjectsTable.findFirst({
    with: {
      badges: true,
    },
    where: eq(ProjectsTable.id, projectId),
  })
}

export async function deleteProject(db: dbType, projectId: string) {
  return await db
    .delete(ProjectsTable)
    .where(eq(ProjectsTable.id, projectId))
    .returning()
}
