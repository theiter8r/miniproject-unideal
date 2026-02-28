import { motion } from "framer-motion"
import { Wallet as WalletIcon } from "lucide-react"

export default function Wallet() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="container mx-auto px-4 py-8"
    >
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <WalletIcon className="h-16 w-16 text-muted-foreground mb-4" />
        <h1 className="text-2xl font-semibold text-foreground mb-2">Wallet</h1>
        <p className="text-muted-foreground">Balance, escrow, and transaction history — coming in Phase 4</p>
      </div>
    </motion.div>
  )
}
