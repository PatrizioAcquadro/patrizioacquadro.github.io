import { test, expect } from '@playwright/test';

const counts = { '.news-item': 7, '.research-card': 4, '.project-card': 10, '.venture-card': 3, '.talk-item': 8 };

test('production loads without runtime, CSP or asset errors', async ({ page }) => {
  const errors = [];
  page.on('pageerror', (error) => errors.push(error.message));
  page.on('console', (message) => { if (message.type() === 'error') errors.push(message.text()); });
  page.on('response', (response) => { if (response.status() >= 400) errors.push(`${response.status()} ${response.url()}`); });
  await page.goto('/');
  await expect(page.locator('#hero-name')).toHaveText('Patrizio Acquadro');
  for (const [selector, count] of Object.entries(counts)) await expect(page.locator(selector)).toHaveCount(count);
  await expect(page.locator('#profile-image')).toHaveJSProperty('complete', true);
  expect(await page.locator('#profile-image').evaluate((image) => image.naturalWidth)).toBeGreaterThan(0);
  expect(errors).toEqual([]);
});

test('content and navigation work without JavaScript', async ({ browser, baseURL }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
  const page = await context.newPage();
  await page.goto(baseURL);
  for (const [selector, count] of Object.entries(counts)) await expect(page.locator(selector)).toHaveCount(count);
  await expect(page.locator('#hero-bio')).toContainText('Purdue University');
  await expect(page.locator('#menu-toggle')).toBeHidden();
  await expect(page.locator('#theme-toggle')).toBeHidden();
  await page.getByRole('link', { name: 'Research', exact: true }).click();
  await expect(page).toHaveURL(/#research$/);
  await expect(page.getByRole('link', { name: 'Mail', exact: true })).toHaveAttribute('href', 'mailto:acquadropatrizio@gmail.com');
  const response = await page.request.get(await page.getByRole('link', { name: 'Download CV' }).getAttribute('href'));
  expect(response.status()).toBe(200);
  expect(response.headers()['content-type']).toContain('application/pdf');
  await page.goto(`${baseURL}/cv/`);
  await expect(page).toHaveURL(/\/#home$/);
  await context.close();
});

test('mobile navigation closes, restores focus and follows anchors', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  const menu = page.locator('#menu-toggle');
  await menu.click();
  await expect(menu).toHaveAttribute('aria-expanded', 'true');
  await page.keyboard.press('Escape');
  await expect(menu).toBeFocused();
  await expect(menu).toHaveAttribute('aria-expanded', 'false');
  await menu.click();
  await page.getByRole('link', { name: 'Research', exact: true }).click();
  await expect(menu).toHaveAttribute('aria-expanded', 'false');
  await expect(page.locator('#research')).toBeFocused();
  await expect(page.locator('a[aria-current="location"]')).toHaveAttribute('href', '#research');
  expect(await page.locator('#research').evaluate((section) => section.getBoundingClientRect().top)).toBeGreaterThanOrEqual(80);
});

test('theme persists and remains usable when storage is unavailable', async ({ page }) => {
  await page.goto('/');
  const initial = await page.locator('html').getAttribute('data-theme');
  await page.locator('#theme-toggle').click();
  const selected = initial === 'dark' ? 'light' : 'dark';
  await expect(page.locator('html')).toHaveAttribute('data-theme', selected);
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('data-theme', selected);
  await page.addInitScript(() => {
    Object.defineProperty(window, 'localStorage', { get() { throw new DOMException('Unavailable', 'SecurityError'); } });
  });
  await page.reload();
  await page.locator('#theme-toggle').click();
  await expect(page.locator('#hero-name')).toBeVisible();
});

test('native email dialog contains focus, closes and reopens correctly', async ({ page }) => {
  await page.goto('/');
  const trigger = page.getByRole('link', { name: 'Mail', exact: true });
  const dialog = page.getByRole('dialog');
  await trigger.click();
  await expect(dialog).toBeVisible();
  await expect(page.locator('#mail-sheet-close')).toBeFocused();
  for (let i = 0; i < 8; i++) {
    await page.keyboard.press('Tab');
    expect(await dialog.evaluate((element) => element.contains(document.activeElement))).toBe(true);
  }
  await page.keyboard.press('Shift+Tab');
  expect(await dialog.evaluate((element) => element.contains(document.activeElement))).toBe(true);
  await expect(page.getByRole('link', { name: 'Open email app', exact: true })).toHaveAttribute('href', 'mailto:acquadropatrizio@gmail.com');
  await page.keyboard.press('Escape');
  await expect(dialog).toBeHidden();
  await expect(trigger).toBeFocused();
  await trigger.click();
  await page.mouse.click(10, 10);
  await expect(dialog).toBeHidden();
  await expect(trigger).toBeFocused();
  await trigger.click();
  await page.getByRole('button', { name: 'Close mail panel' }).click();
  await expect(trigger).toBeFocused();
});

test('copy success and clipboard-denied manual fallback', async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(navigator, 'clipboard', { configurable: true, value: { writeText: async (text) => { window.copiedEmail = text; } } });
  });
  await page.goto('/');
  await page.getByRole('link', { name: 'Mail', exact: true }).click();
  await page.getByRole('button', { name: 'Copy', exact: true }).click();
  await expect(page.getByRole('status')).toHaveText('Copied ✓');
  expect(await page.evaluate(() => window.copiedEmail)).toBe('acquadropatrizio@gmail.com');
  await page.evaluate(() => {
    navigator.clipboard.writeText = async () => { throw new Error('Denied'); };
    document.execCommand = () => false;
  });
  await page.getByRole('button', { name: 'Copy', exact: true }).click();
  await expect(page.getByRole('status')).toContainText('copy it manually');
  await expect(page.locator('.clipboard-fallback')).toHaveCount(0);
  await expect(page.getByRole('button', { name: 'Copy', exact: true })).toBeFocused();
});

