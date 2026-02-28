import { Link } from "react-router-dom"
import { useAuth, useUser } from "@clerk/clerk-react"
import {
  Home,
  Search,
  ShoppingBag,
  Heart,
  MessageCircle,
  Wallet,
  LayoutDashboard,
  Settings,
  LogOut,
  User,
  LogIn,
  UserPlus,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { SheetClose } from "@/components/ui/sheet"

/** Mobile slide-out navigation with full nav links and user menu */
export function MobileNav() {
  const { isSignedIn, signOut } = useAuth()
  const { user } = useUser()

  const mainLinks = [
    { href: "/", label: "Home", icon: Home },
    { href: "/browse", label: "Browse", icon: Search },
    { href: "/sell", label: "Sell Item", icon: ShoppingBag },
  ]

  const authLinks = [
    { href: "/favorites", label: "Favorites", icon: Heart },
    { href: "/chat", label: "Messages", icon: MessageCircle },
    { href: "/wallet", label: "Wallet", icon: Wallet },
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/profile", label: "Profile", icon: User },
    { href: "/settings", label: "Settings", icon: Settings },
  ]

  return (
    <div className="flex flex-col h-full bg-background">
      {/* User Info Header */}
      <div className="p-6 pb-4">
        {isSignedIn ? (
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12">
              <AvatarImage
                src={user?.imageUrl}
                alt={user?.fullName ?? "User"}
              />
              <AvatarFallback>
                {user?.fullName?.charAt(0)?.toUpperCase() ?? "U"}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium text-foreground">{user?.fullName}</p>
              <p className="text-xs text-muted-foreground">
                {user?.primaryEmailAddress?.emailAddress}
              </p>
            </div>
          </div>
        ) : (
          <div>
            <h2 className="text-lg font-brand font-bold text-primary">
              Unideal
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              Campus Marketplace
            </p>
          </div>
        )}
      </div>

      <Separator />

      {/* Nav Links */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {mainLinks.map((link) => (
          <SheetClose key={link.href} asChild>
            <Link to={link.href}>
              <Button
                variant="ghost"
                className="w-full justify-start gap-3 h-11"
              >
                <link.icon className="h-5 w-5 text-muted-foreground" />
                {link.label}
              </Button>
            </Link>
          </SheetClose>
        ))}

        {isSignedIn && (
          <>
            <Separator className="my-3" />
            {authLinks.map((link) => (
              <SheetClose key={link.href} asChild>
                <Link to={link.href}>
                  <Button
                    variant="ghost"
                    className="w-full justify-start gap-3 h-11"
                  >
                    <link.icon className="h-5 w-5 text-muted-foreground" />
                    {link.label}
                  </Button>
                </Link>
              </SheetClose>
            ))}
          </>
        )}
      </nav>

      <Separator />

      {/* Footer Actions */}
      <div className="p-4">
        {isSignedIn ? (
          <Button
            variant="ghost"
            className="w-full justify-start gap-3 text-destructive hover:text-destructive"
            onClick={() => signOut()}
          >
            <LogOut className="h-5 w-5" />
            Sign Out
          </Button>
        ) : (
          <div className="space-y-2">
            <SheetClose asChild>
              <Link to="/sign-in" className="block">
                <Button variant="outline" className="w-full gap-2">
                  <LogIn className="h-4 w-4" />
                  Sign In
                </Button>
              </Link>
            </SheetClose>
            <SheetClose asChild>
              <Link to="/sign-up" className="block">
                <Button className="w-full btn-primary-gradient gap-2">
                  <UserPlus className="h-4 w-4" />
                  Get Started
                </Button>
              </Link>
            </SheetClose>
          </div>
        )}
      </div>
    </div>
  )
}
