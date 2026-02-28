/**
 * User-related Zod validators.
 */
import { z } from "zod"

/** Onboarding request body */
export const onboardingSchema = z.object({
  collegeId: z.string().cuid("Invalid college ID"),
  fullName: z.string().min(2, "Name must be at least 2 characters").max(100),
  phone: z
    .string()
    .regex(/^[6-9]\d{9}$/, "Invalid Indian phone number")
    .optional(),
})

/** Profile update request body */
export const updateProfileSchema = z.object({
  fullName: z.string().min(2).max(100).optional(),
  phone: z
    .string()
    .regex(/^[6-9]\d{9}$/, "Invalid Indian phone number")
    .optional()
    .nullable(),
  avatarUrl: z.string().url().optional().nullable(),
})
