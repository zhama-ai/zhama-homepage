import { getTranslations } from 'next-intl/server';
import { Container } from './ui/Container';
import { Section, SectionHeader } from './ui/Section';
import { getDownloadInfo, formatReleaseDate } from '@/lib/download';
import { 
  Monitor, 
  Apple, 
  Download,
  Globe,
  BookOpen
} from 'lucide-react';

interface DownloadSectionProps {
  locale: string;
}

// Linux 图标组件
function LinuxIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12.504 0c-.155 0-.315.008-.48.021-4.226.333-3.105 4.807-3.17 6.298-.076 1.092-.3 1.953-1.05 3.02-.885 1.051-2.127 2.75-2.716 4.521-.278.832-.41 1.684-.287 2.489a.424.424 0 00-.11.135c-.26.268-.45.6-.663.839-.199.199-.485.267-.797.4-.313.136-.658.269-.864.68-.09.189-.136.394-.132.602 0 .199.027.4.055.536.058.399.116.728.04.97-.249.68-.28 1.145-.106 1.484.174.334.535.47.94.601.81.2 1.91.135 2.774.6.926.466 1.866.67 2.616.47.526-.116.97-.464 1.208-.946.587-.003 1.23-.269 2.26-.334.699-.058 1.574.267 2.577.2.025.134.063.198.114.333l.003.003c.391.778 1.113 1.132 1.884 1.071.771-.06 1.592-.536 2.257-1.306.631-.765 1.683-1.084 2.378-1.503.348-.199.629-.469.649-.853.023-.4-.2-.811-.714-1.376v-.097l-.003-.003c-.17-.2-.25-.535-.338-.926-.085-.401-.182-.786-.492-1.046h-.003c-.059-.054-.123-.067-.188-.135a.357.357 0 00-.19-.064c.431-1.278.264-2.55-.173-3.694-.533-1.41-1.465-2.638-2.175-3.483-.796-1.005-1.576-1.957-1.56-3.368.026-2.152.236-6.133-3.544-6.139zm.529 3.405h.013c.213 0 .396.062.584.198.19.135.33.332.438.533.105.259.158.459.166.724 0-.02.006-.04.006-.06v.105a.086.086 0 01-.004-.021l-.004-.024a1.807 1.807 0 01-.15.706.953.953 0 01-.213.335.71.71 0 00-.088-.042c-.104-.045-.198-.064-.284-.133a1.312 1.312 0 00-.22-.066c.05-.06.146-.133.183-.198.053-.128.082-.264.088-.402v-.02a1.21 1.21 0 00-.061-.4c-.045-.134-.101-.2-.183-.333-.084-.066-.167-.132-.267-.132h-.016c-.093 0-.176.03-.262.132a.8.8 0 00-.205.334 1.18 1.18 0 00-.09.468v.018c.003.2.092.393.16.53.073.135.16.2.263.334.063.09.155.133.224.198.007.008 0 .018 0 .024-.05.093-.09.133-.15.198-.054.064-.116.134-.209.198-.088.06-.166.093-.232.066a.751.751 0 01-.213-.134c-.108-.166-.171-.332-.241-.466-.1-.2-.149-.4-.15-.668v-.012c-.001-.4.064-.733.189-1.067.098-.267.23-.468.4-.667.16-.133.353-.266.578-.266zm-2.646.22h.006c.134 0 .252.053.364.135.111.081.199.2.27.332.094.2.148.4.149.667v.004c0 .066.006.133-.001.2l-.003.006c-.008.066-.011.133-.028.2-.022.133-.058.266-.091.399-.063.134-.175.267-.22.334a.375.375 0 01-.165.132c-.059.032-.132-.003-.18-.133a.39.39 0 01-.048-.2v-.018a.78.78 0 01.01-.133c.005-.066.012-.133.029-.2.026-.133.054-.266.06-.4.008-.066.01-.133.004-.2a.676.676 0 00-.036-.133.618.618 0 00-.12-.2.35.35 0 00-.15-.066h-.003a.234.234 0 00-.14.066.444.444 0 00-.126.2c-.015.045-.027.088-.036.133a.764.764 0 00-.014.2c0 .066.006.133.013.2.01.066.024.133.04.2a.948.948 0 00.126.333.625.625 0 00.167.2c.05.038.11.066.164.132.015.066-.048.132-.11.2-.053.066-.116.132-.179.198-.086.064-.159.064-.232 0a.857.857 0 01-.18-.133c-.126-.133-.2-.267-.276-.4-.08-.133-.127-.267-.14-.4v-.012c-.034-.266-.003-.534.09-.8.095-.266.213-.466.375-.666a.893.893 0 01.533-.334c.028-.003.056-.005.084-.005zm1.936 5.908c.18-.003.36.022.537.08.531.175.97.575 1.198 1.082.227.508.238 1.107.013 1.623-.224.517-.611.934-1.126 1.158a1.984 1.984 0 01-1.64-.064c-.508-.26-.897-.71-1.052-1.255-.155-.545-.069-1.151.272-1.612.342-.461.863-.8 1.456-.935.113-.02.228-.045.342-.077z"/>
    </svg>
  );
}

