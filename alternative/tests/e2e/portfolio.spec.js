import { test, expect } from '@playwright/test';
import { content } from '../../src/content/editorial.js';

const routes = ['/', '/projects/', '/experience/', '/ventures/', '/activities/', '/updates/'];
const records = {
  '/projects/': ['project', content.projects.length],
  '/experience/': ['research', content.research.length],
  '/ventures/': ['venture', content.ventures.length],
  '/activities/': ['activity', content.activities.length],
  '/updates/': ['news', content.news.length]
};

test('every page opens directly with complete content, local assets and no browser errors', async ({ page }) => {
  const errors = [];
  page.on('pageerror', (error) => errors.push(error.message));
  page.on('console', (message) => { if (message.type() === 'error') errors.push(message.text()); });
  page.on('response', (response) => { if (response.status() >= 400) errors.push(`${response.status()} ${response.url()}`); });
  const external = [];
  page.on('request', (request) => { if (!request.url().startsWith('https://127.0.0.1:4175')) external.push(request.url()); });
  for (const route of routes) {
    await page.goto(route);
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex, nofollow');
    if (records[route]) {
      const [record, count] = records[route];
      await expect(page.locator(`[data-record="${record}"]`)).toHaveCount(count);
      await expect(page.locator('[aria-current="page"]')).toHaveAttribute('href', route);
    }
    if (route === '/projects/') await expect(page.locator('.project-illustration img')).toHaveCount(content.projects.length);
    if (route === '/ventures/') await expect(page.locator('.venture-illustration img')).toHaveCount(content.ventures.length);
    for (const image of await page.locator('img').all()) {
      await image.scrollIntoViewIfNeeded();
      await expect.poll(() => image.evaluate((element) => element.complete && element.naturalWidth > 0)).toBe(true);
    }
  }
  expect(external).toEqual([]);
  expect(errors).toEqual([]);
});

test('all pages and navigation work without JavaScript, including CV download', async ({ browser, baseURL }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, ignoreHTTPSErrors: true, viewport: { width: 390, height: 844 } });
  const page = await context.newPage();
  for (const route of routes) {
    await page.goto(`${baseURL}${route}`);
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('.menu-toggle')).toBeHidden();
    await expect(page.locator('.copy-email')).toBeHidden();
    await expect(page.getByRole('navigation', { name: 'Primary navigation' })).toBeVisible();
    if (records[route]) await expect(page.locator(`[data-record="${records[route][0]}"]`)).toHaveCount(records[route][1]);
  }
  await page.getByRole('navigation', { name: 'Primary navigation' }).getByRole('link', { name: 'Projects', exact: true }).click();
  await expect(page).toHaveURL(/\/projects\/$/);
  const href = await page.getByRole('link', { name: 'Download CV' }).getAttribute('href');
  const response = await page.request.get(`${baseURL}${href}`);
  expect(response.status()).toBe(200);
  expect(response.headers()['content-type']).toContain('application/pdf');
  await expect(page.getByRole('link', { name: 'Get in touch' })).toHaveAttribute('href', 'mailto:acquadropatrizio@gmail.com');
  await page.goto(`${baseURL}/projects/#ego2grip`);
  const anchorTop = await page.locator('#ego2grip').evaluate((element) => Math.round(element.getBoundingClientRect().top));
  expect(anchorTop).toBeGreaterThanOrEqual(0);
  expect(anchorTop).toBeLessThanOrEqual(25);
  expect(await page.locator('.site-header').evaluate((element) => getComputedStyle(element).position)).toBe('relative');
  await context.close();
});

test('home previews reach the exact project, venture, activity and update', async ({ page }) => {
  for (const [selector, expected, heading] of [
    ['.work-art-link', '/projects/#alexdoor-xas', 'AlexDoor-XAS - Humanoid Door Manipulation'],
    ['.bif-preview', '/ventures/#bif', 'BIF (BiellaInFesta) Social Page'],
    ['.award-preview', '/activities/#toyp-2026', 'TOYP 2026'],
    ['.update-link', `/updates/#${content.news[0].id}`, null]
  ]) {
    await page.goto('/');
    await page.locator(selector).first().click();
    expect(new URL(page.url()).pathname + new URL(page.url()).hash).toBe(expected);
    if (heading) await expect(page.getByRole('heading', { name: heading, exact: true })).toBeVisible();
    const target = page.locator(expected.slice(expected.indexOf('#')));
    await expect(target).toBeVisible();
    expect(await target.evaluate((element) => element.getBoundingClientRect().top)).toBeGreaterThanOrEqual(80);
  }
});

