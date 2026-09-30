import assert from 'node:assert/strict';
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { gzipSync } from 'node:zlib';
import { siteData } from '../src/content/siteData.js';

const html = readFileSync('dist/index.html', 'utf8');
assert.ok(!html.includes('{{site:') && !html.includes('%BASE_URL%') && !html.includes('your-domain.example'), 'Unresolved HTML placeholders');
const canonical = new URL(html.match(/<link rel="canonical" href="([^"]+)"/)[1]);
assert.equal(canonical.origin, new URL(siteData.siteUrl).origin, 'Incorrect canonical origin');
assert.ok(html.includes(`property="og:url" content="${canonical.href}"`), 'Incorrect social URL');
assert.ok(html.includes(`property="og:image" content="${new URL('og/og-cover.png', canonical).href}"`), 'Incorrect social image URL');
assert.ok(existsSync('dist/og/og-cover.png'), 'Missing social image');
const cvHash = createHash('sha256').update(readFileSync('public/cv/AcquadroPatrizioCV.pdf')).digest('hex').slice(0, 12);
assert.ok(html.includes(`AcquadroPatrizioCV.pdf?v=${cvHash}`), 'Stale CV version');
for (const [className, count] of [['news-item', siteData.news.length], ['research-card', siteData.research.length], ['project-card', siteData.projects.length], ['venture-card', siteData.ventures.length], ['talk-item', siteData.activities.length]]) {
  assert.equal((html.match(new RegExp(`class="[^"\\n]*\\b${className}\\b`, 'g')) || []).length, count, className);
}
assert.ok(readFileSync('dist/robots.txt', 'utf8').includes(new URL('sitemap.xml', canonical).href));
assert.ok(readFileSync('dist/sitemap.xml', 'utf8').includes(`<lastmod>${siteData.lastUpdated}</lastmod>`));
const portraits = [320, 640, 960].map((width) => statSync(`dist/images/PatrizioAcquadro-${width}.webp`).size);
const icons = ['favicon.png', 'apple-touch-icon.png'].reduce((total, file) => total + statSync(`dist/${file}`).size, 0);
const jsFiles = readdirSync('dist/assets').filter((file) => file.endsWith('.js') && !file.startsWith('cv-'));
const scriptBytes = jsFiles.reduce((total, file) => total + gzipSync(readFileSync(`dist/assets/${file}`)).length, gzipSync(readFileSync('dist/theme-init.js')).length);
const paths = [...html.matchAll(/(?:src|href|data-fallback)="([^"#]+)"/g)].map((match) => match[1]);
for (const set of html.matchAll(/srcset="([^"]+)"/g)) paths.push(...set[1].split(',').map((entry) => entry.trim().split(' ')[0]));
for (const asset of paths.filter((value) => value.startsWith(canonical.pathname))) {
  assert.ok(existsSync(`dist/${asset.slice(canonical.pathname.length).split('?')[0]}`), `Missing asset: ${asset}`);
}
assert.ok(Math.max(...portraits) <= 200_000, 'Portrait exceeds 200 KB');
assert.ok(icons <= 60_000, 'Icons exceed 60 KB');
assert.ok(scriptBytes < 8_000, 'Homepage JavaScript exceeds its original size');
for (const obsolete of ['dist/PA_Logo.png', 'dist/images/PatrizioAcquadro.png', 'dist/assets/source']) {
  assert.ok(!existsSync(obsolete), `Unnecessary public artifact: ${obsolete}`);
}
console.log(`Build verified: portrait max ${Math.max(...portraits)} B; icons ${icons} B; homepage JS ${scriptBytes} B gzip.`);