test('legacy CV route redirects to the homepage', async ({ page }) => {
  await page.goto('/cv/');
  await expect(page).toHaveURL(/\/#home$/);
  await expect(page.locator('#hero-name')).toHaveText('Patrizio Acquadro');
});

test('responsive layouts, both themes and 200% text enlargement do not overflow', async ({ page }) => {
  await page.goto('/');
  for (const width of [320, 390, 765, 1120, 1440]) {
    await page.setViewportSize({ width, height: 1000 });
    for (const theme of ['light', 'dark']) {
      await page.evaluate((selected) => document.documentElement.setAttribute('data-theme', selected), theme);
      const layout = await page.evaluate(() => ({
        width: innerWidth,
        content: document.documentElement.scrollWidth,
        overflow: [...document.querySelectorAll('body *')].filter((element) => element.getBoundingClientRect().right > innerWidth + 1).map((element) => element.className)
      }));
      expect(layout.content, JSON.stringify(layout)).toBeLessThanOrEqual(layout.width);
    }
  }
  await page.setViewportSize({ width: 390, height: 844 });
  await page.evaluate(() => { document.documentElement.style.fontSize = '200%'; });
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.locator('#menu-toggle').click();
  await page.getByRole('link', { name: 'Contact', exact: true }).click();
  await page.getByRole('link', { name: 'Mail', exact: true }).click();
  expect(await page.locator('.mail-sheet').evaluate((element) => element.scrollWidth <= element.clientWidth)).toBe(true);
});

test('reduced motion, keyboard skip link and touch targets', async ({ page }) => {
  await page.goto('/');
  await page.keyboard.press('Tab');
  await expect(page.getByRole('link', { name: 'Skip to main content' })).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page.locator('#main-content')).toBeFocused();
  expect(await page.locator('body').evaluate((body) => getComputedStyle(body, '::before').animationName)).toBe('none');
  await page.setViewportSize({ width: 390, height: 844 });
  await page.locator('#menu-toggle').click();
  for (const selector of ['#menu-toggle', '#theme-toggle']) {
    const box = await page.locator(selector).boundingBox();
    expect(box.width).toBeGreaterThanOrEqual(44);
    expect(box.height).toBeGreaterThanOrEqual(44);
  }
});
