import { siteData } from './content/siteData.js';

const baseUrl = '/';

function enforceFrameProtection() {
  if (window.top === window.self) {
    return false;
  }

  // Best-effort anti-clickjacking for GitHub Pages, where defensive headers are limited.
  document.documentElement.setAttribute('hidden', '');

  try {
    window.top.location = window.self.location.href;
    return true;
  } catch (error) {
    document.documentElement.removeAttribute('hidden');

    if (document.body) {
      while (document.body.firstChild) {
        document.body.removeChild(document.body.firstChild);
      }

      const warning = document.createElement('p');
      warning.className = 'frame-guard-message';
      warning.setAttribute('role', 'alert');
      warning.textContent = 'This page cannot be embedded in another site.';
      document.body.append(warning);
    }

    return true;
  }
}

const blockedByFrameProtection = enforceFrameProtection();

const heroName = document.getElementById('hero-name');
const heroTagline = document.getElementById('hero-tagline');
const heroBio = document.getElementById('hero-bio');
const profileImage = document.getElementById('profile-image');
const contactList = document.getElementById('contact-list');
const privacyNote = document.getElementById('privacy-note');
const newsList = document.getElementById('news-list');
const researchList = document.getElementById('research-list');
const projectsGrid = document.getElementById('projects-grid');
const ventureList = document.getElementById('venture-list');
const skillsGrid = document.getElementById('skills-grid');
const talksList = document.getElementById('talks-list');
const lastUpdated = document.getElementById('last-updated');
const currentYear = document.getElementById('current-year');

function addExternalLinkAttributes(anchor, href, label) {
  if (!href.startsWith('http')) {
    return;
  }

  anchor.target = '_blank';
  anchor.rel = 'noopener noreferrer';
  anchor.referrerPolicy = 'no-referrer';
  anchor.setAttribute('aria-label', `${label} (opens in a new tab)`);
}

function createTag(tagName, className, textContent) {
  const node = document.createElement(tagName);

  if (className) {
    node.className = className;
  }

  if (textContent) {
    node.textContent = textContent;
  }

  return node;
}

function createMetaBadge(textContent) {
  const wrapper = createTag('p', 'card-meta');
  const badge = createTag('span', 'c-badge', textContent);
  wrapper.append(badge);
  return wrapper;
}

function setImageWithFallback(imageEl, sources) {
  let index = 0;

  function tryNextSource() {
    if (index >= sources.length) {
      imageEl.removeEventListener('error', tryNextSource);
      return;
    }

    imageEl.src = sources[index];
    index += 1;
  }

  imageEl.addEventListener('error', tryNextSource);
  tryNextSource();
}

function renderHero() {
  heroName.textContent = siteData.name;
  heroTagline.textContent = siteData.positioning;
  heroBio.textContent = siteData.bio;
  setImageWithFallback(profileImage, [
    `${baseUrl}images/PatrizioAcquadro.png`,
    `${baseUrl}public/images/PatrizioAcquadro.png`,
    `${baseUrl}images/avatar-placeholder.svg`,
    `${baseUrl}public/images/avatar-placeholder.svg`
  ]);
}

function renderContacts() {
  function appendContactLink(label, href) {
    const listItem = createTag('li', 'contact-item');
    const link = createTag('a', 'contact-link', label);
    link.href = href;
    addExternalLinkAttributes(link, href, label);
    listItem.append(link);
    contactList.append(listItem);
  }

  siteData.contactLinks.forEach((item) => {
    appendContactLink(item.label, item.href);
  });

  if (siteData.privacyExposure.showPhone && siteData.privacyExposure.phoneHref) {
    appendContactLink(siteData.privacyExposure.phoneLabel, siteData.privacyExposure.phoneHref);
  }

  if (privacyNote) {
    privacyNote.textContent = siteData.privacyExposure.note;
  }
}

function renderNews() {
  const sortedNews = [...siteData.news].sort((a, b) => new Date(b.isoDate) - new Date(a.isoDate));

  sortedNews.forEach((item) => {
    const listItem = createTag('li', 'news-item c-timeline-item');
    const date = createTag('time', 'news-date', item.dateLabel);
    date.dateTime = item.isoDate;
    listItem.append(date);

    if (item.href) {
      const link = createTag('a', 'news-link', item.text);
      link.href = item.href;
      addExternalLinkAttributes(link, item.href, `News item from ${item.dateLabel}`);
      listItem.append(link);
    } else {
      const text = createTag('p', 'news-text', item.text);
      listItem.append(text);
    }

    newsList.append(listItem);
  });
}

