// The homepage and download page consume the same CI-generated catalogs.
export type DesktopPlatform = 'macos' | 'windows' | 'linux' | 'kylin';
export type Architecture = 'arm64' | 'x64' | 'x86';
export type PlatformFormats = Record<string, string>;

export interface DownloadInfo {
  brand: string;
  version: string;
  releaseDate: string;
  targetVersions?: Record<string, string>;
  platforms: Partial<Record<DesktopPlatform, Partial<Record<Architecture, PlatformFormats>>>>;
}

export interface MobileRelease {
  brand: string;
  version: string;
  releaseDate: string;
  targetVersions?: Record<string, string>;
  platforms: Partial<Record<'ios' | 'android', { downloads: { apk?: string; testflight?: string; appstore?: string } }>>;
}

export interface DownloadCatalog {
  desktop: DownloadInfo | null;
  mobile: MobileRelease | null;
}

export const RELEASE_CATALOG_URLS = {
  desktop: 'https://cdn.zhama.com.cn/releases/tego/desktop/latest.json',
  mobile: 'https://cdn.zhama.com.cn/releases/tego/mobile/latest.json',
} as const;

export function validCatalog(value: unknown, kind: 'desktop' | 'mobile', brand = 'tego'): boolean {
  if (!value || typeof value !== 'object') return false;
  const data = value as Record<string, unknown>;
  if (data.brand !== brand || data.kind !== kind || typeof data.version !== 'string' ||
      typeof data.releaseDate !== 'string' || !Number.isFinite(Date.parse(data.releaseDate)) ||
      !data.platforms || typeof data.platforms !== 'object') return false;
  const isRecord = (node: unknown): node is Record<string, unknown> =>
    !!node && typeof node === 'object' && !Array.isArray(node);
  const validFormats = (node: unknown, formats: string[]) => isRecord(node) &&
    Object.keys(node).length > 0 && Object.entries(node).every(([format, value]) => {
      if (!formats.includes(format) || typeof value !== 'string') return false;
      try { return new URL(value).protocol === 'https:'; } catch { return false; }
    });
  return isRecord(data.platforms) && Object.keys(data.platforms).length > 0 &&
    Object.entries(data.platforms).every(([platform, targets]) => {
      if (!isRecord(targets)) return false;
      if (kind === 'mobile') {
        return ['ios', 'android'].includes(platform) &&
          validFormats(targets.downloads, platform === 'ios' ? ['testflight', 'appstore'] : ['apk']);
      }
      return ['macos', 'windows', 'linux', 'kylin'].includes(platform) &&
        Object.keys(targets).length > 0 && Object.entries(targets).every(([arch, formats]) =>
          ['arm64', 'x64', 'x86'].includes(arch) &&
          validFormats(formats, ['dmg', 'zip', 'exe', 'msi', 'AppImage', 'deb', 'rpm', 'tar', 'flatpak']));
    });
}

async function readCatalog<T>(kind: 'desktop' | 'mobile'): Promise<T | null> {
  try {
    const response = await fetch(RELEASE_CATALOG_URLS[kind], {
      next: { revalidate: 60 }, signal: AbortSignal.timeout(15000),
    });
    if (!response.ok) return null;
    const data: unknown = await response.json();
    return validCatalog(data, kind) ? data as T : null;
  } catch (error) {
    console.error(`Failed to read ${kind} download catalog`, error);
    return null;
  }
}

export function getDownloadInfo(): Promise<DownloadInfo | null> {
  return readCatalog<DownloadInfo>('desktop');
}

export async function getDownloadCatalog(): Promise<DownloadCatalog> {
  const [desktop, mobile] = await Promise.all([
    getDownloadInfo(), readCatalog<MobileRelease>('mobile'),
  ]);
  return { desktop, mobile };
}

export async function fetchDownloadCatalog(): Promise<DownloadCatalog> {
  // Same-origin fetch avoids depending on OSS/CDN CORS configuration.
  const response = await fetch('/api/downloads', { cache: 'no-store', signal: AbortSignal.timeout(20000) });
  if (!response.ok) throw new Error('Download catalog unavailable');
  return response.json();
}

export function getDesktopDownloads(release: DownloadInfo | null) {
  if (!release) return [];
  const labels: Record<DesktopPlatform, string> = { macos: 'macOS', windows: 'Windows', linux: 'Linux', kylin: 'Kylin' };
  return (Object.keys(labels) as DesktopPlatform[]).flatMap(os => {
    const variants: { label: string; url: string; version: string }[] = [];
    for (const arch of ['arm64', 'x64', 'x86'] as const) {
      const formats = release.platforms[os]?.[arch];
      if (!formats) continue;
      for (const format of ['dmg', 'exe', 'msi', 'AppImage', 'deb', 'rpm', 'tar', 'flatpak', 'zip']) {
        const url = formats[format];
        if (!url) continue;
        const label = os === 'macos' ? (arch === 'arm64' ? 'Apple Silicon' : 'Intel') : arch.toUpperCase();
        variants.push({ label: `${label} (.${format})`, url,
          version: release.targetVersions?.[`${os}/${arch}`] ?? release.version });
      }
    }
    return variants.length ? [{ os, label: labels[os], variants }] : [];
  });
}

export function detectPlatform(): { os: DesktopPlatform | 'ios' | 'android' | 'unknown'; arch: Architecture | 'unknown' } {
  if (typeof navigator === 'undefined') return { os: 'unknown', arch: 'unknown' };
  const ua = navigator.userAgent.toLowerCase();
  const platform = navigator.platform.toLowerCase();
  if (/android/.test(ua)) return { os: 'android', arch: 'unknown' };
  if (/iphone|ipad|ipod/.test(ua) || (platform === 'macintel' && navigator.maxTouchPoints > 1)) return { os: 'ios', arch: 'unknown' };
  if (/mac/.test(platform) || /macintosh/.test(ua)) {
    try {
      const gl = document.createElement('canvas').getContext('webgl');
      const extension = gl?.getExtension('WEBGL_debug_renderer_info');
      const renderer = extension ? String(gl?.getParameter(extension.UNMASKED_RENDERER_WEBGL)) : '';
      if (/apple m[0-9]|apple gpu/i.test(renderer)) return { os: 'macos', arch: 'arm64' };
      if (/intel|amd|radeon|nvidia/i.test(renderer)) return { os: 'macos', arch: 'x64' };
    } catch { /* Show both architectures when detection is unavailable. */ }
    return { os: 'macos', arch: 'unknown' };
  }
  if (/win/.test(platform) || /windows/.test(ua)) return { os: 'windows', arch: 'x64' };
  if (/linux/.test(platform) || /linux/.test(ua)) return { os: 'linux', arch: /arm|aarch64/.test(ua) ? 'arm64' : 'x64' };
  return { os: 'unknown', arch: 'unknown' };
}

/**
 * 格式化发布日期
 */
export function formatReleaseDate(dateString: string, locale: string = 'zh'): string {
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString(locale === 'zh' ? 'zh-CN' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  } catch {
    return dateString;
  }
}

/**
 * 获取文件名（保留用于未来使用）
 */
export function getFileName(url: string): string {
  const parts = url.split('/');
  return parts[parts.length - 1] || url;
}
