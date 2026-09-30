import { test, expect } from '@playwright/test';
import { siteData } from '../../src/content/siteData.js';

const roboticsProjects = siteData.projects.filter((project) => project.robotics);
const titles = roboticsProjects.map((project) => project.title);
const otherTitles = siteData.projects.filter((project) => !project.robotics).map((project) => project.title);
const readableCards = (page) => page.locator('#projects-carousel .project-card:not([inert])');

test('three robotics projects are readable with two partial previews on desktop', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto('/#projects');
  await expect(readableCards(page).locator('h3')).toHaveText(titles.slice(0, 3));
  await expect(page.locator('#other-projects-grid .project-card h3')).toHaveText(otherTitles);
  await expect.poll(() => page.locator('.projects-viewport').evaluate((viewport) => {
    const bounds = viewport.getBoundingClientRect();
    const cards = [...viewport.querySelectorAll('.project-card')].map((card) => {
      const rect = card.getBoundingClientRect();
      return { full: rect.left >= bounds.left && rect.right <= bounds.right, partial: rect.right > bounds.left && rect.left < bounds.right && (rect.left < bounds.left || rect.right > bounds.right) };
    });
    return { full: cards.filter((card) => card.full).length, partial: cards.filter((card) => card.partial).length };
  })).toEqual({ full: 3, partial: 2 });
  for (const direction of ['Next project', 'Previous project']) {
    const button = page.getByRole('button', { name: direction });
    const box = await button.boundingBox();
    expect(box.width).toBeGreaterThanOrEqual(44);
    expect(box.height).toBeGreaterThanOrEqual(44);
  }
});

test('every project is reachable through a complete loop in either direction', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto('/#projects');
  for (const direction of [1, -1]) {
    const button = page.getByRole('button', { name: direction === 1 ? 'Next project' : 'Previous project' });
    for (let step = 1; step <= titles.length; step++) {
      await button.click();
      const index = (direction * step + titles.length) % titles.length;
      await expect(readableCards(page).first().locator('h3')).toHaveText(titles[index]);
    }
  }
  await expect(page.locator('#projects-carousel .project-card')).toHaveCount(titles.length);
  expect(new Set(await page.locator('#projects-carousel .project-card h3').allTextContents()).size).toBe(titles.length);
  await expect(page.locator('#other-projects-grid .project-card h3')).toHaveText(otherTitles);
});

test('keyboard navigation only visits readable project links and preserves arrow focus', async ({ page, browserName }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto('/#projects');
  const previous = page.getByRole('button', { name: 'Previous project' });
  const next = page.getByRole('button', { name: 'Next project' });
  await previous.focus();
  const links = readableCards(page).locator('a');
  const tabKey = browserName === 'webkit' ? 'Alt+Tab' : 'Tab';
  for (let index = 0; index < await links.count(); index++) {
    await page.keyboard.press(tabKey);
    await expect(links.nth(index)).toBeFocused();
  }
  await page.keyboard.press(tabKey);
  await expect(next).toBeFocused();
  await page.keyboard.press('ArrowLeft');
  await expect(previous).toBeFocused();
  await expect(readableCards(page).first().locator('h3')).toHaveText(titles.at(-1));
  await page.keyboard.press('ArrowRight');
  await expect(next).toBeFocused();
  await expect(readableCards(page).first().locator('h3')).toHaveText(titles[0]);
});

test('mobile swipe, tablet resize and enlarged text keep the current project readable', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/#projects');
  await expect(readableCards(page)).toHaveCount(1);
  await page.locator('.projects-viewport').dispatchEvent('pointerdown', { pointerId: 1, pointerType: 'touch', isPrimary: true, clientX: 280, clientY: 300 });
  await page.locator('.projects-viewport').dispatchEvent('pointerup', { pointerId: 1, pointerType: 'touch', isPrimary: true, clientX: 100, clientY: 305 });
  await expect(readableCards(page).first().locator('h3')).toHaveText(titles[1]);
  await page.setViewportSize({ width: 900, height: 1000 });
  await expect(readableCards(page)).toHaveCount(2);
  await expect(readableCards(page).first().locator('h3')).toHaveText(titles[1]);
  await page.setViewportSize({ width: 1440, height: 1000 });
  await expect(readableCards(page)).toHaveCount(3);
  await page.setViewportSize({ width: 390, height: 844 });
  await page.evaluate(() => { document.documentElement.style.fontSize = '200%'; });
  await expect(readableCards(page)).toHaveCount(1);
  await expect.poll(() => readableCards(page).first().evaluate((card) => card.scrollWidth <= card.clientWidth)).toBe(true);
  await page.getByRole('button', { name: 'Previous project' }).click();
  await expect(readableCards(page).first().locator('h3')).toHaveText(titles[0]);
});

test('animated boundary crossings and a resize during movement remain aligned', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto('/#projects');
  await page.getByRole('button', { name: 'Previous project' }).click();
  await expect(readableCards(page).first().locator('h3')).toHaveText(titles.at(-1));
  await page.getByRole('button', { name: 'Next project' }).click();
  await expect(readableCards(page).first().locator('h3')).toHaveText(titles[0]);
  await page.getByRole('button', { name: 'Next project' }).click();
  await page.setViewportSize({ width: 390, height: 844 });
  await expect(readableCards(page)).toHaveCount(1);
  await expect(readableCards(page).first().locator('h3')).toHaveText(titles[1]);
  await expect(page.locator('#projects-grid')).not.toHaveClass(/is-moving/);
  await expect.poll(async () => {
    const card = await readableCards(page).first().boundingBox();
    return card.x >= 0 && card.x + card.width <= 390;
  }).toBe(true);
});

test('all projects remain visible and linked without JavaScript', async ({ browser, baseURL }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, ignoreHTTPSErrors: true });
  const page = await context.newPage();
  await page.goto(`${baseURL}/#projects`);
  await expect(page.locator('.project-card h3')).toHaveText(siteData.projects.map((project) => project.title));
  for (const arrow of await page.locator('.projects-arrow').all()) await expect(arrow).toBeHidden();
  expect(await page.locator('.project-card').evaluateAll((cards) => cards.every((card) => card.getBoundingClientRect().height > 0 && !card.inert))).toBe(true);
  await expect(page.locator('.project-card').first().locator('a')).toHaveAttribute('href', siteData.projects[0].href);
  await context.close();
});
