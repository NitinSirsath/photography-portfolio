# Visual Archive

Visual Archive — Portfolio hosting platform for photographers and visual artists.

## Architecture Overview
This is a Next.js 16 App Router application. 
- **Database**: PostgreSQL (via Supabase) accessed with Prisma ORM.
- **Authentication**: Supabase Auth (Google OAuth + Magic Links) with SSR cookies.
- **Storage**: Supabase Storage for artworks, photos, and avatars.
- **Styling**: Tailwind CSS + Monokai-inspired dark theme.

### Routing
- `/` — Platform landing page
- `/community` — Discovery feed of all published works and creator directory
- `/[username]` — Dedicated mini-site for each creator (fully branded via CSS variables)
- `/dashboard` — Private CMS for creators to manage works, photo series, and portfolio settings

## Setup Instructions

1. Clone the repository:
   ```bash
   git clone <repo-url>
   cd photography-portfolio
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Setup environment variables by copying `.env.example` to `.env` and filling in the values.

4. Push Prisma schema:
   ```bash
   npx prisma db push
   npx prisma generate
   ```

5. Run development server:
   ```bash
   npm run dev
   ```

## Environment Variables

| Variable | Description |
|----------|-------------|
| `DATABASE_URL` | Connection pool URL (pgbouncer) for Prisma queries. |
| `DIRECT_URL` | Direct DB connection URL for `prisma db push`. |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL. |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Public anon key for Supabase Auth/Storage. |
| `SUPABASE_SERVICE_ROLE_KEY` | Secret admin key for server actions to bypass RLS. |

## Deployment (Vercel)

1. Connect your GitHub repository to Vercel.
2. In the project settings, configure the environment variables as above.
3. The Build Command should be: `prisma generate && next build`.
4. Deploy!
