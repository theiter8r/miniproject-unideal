import { motion } from "framer-motion"
import { ShoppingBag } from "lucide-react"

export default function SellItem() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="container mx-auto px-4 py-8"
    >
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <ShoppingBag className="h-16 w-16 text-muted-foreground mb-4" />
        <h1 className="text-2xl font-semibold text-foreground mb-2">Sell an Item</h1>
        <p className="text-muted-foreground">Multi-step listing form with image uploads — coming in Phase 3</p>
      </div>
    </motion.div>
  )
}
