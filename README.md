# Discover China

A map-first travel companion that turns Chinese local knowledge into a practical,
English-language trip planner. Answer a few questions and it builds a high-level
itinerary — which cities, how many nights, how to travel between them — plus a
city guide for each stop and a "Before you go" setup checklist (payments, apps,
connectivity).

No build step, no framework — plain HTML / CSS / vanilla JS with
[MapLibre GL](https://maplibre.org/) and [deck.gl](https://deck.gl/).

## Run locally

```
open index.html
```

(or serve the folder with any static server, e.g. `python3 -m http.server`).

## Project structure

| File | What it holds |
|------|---------------|
| `index.html` | Page structure & markup |
| `styles.css` | All styling (light + dark themes) |
| `app.js`     | **Structure / logic only** — the planner, map, tabs, rendering |
| `content.js` | **All editable content** — city data, curated routes, the Before-You-Go modules and app list. Loaded before `app.js`. |
| `img/`       | Logos and images |

To change any text or data on the site, edit **`content.js`** — you never need to
touch `app.js`. The top of `content.js` has an editing guide.

## Deploy (Vercel)

This is a static site, so deployment is zero-config:

1. Push this repo to GitHub (done).
2. On [vercel.com](https://vercel.com) → **Add New → Project** → import this repo.
3. Framework preset: **Other**. No build command, no output dir — Vercel serves
   the root, with `index.html` at `/`.
4. Deploy. Every push to the default branch redeploys automatically.

### Contact / report form

`api/contact.js` is a Vercel serverless function that emails contact-form
submissions to the inbox via [Resend](https://resend.com) (same setup as the
moreach project). To enable it, add one environment variable in the Vercel
project settings:

- `RESEND_API_KEY` — your Resend API key (the same one moreach uses).

It sends from the already-verified `hello@moreach.ai` to `wkwunju@gmail.com`,
with reply-to set to the visitor. If the key is missing or the site is opened
as a local file, the form falls back to opening the visitor's email app.

## Note

Map data © OpenStreetMap contributors, basemap © CARTO. City photos via Wikimedia
Commons with per-image licenses recorded in `content.js`. Demo basemap — official
boundary review required before any public release.
