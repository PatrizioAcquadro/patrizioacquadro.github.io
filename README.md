# Personal Website (Static, Vite + GitHub Pages)

This repository contains a static personal website built with Vite, plain HTML/CSS/JavaScript, and deployed with GitHub Pages.

## Requirements

- Node.js 20+ (LTS recommended)
- npm 10+

## Installation

```bash
npm install
```

## Run Locally

```bash
npm run dev
```

The local dev server URL is printed in the terminal (usually `http://localhost:5173`).

## Production Build

```bash
npm run build
```

Build output is generated in `dist/`.

To preview the production build locally:

```bash
npm run preview
```

## Security Baseline

This repository applies layered hardening while staying fully static:

- Static-only architecture (no backend, no server functions, no dynamic user input processing).
- Strict Content Security Policy (CSP) via meta tags on both routes.
- Referrer policy set to `no-referrer`.
- Best-effort anti-clickjacking runtime guard for GitHub Pages hosting constraints.
- No third-party scripts or trackers.
- CI security checks:
  - reproducible install via `npm ci`
  - `npm audit --audit-level=high`
  - custom baseline policy checks (`scripts/security-baseline-check.mjs`)
- GitHub Actions are pinned to full commit SHAs.
- Dependabot configured for `npm` and GitHub Actions updates.
- CODEOWNERS protection for workflows and security-sensitive files.

Run the full local baseline:

```bash
npm run security:check
```

## GitHub Settings Checklist

Apply these repository settings in GitHub:

1. Protect `main` with a ruleset/branch protection:
   - require pull requests before merge
   - require at least 1 approval
   - dismiss stale reviews on new commits
   - require all review conversations resolved
   - require status checks to pass before merge (include `security-check`)
   - block force pushes
   - block branch deletion
2. Set default workflow `GITHUB_TOKEN` permissions to read-only.
3. Restrict Actions usage to GitHub-authored and explicitly trusted actions.
4. Require approval for first-time external contributors.
5. Enable Dependabot alerts and security updates.
6. Enable secret scanning and push protection (if available for your plan).
7. Ensure GitHub Pages HTTPS is enabled and enforced.

## Privacy & Exposure

Public data exposure is intentionally minimized:

- Email, LinkedIn, and GitHub are public contact channels.
- Phone exposure is configurable and disabled by default in `src/content/siteData.js` (`privacyExposure.showPhone`).
- CV and profile data are public artifacts by design and can be indexed/scraped.

## Repository Structure

- `index.html`: main single-page site
- `src/content/siteData.js`: editable content source
- `src/main.js`: homepage rendering logic
- `src/styles/`: stylesheets
- `public/`: static assets copied to build output
- `public/cv/AcquadroPatrizioCV.pdf`: downloadable CV artifact
- `scripts/security-baseline-check.mjs`: custom policy enforcement script
- `.github/workflows/deploy-pages.yml`: GitHub Pages deployment workflow
- `.github/workflows/security.yml`: CI security checks workflow

## Deploy to GitHub Pages

1. Push changes to `main` through a reviewed PR.
2. Ensure GitHub Pages is enabled for this repository.
3. Set GitHub Actions as the deployment source.
4. The deploy workflow builds and publishes `dist/` on push to `main`.

## Optional Custom Domain

1. Create `public/CNAME` with your domain (for example `www.yourdomain.com`).
2. Configure DNS records with your domain provider.
3. Enable HTTPS in GitHub Pages settings after DNS propagation.

## Residual Risks / Limits

Hardening is best-practice and defense-in-depth, not invulnerability.

- GitHub Pages does not provide full custom response-header control for all security headers.
- `frame-ancestors` and `X-Frame-Options` cannot be fully enforced via static meta tags.
- Publicly exposed contact/profile data can be scraped.
- Dependency and action supply-chain risk is reduced (pinning + audit + Dependabot), not eliminated.
- Maintainer account compromise remains a critical risk; use strong MFA/passkeys.

## Notes

- Canonical and Open Graph URLs are placeholders by default. Update them to your real domain after deployment.
