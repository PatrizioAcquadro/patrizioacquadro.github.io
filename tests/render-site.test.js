import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { siteData } from '../src/content/siteData.js';
import { escapeHtml, assetPath, formatUpdated, renderSite, renderDiscoveryFiles } from '../src/content/renderSite.js';

const template = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
const cvVersion = createHash('sha256').update(readFileSync(new URL('../public/cv/AcquadroPatrizioCV.pdf', import.meta.url))).digest('hex').slice(0, 12);

test('escape text and attributes, including quotes and markup', () => {
  assert.equal(escapeHtml(`<a title="Tom's">A&B</a>`), '&lt;a title=&quot;Tom&#39;s&quot;&gt;A&amp;B&lt;/a&gt;');
  const data = structuredClone(siteData);
  data.name = '<img src=x onerror="alert(1)">';
  const html = renderSite(template, data, { cvVersion });
  assert.ok(html.includes(escapeHtml(data.name)));
  assert.ok(!html.includes(data.name));
  data.projects[0].href = 'javascript:alert(1)';
  assert.throws(() => renderSite(template, data), /Unsupported link/);
});

test('render all content once with no unresolved slots', () => {
  const html = renderSite(template, siteData, { cvVersion, year: 2026 });
  assert.ok(!html.includes('{{site:'));
  assert.ok(!html.includes('your-domain.example'));
  assert.ok(html.includes(`<h1 id="hero-name">${siteData.name}</h1>`));
  for (const [className, count] of [['news-item', siteData.news.length], ['research-card', siteData.research.length], ['project-card', siteData.projects.length], ['venture-card', siteData.ventures.length], ['talk-item', siteData.activities.length], ['contact-item', siteData.contactLinks.length]]) {
    assert.equal((html.match(new RegExp(`class="[^"\\n]*\\b${className}\\b`, 'g')) || []).length, count, className);
  }
  assert.ok(html.includes(`AcquadroPatrizioCV.pdf?v=${cvVersion}`));
  assert.ok(html.includes('Transformer-NPU-STM32N6'));
  assert.ok(html.includes('Documentation — STM32N6'));
  assert.ok(html.includes('GitHub repository — STM32N6'));
  assert.ok(!html.includes('Publications (coming soon)'));
});

test('content respects a project base path', () => {
  assert.equal(assetPath('/portfolio', 'images/photo.png'), '/portfolio/images/photo.png');
  const html = renderSite(template, siteData, { base: '/portfolio/', cvVersion });
  assert.ok(html.includes('href="https://patrizioacquadro.github.io/portfolio/"'));
  assert.ok(html.includes('https://patrizioacquadro.github.io/portfolio/og/og-cover.png'));
  assert.ok(html.includes('src="/portfolio/images/PatrizioAcquadro-640.webp"'));
  assert.ok(html.includes('/portfolio/images/PatrizioAcquadro-960.webp 960w'));
});

test('the editorial date is validated and formatted independently of timezone', () => {
  assert.equal(formatUpdated('2026-09-30'), 'September 2026');
  assert.throws(() => formatUpdated('2026-02-30'), /valid ISO date/);
  assert.throws(() => formatUpdated('September 2026'), /valid ISO date/);
});

test('discovery files include only the canonical homepage and editorial date', () => {
  const files = renderDiscoveryFiles(siteData, '/portfolio/');
  assert.ok(files['robots.txt'].includes('https://patrizioacquadro.github.io/portfolio/sitemap.xml'));
  assert.ok(files['sitemap.xml'].includes(`<lastmod>${siteData.lastUpdated}</lastmod>`));
  assert.equal((files['sitemap.xml'].match(/<loc>/g) || []).length, 1);
  const cvTemplate = readFileSync(new URL('../cv/index.html', import.meta.url), 'utf8');
  const html = renderSite(cvTemplate, siteData, { base: '/portfolio/', cvVersion });
  assert.ok(html.includes('content="noindex, follow"'));
  assert.ok(html.includes('href="https://patrizioacquadro.github.io/portfolio/"'));
});
