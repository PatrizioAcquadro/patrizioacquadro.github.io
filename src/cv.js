import './styles/cv.css';
import { siteData } from './content/siteData.js';

const pdfUrl = `${import.meta.env.BASE_URL}cv/AcquadroPatrizioCV.pdf`;

const downloadButton = document.getElementById('cv-download');
const downloadTop = document.getElementById('cv-download-top');
const fallbackLink = document.getElementById('cv-fallback-link');
const embed = document.getElementById('cv-embed');
const lastUpdated = document.getElementById('cv-last-updated');
const year = document.getElementById('cv-current-year');

function initializeCvPage() {
  downloadButton.href = pdfUrl;
  downloadTop.href = pdfUrl;
  fallbackLink.href = pdfUrl;
  embed.data = pdfUrl;

  lastUpdated.textContent = `Last updated: ${siteData.lastUpdated}`;
  year.textContent = String(new Date().getFullYear());
}

initializeCvPage();
