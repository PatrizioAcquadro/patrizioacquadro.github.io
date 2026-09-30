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

const contactList = document.getElementById('contact-list');
const mailSheetBackdrop = document.getElementById('mail-sheet-backdrop');
const mailSheetClose = document.getElementById('mail-sheet-close');
const mailSheetEmail = document.getElementById('mail-sheet-email');
const mailCopyButton = document.getElementById('mail-copy-button');
const mailCopyStatus = document.getElementById('mail-copy-status');

function extractEmailFromMailto(mailtoHref) {
  if (!mailtoHref || !mailtoHref.startsWith('mailto:')) {
    return '';
  }

  const raw = mailtoHref.slice('mailto:'.length).split('?')[0].trim();
  if (!raw) {
    return '';
  }

  try {
    return decodeURIComponent(raw);
  } catch (error) {
    return raw;
  }
}

function fallbackCopyText(text) {
  const textArea = document.createElement('textarea');
  textArea.value = text;
  textArea.setAttribute('readonly', '');
  textArea.style.position = 'fixed';
  textArea.style.left = '-9999px';
  textArea.style.top = '0';

  document.body.append(textArea);
  textArea.select();
  textArea.setSelectionRange(0, textArea.value.length);

  let copied = false;
  try {
    copied = document.execCommand('copy');
  } catch (error) {
    copied = false;
  }

  document.body.removeChild(textArea);
  return copied;
}

