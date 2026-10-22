# Local validation — 22 October 2026

Implemented on `main`, from the original portfolio at `768a196`. All source additions are confined to `alternative/`; the original site's tracked files and deployment configuration are unchanged.

## Results

- Alternative validation, using Node 24.19.0: **7 renderer tests and 30 browser tests passed** (10 each in Chromium, Firefox, and WebKit), plus production build and asset/CSP checks.
- Original site's `npm run check`, using Node 24.19.0: **5 unit tests and 17 Chromium tests passed**, plus production build, security baseline and asset budgets.
- Compared the copied `siteData` directly with the original using `assert.deepEqual`: all 15 projects, 5 research experiences, 3 ventures, 8 activities, 9 updates, contacts, and privacy settings match exactly.
- Compared original, copied, and built CV bytes. SHA-256: `3d665a4d1bdeac09177906d102b6dd092269ff83e60086af2a1e35db34b58b26`.
- Checked all six built routes, local asset paths, cross-page anchors, noindex metadata, and absence of inline scripts. Initial JavaScript: **1,038 bytes gzip**, below the 8 KB budget.

Browser coverage includes direct page loads, complete content, no external asset requests, operation without JavaScript, CV download, home-to-record navigation, responsive menu and focus, copy success/denial, portrait failure, reduced motion, keyboard entry, primary touch targets, and text contrast. Layout checks cover widths 320, 390, 765, 1120 and 1440 px, plus 200% text enlargement at 390 and 1440 px.

The live local homepage and every inner page were visually reviewed in the in-app browser. The review included the desktop hero, narrower layouts, project illustrations, research, ventures, activities, updates and contact footer. Local screenshots are kept in ignored `.artifacts/`.

The project illustration update adds 12 original SVG diagrams to complete all 15 projects. Every project now has a distinct local image, descriptive alternative text, and concept caption. All SVGs were parsed as XML and visually reviewed together; the browser suite checks that all 15 project images render successfully. The three existing featured illustrations and homepage selection are retained. The full alternative validation was repeated after this update.

The Ventures update adds three illustrated identities with integrated lettering: live events and community for BiellaInFesta, mobile festival navigation for Adunet, and an original voxel world for CubeWar. These replace the plain wordmarks in the Ventures detail page. The layout pairs graphics and descriptions on desktop and stacks them on mobile. All three SVGs were parsed as XML, visually reviewed, and checked for successful loading in every browser; source facts, metrics, and homepage previews are preserved. The complete `npm run check` passed again after this update.

The personal monogram update replaces negatively spaced text with an original SVG p/a mark, using geometric letterforms and a separate terracotta slash. All six headers use the same font-independent asset. Matching SVG/PNG favicons, a touch icon, and a transparent PNG export were rendered from the vector masters. The new mark was visually checked at display and header sizes, and the complete `npm run check` passed again, including image loading, mobile navigation, keyboard access, and 200% text reflow.

The robotics presentation update gives the five research projects a primary category treatment, a direct index and larger desktop illustrations; all ten AI/software projects retain their content and art in a compact layout. Research narratives were reconciled with current GitHub status and long-term plans, as recorded in `ROBOTICS_SOURCES.md`. Contributions, mentorship and future directions remain distinct. New tests cover all five research shortcuts at desktop/mobile sizes, placement below the sticky header, larger desktop images and explicit direction/role labels. Reflow at 200% initially revealed intrinsic-size overflow in the new heading/grid; this was corrected. The index check also exposed doubled scroll spacing, corrected for the research anchors. The complete final suite passes, including contrast for all new text treatments. The original site and copied source data were not edited; the original site's check above was not repeated for this scoped update.

The Experience treatment highlights both Purdue research entries as separate, softly rounded surfaces with a lighter sand tint and short terracotta accents. The section heading has no dark divider, and spacing separates the two periods. The treatment follows the institution field, preserves chronology and source copy, and keeps desktop titles aligned with the remaining timeline. The full alternative check passes, including reflow and contrast in all three browsers. Desktop and narrow-screen compositions were visually reviewed. This scoped visual change does not add dependencies or new tests.

## Environment note

This macOS host's stock Playwright Firefox launch reports “Could not find profile folder.” The standalone test configuration creates a temporary application descriptor with a distinct test name, links the installed browser's own `browser/omni.ja`, and starts Firefox with `-app` before `-profile`. All Firefox tests pass with this configuration. The helper cleans up its temporary files and does not modify the installed browser, personal profiles, or browser security preferences. Other operating systems use the standard Playwright launch.

This is useful repository guidance if Firefox testing is expanded in the original project. It is an environment issue, separate from the website implementation.

External destinations are preserved from the source snapshot; tests check their rendering and local navigation. No publication, hosting registration, push, or remote link-availability audit was performed.
