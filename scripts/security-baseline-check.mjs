import fs from 'node:fs';
import path from 'node:path';

const repoRoot = process.cwd();
const errors = [];

const htmlPolicyTargets = [
  { path: 'index.html', frameDirective: "frame-src 'none'", objectDirective: "object-src 'none'" },
  { path: 'cv/index.html', frameDirective: "frame-src 'none'", objectDirective: "object-src 'none'" },
  { path: 'dist/index.html', frameDirective: "frame-src 'none'", objectDirective: "object-src 'none'" },
  { path: 'dist/cv/index.html', frameDirective: "frame-src 'none'", objectDirective: "object-src 'none'" }
];

const requiredCspDirectives = [
  "default-src 'none'",
  "script-src 'self'",
  "style-src 'self'",
  "img-src 'self' data:",
  "font-src 'self'",
  "connect-src 'none'",
  "form-action 'none'",
  "base-uri 'none'",
  "worker-src 'none'",
  "manifest-src 'self'",
  "media-src 'self'",
  'upgrade-insecure-requests'
];

const trackerPatterns = [
  /googletagmanager\.com/i,
  /google-analytics\.com/i,
  /plausible\.io/i,
  /segment\.com/i,
  /mixpanel/i,
  /hotjar/i,
  /fullstory/i,
  /clarity\.ms/i,
  /doubleclick\.net/i,
  /facebook\.net\/en_US\/fbevents/i
];

