/**
 * Release catalog rules shared by the OSS synchronization, the static build,
 * the internal build list and the tests. Pure functions only: no file access,
 * so the same rules also run in browser bundles.
 */

export const RELEASE_BRANDS = Object.freeze(['tego', 'qhtig', 'qhtig-data', 'ykzq']);
export const CLIENT_KINDS = Object.freeze(['desktop', 'mobile', 'studio']);
export const SERVER_PRODUCTS = Object.freeze(['avatar', 'workflow']);
export const SERVER_PACKAGES = Object.freeze(['compose', 'service-images', 'k8s']);
export const SERVER_ARCHES = Object.freeze(['amd64', 'arm64']);
export const RELEASE_CDN_ORIGIN = 'https://cdn.zhama.com.cn';
export const APPLE_HOSTS = Object.freeze(['testflight.apple.com', 'apps.apple.com']);
export const MANIFEST_ROOT = '/releases/manifests/';

const VERSION = 'v\\d+\\.\\d+\\.\\d+(?:-[A-Za-z0-9.-]+)?(?:\\+[A-Za-z0-9.-]+)?';
export const CLIENT_FILE = new RegExp(`^(?:latest|(${VERSION})/clients)/(${RELEASE_BRANDS.join('|')})/(${CLIENT_KINDS.join('|')})\\.json$`);
export const SERVER_FILE = new RegExp(`^(${VERSION})/server/(${SERVER_PRODUCTS.join('|')})/(${SERVER_PACKAGES.join('|')})/(${SERVER_ARCHES.join('|')})\\.json$`);

const isRecord = value => Boolean(value) && typeof value === 'object' && !Array.isArray(value);

export function normalizeBuildVersion(value) {
  const match = String(value ?? '').trim().match(/^v?(\d+\.\d+\.\d+(?:-[A-Za-z0-9.-]+)?(?:\+[A-Za-z0-9.-]+)?)$/);
  if (!match) throw new Error('请输入有效版本号，例如 v4.34.0。');
  return `v${match[1]}`;
}

/** Semantic version order: a pre-release sorts before its release; build metadata is ignored. */
export function compareVersions(left, right) {
  const parse = value => normalizeBuildVersion(value).slice(1).split('+')[0].split('-');
  const [a, ...aSuffix] = parse(left);
  const [b, ...bSuffix] = parse(right);
  const mainA = a.split('.').map(Number);
  const mainB = b.split('.').map(Number);
  for (let index = 0; index < 3; index++) if (mainA[index] !== mainB[index]) return mainA[index] - mainB[index];
  if (!aSuffix.length || !bSuffix.length) return Number(!aSuffix.length) - Number(!bSuffix.length);
  const partsA = aSuffix.join('-').split('.');
  const partsB = bSuffix.join('-').split('.');
  for (let index = 0; index < Math.max(partsA.length, partsB.length); index++) {
    if (partsA[index] === undefined || partsB[index] === undefined) return partsA.length - partsB.length;
    if (partsA[index] === partsB[index]) continue;
    const numericA = /^\d+$/.test(partsA[index]);
    const numericB = /^\d+$/.test(partsB[index]);
    if (numericA && numericB) return Number(partsA[index]) - Number(partsB[index]);
    if (numericA !== numericB) return numericA ? -1 : 1;
    return partsA[index] < partsB[index] ? -1 : 1;
  }
  return 0;
}

export const newestFirst = (left, right) => compareVersions(right, left);

const CLIENT_FORMATS = {
  desktop: { macos: ['dmg', 'zip', 'exe', 'msi', 'AppImage', 'deb', 'rpm', 'tar', 'flatpak'], windows: ['dmg', 'zip', 'exe', 'msi', 'AppImage', 'deb', 'rpm', 'tar', 'flatpak'], linux: ['dmg', 'zip', 'exe', 'msi', 'AppImage', 'deb', 'rpm', 'tar', 'flatpak'], kylin: ['dmg', 'zip', 'exe', 'msi', 'AppImage', 'deb', 'rpm', 'tar', 'flatpak'] },
  studio: { macos: ['dmg', 'zip'], windows: ['exe'], linux: ['AppImage', 'tar.gz'] },
  mobile: { ios: ['testflight', 'appstore'], android: ['apk'] },
};

