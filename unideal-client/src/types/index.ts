// ============================================
// ENUMS (mirrors Prisma schema)
// ============================================

export type VerificationStatus = "UNVERIFIED" | "PENDING" | "VERIFIED" | "REJECTED"

export type ListingType = "SELL" | "RENT" | "BOTH"

export type ItemCondition = "NEW" | "LIKE_NEW" | "USED" | "HEAVILY_USED"

export type ItemStatus = "AVAILABLE" | "RESERVED" | "SOLD" | "RENTED" | "ARCHIVED"

export type TransactionStatus =
  | "PENDING"
  | "CAPTURED"
  | "RESERVED"
  | "SETTLED"
  | "DISPUTED"
  | "REFUNDED"
  | "CANCELLED"
  | "EXPIRED"

export type TransactionType = "BUY" | "RENT"

export type WalletTransactionType =
  | "CREDIT_ESCROW"
  | "RELEASE_ESCROW"
  | "WITHDRAWAL"
  | "REFUND_DEBIT"

export type MessageType = "TEXT" | "LOCATION" | "IMAGE" | "SYSTEM"

export type NotificationType =
  | "VERIFICATION_APPROVED"
  | "VERIFICATION_REJECTED"
  | "NEW_MESSAGE"
  | "PAYMENT_RECEIVED"
  | "FUNDS_RELEASED"
  | "ITEM_SOLD"
  | "TRANSACTION_UPDATE"
  | "REVIEW_RECEIVED"
  | "SYSTEM"

// ============================================
// MODELS
// ============================================

export interface College {
  id: string
  name: string
  slug: string
  emailDomain: string
  city: string
  state: string
  campusLat: number | null
  campusLng: number | null
  campusBoundary: unknown | null
  logoUrl: string | null
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface User {
  id: string
  clerkId: string
  email: string
  fullName: string
  phone: string | null
  avatarUrl: string | null
  collegeId: string | null
  verificationStatus: VerificationStatus
  isAdmin: boolean
  isBanned: boolean
  onboardingComplete: boolean
  createdAt: string
  updatedAt: string
  college?: College | null
}

export interface Wallet {
  id: string
  userId: string
  balance: number
  frozenBalance: number
  createdAt: string
  updatedAt: string
}

export interface WalletTransactionRecord {
  id: string
  walletId: string
  type: WalletTransactionType
  amount: number
  description: string
  referenceId: string | null
  createdAt: string
}

export interface Category {
  id: number
  name: string
  slug: string
  iconName: string
  createdAt: string
}

export interface Item {
  id: string
  sellerId: string
  collegeId: string
  categoryId: number
  title: string
  description: string | null
  listingType: ListingType
  sellPrice: number | null
  rentPricePerDay: number | null
  images: string[]
  condition: ItemCondition
  status: ItemStatus
  pickupLocation: string | null
  pickupLat: number | null
  pickupLng: number | null
  viewCount: number
  createdAt: string
  updatedAt: string
  seller?: Pick<User, "id" | "fullName" | "avatarUrl" | "verificationStatus">
  category?: Category
  college?: Pick<College, "id" | "name" | "slug">
  isFavorited?: boolean
  favoriteCount?: number
}

export interface Transaction {
  id: string
  buyerId: string
  sellerId: string
  itemId: string
  type: TransactionType
  status: TransactionStatus
  amount: number
  platformFee: number
  razorpayOrderId: string | null
  razorpayPaymentId: string | null
  rentStartDate: string | null
  rentEndDate: string | null
  settledAt: string | null
  createdAt: string
  updatedAt: string
  buyer?: Pick<User, "id" | "fullName" | "avatarUrl">
  seller?: Pick<User, "id" | "fullName" | "avatarUrl">
  item?: Pick<Item, "id" | "title" | "images">
}

export interface Conversation {
  id: string
  user1Id: string
  user2Id: string
  itemId: string | null
  lastMessageAt: string | null
  createdAt: string
  updatedAt: string
  user1?: Pick<User, "id" | "fullName" | "avatarUrl">
  user2?: Pick<User, "id" | "fullName" | "avatarUrl">
  item?: Pick<Item, "id" | "title" | "images"> | null
  lastMessage?: Message | null
}

export interface Message {
  id: string
  conversationId: string
  senderId: string
  type: MessageType
  content: string
  locationLat: number | null
  locationLng: number | null
  imageUrl: string | null
  isRead: boolean
  createdAt: string
  sender?: Pick<User, "id" | "fullName" | "avatarUrl">
}

export interface Favorite {
  id: string
  userId: string
  itemId: string
  createdAt: string
  item?: Item
}

export interface Review {
  id: string
  reviewerId: string
  revieweeId: string
  transactionId: string
  rating: number
  comment: string | null
  createdAt: string
  reviewer?: Pick<User, "id" | "fullName" | "avatarUrl">
}

export interface Verification {
  id: string
  userId: string
  idCardImageUrl: string
  status: VerificationStatus
  reviewerNotes: string | null
  reviewedBy: string | null
  reviewedAt: string | null
  createdAt: string
}

export interface Notification {
  id: string
  userId: string
  type: NotificationType
  title: string
  body: string
  data: Record<string, unknown> | null
  isRead: boolean
  createdAt: string
}

// ============================================
// API RESPONSE TYPES
// ============================================

export interface PaginatedResponse<T> {
  items: T[]
  nextCursor: string | null
  hasMore: boolean
  total?: number
}

export interface UserMeResponse {
  user: User
  wallet: Wallet | null
}

export interface ApiErrorResponse {
  error: string
  code?: string
}

// ============================================
// INPUT TYPES
// ============================================

export interface CreateItemInput {
  title: string
  description?: string
  categoryId: number
  listingType: ListingType
  sellPrice?: number
  rentPricePerDay?: number
  condition: ItemCondition
  images: string[]
  pickupLocation?: string
  pickupLat?: number
  pickupLng?: number
}

export interface OnboardingInput {
  fullName: string
  phone: string
  collegeId: string
  avatarUrl?: string
}

export interface ItemFilters {
  cursor?: string
  category?: string
  college?: string
  type?: ListingType
  condition?: ItemCondition
  priceMin?: number
  priceMax?: number
  search?: string
  sort?: "newest" | "oldest" | "price_low" | "price_high"
}
