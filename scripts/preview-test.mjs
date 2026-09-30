import { execFileSync } from 'node:child_process';
import { mkdtempSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { preview } from 'vite';

// Test the production CSP over HTTPS, including WebKit's insecure-request upgrade.
const directory = mkdtempSync(join(tmpdir(), 'portfolio-test-tls-'));
const key = join(directory, 'key.pem');
const cert = join(directory, 'cert.pem');
let server;
try {
  execFileSync('openssl', ['req', '-x509', '-newkey', 'rsa:2048', '-nodes', '-keyout', key, '-out', cert, '-days', '1', '-subj', '/CN=localhost'], { stdio: 'ignore' });
  server = await preview({ preview: { host: '127.0.0.1', port: 4173, strictPort: true, https: { key: readFileSync(key), cert: readFileSync(cert) } } });
} finally {
  rmSync(directory, { recursive: true, force: true });
}
for (const signal of ['SIGINT', 'SIGTERM']) process.on(signal, () => server.httpServer.close(() => process.exit(0)));
