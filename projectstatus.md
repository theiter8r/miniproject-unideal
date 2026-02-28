# Unideal — Project Status

> **Last Updated**: 2026-03-02
> **Current Phase**: Phase 1 — Foundation & Auth (COMPLETE)
> **Next Phase**: Phase 2 — Onboarding & ID Verification

---

## Overall Progress

| Phase | Name | Status | Agent F | Agent B | Agent A | % Done |
|---|---|---|---|---|---|---|
| 0 | Planning & Documentation | ✅ COMPLETE | — | — | ✅ | 100% |
| 1 | Foundation & Auth | ✅ COMPLETE | ✅ | ✅ | — | 100% |
| 2 | Onboarding & ID Verification | ⬜ NOT STARTED | ⬜ | ⬜ | ⬜ | 0% |
| 3 | Listings, Search & Discovery | ⬜ NOT STARTED | ⬜ | ⬜ | — | 0% |
| 4 | Razorpay Payments & Escrow | ⬜ NOT STARTED | ⬜ | ⬜ | — | 0% |
| 5 | Real-time Chat & Notifications | ⬜ NOT STARTED | ⬜ | ⬜ | — | 0% |
| 6 | Ratings, Reviews & Profiles | ⬜ NOT STARTED | ⬜ | ⬜ | — | 0% |
| 7 | Admin Panel & Moderation | ⬜ NOT STARTED | ⬜ | ⬜ | ⬜ | 0% |
| 8 | Polish, Performance & Deployment | ⬜ NOT STARTED | ⬜ | ⬜ | ⬜ | 0% |

**Overall Completion: 25%** (planning + Phase 1 complete)

---

## Phase 0 — Planning & Documentation

### Completed Artifacts
- [x] `context.md` — Full project context, architecture, schema, API endpoints
- [x] `to-do.md` — 8-phase plan with detailed tasks & verification checklists
- [x] `agent.md` — Agent rules, file ownership, coordination protocols
- [x] `projectstatus.md` — This file

---

## Phase 1 — Foundation & Auth (Backend COMPLETE)

### Backend Tasks (Agent B)
- [x] **1B.1** — Initialize `unideal-server` repo (Express 5 + TS) ✅
- [x] **1B.2** — Prisma setup: full schema (14 models), seed file (6 categories, 5 colleges, admin user) ✅
- [x] **1B.3** — Clerk webhook endpoint (`POST /api/webhooks/clerk`) — user.created, user.updated with Svix verification ✅
- [x] **1B.4** — `requireAuth` + `requireAdmin` + `requireVerified` middleware using `@clerk/express` verifyToken ✅
- [x] **1B.5** — User endpoints: `GET /api/users/me`, `PUT /api/users/me`, `POST /api/users/onboarding`, `GET /api/users/:id` ✅
- [x] **1B.5** — `GET /api/categories` + `GET /api/colleges` + `GET /api/colleges/:slug` ✅
- [x] **1B.6** — Global error handler (Prisma errors, validation, 500s) ✅
- [x] **1B.6** — Zod validation middleware (`validate` + `validateQuery`) ✅
- [x] **1B.6** — Rate limiting (general, auth, items, payments) ✅
- [x] **1B.5** — Health check endpoint (`GET /health`) ✅
- [x] **1B.1** — CORS, Helmet, JSON parsing, raw body for webhooks ✅

### Frontend Tasks (Agent F)
- [x] **1F.1** — Initialize `unideal-client` repo (Vite 7 + React 19 + TypeScript + Tailwind v4) ✅
- [x] **1F.2** — shadcn/ui component library (10 base components) + CSS-first theme system ✅
- [x] **1F.3** — Clerk integration: `<ClerkProvider>`, `<SignIn>/<SignUp>` pages, `ApiTokenProvider` (auto-attaches JWT) ✅
- [x] **1F.4** — Layout shell: Navbar (desktop dropdown + mobile Sheet), Footer, RootLayout with Framer Motion page transitions ✅
- [x] **1F.5** — React Router v6 setup: 15 routes (5 public, 10 protected), all lazy-loaded, `<ProtectedRoute>` with Outlet pattern ✅
- [x] **1F.6** — Dark mode: ThemeProvider (dark/light/system) with localStorage persistence + system media query listener ✅
- [x] **1F.7** — TypeScript types (all 14 Prisma models + enums + input types), API client class, Cloudinary helpers, constants ✅
- [x] **1F.8** — Landing page: Hero, Features (4 cards), Categories (6), How It Works (4 steps), CTA ✅
- [x] **1F.9** — TanStack React Query v5 provider + Sonner toast notifications ✅
- [x] **1F.10** — Vite build succeeds: 2684 modules transformed, all code-split per route ✅

