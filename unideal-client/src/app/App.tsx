import { lazy, Suspense } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { ClerkProvider } from "@clerk/clerk-react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Toaster } from "sonner"
import { ThemeProvider } from "@/components/ThemeProvider"
import { TooltipProvider } from "@/components/ui/tooltip"
import { ApiTokenProvider } from "@/lib/auth"
import ProtectedRoute from "@/components/ProtectedRoute"
import RootLayout from "@/app/layout/RootLayout"

/* ---------- lazy-loaded pages ---------- */
const Home = lazy(() => import("@/app/routes/Home"))
const Browse = lazy(() => import("@/app/routes/Browse"))
const ItemDetail = lazy(() => import("@/app/routes/ItemDetail"))
const SellItem = lazy(() => import("@/app/routes/SellItem"))
const Dashboard = lazy(() => import("@/app/routes/Dashboard"))
const Chat = lazy(() => import("@/app/routes/Chat"))
const Wallet = lazy(() => import("@/app/routes/Wallet"))
const Profile = lazy(() => import("@/app/routes/Profile"))
const Settings = lazy(() => import("@/app/routes/Settings"))
const Onboarding = lazy(() => import("@/app/routes/Onboarding"))
const Verification = lazy(() => import("@/app/routes/Verification"))
const Favorites = lazy(() => import("@/app/routes/Favorites"))
const NotFound = lazy(() => import("@/app/routes/NotFound"))
const SignIn = lazy(() => import("@/app/routes/SignIn"))
const SignUp = lazy(() => import("@/app/routes/SignUp"))

/* ---------- react-query client ---------- */
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 2, // 2 minutes
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
})

/* ---------- Clerk key ---------- */
const CLERK_PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!CLERK_PUBLISHABLE_KEY) {
  throw new Error("Missing VITE_CLERK_PUBLISHABLE_KEY environment variable")
}

/* ---------- loading fallback ---------- */
function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
    </div>
  )
}

/* ---------- App ---------- */
export default function App() {
  return (
    <ClerkProvider
      publishableKey={CLERK_PUBLISHABLE_KEY}
      appearance={{
        variables: {
          colorPrimary: "#A855F7",
          colorBackground: "#0A0A0A",
          colorText: "#FAFAFA",
          colorInputBackground: "#1A1A2E",
          colorInputText: "#FAFAFA",
          borderRadius: "0.5rem",
        },
      }}
    >
      <ApiTokenProvider>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider defaultTheme="dark" storageKey="unideal-theme">
            <TooltipProvider delayDuration={300}>
              <BrowserRouter>
                <Suspense fallback={<PageLoader />}>
                  <Routes>
                    <Route element={<RootLayout />}>
                      {/* -- public routes -- */}
                      <Route path="/" element={<Home />} />
                      <Route path="/browse" element={<Browse />} />
                      <Route path="/items/:id" element={<ItemDetail />} />
                      <Route path="/sign-in/*" element={<SignIn />} />
                      <Route path="/sign-up/*" element={<SignUp />} />

                      {/* -- protected routes -- */}
                      <Route element={<ProtectedRoute />}>
                        <Route path="/sell" element={<SellItem />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/chat" element={<Chat />} />
                        <Route path="/chat/:conversationId" element={<Chat />} />
                        <Route path="/wallet" element={<Wallet />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/settings" element={<Settings />} />
                        <Route path="/onboarding" element={<Onboarding />} />
                        <Route path="/verification" element={<Verification />} />
                        <Route path="/favorites" element={<Favorites />} />
                      </Route>

                      {/* -- catch-all -- */}
                      <Route path="*" element={<NotFound />} />
                    </Route>
                  </Routes>
                </Suspense>
              </BrowserRouter>
              <Toaster
                position="bottom-right"
                theme="dark"
                richColors
                closeButton
              />
            </TooltipProvider>
          </ThemeProvider>
        </QueryClientProvider>
      </ApiTokenProvider>
    </ClerkProvider>
  )
}
