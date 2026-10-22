import { content as data, selectedWork, projectArt, roboticsProfiles, ventureArt, ventureProfiles, activityProfiles, education, languages } from './editorial.js';

export const pages = {
  home: { label: 'Home', title: 'Patrizio Acquadro — Researcher & Builder', description: 'Robot learning at Purdue University. AI systems, independent ventures, and projects that bring people together.' },
  projects: { label: 'Projects', title: 'Projects — Patrizio Acquadro', description: 'Humanoid robotics, multimodal perception, AI systems, and software projects by Patrizio Acquadro.' },
  experience: { label: 'Experience', title: 'Experience — Patrizio Acquadro', description: 'Research experience at Purdue University, Politecnico di Milano, Milano-Bicocca, and Exprivia.' },
  ventures: { label: 'Ventures', title: 'Ventures — Patrizio Acquadro', description: 'BiellaInFesta, Adunet, and CubeWar: independent ventures in community, events, and software.' },
  activities: { label: 'Activities', title: 'Activities — Patrizio Acquadro', description: 'Speaking, community involvement, recognition, and learning beyond research.' },
  updates: { label: 'Updates', title: 'Updates — Patrizio Acquadro', description: 'Milestones and updates from research, engineering, and independent projects.' }
};

export const pageUrl = (page) => new URL(page === 'home' ? './' : `${page}/`, data.siteUrl).href;

export function renderDiscoveryFiles() {
  return {
    'robots.txt': `User-agent: *\nAllow: /\n\nSitemap: ${new URL('sitemap.xml', data.siteUrl).href}\n`,
    'sitemap.xml': `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${Object.keys(pages).map((page) => `<url><loc>${escapeHtml(pageUrl(page))}</loc><lastmod>${escapeHtml(data.lastUpdated)}</lastmod></url>`).join('')}</urlset>\n`
  };
}

export const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character]);
const e = escapeHtml;
const arrow = '<span aria-hidden="true">↗</span>';
const forward = '<span aria-hidden="true">→</span>';
const lineBreaks = (text) => e(text).replaceAll('\n', '<br>');

