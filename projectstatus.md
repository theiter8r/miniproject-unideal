# Unideal — Project Status

> **Last Updated**: 2026-02-26
> **Current Phase**: Phase 0 — Planning (COMPLETE)
> **Next Phase**: Phase 1 — Foundation & Auth

---

## Overall Progress

| Phase | Name | Status | Agent F | Agent B | Agent A | % Done |
|---|---|---|---|---|---|---|
| 0 | Planning & Documentation | ✅ COMPLETE | — | — | ✅ | 100% |
| 1 | Foundation & Auth | ⬜ NOT STARTED | ⬜ | ⬜ | — | 0% |
| 2 | Onboarding & ID Verification | ⬜ NOT STARTED | ⬜ | ⬜ | ⬜ | 0% |
| 3 | Listings, Search & Discovery | ⬜ NOT STARTED | ⬜ | ⬜ | — | 0% |
| 4 | Razorpay Payments & Escrow | ⬜ NOT STARTED | ⬜ | ⬜ | — | 0% |
| 5 | Real-time Chat & Notifications | ⬜ NOT STARTED | ⬜ | ⬜ | — | 0% |
| 6 | Ratings, Reviews & Profiles | ⬜ NOT STARTED | ⬜ | ⬜ | — | 0% |
| 7 | Admin Panel & Moderation | ⬜ NOT STARTED | ⬜ | ⬜ | ⬜ | 0% |
| 8 | Polish, Performance & Deployment | ⬜ NOT STARTED | ⬜ | ⬜ | ⬜ | 0% |

**Overall Completion: 12.5%** (planning only)

---

## Phase 0 — Planning & Documentation

### Completed Artifacts
- [x] `context.md` — Full project context, architecture, schema, API endpoints
- [x] `to-do.md` — 8-phase plan with detailed tasks & verification checklists
- [x] `agent.md` — Agent rules, file ownership, coordination protocols
- [x] `projectstatus.md` — This file

---

## Phase 1 — Foundation & Auth (NOT STARTED)

### Backend Tasks (Agent B)
- [ ] **1B.1** — Initialize `unideal-server` repo (Express 5 + TS + ESLint)
- [ ] **1B.2** — Prisma setup: full schema, initial migration, seed file
- [ ] **1B.3** — Clerk webhook endpoint (`/api/webhooks/clerk`) — user.created, user.updated
- [ ] **1B.4** — `requireAuth` middleware using Clerk SDK
- [ ] **1B.5** — `GET /api/me` endpoint — return current user profile
- [ ] **1B.6** — Global error handler + request logger middleware
- [ ] **1B.7** — Health check endpoint (`GET /api/health`)
- [ ] **1B.8** — CORS, Helmet, rate-limit configuration

### Frontend Tasks (Agent F)
- [ ] **1F.1** — Initialize `unideal-client` repo (Vite + React + TS + Tailwind + shadcn/ui)
- [ ] **1F.2** — Clerk provider setup + environment config
- [ ] **1F.3** — React Router setup: layout routes, protected route wrapper
- [ ] **1F.4** — TanStack Query provider + custom `api.ts` fetch wrapper (attaches Clerk token)
- [ ] **1F.5** — Landing page with hero, features, CTA → sign in
- [ ] **1F.6** — Clerk `<SignIn>` and `<SignUp>` pages (styled with theme)
- [ ] **1F.7** — Navbar component (responsive, auth state, avatar dropdown)
- [ ] **1F.8** — Dark mode toggle with `next-themes` or class-based approach
- [ ] **1F.9** — Global layout: sidebar on desktop, bottom nav on mobile
- [ ] **1F.10** — Sonner toast provider + Framer Motion page transitions

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
| `unideal-client` | ⬜ Not Created | — | — | — |
| `unideal-server` | ⬜ Not Created | — | — | — |

---

## Deployment Status

| Environment | Frontend (Vercel) | Backend (Railway) | Database (Railway) |
|---|---|---|---|
| **Production** | ⬜ Not Deployed | ⬜ Not Deployed | ⬜ Not Provisioned |
| **Preview** | — | — | — |

---

## Blockers

_None currently — ready to begin Phase 1._

---

## Cross-Agent Requests

_None currently._

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

**Blockers for Next Agent**: 
- Service accounts need to be created before development can start (Clerk, Railway PostgreSQL at minimum for Phase 1)

**Next Up**:
- Agent B: Tasks 1B.1 through 1B.8 (server initialization, Prisma schema, Clerk webhook, middleware)
- Agent F: Tasks 1F.1 through 1F.10 (client initialization, Clerk setup, routing, layout)
- Both agents can work in parallel since they operate on separate repos

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
| 2026-02-26 | A | Phase 0 complete | Created all 4 planning documents |
