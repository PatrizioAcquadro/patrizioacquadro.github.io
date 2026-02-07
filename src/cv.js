import { siteData } from './content/siteData.js';

function resolveBasePath(path) {
  const base = import.meta.env.BASE_URL || '/';
  const normalizedBase = base.endsWith('/') ? base : `${base}/`;
  const normalizedPath = path.replace(/^\/+/, '');
  return `${normalizedBase}${normalizedPath}`;
}

const pdfDownloadUrl = resolveBasePath('cv/AcquadroPatrizioCV.pdf');

function getViewerUrl() {
  const absolutePdfUrl = new URL(pdfDownloadUrl, window.location.origin).toString();
  const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';

  if (isLocalhost) {
    return `${pdfDownloadUrl}#view=FitH&toolbar=1&navpanes=0`;
  }

  return `https://docs.google.com/gview?embedded=1&url=${encodeURIComponent(absolutePdfUrl)}`;
}

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

const downloadButton = document.getElementById('cv-download');
const downloadTop = document.getElementById('cv-download-top');
const openLink = document.getElementById('cv-open-link');
const fallbackLink = document.getElementById('cv-fallback-link');
const embed = document.getElementById('cv-embed');
const viewerFallback = document.getElementById('cv-viewer-fallback');
const lastUpdated = document.getElementById('cv-last-updated');
const year = document.getElementById('cv-current-year');

function initializeViewerFallback() {
  if (!embed || !viewerFallback) {
    return;
  }

  let settled = false;
  const timeoutMs = 5500;

  function showFallback() {
    if (settled) {
      return;
    }

    settled = true;
    embed.hidden = true;
    viewerFallback.hidden = false;
  }

  const timeoutId = window.setTimeout(() => {
    showFallback();
  }, timeoutMs);

  function markLoaded() {
    if (settled) {
      return;
    }

    settled = true;
    window.clearTimeout(timeoutId);
    embed.hidden = false;
    viewerFallback.hidden = true;
  }

  embed.addEventListener('load', () => {
    markLoaded();
  });

  embed.addEventListener('error', () => {
    showFallback();
  });
}

function initializeMobileMenu() {
  const navbar = document.getElementById('cv-header');
  const menuToggle = document.getElementById('cv-menu-toggle');
  const panel = document.getElementById('cv-nav-panel');

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
    menuToggle.setAttribute('aria-label', open ? 'Close CV navigation menu' : 'Open CV navigation menu');
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
    item.style.setProperty('--reveal-delay', `${Math.min(index * 70, 220)}ms`);
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
    { threshold: 0.15 }
  );

  items.forEach((item) => observer.observe(item));
}

function initializeCvPage() {
  if (blockedByFrameProtection) {
    return;
  }

  if (downloadButton) {
    downloadButton.href = pdfDownloadUrl;
  }

  if (downloadTop) {
    downloadTop.href = pdfDownloadUrl;
  }

  if (openLink) {
    openLink.href = pdfDownloadUrl;
  }

  if (fallbackLink) {
    fallbackLink.href = pdfDownloadUrl;
  }

  if (embed) {
    embed.src = getViewerUrl();
  }

  if (lastUpdated) {
    lastUpdated.textContent = `Last updated: ${siteData.lastUpdated}`;
  }

  if (year) {
    year.textContent = String(new Date().getFullYear());
  }

  initializeViewerFallback();
  initializeMobileMenu();
  initializeRevealAnimations();
}

initializeCvPage();