function link(href, label, className = 'text-link', context = '') {
  if (!/^(https?:\/\/|mailto:|tel:|\/(?!\/)|#)/.test(href)) throw new Error(`Unsupported link: ${href}`);
  const external = /^https?:\/\//.test(href);
  const name = `${label}${context ? ` — ${context}` : ''}${external ? ' (opens in a new tab)' : ''}`;
  return `<a class="${e(className)}" href="${e(href)}"${external ? ' target="_blank" rel="noopener noreferrer" referrerpolicy="no-referrer"' : ''}${external || context ? ` aria-label="${e(name)}"` : ''}>${e(label)}${external ? arrow : forward}</a>`;
}

function cvLink(version, className = 'text-link') {
  return `<a class="${className}" href="/cv/AcquadroPatrizioCV.pdf?v=${e(version)}" type="application/pdf" download="AcquadroPatrizioCV.pdf" aria-label="Download CV — Patrizio Acquadro (PDF)">Download CV <span aria-hidden="true">↓</span></a>`;
}

function header(page) {
  // Keep the fragment target in document flow, before the sticky header.
  return `<a class="skip-link" href="#main">Skip to main content</a>
    <div id="top" class="page-start" tabindex="-1"><span class="sr-only">Top of page</span></div>
    <header class="site-header"><div class="container header-inner">
      <a class="brand" href="/" aria-label="Patrizio Acquadro — Home"><img class="brand-mark" src="/brand/pa-monogram.svg" alt="" width="120" height="72" aria-hidden="true"><span>Patrizio Acquadro</span></a>
      <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="site-nav" hidden>Menu <span aria-hidden="true">+</span></button>
      <nav id="site-nav" aria-label="Primary navigation">${Object.entries(pages).filter(([key]) => key !== 'home').map(([key, value]) => `<a href="/${key}/"${key === page ? ' aria-current="page"' : ''}>${value.label}</a>`).join('')}<a class="nav-contact" href="#contact">Let’s talk ${forward}</a></nav>
    </div></header>`;
}

function contact(version) {
  const email = data.contactLinks.find((item) => item.href.startsWith('mailto:'));
  return `<footer id="contact" class="contact-section" tabindex="-1"><div class="container">
    <div class="contact-top"><p class="eyebrow">A conversation is a good start.</p><a class="back-top" href="#top">Back to top <span aria-hidden="true">↑</span></a></div>
    <div class="contact-main"><h2>Let’s build<br>something <em>meaningful.</em></h2><div class="contact-actions">
      ${link(email.href, 'Get in touch', 'button button-light')}
      <div class="email-copy"><a href="${e(email.href)}">${e(email.href.slice(7))}</a><button class="copy-email" type="button" data-email="${e(email.href.slice(7))}" aria-label="Copy email address" hidden>Copy</button></div><p class="copy-status" role="status" aria-live="polite"></p>
    </div></div>
    <div class="footer-bottom"><div class="social-links">${data.contactLinks.filter((item) => !item.href.startsWith('mailto:')).map((item) => link(item.href, item.label)).join('')}${cvLink(version)}</div>
      <div class="footer-note"><span>© ${new Date().getUTCFullYear()} Patrizio Acquadro</span><span>Last updated <time datetime="${e(data.lastUpdated)}">${new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric', timeZone: 'UTC' }).format(new Date(`${data.lastUpdated}T00:00:00Z`))}</time></span></div>
    </div></div></footer>`;
}

function sectionHead(number, title, description, href, action, id) {
  return `<div class="section-heading"><div><p class="eyebrow"><span class="section-number">${number}</span>${e(title)}</p><h2${id ? ` id="${id}"` : ''}><span class="sr-only">${e(title)}: </span>${lineBreaks(description)}</h2></div>${link(href, action)}</div>`;
}

function workPreview(work, index) {
  const item = data.projects.find((project) => project.id === work.id);
  return `<article class="work-preview${index === 0 ? ' work-preview-lead' : ''}"><a class="work-art-link" href="/projects/#${item.id}" aria-label="Explore ${e(item.title)}"><div class="art-frame art-${work.art}"><img src="/art/${work.art}.svg" width="960" height="640" loading="lazy" decoding="async" alt="${e(work.alt)}"><span class="art-index" aria-hidden="true">0${index + 1} / ${e(work.label)}</span></div></a><div class="work-preview-copy"><p class="eyebrow">${e(work.label)}</p><h3><a href="/projects/#${item.id}">${lineBreaks(work.title)} ${forward}</a></h3><p>${e(work.summary)}</p><div class="work-caption"><span>${e(item.title.split(' - ')[0])}</span><span>${e(item.timeframe)}</span></div></div></article>`;
}

function home(version) {
  const latest = data.research[0];
  return `<section class="hero container" aria-labelledby="hero-title">
    <div class="hero-topline"><p class="eyebrow"><span class="signal" aria-hidden="true"></span>Robot learning · Purdue University</p><span class="edition">Research · Engineering · Community</span></div>
    <div class="hero-grid"><div class="hero-copy"><h1 id="hero-title">Patrizio<br>Acquadro<span class="accent">.</span></h1><p class="hero-statement">I help robots learn, perceive, and act.<br><span>And build ideas into things people use.</span></p><div class="hero-actions">${link('/projects/', 'Explore my work', 'button')}${cvLink(version)}</div></div>
    <figure class="portrait"><div class="portrait-image"><img src="/images/PatrizioAcquadro-640.webp" srcset="/images/PatrizioAcquadro-320.webp 320w, /images/PatrizioAcquadro-640.webp 640w, /images/PatrizioAcquadro-960.webp 960w" sizes="(max-width: 700px) 82vw, 34vw" width="640" height="768" fetchpriority="high" decoding="async" data-fallback="/images/avatar-placeholder.svg" alt="Portrait of Patrizio Acquadro"></div><figcaption><span>Currently at Purdue University</span><span class="portrait-caption-role">R&D Assistant · Robot Learning</span></figcaption></figure></div>
    <div class="hero-bottom"><p>I’m an R&D Assistant in Robot Learning at Purdue University, working on humanoid manipulation and multimodal perception. Alongside research, I build digital products and initiatives that connect local communities.</p><a class="intro-contact text-link" href="#contact">Get in touch ${forward}</a><span class="scroll-cue" aria-hidden="true">Scroll to explore ↓</span></div>
  </section>
  <section class="section container" aria-labelledby="selected-work-title">${sectionHead('01', 'Selected work', 'Curiosity meets\nengineering.', '/projects/', 'All projects', 'selected-work-title')}<div class="selected-work">${selectedWork.map(workPreview).join('')}</div></section>
  <section class="experience-band section" aria-labelledby="experience-preview-title"><div class="container experience-preview"><div><p class="eyebrow"><span class="section-number">02</span>Experience</p><h2 id="experience-preview-title"><span class="sr-only">Experience: </span>Research, with<br><em>real-world questions.</em></h2><p class="section-intro">My work connects robot learning, manipulation, and multimodal perception. Before that: generative AI, applied machine learning, and quantum ML.</p>${link('/experience/', 'Explore my experience')}</div><div class="current-role"><span class="role-marker" aria-hidden="true">↗</span><p class="eyebrow">${e(latest.timeframe)}</p><h3>${e(latest.org)}</h3><p class="role-name">${e(latest.role)}</p><p>Building simulation and control infrastructure for the IHMC Alex humanoid, developing robot hearing, and mentoring two undergraduate researchers.</p><div class="institution-list"><span>Previously</span><span>Politecnico di Milano</span><span>Milano-Bicocca</span><span>Exprivia</span></div></div></div></section>
  <section class="section container" aria-labelledby="ventures-preview-title">${sectionHead('03', 'Independent ventures', 'Built for people.\nRooted in community.', '/ventures/', 'Explore the ventures', 'ventures-preview-title')}<div class="venture-previews"><a class="venture-preview bif-preview" href="/ventures/#bif" aria-label="Explore BiellaInFesta"><div class="venture-poster"><span class="poster-label">BiellaInFesta</span><span class="poster-word">Bringing<br>Biella<br><em>together.</em></span><span class="poster-bottom">Local events. Shared experiences. Real connections.</span></div><div class="venture-preview-info"><h3><span class="venture-name">BiellaInFesta</span>${forward}</h3><p>A local events platform grown through content, community, and a small team.</p><span class="metric-line"><strong>10k+</strong> followers <span aria-hidden="true">/</span> <strong>800k</strong> monthly views</span></div></a><a class="venture-preview adunet-preview" href="/ventures/#adunet" aria-label="Explore Adunet"><div class="venture-poster map-poster"><img src="/art/map.svg" width="960" height="640" loading="lazy" alt="Illustrative map with a route linking event locations."><span class="poster-label">Adunet</span><span class="map-title"><span>A city.</span><span>A festival.</span><em>A way around.</em></span></div><div class="venture-preview-info"><h3><span class="venture-name">Adunet</span>${forward}</h3><p>A mobile-first festival app that makes events, services, and places easier to discover.</p><span class="metric-line"><strong>8–10k</strong> festival visitors / day <span aria-hidden="true">/</span> <strong>50+</strong> venues</span></div></a></div></section>
  <section class="section community-section" aria-labelledby="activities-preview-title"><div class="container">${sectionHead('04', 'Beyond the lab', 'Ideas are better\nwhen they’re shared.', '/activities/', 'All activities', 'activities-preview-title')}<div class="activity-previews"><a href="/activities/#toyp-2026" class="award-preview" aria-label="Explore TOYP 2026 recognition"><span class="eyebrow">Recognition / Apr 2026</span><span class="award-type"><span class="award-word">TOYP</span><span>2026</span></span><h3>Talent Inspiring the Future ${forward}</h3><p>Winner in the volunteering category, recognizing the local impact of BIF and Adunet.</p></a><div class="speaking-preview"><p class="eyebrow">Speaking & community</p><h3>Making AI<br><em>part of the conversation.</em></h3><p>From public panels to discussions with physicians, I share practical AI concepts and help people explore how to use them.</p><div class="speaking-links">${link('/activities/#chiediamolo-ai', 'Chiediamolo all’AI')}${link('/activities/#asl-biella', 'ASL Biella')}${link('/activities/#jci-biella', 'JCI Biella')}</div></div></div></div></section>
  <section class="section container updates-preview" aria-labelledby="updates-preview-title">${sectionHead('05', 'Latest updates', 'Along the way.', '/updates/', 'All updates', 'updates-preview-title')}<ol class="update-list">${data.news.slice(0, 3).map((item) => update(item, true)).join('')}</ol></section>
  <aside class="quote-section container"><p class="personal-note">Beyond work: swimming, rock climbing, philosophy and fantasy literature.</p><blockquote><p>“The impediment to action advances action. What stands in the way becomes the way.”</p><cite>Marcus Aurelius</cite></blockquote></aside>`;
}

function pageIntro(number, label, title, intro) {
  return `<div class="page-intro container"><a href="/" class="breadcrumb">← Home</a><p class="eyebrow">${number} / ${e(label)}</p><h1>${lineBreaks(title)}<span class="accent">.</span></h1><p class="page-description">${e(intro)}</p></div>`;
}

function projectLinks(item) {
  const links = item.links?.length ? item.links : item.href ? [{ href: item.href, label: item.hrefLabel || 'Project link' }] : [];
  return links.length ? `<div class="project-links">${links.map((itemLink) => link(itemLink.href, itemLink.label, 'text-link', item.title)).join('')}</div>` : `<p class="project-status">${e(item.hrefLabel || 'Research in progress')}</p>`;
}

function project(item, index) {
  const work = projectArt[item.id];
  return `<article class="project-entry" id="${item.id}" data-record="project"><span class="entry-index" aria-hidden="true">${String(index + 1).padStart(2, '0')}</span><div class="project-entry-main"><div class="entry-title-row"><h3>${e(item.title)}</h3><span class="date-label">${e(item.timeframe)}</span></div><p class="entry-description">${e(item.built)}</p><ul class="tags" aria-label="Stack and tools">${item.stack.split(',').map((tag) => `<li>${e(tag.trim())}</li>`).join('')}</ul>${projectLinks(item)}</div>${work ? `<figure class="project-illustration"><img src="/art/${work.art}.svg" alt="${e(work.alt)}" width="960" height="640" loading="lazy"><figcaption>${e(work.caption)}</figcaption></figure>` : ''}</article>`;
}

function roboticsProject(item, index) {
  const profile = roboticsProfiles[item.id];
  const art = projectArt[item.id];
  return `<article class="robotics-project" id="${item.id}" data-record="project">
    <div class="research-topline"><p class="eyebrow"><span class="section-number">${String(index + 1).padStart(2, '0')}</span>${e(profile.focus)}</p><span class="date-label">${e(item.timeframe)}</span></div>
    <div class="research-layout"><div class="research-copy"><h3 aria-label="${e(item.title)}">${e(profile.name)}</h3><p class="research-headline">${lineBreaks(profile.headline)}</p><p class="research-overview">${e(profile.overview)}</p></div><figure class="project-illustration"><img src="/art/${art.art}.svg" alt="${e(art.alt)}" width="960" height="640" loading="lazy"><figcaption>${e(art.caption)}</figcaption></figure></div>
    <div class="research-details"><div><h4 class="eyebrow">${item.id === 'ego2grip' ? 'My role / Mentorship' : 'My contribution'}</h4><p>${e(profile.contribution)}</p></div><div class="research-direction"><h4 class="eyebrow">Long-term direction</h4><p>${e(profile.direction)}</p></div></div>
    <div class="research-footer"><ul class="tags" aria-label="Stack and tools">${item.stack.split(',').map((tag) => `<li>${e(tag.trim())}</li>`).join('')}</ul>${projectLinks(item)}</div>
  </article>`;
}

function projects() {
  const robotics = data.projects.filter((item) => item.robotics);
  const software = data.projects.filter((item) => !item.robotics);
  return `${pageIntro('01', 'Projects', 'Robotics at\nthe core', 'I build systems that help robots perceive, learn, and act. These research projects are the focus of my work, supported by a broader practice in AI engineering and software.')}<div class="container page-body"><nav class="page-jump" aria-label="Project categories"><a class="category-primary" href="#robotics">Robotics <span>${String(robotics.length).padStart(2, '0')} / Core research</span></a><a href="#ai-software">AI & Software <span>${String(software.length).padStart(2, '0')}</span></a></nav>
    <section class="project-group robotics-group" aria-labelledby="robotics"><div class="robotics-heading"><div><p class="eyebrow">Primary focus</p><h2 id="robotics">Robotics</h2></div><p>From sensing the world to interacting with it.<br>Five connected directions in embodied intelligence.</p></div><nav class="research-index" aria-label="Robotics projects">${robotics.map((item, index) => `<a href="#${item.id}"><span>${String(index + 1).padStart(2, '0')}</span>${e(roboticsProfiles[item.id].name)}<span aria-hidden="true">↓</span></a>`).join('')}</nav>${robotics.map(roboticsProject).join('')}</section>
    <section class="project-group software-group" aria-labelledby="ai-software"><div class="group-heading"><div><p class="eyebrow">Beyond robotics</p><h2 id="ai-software">AI & Software</h2></div><span>${String(software.length).padStart(2, '0')} projects</span></div>${software.map((item) => project(item, data.projects.indexOf(item))).join('')}</section><div class="page-end-note"><p>More code, experiments, and documentation.</p>${link('https://github.com/PatrizioAcquadro?tab=repositories', 'Explore my GitHub')}</div></div>`;
}

const bullets = (items) => `<ul class="detail-list">${items.map((text) => `<li>${e(text)}</li>`).join('')}</ul>`;

function experience(version) {
  return `${pageIntro('02', 'Experience', 'Research &\neducation', 'Research at Purdue University, Politecnico di Milano, Milano-Bicocca and Exprivia, alongside two master’s degrees focused on AI. My current work connects humanoid manipulation and multimodal perception.')}<div class="container page-body"><section aria-labelledby="research-history"><div class="group-heading"><h2 id="research-history">Research experience</h2><span>2024 — Present</span></div><div class="experience-timeline">${data.research.map((item, index) => `<article class="experience-entry${item.org === 'Purdue University' ? ' experience-entry-purdue' : ''}" id="${item.id}" data-record="research"><div class="timeline-date"><span class="timeline-dot${index === 0 ? ' current' : ''}" aria-hidden="true"></span><span>${e(item.timeframe)}</span>${index === 0 ? '<span class="current-label">Current</span>' : ''}</div><div class="experience-detail"><h3>${e(item.org)}</h3><p class="role-name">${e(item.role)}</p>${bullets(item.bullets)}${item.href ? link(item.href, item.org === 'Purdue University' ? 'Thesis page' : 'Project link', 'text-link', `${item.role} at ${item.org}`) : ''}</div></article>`).join('')}</div></section><section class="education-section" aria-labelledby="education-title"><p class="eyebrow">Degrees & exchange</p><h2 id="education-title">Academic foundations.</h2><div class="education-grid">${education.map((item) => `<article id="${item.id}" data-record="education"><span class="date-label">${e(item.timeframe)}</span><h3 aria-label="${e(item.institution)}">${lineBreaks(item.displayInstitution)}</h3><p class="degree-name">${e(item.degree)}</p>${item.notes.map((note) => `<p>${e(note)}</p>`).join('')}</article>`).join('')}</div><div class="education-actions"><p><strong>Languages</strong><br>${e(languages)}</p>${cvLink(version)}</div></section></div>`;
}

function ventureVisual(item, index) {
  const art = ventureArt[item.id];
  return `<div class="venture-detail-aside"><div class="venture-detail-meta"><span class="entry-index">0${index + 1}</span><p class="date-label">${e(item.timeframe)}</p></div><figure class="venture-illustration"><img src="/art/${art.art}.svg" alt="${e(art.alt)}" width="960" height="640" loading="lazy" decoding="async"><figcaption>${e(art.caption)}</figcaption></figure></div>`;
}

function ventures() {
  return `${pageIntro('03', 'Ventures', 'Independent\nventures', 'I turn ideas into products and shared experiences: a local events community, a festival navigation app, and an early multiplayer gaming venture.')}<div class="container page-body venture-details">${data.ventures.map((item, index) => {
    const profile = ventureProfiles[item.id];
    return `<article class="venture-detail" id="${item.id}" data-record="venture">${ventureVisual(item, index)}<div class="venture-detail-main"><p class="eyebrow">${e(item.role)}</p><h2 aria-label="${e(item.name)}">${e(profile.name)}</h2><p class="venture-purpose">${e(profile.purpose)}</p>${bullets(item.bullets)}<div class="venture-metrics">${profile.metrics.map(([value, label]) => `<p><strong>${e(value)}</strong><span>${e(label)}</span></p>`).join('')}</div></div></article>`;
  }).join('')}</div>`;
}

function activities() {
  return `${pageIntro('04', 'Activities', 'Beyond\nthe lab', 'Public speaking, community leadership, volunteering and recognition. These activities reflect how I share what I learn and contribute beyond research.')}<div class="container page-body"><div class="activities-list">${data.activities.map((item, index) => {
    const profile = activityProfiles[item.id];
    return `<article class="activity-entry${index === 0 ? ' activity-entry-featured' : ''}" id="${item.id}" data-record="activity"><div class="activity-date"><span class="entry-index" aria-hidden="true">${String(index + 1).padStart(2, '0')}</span><span class="date-label">${e(item.timeframe)}</span></div><div><p class="eyebrow activity-category">${e(profile.category)}</p><h2 aria-label="${e(item.title)}">${e(profile.title)}</h2><p>${e(item.text)}</p></div>${index === 0 ? '<span class="activity-seal" aria-hidden="true">TOYP<br><em>2026</em></span>' : ''}</article>`;
  }).join('')}</div></div>`;
}

function update(item, preview = false) {
  return `<li class="update-entry" id="${preview ? 'preview-' : ''}${item.id}"${preview ? '' : ' data-record="news"'}><time datetime="${e(item.isoDate)}">${e(item.dateLabel)}</time><div><p>${e(item.text)}</p>${preview ? link(`/updates/#${item.id}`, 'Read update', 'update-link', item.dateLabel) : ''}</div>${preview ? '' : '<span class="update-dot" aria-hidden="true"></span>'}</li>`;
}

function updates() {
  return `${pageIntro('05', 'Updates', 'Updates &\nmilestones', 'Research milestones, projects shipped, and new beginnings. A chronological record of what I’ve been working on.')}<div class="container page-body updates-body"><ol class="update-list full-updates">${data.news.map((item) => update(item)).join('')}</ol></div>`;
}

export function renderDocument(template, page, { cvVersion = '' } = {}) {
  if (!(page in pages)) throw new Error(`Unknown page: ${page}`);
  const renderers = { home, projects, experience, ventures, activities, updates };
  const values = {
    title: e(pages[page].title), description: e(pages[page].description), page,
    url: e(pageUrl(page)), image: e(new URL('og/og-cover.png', data.siteUrl).href),
    body: `${header(page)}<main id="main" tabindex="-1">${renderers[page](cvVersion)}</main>${contact(cvVersion)}`
  };
  return template.replace(/\{\{(title|description|page|body|url|image)\}\}/g, (_, key) => values[key]);
}
