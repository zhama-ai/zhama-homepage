'use client';

import { useEffect, useState, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useLocale } from 'next-intl';

interface LatestRelease {
  version: string;
  releaseDate: string;
  platforms: {
    macos: { arm64: string; x64: string };
    linux: { arm64: string; x64: string };
    windows: { x64: string };
  };
  downloads: {
    macos_arm64: string;
    macos_x64: string;
    linux_arm64_appimage: string;
    linux_arm64_deb: string;
    linux_x64_appimage: string;
    linux_x64_deb: string;
    windows_x64_msi: string;
    windows_x64_exe: string;
  };
}

type Platform = 'macos' | 'windows' | 'linux' | 'unknown';

function detectPlatform(): { os: Platform; arch: 'arm64' | 'x64' } {
  if (typeof navigator === 'undefined') return { os: 'unknown', arch: 'x64' };
  const ua = navigator.userAgent.toLowerCase();
  const uaData = (navigator as any).userAgentData;
  const platform = uaData?.platform?.toLowerCase() || navigator.platform?.toLowerCase() || '';

  let os: Platform = 'unknown';
  if (platform.includes('mac') || ua.includes('macintosh')) os = 'macos';
  else if (platform.includes('win') || ua.includes('windows')) os = 'windows';
  else if (platform.includes('linux') || ua.includes('linux')) os = 'linux';

  let arch: 'arm64' | 'x64' = 'x64';
  if (ua.includes('arm') || ua.includes('aarch64')) {
    arch = 'arm64';
  } else if (os === 'macos') {
    // Apple Silicon Macs report "MacIntel" in platform and UA,
    // but WebGL renderer reveals the actual GPU.
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (gl) {
        const dbg = (gl as WebGLRenderingContext).getExtension('WEBGL_debug_renderer_info');
        if (dbg) {
          const renderer = (gl as WebGLRenderingContext).getParameter(dbg.UNMASKED_RENDERER_WEBGL) as string;
          if (renderer && /apple m\d|apple gpu/i.test(renderer)) {
            arch = 'arm64';
          }
        }
      }
    } catch {
      // fallback: default to arm64 for modern macOS
      arch = 'arm64';
    }
  }

  return { os, arch };
}

const CDN_URL = 'https://cdn.zhama.com.cn/tego-ai-studio/latest.json';

const platformIcons: Record<string, React.ReactNode> = {
  macos: (
    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
    </svg>
  ),
  windows: (
    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
      <path d="M3 12V6.75l6-1.32v6.48L3 12zm17-9v8.75l-10 .15V5.21L20 3zM3 13l6 .09v6.81l-6-1.15V13zm7 .25l10 .15V21l-10-1.91V13.25z"/>
    </svg>
  ),
  linux: (
    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12.504 0c-.155 0-.315.008-.48.021-4.226.333-3.105 4.807-3.17 6.298-.076 1.092-.3 1.953-1.05 3.02-.885 1.051-2.127 2.75-2.716 4.521-.278.832-.41 1.684-.287 2.489a.424.424 0 00-.11.135c-.26.268-.45.6-.663.839-.199.199-.485.267-.797.4-.313.136-.658.269-.864.68-.09.189-.136.394-.132.602 0 .199.027.4.055.536.058.399.116.728.04.97-.249.68-.28 1.145-.106 1.484.174.334.535.47.94.601.81.2 1.91.135 2.774.6.926.466 1.866.67 2.616.47.526-.116.97-.464 1.208-.946.587-.003 1.23-.269 2.26-.334.699-.058 1.574.267 2.577.2.025.134.063.198.114.333l.003.003c.391.778 1.113 1.368 1.884 1.43.777.07 1.663-.632 1.882-1.783.003-.07.007-.139.009-.207a2.01 2.01 0 00.045-.095c.399-.698.46-1.559.26-2.327-.2-.77-.627-1.445-1.143-1.903-.253-.247-.542-.455-.856-.607-.088-.86-.417-1.606-.867-2.218a6.07 6.07 0 00-.327-.437c.08-.305.143-.622.191-.95.067-.46.083-.936.033-1.418a6.53 6.53 0 00-.469-1.717 5.7 5.7 0 00-.726-1.178c-.323-.36-.655-.618-.869-.762-.066-.087-.247-.328-.465-.622-.44-.583-.928-1.407-1.152-2.157-.336-1.106-1.07-2.025-2.067-2.6-.99-.575-2.183-.81-3.42-.58z"/>
    </svg>
  ),
  ios: (
    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
    </svg>
  ),
  android: (
    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.523 15.341a.996.996 0 0 0 0-1.992.996.996 0 0 0 0 1.992m-11.046 0a.996.996 0 0 0 0-1.992.996.996 0 0 0 0 1.992m11.405-6.02 1.997-3.46a.416.416 0 0 0-.152-.567.416.416 0 0 0-.568.152L17.14 8.95c-1.547-.706-3.283-1.1-5.14-1.1s-3.593.394-5.14 1.1L4.838 5.446a.416.416 0 0 0-.568-.152c-.193.112-.26.36-.152.567l1.997 3.46C2.688 11.186.343 14.658 0 18.761h24c-.344-4.103-2.688-7.575-6.118-9.44"/>
    </svg>
  ),
};

