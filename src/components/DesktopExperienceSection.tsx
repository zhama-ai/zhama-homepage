import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import { Container } from './ui/Container';
import { MessageCircleMore, Download, Monitor } from 'lucide-react';

interface DesktopExperienceSectionProps {
  locale: string;
}

const miniChatFeatureKeys = ['1', '2', '3', '4', '5'] as const;
const windowsFeatureKeys = ['1', '2'] as const;

export default async function DesktopExperienceSection({ locale }: DesktopExperienceSectionProps) {
  const t = await getTranslations({ locale, namespace: 'v3.desktopExperience' });

  return (
    <section id="desktop" className="py-20 md:py-28 bg-zinc-50 dark:bg-zinc-950">
      <Container>
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-block text-xs font-bold tracking-wider uppercase text-sky-600 dark:text-sky-400 mb-3">
            06 · DESKTOP
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-zinc-50">
            {t('title')}
          </h2>
          <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
            {t('subtitle')}
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {/* Mini Chat (large card) */}
          <div className="lg:col-span-2 p-6 md:p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:shadow-lg transition-shadow">
            <div className="flex items-start gap-4 mb-5">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-sky-100 dark:bg-sky-900/30 text-sky-600 dark:text-sky-300 flex-shrink-0">
                <MessageCircleMore className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
                  {t('miniChat.title')}
                </h3>
                <p className="text-sm text-sky-600 dark:text-sky-400 mt-1">
                  {t('miniChat.tagline')}
                </p>
              </div>
            </div>
            <ul className="space-y-2.5">
              {miniChatFeatureKeys.map((key) => (
                <li key={key} className="flex items-start gap-2.5 text-sm text-zinc-700 dark:text-zinc-300">
                  <svg className="w-4 h-4 text-sky-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                  </svg>
                  <span>{t(`miniChat.features.${key}`)}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right column: Downloads + Windows */}
          <div className="space-y-6">
            <Link
              href={`/${locale}/download`}
              className="block p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-emerald-300 dark:hover:border-emerald-700 hover:shadow-lg transition-all group"
            >
              <div className="flex items-start gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-300 flex-shrink-0">
                  <Download className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-zinc-900 dark:text-zinc-100">
                    {t('downloads.title')}
                  </h3>
                  <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-0.5">
                    {t('downloads.tagline')}
                  </p>
                </div>
              </div>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                {t('downloads.description')}
              </p>
              <span className="inline-flex items-center gap-1 mt-3 text-sm font-semibold text-emerald-700 dark:text-emerald-300 group-hover:gap-2 transition-all">
                →
              </span>
            </Link>

            <div className="p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
              <div className="flex items-start gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-300 flex-shrink-0">
                  <Monitor className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-zinc-900 dark:text-zinc-100">
                    {t('windows.title')}
                  </h3>
                  <p className="text-xs text-violet-600 dark:text-violet-400 mt-0.5">
                    {t('windows.tagline')}
                  </p>
                </div>
              </div>
              <ul className="space-y-2">
                {windowsFeatureKeys.map((key) => (
                  <li key={key} className="flex items-start gap-2 text-xs text-zinc-600 dark:text-zinc-400">
                    <span className="text-violet-500">•</span>
                    <span>{t(`windows.features.${key}`)}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
