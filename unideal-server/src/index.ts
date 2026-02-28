import express from "express"
import cors from "cors"
import helmet from "helmet"
import { errorHandler } from "./middleware/errorHandler.js"
import { generalLimiter } from "./middleware/rateLimiter.js"
import authRoutes from "./routes/auth.js"
import userRoutes from "./routes/users.js"
import categoryRoutes from "./routes/categories.js"
import collegeRoutes from "./routes/colleges.js"

const app = express()
const PORT = process.env.PORT || 5000

// Security headers
app.use(helmet())

// CORS — allow frontend origin
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
)

// Body parsing — raw body needed for webhook signature verification
app.use("/api/webhooks", express.raw({ type: "application/json" }))
app.use(express.json({ limit: "10mb" }))

// Global rate limiter
app.use(generalLimiter)

// Health check
app.get("/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() })
})

// API routes
app.use("/api/webhooks/clerk", authRoutes)
app.use("/api/users", userRoutes)
app.use("/api/categories", categoryRoutes)
app.use("/api/colleges", collegeRoutes)

// Global error handler (must be last)
app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`🟩 Unideal API running on port ${PORT}`)
})

export default app
