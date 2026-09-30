import { test, expect } from '@playwright/test';

test('normal text meets 4.5:1 contrast in both themes and the email panel', async ({ page }) => {
  await page.goto('/');
  for (const theme of ['dark', 'light']) {
    await page.evaluate((value) => document.documentElement.setAttribute('data-theme', value), theme);
    await page.getByRole('link', { name: 'Mail', exact: true }).click();
    const results = await page.evaluate(() => {
      const rgba = (value) => value.match(/[\d.]+/g)?.map(Number) || [0, 0, 0, 0];
      const blend = (foreground, background) => foreground.slice(0, 3).map((value, index) => value * (foreground[3] ?? 1) + background[index] * (1 - (foreground[3] ?? 1)));
      const luminance = (color) => {
        const linear = color.slice(0, 3).map((value) => value / 255).map((value) => value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4);
        return 0.2126 * linear[0] + 0.7152 * linear[1] + 0.0722 * linear[2];
      };
      const contrast = (first, second) => {
        const [low, high] = [luminance(first), luminance(second)].sort((a, b) => a - b);
        return (high + 0.05) / (low + 0.05);
      };
      const gradients = (style) => (style.backgroundImage.match(/rgba?\([^)]*\)/g) || []).map(rgba);
      const backgrounds = (element) => {
        const ancestors = [];
        for (let parent = element; parent; parent = parent.parentElement) ancestors.unshift(parent);
        let colors = [[255, 255, 255]];
        for (const ancestor of ancestors) {
          const style = getComputedStyle(ancestor);
          colors = colors.map((color) => blend(rgba(style.backgroundColor), color));
          // Check gradient endpoints conservatively rather than sampling one convenient point.
          const stops = gradients(style);
          if (stops.length) colors = colors.flatMap((color) => stops.map((stop) => blend(stop, color)));
          if (ancestor === document.body) {
            const ambientStops = gradients(getComputedStyle(ancestor, '::before'));
            if (ambientStops.length) colors = colors.flatMap((color) => ambientStops.map((stop) => blend(stop, color)));
          }
        }
        return colors;
      };
      const selectors = '.c-section__kicker,.hero-quote__author,.card-meta,.inline-note,.footer-inner p,.news-date,.talk-date,.card-body,.card-list li,.c-badge,.contact-link,.c-navbar__link,.mail-sheet__email,.mail-sheet__kicker,.mail-sheet__title,.mail-sheet__close,.c-button';
      return [...document.querySelectorAll(selectors)].map((element) => ({
        text: element.textContent.trim().slice(0, 60),
        ratio: Math.min(...backgrounds(element).map((background) => contrast(rgba(getComputedStyle(element).color), background)))
      }));
    });
    for (const result of results) expect(result.ratio, `${theme}: ${result.text}`).toBeGreaterThanOrEqual(4.5);
    await page.keyboard.press('Escape');
  }
});
