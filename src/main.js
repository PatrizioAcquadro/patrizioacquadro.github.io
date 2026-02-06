import './styles/main.css';
import { siteData } from './content/siteData.js';

const baseUrl = import.meta.env.BASE_URL;
const THEME_STORAGE_KEY = 'pa-theme';

const heroName = document.getElementById('hero-name');
const heroTagline = document.getElementById('hero-tagline');
const heroBio = document.getElementById('hero-bio');
const profileImage = document.getElementById('profile-image');
const contactList = document.getElementById('contact-list');
const newsList = document.getElementById('news-list');
const researchList = document.getElementById('research-list');
const projectsGrid = document.getElementById('projects-grid');
const ventureList = document.getElementById('venture-list');
const skillsGrid = document.getElementById('skills-grid');
const talksList = document.getElementById('talks-list');
const lastUpdated = document.getElementById('last-updated');
const currentYear = document.getElementById('current-year');
const themeToggle = document.getElementById('theme-toggle');

function addExternalLinkAttributes(anchor, href, label) {
  if (!href.startsWith('http')) {
    return;
  }

  anchor.target = '_blank';
  anchor.rel = 'noopener noreferrer';
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

function renderHero() {
  heroName.textContent = siteData.name;
  heroTagline.textContent = siteData.positioning;
  heroBio.textContent = siteData.bio;
  profileImage.src = `${baseUrl}images/avatar-placeholder.svg`;
}

function renderContacts() {
  siteData.contactLinks.forEach((item) => {
    const listItem = createTag('li', 'contact-item');
    const link = createTag('a', 'contact-link', item.label);
    link.href = item.href;
    addExternalLinkAttributes(link, item.href, item.label);
    listItem.append(link);
    contactList.append(listItem);
  });
}

function renderNews() {
  const sortedNews = [...siteData.news].sort((a, b) => new Date(b.isoDate) - new Date(a.isoDate));

  sortedNews.forEach((item) => {
    const listItem = createTag('li', 'news-item');
    const date = createTag('time', 'news-date', `${item.dateLabel}: `);
    date.dateTime = item.isoDate;
    listItem.append(date);

    if (item.href) {
      const link = createTag('a', 'news-link', item.text);
      link.href = item.href;
      addExternalLinkAttributes(link, item.href, `News item from ${item.dateLabel}`);
      listItem.append(link);
    } else {
      listItem.append(document.createTextNode(item.text));
    }

    newsList.append(listItem);
  });
}

function renderResearch() {
  const thesisCard = createTag('article', 'content-card research-card');
  const thesisTitle = createTag('h3', '', siteData.thesis.title);
  const thesisText = createTag('p', 'card-body', siteData.thesis.text);
  const thesisLink = createTag('a', 'card-link', 'Thesis page');
  thesisLink.href = siteData.thesis.href;
  addExternalLinkAttributes(thesisLink, siteData.thesis.href, 'Current thesis work');

  thesisCard.append(thesisTitle, thesisText, thesisLink);
  researchList.append(thesisCard);

  siteData.research.forEach((item) => {
    const card = createTag('article', 'content-card research-card');
    const title = createTag('h3', '', `${item.role} | ${item.org}`);
    const timeframe = createTag('p', 'card-meta', item.timeframe);
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
    const card = createTag('article', 'content-card project-card');
    const title = createTag('h3', '', item.title);
    const timeframe = createTag('p', 'card-meta', item.timeframe);
    const built = createTag('p', 'card-body', item.built);
    const stack = createTag('p', 'card-stack', `Stack/Tools: ${item.stack}`);

    card.append(title, timeframe, built, stack);

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
    const card = createTag('article', 'content-card venture-card');
    const title = createTag('h3', '', `${item.name} | ${item.role}`);
    const timeframe = createTag('p', 'card-meta', item.timeframe);
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
    const card = createTag('article', 'content-card skill-card');
    const title = createTag('h3', '', group.group);
    const list = createTag('ul', 'skill-list');

    group.items.forEach((item) => {
      list.append(createTag('li', 'skill-pill', item));
    });

    card.append(title, list);
    skillsGrid.append(card);
  });
}

function renderActivities() {
  siteData.activities.forEach((item) => {
    const listItem = createTag('li', 'talk-item');
    const title = createTag('h3', 'talk-title', item.title);
    const timeframe = createTag('p', 'card-meta', item.timeframe);
    const text = createTag('p', 'card-body', item.text);

    listItem.append(title, timeframe, text);
    talksList.append(listItem);
  });
}

function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  themeToggle.setAttribute('aria-pressed', theme === 'dark' ? 'true' : 'false');
  themeToggle.textContent = theme === 'dark' ? 'Light mode' : 'Dark mode';
}

function getStoredTheme() {
  try {
    return window.localStorage.getItem(THEME_STORAGE_KEY);
  } catch (error) {
    return null;
  }
}

function setStoredTheme(theme) {
  try {
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch (error) {
    // Ignore storage failures and continue with in-memory theme state.
  }
}

function initializeTheme() {
  const storedTheme = getStoredTheme();
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initialTheme = storedTheme === 'light' || storedTheme === 'dark' ? storedTheme : prefersDark ? 'dark' : 'light';

  setTheme(initialTheme);

  themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';

    setStoredTheme(nextTheme);
    setTheme(nextTheme);
  });

  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  mediaQuery.addEventListener('change', (event) => {
    if (getStoredTheme()) {
      return;
    }

    setTheme(event.matches ? 'dark' : 'light');
  });
}

function initializeRevealAnimations() {
  const items = document.querySelectorAll('.reveal');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (reducedMotion || !('IntersectionObserver' in window)) {
    items.forEach((item) => item.classList.add('is-visible'));
    return;
  }

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

function renderFooter() {
  lastUpdated.textContent = `Last updated: ${siteData.lastUpdated}`;
  currentYear.textContent = String(new Date().getFullYear());
}

function initialize() {
  renderHero();
  renderContacts();
  renderNews();
  renderResearch();
  renderProjects();
  renderVentures();
  renderSkills();
  renderActivities();
  initializeTheme();
  initializeRevealAnimations();
  renderFooter();
}

initialize();