const dangerousSinkPatterns = [
  /\binnerHTML\b/,
  /\binsertAdjacentHTML\b/,
  /\beval\s*\(/,
  /\bnew\s+Function\s*\(/
];

const assetLinkRels = new Set(['stylesheet', 'preload', 'modulepreload', 'icon', 'manifest', 'apple-touch-icon']);

function readText(relativePath) {
  const fullPath = path.join(repoRoot, relativePath);
  if (!fs.existsSync(fullPath)) {
    errors.push(`Missing required file: ${relativePath}`);
    return '';
  }

  return fs.readFileSync(fullPath, 'utf8');
}

function extractAttr(tag, attr) {
  const regex = new RegExp(`${attr}\\s*=\\s*(?:"([^"]*)"|'([^']*)'|([^\\s>]+))`, 'i');
  const match = tag.match(regex);
  if (!match) {
    return '';
  }

  return match[1] || match[2] || match[3] || '';
}

function extractTags(html, tagName) {
  const regex = new RegExp(`<${tagName}\\b[^>]*>`, 'gi');
  return html.match(regex) || [];
}

function hasExternalUrl(value) {
  const normalized = value.trim();
  return normalized.startsWith('http://') || normalized.startsWith('https://') || normalized.startsWith('//');
}

function isFirstPartyAsset(value) {
  const normalized = value.trim();
  if (!normalized || normalized.startsWith('#') || normalized.startsWith('data:')) {
    return true;
  }

  if (normalized.startsWith('/') || normalized.startsWith('./') || normalized.startsWith('../')) {
    return true;
  }

  if (hasExternalUrl(normalized)) {
    return false;
  }

  if (/^[a-zA-Z][a-zA-Z0-9+.-]*:/.test(normalized)) {
    return false;
  }

  return true;
}

function assertCspAndReferrer(relativePath, frameDirective, objectDirective) {
  const html = readText(relativePath);
  if (!html) {
    return;
  }

  const metaTags = extractTags(html, 'meta');
  const cspTag = metaTags.find((tag) => extractAttr(tag, 'http-equiv').toLowerCase() === 'content-security-policy');
  if (!cspTag) {
    errors.push(`Missing CSP meta tag in ${relativePath}`);
    return;
  }

  const cspContent = extractAttr(cspTag, 'content');
  const directives = [...requiredCspDirectives, frameDirective, objectDirective];
  directives.forEach((directive) => {
    if (!cspContent.includes(directive)) {
      errors.push(`CSP in ${relativePath} is missing directive: ${directive}`);
    }
  });

  const referrerTag = metaTags.find((tag) => extractAttr(tag, 'name').toLowerCase() === 'referrer');
  if (!referrerTag) {
    errors.push(`Missing referrer meta tag in ${relativePath}`);
    return;
  }

  const referrerContent = extractAttr(referrerTag, 'content').toLowerCase();
  if (referrerContent !== 'no-referrer') {
    errors.push(`Referrer policy must be no-referrer in ${relativePath}`);
  }
}

function assertHtmlAssetPolicies(relativePath) {
  const html = readText(relativePath);
  if (!html) {
    return;
  }

  const scripts = extractTags(html, 'script');
  scripts.forEach((tag) => {
    const src = extractAttr(tag, 'src');
    if (!src) {
      return;
    }

    if (hasExternalUrl(src)) {
      errors.push(`External script URL found in ${relativePath}: ${src}`);
    }

    if (!isFirstPartyAsset(src)) {
      errors.push(`Non-first-party script URL found in ${relativePath}: ${src}`);
    }
  });

  const links = extractTags(html, 'link');
  links.forEach((tag) => {
    const href = extractAttr(tag, 'href');
    if (!href) {
      return;
    }

    const rel = extractAttr(tag, 'rel').toLowerCase();
    const relTokens = rel.split(/\s+/).filter(Boolean);
    const asValue = extractAttr(tag, 'as').toLowerCase();
    const isAssetLink = relTokens.some((token) => assetLinkRels.has(token)) || asValue === 'font' || asValue === 'style';

    if (!isAssetLink) {
      return;
    }

    if (hasExternalUrl(href)) {
      errors.push(`External style/font/asset URL found in ${relativePath}: ${href}`);
    }

    if (!isFirstPartyAsset(href)) {
      errors.push(`Non-first-party link asset URL found in ${relativePath}: ${href}`);
    }
  });

  ['img', 'object', 'audio', 'video', 'source', 'iframe'].forEach((tagName) => {
    const tags = extractTags(html, tagName);
    tags.forEach((tag) => {
      const attr = tagName === 'object' ? 'data' : 'src';
      const value = extractAttr(tag, attr);
      if (!value) {
        return;
      }

      if (!isFirstPartyAsset(value)) {
        errors.push(`Non-first-party ${tagName} ${attr} in ${relativePath}: ${value}`);
      }
    });
  });
}

function walkFiles(relativeDir, extensions) {
  const start = path.join(repoRoot, relativeDir);
  if (!fs.existsSync(start)) {
    return [];
  }

  const found = [];
  const stack = [start];

  while (stack.length > 0) {
    const current = stack.pop();
    const entries = fs.readdirSync(current, { withFileTypes: true });

    entries.forEach((entry) => {
      const fullPath = path.join(current, entry.name);
      if (entry.isDirectory()) {
        stack.push(fullPath);
        return;
      }

      if (!extensions.some((ext) => entry.name.endsWith(ext))) {
        return;
      }

      found.push(path.relative(repoRoot, fullPath));
    });
  }

  return found;
}

function assertNoExternalCssImports() {
  const cssFiles = [
    ...walkFiles('src/styles', ['.css']),
    ...walkFiles('dist/assets', ['.css'])
  ];

  cssFiles.forEach((relativePath) => {
    const content = readText(relativePath);
    if (!content) {
      return;
    }

    const importRegex = /@import\s+(?:url\()?['"]?([^'"\)\s]+)['"]?\)?/gi;
    let match;
    while ((match = importRegex.exec(content)) !== null) {
      const importPath = match[1];
      if (hasExternalUrl(importPath)) {
        errors.push(`External CSS import found in ${relativePath}: ${importPath}`);
      }
    }
  });
}

function assertNoTrackers() {
  const filesToScan = [
    'index.html',
    'cv/index.html',
    ...walkFiles('src', ['.js', '.css', '.html']),
    ...walkFiles('dist', ['.js', '.css', '.html'])
  ];

  const uniqueFiles = [...new Set(filesToScan)];
  uniqueFiles.forEach((relativePath) => {
    const content = readText(relativePath);
    if (!content) {
      return;
    }

    trackerPatterns.forEach((pattern) => {
      if (pattern.test(content)) {
        errors.push(`Potential tracker pattern ${pattern} found in ${relativePath}`);
      }
    });
  });
}

function assertNoDangerousSinks() {
  const jsFiles = walkFiles('src', ['.js']);
  jsFiles.forEach((relativePath) => {
    const content = readText(relativePath);
    if (!content) {
      return;
    }

    const lines = content.split('\n');
    lines.forEach((line, index) => {
      if (line.includes('security-baseline-allowlist')) {
        return;
      }

      dangerousSinkPatterns.forEach((pattern) => {
        if (pattern.test(line)) {
          errors.push(`Dangerous sink ${pattern} in ${relativePath}:${index + 1}`);
        }
      });
    });
  });
}

htmlPolicyTargets.forEach((target) => {
  assertCspAndReferrer(target.path, target.frameDirective, target.objectDirective);
  assertHtmlAssetPolicies(target.path);
});
assertNoExternalCssImports();
assertNoTrackers();
assertNoDangerousSinks();

if (errors.length > 0) {
  console.error('Security baseline check failed:');
  errors.forEach((error) => {
    console.error(`- ${error}`);
  });
  process.exit(1);
}

console.log('Security baseline check passed.');
