# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
npm run dev      # Start development server
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

There is no test runner configured in this project.

## Architecture

This is a Next.js App Router application with a strict 4-layer data flow:

```
Repository → Services → Hooks (React Query) → Components
```

- **[lib/repository/](lib/repository/)** — Raw axios HTTP calls. All requests use `withCredentials: true` (cookie-based auth). Base URL from `process.env.API_BASE_URL`.
- **[lib/services/](lib/services/)** — Thin layer over the repository. **Note:** mock data is currently active — `users.services.ts` returns `mockUsers` directly; repository calls are commented out.
- **[lib/hooks/](lib/hooks/)** — React Query mutations and queries consumed by components. Window-focus refetch is disabled; no retries on `getUserQuery`.
- **[lib/zustand/](lib/zustand/)** — Zustand store for client-side auth state (`user`, `isLogin`, `saveUser`, `removeUser`). React Query handles server state; Zustand holds the logged-in user only.

## Key Conventions

**Styling:** Tailwind CSS v4 (`@import "tailwindcss"` in [app/globals.css](app/globals.css)). No `tailwind.config.ts` — theme tokens (background-primary, info-success, etc.) are declared as CSS variables in `globals.css`. Use the `cn()` util from [lib/utils/common.util.ts](lib/utils/common.util.ts) (clsx + tailwind-merge) for conditional class names.

**UI Components:** Radix UI primitives for accessible dialogs ([components/common/confirmation-modal.tsx](components/common/confirmation-modal.tsx)) and toasts ([components/ui/toaster.tsx](components/ui/toaster.tsx)). Wrap the `<Toaster>` and `<ReactQueryDevtools>` in [components/providers.tsx](components/providers.tsx) (already mounted in the root layout).

**Route Groups:** `app/(authorization)/` groups login and register pages without affecting the URL path.

**Next.js Docs:** Before touching routing, data fetching, caching, or server/client component boundaries, read the relevant guide from `node_modules/next/dist/docs/01-app/`. The version in use has breaking changes vs. widely-known Next.js 13–15.
