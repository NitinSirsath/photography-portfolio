# Phase 2 — Dynamic Navigation System

> **Goal**: Build the three-mode navigation system — platform nav, portfolio nav (with theme takeover), and owner nav.

## Project Context

Next.js 16 + Prisma 7 + Supabase Auth + Tailwind CSS.

Phase 1 must be complete before starting this phase.

## Key Files
- `src/components/layout/Navbar.tsx` — current single navbar → needs splitting
- `src/app/[username]/layout.tsx` — layout for portfolio routes
- `src/app/layout.tsx` — root layout

## Tasks

- [ ] Create `src/components/layout/PlatformNavbar.tsx` — for `/` and `/community` routes (logged-out). Shows: Platform logo, [Home], [Community], [Sign In]. Clean, minimal, dark theme.

- [ ] Create `src/components/layout/PortfolioNavbar.tsx` — for all `/[username]/*` routes. Accepts `profileConfig` as prop. Shows: creator's logoText (or initial), [Home], [Photos], [Artworks], [About]. Applies creator's `accentColor` as active link color. Includes "← Back to Community" breadcrumb pill (links to `/community`).

- [ ] Add "Viewing as @username" identity pill to `PortfolioNavbar` — shown when a logged-in user is visiting SOMEONE ELSE's profile. Small avatar + username in top-right corner, distinct from main nav. Hidden if viewing own profile or logged out.

- [ ] Create `src/app/[username]/layout.tsx` — layout wrapper for all `/[username]/*` routes. Fetches the creator's `profileConfig` from Prisma. Renders `PortfolioNavbar` with the creator's config. Injects CSS custom properties: `--accent`, `--bg`, `--fg`, `--font` based on profileConfig values.

- [ ] Update `src/app/layout.tsx` — root layout should NOT render the old `Navbar` on `/[username]/*` routes (the portfolio layout handles its own nav). Detect the route pattern and conditionally render `PlatformNavbar` only on non-portfolio routes.

- [ ] Update `PortfolioNavbar` for owner mode — when the logged-in user IS the profile owner, show an additional [⚙ Settings] nav item linking to `/[username]/settings`. Show a floating "Creator Studio" button fixed to bottom-right linking to `/dashboard`.

## Verification
```bash
npm run build
```

## Completion
When ALL tasks are checked and build passes, output: DONE