function renderResearch() {
  const thesisCard = createTag('article', 'c-card content-card research-card');
  const thesisTitle = createTag('h3', '', siteData.thesis.title);
  const thesisText = createTag('p', 'card-body', siteData.thesis.text);
  const thesisLink = createTag('a', 'card-link', 'Thesis page');
  thesisLink.href = siteData.thesis.href;
  addExternalLinkAttributes(thesisLink, siteData.thesis.href, 'Current thesis work');

  thesisCard.append(thesisTitle, thesisText, thesisLink);
  researchList.append(thesisCard);

  siteData.research.forEach((item) => {
    const card = createTag('article', 'c-card content-card research-card');
    const title = createTag('h3', '', `${item.role} | ${item.org}`);
    const timeframe = createMetaBadge(item.timeframe);
    const bulletList = createTag('ul', 'card-list');

    item.bullets.forEach((bullet) => {
      bulletList.append(createTag('li', '', bullet));
    });

    card.append(title, timeframe, bulletList);

    if (item.href) {
      const link = createTag('a', 'card-link', 'Project link');
      link.href = item.href;
      addExternalLinkAttributes(link, item.href, `${item.role} link`);
      card.append(link);
    }

    researchList.append(card);
  });
}

function renderProjects() {
  siteData.projects.forEach((item) => {
    const card = createTag('article', 'c-card content-card project-card');
    const title = createTag('h3', '', item.title);
    const timeframe = createMetaBadge(item.timeframe);
    const built = createTag('p', 'card-body', item.built);
    const stackLabel = createTag('p', 'card-meta', 'Stack / Tools');
    const stackList = createTag('ul', 'stack-list');

    item.stack
      .split(',')
      .map((stackItem) => stackItem.trim())
      .filter(Boolean)
      .forEach((stackItem) => {
        const badgeItem = createTag('li', 'c-badge', stackItem);
        stackList.append(badgeItem);
      });

    card.append(title, timeframe, built, stackLabel, stackList);

    if (item.href) {
      const link = createTag('a', 'card-link', item.hrefLabel || 'Project link');
      link.href = item.href;
      addExternalLinkAttributes(link, item.href, `${item.title} link`);
      card.append(link);
    } else {
      card.append(createTag('p', 'card-link-placeholder', item.hrefLabel || 'Link coming soon'));
    }

    projectsGrid.append(card);
  });
}

function renderVentures() {
  siteData.ventures.forEach((item) => {
    const card = createTag('article', 'c-card content-card venture-card');
    const title = createTag('h3', '', `${item.name} | ${item.role}`);
    const timeframe = createMetaBadge(item.timeframe);
    const bulletList = createTag('ul', 'card-list');

    item.bullets.forEach((bullet) => {
      bulletList.append(createTag('li', '', bullet));
    });

    card.append(title, timeframe, bulletList);
    ventureList.append(card);
  });
}

function renderSkills() {
  siteData.skills.forEach((group) => {
    const card = createTag('article', 'c-card content-card skill-card');
    const title = createTag('h3', '', group.group);
    const list = createTag('ul', 'skill-list');

    group.items.forEach((item) => {
      list.append(createTag('li', 'skill-pill c-badge', item));
    });

    card.append(title, list);
    skillsGrid.append(card);
  });
}

function renderActivities() {
  siteData.activities.forEach((item) => {
    const listItem = createTag('li', 'talk-item c-timeline-item');
    const title = createTag('h3', 'talk-title', item.title);
    const timeframe = createTag('p', 'talk-date', item.timeframe);
    const text = createTag('p', 'card-body', item.text);

    listItem.append(title, timeframe, text);
    talksList.append(listItem);
  });
}

function initializeMobileMenu() {
  const navbar = document.querySelector('.c-navbar');
  const menuToggle = document.getElementById('menu-toggle');
  const panel = document.getElementById('primary-nav-panel');

  if (!navbar || !menuToggle || !panel) {
    return;
  }

  navbar.classList.add('is-enhanced');

  function isOpen() {
    return navbar.getAttribute('data-menu-open') === 'true';
  }

  function setOpenState(open) {
    navbar.setAttribute('data-menu-open', open ? 'true' : 'false');
    menuToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    menuToggle.setAttribute('aria-label', open ? 'Close navigation menu' : 'Open navigation menu');
  }

  function closeMenu(restoreFocus = false) {
    if (!isOpen()) {
      return;
    }

    setOpenState(false);

    if (restoreFocus) {
      menuToggle.focus();
    }
  }

  menuToggle.addEventListener('click', () => {
    setOpenState(!isOpen());
  });

  panel.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      closeMenu(false);
    });
  });

  document.addEventListener('click', (event) => {
    if (!isOpen()) {
      return;
    }

    if (navbar.contains(event.target)) {
      return;
    }

    closeMenu(false);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeMenu(true);
    }
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 1120) {
      setOpenState(false);
    }
  });

  setOpenState(false);
}

