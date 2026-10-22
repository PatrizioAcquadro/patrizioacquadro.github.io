import assert from 'node:assert/strict';
import { readFileSync, existsSync, statSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { gzipSync } from 'node:zlib';
import { pages } from '../src/content/render.js';

const cv = readFileSync('public/cv/AcquadroPatrizioCV.pdf');
const version = createHash('sha256').update(cv).digest('hex').slice(0, 12);
const files = Object.keys(pages).map((key) => key === 'home' ? 'index.html' : `${key}/index.html`);
const scripts = new Set();
let maxScriptBytes = 0;

for (const file of files) {
  const html = readFileSync(`dist/${file}`, 'utf8');
  assert.ok(!/\{\{|%BASE_URL%/.test(html), `Unresolved placeholders: ${file}`);
  assert.ok(html.includes('content="noindex, nofollow"'), `Missing noindex: ${file}`);
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
  for (const match of html.matchAll(/<(?:img|link|script)\b[^>]*(?:src|href)="(https?:[^\"]+)"/g)) assert.fail(`External asset: ${match[1]}`);
}
assert.deepEqual(readFileSync('dist/cv/AcquadroPatrizioCV.pdf'), cv);
assert.ok(statSync('dist/images/PatrizioAcquadro-960.webp').size < 200000);
console.log(`Verified ${files.length} static pages, internal links and anchors, CSP, local assets, byte-identical CV; initial JS ${maxScriptBytes} B gzip.`);
