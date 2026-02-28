/** Application constants and configuration values */

export const ITEMS_PER_PAGE = 20
export const MAX_IMAGES = 5
export const MAX_IMAGE_SIZE_MB = 5
export const MAX_AVATAR_SIZE_MB = 2

/** Rate limit windows (in milliseconds) */
export const RATE_LIMIT = {
  AUTH: { windowMs: 60 * 1000, max: 5 },
  GENERAL: { windowMs: 60 * 1000, max: 60 },
  ITEMS: { windowMs: 60 * 1000, max: 30 },
  PAYMENTS: { windowMs: 60 * 1000, max: 10 },
  UPLOAD: { windowMs: 60 * 1000, max: 10 },
} as const

/** Seed categories (Lucide icon names) */
export const SEED_CATEGORIES = [
  { name: "Textbooks", slug: "textbooks", iconName: "book-open" },
  { name: "Electronics", slug: "electronics", iconName: "laptop" },
  { name: "Furniture", slug: "furniture", iconName: "armchair" },
  { name: "Clothing", slug: "clothing", iconName: "shirt" },
  { name: "Sports & Fitness", slug: "sports-fitness", iconName: "dumbbell" },
  { name: "Stationery", slug: "stationery", iconName: "pencil" },
] as const
