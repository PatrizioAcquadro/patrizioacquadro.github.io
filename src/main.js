// Preserve links to the sections of the previous single-page portfolio.
const legacySections = { '#home': '/#top', '#news': '/updates/', '#research': '/experience/', '#projects': '/projects/', '#entrepreneurship': '/ventures/', '#talks': '/activities/' };
function followLegacySection() {
  if (location.pathname === '/' && Object.hasOwn(legacySections, location.hash)) location.replace(legacySections[location.hash]);
}
followLegacySection();
window.addEventListener('hashchange', followLegacySection);

const header = document.querySelector('.site-header');
const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('#site-nav');
const mobile = matchMedia('(max-width: 900px)');

function syncHeaderHeight() {
  document.documentElement.style.setProperty('--header-height', `${Math.ceil(header.getBoundingClientRect().height)}px`);
}

function setMenu(open, restoreFocus = false) {
  header.classList.toggle('is-open', open);
  toggle.setAttribute('aria-expanded', String(open));
  toggle.setAttribute('aria-label', open ? 'Close navigation menu' : 'Open navigation menu');
  nav.inert = mobile.matches && !open;
  syncHeaderHeight();
  if (restoreFocus) toggle.focus();
}

header.classList.add('is-enhanced');
toggle.hidden = false;
setMenu(false);
new ResizeObserver(syncHeaderHeight).observe(header);
toggle.addEventListener('click', () => setMenu(toggle.getAttribute('aria-expanded') !== 'true'));
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && header.classList.contains('is-open')) setMenu(false, true);
});
document.addEventListener('click', (event) => {
  if (!header.contains(event.target)) setMenu(false);
});
mobile.addEventListener('change', () => setMenu(false));
nav.addEventListener('click', (event) => {
  const target = event.target.closest('a');
  if (!target) return;
  const isContact = target.getAttribute('href') === '#contact';
  setMenu(false);
  if (isContact) document.getElementById('contact').focus({ preventScroll: true });
});

const copyButton = document.querySelector('.copy-email');
const copyStatus = document.querySelector('.copy-status');
copyButton.hidden = false;
copyButton.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(copyButton.dataset.email);
    copyStatus.textContent = 'Email address copied.';
  } catch {
    copyStatus.textContent = 'Select the email address above to copy it manually.';
  }
});

document.querySelectorAll('img[data-fallback]').forEach((image) => {
  function fallback() {
    image.removeEventListener('error', fallback);
    image.removeAttribute('srcset');
    image.src = image.dataset.fallback;
    image.alt = 'Profile placeholder for Patrizio Acquadro';
  }
  image.addEventListener('error', fallback, { once: true });
  if (image.complete && !image.naturalWidth) fallback();
});
