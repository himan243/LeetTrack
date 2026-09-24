create table if not exists public.users (
  id uuid primary key,
  username text not null unique,
  password_hash text not null,
  leetcode_username text not null default '',
  leetcode_stats jsonb,
  last_synced_at timestamptz,
  created_at timestamptz not null default now()
);

alter table public.users enable row level security;

-- The app uses the server-only service role key for these queries.
-- No client-side policy is needed for the current custom JWT session flow.
