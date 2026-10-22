# Patrizio Acquadro — Editorial alternative

A self-contained, local-only alternative to the original portfolio. Warm paper, graphite type, terracotta details, six static pages, and the complete existing record. Nothing in this folder is part of the original site's build or deployment.

## Run locally

Use **Node 24**, matching `.nvmrc`.

```sh
cd alternative
nvm use
npm ci
npm run dev -- --port 5174
```

Open [the alternative](http://127.0.0.1:5174/). To compare, run `npm run dev -- --host 127.0.0.1 --port 5173` from the parent folder and open [the original](http://127.0.0.1:5173/). The two servers are independent.

```sh
npm run build          # alternative/dist/ only
npm run preview        # http://127.0.0.1:4174/
npm run test:unit
npx playwright install chromium firefox webkit  # once, if browsers are missing
npm run check          # renderer, build, asset/CSP checks, all three browsers
```

End-to-end tests use port 4175 and a temporary local HTTPS certificate, with the same production CSP. A file:// URL is not supported: serve the site with Vite. The built output can be served independently at a web server's root, with directory index support.

On macOS the test configuration gives Firefox a temporary application descriptor with a distinct test name. This avoids the host's Firefox profile redirection issue; it does not change the installed browser or any personal profile.

## Pages and editing

The homepage introduces the person and links directly to records on `/projects/`, `/experience/`, `/ventures/`, `/activities/`, and `/updates/`. Every page is rendered into HTML before JavaScript runs. Navigation, content, contacts, and CV downloads remain available without JavaScript.

- `src/content/siteData.js` is an unchanged snapshot of the original portfolio's source data at commit `768a196`. It includes all 15 projects, 5 research experiences, 3 ventures, 8 activities, and 9 updates. It does not synchronize automatically with the original.
- `src/content/editorial.js` holds stable anchors, illustrations for all 15 projects, and homepage selections; `render.js` holds shared templates and presentation. When adding source records, extend the ID list, illustration metadata, and the category counts.
- `src/styles.css` defines the editorial design; `src/main.js` only enhances the mobile menu, email copying, and portrait fallback.
- `public/` contains local copies of the portraits, icons, and current CV, plus original SVG concept illustrations. Illustrations explain the subject; they are not screenshots, measured results, or technical specifications. Fonts use the local Helvetica/Arial and Iowan/Palatino/Georgia families; there are no remote font requests.

Source facts, dates, metrics, links, and attribution are preserved in their dedicated pages. The CV is copied byte for byte and its download URL is versioned using SHA-256. Phone exposure remains disabled. Visible metrics describe the sourced venture records rather than live analytics.

This review edition intentionally has `noindex, nofollow` on every page. It has no hosting registration, analytics, contact backend, or deployment workflow. To choose an eventual hybrid, transfer selected styles or sections deliberately into the original; this folder stays independent until that decision.

See [VALIDATION.md](VALIDATION.md) for the completed checks and the macOS Firefox environment note.
