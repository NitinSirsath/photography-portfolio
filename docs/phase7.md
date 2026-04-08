# Phase 7 — Polish & Hardening

> **Goal**: Loading states, error boundaries, SEO metadata, CI/CD pipeline, environment validation, and README.

## Project Context

Next.js 16 + Prisma 7 + Vercel deployment.

Phases 1-6 must be complete before this phase.

## Tasks

### Loading States
- [ ] Create `src/app/loading.tsx` — skeleton for the marketing homepage
- [ ] Create `src/app/community/loading.tsx` — skeleton for community feed (shimmer cards)
- [ ] Create `src/app/[username]/home/loading.tsx` — skeleton for portfolio home
- [ ] Create `src/app/[username]/photos/loading.tsx` — skeleton for photo grid
- [ ] Create `src/app/[username]/artworks/loading.tsx` — skeleton for artwork grid
- [ ] Create `src/app/artworks/loading.tsx` — skeleton for global artworks page
- [ ] Create `src/app/photos/loading.tsx` — skeleton for global photos page

### Error Boundaries
- [ ] Create `src/app/error.tsx` — root error boundary. Styled error page with "Something went wrong" message and "Try Again" button.
- [ ] Create `src/app/[username]/error.tsx` — portfolio-level error (e.g., DB timeout). Maintain the portfolio nav branding if possible.
- [ ] Create `src/app/not-found.tsx` — styled 404 page with "This portfolio doesn't exist" messaging and link back to community.
- [ ] Create `src/app/[username]/not-found.tsx` — creator 404. "This creator's portfolio doesn't exist yet." with CTA to sign up.

### SEO & Metadata
- [ ] Add `generateMetadata()` to `src/app/[username]/home/page.tsx` — dynamic title `"${displayName} — Visual Portfolio"`, description from bio, OpenGraph image from headerImage or avatar.
- [ ] Add `generateMetadata()` to `src/app/[username]/artworks/[id]/page.tsx` — title from artwork title, OG image from artwork imageUrl.
- [ ] Add static `metadata` export to `src/app/page.tsx` — platform name, description, OG image.
- [ ] Add static `metadata` to `src/app/community/page.tsx`.
- [ ] Add favicon: create `src/app/favicon.ico` (16x16 and 32x32). Add `src/app/icon.png` (512x512).

### Infrastructure
- [ ] Create `src/lib/env.ts` — validate all required env vars at startup using Zod:
```ts
import { z } from 'zod'
const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  DIRECT_URL: z.string().url(),
  NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1),
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(1),
})
export const env = envSchema.parse(process.env)
```
Install zod if not present: `npm install zod`.

- [ ] Create `.github/workflows/ci.yml`:
```yaml
name: CI
on: [push, pull_request]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: '20' }
      - run: npm ci
      - run: npx prisma generate
      - run: npm run build
      - run: npm run lint
```

- [ ] Rewrite `README.md`:
  - Project description: "Visual Archive — Portfolio hosting platform for photographers and visual artists"
  - Architecture overview (routes, tech stack)
  - Setup instructions (clone, env vars, prisma push, npm run dev)
  - Environment variables table with descriptions
  - Deployment instructions for Vercel

## Verification
```bash
npm install zod
npx prisma generate && npm run build && npm run lint
```

## Completion
When ALL tasks are checked and build passes with zero errors, output: DONE
