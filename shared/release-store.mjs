import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { CLIENT_FILE, validateReleaseIndex, validateReleaseRecord } from './release-catalog.mjs';

// Resolved from the project root like other build inputs (see src/lib/seo-images.ts):
// bundled build chunks do not keep this module's original location.
export const RELEASE_DIRECTORY = path.resolve('public/releases');

/**
 * Load and validate the committed release snapshot. Every indexed manifest is
 * parsed and checked; a single invalid record fails the build.
 */
export async function loadReleaseData(directory = RELEASE_DIRECTORY) {
  const index = JSON.parse(await readFile(path.join(directory, 'index.json'), 'utf8'));
  const files = validateReleaseIndex(index);
  const clients = new Map();
  const servers = new Map();
  await Promise.all(files.map(async (file, position) => {
    const body = await readFile(path.join(directory, 'manifests', file));
    if (body.length !== index.files[position].size) throw new Error(`Indexed manifest size changed: ${file}`);
    const record = JSON.parse(body.toString('utf8'));
    validateReleaseRecord(record, file);
    (CLIENT_FILE.test(file) ? clients : servers).set(file, record);
  }));
  for (const kind of ['desktop', 'mobile', 'studio']) {
    const latest = clients.get(`latest/tego/${kind}.json`);
    if (!latest) continue;
    const published = JSON.parse(await readFile(path.join(directory, 'latest', `${kind}.json`), 'utf8'));
    if (JSON.stringify(published) !== JSON.stringify(latest)) throw new Error(`public/releases/latest/${kind}.json differs from the indexed TeGo catalog`);
  }
  return { index, clients, servers };
}

let cached;
/** Build-time accessor: the snapshot is immutable for the duration of one build. */
export function releaseData() {
  cached ??= loadReleaseData().catch(error => { cached = undefined; throw error; });
  return cached;
}