export default function DownloadClient() {
  const t = useTranslations('appDownload');
  const locale = useLocale();
  const [release, setRelease] = useState<LatestRelease | null>(null);
  const [loading, setLoading] = useState(true);
  const [userPlatform, setUserPlatform] = useState<{ os: Platform; arch: 'arm64' | 'x64' }>({ os: 'unknown', arch: 'x64' });

  useEffect(() => {
    setUserPlatform(detectPlatform());

    fetch(CDN_URL)
      .then(res => res.json())
      .then((data: LatestRelease) => {
        setRelease(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const recommendedDownload = useMemo(() => {
    if (!release) return null;
    const { os, arch } = userPlatform;
    if (os === 'macos') {
      return {
        url: arch === 'arm64' ? release.downloads.macos_arm64 : release.downloads.macos_x64,
        label: `macOS (${arch === 'arm64' ? 'Apple Silicon' : 'Intel'})`,
        ext: '.dmg',
      };
    }
    if (os === 'windows') {
      return { url: release.downloads.windows_x64_exe, label: 'Windows (x64)', ext: '.exe' };
    }
    return null;
  }, [release, userPlatform]);

  const desktopDownloads = useMemo(() => {
    if (!release) return [];
    return [
      { os: 'macos' as const, label: 'macOS', variants: [
        { label: 'Apple Silicon (.dmg)', url: release.downloads.macos_arm64 },
        { label: 'Intel (.dmg)', url: release.downloads.macos_x64 },
      ]},
      { os: 'windows' as const, label: 'Windows', variants: [
        { label: 'Windows (.exe)', url: release.downloads.windows_x64_exe },
        { label: 'Windows (.msi)', url: release.downloads.windows_x64_msi },
      ]},
    ];
  }, [release]);

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-zinc-50 mb-3">
            {t('download.heading')}
          </h1>
          {release && (
            <p className="text-lg text-primary-600 dark:text-primary-400 font-medium">
              {t('version', { version: release.version })} · {new Date(release.releaseDate).toLocaleDateString(locale === 'zh' ? 'zh-CN' : 'en-US')}
            </p>
          )}
        </div>

        {/* Recommended Download */}
        {!loading && recommendedDownload && (
          <div className="max-w-xl mx-auto mb-16">
            <a
              href={recommendedDownload.url}
              className="group flex items-center gap-5 p-6 rounded-2xl bg-primary-600 hover:bg-primary-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 active:scale-[0.98]"
            >
              <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-white/20 flex items-center justify-center">
                {platformIcons[userPlatform.os] || platformIcons.macos}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm opacity-80">{t('recommended')}</div>
                <div className="text-xl font-bold">{t('downloadFor', { platform: recommendedDownload.label })}</div>
                <div className="text-sm opacity-70 mt-0.5">{recommendedDownload.ext}</div>
              </div>
              <svg className="w-6 h-6 flex-shrink-0 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
              </svg>
            </a>
          </div>
        )}

        {loading && (
          <div className="max-w-xl mx-auto mb-16">
            <div className="flex items-center gap-5 p-6 rounded-2xl bg-zinc-200 dark:bg-zinc-800 animate-pulse">
              <div className="w-14 h-14 rounded-xl bg-zinc-300 dark:bg-zinc-700" />
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-zinc-300 dark:bg-zinc-700 rounded w-24" />
                <div className="h-6 bg-zinc-300 dark:bg-zinc-700 rounded w-48" />
              </div>
            </div>
          </div>
        )}

        {/* Desktop Downloads Grid */}
        <div className="mb-16">
          <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-50 mb-6 text-center">
            {t('desktop.title')}
          </h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            {desktopDownloads.map((platform) => (
              <div
                key={platform.os}
                className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-700 dark:text-zinc-300">
                    {platformIcons[platform.os]}
                  </div>
                  <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">{platform.label}</h3>
                </div>
                <div className="space-y-2">
                  {platform.variants.map((v) => (
                    <a
                      key={v.url}
                      href={v.url}
                      className="flex items-center justify-between gap-2 px-3 py-2 rounded-lg bg-zinc-50 dark:bg-zinc-800 hover:bg-primary-50 dark:hover:bg-primary-900/20 text-sm text-zinc-700 dark:text-zinc-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors group"
                    >
                      <span>{v.label}</span>
                      <svg className="w-4 h-4 flex-shrink-0 opacity-50 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                      </svg>
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile + Web */}
        <div className="mb-16">
          <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-50 mb-6 text-center">
            {t('mobile.title')}
          </h2>
          <div className="grid sm:grid-cols-3 gap-6">
            {/* iOS */}
            <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 relative overflow-hidden">
              <span className="absolute top-3 right-3 text-xs font-medium px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400">
                {t('comingSoon')}
              </span>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-400 dark:text-zinc-500">
                  {platformIcons.ios}
                </div>
                <h3 className="text-lg font-bold text-zinc-400 dark:text-zinc-500">iOS</h3>
              </div>
              <p className="text-sm text-zinc-400 dark:text-zinc-500">{t('ios.description')}</p>
            </div>

            {/* Android */}
            <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 relative overflow-hidden">
              <span className="absolute top-3 right-3 text-xs font-medium px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400">
                {t('comingSoon')}
              </span>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-400 dark:text-zinc-500">
                  {platformIcons.android}
                </div>
                <h3 className="text-lg font-bold text-zinc-400 dark:text-zinc-500">Android</h3>
              </div>
              <p className="text-sm text-zinc-400 dark:text-zinc-500">{t('android.description')}</p>
            </div>

            {/* Web */}
            <a
              href="https://tego.zhama.com.cn"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 hover:shadow-md hover:border-primary-300 dark:hover:border-primary-700 transition-all group"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-primary-600 dark:text-primary-400">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                  {t('web.title')}
                </h3>
              </div>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">{t('web.description')}</p>
            </a>
          </div>
        </div>

        {/* Enterprise CTA */}
        <div className="text-center rounded-2xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-8">
          <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-50 mb-2">{t('enterprise.title')}</h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">{t('enterprise.description')}</p>
          <Link
            href={`/${locale}/contact`}
            className="inline-flex items-center px-6 py-2.5 rounded-xl bg-primary-600 hover:bg-primary-700 text-white text-sm font-medium shadow-md hover:shadow-lg transition-all"
          >
            {t('enterprise.cta')}
          </Link>
        </div>
      </div>
    </div>
  );
}
