import { defineConfig } from 'vite';
import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { pages, renderDocument, renderDiscoveryFiles } from './src/content/render.js';

const cvVersion = createHash('sha256').update(readFileSync(new URL('./public/cv/AcquadroPatrizioCV.pdf', import.meta.url))).digest('hex').slice(0, 12);

export default defineConfig({
  plugins: [{
    name: 'editorial-static-pages',
    configureServer(server) {
      server.middlewares.use((request, response, next) => {
        const name = request.url?.split('?')[0].slice(1);
        const files = renderDiscoveryFiles();
        if (!Object.hasOwn(files, name)) return next();
        response.setHeader('Content-Type', name === 'sitemap.xml' ? 'application/xml' : 'text/plain');
        response.end(files[name]);
      });
    },
    generateBundle() {
      for (const [fileName, source] of Object.entries(renderDiscoveryFiles())) {
        this.emitFile({ type: 'asset', fileName, source });
      }
    },
    transformIndexHtml: {
      order: 'pre',
      handler(template, context) {
        const page = Object.keys(pages).find((key) => key !== 'home' && context.filename.endsWith(`/${key}/index.html`)) || 'home';
        const html = context.filename.endsWith('/cv/index.html') ? template : renderDocument(template, page, { cvVersion });
        return context.server ? html.replace("connect-src 'none'", "connect-src 'self' ws://127.0.0.1:* ws://localhost:*").replace('; upgrade-insecure-requests', '') : html;
      }
    }
  }],
  server: { host: '127.0.0.1', port: 5174, strictPort: true },
  preview: { host: '127.0.0.1', port: 4174, strictPort: true },
  build: {
    rollupOptions: {
      input: {
        ...Object.fromEntries(Object.keys(pages).map((key) => [key, fileURLToPath(new URL(key === 'home' ? './index.html' : `./${key}/index.html`, import.meta.url))])),
        cv: fileURLToPath(new URL('./cv/index.html', import.meta.url))
      }
    }
  }
});
