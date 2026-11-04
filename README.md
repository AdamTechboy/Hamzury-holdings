# Hamzury Holding

Corporate website (Next.js) with a real enquiry form, plus the legacy client journey and staff workspace.

## Getting started

Requires [Node.js](https://nodejs.org) 20 or newer.

```sh
npm install
npm run dev
```

Open http://localhost:3000. Pages reload as you edit.

| Command             | What it does                                            |
| ------------------- | ------------------------------------------------------- |
| `npm run dev`       | Development server with hot reload                      |
| `npm run build`     | Production build                                        |
| `npm start`         | Runs the production build locally                       |
| `npm run typecheck` | Checks TypeScript types                                 |
| `npm run check`     | Checks the legacy app's scripts parse and links resolve |
| `npm run format`    | Formats the code with Prettier                          |

## Project layout

```
src/
  app/                  pages (Next.js App Router)
    page.tsx            homepage
    services/           all services, and services/[id] for each venture
    about/  contact/
    start/              enquiry form + server action that saves it
  components/           header, footer, shared sections, scroll animations
  lib/
    site.ts             site copy: ventures, steps, FAQs, hours, links  <- edit text here
    offers.ts           service packages per venture
    enquiry.ts          enquiry fields and validation
    store.ts            saves enquiries (Supabase) and emails the team (Resend)
public/                 legacy app, served as-is: /app.html, /operations.html, assets
supabase/migrations/    database schema
```

The legacy app (`/app.html`) still handles **Track my project** and the **staff workspace**. Its old public pages and its demo discovery form redirect to the new site (`public/scripts/site-bridge.js`). See [ARCHITECTURE.md](ARCHITECTURE.md).

## Enquiries

The **Get started** form (`/start`) sends answers to a server action that validates them, stores them and optionally emails the team. Each client gets a reference like `HZ-7K3M9Q`.

- **Without Supabase (local development):** enquiries are appended to `.data/enquiries.jsonl` so you can test.
- **With Supabase:** enquiries go into the `enquiries` table. View and update them in the Supabase dashboard (Table Editor).
- **In production without Supabase:** the form refuses and points visitors to the contact desk, so no enquiry is silently lost.

### Connecting Supabase

1. Create a free project at [supabase.com](https://supabase.com).
2. In the dashboard open **SQL Editor**, paste [supabase/migrations/0001_enquiries.sql](supabase/migrations/0001_enquiries.sql) and run it.
3. In **Project settings → API**, copy the project URL and the `service_role` key.
4. Copy `.env.example` to `.env.local` and fill in `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY`. Restart `npm run dev`.
5. In Netlify, add the same variables under **Site configuration → Environment variables**.

The `service_role` key is secret: keep it only in `.env.local` and Netlify, never in code or chat.

### Email alerts (optional)

Create a [Resend](https://resend.com) account, verify your domain, then set `RESEND_API_KEY`, `ENQUIRY_NOTIFY_EMAIL` and `ENQUIRY_FROM_EMAIL`.

## Deploying

Netlify detects Next.js automatically: it runs `npm run build` and serves the result (see `netlify.toml`). Set the environment variables above first.

## Legacy app limitations

Records in `/app.html` stay in the visitor's browser (localStorage and IndexedDB). Role selection is a preview, not access control. Use sample data only. Moving the client portal and staff workspace onto Supabase is the next phase.
