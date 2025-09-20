import { createInsertSchema, createUpdateSchema } from "drizzle-zod"
import { z } from "zod"
import { ProjectsTable } from "@/db/schema"
import { ProjectVisibility } from "@/utils/db"

export const signUpSchema = z.object({
  email: z.email(),
  name: z
    .string()
    .trim()
    .min(2)
    .max(48)
    .regex(/^[a-zA-Z ]+$/),
  password: z
    .string()
    .trim()
    .min(8)
    .max(32)
    .regex(/^(?=.*[a-z])(?=.*\d)(?=.*[^\w\s]).+$/),
  username: z
    .string()
    .trim()
    .min(2)
    .max(32)
    .regex(/^[a-zA-Z0-9_]{2,32}$/),
  displayUsername: z
    .string()
    .trim()
    .min(2)
    .max(32)
    .regex(/^[a-zA-Z0-9_ ]{2,32}$/),
})

export const signInSchema = z.object({
  password: z
    .string()
    .trim()
    .min(8)
    .max(32)
    .regex(/^(?=.*[a-z])(?=.*\d)(?=.*[^\w\s]).+$/),
  username: z
    .string()
    .trim()
    .min(2)
    .max(32)
    .regex(/^[a-zA-Z0-9_]{2,32}$/),
})

export const projectInsertSchema = createInsertSchema(ProjectsTable)
  .extend({
    badges: z.array(z.string()),
    visibility: z.enum(ProjectVisibility),
  })
  .omit({ id: true, createdAt: true })

export const projectUpdateSchema = createUpdateSchema(ProjectsTable)
  .extend({
    badges: z.array(z.string()),
    visibility: z.enum(ProjectVisibility),
  })
  .omit({ id: true, createdAt: true })
  .partial()
  .refine(data => Object.keys(data).length > 0)

export const projectIdSchema = z.object({
  id: z.uuid(),
})
