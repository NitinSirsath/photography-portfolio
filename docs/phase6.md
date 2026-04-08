# Phase 6 — Content Management

> **Goal**: Full CRUD for creator content — dashboard management, avatar upload, individual photo upload into series.

## Project Context

Next.js 16 + Prisma 7 + Supabase Storage + Tailwind CSS.

Phases 1-5 must be complete before this phase.

## Key Files
- `src/app/dashboard/` — creator studio
- `src/app/actions/artwork.ts` — existing create action
- `src/app/actions/photo.ts` — existing create action
- `src/lib/supabase.ts` — supabaseAdmin client (has `server-only` guard)

## Tasks

- [ ] Create `src/app/dashboard/content/page.tsx` — "My Content" management page. PROTECTED: only accessible to the authenticated user. Query all user's artworks + photo series. Display in two sections: "Artworks" grid and "Photo Series" grid. Each card has: thumbnail, title, date, Edit button (future), Delete button (calls delete action with confirmation).

- [ ] Create `src/app/actions/artwork.ts` additions: `deleteArtworkAction(id: string)`. Authenticate user. Verify ownership: `artwork.userId === user.id`. Delete from Supabase Storage (extract file path from imageUrl). Delete Prisma record. Revalidate `/dashboard/content` and `/artworks`.

- [ ] Create `src/app/actions/photo.ts` additions: `deletePhotoSeriesAction(id: string)`. Same ownership check pattern. Delete cover image from Supabase Storage. Delete Prisma record (cascade deletes Photos). Revalidate `/dashboard/content` and `/photos`.

- [ ] Add avatar upload to `src/components/ui/SettingsForm.tsx`. Add a file input (`accept="image/*"`). On upload: convert to buffer, upload to `avatars/` path in Supabase Storage via `supabaseAdmin`. Get public URL. Update `prisma.user.update({ avatarUrl })`. Show current avatar with a "Change Photo" overlay on hover.

- [ ] Create `src/app/dashboard/photos/[seriesId]/page.tsx` — individual photo management for a series. Shows all `Photo` records belonging to this series. Upload button to add more photos.

- [ ] Create `src/app/dashboard/photos/[seriesId]/upload/page.tsx` — form to upload individual photos into a series. Fields: image file (required), caption, EXIF fields (aperture, shutterSpeed, focalLength, iso). On submit: upload to `photos/[seriesId]/` path in storage, create `Photo` record linked to `photoSeriesId`.

- [ ] Create `src/app/actions/photo-upload.ts` — `uploadPhotoToSeriesAction(formData: FormData)`. Authenticate. Verify series ownership. Upload image to Supabase Storage. Create `Photo` record with all EXIF fields. Revalidate the series management page.

- [ ] Add mobile-responsive sidebar to `src/app/dashboard/layout.tsx`. Currently uses `hidden md:block`. Add a hamburger menu button for mobile. Use a slide-out drawer pattern with a close button.

## Verification
```bash
npm run build
```

## Completion
When ALL tasks are checked and build passes, output: DONE
