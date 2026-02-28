/**
 * Shared Zod validators used across multiple endpoints.
 */
import { z } from "zod"

/** CUID string validator */
export const cuidSchema = z.string().cuid()

/** Cursor-based pagination query params */
export const paginationSchema = z.object({
  cursor: z.string().optional(),
  limit: z
    .string()
    .transform(Number)
    .pipe(z.number().int().min(1).max(50))
    .optional(),
})

/** Common ID parameter validator */
export const idParamSchema = z.object({
  id: z.string().cuid(),
})
