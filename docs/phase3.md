# Phase 3 — Theme Engine

> **Goal**: Full per-creator branding system. Visiting `/username` transforms the entire page — colors, fonts, logo — to match that creator's configuration.

## Project Context

Next.js 16 + Prisma 7 + Tailwind CSS.

Phases 1 and 2 must be complete before starting this phase.

## Key Files
- `prisma/schema.prisma` — User model has `profileConfig Json` field
- `src/app/[username]/settings/page.tsx` — settings page (may not exist yet)
- `src/app/[username]/layout.tsx` — injects CSS variables

## Tasks

- [ ] Extend `profileConfig` schema documentation (no DB migration needed — it's already a Json field). Define the expected shape in a TypeScript interface at `src/types/profile.ts`:
```ts
export interface ProfileConfig {
  accentColor?: string      // e.g. "#ff6b35"
  backgroundColor?: string  // e.g. "#0a0a0a"
  textColor?: string        // e.g. "#fafafa"
  fontFamily?: 'serif' | 'sans-serif' | 'monospace'
  logoText?: string         // e.g. "NS" or "⚡"
  headerImage?: string      // URL to cover/banner image
  socialLinks?: {
    twitter?: string
    instagram?: string
    behance?: string
    website?: string
  }
}
```

- [ ] Update `src/app/[username]/layout.tsx` — read `profileConfig` from the User record and inject as inline CSS variables on the layout `<div>`:
```tsx
style={{
  '--accent': config.accentColor ?? '#ffffff',
  '--bg': config.backgroundColor ?? '#0a0a0a',
  '--fg': config.textColor ?? '#fafafa',
  '--font': config.fontFamily ?? 'serif',
} as React.CSSProperties}
```

- [ ] Create `src/app/[username]/settings/page.tsx` — profile customization panel. PROTECTED: only the owner can access (check auth, redirect if not owner). Form fields: Display Name, Bio, Accent Color (color picker), Background Color (color picker), Font Family (select: serif/sans-serif/monospace), Logo Text (text input), Avatar upload (file input), Social links (twitter, instagram, behance, website). Live preview panel showing how the portfolio will look.

- [ ] Create `src/app/actions/user.ts` update: extend `updateProfileAction` to accept the full `ProfileConfig` object and merge it into the existing `profileConfig` JSON field using Prisma's `update` with spread.

- [ ] Update Prisma schema to add new User fields (run `npx prisma db push` after):
```prisma
isAvailableForHire  Boolean @default(false)
portfolioViews      Int     @default(0)  
socialLinks         Json?
```

- [ ] Add portfolio view counter: in `src/app/[username]/home/page.tsx`, after fetching the user, increment `portfolioViews` using a fire-and-forget Prisma update (don't await it, wrap in try/catch).

## Verification
```bash
npx prisma generate && npm run build
```

## Completion
When ALL tasks are checked and build passes, output: DONE
