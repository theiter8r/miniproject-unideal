import { useEffect } from "react"
import { useAuth } from "@clerk/clerk-react"
import { api } from "@/lib/api"

/**
 * Initializes the API client with Clerk's session token getter.
 * Must be rendered inside ClerkProvider.
 */
export function ApiTokenProvider({ children }: { children: React.ReactNode }) {
  const { getToken } = useAuth()

  useEffect(() => {
    api.setTokenGetter(getToken)
  }, [getToken])

  return <>{children}</>
}
