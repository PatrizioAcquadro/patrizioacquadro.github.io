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

## Introductory copy and link follow-up — 2026-09-30

The introductory biography was shortened to 31 words in two sentences, preserving the studies at Politecnico di Milano/Milano-Bicocca and the Purdue robotics research. The rest of the page copy and design were retained.

All 18 unique HTTPS destinations in the homepage HTML were checked. Seventeen returned HTTP 200 with titles matching the intended projects, documentation, homepage or profiles. The 10 in-page anchor links resolve to existing IDs. The CV download returns a valid PDF, `/cv/` redirects to Home, and Mail uses the correct `mailto:` address.

LinkedIn returned its automated-access restriction (HTTP 999), rather than a verifiable profile response. Its [publicly indexed profile](https://www.linkedin.com/in/patrizioacquadro) matches the name, Purdue affiliation and research/projects in this portfolio. The site now uses that URL, without the hyphen in the previous link. Direct profile accessibility remains restricted in this automated environment. The served PDF already uses the same correct LinkedIn URL. The preserved Word source contains the older hyphenated URL and should be aligned before a future CV export; the CV documents were not altered by this follow-up.

Detailed responses and browser observations are saved locally in `.artifacts/validation/link-audit.json`; the updated introduction previews are `intro-desktop.png` and `intro-mobile.png`. Unit tests and build/security/budget checks passed for this update. A responsive check initially measured a transient overflow during viewport resize; it now waits for two animation frames before measuring, with the same overflow assertion retained. The final browser suite passed all 33 tests (11 per engine), including the updated introduction and responsive layouts.

## Robotics portfolio and resume update - 2026-09-30

Updated the introduction, research history, project descriptions, news, page title and social/search descriptions for U.S. robot-learning and manipulation opportunities. Added five robotics projects before the ten existing projects, and split the Purdue research experience into the current R&D Assistant role and the completed visiting-research period. The new downloadable CV is the supplied `Patrizio_Acquadro_Robot_Learning_CV_v3.pdf`, copied without modification to the existing public URL.

### Content evidence

| Content | Source and editorial boundary |
| --- | --- |
| Purdue roles, dates, location and master's studies | [Supplied CV](../public/cv/AcquadroPatrizioCV.pdf), checked against the [LinkedIn profile](https://www.linkedin.com/in/patrizioacquadro) in the browser during planning. R&D Assistant: June 2026-present; Visiting Student Researcher: January-May 2026. |
| Research interests and mentoring | LinkedIn About/Experience/Projects and the CV support cross-embodiment interests, humanoid manipulation, multimodal perception and undergraduate mentorship. The invitation expresses openness to conversations without an availability date. |
| AlexDoor-XAS | [README](https://github.com/PatrizioAcquadro/AlexDoor-XAS/blob/main/README.md): implemented simulation control/sensing and a planned four-action-representation ACT/diffusion study. Generalization to unseen doors is an evaluation goal, not a reported result. |
| Isaac Audio Sensors | [Current README](https://github.com/PatrizioAcquadro/isaac-audio-sensors/blob/main/README.md) supports microphone arrays, propagation, observations, datasets, recording/replay and Isaac integrations. The [V1 showcase](https://isaac-audio-showcase-site.vercel.app/) dates V1 completion to May 24, 2026; its link is explicitly labeled V1. The portfolio does not claim hardware-calibrated acoustic fidelity or a published 3.0.0 release. |
| SquadBot-AV | CV and prior project review support a general description of multimodal perception research for robotics. Public portfolio copy is limited to the research area and contribution, with no private repository link. |
| Ego2Grip | [Collaborator's README](https://github.com/grmpn/Egocentric-Videos/blob/main/README.md) documents egocentric video to 3D hand trajectories, with robot-compatible demonstrations downstream. The card identifies Patrizio's role as mentorship and technical guidance. |
| VLA-LEGO | CV, LinkedIn and [project documentation](https://github.com/PatrizioAcquadro/VLA-LEGO_Project/tree/main/docs) support the MuJoCo benchmark and experiment infrastructure. No completed assembly-policy success rate or sim-to-real transfer is claimed. |
| Earlier AI research and projects | Roles aligned to the CV; descriptions retain retrieval methods, the 7.6k-snippet knowledge base, quantization, embedded deployment and benchmark scope. Broad unsupported performance statements were removed. |

New project dates use 2026 without inferred start months. Entrepreneurship, activities, contacts and phone-exposure settings were compared programmatically with the pre-update revision and are identical. The ten earlier project titles, dates, tools and links are also identical. Styles, portrait, quotation, section order, renderer, dependencies and public interfaces were retained.

### Acceptance evidence

| Check | Result |
| --- | --- |
| `npm run check`, Node 24.19.0 | Passed: 5 unit tests, production build, security baseline, artifact budgets and 11 Chromium tests. |
| Firefox and WebKit | Passed: 22/22 additional tests using the previously documented isolated Firefox launcher. Total browser coverage: 33/33. |
| Content counts | 9 news items, 5 research experiences, 15 projects, 3 ventures and 8 activities; no unresolved placeholders or private project link. |
| CV delivery | Preview responds HTTP 200 as `application/pdf`; downloaded bytes match both the public file and the supplied CV. SHA-256: `34af84af713cdd552af338c88dc344cc41c802b04e1e4fdbed2ce8ac2529fa66`; URL version: `34af84af713c`. |
| External links | 23 unique destinations inspected: 22 HTTP 200 responses with matching destination titles. LinkedIn returns HTTP 999 to automated HTTP requests; its exact profile URL and content were verified in the browser during planning. |
| Navigation and metadata | All 8 distinct internal anchor targets resolve. Page title and social/search descriptions reflect robot learning at Purdue. CV versioning and the legacy redirect remain intact. |
| Visual review | Desktop 1440x1000 and mobile 390x844, both themes: reviewed the introduction and project cards. Longer text remains readable without clipping. Existing browser checks also pass at 320/390/765/1120/1440 px and 200% text enlargement, including no-JavaScript operation. |

Audit JSON and review screenshots are local, ignored artifacts under `.artifacts/robotics-update/`. The local development preview runs at `http://127.0.0.1:5173/`. No push or deployment was performed; production publication remains outside this validation.

Environment note for future agent guidance: use the bundled Node 24 runtime because the host's default Node is 25. Browser checks and preview servers need loopback-listener permissions outside the restricted sandbox. The existing Firefox isolation workaround was reused without changing application behavior.

## Hero name and subtitle - 2026-09-30

Changed the subtitle to "I help robots learn, perceive, and act." Hero font sizes now scale with the available text-column width. The name and subtitle each stay on one line at 320, 390, 765, 1120 and 1440 px in both themes, verified by text line measurements in Chromium, Firefox and WebKit. At 200% text enlargement, text can wrap as needed without horizontal overflow.

Validation passed: 5 unit tests, production build, security baseline, artifact budgets and all 33 browser tests. Reviewed desktop and mobile screenshots; the closing invitation appears once and the previous invitation is absent. Screenshots and measurements are saved under the ignored `.artifacts/hero-title/` directory.
