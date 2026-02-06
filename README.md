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

## Repository Structure

- `index.html`: main single-page site
- `cv/index.html`: CV route
- `src/content/siteData.js`: editable content source
- `src/main.js`: homepage rendering logic
- `src/cv.js`: CV page logic
- `src/styles/`: stylesheets
- `public/`: static assets copied to build output
- `.github/workflows/deploy-pages.yml`: GitHub Pages deployment workflow

## Deploy to GitHub Pages

1. Push changes to `main`.
2. Ensure GitHub Pages is enabled for the repository.
3. Use GitHub Actions as the deployment source.
4. The workflow builds and deploys automatically on every push to `main`.

## Optional Custom Domain

1. Create `public/CNAME` with your domain (for example `www.yourdomain.com`).
2. Configure DNS records with your domain provider.
3. Enable HTTPS in GitHub Pages settings after DNS propagation.

## Notes

- Canonical and Open Graph URLs are placeholders by default. Update them to your real domain after deployment.
