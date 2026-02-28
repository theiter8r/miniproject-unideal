import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { format, formatDistanceToNow } from "date-fns"

/** Merges Tailwind class names with clsx and tailwind-merge */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/** Formats a price in Indian Rupees */
export function formatPrice(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount)
}

/** Formats a date string to a human-readable format */
export function formatDate(date: string | Date): string {
  return format(new Date(date), "MMM d, yyyy")
}

/** Formats a date to relative time (e.g., "2 hours ago") */
export function formatRelativeTime(date: string | Date): string {
  return formatDistanceToNow(new Date(date), { addSuffix: true })
}
