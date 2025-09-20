import { getTranslations } from 'next-intl/server';
import Link from 'next/link';

interface HeroSectionProps {
  locale: string;
}

export default async function HeroSection({ locale }: HeroSectionProps) {
  const t = await getTranslations({ locale, namespace: 'home' });
  const tn = await getTranslations({ locale, namespace: 'nav' });

  return (
    <section className="relative min-h-[80vh] lg:min-h-[86vh] flex items-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-light-50 to-light-200 dark:from-dark-950 dark:to-dark-900"></div>
      <div className="absolute inset-0 bg-dots-pattern opacity-10"></div>
      <div className="w-full px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center py-20">
          <div className="space-y-8">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-[52px] xl:text-6xl font-bold tracking-tight animate-fade-in">
                <span className="block text-light-700 dark:text-white">
                  {t('hero.title')}
                </span>
              </h1>
              <p className="text-xl md:text-2xl lg:text-3xl font-semibold text-light-700 dark:text-white/90 animate-slide-up">
                {t('hero.tagline')}
              </p>
            </div>
            <p className="text-base md:text-lg text-light-600 dark:text-dark-400 leading-relaxed animate-slide-up">
              {t('hero.description')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 animate-slide-up">
              <Link href={`/${locale}/contact`} className="btn btn-primary group">
                <span>{tn('tryNow')}</span>
                <svg className="ml-2 -mr-1 w-5 h-5 transition-transform group-hover:translate-x-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </Link>
              <a href="https://tego.zhama.com.cn" target="_blank" className="btn btn-secondary">
                {t('hero.secondaryCta')}
              </a>
            </div>
            {/* Tags would be better moved to translation files, but keeping for now */}
          </div>
          <div className="relative">
            <div className="relative rounded-3xl overflow-hidden border border-light-300/60 dark:border-dark-700/60 shadow-xl">
              <img
                className="w-full h-auto object-cover"
                src="/images/home.png"
                alt={t('hero.imgAlt')}
                loading="eager"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 