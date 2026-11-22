#!/usr/bin/env node
// Synchronize release metadata from Aliyun OSS (read-only) into public/releases.
// Only --write replaces the local directory; without it the snapshot is validated and reported.
// --from <directory> reads an existing manifest tree (the previous data/releases layout)
// instead of OSS, for backfills and tests.
import { execFile } from 'node:child_process';
import { createHash } from 'node:crypto';
import { cp, mkdir, mkdtemp, readFile, readdir, rename, rm, writeFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { promisify } from 'node:util';
import { CLIENT_FILE, SERVER_FILE, buildReleaseIndex, serverPackageUrl, validateClientCatalog, validateServerRelease } from '../shared/release-catalog.mjs';
import { loadReleaseData } from '../shared/release-store.mjs';

const exec = promisify(execFile);
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
export const DEFAULT_DESTINATION = path.join(ROOT, 'public/releases');
const BUCKET = 'oss://zhama-public/';
const VERSION = 'v\\d+\\.\\d+\\.\\d+(?:-[A-Za-z0-9.-]+)?(?:\\+[A-Za-z0-9.-]+)?';
const CLIENT_KEY = new RegExp(`^releases/(tego|qhtig|qhtig-data|ykzq)/(desktop|mobile|studio)/(latest\\.json|(${VERSION})/index\\.json)$`);
const SERVER_KEY = new RegExp(`^tego-os/(?<version>${VERSION})/tego-(?<product>avatar|workflow)-(?<kind>compose|service-images|k8s)-\\k<version>-(?<arch>amd64|arm64)\\.tar$`);

/** Parse `ossutil ls` output: date, time, zone, storage class, size, type and ETag before each key. */
export function parseListing(text) {
  return text.split('\n').filter(line => line.includes(BUCKET)).map(line => {
    const [metadata, key] = line.split(BUCKET);
    const fields = metadata.trim().split(/\s+/);
    if (fields.length !== 7 || !/^\d+$/.test(fields[4]) || !/^[-+][0-9]{4}$/.test(fields[2])) throw new Error('Unexpected OSS listing format');
    const offset = fields[2].slice(0, 3) + ':' + fields[2].slice(3);
    const releaseDate = new Date(`${fields[0]}T${fields[1]}${offset}`).toISOString();
    return { key: key.trimEnd(), size: Number(fields[4]), etag: fields[6].toLowerCase(), releaseDate };
  });
}

export function selectSources(objects) {
  const keys = new Map(objects.map(object => [object.key, object]));
  const clients = objects.flatMap(object => {
    const match = CLIENT_KEY.exec(object.key);
    if (!match) return [];
    const [, brand, kind, , version] = match;
    return [{ ...object, file: version ? `${version}/clients/${brand}/${kind}.json` : `latest/${brand}/${kind}.json` }];
  });
  const servers = [];
  const incomplete = [];
  for (const object of objects) {
    const match = SERVER_KEY.exec(object.key);
    if (!match) continue;
    const checksum = keys.get(`${object.key}.sha256`);
    if (!checksum || !checksum.size || !object.size) { incomplete.push(object.key); continue; }
    const { version, product, kind, arch } = match.groups;
    servers.push({ ...object, version, product, kind, arch, checksum, file: `${version}/server/${product}/${kind}/${arch}.json` });
  }
  if (!clients.some(client => client.file === 'latest/tego/desktop.json')) throw new Error('Official desktop catalog is missing; refusing to synchronize');
  return { clients, servers, incomplete };
}

export function parseChecksum(text, filename) {
  const match = text.trim().match(/^([a-fA-F0-9]{64})[ \t]+\*?([^\r\n]+)$/);
  if (!match || match[2] !== filename) throw new Error(`Invalid checksum file for ${filename}`);
  return match[1].toLowerCase();
}

async function oss(...args) {
  const { stdout } = await exec('ossutil', [...args, '--endpoint', 'oss-accelerate.aliyuncs.com', '--region', 'cn-heyuan',
    '--connect-timeout', '10', '--read-timeout', '20', '--retry-times', '2'], { timeout: 90000, maxBuffer: 32 * 1024 * 1024 });
  return stdout;
}

async function mapLimit(items, callback) {
  let next = 0;
  const results = await Promise.allSettled(Array.from({ length: 6 }, async () => {
    while (next < items.length) await callback(items[next++]);
  }));
  const failure = results.find(result => result.status === 'rejected');
  if (failure) throw failure.reason;
}

const json = value => Buffer.from(JSON.stringify(value, null, 2) + '\n');

/** Read release records from OSS and return the validated manifest files keyed by relative path. */
async function filesFromOss({ listing, download, temporary }) {
  const objects = listing ?? (await Promise.all(['releases/', 'tego-os/'].map(async prefix =>
    parseListing(await oss('ls', `${BUCKET}${prefix}`))))).flat();
  const { clients, servers, incomplete } = selectSources(objects);
  const files = new Map();
  async function readObject(object) {
    let body;
    if (download) body = Buffer.from(await download(object));
    else {
      const file = path.join(temporary, createHash('sha256').update(object.key).digest('hex'));
      await oss('cp', `${BUCKET}${object.key}`, file, '--force');
      body = await readFile(file);
    }
    if (body.length !== object.size || createHash('md5').update(body).digest('hex') !== object.etag) {
      throw new Error(`OSS object changed during synchronization: ${object.key}; retry with a fresh listing`);
    }
    return body;
  }
  await mapLimit(clients, async client => {
    const body = await readObject(client);
    validateClientCatalog(JSON.parse(body.toString('utf8')), client.file);
    files.set(client.file, body);
  });
  await mapLimit(servers, async server => {
    const sha256 = parseChecksum((await readObject(server.checksum)).toString('utf8'), path.posix.basename(server.key));
    const url = serverPackageUrl(server.version, server.product, server.kind, server.arch);
    const record = { schemaVersion: 1, product: server.product, kind: server.kind, arch: server.arch,
      version: server.version, releaseDate: server.releaseDate, url, checksumUrl: `${url}.sha256`, sha256, size: server.size };
    validateServerRelease(record, server.file);
    files.set(server.file, json(record));
  });
  return { files, clientCatalogs: clients.length, serverPackages: servers.length, incomplete };
}

/** Read an existing manifest tree, such as the previous website's data/releases directory. */
async function filesFromDirectory(directory) {
  const files = new Map();
  const walk = async (current, prefix = '') => {
    for (const entry of await readdir(current, { withFileTypes: true })) {
      const relative = prefix + entry.name;
      if (entry.isDirectory()) await walk(path.join(current, entry.name), `${relative}/`);
      else if (relative !== 'index.json') {
        if (!CLIENT_FILE.test(relative) && !SERVER_FILE.test(relative)) throw new Error(`Unexpected release file: ${relative}`);
        const body = await readFile(path.join(current, entry.name));
        const record = JSON.parse(body.toString('utf8'));
        if (CLIENT_FILE.test(relative)) validateClientCatalog(record, relative); else validateServerRelease(record, relative);
        files.set(relative, body);
      }
    }
  };
  await walk(directory);
  if (!files.has('latest/tego/desktop.json')) throw new Error('Official desktop catalog is missing; refusing to synchronize');
  const servers = [...files.keys()].filter(file => SERVER_FILE.test(file)).length;
  return { files, clientCatalogs: files.size - servers, serverPackages: servers, incomplete: [] };
}

async function sameContent(destination, index, files) {
  let previous;
  try { previous = JSON.parse(await readFile(path.join(destination, 'index.json'), 'utf8')); }
  catch (error) { if (error.code === 'ENOENT') return { unchanged: false }; throw error; }
  if (JSON.stringify({ ...previous, updatedAt: null }) !== JSON.stringify({ ...index, updatedAt: null })) return { unchanged: false };
  for (const [file, body] of files) {
    try { if (!body.equals(await readFile(path.join(destination, 'manifests', file)))) return { unchanged: false }; }
    catch (error) { if (error.code === 'ENOENT') return { unchanged: false }; throw error; }
  }
  return { unchanged: true, updatedAt: previous.updatedAt };
}

export async function synchronize({ write = false, destination = DEFAULT_DESTINATION, from, listing, download, now = () => new Date() } = {}) {
  const temporary = await mkdtemp(path.join(os.tmpdir(), 'zhama-release-source-'));
  let stage;
  try {
    const source = from ? await filesFromDirectory(from) : await filesFromOss({ listing, download, temporary });
    const { files } = source;
    const index = buildReleaseIndex([...files].map(([file, body]) => [file, body.length]), now().toISOString());
    const { unchanged, updatedAt } = await sameContent(destination, index, files);
    if (unchanged) index.updatedAt = updatedAt;
    // Validate a complete staged snapshot before replacing any local data.
    stage = await mkdtemp(path.join(os.tmpdir(), 'zhama-release-stage-'));
    for (const [file, body] of files) {
      await mkdir(path.dirname(path.join(stage, 'manifests', file)), { recursive: true });
      await writeFile(path.join(stage, 'manifests', file), body);
    }
    await mkdir(path.join(stage, 'latest'));
    for (const kind of ['desktop', 'mobile', 'studio']) {
      const latest = files.get(`latest/tego/${kind}.json`);
      if (latest) await writeFile(path.join(stage, 'latest', `${kind}.json`), latest);
    }
    await writeFile(path.join(stage, 'index.json'), json(index));
    await loadReleaseData(stage);
    if (write && !unchanged) {
      await mkdir(path.dirname(destination), { recursive: true });
      // Stage on the destination filesystem before renaming; temporary directories can be on another volume.
      const ready = await mkdtemp(path.join(path.dirname(destination), '.releases-ready-'));
      try {
        await cp(stage, ready, { recursive: true });
        const backup = ready + '-previous';
        let hadPrevious = false;
        try { await rename(destination, backup); hadPrevious = true; }
        catch (error) { if (error.code !== 'ENOENT') throw error; }
        try { await rename(ready, destination); }
        catch (error) { if (hadPrevious) await rename(backup, destination); throw error; }
        if (hadPrevious) await rm(backup, { recursive: true });
      } finally { await rm(ready, { recursive: true, force: true }); }
    }
    return { mode: write ? 'write' : 'preview', changed: !unchanged, clientCatalogs: source.clientCatalogs,
      serverPackages: source.serverPackages, versions: index.versions, defaultVersion: index.defaultVersion,
      updatedAt: index.updatedAt, incomplete: source.incomplete, destination };
  } finally {
    await rm(temporary, { recursive: true, force: true });
    if (stage) await rm(stage, { recursive: true, force: true });
  }
}

export function parseArguments(values) {
  const options = { write: false };
  for (let index = 0; index < values.length; index++) {
    if (values[index] === '--write') options.write = true;
    else if (values[index] === '--from' && values[index + 1]) options.from = path.resolve(values[++index]);
    else throw new Error('Usage: node scripts/sync-releases.mjs [--write] [--from <directory>]');
  }
  return options;
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try { console.log(JSON.stringify(await synchronize(parseArguments(process.argv.slice(2))), null, 2)); }
  catch (error) { console.error(error.message); process.exitCode = 1; }
}
