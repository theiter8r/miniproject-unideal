import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import { useAuth } from "@clerk/clerk-react"
import {
  ShoppingBag,
  Shield,
  MessageCircle,
  Wallet,
  BookOpen,
  Laptop,
  Sofa,
  Dumbbell,
  Shirt,
  Package,
  ArrowRight,
  CheckCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

const categories = [
  { name: "Textbooks", icon: BookOpen, color: "text-blue-400" },
  { name: "Electronics", icon: Laptop, color: "text-green-400" },
  { name: "Furniture", icon: Sofa, color: "text-amber-400" },
  { name: "Sports & Fitness", icon: Dumbbell, color: "text-red-400" },
  { name: "Clothing", icon: Shirt, color: "text-pink-400" },
  { name: "Miscellaneous", icon: Package, color: "text-purple-400" },
]

const steps = [
  { step: "1", title: "Sign Up", description: "Create your account with Google or email" },
  { step: "2", title: "Verify", description: "Upload your college ID for seller verification" },
  { step: "3", title: "List or Buy", description: "Browse items or list your own to sell/rent" },
  { step: "4", title: "Secure Payment", description: "Escrow holds funds until you confirm receipt" },
]

export default function Home() {
  const { isSignedIn } = useAuth()

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-32">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
        <div className="container mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-brand font-bold text-foreground leading-tight">
              Your Campus.{" "}
              <span className="text-primary">Your Marketplace.</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-xl mx-auto">
              Buy, sell, and rent items with verified students at your
              university. Secure payments, real-time chat, and trust built in.
            </p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3"
            >
              {isSignedIn ? (
                <>
                  <Link to="/browse">
                    <Button
                      size="lg"
                      className="btn-primary-gradient rounded-lg gap-2 px-8"
                    >
                      Browse Items
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Link to="/sell">
                    <Button variant="outline" size="lg" className="rounded-lg gap-2 px-8">
                      <ShoppingBag className="h-4 w-4" />
                      Sell an Item
                    </Button>
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/sign-up">
                    <Button
                      size="lg"
                      className="btn-primary-gradient rounded-lg gap-2 px-8"
                    >
                      Get Started
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Link to="/sign-in">
                    <Button variant="outline" size="lg" className="rounded-lg gap-2 px-8">
                      Sign In
                    </Button>
                  </Link>
                </>
              )}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {[
              { icon: Shield, title: "Verified Students", desc: "College ID verification ensures real, trusted peers" },
              { icon: Wallet, title: "Escrow Payments", desc: "Funds held securely until you confirm receipt" },
              { icon: MessageCircle, title: "Real-time Chat", desc: "Message sellers directly with in-app messaging" },
              { icon: ShoppingBag, title: "Sell & Rent", desc: "List items for sale or rental with flexible pricing" },
            ].map((feature) => (
              <motion.div key={feature.title} variants={itemVariants}>
                <Card className="border-border bg-card hover:shadow-[0_0_15px_rgba(168,85,247,0.15)] transition-shadow">
                  <CardContent className="p-6 text-center">
                    <feature.icon className="h-10 w-10 text-primary mx-auto mb-4" />
                    <h3 className="font-semibold text-foreground mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {feature.desc}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 lg:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl lg:text-3xl font-brand font-bold text-center text-foreground mb-10"
          >
            Popular Categories
          </motion.h2>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4"
          >
            {categories.map((cat) => (
              <motion.div key={cat.name} variants={itemVariants}>
                <Link to={`/browse?category=${cat.name.toLowerCase().replace(/ & /g, "-").replace(/ /g, "-")}`}>
                  <Card className="border-border bg-card hover:shadow-[0_0_15px_rgba(168,85,247,0.15)] transition-all hover:-translate-y-1 cursor-pointer">
                    <CardContent className="p-6 text-center">
                      <cat.icon className={`h-8 w-8 ${cat.color} mx-auto mb-3`} />
                      <p className="text-sm font-medium text-foreground">
                        {cat.name}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl lg:text-3xl font-brand font-bold text-center text-foreground mb-10"
          >
            How It Works
          </motion.h2>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto"
          >
            {steps.map((s) => (
              <motion.div
                key={s.step}
                variants={itemVariants}
                className="flex flex-col items-center text-center"
              >
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary font-bold text-lg mb-4">
                  {s.step}
                </div>
                <h3 className="font-semibold text-foreground mb-2">
                  {s.title}
                </h3>
                <p className="text-sm text-muted-foreground">{s.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <CheckCircle className="h-12 w-12 text-primary mx-auto mb-4" />
            <h2 className="text-2xl lg:text-3xl font-brand font-bold text-foreground mb-4">
              Ready to join your campus marketplace?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              Start buying and selling with verified students today.
            </p>
            <Link to={isSignedIn ? "/browse" : "/sign-up"}>
              <Button
                size="lg"
                className="btn-primary-gradient rounded-lg gap-2 px-10"
              >
                {isSignedIn ? "Browse Items" : "Get Started Free"}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
