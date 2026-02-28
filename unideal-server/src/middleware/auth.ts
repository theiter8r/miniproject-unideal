/**
 * Auth middleware — verifies Clerk session JWT and attaches user to request.
 */
import { verifyToken } from "@clerk/express"
import { Request, Response, NextFunction } from "express"
import { prisma } from "../lib/prisma.js"
import type { AuthUser } from "../types/index.js"

/**
 * Verifies Clerk session JWT from Authorization: Bearer header.
 * Attaches the database user to req.user.
 */
export async function requireAuth(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const authHeader = req.headers.authorization
    if (!authHeader?.startsWith("Bearer ")) {
      res.status(401).json({ error: "Missing auth token", code: "UNAUTHORIZED" })
      return
    }

    const token = authHeader.split(" ")[1]

    let clerkUserId: string

    try {
      const payload = await verifyToken(token, {
        secretKey: process.env.CLERK_SECRET_KEY!,
      })
      if (!payload?.sub) {
        res.status(401).json({ error: "Invalid token", code: "UNAUTHORIZED" })
        return
      }
      clerkUserId = payload.sub
    } catch {
      res.status(401).json({ error: "Token verification failed", code: "UNAUTHORIZED" })
      return
    }

    const user = await prisma.user.findUnique({
      where: { clerkId: clerkUserId },
      select: { id: true, clerkId: true, email: true, isAdmin: true },
    })

    if (!user) {
      res.status(401).json({ error: "User not found in database", code: "USER_NOT_FOUND" })
      return
    }

    req.user = user as AuthUser
    next()
  } catch (error) {
    console.error("[AUTH] Middleware error:", error)
    res.status(401).json({ error: "Authentication failed", code: "UNAUTHORIZED" })
  }
}

/**
 * Requires user to be an admin. Must be used after requireAuth.
 */
export function requireAdmin(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  if (!req.user?.isAdmin) {
    res.status(403).json({ error: "Admin access required", code: "FORBIDDEN" })
    return
  }
  next()
}

/**
 * Requires user to have VERIFIED verification status. Must be used after requireAuth.
 */
export async function requireVerified(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const user = await prisma.user.findUnique({
    where: { id: req.user!.id },
    select: { verificationStatus: true },
  })

  if (user?.verificationStatus !== "VERIFIED") {
    res
      .status(403)
      .json({ error: "College verification required", code: "NOT_VERIFIED" })
    return
  }
  next()
}
