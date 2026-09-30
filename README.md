# Patrizio Acquadro — Personal Website

Static portfolio at [patrizioacquadro.github.io](https://patrizioacquadro.github.io/), built with Vite and plain HTML/CSS/JavaScript. GitHub Pages serves the verified build. No backend, third-party scripts, trackers or external font requests.

## Development

Use Node **24 LTS**, matching `.nvmrc` and CI. Run all npm commands in the same environment and checkout.

```sh
nvm use
npm ci
npm run dev
```

`npm run build` creates `dist/`. `npm run preview` serves it locally. For a cross-browser HTTPS preview, use `node scripts/preview-test.mjs` and open `https://127.0.0.1:4173`; its temporary self-signed certificate is for local testing only. OpenSSL must be available.

## Content and assets

- Edit `src/content/siteData.js` and update `lastUpdated` with the editorial date (`YYYY-MM-DD`) when changing published content. `siteUrl` is the canonical origin.
- `src/content/renderSite.js` escapes and renders content into the HTML through Vite's `transformIndexHtml`, in development and production. Content changes reload the development page. JavaScript handles interactions; all portfolio content and navigation work without it.
- The homepage canonical, social metadata, sitemap and robots file share the same origin and deployment base path. `/cv/` remains a `noindex` redirect to Home.
- Replace `public/cv/AcquadroPatrizioCV.pdf` to publish a new CV. The download version is derived from its SHA-256 hash. The editable Word source is in `assets/source/`.
- Original portraits and logos stay in `assets/source/`, outside the published assets. Responsive WebP portraits and resized PNG icons are committed under `public/`. To regenerate them, run `python3 scripts/optimize-images.py` with Pillow available; Python/Pillow are optional maintenance tools, not build dependencies.
- `public/og/og-cover.png` is the social preview image. Phone exposure is disabled by default and controlled by `privacyExposure.showPhone`.

## Validation

```sh
npm run test:unit                 # fast renderer/content checks
npx playwright install chromium # once per browser/runtime update
npm run check                    # unit tests, build, security, budgets, Chromium
npm audit --audit-level=high

npx playwright install firefox webkit
npm run test:e2e                  # all three browsers against the existing dist/
```

Playwright is the only additional test dependency. Browser tests use an ephemeral HTTPS server so the production CSP remains intact. They cover content without JavaScript, navigation, themes, dialog focus and dismissal, copy success/failure, image fallback, redirects, responsive layouts, text enlargement, reduced motion and text contrast. WebKit keyboard tests use Option+Tab for links, matching Safari's default macOS keyboard preference.

`npm run verify:build` also checks metadata, CV version, local asset paths, duplicate content and budgets: portrait ≤200 KB, combined icons ≤60 KB, initial JavaScript <8 KB gzip. Failure screenshots/traces are under `test-results/`; local review artifacts are under `.artifacts/` (both ignored).

## CI and publication

`.github/workflows/validate.yml` is shared by pull-request/security checks and the Pages build. It uses Node 24, `npm ci`, Chromium tests, the security baseline, artifact budgets and a high-severity dependency audit. The deployment waits for all checks and uploads the **same `dist/` that passed validation**, without rebuilding.

Publication is triggered by a push to `main` or a manual deployment workflow run. Workflows pin actions to full commit SHAs and use limited job permissions. Dependabot is configured for npm and Actions updates. Repository rules and required status checks must be managed separately on GitHub; workflow files do not prove those settings are enabled.

GitHub Pages limits custom response headers. The strict meta CSP and runtime frame guard provide the controls available to this static site. Public profile/contact/CV data remain public. Real visitor performance and GitHub protections require live verification after an authorized publication.

See [the validation record](docs/VALIDATION.md) for this refinement's evidence, visual review and archive details.
