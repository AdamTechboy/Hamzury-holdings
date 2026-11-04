# Architecture

The site is plain HTML, CSS and JavaScript with no framework. Scripts are classic `<script>` tags (not ES modules) that share global variables, so **load order matters**.

## index.html: client journey and staff workspace

Scripts load in this order. Each later script **replaces** functions defined by earlier ones (by reassigning the global, for example `render = function () { ... }`) and usually falls back to the previous version for routes it doesn't handle.

| Order | File              | Role                                                                 | Replaces                                                                                                                       |
| ----- | ----------------- | -------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| 1     | `seed.js`         | Sample offer catalogue (`window.offerSeed`)                          | none                                                                                                                           |
| 2     | `app.js`          | Core: `root`, `E()` HTML escaper, ventures `V`, form templates, `db` (localStorage `hh-v3`), file store (IndexedDB `hh-demo-files`), hash router `render()` | none |
| 3     | `journey.js`      | Public pages: home, expertise, venture pages, discovery              | `render home discoveryView clientView nextAnswer publicNav footer`                                                             |
| 4     | `ux.js`           | Staff workspace shell, venture scope, CRM, people, chat assistant    | `render workspace overview crm leadTable leadView newLead queueView catalogue access peopleView ventureView home discoveryView publicNav footer` |
| 5     | `client-flow.js`  | Client stages (reference, proposal, roadmap, payment, delivery)      | `render clientView access guidedNext downloadJourney`                                                                          |
| 6     | `conversation.js` | One-question-at-a-time discovery conversation                       | `clientView discoveryView simulateActivation`                                                                                  |
| 7     | `system.js`       | Operating model: staff, finance, tasks, offers, system status        | `render crm leadView overview catalogue clientView serviceEditor saveService publishRoadmapFor`                                |
| 8     | `cx.js`           | Navigation groups, client overview, requirements review, feedback    | `render workspace overview clientView clientOverview queueView referenceCard flowItem orderProgress proposalPreviewBody reviewRequirement feedback` |
| 9     | `staff-simple.js` | Simplified staff task view and help                                  | `render workspace taskView`                                                                                                    |

The **last** definition of a function is the one that runs. To change how a view behaves, search for its *latest* definition first, e.g. `clientView` is finally defined in `cx.js`.

Routing is hash-based: `#home`, `#client/<id>/<stage>`, `#crm`, `#task`, etc. `render()` reads `location.hash` and writes HTML into `#root`.

## operations.html: operating centre

| Order | File            | Role                                                                 |
| ----- | --------------- | -------------------------------------------------------------------- |
| 1     | `operations.js` | Base app: `$()` selector, `esc()` escaper, ventures, pages, `render`  |
| 2     | `experience.js` | Package catalogue, tiers, basket and proposals; replaces `render nav products client` |

Uses localStorage keys `hh-shelf-v2`, `hh-basket-v2`, `hh-proposal-v2`.

## Data

Everything is stored in the visitor's browser:

- `hh-v3`: main database (leads, forms, staff, ventures, ...)
- `hh-form-*`, `hh-conversation-*`: in-progress answers
- `hh-view-scope`, `hh-staff-step`, `hh-staff-draft`: staff UI state
- IndexedDB `hh-demo-files`: uploaded files

Clearing site data in the browser resets the app to its sample data.

## Conventions

- Always pass user-entered text through `E()` (index.html) or `esc()` (operations.html) before putting it into HTML.
- Venture logos are loaded as `assets/<venture>.png` (`hamzury hub` uses `hub.png`).

## Suggested next steps

1. Merge each "replaces" chain into a single definition per function, then delete the superseded versions.
2. Convert the scripts to ES modules so dependencies are explicit.
3. Add a backend for shared data, accounts and permissions.
