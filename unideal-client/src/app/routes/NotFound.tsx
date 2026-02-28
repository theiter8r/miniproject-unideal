import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import { FileQuestion } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="container mx-auto px-4 py-8"
    >
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <FileQuestion className="h-20 w-20 text-muted-foreground mb-6" />
        <h1 className="text-4xl font-brand font-bold text-foreground mb-2">404</h1>
        <p className="text-lg text-muted-foreground mb-6">
          Oops! This page doesn&apos;t exist.
        </p>
        <Link to="/">
          <Button className="btn-primary-gradient rounded-lg">
            Go Home
          </Button>
        </Link>
      </div>
    </motion.div>
  )
}
