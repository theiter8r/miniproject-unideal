/**
 * User routes — profile, settings, onboarding.
 */
import { Router } from "express"
import { prisma } from "../lib/prisma.js"
import { requireAuth } from "../middleware/auth.js"
import { validate } from "../middleware/validate.js"
import { onboardingSchema, updateProfileSchema } from "../validators/user.js"

const router = Router()

/**
 * GET /api/users/me — Returns current authenticated user's profile + wallet summary.
 */
router.get("/me", requireAuth, async (req, res, next) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user!.id },
      select: {
        id: true,
        clerkId: true,
        email: true,
        fullName: true,
        phone: true,
        avatarUrl: true,
        verificationStatus: true,
        isAdmin: true,
        isBanned: true,
        onboardingComplete: true,
        createdAt: true,
        college: {
          select: {
            id: true,
            name: true,
            slug: true,
            city: true,
          },
        },
        wallet: {
          select: {
            id: true,
            balance: true,
            frozenBalance: true,
          },
        },
        _count: {
          select: {
            items: true,
            buyerTransactions: true,
            sellerTransactions: true,
            favorites: true,
            reviewsReceived: true,
          },
        },
      },
    })

    if (!user) {
      res.status(404).json({ error: "User not found", code: "NOT_FOUND" })
      return
    }

    res.json(user)
  } catch (error) {
    next(error)
  }
})

/**
 * PUT /api/users/me — Update current user's profile.
 */
router.put("/me", requireAuth, validate(updateProfileSchema), async (req, res, next) => {
  try {
    const user = await prisma.user.update({
      where: { id: req.user!.id },
      data: req.body,
      select: {
        id: true,
        fullName: true,
        phone: true,
        avatarUrl: true,
        updatedAt: true,
      },
    })

    res.json(user)
  } catch (error) {
    next(error)
  }
})

/**
 * POST /api/users/onboarding — Complete post-signup onboarding.
 * Sets college, full name, and marks onboarding as complete.
 */
router.post("/onboarding", requireAuth, validate(onboardingSchema), async (req, res, next) => {
  try {
    const { collegeId, fullName, phone } = req.body

    // Validate college exists and is active
    const college = await prisma.college.findUnique({
      where: { id: collegeId },
      select: { id: true, isActive: true },
    })

    if (!college || !college.isActive) {
      res.status(400).json({ error: "Invalid or inactive college", code: "VALIDATION_ERROR" })
      return
    }

    const user = await prisma.user.update({
      where: { id: req.user!.id },
      data: {
        collegeId,
        fullName,
        phone: phone || null,
        onboardingComplete: true,
      },
      select: {
        id: true,
        fullName: true,
        email: true,
        phone: true,
        onboardingComplete: true,
        college: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
      },
    })

    // Ensure wallet exists (created by webhook, but be safe)
    await prisma.wallet.upsert({
      where: { userId: req.user!.id },
      update: {},
      create: { userId: req.user!.id },
    })

    res.json(user)
  } catch (error) {
    next(error)
  }
})

/**
 * GET /api/users/:id — Public user profile (name, college, rating, reviews count).
 */
router.get("/:id", async (req, res, next) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.params.id },
      select: {
        id: true,
        fullName: true,
        avatarUrl: true,
        verificationStatus: true,
        createdAt: true,
        college: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
        _count: {
          select: {
            items: true,
            sellerTransactions: true,
            reviewsReceived: true,
          },
        },
      },
    })

    if (!user) {
      res.status(404).json({ error: "User not found", code: "NOT_FOUND" })
      return
    }

    // Calculate average rating
    const avgRating = await prisma.review.aggregate({
      where: { revieweeId: req.params.id },
      _avg: { rating: true },
    })

    res.json({
      ...user,
      averageRating: avgRating._avg.rating ?? null,
    })
  } catch (error) {
    next(error)
  }
})

export default router
