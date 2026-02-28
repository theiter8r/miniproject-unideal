import { motion } from "framer-motion"
import { User } from "lucide-react"

export default function Profile() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="container mx-auto px-4 py-8"
    >
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <User className="h-16 w-16 text-muted-foreground mb-4" />
        <h1 className="text-2xl font-semibold text-foreground mb-2">Profile</h1>
        <p className="text-muted-foreground">View and edit your public profile — coming in Phase 6</p>
      </div>
    </motion.div>
  )
}
