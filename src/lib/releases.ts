import { APPLE_HOSTS, RELEASE_CDN_ORIGIN, isClientDownloadInTarget } from '../../shared/release-catalog.mjs';

export interface ReleaseFile {
  path: string;
  version: string;
  product: string;
  arch: string | null;
}

export interface ReleaseVariant {
  version: string;
  url: string;
  label: string;
  ariaLabel: string;
}

export interface ReleaseCard {
  title: string;
  ariaLabel: string;
  version: string | null;
  variants: ReleaseVariant[];
}

export interface ReleasePackages {
  cards: ReleaseCard[];
  blocked: number;
}

type Manifest = Record<string, unknown>;
const record = (value: unknown): value is Manifest => typeof value === 'object' && value !== null && !Array.isArray(value);
const text = (value: unknown) => typeof value === 'string' ? value : '';
const preferredFormats = ['dmg', 'exe', 'AppImage', 'flatpak', 'apk', 'appstore', 'testflight'];

export const isReleaseManifest = (value: unknown): value is Manifest => record(value) && value.schemaVersion === 1;

const releaseHosts = [new URL(RELEASE_CDN_ORIGIN).hostname, ...APPLE_HOSTS];

export function allowedReleaseDownload(value: unknown): string | null {
  if (typeof value !== 'string') return null;
  try {
    const url = new URL(value);
    return url.protocol === 'https:'
      && releaseHosts.includes(url.hostname)
      && !url.username && !url.password && (!url.port || url.port === '443') ? value : null;
  } catch { return null; }
}

/** CDN packages must sit in their own brand, product, version and target directory; Apple links go to Apple hosts. */
function trustedTargetDownload(value: unknown, brand: string, product: string, platform: string, target: string, version: string): string | null {
  const url = allowedReleaseDownload(value);
  if (!url) return null;
  const host = new URL(url).hostname;
  if (platform === 'ios') return APPLE_HOSTS.includes(host) ? url : null;
  return isClientDownloadInTarget(url, brand, product, version, target) ? url : null;
}

export function releasePackages(manifest: unknown, file: ReleaseFile, chinese: boolean): ReleasePackages {
  if (!isReleaseManifest(manifest)) throw new Error(chinese ? '清单结构无法识别' : 'Manifest schema is not supported');
  const products: Record<string, string> = chinese
    ? { desktop: 'TeGo 桌面端', mobile: 'TeGo 移动端', studio: 'Tego Studio' }
    : { desktop: 'TeGo Desktop', mobile: 'TeGo Mobile', studio: 'Tego Studio' };
  const platforms: Record<string, string> = { windows: 'Windows', macos: 'macOS', linux: 'Linux', kylin: chinese ? '银河麒麟' : 'Kylin', android: 'Android', ios: 'iOS' };
  const architecture = (platform: string, arch: string) => {
    if (arch === 'downloads') return '';
    if (platform === 'macos' && arch === 'arm64') return 'Apple silicon · ARM64';
    if (platform === 'macos' && arch === 'x64') return 'Intel · x64';
    if (arch === 'x86') return chinese ? 'x86 · 32 位' : 'x86 · 32-bit';
    if (arch === 'x64') return chinese ? 'x64 · 64 位' : 'x64 · 64-bit';
    return arch === 'arm64' ? 'ARM64' : arch;
  };
  const cards: ReleaseCard[] = [];
  let blocked = 0;
  const product = products[file.product] || file.product;
  const version = text(manifest.version) || file.version;
  const brand = text(manifest.brand) || 'tego';
  if (!record(manifest.platforms)) return { cards, blocked };
  const versions = record(manifest.targetVersions) ? manifest.targetVersions : {};
  for (const [platform, targets] of Object.entries(manifest.platforms)) {
    if (!record(targets)) continue;
    const variants: (ReleaseVariant & { arch: string })[] = [];
    for (const [arch, formats] of Object.entries(targets)) {
      if (!record(formats)) continue;
      const target = arch === 'downloads' ? platform : `${platform}/${arch}`;
      const targetVersion = text(versions[target]) || version;
      const downloads: { format: string; url: string }[] = [];
      for (const [format, rawUrl] of Object.entries(formats)) {
        const url = trustedTargetDownload(rawUrl, brand, file.product, platform, target, targetVersion);
        if (url) downloads.push({ format, url }); else blocked += 1;
      }
      if (!downloads.length) continue;
      const primary = preferredFormats.map(format => downloads.find(download => download.format === format)).find(Boolean) ?? downloads[0];
      const label = primary.format === 'appstore'
        ? (chinese ? 'App Store 下载' : 'Download on the App Store')
        : primary.format === 'testflight'
        ? (chinese ? '打开 TestFlight' : 'Open TestFlight')
        : architecture(platform, arch) || `${chinese ? '下载' : 'Download'} ${platforms[platform] || platform}`;
      variants.push({ arch, version: targetVersion, url: primary.url, label, ariaLabel: [product, platforms[platform] || platform, label, targetVersion].join(' · ') });
    }
    if (!variants.length) continue;
    const order = platform === 'macos' ? ['arm64', 'x64', 'x86'] : ['x64', 'arm64', 'x86'];
    variants.sort((a, b) => order.indexOf(a.arch) - order.indexOf(b.arch));
    cards.push({
      title: platforms[platform] || platform,
      ariaLabel: `${product} ${platforms[platform] || platform}`,
      version: variants.every(variant => variant.version === variants[0].version) ? variants[0].version : null,
      variants: variants.map(({ arch: _arch, ...variant }) => variant),
    });
  }
  // Same platform order as the download page, independent of the manifest's key order.
  const platformOrder = ['macOS', 'Windows', 'Linux', platforms.kylin, 'Android', 'iOS'];
  const rank = (title: string) => { const position = platformOrder.indexOf(title); return position < 0 ? platformOrder.length : position; };
  cards.sort((a, b) => rank(a.title) - rank(b.title));
  return { cards, blocked };
}

export function releaseStatus(packages: ReleasePackages, chinese: boolean): string {
  return packages.cards.length
    ? (packages.blocked ? (chinese ? '部分安装包地址不可用。' : 'Some package links are unavailable.') : '')
    : (chinese ? '所选版本没有可下载的客户端，请选择其他产品或版本。' : 'No client packages are available. Choose another product or release.');
}
