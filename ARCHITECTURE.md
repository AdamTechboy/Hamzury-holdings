# Architecture

Two parts live in this repo:

1. **The website** (`src/`): Next.js App Router, React and TypeScript. Public pages, plus the `/start` enquiry form backed by Supabase.
2. **The legacy app** (`public/`): the original plain-JavaScript client journey and staff workspace, served as static files at `/app.html` and `/operations.html`. It is being replaced phase by phase.

## Website (src/)

| Path                         | What it is                                                                      |
| ---------------------------- | ------------------------------------------------------------------------------- |
| `app/layout.tsx`             | Shell for every page: header, footer, phone sticky call-to-action, scroll fades |
| `app/page.tsx`               | Homepage                                                                        |
| `app/services/page.tsx`      | All six ventures                                                                |
| `app/services/[id]/page.tsx` | One venture with its packages; pre-rendered for each id in `lib/site.ts`        |
| `app/about`, `app/contact`   | About and contact pages                                                         |
| `app/start/StartForm.tsx`    | Four-step enquiry form (client component)                                       |
| `app/start/actions.ts`       | Server action: validate, save, notify, return a reference                       |
| `components/Sections.tsx`    | Shared sections: tiles, steps, FAQ, call-to-action, example roadmap cards       |
| `components/Header.tsx`      | Navigation and mobile menu                                                      |
| `components/Motion.tsx`      | `RevealObserver` (fade-in on scroll) and `StickyCta`                            |
| `lib/site.ts`                | **All site copy**: ventures, steps, FAQs, hours, links                          |
| `lib/offers.ts`              | Packages per venture (copied from `public/scripts/seed.js`)                     |
| `lib/enquiry.ts`             | Enquiry fields, options and validation (shared by form and server)              |
| `lib/store.ts`               | Saves enquiries to Supabase (or `.data/` in local dev) and emails via Resend    |
| `app/globals.css`            | The design system: colour tokens, type scale, components                        |

**Styling.** One global stylesheet with CSS variables in `:root` (colours, radius, max width). Class names are shared with the components (`.btn`, `.tile`, `.section.alt`, ...). Add `.reveal` to any element to fade it in on scroll.

**Enquiries.** `StartForm` calls the `submitEnquiry` server action directly (no API route). The action checks a honeypot field, validates with `validateEnquiry`, saves with `saveEnquiry` and calls `notifyTeam`. The Supabase service-role key is only read on the server. The `enquiries` table has row level security on with no policies, so browsers can't read it. Schema: `supabase/migrations/0001_enquiries.sql`.

**Links into the legacy app** are in `links` in `lib/site.ts`: `track` → `/app.html#access`, `workspace` → `/app.html#workspace`.

## Legacy app (public/)

`scripts/site-bridge.js` loads first in `app.html` and redirects the old public routes to the website: `#home` → `/`, `#about` → `/about`, `#venture-page/<v>` → `/services/<id>`, and new discovery forms (`#form/<x>/new`) → `/start`. Everything else (`#access`, `#client/...`, `#workspace`, staff views) runs as before.

### app.html script chain

Scripts are classic `<script>` tags sharing globals, so **load order matters**. Each later script **replaces** functions defined by earlier ones (by reassigning the global, for example `render = function () { ... }`) and usually falls back to the previous version for routes it doesn't handle.

| Order | File              | Role                                                                                                                                                        | Replaces                                                                                                                                            |
| ----- | ----------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1     | `seed.js`         | Sample offer catalogue (`window.offerSeed`)                                                                                                                 | none                                                                                                                                                |
| 2     | `app.js`          | Core: `root`, `E()` HTML escaper, ventures `V`, form templates, `db` (localStorage `hh-v3`), file store (IndexedDB `hh-demo-files`), hash router `render()` | none                                                                                                                                                |
| 3     | `journey.js`      | Public pages: home, expertise, venture pages, discovery                                                                                                     | `render home discoveryView clientView nextAnswer publicNav footer`                                                                                  |
| 4     | `ux.js`           | Staff workspace shell, venture scope, CRM, people, chat assistant                                                                                           | `render workspace overview crm leadTable leadView newLead queueView catalogue access peopleView ventureView home discoveryView publicNav footer`    |
| 5     | `client-flow.js`  | Client stages (reference, proposal, roadmap, payment, delivery)                                                                                             | `render clientView access guidedNext downloadJourney`                                                                                               |
| 6     | `conversation.js` | One-question-at-a-time discovery conversation                                                                                                               | `clientView discoveryView simulateActivation`                                                                                                       |
| 7     | `system.js`       | Operating model: staff, finance, tasks, offers, system status                                                                                               | `render crm leadView overview catalogue clientView serviceEditor saveService publishRoadmapFor`                                                     |
| 8     | `cx.js`           | Navigation groups, client overview, requirements review, feedback                                                                                           | `render workspace overview clientView clientOverview queueView referenceCard flowItem orderProgress proposalPreviewBody reviewRequirement feedback` |
| 9     | `staff-simple.js` | Simplified staff task view and help                                                                                                                         | `render workspace taskView`                                                                                                                         |

The **last** definition of a function is the one that runs. To change how a view behaves, search for its _latest_ definition first, e.g. `clientView` is finally defined in `cx.js`.

Routing is hash-based: `#client/<id>/<stage>`, `#crm`, `#task`, etc. `render()` reads `location.hash` and writes HTML into `#root`.

### operations.html

| Order | File            | Role                                                                                  |
| ----- | --------------- | ------------------------------------------------------------------------------------- |
| 1     | `operations.js` | Base app: `$()` selector, `esc()` escaper, ventures, pages, `render`                  |
| 2     | `experience.js` | Package catalogue, tiers, basket and proposals; replaces `render nav products client` |

### Legacy data

Stored only in the visitor's browser: localStorage `hh-v3` (leads, forms, staff, ventures), `hh-form-*` and `hh-conversation-*` (in-progress answers), `hh-view-scope`, `hh-staff-step`, `hh-staff-draft`, `hh-shelf-v2`, `hh-basket-v2`, `hh-proposal-v2`, and IndexedDB `hh-demo-files` (uploads).

Always pass user-entered text through `E()` (app.html) or `esc()` (operations.html) before putting it into HTML.

## Roadmap

1. **Done:** website on Next.js; enquiries saved to Supabase.
2. **Client portal:** real client logins (Supabase Auth) and project tracking from the database, replacing `#access` and `#client/...`.
3. **Staff workspace:** move views into Next.js one at a time (start with an enquiries inbox), then retire `public/app.html`.
