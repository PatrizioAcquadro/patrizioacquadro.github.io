import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { pages, renderDocument, escapeHtml } from '../src/content/render.js';
import { content, projectArt, ventureArt } from '../src/content/editorial.js';

const template = readFileSync(new URL('../index.html', import.meta.url), 'utf8');

test('every project has its own local illustration, descriptive alt text and caption', () => {
  const html = renderDocument(template, 'projects');
  assert.equal((html.match(/class="project-illustration"/g) || []).length, content.projects.length);
  const files = new Set();
  for (const { id } of content.projects) {
    const art = projectArt[id];
    assert.ok(art?.alt && art.caption, id);
    assert.ok(!files.has(art.art), `Duplicate illustration for ${id}`);
    files.add(art.art);
    const svg = readFileSync(new URL(`../public/art/${art.art}.svg`, import.meta.url), 'utf8');
    assert.ok(svg.includes('viewBox="0 0 960 640"'), id);
    assert.ok(html.includes(`src="/art/${art.art}.svg"`), id);
    assert.ok(html.includes(`alt="${escapeHtml(art.alt)}"`), id);
  }
});

test('each venture has a distinct illustrated identity in its static page', () => {
  const html = renderDocument(template, 'ventures');
  assert.equal((html.match(/class="venture-illustration"/g) || []).length, content.ventures.length);
  const files = new Set();
  for (const { id } of content.ventures) {
    const art = ventureArt[id];
    assert.ok(art?.alt && art.caption, id);
    assert.ok(!files.has(art.art), `Duplicate venture identity for ${id}`);
    files.add(art.art);
    const svg = readFileSync(new URL(`../public/art/${art.art}.svg`, import.meta.url), 'utf8');
    assert.ok(svg.includes('viewBox="0 0 960 640"'), id);
    assert.ok(html.includes(`src="/art/${art.art}.svg"`), id);
    assert.ok(html.includes(`alt="${escapeHtml(art.alt)}"`), id);
  }
});

test('each collection is complete in its dedicated static page', () => {
  for (const [page, collection, record, title] of [['projects', 'projects', 'project', 'title'], ['experience', 'research', 'research', 'role'], ['ventures', 'ventures', 'venture', 'name'], ['activities', 'activities', 'activity', 'title'], ['updates', 'news', 'news', 'text']]) {
    const html = renderDocument(template, page);
    assert.equal((html.match(new RegExp(`data-record="${record}"`, 'g')) || []).length, content[collection].length);
    for (const item of content[collection]) {
      assert.ok(html.includes(`id="${item.id}"`), item.id);
      assert.ok(html.includes(escapeHtml(item[title])), item[title]);
      for (const text of item.bullets || []) assert.ok(html.includes(escapeHtml(text)), text);
      for (const href of [item.href, ...(item.links || []).map((link) => link.href)].filter(Boolean)) assert.ok(html.includes(escapeHtml(href)), href);
    }
  }
});

test('all pages have a single h1, unique anchors, noindex, complete contacts and no placeholders', () => {
  for (const page of Object.keys(pages)) {
    const html = renderDocument(template, page, { cvVersion: 'verified123' });
    assert.equal((html.match(/<h1\b/g) || []).length, 1);
    const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1]);
    assert.equal(new Set(ids).size, ids.length, page);
    assert.ok(!html.includes('{{'));
    assert.ok(html.includes('content="noindex, nofollow"'));
    assert.ok(html.includes('AcquadroPatrizioCV.pdf?v=verified123'));
    for (const contact of content.contactLinks) assert.ok(html.includes(escapeHtml(contact.href)));
    assert.equal((html.match(/aria-current="page"/g) || []).length, page === 'home' ? 0 : 1);
    assert.ok(!html.includes(content.privacyExposure.phoneHref));
  }
});

test('home links directly to every section and selected records', () => {
  const html = renderDocument(template, 'home');
  for (const page of Object.keys(pages).filter((key) => key !== 'home')) assert.ok(html.includes(`href="/${page}/"`));
  for (const anchor of ['/projects/#alexdoor-xas', '/projects/#isaac-audio-sensors', '/projects/#stm32n6-transformer', '/ventures/#bif', '/ventures/#adunet', '/activities/#toyp-2026']) assert.ok(html.includes(`href="${anchor}"`));
});

test('text escaping and unknown routes fail safely', () => {
  assert.equal(escapeHtml('<a title="x">&\'</a>'), '&lt;a title=&quot;x&quot;&gt;&amp;&#39;&lt;/a&gt;');
  assert.throws(() => renderDocument(template, 'missing'), /Unknown page/);
});
