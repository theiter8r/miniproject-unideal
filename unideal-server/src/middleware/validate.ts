/**
 * Zod validation middleware factory.
 * Creates Express middleware that validates request body or query against a Zod schema.
 */
import { Request, Response, NextFunction } from "express"
import { ZodSchema, ZodError } from "zod"

/**
 * Validates request body against a Zod schema.
 * Parsed (clean) data replaces req.body on success.
 */
export function validate(schema: ZodSchema) {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      req.body = schema.parse(req.body)
      next()
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({
          error: "Validation failed",
          code: "VALIDATION_ERROR",
          details: error.errors.map((e) => ({
            field: e.path.join("."),
            message: e.message,
          })),
        })
        return
      }
      next(error)
    }
  }
}

/**
 * Validates request query parameters against a Zod schema.
 * Parsed (clean) data replaces req.query on success.
 */
export function validateQuery(schema: ZodSchema) {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      req.query = schema.parse(req.query) as Record<string, string>
      next()
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({
          error: "Invalid query parameters",
          code: "VALIDATION_ERROR",
          details: error.errors.map((e) => ({
            field: e.path.join("."),
            message: e.message,
          })),
        })
        return
      }
      next(error)
    }
  }
}
