import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import Image from 'next/image';
import { Container } from './ui/Container';

interface HeroSectionProps {
  locale: string;
}

export default async function HeroSection({ locale }: HeroSectionProps) {
  const t = await getTranslations({ locale, namespace: 'biz.hero' });

  const highlightKeys = ['scale', 'speed', 'delivery'] as const;

  return (
    <section
      id="home"
      className="relative min-h-[88vh] flex items-center overflow-hidden bg-gradient-to-b from-zinc-50 via-white to-white dark:from-zinc-950 dark:via-zinc-950 dark:to-zinc-900"
    >
      <div className="absolute inset-0 bg-grid opacity-30" />
      <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 via-transparent to-transparent" />
      <div className="absolute -top-32 -right-32 w-[600px] h-[600px] bg-primary-500/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-32 -left-32 w-[500px] h-[500px] bg-violet-500/10 rounded-full blur-3xl" />

      <Container className="relative z-10 py-20 md:py-28">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-7 space-y-8 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-50 dark:bg-primary-950/40 border border-primary-200 dark:border-primary-800 text-xs font-semibold text-primary-700 dark:text-primary-300">
              <span className="w-1.5 h-1.5 rounded-full bg-primary-500 animate-pulse" />
              {t('badge')}
            </div>

            <div className="space-y-6">
              <h1 className="text-2xl sm:text-3xl md:text-3xl lg:text-[1.875rem] xl:text-[2.25rem] font-bold tracking-tight text-zinc-900 dark:text-zinc-50 leading-[1.2] whitespace-nowrap">
                {t('title')}
              </h1>
              <p className="text-lg md:text-xl text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-2xl">
                {t('subtitle')}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href={`/${locale}/contact`}
                className="inline-flex flex-col items-start px-7 py-4 rounded-xl bg-primary-600 hover:bg-primary-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 active:scale-95 group"
              >
                <span className="flex items-center text-base">
                  {t('primaryCta')}
                  <svg
                    className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
                <span className="text-xs text-primary-100 mt-1 font-normal">
                  {t('primaryCtaHint')}
                </span>
              </Link>

              <Link
                href={`/${locale}/download`}
                className="inline-flex flex-col items-start px-7 py-4 rounded-xl bg-white hover:bg-zinc-50 dark:bg-zinc-900 dark:hover:bg-zinc-800 text-zinc-900 dark:text-zinc-50 font-semibold border border-zinc-200 dark:border-zinc-700 transition-all duration-300 active:scale-95"
              >
                <span className="text-base">{t('secondaryCta')}</span>
                <span className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 font-normal">
                  {t('secondaryCtaHint')}
                </span>
              </Link>
            </div>

            <div className="pt-2">
              <Link
                href={`/${locale}/contact`}
                className="inline-flex items-center gap-1.5 text-sm text-zinc-500 dark:text-zinc-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 14.25h13.5m-13.5 0a3 3 0 01-3-3m3 3a3 3 0 100 6h13.5a3 3 0 100-6m-16.5-3a3 3 0 013-3h13.5a3 3 0 013 3m-19.5 0a4.5 4.5 0 01.9-2.7L5.737 5.1a3.375 3.375 0 012.7-1.35h7.126c1.062 0 2.062.5 2.7 1.35l2.587 3.45a4.5 4.5 0 01.9 2.7" />
                </svg>
                <span>{t('tertiaryCta')} · {t('tertiaryCtaHint')}</span>
              </Link>
            </div>

            <div className="pt-6 border-t border-zinc-200 dark:border-zinc-800">
              <p className="text-xs uppercase tracking-wider text-zinc-500 dark:text-zinc-500 mb-4">
                {t('trustLine')}
              </p>
              <div className="grid grid-cols-3 gap-6 max-w-2xl">
                {highlightKeys.map((key) => (
                  <div key={key}>
                    <div className="text-2xl md:text-3xl font-bold text-zinc-900 dark:text-zinc-50">
                      {t(`highlights.${key}.value`)}
                    </div>
                    <div className="mt-1 text-xs md:text-sm text-zinc-500 dark:text-zinc-400 leading-snug">
                      {t(`highlights.${key}.label`)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 relative animate-scale-in animate-delay-200">
            <div className="relative rounded-3xl overflow-hidden border border-zinc-200 dark:border-zinc-800 shadow-2xl">
              <Image
                src="/images/hero-01.png"
                alt={t('title')}
                width={1200}
                height={800}
                className="w-full h-auto object-cover"
                priority
              />
            </div>
            <div className="absolute -z-10 top-8 right-8 w-72 h-72 bg-primary-500/10 rounded-full blur-3xl" />
          </div>
        </div>
      </Container>
    </section>
  );
}