export default async function DownloadSection({ locale }: DownloadSectionProps) {
  const t = await getTranslations({ locale, namespace: 'downloadSection' });
  const downloadInfo = await getDownloadInfo();
  
  const isZh = locale === 'zh';

  // 下载选项配置
  const platformDownloads = downloadInfo ? [
    {
      platform: 'macos',
      icon: Apple,
      name: isZh ? 'macOS' : 'macOS',
      options: [
        {
          label: 'Apple Silicon',
          sublabel: 'M1/M2/M3',
          url: downloadInfo.downloads.macos_arm64,
          format: '.dmg',
        },
        {
          label: 'Intel',
          sublabel: 'x64',
          url: downloadInfo.downloads.macos_x64,
          format: '.dmg',
        },
      ],
    },
    {
      platform: 'windows',
      icon: Monitor,
      name: 'Windows',
      options: [
        {
          label: isZh ? '安装程序' : 'Installer',
          sublabel: 'x64',
          url: downloadInfo.downloads.windows_x64_exe,
          format: '.exe',
          recommended: true,
        },
        {
          label: 'MSI',
          sublabel: 'x64',
          url: downloadInfo.downloads.windows_x64_msi,
          format: '.msi',
        },
      ],
    },
    {
      platform: 'linux',
      icon: LinuxIcon,
      name: 'Linux',
      options: [
        {
          label: 'AppImage',
          sublabel: 'x64',
          url: downloadInfo.downloads.linux_x64_appimage,
          format: '.AppImage',
        },
        {
          label: 'AppImage',
          sublabel: 'ARM64',
          url: downloadInfo.downloads.linux_arm64_appimage,
          format: '.AppImage',
        },
        {
          label: 'Deb',
          sublabel: 'x64',
          url: downloadInfo.downloads.linux_x64_deb,
          format: '.deb',
        },
        {
          label: 'Deb',
          sublabel: 'ARM64',
          url: downloadInfo.downloads.linux_arm64_deb,
          format: '.deb',
        },
      ],
    },
  ] : [];

  return (
    <Section id="download" className="bg-zinc-50 dark:bg-zinc-950 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-20" />
      
      <Container className="relative z-10">
        <SectionHeader 
          title={t('title')} 
          subtitle={t('subtitle')}
        />

        {/* 桌面客户端下载 */}
        {downloadInfo && (
          <div className="mb-16">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-2">
                {t('downloadApp.title')}
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400">
                {t('downloadApp.description')}
              </p>
              <div className="mt-3 inline-flex items-center gap-3 text-sm text-zinc-500 dark:text-zinc-500">
                <span className="font-mono bg-zinc-100 dark:bg-zinc-800 px-2 py-1 rounded">
                  {downloadInfo.version}
                </span>
                <span>•</span>
                <span>{formatReleaseDate(downloadInfo.releaseDate, locale)}</span>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {platformDownloads.map((platform) => {
                const IconComponent = platform.icon;
                return (
                  <div
                    key={platform.platform}
                    className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6 hover:shadow-lg transition-all duration-300"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 rounded-xl bg-primary-600/10 text-primary-600 dark:text-primary-400 flex items-center justify-center">
                        <IconComponent className="w-6 h-6" />
                      </div>
                      <h4 className="text-xl font-bold text-zinc-900 dark:text-zinc-50">
                        {platform.name}
                      </h4>
                    </div>
                    
                    <div className="space-y-2">
                      {platform.options.map((option, idx) => (
                        <a
                          key={idx}
                          href={option.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-between p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 hover:bg-primary-50 dark:hover:bg-primary-900/20 border border-zinc-100 dark:border-zinc-700/50 hover:border-primary-200 dark:hover:border-primary-700/50 transition-all duration-200 group"
                        >
                          <div className="flex items-center gap-3">
                            <Download className="w-4 h-4 text-zinc-400 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors" />
                            <div>
                              <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300 group-hover:text-primary-700 dark:group-hover:text-primary-300">
                                {option.label}
                              </span>
                              <span className="text-xs text-zinc-500 dark:text-zinc-500 ml-2">
                                {option.sublabel}
                              </span>
                            </div>
                          </div>
                          <span className="text-xs font-mono text-zinc-400 dark:text-zinc-500">
                            {option.format}
                          </span>
                        </a>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Web 版本和文档 */}
        <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {/* Web 版本 */}
          <a
            href="https://tego.zhama.com.cn"
            target="_blank"
            rel="noopener noreferrer"
            className="group bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
          >
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl bg-primary-600/10 text-primary-600 dark:text-primary-400 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Globe className="w-7 h-7" />
              </div>
              <div className="flex-1">
                <h4 className="text-lg font-bold text-zinc-900 dark:text-zinc-50 mb-1">
                  {t('webAccess.title')}
                </h4>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  {t('webAccess.description')}
                </p>
              </div>
            </div>
          </a>

          {/* 开发文档 */}
          <a
            href="https://docs.zhama.com.cn"
            target="_blank"
            rel="noopener noreferrer"
            className="group bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
          >
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <BookOpen className="w-7 h-7" />
              </div>
              <div className="flex-1">
                <h4 className="text-lg font-bold text-zinc-900 dark:text-zinc-50 mb-1">
                  {t('documentation.title')}
                </h4>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  {t('documentation.description')}
                </p>
              </div>
            </div>
          </a>
        </div>
      </Container>
    </Section>
  );
}