### Verification Checklist
- [ ] User can sign up via Clerk (Google OAuth + email)
- [ ] Clerk webhook creates user row in PostgreSQL via Prisma
- [ ] Frontend attaches JWT to API calls
- [ ] `GET /api/me` returns user data
- [ ] Protected routes redirect to sign-in
- [ ] Dark mode toggle works
- [ ] Responsive layout renders on mobile + desktop

---

## Service Account Setup

| Service | Status | Account Created | Keys in .env | Notes |
|---|---|---|---|---|
| **Clerk** | ⬜ Pending | No | No | Need publishable + secret keys |
| **PostgreSQL (Railway)** | ⬜ Pending | No | No | Need DATABASE_URL |
| **Cloudinary** | ⬜ Pending | No | No | Need cloud name + presets (3 presets needed) |
| **Razorpay** | ⬜ Pending | No | No | Test mode keys, key_id + key_secret |
| **Ably** | ⬜ Pending | No | No | Root API key |
| **Mapbox** | ⬜ Pending | No | No | Public access token |
| **Resend** | ⬜ Pending | No | No | API key + verified domain |
| **Vercel** | ⬜ Pending | No | No | Frontend deployment |
| **Railway** | ⬜ Pending | No | No | Backend + DB deployment |

---

## Repository Status

| Repo | Status | URL | Branch | Last Deploy |
|---|---|---|---|---|
| `unideal-client` | ✅ Scaffolded | local | main | — |
| `unideal-server` | ✅ Scaffolded | local | main | — |

---

## Deployment Status

| Environment | Frontend (Vercel) | Backend (Railway) | Database (Railway) |
|---|---|---|---|
| **Production** | ⬜ Not Deployed | ⬜ Not Deployed | ⬜ Not Provisioned |
| **Preview** | — | — | — |

---

## Blockers

- **DATABASE_URL needed**: Agent B code is ready but `prisma db push` and `prisma db seed` require a PostgreSQL connection string. Create a Railway PostgreSQL addon or use a local PostgreSQL instance and add `DATABASE_URL` to `.env`.
- **CLERK_SECRET_KEY + CLERK_WEBHOOK_SECRET needed**: Webhook endpoint is coded but requires Clerk project credentials to function.

---

## Cross-Agent Requests

- **Agent F**: Backend API is ready at the following endpoints. Mirror response types in `unideal-client/src/types/index.ts`:
  - `GET /api/users/me` — returns user profile + wallet + college + counts
  - `GET /api/categories` — returns categories with item counts
  - `GET /api/colleges` — returns active colleges with user/item counts
  - `GET /health` — returns `{ status: "ok", timestamp }`
  - `POST /api/users/onboarding` — body: `{ collegeId, fullName, phone? }`

---

## Handoff Log

### Handoff from Agent A — 2026-02-26 (Planning Phase)

**Completed Tasks**: Phase 0 planning — all 4 documentation files

**Files Created**:
- `context.md` — Full architecture, schema, API endpoints, tech stack, flows, env vars
- `to-do.md` — 8-phase implementation plan with task IDs, checklists, dependency map
- `agent.md` — Agent rules, file ownership, naming conventions, coordination protocols
- `projectstatus.md` — This tracking file

**Known Issues**: None

**Next Up**:
- Agent F: Tasks 1F.1 through 1F.10 (client initialization, Clerk setup, routing, layout)

---

### Handoff from Agent B — 2026-03-01 (Phase 1 Backend)

**Completed Tasks**: 1B.1, 1B.2, 1B.3, 1B.4, 1B.5, 1B.6

