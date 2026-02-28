/**
 * Global error handler — must be the last middleware registered.
 * Catches all unhandled errors and returns consistent error responses.
 */
import { Request, Response, NextFunction } from "express"
import { Prisma } from "@prisma/client"

export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  _next: NextFunction
): void {
  console.error(`[ERROR] ${req.method} ${req.path}:`, err.message)

  // Prisma known request errors
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === "P2002") {
      res.status(409).json({ error: "Resource already exists", code: "CONFLICT" })
      return
    }
    if (err.code === "P2025") {
      res.status(404).json({ error: "Resource not found", code: "NOT_FOUND" })
      return
    }
  }

  // Prisma validation errors
  if (err instanceof Prisma.PrismaClientValidationError) {
    res.status(400).json({ error: "Invalid data provided", code: "VALIDATION_ERROR" })
    return
  }

  // Default: Internal server error
  res.status(500).json({
    error:
      process.env.NODE_ENV === "production"
        ? "Internal server error"
        : err.message,
    code: "INTERNAL_ERROR",
  })
}
