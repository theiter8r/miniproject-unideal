/**
 * Express type extensions and shared response types for Unideal API.
 */

/** Authenticated user attached to request by auth middleware */
export interface AuthUser {
  id: string
  clerkId: string
  email: string
  isAdmin: boolean
}

declare global {
  namespace Express {
    interface Request {
      user?: AuthUser
    }
  }
}

/** Standard paginated response shape */
export interface PaginatedResponse<T> {
  items: T[]
  nextCursor: string | null
  hasMore: boolean
}

/** Standard error response shape */
export interface ApiErrorResponse {
  error: string
  code: string
  details?: Array<{ field: string; message: string }>
}

/** Error codes used across the API */
export type ApiErrorCode =
  | "UNAUTHORIZED"
  | "FORBIDDEN"
  | "NOT_FOUND"
  | "VALIDATION_ERROR"
  | "CONFLICT"
  | "NOT_VERIFIED"
  | "NO_COLLEGE"
  | "INTERNAL_ERROR"
