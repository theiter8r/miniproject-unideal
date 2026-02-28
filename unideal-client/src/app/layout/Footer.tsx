import { Link } from "react-router-dom"
import { Separator } from "@/components/ui/separator"

/** Minimal footer with links and copyright */
export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-border bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-xl font-brand font-bold text-primary mb-2">
              Unideal
            </h3>
            <p className="text-sm text-muted-foreground">
              Your campus. Your marketplace. Buy, sell, and rent items with
              fellow students.
            </p>
          </div>

          {/* Marketplace */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-3">
              Marketplace
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/browse"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Browse Items
                </Link>
              </li>
              <li>
                <Link
                  to="/sell"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Sell an Item
                </Link>
              </li>
              <li>
                <Link
                  to="/browse?type=RENT"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Rent Items
                </Link>
              </li>
            </ul>
          </div>

          {/* Account */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-3">
              Account
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/dashboard"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  to="/wallet"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Wallet
                </Link>
              </li>
              <li>
                <Link
                  to="/settings"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Settings
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-3">
              Support
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <span className="text-muted-foreground">
                  help@unideal.in
                </span>
              </li>
              <li>
                <span className="text-muted-foreground">
                  Terms of Service
                </span>
              </li>
              <li>
                <span className="text-muted-foreground">Privacy Policy</span>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-6" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-muted-foreground">
          <p>&copy; {currentYear} Unideal. All rights reserved.</p>
          <p>Made with care for campus communities.</p>
        </div>
      </div>
    </footer>
  )
}
