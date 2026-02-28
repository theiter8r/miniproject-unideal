/**
 * Category routes — list all categories.
 */
import { Router } from "express"
import { prisma } from "../lib/prisma.js"

const router = Router()

/**
 * GET /api/categories — Returns all categories, ordered by name.
 */
router.get("/", async (_req, res, next) => {
  try {
    const categories = await prisma.category.findMany({
      select: {
        id: true,
        name: true,
        slug: true,
        iconName: true,
        _count: {
          select: { items: true },
        },
      },
      orderBy: { name: "asc" },
    })

    res.json(categories)
  } catch (error) {
    next(error)
  }
})

export default router
