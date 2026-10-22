import assert from 'node:assert/strict';
import { readFileSync, existsSync, statSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { gzipSync } from 'node:zlib';
import { pages, pageUrl, renderDiscoveryFiles } from '../src/content/render.js';

const cv = readFileSync('public/cv/AcquadroPatrizioCV.pdf');
const version = createHash('sha256').update(cv).digest('hex').slice(0, 12);
const files = Object.keys(pages).map((key) => key === 'home' ? 'index.html' : `${key}/index.html`);
const scripts = new Set();
let maxScriptBytes = 0;

for (const file of files) {
  const html = readFileSync(`dist/${file}`, 'utf8');
  assert.ok(!/\{\{|%BASE_URL%/.test(html), `Unresolved placeholders: ${file}`);
  assert.ok(html.includes('content="index, follow"'), `Page not indexable: ${file}`);
  const page = file === 'index.html' ? 'home' : file.split('/')[0];
  assert.ok(html.includes(`<link rel="canonical" href="${pageUrl(page)}"`), `Canonical: ${file}`);
  assert.ok(html.includes(`<meta property="og:url" content="${pageUrl(page)}"`), `Social URL: ${file}`);
  for (const directive of ["default-src 'none'", "script-src 'self'", "style-src 'self'", "connect-src 'none'", "object-src 'none'", "frame-src 'none'", "form-action 'none'"]) assert.ok(html.includes(directive), `${file}: ${directive}`);
  assert.ok(html.includes(`AcquadroPatrizioCV.pdf?v=${version}`), `CV version: ${file}`);
  assert.ok(!/<script(?![^>]*\bsrc=)[^>]*>/i.test(html), `Inline script: ${file}`);
  assert.ok(!/\son\w+\s*=/i.test(html), `Inline event handler: ${file}`);
  const paths = [...html.matchAll(/(?:src|href|data-fallback)="([^"]+)"/g)].map((match) => match[1]);
  for (const srcset of html.matchAll(/srcset="([^"]+)"/g)) paths.push(...srcset[1].split(',').map((value) => value.trim().split(' ')[0]));
  for (const value of paths.filter((path) => path.startsWith('/') || path.startsWith('#'))) {
    const url = new URL(value, `https://local.test/${file.replace('index.html', '')}`);
    const target = `dist${url.pathname}${url.pathname.endsWith('/') ? 'index.html' : ''}`;
    assert.ok(existsSync(target), `${file} → missing ${target}`);
    if (url.hash) assert.ok(readFileSync(target, 'utf8').includes(`id="${url.hash.slice(1)}"`), `Missing anchor ${value}`);
  }
  let bytes = 0;
  for (const match of html.matchAll(/<script\b[^>]*\bsrc="([^"]+)"/g)) {
    assert.ok(match[1].startsWith('/assets/'), `External script: ${match[1]}`);
    const script = readFileSync(`dist${match[1]}`, 'utf8');
    assert.ok(!/\binnerHTML\b|\beval\s*\(|\binsertAdjacentHTML\b/.test(script), 'Unsafe DOM sink');
    scripts.add(match[1]);
    bytes += gzipSync(script).length;
  }
  maxScriptBytes = Math.max(maxScriptBytes, bytes);
  assert.ok(bytes < 8000, `Initial JS budget: ${file}: ${bytes}`);
  for (const [tag, kind] of html.matchAll(/<(img|link|script)\b[^>]*>/g)) {
    if (kind === 'link' && !/rel="(?:stylesheet|icon|apple-touch-icon|manifest|preload|modulepreload)"/.test(tag)) continue;
    assert.ok(!/(?:src|href)="https?:/.test(tag), `External asset: ${tag}`);
  }
}
assert.deepEqual(readFileSync('dist/cv/AcquadroPatrizioCV.pdf'), cv);
for (const [file, source] of Object.entries(renderDiscoveryFiles())) assert.equal(readFileSync(`dist/${file}`, 'utf8'), source);
const legacy = readFileSync('dist/cv/index.html', 'utf8');
assert.ok(legacy.includes('content="noindex, follow"') && legacy.includes('content="0; url=../"'));
const cover = readFileSync('dist/og/og-cover.png');
assert.equal(cover.readUInt32BE(16), 1200);
assert.equal(cover.readUInt32BE(20), 630);
assert.ok(statSync('dist/images/PatrizioAcquadro-960.webp').size < 200000);
console.log(`Verified ${files.length} static pages, internal links and anchors, CSP, local assets, byte-identical CV; initial JS ${maxScriptBytes} B gzip.`);