**Files Created**:
- `unideal-server/package.json` — All dependencies (Express 5, Prisma, Clerk, Razorpay, Ably, etc.)
- `unideal-server/tsconfig.json` — Strict TypeScript config, ESM module
- `unideal-server/.env.example` — All required environment variables documented
- `unideal-server/.gitignore` — node_modules, dist, .env excluded
- `unideal-server/prisma/schema.prisma` — Full schema: 14 models, all enums, relations, indexes
- `unideal-server/prisma/seed.ts` — Seeds 6 categories, 5 Mumbai colleges, 1 admin user + wallet
- `unideal-server/src/index.ts` — Express app: CORS, Helmet, JSON, raw body for webhooks, rate limiter, routes, error handler
- `unideal-server/src/lib/prisma.ts` — Prisma client singleton (dev hot-reload safe)
- `unideal-server/src/lib/constants.ts` — Rate limit configs, seed categories, pagination constants
- `unideal-server/src/types/index.ts` — AuthUser interface, Express req.user extension, PaginatedResponse, ApiErrorResponse, error codes
- `unideal-server/src/middleware/auth.ts` — requireAuth (Clerk JWT verify), requireAdmin, requireVerified
- `unideal-server/src/middleware/errorHandler.ts` — Global error handler (Prisma P2002/P2025, validation, 500)
- `unideal-server/src/middleware/validate.ts` — Zod validation middleware (body + query)
- `unideal-server/src/middleware/rateLimiter.ts` — Rate limiters (general 60/min, auth 5/min, items 30/min, payments 10/min)
- `unideal-server/src/validators/common.ts` — CUID, pagination, ID param validators
- `unideal-server/src/validators/user.ts` — Onboarding + profile update schemas
- `unideal-server/src/routes/auth.ts` — Clerk webhook: user.created → create User + Wallet, user.updated → sync
- `unideal-server/src/routes/users.ts` — GET/PUT /me, POST /onboarding, GET /:id (public profile + avg rating)
- `unideal-server/src/routes/categories.ts` — GET /api/categories (with item counts)
- `unideal-server/src/routes/colleges.ts` — GET /api/colleges + GET /api/colleges/:slug

**Schema Details**: 14 models (College, User, Wallet, WalletTransaction, Category, Item, Transaction, Conversation, Message, Favorite, Review, Verification, Notification, Report) with 12 enums

**TypeScript**: Compiles with zero errors (`npx tsc --noEmit` passes)

**Known Issues**:
- Cannot run `prisma db push` or `prisma db seed` without DATABASE_URL — need PostgreSQL instance
- Cannot test Clerk webhook without CLERK_SECRET_KEY + CLERK_WEBHOOK_SECRET
- Express 5 uses native `express.raw()` — webhook route receives Buffer body

**Next Up**: 
- Agent F: Tasks 1F.1–1F.7 (frontend initialization)
- Agent B: Phase 2 tasks (2B.1–2B.5) after service accounts are created

---

### Handoff from Agent F — 2026-03-02 (Phase 1 Frontend)

**Completed Tasks**: 1F.1, 1F.2, 1F.3, 1F.4, 1F.5, 1F.6, 1F.7, 1F.8, 1F.9, 1F.10

**Files Created** (40+ files in `unideal-client/`):

_Config & Build:_
- `unideal-client/package.json` — All deps (React 19, Vite 7, Clerk, TanStack Query, Framer Motion, etc.)
- `unideal-client/tsconfig.json` — Strict mode, `@/*` path alias
- `unideal-client/tsconfig.node.json` — Vite/Tailwind config files
- `unideal-client/vite.config.ts` — Port 3000, path alias resolution
- `unideal-client/tailwind.config.ts` — Legacy config (superseded by CSS-first)
- `unideal-client/postcss.config.js` — `@tailwindcss/postcss` (v4)
- `unideal-client/components.json` — shadcn/ui config
- `unideal-client/index.html` — Entry point with Google Fonts
- `unideal-client/.env.example` — All VITE_* env vars documented
- `unideal-client/.gitignore`

_Core App:_
- `src/main.tsx` — React 19 entry point
- `src/app/App.tsx` — Root: ClerkProvider → ApiTokenProvider → QueryClient → ThemeProvider → BrowserRouter → Routes
- `src/vite-env.d.ts` — Typed ImportMetaEnv

_Styles:_
- `src/styles/globals.css` — Tailwind v4 CSS-first: `@import "tailwindcss"`, `@custom-variant dark`, `@theme` tokens, `@utility btn-primary-gradient`, light/dark CSS variables

_Components (shadcn/ui, 10):_
- `src/components/ui/button.tsx`, `card.tsx`, `input.tsx`, `badge.tsx`, `skeleton.tsx`, `avatar.tsx`, `separator.tsx`, `tooltip.tsx`, `dropdown-menu.tsx`, `sheet.tsx`

_Components (custom):_
- `src/components/ProtectedRoute.tsx` — Outlet-based auth guard
- `src/components/ThemeProvider.tsx` — Dark/light/system with localStorage + media query

