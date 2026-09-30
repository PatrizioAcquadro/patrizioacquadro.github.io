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

function initializeProfileFallback() {
  const image = document.getElementById('profile-image');
  function fallback() {
    image.removeEventListener('error', fallback);
    image.removeAttribute('srcset');
    image.src = image.dataset.fallback;
    image.alt = 'Profile placeholder for Patrizio Acquadro';
  }
  image.addEventListener('error', fallback, { once: true });
  if (image.complete && !image.naturalWidth) fallback();
}

function initializeMailContactInteraction() {
  const mailTrigger = document.querySelector('.contact-link[href^="mailto:"]');
  const dialog = document.getElementById('mail-sheet');
  const closeButton = document.getElementById('mail-sheet-close');
  const copyButton = document.getElementById('mail-copy-button');
  const status = document.getElementById('mail-copy-status');
  const email = document.getElementById('mail-sheet-email').textContent;
  if (!mailTrigger || typeof dialog.showModal !== 'function') return;

  mailTrigger.setAttribute('aria-haspopup', 'dialog');
  mailTrigger.setAttribute('aria-controls', 'mail-sheet');
  mailTrigger.setAttribute('aria-expanded', 'false');
  let statusTimeout;

  function fallbackCopy() {
    const textArea = document.createElement('textarea');
    textArea.value = email;
    textArea.className = 'clipboard-fallback';
    textArea.readOnly = true;
    // A modal makes the rest of the document inert, so the fallback belongs inside it.
    dialog.append(textArea);
    textArea.select();
    let copied = false;
    try { copied = document.execCommand('copy'); } catch { /* manual copy remains available */ }
    textArea.remove();
    copyButton.focus();
    return copied;
  }

  mailTrigger.addEventListener('click', (event) => {
    event.preventDefault();
    if (dialog.open) return;
    status.textContent = '';
    dialog.showModal();
    document.documentElement.classList.add('has-modal');
    mailTrigger.setAttribute('aria-expanded', 'true');
    closeButton.focus();
  });
  closeButton.addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) dialog.close();
  });
  dialog.addEventListener('keydown', (event) => {
    if (event.key !== 'Tab') return;
    const controls = [...dialog.querySelectorAll('button:not([disabled]), a[href]')];
    // Safari may skip links in its native Tab order; keep every modal action reachable.
    const current = controls.indexOf(document.activeElement);
    const next = (current + (event.shiftKey ? -1 : 1) + controls.length) % controls.length;
    event.preventDefault();
    controls[next].focus();
  });
  dialog.addEventListener('close', () => {
    window.clearTimeout(statusTimeout);
    status.textContent = '';
    document.documentElement.classList.remove('has-modal');
    mailTrigger.setAttribute('aria-expanded', 'false');
    mailTrigger.focus({ preventScroll: true });
  });
  copyButton.addEventListener('click', async () => {
    window.clearTimeout(statusTimeout);
    let copied = false;
    try {
      await navigator.clipboard.writeText(email);
      copied = true;
    } catch { copied = fallbackCopy(); }
    if (!dialog.open) return;
    status.textContent = copied ? 'Copied ✓' : 'Copy failed. Select the address and copy it manually.';
    if (copied) statusTimeout = window.setTimeout(() => { status.textContent = ''; }, 1800);
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
  menuToggle.hidden = false;

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
      const section = document.getElementById(link.hash.slice(1));
      if (section) {
        section.tabIndex = -1;
        section.focus({ preventScroll: true });
      }
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

  const mobileViewport = window.matchMedia('(max-width: 70rem)');
  mobileViewport.addEventListener('change', () => {
    if (!mobileViewport.matches) {
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
      active.link.setAttribute('aria-current', 'location');
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
      const sectionStart = entry.target.getBoundingClientRect().top + window.scrollY;
      const nextSectionStart =
        index < sectionEntries.length - 1 ? sectionEntries[index + 1].target.getBoundingClientRect().top + window.scrollY : Number.POSITIVE_INFINITY;

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

function initializeProjectsCarousel() {
  const carousel = document.getElementById('projects-carousel');
  const viewport = carousel.querySelector('.projects-viewport');
  const track = document.getElementById('projects-grid');
  const cards = [...track.children];
  if (cards.length < 5) return;

  const previous = carousel.querySelector('.projects-arrow--previous');
  const next = carousel.querySelector('.projects-arrow--next');
  const status = carousel.querySelector('.projects-status');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let firstIndex = 0;
  let finishMove;
  let stride;
  let offset;

  carousel.classList.add('is-enhanced');
  carousel.setAttribute('role', 'region');
  carousel.setAttribute('aria-roledescription', 'carousel');
  carousel.setAttribute('aria-label', 'Robotics projects');
  previous.hidden = next.hidden = status.hidden = false;
  cards.forEach((card, index) => {
    card.setAttribute('role', 'group');
    card.setAttribute('aria-roledescription', 'slide');
    card.setAttribute('aria-label', `Project ${index + 1} of ${cards.length}`);
  });
  // Rotate the original cards so every project retains its links.
  track.prepend(cards.at(-1));

  function setPosition(position) {
    track.style.transform = `translate3d(${position}px, 0, 0)`;
  }

  function updateLayout() {
    const visibleCount = Number(getComputedStyle(carousel).getPropertyValue('--project-visible-count'));
    const width = track.firstElementChild.getBoundingClientRect().width;
    const gap = parseFloat(getComputedStyle(track).columnGap);
    const peek = (viewport.clientWidth - width * visibleCount - gap * (visibleCount - 1)) / 2;
    stride = width + gap;
    offset = peek - stride;
    setPosition(offset);
    [...track.children].forEach((card, index) => {
      const visible = index >= 1 && index <= visibleCount;
      card.inert = !visible;
      card.setAttribute('aria-hidden', String(!visible));
    });
    const positions = Array.from({ length: visibleCount }, (_, index) => (firstIndex + index) % cards.length + 1);
    status.textContent = `Projects ${positions.join(', ')} of ${cards.length}`;
  }

  function move(direction) {
    if (finishMove) return;
    let timeout;
    let buffer;
    function finish() {
      window.clearTimeout(timeout);
      track.removeEventListener('transitionend', onTransitionEnd);
      track.classList.remove('is-moving');
      buffer?.remove();
      if (direction === 1) track.append(track.firstElementChild);
      else track.prepend(track.lastElementChild);
      firstIndex = (firstIndex + direction + cards.length) % cards.length;
      finishMove = null;
      updateLayout();
    }
    function onTransitionEnd(event) {
      if (event.target === track && event.propertyName === 'transform') finish();
    }
    finishMove = finish;
    if (reducedMotion.matches) {
      finish();
      return;
    }
    // An inert edge copy keeps both previews filled throughout the transition.
    buffer = (direction === 1 ? track.firstElementChild : track.lastElementChild).cloneNode(true);
    buffer.inert = true;
    buffer.setAttribute('aria-hidden', 'true');
    if (direction === 1) track.append(buffer);
    else {
      track.prepend(buffer);
      setPosition(offset - stride);
    }
    // Flush the previous rotation before starting another transition.
    track.getBoundingClientRect();
    track.classList.add('is-moving');
    setPosition(direction === 1 ? offset - stride : offset);
    track.addEventListener('transitionend', onTransitionEnd);
    timeout = window.setTimeout(finish, 400);
  }

  previous.addEventListener('click', () => move(-1));
  next.addEventListener('click', () => move(1));
  carousel.addEventListener('keydown', (event) => {
    if (!['ArrowLeft', 'ArrowRight'].includes(event.key)) return;
    event.preventDefault();
    const direction = event.key === 'ArrowRight' ? 1 : -1;
    (direction === 1 ? next : previous).focus({ preventScroll: true });
    move(direction);
  });

  let touchStart;
  let swiped = false;
  viewport.addEventListener('pointerdown', (event) => {
    if (!event.isPrimary || event.pointerType === 'mouse') return;
    touchStart = { x: event.clientX, y: event.clientY, id: event.pointerId };
    swiped = false;
  });
  window.addEventListener('pointerup', (event) => {
    if (!touchStart || event.pointerId !== touchStart.id) return;
    const dx = event.clientX - touchStart.x;
    const dy = event.clientY - touchStart.y;
    touchStart = null;
    if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) {
      swiped = true;
      move(dx < 0 ? 1 : -1);
    }
  });
  viewport.addEventListener('pointercancel', () => { touchStart = null; });
  viewport.addEventListener('click', (event) => {
    if (!swiped) return;
    event.preventDefault();
    swiped = false;
  }, true);

  updateLayout();
  new ResizeObserver(() => {
    if (finishMove) finishMove();
    else updateLayout();
  }).observe(viewport);
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

  toggleButton.hidden = false;
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

  document.getElementById('current-year').textContent = String(new Date().getFullYear());
  initializeThemeToggle();
  initializeProfileFallback();
  initializeMailContactInteraction();
  initializeMobileMenu();
  initializeActiveSectionIndicator();
  initializeProjectsCarousel();
  initializeRevealAnimations();
}

initialize();
