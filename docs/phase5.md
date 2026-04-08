# Phase 5 — Social Features

> **Goal**: Follow system, toast notifications, share, hire badge, and portfolio interactions.

## Project Context

Next.js 16 + Prisma 7 + Supabase Auth + Tailwind CSS.

Phases 1-4 must be complete before this phase.

## Key Files
- `prisma/schema.prisma` — `Follows` model already exists
- `src/app/actions/` — server actions directory
- `src/components/ui/` — UI components

## Tasks

- [ ] Create `src/app/actions/follow.ts` — `toggleFollowAction(targetUserId: string)`. Authenticate the current user. Check if already following: if yes, delete the `Follows` record; if no, create it. Use the existing `Follows` model in Prisma (`followerId`, `followingId` composite key). Return `{ success: true, isFollowing: boolean }`. Add `revalidatePath('/community')`.

- [ ] Create `src/components/ui/FollowButton.tsx` — client component. Accepts `targetUserId`, `initialIsFollowing`, `initialCount`. Uses `useTransition` + optimistic state. Calls `toggleFollowAction`. Shows "Follow" / "Following" state with count. Disabled if not authenticated (shows "Sign in to follow").

- [ ] Wire `FollowButton` into `/[username]/home` page — show on the profile header when the visitor is NOT the owner. Show follower count next to the button.

- [ ] Add toast notification system. Install `sonner` package (`npm install sonner`). Add `<Toaster />` to `src/app/layout.tsx`. Show toasts for: appreciation sent/removed, comment posted, comment deleted, follow/unfollow, profile settings saved, content deleted.

- [ ] Add share functionality to artwork detail pages and portfolio home. Use the Web Share API (`navigator.share`) with fallback to "Copy link" (clipboard). Add a [Share] button next to appreciation on detail pages.

- [ ] Add "Available for Hire" toggle in `/[username]/settings`. Checkbox/toggle that updates `isAvailableForHire` boolean on the User record via server action. Show a green "Available for Hire" badge on the profile home page and community profile cards.

- [ ] Add "Hire" button placeholder on `/[username]/about` page. For now, renders as a mailto link using a contact email from `profileConfig.socialLinks`. Styled as a prominent CTA button.

- [ ] Track follow/unfollow in community: re-query follow counts after toggle so the Profiles tab reflects real-time data.

## Verification
```bash
npm install sonner
npm run build
```

## Completion
When ALL tasks are checked and build passes, output: DONE
