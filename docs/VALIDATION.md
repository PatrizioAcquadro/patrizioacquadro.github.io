# Portfolio refinement — validation record

Verified locally on 2026-09-30 with Node 24.19.0, Vite 6.4.3 and Playwright 1.63.0. The existing GitHub Pages architecture and visual identity were retained. No push or deployment was performed.

## Acceptance evidence

| Check | Result |
| --- | --- |
| `npm run check` | Passed: 5 Node tests, production build, security baseline, build budgets and 11 Chromium tests. |
| Cross-browser suite | 33/33 passed: 11 each on Chromium, Firefox and WebKit. |
| Dependency audit | `npm audit --audit-level=high`: zero vulnerabilities, including development dependencies. |
| Static content / no JavaScript | 7 news, 4 research experiences, 10 projects, 3 ventures and 8 activities; no duplicate cards. Navigation, Mail and CV download remain usable. |
| Email interaction | Native modal, every action reachable by Tab/Shift+Tab, Escape/backdrop/close button dismissal, trigger focus restored, clipboard success and manual-copy fallback verified. |
| Themes and contrast | Both themes, including the email panel; computed text contrast at least 4.5:1 across the tested text styles, with conservative gradient/background checks. |
| Layout and keyboard | 320, 390, 765, 1120 and 1440 px without horizontal overflow; 200% root-font enlargement; mobile anchors/menu, skip link, reduced motion and control targets checked. |
| Production loading | No application errors, missing assets or CSP console errors in all three browsers, including the normal-motion initialization path. |
| Development | Static rendering, robots/sitemap endpoints, CSP, content hot reload and CV hash updates passed. Temporary content/PDF changes were restored byte-for-byte. |
| Deployment paths | Root and `/portfolio/` builds passed; canonical/social metadata, discovery URLs, local assets and the legacy CV redirect resolve correctly. |
| Workflows | YAML parsed locally and dependency/artifact gating reviewed. GitHub Actions execution itself remains unverified. |

## Asset budgets

Sizes are decimal bytes; JavaScript includes the homepage module, shared module/preload code and `theme-init.js`, each gzip-compressed.

| Artifact | Previous | Current | Target |
| --- | ---: | ---: | ---: |
| Largest portrait variant | 1,063,108 B PNG | 28,386 B WebP | ≤200,000 B |
| Favicon / touch icons combined | 445,623 B PNG | 58,589 B PNG | ≤60,000 B |
| Initial JavaScript | Approximately 8 KB gzip | 3,190 B gzip | <8,000 B |

The 320/640/960 portrait variants weigh 6,746 / 15,830 / 28,386 bytes. The original portrait, logo, favicon and editable CV are preserved in `assets/source/`. The served PDF and existing social image are unchanged. Unused distributed images, duplicate PDF, unused skills data and unused styles were removed.

## Visual comparison

Compared the published site with the local production build at 1440×1000 and 390×844 in both themes. Before/after screenshots, full-page views, dialog views and geometry measurements are saved locally in `.artifacts/validation/`; these review artifacts are intentionally untracked.

The typography, decorative palette, content order, grids and portrait crop match the original design. Portrait dimensions remain 276×331.19 px on desktop and 272×326.39 px on mobile. Increased button target heights shift the desktop portrait down 4 px and the mobile portrait down 16 px; heading geometry is unchanged. Secondary labels now have stronger contrast, and the email panel includes the requested email-app action. No visual regression was identified in the inspected views.

## Archive and cleanup

The obsolete nested checkout was archived in its entirety before removal, including its Git history, modified/untracked files and unique images. Archive members were compared against their source files before deletion.

The archive is outside this repository, beside it:

`PersonalWebsite_Codex-archive-2026-09-30.tar.gz`

- 444 regular files and 4 symbolic links; 641 archive members including directories.
- Archive size: 34,548,312 bytes.
- SHA-256: `b5c97eab58521b8300a9d9c78dfdf669500748825206b10350566eb3ccb80d71`.

## Environment notes and remaining scope

The standard local Firefox launch failed before page navigation with “Could not find profile folder.” The same installed Firefox binary passed all 11 tests when launched with an isolated application-data identity and a fresh test profile. The temporary wrapper/configuration is in `.artifacts/validation/`, and does not use or modify the personal browser profile. This behavior matches an [upstream macOS/Playwright report](https://github.com/microsoft/playwright/issues/42768); the site's browser code was not changed to conceal a launch failure.

WebKit tests use HTTPS to preserve production `upgrade-insecure-requests`, and Option+Tab for links under Safari's default macOS preference. The dialog explicitly keeps all its controls in the Tab sequence.

For future agent instructions, specify Node 24 and run install/build/test commands in the same host environment. Mixing the sandbox and host dependency trees during this task produced different installed Vite versions; the final validation consistently used the host checkout and Node 24.

GitHub branch protections, the actual remote workflow run, live post-deployment behavior, physical-device testing, screen-reader testing and real visitor performance metrics remain outside this local validation. Local asset budgets establish transfer-size improvements, not a field-performance score.
