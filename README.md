# Patrizio Acquadro — Portfolio

The editorial portfolio is now the primary implementation for [patrizioacquadro.github.io](https://patrizioacquadro.github.io/). It replaces the previous implementation; there is one application in the repository root and no `alternative/` app. Vite, HTML, CSS and JavaScript, with no runtime libraries, trackers, remote fonts or required third-party asset requests.

## Run locally

Use **Node 24**, matching `.nvmrc` and CI:

```sh
nvm use
npm ci
npm run dev
```

Open [the portfolio](http://127.0.0.1:5174/). `npm run build` produces `dist/`; `npm run preview` serves the production build on port 4174. All commands run from the repository root.

## Pages and content

| Route | Content |
| --- | --- |
| `/` | Introduction, selected work, experience, ventures, activities, updates and contact |
| `/projects/` | Five robotics projects, followed by ten AI and software projects |
| `/experience/` | Five research experiences and four education records |
| `/ventures/` | BiellaInFesta, Adunet and CubeWar |
| `/activities/` | Eight activities, talks and recognitions |
| `/updates/` | Nine dated updates, newest first, with descriptions only |

- `src/content/siteData.js` contains source facts, dates, metrics and links. Update `lastUpdated` when editing published content. `siteUrl` is the production origin; deployment is at its root, as configured for this personal GitHub Pages repository.
- `src/content/editorial.js` contains stable record IDs, display copy, CV-derived education and illustration descriptions. Distinguish current contributions from long-term research directions; see [research sources](docs/ROBOTICS_SOURCES.md).
- `src/content/render.js` generates meaningful content, navigation, contacts and versioned CV downloads directly in HTML. JavaScript enhances the accessible mobile menu, email copying and image fallback. Navigation and content also work without JavaScript.
- `src/styles.css` defines the light editorial theme and responsive layouts. `public/art/` contains concept illustrations, not experimental evidence or measured specifications.
- `public/cv/AcquadroPatrizioCV.pdf` is the current CV. Its download query is generated from SHA-256. The Word document in `assets/source/` is an older source, not the current PDF.
- Responsive portraits, the p/a identity and icons are local. The share preview is `public/og/og-cover.png`, generated from `assets/source/og-cover.svg`.
- Canonicals and social metadata identify all six public pages. Vite generates `robots.txt` and `sitemap.xml`. `/cv/` remains a noindex redirect with a manual home/CV fallback; old homepage section links forward to the corresponding new pages when JavaScript is enabled.

## Validate

```sh
npm run test:unit
npx playwright install chromium firefox webkit
npm run check
npm audit --audit-level=high
```

`check` runs unit tests, the production build, the security baseline, asset and link verification, and Playwright in Chromium, Firefox and WebKit. It checks direct routes, complete content, local assets, metadata, legacy routes, no-JavaScript access, mobile navigation, keyboard focus, fragment positioning, CV access, copy fallback, contrast, 320 px layouts and 200% text enlargement. The initial JavaScript budget remains below 8 KB gzip; the largest portrait stays below 200 KB.

Browser tests use an ephemeral HTTPS server on port 4175 with a temporary certificate created by OpenSSL. On macOS, the Firefox helper isolates the test application descriptor to avoid profile redirection; it does not modify installed browsers or personal profiles. Screenshots/traces are in `test-results/`; local visual evidence is in `.artifacts/`. Both are ignored.

## Publication and history

The existing Pages workflow validates the root application with Node 24 and all three browsers, audits dependencies and deploys the exact validated `dist/`. It runs on a push to `main` or manual dispatch. This promotion is local; no push or publication has been performed.

The previous implementation remains recoverable in Git at `768a196`. The final isolated editorial edition is preserved at `d81b01f`. Inspect those commits without resetting the current checkout. Historical reports remain under `docs/`; current promotion evidence is in [PROMOTION.md](docs/PROMOTION.md).