_Layout:_
- `src/app/layout/Navbar.tsx` — Responsive navbar with Clerk user menu, theme toggle, mobile Sheet trigger
- `src/app/layout/MobileNav.tsx` — Sheet slide-out with user avatar, full nav links
- `src/app/layout/Footer.tsx` — 4-column footer grid
- `src/app/layout/RootLayout.tsx` — AnimatePresence page transitions wrapping Outlet

_Pages (15 routes):_
- `src/app/routes/Home.tsx` — Full landing: Hero, Features, Categories, How It Works, CTA
- `src/app/routes/Browse.tsx` — Placeholder
- `src/app/routes/ItemDetail.tsx` — Placeholder
- `src/app/routes/SellItem.tsx` — Placeholder (protected)
- `src/app/routes/Dashboard.tsx` — Placeholder (protected)
- `src/app/routes/Chat.tsx` — Placeholder (protected)
- `src/app/routes/Wallet.tsx` — Placeholder (protected)
- `src/app/routes/Profile.tsx` — Placeholder (protected)
- `src/app/routes/Settings.tsx` — Placeholder (protected)
- `src/app/routes/Onboarding.tsx` — Placeholder (protected)
- `src/app/routes/Verification.tsx` — Placeholder (protected)
- `src/app/routes/Favorites.tsx` — Placeholder (protected)
- `src/app/routes/NotFound.tsx` — 404 page
- `src/app/routes/SignIn.tsx` — Clerk `<SignIn>` with dark theme
- `src/app/routes/SignUp.tsx` — Clerk `<SignUp>` with dark theme

_Libraries:_
- `src/lib/api.ts` — ApiClient class: auto-attaches Clerk JWT, typed GET/POST/PUT/PATCH/DELETE
- `src/lib/auth.tsx` — ApiTokenProvider component (wires Clerk getToken → ApiClient)
- `src/lib/cloudinary.ts` — URL builder + srcSet generator with transforms
- `src/lib/constants.ts` — Categories, conditions, listing types, status maps, pagination
- `src/lib/utils.ts` — cn(), formatPrice (INR), formatDate, formatRelativeTime

_Types:_
- `src/types/index.ts` — All 14 Prisma model interfaces, enums, input types, paginated response

**Build Status**: 
- `npx tsc --noEmit` — 0 errors
- `npx vite build` — Success, 2684 modules, all route chunks code-split

**Tech Stack Versions**:
- React 19.2.4, Vite 7.3.1, TypeScript 5.x, Tailwind CSS 4.2.1, @clerk/clerk-react (latest)
- TanStack React Query v5, React Router v6, Framer Motion (latest)

**Known Issues**:
- Main `index` chunk is 665 KB (Clerk SDK is heavy) — can be split with `manualChunks` in Phase 8
- React 19 installed (not 18.x as originally planned) — Clerk SDK supports it
- `tailwindcss-animate` installed but not actively used in v4 CSS-first config — animations done via `@theme` and `@keyframes`
- Cannot fully test auth flow without `VITE_CLERK_PUBLISHABLE_KEY` — needs Clerk project setup

**Next Up**:
- Create Clerk project and add `VITE_CLERK_PUBLISHABLE_KEY` to `.env`
- Agent F: Phase 2 tasks (2F.1–2F.4: onboarding flow, verification upload)
- Agent B: Phase 2 tasks (2B.1–2B.5: onboarding API, verification endpoints)

---

## Nice to Have (Deferred)

_Items moved here from active phases when scope becomes too large:_

| Item | Original Phase | Priority | Notes |
|---|---|---|---|
| _None yet_ | — | — | — |

---

## Change Log

| Date | Agent | Change | Details |
|---|---|---|---|
| 2026-03-02 | F | Phase 1 Frontend complete | All 1F tasks done: Vite 7 + React 19 + TS scaffold, Tailwind v4 CSS-first theme, 10 shadcn/ui components, Clerk auth (SignIn/SignUp/ProtectedRoute/ApiTokenProvider), layout shell (Navbar/MobileNav/Footer/RootLayout), React Router v6 with 15 lazy-loaded routes, ThemeProvider (dark/light/system), full TypeScript types for 14 Prisma models, API client with auto-JWT, landing page with hero/features/categories/How it Works/CTA. Vite build passes: 2684 modules, 0 errors. |
| 2026-03-01 | B | Phase 1 Backend complete | All 1B tasks done: repo scaffold, Prisma schema (14 models), Clerk webhook, auth middleware, user/category/college routes, error handling, rate limiting. 20 files created. TS compiles with 0 errors. |
| 2026-02-26 | A | Phase 0 complete | Created all 4 planning documents |
