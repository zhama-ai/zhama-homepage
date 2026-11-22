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
const preferredFormats = ['dmg', 'exe', 'AppImage', 'flatpak', 'apk', 'testflight'];

export const isReleaseManifest = (value: unknown): value is Manifest => record(value) && value.schemaVersion === 1;

export function allowedReleaseDownload(value: unknown): string | null {
  if (typeof value !== 'string') return null;
  try {
    const url = new URL(value);
    return url.protocol === 'https:'
      && ['cdn.zhama.com.cn', 'testflight.apple.com'].includes(url.hostname)
      && !url.username && !url.password && (!url.port || url.port === '443') ? value : null;
  } catch { return null; }
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
  if (!record(manifest.platforms)) return { cards, blocked };
  const versions = record(manifest.targetVersions) ? manifest.targetVersions : {};
  for (const [platform, targets] of Object.entries(manifest.platforms)) {
    if (!record(targets)) continue;
    const variants: (ReleaseVariant & { arch: string })[] = [];
    for (const [arch, formats] of Object.entries(targets)) {
      if (!record(formats)) continue;
      const downloads: { format: string; url: string }[] = [];
      for (const [format, rawUrl] of Object.entries(formats)) {
        const url = allowedReleaseDownload(rawUrl);
        if (url) downloads.push({ format, url }); else blocked += 1;
      }
      if (!downloads.length) continue;
      const primary = preferredFormats.map(format => downloads.find(download => download.format === format)).find(Boolean) ?? downloads[0];
      const target = arch === 'downloads' ? platform : `${platform}/${arch}`;
      const targetVersion = text(versions[target]) || version;
      const label = primary.format === 'testflight'
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
  return { cards, blocked };
}

export function releaseStatus(packages: ReleasePackages, chinese: boolean): string {
  return packages.cards.length
    ? (packages.blocked ? (chinese ? '部分安装包地址不可用。' : 'Some package links are unavailable.') : '')
    : (chinese ? '所选版本没有可下载的客户端，请选择其他产品或版本。' : 'No client packages are available. Choose another product or release.');
}