function initializeMailContactInteraction() {
  if (
    !contactList ||
    !mailSheetBackdrop ||
    !mailSheetClose ||
    !mailSheetEmail ||
    !mailCopyButton ||
    !mailCopyStatus
  ) {
    return;
  }

  const mailTrigger = contactList.querySelector('.contact-link[href^="mailto:"]');
  if (!mailTrigger) {
    return;
  }

  const mailtoHref = mailTrigger.getAttribute('href') || '';
  const email = extractEmailFromMailto(mailtoHref);
  if (!email) {
    return;
  }

  mailTrigger.setAttribute('aria-haspopup', 'dialog');
  mailTrigger.setAttribute('aria-controls', 'mail-sheet');
  mailTrigger.setAttribute('aria-expanded', 'false');
  mailSheetEmail.textContent = email;

  let previouslyFocusedElement = null;
  let hideTimeoutId = 0;
  let statusTimeoutId = 0;

  function scheduleStatusClear() {
    if (statusTimeoutId) {
      window.clearTimeout(statusTimeoutId);
    }

    statusTimeoutId = window.setTimeout(() => {
      mailCopyStatus.textContent = '';
      statusTimeoutId = 0;
    }, 1800);
  }

  function onEscapeKey(event) {
    if (event.key !== 'Escape') {
      return;
    }

    closeMailSheet({ restoreFocus: true });
  }

  function openMailSheet() {
    if (mailSheetBackdrop.getAttribute('data-open') === 'true') {
      return;
    }

    if (hideTimeoutId) {
      window.clearTimeout(hideTimeoutId);
      hideTimeoutId = 0;
    }

    previouslyFocusedElement = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    mailCopyStatus.textContent = '';
    mailSheetBackdrop.hidden = false;
    mailTrigger.setAttribute('aria-expanded', 'true');

    window.requestAnimationFrame(() => {
      mailSheetBackdrop.setAttribute('data-open', 'true');
    });

    document.addEventListener('keydown', onEscapeKey);
    mailSheetClose.focus();
  }

  function closeMailSheet({ restoreFocus }) {
    if (mailSheetBackdrop.hidden && mailSheetBackdrop.getAttribute('data-open') !== 'true') {
      return;
    }

    mailSheetBackdrop.setAttribute('data-open', 'false');
    mailTrigger.setAttribute('aria-expanded', 'false');
    document.removeEventListener('keydown', onEscapeKey);

    if (hideTimeoutId) {
      window.clearTimeout(hideTimeoutId);
    }

    hideTimeoutId = window.setTimeout(() => {
      mailSheetBackdrop.hidden = true;
      hideTimeoutId = 0;
    }, 260);

    if (restoreFocus && previouslyFocusedElement) {
      previouslyFocusedElement.focus();
    }
  }

  async function copyEmailToClipboard() {
    let copied = false;

    if (navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
      try {
        await navigator.clipboard.writeText(email);
        copied = true;
      } catch (error) {
        copied = false;
      }
    }

    if (!copied) {
      copied = fallbackCopyText(email);
    }

    mailCopyStatus.textContent = copied ? 'Copied ✓' : 'Copy failed';
    scheduleStatusClear();
  }

  mailTrigger.addEventListener('click', (event) => {
    event.preventDefault();
    openMailSheet();
  });

  mailSheetClose.addEventListener('click', () => {
    closeMailSheet({ restoreFocus: true });
  });

  mailSheetBackdrop.addEventListener('click', (event) => {
    if (event.target === mailSheetBackdrop) {
      closeMailSheet({ restoreFocus: true });
    }
  });

  mailCopyButton.addEventListener('click', () => {
    void copyEmailToClipboard();
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
    { threshold: 0.01, rootMargin: '0px 0px 75px 0px' }
  );

  items.forEach((item) => observer.observe(item));

  let revealPending = items.filter((item) => !item.classList.contains('is-visible'));

  if (revealPending.length === 0) {
    return;
  }

  let fallbackTicking = false;

  function checkRevealFallback() {
    const viewportHeight = window.innerHeight;

    revealPending = revealPending.filter((item) => {
      if (item.classList.contains('is-visible')) {
        return false;
      }

      const rect = item.getBoundingClientRect();
      if (rect.top < viewportHeight + 75 && rect.bottom > 0) {
        item.classList.add('is-visible');
        observer.unobserve(item);
        return false;
      }

      return true;
    });

    if (revealPending.length === 0) {
      window.removeEventListener('scroll', onScrollFallback);
      window.removeEventListener('resize', onScrollFallback);
    }
  }

  function onScrollFallback() {
    if (fallbackTicking) {
      return;
    }

    fallbackTicking = true;
    window.requestAnimationFrame(() => {
      checkRevealFallback();
      fallbackTicking = false;
    });
  }

  window.addEventListener('scroll', onScrollFallback, { passive: true });
  window.addEventListener('resize', onScrollFallback);
}

function initializeThemeToggle() {
  var STORAGE_KEY = 'theme-preference';
  var toggleButton = document.getElementById('theme-toggle');

  if (!toggleButton) {
    return;
  }

  function getSystemTheme() {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
      return 'light';
    }
    return 'dark';
  }

  function getStoredTheme() {
    try {
      var stored = localStorage.getItem(STORAGE_KEY);
      if (stored === 'light' || stored === 'dark') {
        return stored;
      }
    } catch (e) {
      /* localStorage unavailable */
    }
    return null;
  }

  function storeTheme(theme) {
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch (e) {
      /* silently fail */
    }
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    toggleButton.setAttribute(
      'aria-label',
      theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'
    );
  }

  var resolvedTheme = getStoredTheme() || getSystemTheme();
  applyTheme(resolvedTheme);

  toggleButton.addEventListener('click', function () {
    var current = document.documentElement.getAttribute('data-theme') || 'dark';
    var next = current === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    storeTheme(next);
  });

  if (window.matchMedia) {
    var mediaQuery = window.matchMedia('(prefers-color-scheme: light)');
    mediaQuery.addEventListener('change', function (event) {
      if (getStoredTheme()) {
        return;
      }
      applyTheme(event.matches ? 'light' : 'dark');
    });
  }
}

function initialize() {
  if (blockedByFrameProtection) {
    return;
  }

  initializeThemeToggle();
  initializeMailContactInteraction();
  initializeMobileMenu();
  initializeActiveSectionIndicator();
  initializeRevealAnimations();
}

initialize();
