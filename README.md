# Discover China

A map-first travel companion that turns Chinese local knowledge into a practical,
English-language trip planner. Answer a few questions and it builds a high-level
itinerary — which cities, how many nights, how to travel between them — plus a
city guide for each stop and a "Before you go" setup checklist (payments, apps,
connectivity).

Built with **Next.js (App Router) + React**, deployed on Vercel. The map/planner
itself is a self-contained client-side "island" using
[MapLibre GL](https://maplibre.org/) and [deck.gl](https://deck.gl/).

## Run locally

```
npm install
npm run dev      # http://localhost:3000
```

`npm run build && npm start` runs the production build.

## Project structure

| Path | What it holds |
|------|---------------|
| `app/layout.tsx` | `<head>`, fonts, global CSS, Vercel Analytics |
| `app/page.tsx` → `app/LegacyApp.tsx` | the map/planner island (client component) |
| `app/legacy-markup.html` | the planner's markup, injected verbatim |
| `app/globals.css` | all styling (light + dark themes) |
| `app/api/contact/route.ts` | contact/report → Resend email (server route) |
| `public/content.js` | **all editable content** — city data, routes, Before-You-Go modules, app list |
| `public/app.js` | the planner logic (map, wizard, tabs, rendering) — vanilla JS |
| `public/img/`, `public/logo/` | images and logos |

To change any text or data on the site, edit **`public/content.js`** — its top has
an editing guide. The planner's vanilla logic lives in `public/app.js`; both are
loaded in order (maplibre → deck.gl → content → app) by `app/LegacyApp.tsx`.

New, dynamic features (database, auth, saved trips) should be built as proper
Next.js routes/components rather than added to the island.

## Deploy (Vercel)

Pushed to GitHub `wkwunju/discover-china`; Vercel auto-builds on push
(`framework: nextjs` is pinned in `vercel.json`). Live at
[discover-china.travel](https://discover-china.travel).

### Contact / report email

`app/api/contact/route.ts` emails submissions via [Resend](https://resend.com).
Set one environment variable in the Vercel project settings:

- `RESEND_API_KEY` — your Resend API key.

It sends from the verified `hello@moreach.ai` to `wkwunju@gmail.com`, reply-to the
visitor. If the key is missing the form falls back to opening the visitor's email app.

## Note

Map data © OpenStreetMap contributors, basemap © CARTO. City photos via Wikimedia
Commons with per-image licenses recorded in `public/content.js`. Demo basemap —
official boundary review required before any public release.
