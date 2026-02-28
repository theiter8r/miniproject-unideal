/** Base API URL from environment */
export const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000"

/** Maximum number of images per listing */
export const MAX_IMAGES = 5

/** Maximum file size for uploads (5MB) */
export const MAX_FILE_SIZE = 5 * 1024 * 1024

/** Item categories matching backend seed data */
export const CATEGORIES = [
  { id: 1, name: "Textbooks", slug: "textbooks", iconName: "BookOpen" },
  { id: 2, name: "Electronics", slug: "electronics", iconName: "Laptop" },
  { id: 3, name: "Furniture", slug: "furniture", iconName: "Sofa" },
  { id: 4, name: "Sports & Fitness", slug: "sports-fitness", iconName: "Dumbbell" },
  { id: 5, name: "Clothing", slug: "clothing", iconName: "Shirt" },
  { id: 6, name: "Miscellaneous", slug: "miscellaneous", iconName: "Package" },
] as const

/** Item condition options */
export const CONDITIONS = [
  { value: "NEW", label: "New", description: "Unused, in original packaging" },
  { value: "LIKE_NEW", label: "Like New", description: "Barely used, no visible wear" },
  { value: "USED", label: "Used", description: "Normal wear and tear" },
  { value: "HEAVILY_USED", label: "Heavily Used", description: "Significant wear, fully functional" },
] as const

/** Listing type options */
export const LISTING_TYPES = [
  { value: "SELL", label: "Sell", description: "One-time sale" },
  { value: "RENT", label: "Rent", description: "Available for rental" },
  { value: "BOTH", label: "Both", description: "Sell or rent" },
] as const

/** Transaction status labels and colors */
export const TRANSACTION_STATUS_MAP = {
  PENDING: { label: "Pending", color: "text-yellow-500" },
  CAPTURED: { label: "Captured", color: "text-blue-500" },
  RESERVED: { label: "Reserved", color: "text-purple-500" },
  SETTLED: { label: "Settled", color: "text-green-500" },
  DISPUTED: { label: "Disputed", color: "text-red-500" },
  REFUNDED: { label: "Refunded", color: "text-orange-500" },
  CANCELLED: { label: "Cancelled", color: "text-zinc-500" },
  EXPIRED: { label: "Expired", color: "text-zinc-400" },
} as const

/** Verification status labels and colors */
export const VERIFICATION_STATUS_MAP = {
  UNVERIFIED: { label: "Unverified", color: "text-zinc-400", bgColor: "bg-zinc-800" },
  PENDING: { label: "Pending Review", color: "text-yellow-500", bgColor: "bg-yellow-500/10" },
  VERIFIED: { label: "Verified", color: "text-green-500", bgColor: "bg-green-500/10" },
  REJECTED: { label: "Rejected", color: "text-red-500", bgColor: "bg-red-500/10" },
} as const

/** Items per page for pagination */
export const ITEMS_PER_PAGE = 20
