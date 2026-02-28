/**
 * Clerk webhook handler.
 * Receives user.created and user.updated events from Clerk
 * and syncs user data to our PostgreSQL database via Prisma.
 */
import { Router, Request, Response } from "express"
import { Webhook } from "svix"
import { prisma } from "../lib/prisma.js"

const router = Router()

interface ClerkUserEventData {
  id: string
  email_addresses: Array<{ email_address: string; id: string }>
  first_name: string | null
  last_name: string | null
  image_url: string | null
  primary_email_address_id: string
}

interface ClerkWebhookEvent {
  type: string
  data: ClerkUserEventData
}

/**
 * POST /api/webhooks/clerk
 * Handles Clerk webhook events for user sync.
 * Verifies webhook signature using Svix before processing.
 */
router.post("/", async (req: Request, res: Response) => {
  const webhookSecret = process.env.CLERK_WEBHOOK_SECRET

  if (!webhookSecret) {
    console.error("[CLERK WEBHOOK] Missing CLERK_WEBHOOK_SECRET")
    res.status(500).json({ error: "Webhook secret not configured" })
    return
  }

  const svixId = req.headers["svix-id"] as string | undefined
  const svixTimestamp = req.headers["svix-timestamp"] as string | undefined
  const svixSignature = req.headers["svix-signature"] as string | undefined

  if (!svixId || !svixTimestamp || !svixSignature) {
    res.status(400).json({ error: "Missing svix headers" })
    return
  }

  const wh = new Webhook(webhookSecret)

  let event: ClerkWebhookEvent

  try {
    // req.body is a Buffer because of express.raw() for /api/webhooks routes
    const payload = req.body instanceof Buffer ? req.body.toString() : JSON.stringify(req.body)

    event = wh.verify(payload, {
      "svix-id": svixId,
      "svix-timestamp": svixTimestamp,
      "svix-signature": svixSignature,
    }) as ClerkWebhookEvent
  } catch (err) {
    console.error("[CLERK WEBHOOK] Signature verification failed:", err)
    res.status(400).json({ error: "Invalid webhook signature" })
    return
  }

  try {
    const { type, data } = event

    if (type === "user.created") {
      await handleUserCreated(data)
    } else if (type === "user.updated") {
      await handleUserUpdated(data)
    }

    res.json({ received: true })
  } catch (err) {
    console.error("[CLERK WEBHOOK] Processing error:", err)
    res.status(500).json({ error: "Webhook processing failed" })
  }
})

/**
 * Handles user.created event — creates User + Wallet in database.
 */
async function handleUserCreated(data: ClerkUserEventData): Promise<void> {
  const primaryEmail = data.email_addresses.find(
    (e) => e.id === data.primary_email_address_id
  )

  if (!primaryEmail) {
    console.error("[CLERK WEBHOOK] No primary email found for user:", data.id)
    return
  }

  const fullName = [data.first_name, data.last_name].filter(Boolean).join(" ") || "User"

  const user = await prisma.user.create({
    data: {
      clerkId: data.id,
      email: primaryEmail.email_address,
      fullName,
      avatarUrl: data.image_url,
      wallet: {
        create: {},
      },
    },
  })

  console.log(`[CLERK WEBHOOK] User created: ${user.email} (${user.id})`)
}

/**
 * Handles user.updated event — syncs email/name/avatar changes.
 */
async function handleUserUpdated(data: ClerkUserEventData): Promise<void> {
  const primaryEmail = data.email_addresses.find(
    (e) => e.id === data.primary_email_address_id
  )

  if (!primaryEmail) {
    console.error("[CLERK WEBHOOK] No primary email for update:", data.id)
    return
  }

  const fullName = [data.first_name, data.last_name].filter(Boolean).join(" ") || "User"

  await prisma.user.update({
    where: { clerkId: data.id },
    data: {
      email: primaryEmail.email_address,
      fullName,
      avatarUrl: data.image_url,
    },
  })

  console.log(`[CLERK WEBHOOK] User updated: ${primaryEmail.email_address}`)
}

export default router
