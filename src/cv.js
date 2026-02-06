import { siteData } from './content/siteData.js';

const pdfUrl = '/cv/AcquadroPatrizioCV.pdf';

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
const fallbackLink = document.getElementById('cv-fallback-link');
const embed = document.getElementById('cv-embed');
const lastUpdated = document.getElementById('cv-last-updated');
const year = document.getElementById('cv-current-year');

function initializeCvPage() {
  if (blockedByFrameProtection) {
    return;
  }

  downloadButton.href = pdfUrl;
  downloadTop.href = pdfUrl;
  fallbackLink.href = pdfUrl;
  embed.data = pdfUrl;

  lastUpdated.textContent = `Last updated: ${siteData.lastUpdated}`;
  year.textContent = String(new Date().getFullYear());
}

initializeCvPage();