test('robotics leads the page with larger desktop illustrations and working project shortcuts', async ({ page }) => {
  await page.goto('/projects/');
  await page.setViewportSize({ width: 1440, height: 1000 });
  const researchImage = await page.locator('#alexdoor-xas .project-illustration img').boundingBox();
  const softwareImage = await page.locator('#code-agent-system .project-illustration img').boundingBox();
  expect(researchImage.width).toBeGreaterThan(softwareImage.width * 1.25);
  for (const width of [1440, 390]) {
    await page.setViewportSize({ width, height: 950 });
    for (const { id } of content.projects.filter((item) => item.robotics)) {
      await page.getByRole('navigation', { name: 'Robotics projects', exact: true }).locator(`a[href="#${id}"]`).click();
      await expect(page).toHaveURL(new RegExp(`#${id}$`));
      const project = page.locator(`#${id}`);
      await expect(project.getByRole('heading', { name: 'Long-term direction', exact: true })).toBeVisible();
      await expect.poll(() => project.evaluate((element) => Math.round(element.getBoundingClientRect().top))).toBeGreaterThanOrEqual(80);
      await expect.poll(() => project.evaluate((element) => Math.round(element.getBoundingClientRect().top))).toBeLessThanOrEqual(125);
    }
  }
});

test('mobile menu supports Escape, section navigation, contact focus and resizing', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  const menu = page.locator('.menu-toggle');
  await menu.click();
  await expect(menu).toHaveAttribute('aria-expanded', 'true');
  await page.keyboard.press('Escape');
  await expect(menu).toBeFocused();
  await expect(menu).toHaveAttribute('aria-expanded', 'false');
  await menu.click();
  await page.getByRole('navigation', { name: 'Primary navigation' }).getByRole('link', { name: 'Projects', exact: true }).click();
  await expect(page).toHaveURL(/\/projects\/$/);
  await page.locator('.menu-toggle').click();
  await page.getByRole('link', { name: 'Let’s talk' }).click();
  await expect(page.locator('#contact')).toBeFocused();
  await expect(page.locator('.menu-toggle')).toHaveAttribute('aria-expanded', 'false');
  await page.setViewportSize({ width: 1440, height: 1000 });
  await expect(page.locator('#site-nav')).toBeVisible();
  await expect(page.locator('#site-nav')).not.toHaveAttribute('inert', '');
  await expect(page.locator('.menu-toggle')).toBeHidden();
});

test('fragment offsets adapt to enlarged text and Back to top restores keyboard navigation', async ({ page, browserName }) => {
  for (const width of [390, 1440]) {
    await page.setViewportSize({ width, height: 950 });
    for (const scale of ['100%', '200%']) {
      await page.goto('/projects/');
      await page.evaluate((value) => { document.documentElement.style.fontSize = value; }, scale);
      await page.getByRole('navigation', { name: 'Robotics projects', exact: true }).locator('a[href="#ego2grip"]').click();
      const clearance = () => page.evaluate(() => Math.round(document.getElementById('ego2grip').getBoundingClientRect().top - document.querySelector('.site-header').getBoundingClientRect().bottom));
      await expect.poll(clearance, `${width}px / ${scale}`).toBeGreaterThanOrEqual(19);
      await expect.poll(clearance, `${width}px / ${scale}`).toBeLessThanOrEqual(21);
      await page.getByRole('link', { name: 'Back to top' }).focus();
      await page.keyboard.press('Enter');
      await expect(page.locator('#top')).toBeFocused();
      await expect.poll(() => page.evaluate(() => scrollY)).toBe(0);
      await page.keyboard.press(browserName === 'webkit' ? 'Alt+Tab' : 'Tab');
      await expect(page.locator('.brand')).toBeFocused();
    }
  }
});

test('copy email reports success and preserves manual fallback on denial', async ({ page }) => {
  await page.addInitScript(() => Object.defineProperty(navigator, 'clipboard', { configurable: true, value: { writeText: async (text) => { window.copiedEmail = text; } } }));
  await page.goto('/');
  await page.getByRole('button', { name: 'Copy email address' }).click();
  await expect(page.getByRole('status')).toHaveText('Email address copied.');
  expect(await page.evaluate(() => window.copiedEmail)).toBe('acquadropatrizio@gmail.com');
  await page.evaluate(() => { navigator.clipboard.writeText = async () => { throw new Error('Denied'); }; });
  await page.getByRole('button', { name: 'Copy email address' }).click();
  await expect(page.getByRole('status')).toContainText('copy it manually');
  await expect(page.locator('.email-copy > a')).toHaveText('acquadropatrizio@gmail.com');
});

