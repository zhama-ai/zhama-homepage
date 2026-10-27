#!/usr/bin/env node
// Read-only OSS access. Only --write changes the local release data directory.
import { execFile } from 'node:child_process';
import { createHash } from 'node:crypto';
import { mkdtemp, mkdir, readFile, rename, rm, writeFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { promisify } from 'node:util';
import { compareVersions, loadLocalReleaseData, validateClientCatalog, validateServerRelease } from '../src/lib/release-data.ts';

const exec = promisify(execFile);
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const CLIENT_KEY = /^releases\/(tego|qhtig|qhtig-data|ykzq)\/(desktop|mobile)\/(latest\.json|(v\d+\.\d+\.\d+(?:-[A-Za-z0-9.-]+)?(?:\+[A-Za-z0-9.-]+)?)\/index\.json)$/;
const SERVER_KEY = /^tego-os\/(?<version>v\d+\.\d+\.\d+(?:-[A-Za-z0-9.-]+)?(?:\+[A-Za-z0-9.-]+)?)\/tego-(?<product>avatar|workflow)-(?<kind>compose|service-images|k8s)-\k<version>-(?<arch>amd64|arm64)\.tar$/;

export function parseListing(text) {
  return text.split('\n').filter(line => line.includes('oss://zhama-public/')).map(line => {
    const [metadata, key] = line.split('oss://zhama-public/');
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
  const servers = [], incomplete = [];
  for (const object of objects) {
    const match = SERVER_KEY.exec(object.key);
    if (!match) continue;
    const checksum = keys.get(`${object.key}.sha256`);
    if (!checksum || !checksum.size || !object.size) { incomplete.push(object.key); continue; }
    const { version, product, kind, arch } = match.groups;
    servers.push({ ...object, version, product, kind, arch, checksum,
      file: `${version}/server/${product}/${kind}/${arch}.json` });
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

export async function synchronize({ write = false, destination = path.join(ROOT, 'data/releases'), listing, download } = {}) {
  const temporary = await mkdtemp(path.join(os.tmpdir(), 'zhama-release-source-'));
  let stage;
  try {
    const objects = listing ?? (await Promise.all(['releases/', 'tego-os/'].map(async prefix =>
      parseListing(await oss('ls', `oss://zhama-public/${prefix}`))))).flat();
    const { clients, servers, incomplete } = selectSources(objects);
    const files = new Map();
    async function readObject(object) {
      let body;
      if (download) body = Buffer.from(await download(object));
      else {
        const file = path.join(temporary, createHash('sha256').update(object.key).digest('hex'));
        await oss('cp', `oss://zhama-public/${object.key}`, file, '--force');
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
      const url = 'https://cdn.zhama.com.cn/' + server.key.split('/').map(encodeURIComponent).join('/');
      const record = { schemaVersion: 1, product: server.product, kind: server.kind, arch: server.arch,
        version: server.version, releaseDate: server.releaseDate, url, checksumUrl: `${url}.sha256`, sha256, size: server.size };
      validateServerRelease(record, server.file);
      files.set(server.file, Buffer.from(JSON.stringify(record, null, 2) + '\n'));
    });
    const versions = [...new Set([...files.keys()].filter(file => !file.startsWith('latest/')).map(file => file.split('/')[0]))].sort(compareVersions);
    const index = { schemaVersion: 1, updatedAt: new Date().toISOString(), defaultVersion: versions.at(-1), versions, files: [...files.keys()].sort() };
    let previous;
    try { previous = JSON.parse(await readFile(path.join(destination, 'index.json'), 'utf8')); }
    catch (error) { if (error.code !== 'ENOENT') throw error; }
    let unchanged = previous && JSON.stringify({ ...previous, updatedAt: null }) === JSON.stringify({ ...index, updatedAt: null });
    if (unchanged) for (const [file, body] of files) {
      try { if (!body.equals(await readFile(path.join(destination, file)))) { unchanged = false; break; } }
      catch (error) { if (error.code !== 'ENOENT') throw error; unchanged = false; break; }
    }
    if (unchanged) index.updatedAt = previous.updatedAt;
    // Validate a complete staged snapshot before replacing any local data.
    stage = await mkdtemp(path.join(os.tmpdir(), 'zhama-release-stage-'));
    for (const [file, body] of files) {
      await mkdir(path.dirname(path.join(stage, file)), { recursive: true });
      await writeFile(path.join(stage, file), body);
    }
    await writeFile(path.join(stage, 'index.json'), JSON.stringify(index, null, 2) + '\n');
    await loadLocalReleaseData(stage);
    if (write && !unchanged) {
      await mkdir(path.dirname(destination), { recursive: true });
      // Stage on the destination filesystem before renaming; source temp dirs
      // can be on a different volume. No live server directory is modified.
      const { cp } = await import('node:fs/promises');
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
    return { mode: write ? 'write' : 'preview', changed: !unchanged, clientCatalogs: clients.length,
      serverPackages: servers.length, versions: index.versions, defaultVersion: index.defaultVersion,
      updatedAt: index.updatedAt, incomplete, destination };
  } finally {
    await rm(temporary, { recursive: true, force: true });
    if (stage) await rm(stage, { recursive: true, force: true });
  }
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const arguments_ = process.argv.slice(2);
  if (arguments_.some(value => value !== '--write')) throw new Error('Usage: pnpm sync:releases [--write]');
  try { console.log(JSON.stringify(await synchronize({ write: arguments_.includes('--write') }), null, 2)); }
  catch (error) { console.error(error.message); process.exitCode = 1; }
}