function initializeActiveSectionIndicator() {
  const navLinks = [...document.querySelectorAll('.c-navbar__link[href^="#"]')];

  if (navLinks.length === 0) {
    return;
  }

  const sectionEntries = navLinks
    .map((link) => {
      const targetId = link.getAttribute('href')?.slice(1) || '';
      const target = document.getElementById(targetId);

      if (!targetId || !target) {
        return null;
      }

      return { targetId, target, link };
    })
    .filter(Boolean);

  if (sectionEntries.length === 0) {
    return;
  }

  function setActive(targetId) {
    navLinks.forEach((link) => {
      link.removeAttribute('aria-current');
    });

    const active = sectionEntries.find((entry) => entry.targetId === targetId);
    if (active) {
      active.link.setAttribute('aria-current', 'page');
    }
  }

  const initialHash = window.location.hash.slice(1);
  const defaultTarget = initialHash || sectionEntries[0].targetId;
  setActive(defaultTarget);

  function getScrollActivationOffset() {
    const navbar = document.querySelector('.c-navbar');
    const navbarHeight = navbar ? navbar.getBoundingClientRect().height : 0;
    return navbarHeight + 24;
  }

  function updateActiveSectionFromScroll() {
    const activationOffset = getScrollActivationOffset();
    const scrollPosition = window.scrollY + activationOffset;
    let activeTargetId = sectionEntries[0].targetId;

    sectionEntries.forEach((entry, index) => {
      const sectionStart = entry.target.offsetTop;
      const nextSectionStart =
        index < sectionEntries.length - 1 ? sectionEntries[index + 1].target.offsetTop : Number.POSITIVE_INFINITY;

      if (scrollPosition >= sectionStart && scrollPosition < nextSectionStart) {
        activeTargetId = entry.targetId;
      }
    });

    const isAtBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
    if (isAtBottom) {
      activeTargetId = sectionEntries[sectionEntries.length - 1].targetId;
    }

    setActive(activeTargetId);
  }

  let isTicking = false;
  function requestActiveSectionUpdate() {
    if (isTicking) {
      return;
    }

    isTicking = true;
    window.requestAnimationFrame(() => {
      updateActiveSectionFromScroll();
      isTicking = false;
    });
  }

  window.addEventListener('scroll', requestActiveSectionUpdate, { passive: true });
  window.addEventListener('resize', requestActiveSectionUpdate);

  window.addEventListener('hashchange', () => {
    requestActiveSectionUpdate();
  });

  requestActiveSectionUpdate();
}

function initializeRevealAnimations() {
  const items = [...document.querySelectorAll('.reveal')];
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (items.length === 0) {
    return;
  }

  if (reducedMotion || !('IntersectionObserver' in window)) {
    document.documentElement.removeAttribute('data-motion');
    items.forEach((item) => item.classList.add('is-visible'));
    return;
  }

  document.documentElement.setAttribute('data-motion', 'enhanced');

  items.forEach((item, index) => {
    item.style.setProperty('--reveal-delay', `${Math.min(index * 55, 360)}ms`);
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  items.forEach((item) => observer.observe(item));
}

function initializeCvDownload() {
  const cvLink = document.querySelector('a[download="AcquadroPatrizioCV.pdf"]');

  if (!cvLink) {
    return;
  }

  const baseHref = cvLink.getAttribute('href');

  cvLink.addEventListener('click', (event) => {
    event.preventDefault();
    const freshLink = document.createElement('a');
    freshLink.href = `${baseHref}?v=${Date.now()}`;
    freshLink.download = 'AcquadroPatrizioCV.pdf';
    document.body.appendChild(freshLink);
    freshLink.click();
    document.body.removeChild(freshLink);
  });
}

function renderFooter() {
  lastUpdated.textContent = `Last updated: ${siteData.lastUpdated}`;
  currentYear.textContent = String(new Date().getFullYear());
}

function initialize() {
  if (blockedByFrameProtection) {
    return;
  }

  renderHero();
  renderNews();
  renderResearch();
  renderProjects();
  renderVentures();
  renderSkills();
  renderActivities();
  renderContacts();
  initializeMobileMenu();
  initializeCvDownload();
  initializeActiveSectionIndicator();
  initializeRevealAnimations();
  renderFooter();
}

initialize();
