/**
 * Rate limiting configuration.
 * Different limits for different endpoint groups.
 */
import rateLimit from "express-rate-limit"
import { RATE_LIMIT } from "../lib/constants.js"

/** General API rate limiter — 60 requests per minute */
export const generalLimiter = rateLimit({
  windowMs: RATE_LIMIT.GENERAL.windowMs,
  max: RATE_LIMIT.GENERAL.max,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Too many requests, please try again later", code: "RATE_LIMITED" },
})

/** Auth endpoints — 5 requests per minute */
export const authLimiter = rateLimit({
  windowMs: RATE_LIMIT.AUTH.windowMs,
  max: RATE_LIMIT.AUTH.max,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Too many auth attempts, please try again later", code: "RATE_LIMITED" },
})

/** Item browsing — 30 requests per minute */
export const itemsLimiter = rateLimit({
  windowMs: RATE_LIMIT.ITEMS.windowMs,
  max: RATE_LIMIT.ITEMS.max,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Too many requests, please try again later", code: "RATE_LIMITED" },
})

/** Payment endpoints — 10 requests per minute */
export const paymentsLimiter = rateLimit({
  windowMs: RATE_LIMIT.PAYMENTS.windowMs,
  max: RATE_LIMIT.PAYMENTS.max,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Too many payment requests, please try again later", code: "RATE_LIMITED" },
})