/** Structural check of a client catalog published by the tego-os release workflows. */
export function validCatalog(value, kind, brand = 'tego') {
  if (!isRecord(value)) return false;
  if (value.brand !== brand || value.kind !== kind || typeof value.version !== 'string'
    || typeof value.releaseDate !== 'string' || !Number.isFinite(Date.parse(value.releaseDate))
    || !isRecord(value.platforms) || !Object.keys(value.platforms).length) return false;
  const validFormats = (node, formats) => isRecord(node) && Object.keys(node).length > 0
    && Object.entries(node).every(([format, address]) => {
      if (!formats.includes(format) || typeof address !== 'string') return false;
      try { return new URL(address).protocol === 'https:'; } catch { return false; }
    });
  return Object.entries(value.platforms).every(([platform, targets]) => {
    const formats = CLIENT_FORMATS[kind]?.[platform];
    if (!formats || !isRecord(targets)) return false;
    if (kind === 'mobile') return validFormats(targets.downloads, formats);
    return Object.keys(targets).length > 0 && Object.entries(targets).every(([arch, downloads]) =>
      ['arm64', 'x64', 'x86'].includes(arch) && validFormats(downloads, formats));
  });
}

/** The CDN directory every non-Apple client download of a release target must live in. */
export function clientDownloadPath(brand, kind, targetVersion, target) {
  return `/releases/${brand}/${kind}/${encodeURIComponent(targetVersion)}/${target}/`;
}

/** True when a download address belongs to its own brand, kind, version and target on the release CDN. */
export function isClientDownloadInTarget(address, brand, kind, targetVersion, target) {
  try {
    const url = new URL(address);
    return url.origin === RELEASE_CDN_ORIGIN && !url.search && !url.hash && !url.username && !url.password
      && url.pathname.startsWith(clientDownloadPath(brand, kind, targetVersion, target));
  } catch { return false; }
}

export function validateClientCatalog(value, file) {
  const match = CLIENT_FILE.exec(file);
  if (!match) throw new Error(`Invalid client path: ${file}`);
  const [, version, brand, kind] = match;
  if (!validCatalog(value, kind, brand)) throw new Error(`Invalid catalog: ${file}`);
  if (normalizeBuildVersion(value.version) !== value.version || (version && value.version !== version)) {
    throw new Error(`Catalog version mismatch: ${file}`);
  }
  const targets = value.targetVersions;
  if (!isRecord(targets) || !Object.keys(targets).length) throw new Error(`Missing target versions: ${file}`);
  const seen = new Set();
  for (const [platform, payload] of Object.entries(value.platforms)) {
    const variants = kind === 'mobile' ? [['', payload.downloads]] : Object.entries(payload);
    for (const [arch, formats] of variants) {
      const target = arch ? `${platform}/${arch}` : platform;
      const targetVersion = targets[target];
      if (typeof targetVersion !== 'string' || normalizeBuildVersion(targetVersion) !== targetVersion || (version && targetVersion !== version)) {
        throw new Error(`Target version mismatch: ${file}/${target}`);
      }
      seen.add(target);
      for (const address of Object.values(formats)) {
        const url = new URL(address);
        if (url.search || url.hash || url.username || url.password) throw new Error(`Invalid download URL: ${file}`);
        if (platform === 'ios') {
          if (url.protocol !== 'https:' || !APPLE_HOSTS.includes(url.hostname)) throw new Error(`Invalid Apple URL: ${file}`);
        } else if (!isClientDownloadInTarget(address, brand, kind, targetVersion, target)) {
          throw new Error(`Download is outside the release target: ${file}/${target}`);
        }
      }
    }
  }
  if (Object.keys(targets).some(target => !seen.has(target))) throw new Error(`Unknown catalog target: ${file}`);
}

export function serverPackageUrl(version, product, kind, arch) {
  const filename = `tego-${product}-${kind}-${version}-${arch}.tar`;
  return `${RELEASE_CDN_ORIGIN}/tego-os/${encodeURIComponent(version)}/${encodeURIComponent(filename)}`;
}

export function validateServerRelease(value, file) {
  const match = SERVER_FILE.exec(file);
  if (!match || !isRecord(value)) throw new Error(`Invalid server record: ${file}`);
  const [, version, product, kind, arch] = match;
  const url = serverPackageUrl(version, product, kind, arch);
  if (value.schemaVersion !== 1 || value.version !== version || value.product !== product || value.kind !== kind
    || value.arch !== arch || value.url !== url || value.checksumUrl !== `${url}.sha256`
    || typeof value.sha256 !== 'string' || !/^[a-f0-9]{64}$/.test(value.sha256)
    || !Number.isSafeInteger(value.size) || value.size <= 0
    || typeof value.releaseDate !== 'string' || !Number.isFinite(Date.parse(value.releaseDate))) {
    throw new Error(`Invalid server record: ${file}`);
  }
}

