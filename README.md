# Patrizio Acquadro - Personal Website

Static personal website built with Vite and deployed on GitHub Pages.

## Stack

- Vite (build/dev server)
- Vanilla HTML, CSS, JavaScript
- GitHub Actions for deployment

## Local Development

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start development server:
   ```bash
   npm run dev
   ```
3. Build production files:
   ```bash
   npm run build
   ```
4. Preview production build:
   ```bash
   npm run preview
   ```

## Content Editing

All editable content lives in:

- `/Users/patrizioacquadro/Desktop/GitHub_Website/src/content/siteData.js`

Rules used for this website:

- Use only facts from the CV source document unless explicitly provided by the owner.
- If information is missing, keep a TODO placeholder instead of inventing data.
- Keep `Publications (coming soon)` until explicit publication entries are available.

## Key Files

- Home page: `/Users/patrizioacquadro/Desktop/GitHub_Website/index.html`
- CV page: `/Users/patrizioacquadro/Desktop/GitHub_Website/cv/index.html`
- Main app logic: `/Users/patrizioacquadro/Desktop/GitHub_Website/src/main.js`
- CV page logic: `/Users/patrizioacquadro/Desktop/GitHub_Website/src/cv.js`
- Main styles: `/Users/patrizioacquadro/Desktop/GitHub_Website/src/styles/main.css`
- CV styles: `/Users/patrizioacquadro/Desktop/GitHub_Website/src/styles/cv.css`
- PDF source served by site: `/Users/patrizioacquadro/Desktop/GitHub_Website/public/cv/AcquadroPatrizioCV.pdf`
- Deploy workflow: `/Users/patrizioacquadro/Desktop/GitHub_Website/.github/workflows/deploy-pages.yml`

## GitHub Pages Deployment

1. Push this repository to GitHub.
2. In GitHub, open `Settings -> Pages`.
3. Under `Build and deployment`, select `GitHub Actions` as the source.
4. Push to `main` (or run the workflow manually from `Actions`).
5. GitHub Actions builds `dist/` and deploys it to Pages.

The Vite base path is auto-detected in `vite.config.js`:

- If repository name ends with `.github.io`, base is `/`.
- Otherwise, base is `/<repo-name>/`.

## SEO and Canonical URL Setup

Both pages include SEO and Open Graph tags with placeholder canonical URLs.

After first deploy, update these placeholders in:

- `/Users/patrizioacquadro/Desktop/GitHub_Website/index.html`
- `/Users/patrizioacquadro/Desktop/GitHub_Website/cv/index.html`

Replace `https://your-domain.example/...` with your real GitHub Pages URL or custom domain.

## Optional Custom Domain

1. Create file `public/CNAME` with your domain (for example `www.yourdomain.com`).
2. Configure DNS at your domain provider.
3. Typical setup:
   - `CNAME` record for `www` -> `<username>.github.io`
   - `A` records for apex/root domain -> GitHub Pages IPs (as documented by GitHub)
4. Enable `Enforce HTTPS` in GitHub Pages settings after DNS propagation.

## Accessibility and UX Notes

- Semantic landmarks and heading hierarchy
- Keyboard-focus styles and skip link
- Responsive layout for mobile and desktop
- Optional dark mode with persisted preference
- Reduced-motion support

