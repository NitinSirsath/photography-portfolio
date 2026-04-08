# Visual Archive — Platform Architecture PRD

> **Version**: 2.0 — Architecture Pivot  
> **Direction**: Portfolio-first platform. Each creator gets a fully branded mini-site. Community is the discovery layer.  
> **Core analogy**: GitHub for visual creators — your work lives at `domain.com/username`

---

## 1. Platform Philosophy

This is NOT a social media feed. It's a **portfolio hosting platform** with a shared discovery layer.

- Every creator gets a **full branded portfolio site** at `/username`
- The marketing site (`/`) exists only to attract new creators
- The community page (`/community`) is the only shared space — for discovery
- When you visit someone's profile, the **entire site transforms** into their portfolio — their theme, their colors, their navigation

---

## 2. Route Architecture

### Logged-Out User Experience

```
/                          → Marketing landing page (hero, features, CTA)
                             Nav: [Home] [Community] [Sign In]

/community                 → Discovery hub
                             Nav: [Home] [Community] [Sign In]
                             Tabs: [Posts] [Profiles]
                             Posts = chronological feed of all photos + artworks
                             Profiles = ranked creator directory

/login                     → Authentication (Google OAuth + Magic Link)

/[username]                → Redirects to /[username]/home
/[username]/home           → Creator's landing page (customizable layout)
/[username]/photos         → Creator's photo series (scoped)
/[username]/artworks       → Creator's artworks (scoped)
/[username]/about          → Creator's personal bio, awards, contact
                             Nav: [Logo/Initial] [Home] [Photos] [Artworks] [About]
                             + breadcrumb: "← Back to Community"
                             Full theme takeover: accent color, background, typography
```

### Logged-In User Experience

```
/                          → REDIRECT to /[myUsername]/home

/[myUsername]/home          → My portfolio landing (customizable)
/[myUsername]/photos        → My photo series
/[myUsername]/artworks      → My artworks
/[myUsername]/about         → My bio page
/[myUsername]/settings      → Profile customization

/dashboard                 → Content management (PRIVATE)
/dashboard/content         → My uploaded works (edit/delete)
/dashboard/artworks/new    → Upload artwork
/dashboard/photos/new      → Upload photo series

/community                 → Discovery hub (with follow/interact actions)
/[otherUsername]            → Visit someone else's portfolio (THEIR theme takes over)
```

---

## 3. Navigation System

### Mode A: Platform Navigation (logged out)
```
[Platform Logo]  [Home]  [Community]  [Sign In]
```

### Mode B: Creator Portfolio Navigation (any /[username] route)
```
[Creator Initial/Logo]  [Home] [Photos] [Artworks] [About]
← Back to Community (breadcrumb pill)
Theme: Creator's accent color, bg, fonts
```

### Mode C: Owner Navigation (logged-in on OWN profile)
```
[My Logo]  [Home] [Photos] [Artworks] [About]  [⚙ Settings]
+ floating "Creator Studio" → /dashboard
```

---

## 4. Theme / Branding System

Stored in `profileConfig` JSON on User model:

| Setting | Default | Options |
|---------|---------|---------|
| `accentColor` | `#ffffff` | Any hex |
| `backgroundColor` | `#0a0a0a` | Any hex |
| `textColor` | `#fafafa` | Any hex |
| `fontFamily` | `serif` | `monospace`, `sans-serif` |
| `logoText` | First initial | Custom text/emoji |
| `avatarUrl` | Google photo | Uploaded image |
| `bio` | Empty | Text |
| `headerImage` | None | Cover/banner image |

Applied as CSS custom properties on all `/[username]/*` routes.

---

## 5. Community Page (`/community`)

### Tab: Posts
- Unified feed of ALL published content (artworks + photo series)
- Card: cover image, title, type badge (PHOTO / ARTWORK), creator avatar, appreciation count
- Clicking → creator's portfolio (full theme takeover)
- Filters: All | Photos | Artworks

### Tab: Profiles
- Ranked creator directory (composite score: followers + appreciations + content volume)
- Badges: "Top Creator", "100+ Works", "Rising Star"
- Actions: Follow, View Profile, Share, Mail, Hire (future)

---

## 6. Database Schema Additions

```prisma
model User {
  // existing fields...
  isAvailableForHire  Boolean @default(false)
  portfolioViews      Int     @default(0)
  socialLinks         Json?   // { twitter, instagram, behance, website }
  // profileConfig already exists as Json
}
```

---

## 7. Execution Phases

See individual phase files:
- `docs/phase1.md` — Route Restructure
- `docs/phase2.md` — Dynamic Navigation
- `docs/phase3.md` — Theme Engine
- `docs/phase4.md` — Community Page Upgrade
- `docs/phase5.md` — Social Features
- `docs/phase6.md` — Content Management
- `docs/phase7.md` — Polish & Hardening

---

## 8. Success Metrics
- Each `/username` feels like a standalone portfolio website
- Navigation never confusing — breadcrumbs prevent disorientation
- Community surfaces the best content and most active creators
- New creator deploys portfolio in under 2 minutes after signup
