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
- `src/content/editorial.js` holds stable anchors, illustrations for all 15 projects, illustrated identities for the three ventures, homepage selections, and the five research narratives in `roboticsProfiles`; `render.js` holds shared templates and presentation. When adding source records, extend the ID list, illustration metadata, and the category counts.
- `src/styles.css` defines the editorial design; `src/main.js` only enhances the mobile menu, email copying, and portrait fallback.
- `public/` contains local copies of the portraits, icons, and current CV, plus original SVG concept illustrations. Illustrations explain the subject; they are not screenshots, measured results, or technical specifications. Fonts use the local Helvetica/Arial and Iowan/Palatino/Georgia families; there are no remote font requests.
- `public/brand/pa-monogram.svg` is the custom geometric p/a mark: outlined letterforms and a separate terracotta slash, with no font dependency. `pa-monogram.png` is a transparent 600 × 360 export. The matching favicon is available as SVG and 32 × 32 PNG; the touch icon is 180 × 180 PNG. PNGs are rendered from the SVG masters and add no build dependency.

The Projects page gives robotics the primary editorial treatment: a direct project index, larger illustrations, accessible project headings, current contributions and explicitly labeled long-term directions. The AI/software collection keeps all ten projects in a more compact illustrated layout. Robotics copy is reconciled with repository plans and current status, including the mentorship attribution for Ego2Grip; see [ROBOTICS_SOURCES.md](ROBOTICS_SOURCES.md) for the reviewed documents and decisions. Future research goals are not represented as completed experimental results.

The original fact snapshot is retained in full; dates, links, technology tags and attribution remain available in their dedicated pages. The CV is copied byte for byte and its download URL is versioned using SHA-256. Phone exposure remains disabled. Visible metrics describe the sourced venture records rather than live analytics.

This review edition intentionally has `noindex, nofollow` on every page. It has no hosting registration, analytics, contact backend, or deployment workflow. To choose an eventual hybrid, transfer selected styles or sections deliberately into the original; this folder stays independent until that decision.

See [VALIDATION.md](VALIDATION.md) for the completed checks and the macOS Firefox environment note.
