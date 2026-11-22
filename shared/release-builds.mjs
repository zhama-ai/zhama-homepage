/**
 * Internal build list (/builds.html and /api/builds). Ported from the previous
 * website's src/lib/release-builds.ts and src/lib/release-data.ts so the JSON
 * keeps the same shape for existing consumers.
 */
import { APPLE_HOSTS, SERVER_ARCHES, isClientDownloadInTarget, newestFirst, normalizeBuildVersion, serverPackageUrl } from './release-catalog.mjs';

export const BUILD_BRANDS = Object.freeze([
  { id: 'tego', name: 'TeGo 官方版' },
  { id: 'qhtig', name: 'qhtig 科创 AI 助手' },
  { id: 'qhtig-data', name: 'qhtig-data 前海数字员工' },
  { id: 'ykzq', name: 'ykzq · YKAI' },
]);

export const BUILD_ROWS = Object.freeze([
  { kind: 'desktop', platform: 'macos', arch: 'arm64', label: 'macOS Apple Silicon' },
  { kind: 'desktop', platform: 'macos', arch: 'x64', label: 'macOS Intel' },
  { kind: 'desktop', platform: 'windows', arch: 'x64', label: 'Windows x64' },
  { kind: 'desktop', platform: 'windows', arch: 'x86', label: 'Windows x86' },
  { kind: 'desktop', platform: 'linux', arch: '', label: 'Linux' },
  { kind: 'desktop', platform: 'kylin', arch: '', label: '麒麟' },
  { kind: 'mobile', platform: 'android', arch: '', label: 'Android' },
  { kind: 'mobile', platform: 'ios', arch: '', label: 'iOS' },
]);

export const STUDIO_TARGETS = Object.freeze([
  { platform: 'macos', arch: 'arm64', label: 'macOS Apple Silicon' },
  { platform: 'macos', arch: 'x64', label: 'macOS Intel' },
  { platform: 'windows', arch: 'x64', label: 'Windows x64' },
  { platform: 'linux', arch: 'x64', label: 'Linux x64' },
  { platform: 'linux', arch: 'arm64', label: 'Linux ARM64' },
]);

const SERVER_PRODUCT_NAMES = Object.freeze([
  { id: 'avatar', name: 'Avatar' },
  { id: 'workflow', name: 'Workflow' },
]);
const SERVER_PACKAGE_NAMES = Object.freeze([
  { id: 'compose', name: 'Compose 全量离线包' },
  { id: 'service-images', name: '增量业务镜像包' },
  { id: 'k8s', name: 'K8s 全量离线包' },
]);

/** Links of one brand and row that belong to the requested release; older retained targets are omitted. */
export function currentBuildLinks(brand, row, version) {
  const catalog = brand[row.kind];
  if (!catalog || catalog.brand !== brand.id || (version && catalog.version !== version)) return [];
  const links = [];
  const append = (formats, arch) => {
    const target = row.platform + (arch ? `/${arch}` : '');
    if (catalog.targetVersions?.[target] !== catalog.version) return;
    for (const [format, url] of Object.entries(formats)) {
      if (typeof url !== 'string') continue;
      if (row.platform === 'ios') {
        let parsed;
        try { parsed = new URL(url); } catch { continue; }
        if (parsed.protocol !== 'https:' || !APPLE_HOSTS.includes(parsed.hostname)) continue;
      } else if (!isClientDownloadInTarget(url, brand.id, row.kind, catalog.version, target)) continue;
      links.push({ url, format, arch, version: catalog.version });
    }
  };
  if (row.kind === 'mobile') append(catalog.platforms[row.platform]?.downloads ?? {}, '');
  else {
    for (const [arch, formats] of Object.entries(catalog.platforms[row.platform] ?? {})) {
      if (formats && (!row.arch || row.arch === arch)) append(formats, arch);
    }
  }
  return links;
}

export function buildReleaseMatrix(brands, version) {
  return {
    version,
    brands: brands.map(({ id, name, desktop, mobile }) => ({
      id, name,
      desktopVersion: desktop?.version === version ? version : null,
      mobileVersion: mobile?.version === version ? version : null,
      errors: {},
    })),
    rows: BUILD_ROWS.map(row => ({
      label: row.label, kind: row.kind,
      cells: brands.map(brand => ({ brand: brand.id, error: null, links: version ? currentBuildLinks(brand, row, version) : [] })),
    })),
  };
}

export function buildStudioMatrix(catalog, requestedVersion) {
  const version = requestedVersion ? normalizeBuildVersion(requestedVersion) : catalog?.version ?? null;
  return {
    version,
    rows: STUDIO_TARGETS.map(({ platform, arch, label }) => {
      const target = `${platform}/${arch}`;
      const formats = catalog?.brand === 'tego' && catalog.version === version && catalog.targetVersions?.[target] === version
        ? catalog.platforms[platform]?.[arch] ?? {} : {};
      const links = Object.entries(formats).flatMap(([format, url]) =>
        version && isClientDownloadInTarget(url, 'tego', 'studio', version, target) ? [{ url, format, arch, version }] : []);
      return { label, links };
    }),
  };
}

export function serverBuildRows(data, version) {
  const packages = new Map([...data.servers.values()].map(record => [record.url, record]));
  return SERVER_PRODUCT_NAMES.flatMap(product => SERVER_PACKAGE_NAMES.map(pack => ({
    label: `${product.name} · ${pack.name}`,
    cells: SERVER_ARCHES.map(arch => {
      const record = packages.get(serverPackageUrl(version, product.id, pack.id, arch));
      return { arch, url: record?.url ?? null, checksumUrl: record?.checksumUrl ?? null, sha256: record?.sha256 ?? null, size: record?.size ?? null, error: null };
    }),
  })));
}

/** Studio versions with a published snapshot, newest first. */
export function studioVersions(data) {
  return [...data.clients.keys()].flatMap(file => /^(v[^/]+)\/clients\/tego\/studio\.json$/.exec(file)?.[1] ?? []).sort(newestFirst);
}

/** The /api/builds payload for one TeGo release; Studio follows its own latest release. */
export function releaseBuilds(data, requestedVersion) {
  const version = requestedVersion ? normalizeBuildVersion(requestedVersion) : data.index.defaultVersion;
  const brands = BUILD_BRANDS.map(brand => ({
    ...brand,
    desktop: data.clients.get(`${version}/clients/${brand.id}/desktop.json`) ?? null,
    mobile: data.clients.get(`${version}/clients/${brand.id}/mobile.json`) ?? null,
  }));
  return {
    ...buildReleaseMatrix(brands, version),
    checkedAt: data.index.updatedAt,
    server: { version, rows: serverBuildRows(data, version) },
    studio: buildStudioMatrix(data.clients.get('latest/tego/studio.json') ?? null),
  };
}

/** Studio matrix of a specific Studio release. */
export function studioBuilds(data, requestedVersion) {
  const version = normalizeBuildVersion(requestedVersion);
  return buildStudioMatrix(data.clients.get(`${version}/clients/tego/studio.json`) ?? null, version);
}