test('missing portrait uses the bundled placeholder', async ({ page }) => {
  await page.route('**/images/PatrizioAcquadro-*.webp', (route) => route.abort());
  await page.goto('/');
  const portrait = page.locator('.portrait img');
  await expect(portrait).toHaveAttribute('src', '/images/avatar-placeholder.svg');
  await expect(portrait).not.toHaveAttribute('srcset', /.+/);
  await expect.poll(() => portrait.evaluate((image) => image.naturalWidth)).toBeGreaterThan(0);
});

test('all pages reflow at mobile, tablet, desktop and 200% text enlargement', async ({ page }) => {
  for (const route of routes) {
    await page.goto(route);
    for (const width of [320, 390, 765, 1120, 1440]) {
      await page.setViewportSize({ width, height: 950 });
      await page.evaluate(() => new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve))));
      expect(await page.evaluate(() => document.documentElement.scrollWidth), `${route} at ${width}`).toBeLessThanOrEqual(width);
    }
    for (const width of [320, 390, 1440]) {
      await page.setViewportSize({ width, height: 950 });
      await page.evaluate(() => { document.documentElement.style.fontSize = '200%'; });
      await page.evaluate(() => new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve))));
      const layout = await page.evaluate(() => ({ width: innerWidth, content: document.documentElement.scrollWidth, overflow: [...document.querySelectorAll('body *')].filter((element) => element.getBoundingClientRect().right > innerWidth + 1).map((element) => ({ tag: element.tagName, class: element.className, text: element.textContent.slice(0, 65) })), textOverflow: [...document.querySelectorAll('h1,h2,h3,a,p,span')].filter((element) => !element.closest('.sr-only') && element.scrollWidth > element.clientWidth + 1 && element.clientWidth > 0).map((element) => ({ tag: element.tagName, class: element.className, text: element.textContent.slice(0, 80), width: element.clientWidth, scroll: element.scrollWidth })) }));
      expect(layout.content, `${route} at ${width}, 200% text: ${JSON.stringify(layout)}`).toBeLessThanOrEqual(width);
      await page.evaluate(() => { document.documentElement.style.fontSize = ''; });
    }
  }
});

test('keyboard entry, reduced motion and primary touch targets remain accessible', async ({ page, browserName }) => {
  await page.goto('/');
  await page.keyboard.press(browserName === 'webkit' ? 'Alt+Tab' : 'Tab');
  await expect(page.getByRole('link', { name: 'Skip to main content' })).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page.locator('#main')).toBeFocused();
  expect(await page.locator('.hero-copy').evaluate((element) => getComputedStyle(element).animationName)).toBe('none');
  await page.setViewportSize({ width: 390, height: 844 });
  for (const selector of ['.menu-toggle', '.copy-email', '.hero-actions .button']) {
    const box = await page.locator(selector).boundingBox();
    expect(box.width, selector).toBeGreaterThanOrEqual(44);
    expect(box.height, selector).toBeGreaterThanOrEqual(44);
  }
});

test('visible text meets AA contrast and stays readable across all page compositions', async ({ page }) => {
  for (const route of routes) {
    await page.goto(route);
    const failures = await page.evaluate(() => {
      const rgba = (value) => value.match(/[\d.]+/g)?.map(Number) || [0, 0, 0, 0];
      const blend = (color, bg) => color.slice(0, 3).map((value, index) => value * (color[3] ?? 1) + bg[index] * (1 - (color[3] ?? 1)));
      const luminance = (color) => color.slice(0, 3).map((value) => value / 255).map((value) => value <= .04045 ? value / 12.92 : ((value + .055) / 1.055) ** 2.4).reduce((sum, value, index) => sum + value * [.2126, .7152, .0722][index], 0);
      const background = (element) => {
        const chain = [];
        for (let parent = element; parent; parent = parent.parentElement) chain.unshift(parent);
        return chain.reduce((bg, node) => blend(rgba(getComputedStyle(node).backgroundColor), bg), [255, 255, 255]);
      };
      const text = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
      const elements = new Set();
      for (let node = text.nextNode(); node; node = text.nextNode()) {
        if (node.textContent.trim() && !node.parentElement.closest('.sr-only,[aria-hidden="true"],script,style')) elements.add(node.parentElement);
      }
      return [...elements].filter((element) => element.getBoundingClientRect().width && element.getBoundingClientRect().height).map((element) => {
        const color = luminance(rgba(getComputedStyle(element).color));
        const bg = luminance(background(element));
        return { text: element.textContent.trim().slice(0, 60), size: parseFloat(getComputedStyle(element).fontSize), ratio: (Math.max(color, bg) + .05) / (Math.min(color, bg) + .05) };
      }).filter((item) => item.ratio < 4.5 || item.size < 11);
    });
    expect(failures, route).toEqual([]);
  }
});
