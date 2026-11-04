# Deployment & Migration Guide

## Dual-Stage Deployment
The repository maintains side-by-side support:
- `dist/`: Existing live static website deployed via Netlify publish settings.
- `src/`: Next.js App Router full-stack migration.

## Next.js & Netlify Configuration
When switching production to the full Next.js application:
1. Update `netlify.toml` build command:
   ```toml
   [build]
     command = "npm run build"
     publish = ".next"

   [[plugins]]
     package = "@netlify/plugin-nextjs"
   ```
2. Configure environment variables in Netlify UI:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
   - `SUPABASE_URL`
   - `SUPABASE_SECRET_KEY`

## Supabase CLI Workflow
1. Apply migrations to staging/production:
   ```bash
   supabase link --project-ref <project-id>
   supabase db push
   ```
2. Verify policies and seed tables:
   ```bash
   supabase db reset # (Local only)
   ```

