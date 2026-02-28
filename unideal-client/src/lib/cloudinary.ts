/** Transforms a Cloudinary URL to add width, format, and quality optimizations */
export function cloudinaryUrl(url: string, width: number): string {
  if (!url || !url.includes("cloudinary.com")) return url
  return url.replace("/upload/", `/upload/w_${width},f_auto,q_auto/`)
}

/** Generates a responsive srcSet string for Cloudinary images */
export function cloudinarySrcSet(url: string): string {
  return [400, 800, 1200]
    .map((w) => `${cloudinaryUrl(url, w)} ${w}w`)
    .join(", ")
}
