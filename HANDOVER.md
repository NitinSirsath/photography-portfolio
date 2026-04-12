# AI Agent Handover — Visual Archive

## Project Identity
**Visual Archive** is a portfolio-first platform for visual creators. Unlike social media, it prioritizes individual identity. Every user has a "mini-site" at `/[username]` where the platform UI transforms into their personal brand (colors, fonts, logo).

## Current State
**Phases 1-11 are COMPLETED.**
- [x] Route Restructuring & Multi-tenancy
- [x] Dynamic Navigation & Theme Engine (CSS Variables)
- [x] Community Hub (Tabbed Feed & Ranked Directory)
- [x] Discovery (Global Search & Tag-based Routing)
- [x] Social System (Follows, Share API, Nested Comments)
- [x] Content CMS (Dashboard, Asset Management)
- [x] Analytics (Portfolio Views, Impactful Assets)
- [x] Real-time (Supabase Subscriptions for Notifications & Comments)
- [x] Performance (Next.js Image Optimization)
- [x] Creator Economy (Support/Tip Jar Integration)
- [x] Hardening (Error Boundaries, Skeletons, SEO Metadata)

## Core Tech Stack
- **Framework**: Next.js 16 (App Router + Turbopack)
- **Database**: PostgreSQL via Prisma ORM
- **Auth**: Supabase SSR (Cookies)
- **Real-time**: Supabase Channels (Postgres Changes)
- **Storage**: Supabase Storage (`portfolio-images` bucket)
- **Styling**: Tailwind CSS
- **Notifications**: Sonner

## Architecture Specifics
### 1. The Theme Engine
Located in `src/app/[username]/layout.tsx`. It fetches `user.profileConfig` and injects variables:
- `--bg`, `--fg`, `--accent`, `--font`

### 2. Real-time Subscriptions
Implemented in `NotificationBell.tsx` and `CommentThread.tsx`. Uses Supabase client-side subscriptions to `public.Activity` and `public.Comment`.

### 3. Analytics
Uses a "fire-and-forget" update pattern for `portfolioViews` in `/[username]/home/page.tsx` to ensure analytics don't block page rendering.

## AI Instructions for New Agents
- **Absolute Paths Only**: When writing files, use absolute paths.
- **Prisma Schemas**: If you add fields to `schema.prisma`, always run `npx prisma db push` followed by `npx prisma generate`.
- **Server Actions**: All mutations must live in `src/app/actions/`. Always revalidate relevant paths after a mutation.
- **Auth Checks**: Use `createClient` from `@/lib/supabase/server` to check `supabase.auth.getUser()` in server components/actions.
- **Theme Awareness**: When creating components for the `/[username]` routes, use `var(--accent)` for primary colors to respect the creator's theme.
