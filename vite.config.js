import { defineConfig } from 'vite';
import { fileURLToPath } from 'node:url';

function resolveBase() {
  const repository = process.env.GITHUB_REPOSITORY;

  if (!repository) {
    return '/';
  }

  const parts = repository.split('/');
  const repoName = parts[1] || '';

  if (repoName.endsWith('.github.io')) {
    return '/';
  }

  return `/${repoName}/`;
}

export default defineConfig({
  base: resolveBase(),
  build: {
    rollupOptions: {
      input: {
        main: fileURLToPath(new URL('index.html', import.meta.url)),
        cv: fileURLToPath(new URL('cv/index.html', import.meta.url))
      }
    }
  }
});
