#!/usr/bin/env node
// Browser audits of the built site: every page at desktop, tablet and phone widths
// (document overflow, clipped text, broken images, runtime errors, untranslated English)
// and the localized interactions (language switch, mobile menu, download filters, FAQ,
// release history, contact form). Starts the local preview server for the duration.
// Usage: npm run build && npm run audit:browser
import { spawn } from 'node:child_process';
import { mkdtemp } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';

const origin = 'http://127.0.0.1:4350';
const server = spawn(process.execPath, ['server/contact/preview.mjs'], { stdio: ['ignore', 'inherit', 'inherit'] });
const stop = () => { if (server.exitCode === null && server.signalCode === null) server.kill('SIGTERM'); };
process.once('exit', stop);

let ready = false;
for (let attempt = 0; attempt < 100 && server.exitCode === null; attempt++) {
  try { ready = (await fetch(`${origin}/zh/`)).ok; if (ready) break; } catch { /* starting */ }
  await new Promise(resolve => setTimeout(resolve, 200));
}
if (!ready) { console.error('The preview server did not start; run npm run build first.'); stop(); process.exit(1); }

const output = await mkdtemp(path.join(os.tmpdir(), 'tego-browser-audit-'));
const run = (script, target) => new Promise(resolve => {
  const child = spawn(process.execPath, [script, path.join(output, target)], {
    stdio: 'inherit', env: { ...process.env, AUDIT_ORIGIN: origin, SCREENSHOT_SCOPE: process.env.SCREENSHOT_SCOPE || 'none' },
  });
  child.on('exit', code => resolve(code ?? 1));
});
const results = [
  await run('scripts/audit-multilingual-browser.mjs', 'pages'),
  await run('scripts/audit-locale-interactions.mjs', 'interactions'),
];
stop();
console.log(`Browser audit reports: ${output}`);
process.exitCode = results.some(code => code !== 0) ? 1 : 0;
