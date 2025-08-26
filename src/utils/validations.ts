import { z } from "zod"

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
