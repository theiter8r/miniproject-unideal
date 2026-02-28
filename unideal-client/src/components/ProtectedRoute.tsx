import { useAuth } from "@clerk/clerk-react"
import { Navigate, Outlet, useLocation } from "react-router-dom"

/**
 * Protects nested routes — renders <Outlet /> when authenticated,
 * redirects to /sign-in otherwise.
 */
export default function ProtectedRoute() {
  const { isLoaded, isSignedIn } = useAuth()
  const location = useLocation()

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    )
  }

  if (!isSignedIn) {
    return <Navigate to="/sign-in" state={{ from: location }} replace />
  }

  return <Outlet />
}
