# Local validation — 22 October 2026

Implemented on `main`, from the original portfolio at `768a196`. All source additions are confined to `alternative/`; the original site's tracked files and deployment configuration are unchanged.

## Results

- Alternative `npm run check`, using Node 24.19.0: **4 renderer tests and 27 browser tests passed** (9 each in Chromium, Firefox, and WebKit), plus production build and asset/CSP checks.
- Original site's `npm run check`, using Node 24.19.0: **5 unit tests and 17 Chromium tests passed**, plus production build, security baseline and asset budgets.
- Compared the copied `siteData` directly with the original using `assert.deepEqual`: all 15 projects, 5 research experiences, 3 ventures, 8 activities, 9 updates, contacts, and privacy settings match exactly.
- Compared original, copied, and built CV bytes. SHA-256: `3d665a4d1bdeac09177906d102b6dd092269ff83e60086af2a1e35db34b58b26`.
- Checked all six built routes, local asset paths, cross-page anchors, noindex metadata, and absence of inline scripts. Initial JavaScript: **1,038 bytes gzip**, below the 8 KB budget.

Browser coverage includes direct page loads, complete content, no external asset requests, operation without JavaScript, CV download, home-to-record navigation, responsive menu and focus, copy success/denial, portrait failure, reduced motion, keyboard entry, primary touch targets, and text contrast. Layout checks cover widths 320, 390, 765, 1120 and 1440 px, plus 200% text enlargement at 390 and 1440 px.

The live local homepage and every inner page were visually reviewed in the in-app browser. The review included the desktop hero, narrower layouts, project illustrations, research, ventures, activities, updates and contact footer. Local screenshots are kept in ignored `.artifacts/`.

## Environment note

This macOS host's stock Playwright Firefox launch reports “Could not find profile folder.” The standalone test configuration creates a temporary application descriptor with a distinct test name, links the installed browser's own `browser/omni.ja`, and starts Firefox with `-app` before `-profile`. All Firefox tests pass with this configuration. The helper cleans up its temporary files and does not modify the installed browser, personal profiles, or browser security preferences. Other operating systems use the standard Playwright launch.

This is useful repository guidance if Firefox testing is expanded in the original project. It is an environment issue, separate from the website implementation.

External destinations are preserved from the source snapshot; tests check their rendering and local navigation. No publication, hosting registration, push, or remote link-availability audit was performed.
