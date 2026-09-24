# LeetTrack

> **Progress, with momentum.** A focused dashboard for tracking your LeetCode journey.

![LeetTrack Dashboard](./public/preview.png)

## What is LeetTrack?

LeetTrack is a personal LeetCode progress tracker built as a clean, opinionated dashboard. It gives you one place to:

- **Track every problem** you've solved across Easy / Medium / Hard
- **Follow a curated list** of 300–400 problems covering all major topics (Arrays, Trees, Graphs, DP, and more)
- **See your streaks and momentum** — daily solving streak, weekly rhythm chart, difficulty split
- **Log in with your own account** — username + password auth, linked to your LeetCode username
- **Get next-step recommendations** — a small intentional queue based on your progress and pace

## Features

| Feature | Status |
|---|---|
| Dashboard — streak, metrics, activity chart | ✅ |
| Difficulty breakdown donut chart | ✅ |
| Curated problem list (300–400 problems) | ✅ |
| Mark problems as solved (per-session) | ✅ |
| Sign up / log in (username + password) | ✅ |
| LeetCode profile linking | ✅ |
| Session management (secure HttpOnly cookie) | ✅ |
| Responsive layout (mobile-first) | ✅ |

## Tech Stack

- **Framework** — [Next.js 16](https://nextjs.org) (App Router, Server Actions)
- **UI** — React 19, Tailwind CSS v4, [Lucide React](https://lucide.dev) icons
- **Fonts** — DM Sans + Space Grotesk (via `next/font`)
- **Auth** — Custom server-side auth with bcrypt + JWT sessions via `jose`
- **Storage** — Supabase Postgres in production, JSON fallback for local development

## Getting Started

### Prerequisites

- Node.js 18+
- npm / yarn / pnpm

### Installation

```bash
git clone https://github.com/himan243/LeetTrack.git
cd LeetTrack
npm install
```

### Environment Variables

Create a `.env.local` file in the project root for local development:

```bash
# Generate with: openssl rand -base64 32
SESSION_SECRET=your_secret_key_here
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

### Supabase setup

1. Create a free project at [supabase.com](https://supabase.com).
2. Open the Supabase SQL Editor and run [`supabase/schema.sql`](./supabase/schema.sql).
3. Copy the project URL and service role key from Project Settings → API.
4. Add `SESSION_SECRET`, `SUPABASE_URL`, and `SUPABASE_SERVICE_ROLE_KEY` to Vercel under Project Settings → Environment Variables.
5. Redeploy the project.

The service role key is server-only. Never expose it through a `NEXT_PUBLIC_` variable or client component.

### Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
src/
└── app/
    ├── layout.tsx          # Root layout (fonts, metadata)
    ├── page.tsx            # Dashboard (protected)
    ├── login/
    │   └── page.tsx        # Login page
    ├── signup/
    │   └── page.tsx        # Sign-up page
    ├── problems/
    │   └── page.tsx        # Full problem list (300–400 problems)
    ├── actions/
    │   └── auth.ts         # Server Actions — login, signup, logout
    └── lib/
        ├── session.ts      # JWT encrypt/decrypt + cookie management
        ├── database.ts     # Supabase server client
        ├── users.ts        # Supabase user repository with local fallback
        └── problems.ts     # Curated problem dataset
```

## Contributing

1. Fork the repo and create a branch from `main`.
2. Make your changes and open a Pull Request.
3. Reference any relevant GitHub issue in the PR description.

## License

MIT
