import { defineConfig } from 'vite';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { renderSite, renderDiscoveryFiles } from './src/content/renderSite.js';

function staticContent() {
  let base;
  let command;
  let buildData;
  const contentFile = fileURLToPath(new URL('./src/content/siteData.js', import.meta.url));
  const cvFile = fileURLToPath(new URL('./public/cv/AcquadroPatrizioCV.pdf', import.meta.url));
  const version = () => createHash('sha256').update(readFileSync(cvFile)).digest('hex').slice(0, 12);

  return {
    name: 'static-site-content',
    configResolved(config) { base = config.base; command = config.command; },
    async buildStart() {
      if (command !== 'build') return;
      // Keep editable content out of Vite's config dependencies, avoiding server restarts.
      const hash = createHash('sha256').update(readFileSync(contentFile)).digest('hex');
      buildData = (await import(`${pathToFileURL(contentFile).href}?v=${hash}`)).siteData;
    },
    transformIndexHtml: {
      order: 'pre',
      async handler(html, context) {
        const data = context.server ? (await context.server.ssrLoadModule('/src/content/siteData.js')).siteData : buildData;
        const rendered = renderSite(html, data, { base, cvVersion: version() });
        // Development uses HTTP and Vite's reload connection; dist keeps the strict policy.
        return context.server ? rendered
          .replace("connect-src 'none'", "connect-src 'self' ws://localhost:* ws://127.0.0.1:*")
          .replace('; upgrade-insecure-requests', '') : rendered;
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
      for (const [fileName, source] of Object.entries(renderDiscoveryFiles(buildData, base))) {
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
