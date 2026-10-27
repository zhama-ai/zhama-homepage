import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { validCatalog, type DownloadInfo, type MobileRelease } from './download.ts';
import { BUILD_BRANDS, buildReleaseMatrix, normalizeBuildVersion, serverBuildCandidates, type BrandBuilds, type ServerBuilds } from './release-builds.ts';

export const CLIENT_FILE = /^(?:latest|(v\d+\.\d+\.\d+(?:-[A-Za-z0-9.-]+)?(?:\+[A-Za-z0-9.-]+)?)\/clients)\/(tego|qhtig|qhtig-data|ykzq)\/(desktop|mobile)\.json$/;
export const SERVER_FILE = /^(v\d+\.\d+\.\d+(?:-[A-Za-z0-9.-]+)?(?:\+[A-Za-z0-9.-]+)?)\/server\/(avatar|workflow)\/(compose|service-images|k8s)\/(amd64|arm64)\.json$/;

export interface ReleaseIndex {
  schemaVersion: 1;
  updatedAt: string;
  defaultVersion: string;
  versions: string[];
  files: string[];
}

export interface ServerRelease {
  schemaVersion: 1;
  product: string;
  kind: string;
  arch: string;
  version: string;
  releaseDate: string;
  url: string;
  checksumUrl: string;
  sha256: string;
  size: number;
}

export interface LocalReleaseData {
  index: ReleaseIndex;
  clients: Map<string, DownloadInfo | MobileRelease>;
  servers: Map<string, ServerRelease>;
}

export function compareVersions(left: string, right: string): number {
  const parse = (value: string) => normalizeBuildVersion(value).slice(1).split('+')[0].split('-');
  const [a, ...aSuffix] = parse(left);
  const [b, ...bSuffix] = parse(right);
  const mainA = a.split('.').map(Number), mainB = b.split('.').map(Number);
  for (let i = 0; i < 3; i++) if (mainA[i] !== mainB[i]) return mainA[i] - mainB[i];
  if (!aSuffix.length || !bSuffix.length) return Number(!aSuffix.length) - Number(!bSuffix.length);
  const partsA = aSuffix.join('-').split('.'), partsB = bSuffix.join('-').split('.');
  for (let i = 0; i < Math.max(partsA.length, partsB.length); i++) {
    if (partsA[i] === undefined || partsB[i] === undefined) return partsA.length - partsB.length;
    if (partsA[i] === partsB[i]) continue;
    const numericA = /^\d+$/.test(partsA[i]), numericB = /^\d+$/.test(partsB[i]);
    if (numericA && numericB) return Number(partsA[i]) - Number(partsB[i]);
    if (numericA !== numericB) return numericA ? -1 : 1;
    return partsA[i] < partsB[i] ? -1 : 1;
  }
  return 0;
}

export function validateClientCatalog(value: unknown, file: string): asserts value is DownloadInfo | MobileRelease {
  const match = CLIENT_FILE.exec(file);
  if (!match) throw new Error(`Invalid client path: ${file}`);
  const [, version, brand, kind] = match;
  if (!validCatalog(value, kind as 'desktop' | 'mobile', brand)) throw new Error(`Invalid catalog: ${file}`);
  const catalog = value as DownloadInfo | MobileRelease;
  if (normalizeBuildVersion(catalog.version) !== catalog.version || (version && catalog.version !== version)) {
    throw new Error(`Catalog version mismatch: ${file}`);
  }
  const targets = catalog.targetVersions;
  if (!targets || !Object.keys(targets).length) throw new Error(`Missing target versions: ${file}`);
  const seen = new Set<string>();
  for (const [platform, payload] of Object.entries(catalog.platforms)) {
    const variants = kind === 'desktop' ? Object.entries(payload ?? {}) : [['', (payload as { downloads: Record<string, string> }).downloads]] as const;
    for (const [arch, formats] of variants) {
      const target = arch ? `${platform}/${arch}` : platform;
      const targetVersion = targets[target];
      if (!targetVersion || normalizeBuildVersion(targetVersion) !== targetVersion || (version && targetVersion !== version)) {
        throw new Error(`Target version mismatch: ${file}/${target}`);
      }
      seen.add(target);
      for (const address of Object.values(formats ?? {})) {
        const url = new URL(address);
        if (platform === 'ios') {
          if (!['testflight.apple.com', 'apps.apple.com'].includes(url.hostname)) throw new Error(`Invalid Apple URL: ${file}`);
        } else if (url.origin !== 'https://cdn.zhama.com.cn' ||
          !url.pathname.startsWith(`/releases/${brand}/${kind}/${encodeURIComponent(targetVersion)}/${target}/`)) {
          throw new Error(`Download is outside the release target: ${file}/${target}`);
        }
        if (url.search || url.hash || url.username || url.password) throw new Error(`Invalid download URL: ${file}`);
      }
    }
  }
  if (Object.keys(targets).some(target => !seen.has(target))) throw new Error(`Unknown catalog target: ${file}`);
}

