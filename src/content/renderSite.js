const escapes = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };

export function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (character) => escapes[character]);
}

export function assetPath(base, file) {
  return `${base.endsWith('/') ? base : `${base}/`}${file}`;
}

export function formatUpdated(isoDate) {
  const date = new Date(`${isoDate}T00:00:00Z`);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(isoDate) || Number.isNaN(date.valueOf()) || date.toISOString().slice(0, 10) !== isoDate) {
    throw new Error('lastUpdated must be a valid ISO date (YYYY-MM-DD).');
  }
  return new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric', timeZone: 'UTC' }).format(date);
}

function link(href, label, className, context = label) {
  if (!/^(https?:\/\/|mailto:|tel:|#|\/(?!\/))/.test(href)) {
    throw new Error(`Unsupported link: ${href}`);
  }
  const external = /^https?:\/\//.test(href);
  const accessibleLabel = `${label}${context === label ? '' : ` — ${context}`} (opens in a new tab)`;
  const attributes = external
    ? ` target="_blank" rel="noopener noreferrer" referrerpolicy="no-referrer" aria-label="${escapeHtml(accessibleLabel)}"`
    : '';
  return `<a class="${className}" href="${escapeHtml(href)}"${attributes}>${escapeHtml(label)}</a>`;
}

const badge = (text) => `<p class="card-meta"><span class="c-badge">${escapeHtml(text)}</span></p>`;
const bullets = (items) => `<ul class="card-list">${items.map((text) => `<li>${escapeHtml(text)}</li>`).join('')}</ul>`;

function renderProject(item) {
  const stack = item.stack.split(',').map((text) => text.trim()).filter(Boolean);
  const links = item.links?.length ? item.links : item.href ? [{ href: item.href, label: item.hrefLabel || 'Project link' }] : [];
  return `<article class="c-card content-card project-card"><h4>${escapeHtml(item.title)}</h4>${badge(item.timeframe)}<p class="card-body">${escapeHtml(item.built)}</p><p class="card-meta">Stack / Tools</p><ul class="stack-list">${stack.map((text) => `<li class="c-badge">${escapeHtml(text)}</li>`).join('')}</ul>${links.length ? `<div class="card-links">${links.map((itemLink) => link(itemLink.href, itemLink.label || 'Project link', 'card-link', item.title)).join('')}</div>` : `<p class="card-link-placeholder">${escapeHtml(item.hrefLabel || 'Link coming soon')}</p>`}</article>`;
}

export function renderSite(template, data, { base = '/', cvVersion, year = new Date().getUTCFullYear() } = {}) {
  const siteUrl = new URL(base, data.siteUrl).href;
  const contacts = [...data.contactLinks];
  if (data.privacyExposure.showPhone && data.privacyExposure.phoneHref) {
    contacts.push({ label: data.privacyExposure.phoneLabel, href: data.privacyExposure.phoneHref });
  }
  const mailto = contacts.find((item) => item.href.startsWith('mailto:'))?.href || '';
  const email = decodeURIComponent(mailto.slice(7).split('?')[0]);
  const slots = {
    'site-url': escapeHtml(siteUrl),
    'og-image': escapeHtml(new URL('og/og-cover.png', siteUrl).href),
    'cv-version': escapeHtml(cvVersion || ''),
    'hero-name': escapeHtml(data.name),
    'hero-tagline': escapeHtml(data.positioning),
    'hero-bio': escapeHtml(data.bio),
    'profile-source': escapeHtml(assetPath(base, 'images/PatrizioAcquadro-640.webp')),
    'profile-srcset': [320, 640, 960].map((width) => `${escapeHtml(assetPath(base, `images/PatrizioAcquadro-${width}.webp`))} ${width}w`).join(', '),
    'mail-email': escapeHtml(email),
    'mail-href': escapeHtml(mailto),
    'last-updated': `<time datetime="${escapeHtml(data.lastUpdated)}">Last updated: ${formatUpdated(data.lastUpdated)}</time>`,
    'current-year': String(year),
    news: [...data.news].sort((a, b) => b.isoDate.localeCompare(a.isoDate)).map((item) =>
      `<li class="news-item c-timeline-item"><time class="news-date" datetime="${escapeHtml(item.isoDate)}">${escapeHtml(item.dateLabel)}</time>${item.href ? link(item.href, item.text, 'news-link') : `<p class="news-text">${escapeHtml(item.text)}</p>`}</li>`
    ).join(''),
    research: data.research.map((item) => {
      const title = `${item.role} | ${item.org}`;
      const label = item.org === 'Purdue University' ? 'Thesis page' : 'Project link';
      return `<article class="c-card content-card research-card"><h3>${escapeHtml(title)}</h3>${badge(item.timeframe)}${bullets(item.bullets)}${item.href ? link(item.href, label, 'card-link', title) : ''}</article>`;
    }).join(''),
    'robotics-projects': data.projects.filter((item) => item.robotics).map(renderProject).join(''),
    projects: data.projects.filter((item) => !item.robotics).map(renderProject).join(''),
    ventures: data.ventures.map((item) =>
      `<article class="c-card content-card venture-card"><h3>${escapeHtml(`${item.name} | ${item.role}`)}</h3>${badge(item.timeframe)}${bullets(item.bullets)}</article>`
    ).join(''),
    activities: data.activities.map((item) =>
      `<li class="talk-item c-timeline-item"><h3 class="talk-title">${escapeHtml(item.title)}</h3><p class="talk-date">${escapeHtml(item.timeframe)}</p><p class="card-body">${escapeHtml(item.text)}</p></li>`
    ).join(''),
    contacts: contacts.map((item) => `<li class="contact-item">${link(item.href, item.label, 'contact-link')}</li>`).join('')
  };
  return template.replace(/\{\{site:([a-z-]+)\}\}/g, (_, slot) => {
    if (!(slot in slots)) throw new Error(`Unknown content slot: ${slot}`);
    return slots[slot];
  });
}

export function renderDiscoveryFiles(data, base = '/') {
  formatUpdated(data.lastUpdated);
  const siteUrl = new URL(base, data.siteUrl).href;
  return {
    'robots.txt': `User-agent: *\nAllow: /\nSitemap: ${siteUrl}sitemap.xml\n`,
    'sitemap.xml': `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>${escapeHtml(siteUrl)}</loc><lastmod>${data.lastUpdated}</lastmod></url></urlset>\n`
  };
}
