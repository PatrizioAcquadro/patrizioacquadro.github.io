import { firefox } from '@playwright/test';
import { existsSync, mkdtempSync, readFileSync, writeFileSync, rmSync, symlinkSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { tmpdir } from 'node:os';

// A distinct application name prevents macOS Firefox profile redirection from
// rejecting Playwright's temporary profile. The installed browser stays intact.
export function firefoxLaunchOptions() {
  if (process.platform !== 'darwin') return {};
  const source = resolve(dirname(firefox.executablePath()), '../Resources/application.ini');
  if (!existsSync(source)) return {}; // Let Playwright report a missing installation.
  const directory = mkdtempSync(join(tmpdir(), 'editorial-firefox-'));
  const descriptor = join(directory, 'application.ini');
  writeFileSync(descriptor, readFileSync(source, 'utf8').replace(/^Vendor=.*$/m, 'Vendor=EditorialPortfolioTests').replace(/^Name=.*$/m, 'Name=EditorialPortfolioTests'));
  symlinkSync(join(dirname(source), 'browser/omni.ja'), join(directory, 'omni.ja'));
  const wrapper = join(directory, 'firefox.sh');
  const quote = (value) => `'${value.replaceAll("'", "'\\''")}'`;
  // Firefox must see -app before Playwright's -profile argument.
  writeFileSync(wrapper, `#!/bin/sh\nexec ${quote(firefox.executablePath())} -app ${quote(descriptor)} "$@"\n`, { mode: 0o700 });
  process.on('exit', () => rmSync(directory, { recursive: true, force: true }));
  return { executablePath: wrapper };
}
