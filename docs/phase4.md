# Phase 4 — Community Page Upgrade

> **Goal**: Rebuild `/community` with tabbed navigation — Posts feed and ranked Profiles directory.

## Project Context

Next.js 16 + Prisma 7 + Tailwind CSS.

Phases 1-3 must be complete before this phase.

## Key Files
- `src/app/community/page.tsx` — current creator directory → full rebuild
- `src/components/ui/` — reuse existing card components

## Tasks

- [ ] Rebuild `src/app/community/page.tsx` with two tabs: [Posts] and [Profiles]. Use client-side tab state (`useState`) for tab switching. Both tabs shown on the same route `/community`.

- [ ] **Posts tab**: Unified chronological feed combining ALL published artworks + photo series across the platform. Each card shows: cover image, title, type badge ("PHOTO" or "ARTWORK"), creator avatar + username, appreciation count, date. Clicking a card navigates to the creator's portfolio (full theme takeover). Add filter buttons: [All] [Photos] [Artworks]. Use a masonry or 3-column responsive grid.

- [ ] **Profiles tab**: Ranked creator directory. Composite score = follower count + appreciation count + (content count × 10). Query all users with at least 1 published work. Sort by composite score descending. Each card shows: avatar, displayName, username, follower count, total works, total appreciations, "Available for Hire" badge if `isAvailableForHire`. Action buttons: [Follow] [View Profile].

- [ ] Add achievement badges to profile cards. Logic:
  - "Rising Star" = joined within last 30 days AND has 3+ works
  - "Top Creator" = composite score in top 10% of all creators
  - "Prolific" = 20+ published works
  - "Well Loved" = 50+ total appreciations

- [ ] Add follow button to profile cards in Profiles tab. Integrate with `toggleFollowAction` from Phase 5. If Phase 5 is not complete, render a disabled placeholder button.

- [ ] Add pagination or "Load More" button to Posts tab — load 12 posts at a time. Use a `page` query param or local state with offset.

- [ ] Add a community stats bar at the top: "X creators · Y works published · Z appreciations". Aggregate these counts in a single parallel Prisma query.

## Verification
```bash
npm run build
```

## Completion
When ALL tasks are checked and build passes, output: DONE