export function validateServerRelease(value: unknown, file: string): asserts value is ServerRelease {
  const match = SERVER_FILE.exec(file);
  if (!match || !value || typeof value !== 'object') throw new Error(`Invalid server record: ${file}`);
  const [, version, product, kind, arch] = match;
  const record = value as ServerRelease;
  const filename = `tego-${product}-${kind}-${version}-${arch}.tar`;
  const url = `https://cdn.zhama.com.cn/tego-os/${encodeURIComponent(version)}/${encodeURIComponent(filename)}`;
  if (record.schemaVersion !== 1 || record.version !== version || record.product !== product || record.kind !== kind ||
    record.arch !== arch || record.url !== url || record.checksumUrl !== `${url}.sha256` ||
    !/^[a-f0-9]{64}$/.test(record.sha256) || !Number.isSafeInteger(record.size) || record.size <= 0 ||
    !Number.isFinite(Date.parse(record.releaseDate))) throw new Error(`Invalid server record: ${file}`);
}

export async function loadLocalReleaseData(directory = path.join(process.cwd(), 'data/releases')): Promise<LocalReleaseData> {
  const index = JSON.parse(await readFile(path.join(directory, 'index.json'), 'utf8')) as ReleaseIndex;
  if (index.schemaVersion !== 1 || !Number.isFinite(Date.parse(index.updatedAt)) ||
    !Array.isArray(index.files) || !Array.isArray(index.versions) || new Set(index.files).size !== index.files.length ||
    !index.versions.length || new Set(index.versions).size !== index.versions.length ||
    index.versions.some(version => normalizeBuildVersion(version) !== version) ||
    !index.versions.includes(index.defaultVersion)) throw new Error('Invalid local release index');
  const clients: LocalReleaseData['clients'] = new Map(), servers: LocalReleaseData['servers'] = new Map();
  await Promise.all(index.files.map(async file => {
    if (typeof file !== 'string' || (!CLIENT_FILE.test(file) && !SERVER_FILE.test(file))) throw new Error(`Invalid release path: ${file}`);
    const record: unknown = JSON.parse(await readFile(path.join(directory, file), 'utf8'));
    if (CLIENT_FILE.test(file)) {
      validateClientCatalog(record, file);
      clients.set(file, record);
    } else {
      validateServerRelease(record, file);
      servers.set(file, record);
    }
  }));
  // latest can retain targets whose historical snapshot was never published.
  // Preserve that catalog, but never invent a version snapshot from it.
  const actualVersions = [...new Set(index.files.filter(file => !file.startsWith('latest/')).map(file => file.split('/')[0]))].sort(compareVersions);
  if (JSON.stringify(actualVersions) !== JSON.stringify(index.versions)) throw new Error('Release versions do not match the local files');
  if (!clients.has('latest/tego/desktop.json')) throw new Error('Missing official desktop release');
  return { index, clients, servers };
}

export function localBuilds(data: LocalReleaseData, requestedVersion?: string) {
  const version = requestedVersion ? normalizeBuildVersion(requestedVersion) : data.index.defaultVersion;
  const brands: BrandBuilds[] = BUILD_BRANDS.map(brand => ({ ...brand,
    desktop: data.clients.get(`${version}/clients/${brand.id}/desktop.json`) as DownloadInfo ?? null,
    mobile: data.clients.get(`${version}/clients/${brand.id}/mobile.json`) as MobileRelease ?? null,
    errors: {},
  }));
  const packages = new Map([...data.servers.values()].map(record => [record.url, record]));
  const server: ServerBuilds = { version, rows: serverBuildCandidates(version).map(row => ({
    label: row.label, cells: row.cells.map(cell => {
      const record = cell.url ? packages.get(cell.url) : undefined;
      return { arch: cell.arch, url: record?.url ?? null, checksumUrl: record?.checksumUrl ?? null, error: null };
    }),
  })) };
  return { ...buildReleaseMatrix(brands, version), checkedAt: data.index.updatedAt, server };
}

export function localDownloads(data: LocalReleaseData) {
  return { desktop: data.clients.get('latest/tego/desktop.json') as DownloadInfo ?? null,
    mobile: data.clients.get('latest/tego/mobile.json') as MobileRelease ?? null,
    checkedAt: data.index.updatedAt, errors: {} };
}
