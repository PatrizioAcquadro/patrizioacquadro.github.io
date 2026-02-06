# Security Policy

## Scope

This policy covers:

- Static website source (`index.html`, `cv/index.html`, `src/`, `public/`)
- Deployment and CI workflows (`.github/workflows/`)
- Dependency and automation configuration (`package*.json`, `.github/dependabot.yml`)

Out of scope:

- Third-party platforms linked from this site
- Security issues outside this repository

## Reporting a Vulnerability

Please report suspected vulnerabilities privately:

- Preferred: GitHub Security Advisory (private report)
- Alternative: email `acquadropatrizio@gmail.com` with subject `Security Report - patrizioacquadro.github.io`

Include:

- Affected file/path and issue description
- Reproduction steps or proof-of-concept
- Impact assessment
- Suggested remediation (if available)

Please do not open public issues for unpatched vulnerabilities.

## Disclosure and Response Expectations

- Initial triage acknowledgement target: within 3 business days
- Follow-up status update target: within 7 business days
- Fix timeline depends on severity and reproducibility
- Coordinated disclosure is preferred after mitigation is available

## Security Baseline Statement

This repository uses best-practice hardening for a static GitHub Pages site (strict CSP, pinned actions, dependency monitoring, and CI policy checks), but it is **not invulnerable**.

## Residual Risks and GitHub Pages Limits

- GitHub Pages does not allow full origin-level custom security headers for all controls (`X-Frame-Options`, `HSTS`, `X-Content-Type-Options`, `Permissions-Policy`, `COOP/COEP`).
- `frame-ancestors` enforcement is not reliable via meta CSP; anti-clickjacking here is best-effort runtime protection.
- Public contact and profile information can still be scraped if published.
- Supply-chain risk is reduced through pinning and monitoring, not eliminated.
- Maintainer account takeover remains a critical threat; strong MFA/passkeys are required.
