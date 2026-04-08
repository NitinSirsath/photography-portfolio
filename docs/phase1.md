# Phase 1 — Route Restructure

> **Goal**: Establish the new routing architecture — marketing landing, auth redirects, scoped creator portfolio routes.

## Project Context

Next.js 16 + Prisma 7 + Supabase Auth + Tailwind CSS. Deployed on Vercel.

**Current state**: `/` is a global feed. Pivoting to portfolio-first platform.
- `/` = marketing landing page (logged-out only)
- `/[username]/home` = creator's personal portfolio landing
- Logged-in users redirect away from `/` to their own portfolio

## Key Files
- `src/app/page.tsx` — currently global feed → becomes marketing page
- `src/middleware.ts` — auth redirects → needs updating  
- `src/app/[username]/page.tsx` — profile page → redirect to `/[username]/home`
- `src/app/auth/callback/route.ts` — post-login redirect target

## Tasks

- [ ] Rewrite `src/app/page.tsx` as marketing landing page. Full-screen hero: headline "Your portfolio. Your identity. Your domain.", subheadline "The professional home for photographers and visual artists.", feature grid (3 cols: Portfolio Takeover, Community Discovery, Creator Studio), CTA button "Claim Your Portfolio →" linking to `/login`. Use existing dark theme and Tailwind. NO database queries. Always public, never redirects.

- [ ] Update `src/middleware.ts`: logged-in users hitting `/` get redirected to `/[username]/home`. Read username from Prisma User table using the authenticated user's ID. Keep all existing protected route logic intact.

- [ ] Create `src/app/[username]/home/page.tsx` — creator's portfolio landing page. Query user by username, show displayName, bio, avatar, latest 6 works (artworks + photo series mixed). Apply profileConfig accentColor as CSS custom property `--accent`. Include "View All Photos" and "View All Artworks" links. Call `notFound()` if user not found.

- [ ] Update `src/app/[username]/page.tsx` to `redirect('/[username]/home')` using `redirect()` from `next/navigation`.

- [ ] Create `src/app/[username]/photos/page.tsx` — scoped to this creator only. Query `prisma.photoSeries.findMany({ where: { userId: user.id, isPublished: true } })`. Reuse photo series card UI from existing `/photos` page.

- [ ] Create `src/app/[username]/artworks/page.tsx` — scoped to this creator only. Query `prisma.artwork.findMany({ where: { userId: user.id, isPublished: true } })`. Reuse `ArtworkCard` component with `authorUsername` prop.

- [ ] Create `src/app/[username]/about/page.tsx` — personal bio page. Show avatar, displayName, bio, social links from profileConfig. If visiting user is the owner, show "Edit Profile" button → `/[username]/settings`.

- [ ] Update `src/app/auth/callback/route.ts`: after successful user creation/lookup, redirect to `/${username}/home` instead of `/dashboard`.

## Verification
```bash
npm run build
```
All routes must compile with zero TypeScript errors.

## Completion
When ALL tasks are checked and build passes, output: DONE