export function validateReleaseRecord(value, file) {
  if (CLIENT_FILE.test(file)) validateClientCatalog(value, file);
  else if (SERVER_FILE.test(file)) validateServerRelease(value, file);
  else throw new Error(`Invalid release path: ${file}`);
}

/** Index entry for a manifest stored at public/releases/manifests/<file>. */
export function describeReleaseFile(file, size) {
  const path = MANIFEST_ROOT + file;
  const client = CLIENT_FILE.exec(file);
  if (client) {
    const [, version, brand, product] = client;
    return { path, version: version || 'latest', type: 'client', brand, product, arch: null, size };
  }
  const server = SERVER_FILE.exec(file);
  if (server) {
    const [, version, product, kind, arch] = server;
    return { path, version, type: 'server', product, package: kind, arch, size };
  }
  throw new Error(`Invalid release path: ${file}`);
}

/** Versions with a client or server release snapshot; Studio has an independent version stream. */
export function releaseVersions(files) {
  return [...new Set(files
    .filter(file => !file.startsWith('latest/') && !file.endsWith('/studio.json'))
    .map(file => file.split('/')[0]))].sort(newestFirst);
}

export function buildReleaseIndex(entries, updatedAt) {
  const files = [...entries].sort(([left], [right]) => left.localeCompare(right));
  const versions = releaseVersions(files.map(([file]) => file));
  if (!versions.length) throw new Error('No versioned release records were found');
  return {
    schemaVersion: 2,
    updatedAt,
    defaultVersion: versions[0],
    versions,
    files: files.map(([file, size]) => describeReleaseFile(file, size)),
  };
}

export function manifestFile(entry) {
  if (!isRecord(entry) || typeof entry.path !== 'string' || !entry.path.startsWith(MANIFEST_ROOT)) throw new Error('Invalid release index entry');
  return entry.path.slice(MANIFEST_ROOT.length);
}

export function validateReleaseIndex(index) {
  if (!isRecord(index) || index.schemaVersion !== 2 || typeof index.updatedAt !== 'string' || !Number.isFinite(Date.parse(index.updatedAt))
    || !Array.isArray(index.files) || !Array.isArray(index.versions) || !index.versions.length) {
    throw new Error('Invalid release index');
  }
  const files = index.files.map(manifestFile);
  if (new Set(files).size !== files.length) throw new Error('Duplicate release index entry');
  files.forEach((file, position) => {
    const expected = describeReleaseFile(file, index.files[position].size);
    if (JSON.stringify(expected) !== JSON.stringify(index.files[position])) throw new Error(`Release index entry does not match its path: ${file}`);
    if (!Number.isSafeInteger(expected.size) || expected.size <= 0) throw new Error(`Invalid manifest size: ${file}`);
  });
  if (index.versions.some(version => normalizeBuildVersion(version) !== version)) throw new Error('Invalid release version');
  if (JSON.stringify(releaseVersions(files)) !== JSON.stringify(index.versions)) throw new Error('Release versions do not match the indexed files');
  if (index.defaultVersion !== index.versions[0]) throw new Error('The default release must be the newest version');
  if (!files.includes('latest/tego/desktop.json')) throw new Error('Missing official desktop release');
  return files;
}

/**
 * @typedef {{ product: 'desktop' | 'mobile' | 'studio', platform: string, architecture: string, format: string, url: string, version: string, releasedAt: string }} ReleaseDownload
 */

/**
 * Current official TeGo downloads, one entry per published file, from the
 * latest desktop, mobile and Studio catalogs. Versions and dates come from each
 * target, because a platform can lag behind the catalog version.
 * @param {Map<string, any>} clients
 * @returns {ReleaseDownload[]}
 */
export function latestDownloads(clients) {
  /** @type {ReleaseDownload[]} */
  const downloads = [];
  for (const product of /** @type {const} */ (['desktop', 'mobile', 'studio'])) {
    const catalog = clients.get(`latest/tego/${product}.json`);
    if (!catalog) continue;
    for (const [platform, payload] of Object.entries(catalog.platforms)) {
      const variants = product === 'mobile' ? [['', payload.downloads]] : Object.entries(payload);
      for (const [architecture, formats] of variants) {
        const target = architecture ? `${platform}/${architecture}` : platform;
        for (const [format, url] of Object.entries(formats)) {
          downloads.push({
            product, platform, architecture, format, url,
            version: catalog.targetVersions?.[target] ?? catalog.version,
            releasedAt: catalog.targetDates?.[target] ?? catalog.releaseDate,
          });
        }
      }
    }
  }
  return downloads;
}
