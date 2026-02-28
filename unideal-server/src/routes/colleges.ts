/**
 * College routes — list and retrieve colleges.
 */
import { Router } from "express"
import { prisma } from "../lib/prisma.js"

const router = Router()

/**
 * GET /api/colleges — Returns all active colleges.
 */
router.get("/", async (_req, res, next) => {
  try {
    const colleges = await prisma.college.findMany({
      where: { isActive: true },
      select: {
        id: true,
        name: true,
        slug: true,
        emailDomain: true,
        city: true,
        state: true,
        campusLat: true,
        campusLng: true,
        logoUrl: true,
        _count: {
          select: { users: true, items: true },
        },
      },
      orderBy: { name: "asc" },
    })

    res.json(colleges)
  } catch (error) {
    next(error)
  }
})

/**
 * GET /api/colleges/:slug — Returns a single college by slug.
 */
router.get("/:slug", async (req, res, next) => {
  try {
    const college = await prisma.college.findUnique({
      where: { slug: req.params.slug },
      select: {
        id: true,
        name: true,
        slug: true,
        emailDomain: true,
        city: true,
        state: true,
        campusLat: true,
        campusLng: true,
        campusBoundary: true,
        logoUrl: true,
        isActive: true,
        _count: {
          select: { users: true, items: true },
        },
      },
    })

    if (!college) {
      res.status(404).json({ error: "College not found", code: "NOT_FOUND" })
      return
    }

    res.json(college)
  } catch (error) {
    next(error)
  }
})

export default router
