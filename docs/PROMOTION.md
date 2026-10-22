# Primary portfolio promotion — 22 October 2026

The approved editorial edition replaces the previous site in the repository root. `alternative/`, the old renderer/styles/theme code and obsolete tests/assets are removed. Original content, the published CV and the editorial illustrations are retained. The previous implementation is recoverable at `768a196`; the final isolated alternative is preserved at `d81b01f`. Work stays on `main`, the only local branch. No push or publication is part of this change.

## Requested refinements

- Education institution headings use an explicit two-line composition, including Milano-Bicocca and Purdue. Full institution names remain available to assistive technology.
- The Adunet poster uses separate, spaced line boxes. The background behind “A way around” no longer overlaps “A festival”.
- Isaac Audio Sensors’ long-term direction is shortened without changing its future-validation meaning. It occupies two lines in the reviewed 1280 px layout; narrow screens and enlarged text can reflow naturally.
- All nine Updates entries contain descriptions and dates only. The three homepage previews still link to the corresponding update.

## Primary-site integration

All six pages are indexable, with route-specific canonicals and Open Graph metadata. A new local 1200 × 630 share preview matches the p/a identity. Robots and sitemap are generated from the same production origin and page registry. The legacy `/cv/` route redirects to Home with no-JavaScript/manual access, and old homepage section fragments route to their new pages with JavaScript. CV download URLs remain unchanged and content-hash versioned.

The existing Pages workflow validates the root app and uploads the same checked build. It now installs and tests Chromium, Firefox and WebKit. Strict production CSP and local-only assets remain enforced. Build verification distinguishes canonical metadata from fetched assets while rejecting external scripts, styles and images. Setup, routes and publication behavior are documented in the root README.

## Validation

- Node **v24.19.0**, reproducible `npm ci --offline`: passed.
- `npm run check`: **11 unit tests and 36 browser tests passed** across Chromium, Firefox and WebKit; production build, security baseline, routes, anchors, local assets and metadata passed.
- Initial JavaScript: **1,272 B gzip**, under the 8 KB budget. Portrait budget below 200 KB.
- `npm audit --audit-level=high`: **0 vulnerabilities** reported.
- Deep comparison with `768a196` confirms every original source fact is unchanged; only `lastUpdated` advances to 2026-10-22.
- CV compared byte for byte with the original Git artifact and production copy. SHA-256: `3d665a4d1bdeac09177906d102b6dd092269ff83e60086af2a1e35db34b58b26`.
- Browser tests cover all six direct routes, complete collections, image loading, no required external requests, no runtime errors, no-JavaScript content/CV access, legacy routing, keyboard/focus, email copy success/fallback, portrait fallback, reduced motion, text contrast, responsive widths including 320 px and 200% text enlargement.
- Native in-app browser inspection confirms the two-line education layout, Adunet spacing, two-line Isaac Audio direction and link-free Updates entries. Local screenshots: [education](../.artifacts/promotion-education.png), [Adunet](../.artifacts/promotion-adunet.png), [Isaac Audio](../.artifacts/promotion-isaac.png), [Updates](../.artifacts/promotion-updates.png). Evidence is ignored by Git.

The final Vite adjustment applies the existing development CSP relaxation to the legacy CV template too; it does not change the validated production output. Production checks were rerun afterward.

## Limits and maintenance

Validation is local. The GitHub workflow and public deployment have not run for this change. No physical device, VoiceOver session or real-user study was performed. Research experiments were not rerun. After an explicitly authorized publication, verify GitHub CI/Pages and the live HTML/CV/downloads before declaring release complete.

There is now one npm project: all development and validation commands run from the root. Keep the isolated macOS Firefox test-profile helper, which avoids the profile-redirection behavior documented in the historical review without changing installed Firefox or user profiles.
