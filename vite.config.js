import { defineConfig } from 'vite';
import { fileURLToPath } from 'node:url';
import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { siteData } from './src/content/siteData.js';
import { renderSite, renderDiscoveryFiles } from './src/content/renderSite.js';

function staticContent() {
  let base;
  const contentFile = fileURLToPath(new URL('./src/content/siteData.js', import.meta.url));
  const cvFile = fileURLToPath(new URL('./public/cv/AcquadroPatrizioCV.pdf', import.meta.url));
  const version = () => createHash('sha256').update(readFileSync(cvFile)).digest('hex').slice(0, 12);

  return {
    name: 'static-site-content',
    configResolved(config) { base = config.base; },
    transformIndexHtml: {
      order: 'pre',
      async handler(html, context) {
        const data = context.server ? (await context.server.ssrLoadModule('/src/content/siteData.js')).siteData : siteData;
        const rendered = renderSite(html, data, { base, cvVersion: version() });
        // Vite's reload connection is allowed only in development, never in dist.
        return context.server ? rendered.replace("connect-src 'none'", "connect-src 'self' ws://localhost:* ws://127.0.0.1:*") : rendered;
      }
    },
    configureServer(server) {
      server.middlewares.use(async (request, response, next) => {
        const file = request.url?.split('?')[0].slice(base.length);
        if (!['robots.txt', 'sitemap.xml'].includes(file)) return next();
        const { siteData: data } = await server.ssrLoadModule('/src/content/siteData.js');
        response.setHeader('Content-Type', file === 'sitemap.xml' ? 'application/xml' : 'text/plain');
        response.end(renderDiscoveryFiles(data, base)[file]);
      });
    },
    handleHotUpdate(context) {
      if (context.file !== contentFile && context.file !== cvFile) return;
      context.modules.forEach((module) => context.server.moduleGraph.invalidateModule(module));
      context.server.ws.send({ type: 'full-reload' });
      return [];
    },
    generateBundle() {
      for (const [fileName, source] of Object.entries(renderDiscoveryFiles(siteData, base))) {
        this.emitFile({ type: 'asset', fileName, source });
      }
    }
  };
}

function resolveBase() {
  const repository = process.env.GITHUB_REPOSITORY;

  if (!repository) {
    return '/';
  }

  const parts = repository.split('/');
  const repoName = parts[1] || '';

  if (repoName.endsWith('.github.io')) {
    return '/';
  }

  return `/${repoName}/`;
}

export default defineConfig({
  plugins: [staticContent()],
  base: resolveBase(),
  build: {
    rollupOptions: {
      input: {
        main: fileURLToPath(new URL('index.html', import.meta.url)),
        cv: fileURLToPath(new URL('cv/index.html', import.meta.url))
      }
    }
  }
});
