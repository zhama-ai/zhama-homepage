import type { DownloadInfo, MobileRelease } from './download';

export const BUILD_BRANDS = [
  { id: 'tego', name: 'TeGo 官方版' },
  { id: 'qhtig', name: 'qhtig 科创 AI 助手' },
  { id: 'qhtig-data', name: 'qhtig-data 前海数字员工' },
  { id: 'ykzq', name: 'ykzq · YKAI' },
] as const;

export const BUILD_ROWS = [
  { kind: 'desktop', platform: 'macos', arch: 'arm64', label: 'macOS Apple Silicon' },
  { kind: 'desktop', platform: 'macos', arch: 'x64', label: 'macOS Intel' },
  { kind: 'desktop', platform: 'windows', arch: 'x64', label: 'Windows x64' },
  { kind: 'desktop', platform: 'windows', arch: 'x86', label: 'Windows x86' },
  { kind: 'desktop', platform: 'linux', arch: '', label: 'Linux' },
  { kind: 'desktop', platform: 'kylin', arch: '', label: '麒麟' },
  { kind: 'mobile', platform: 'android', arch: '', label: 'Android' },
  { kind: 'mobile', platform: 'ios', arch: '', label: 'iOS' },
] as const;

export interface BrandBuilds {
  id: string;
  name: string;
  desktop: DownloadInfo | null;
  mobile: MobileRelease | null;
  errors: Partial<Record<'desktop' | 'mobile', string>>;
}

export interface BuildLink {
  url: string;
  version: string;
  format: string;
  arch: string;
}

export function normalizeBuildVersion(value: string): string {
  const match = value.trim().match(/^v?(\d+\.\d+\.\d+(?:-[A-Za-z0-9.-]+)?(?:\+[A-Za-z0-9.-]+)?)$/);
  if (!match) throw new Error('请输入有效版本号，例如 v4.34.0。');
  return `v${match[1]}`;
}

export function buildCatalogUrl(brand: string, kind: 'desktop' | 'mobile', version?: string): string {
  const file = version ? `${normalizeBuildVersion(version)}/index.json` : 'latest.json';
  return `https://cdn.zhama.com.cn/releases/${brand}/${kind}/${file}`;
}

// Each product has its own latest version. Merged catalogs may retain older
// targets: those are intentionally absent from this current-build matrix.
export function currentBuildLinks(brand: BrandBuilds, row: typeof BUILD_ROWS[number], version?: string): BuildLink[] {
  const catalog = brand[row.kind];
  if (!catalog || catalog.brand !== brand.id || (version && catalog.version !== version)) return [];
  const links: BuildLink[] = [];
  const append = (formats: Record<string, string | undefined>, arch: string) => {
    const target = row.platform + (arch ? `/${arch}` : '');
    if (catalog.targetVersions?.[target] !== catalog.version) return;
    for (const [format, url] of Object.entries(formats)) {
      if (!url) continue;
      try {
        const parsed = new URL(url);
        if (parsed.protocol !== 'https:') continue;
        if (row.platform === 'ios') {
          if (!['testflight.apple.com', 'apps.apple.com'].includes(parsed.hostname)) continue;
        } else {
          const prefix = `https://cdn.zhama.com.cn/releases/${brand.id}/${row.kind}/${catalog.version}/${target}/`;
          if (!url.startsWith(prefix)) continue;
        }
        links.push({ url, format, arch, version: catalog.version });
      } catch { /* An invalid URL must never become a download link. */ }
    }
  };
  if (row.kind === 'mobile') {
    const mobile = catalog as MobileRelease;
    append(mobile.platforms[row.platform]?.downloads ?? {}, '');
  } else {
    const desktop = catalog as DownloadInfo;
    for (const [arch, formats] of Object.entries(desktop.platforms[row.platform] ?? {})) {
      if (formats && (!row.arch || row.arch === arch)) append(formats, arch);
    }
  }
  return links;
}

export function buildReleaseMatrix(brands: BrandBuilds[], requestedVersion?: string) {
  const latest = brands.flatMap(brand => [brand.desktop, brand.mobile])
    .filter((catalog): catalog is DownloadInfo | MobileRelease => catalog !== null)
    .sort((a, b) => Date.parse(b.releaseDate) - Date.parse(a.releaseDate))[0];
  const version = requestedVersion ? normalizeBuildVersion(requestedVersion) : latest?.version ?? null;
  return {
    version,
    brands: brands.map(({ id, name, desktop, mobile, errors }) => ({
      id, name, desktopVersion: desktop?.version === version ? version : null,
      mobileVersion: mobile?.version === version ? version : null, errors,
    })),
    rows: BUILD_ROWS.map(row => ({
      label: row.label, kind: row.kind,
      cells: brands.map(brand => ({
        brand: brand.id, error: brand.errors[row.kind] ?? null,
        links: version ? currentBuildLinks(brand, row, version) : [],
      })),
    })),
  };
}
