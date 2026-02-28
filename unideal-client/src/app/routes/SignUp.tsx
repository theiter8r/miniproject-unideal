import { SignUp } from "@clerk/clerk-react"
import { motion } from "framer-motion"

export default function SignUpPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="flex min-h-[80vh] items-center justify-center px-4"
    >
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-brand font-bold text-foreground">
            Join Unideal
          </h1>
          <p className="text-muted-foreground mt-2">
            Create your account to start buying and selling on campus
          </p>
        </div>
        <SignUp
          appearance={{
            elements: {
              rootBox: "w-full",
              card: "bg-card border border-border rounded-xl shadow-lg",
              headerTitle: "text-foreground",
              headerSubtitle: "text-muted-foreground",
              socialButtonsBlockButton:
                "bg-muted border border-border text-foreground hover:bg-accent",
              formFieldInput:
                "bg-background border-border text-foreground placeholder:text-muted-foreground",
              formButtonPrimary: "btn-primary-gradient",
              footerActionLink: "text-primary hover:text-primary/80",
            },
          }}
          routing="path"
          path="/sign-up"
          signInUrl="/sign-in"
        />
      </div>
    </motion.div>
  )
}
