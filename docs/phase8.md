# Phase 8 — Discovery & Search

> **Goal**: Implement global search and content discovery to help users find creators and specific visual assets.

## Project Context
Phases 1-7 are complete. The architecture supports multi-tenancy and theme-takeover.

## Tasks

- [ ] **Global Search Bar**: Add a search input to the `PlatformNavbar`. 
- [ ] **Search Results Page**: Create `src/app/search/page.tsx`. Use Prisma `contains` and `mode: 'insensitive'` to search through:
  - User `displayName` and `username`
  - Artwork `title` and `tags`
  - PhotoSeries `title`
- [ ] **Trending Algorithm**: Update the `Profiles` tab in `/community` to allow sorting by "Trending" (most followers gained in the last 7 days).
- [ ] **Tag Discovery**: Create `src/app/tags/[tag]/page.tsx` to show all artworks/series across the platform that share a specific tag.
- [ ] **Advanced Comments**: 
  - Allow users to edit their own comments.
  - Add "Reply" functionality (self-referential relation in `Comment` model).

## Verification
```bash
npx prisma generate
npm run build
```
