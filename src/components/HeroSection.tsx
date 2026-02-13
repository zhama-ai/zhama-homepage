import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import Image from 'next/image';
import { Container } from './ui/Container';

interface HeroSectionProps {
  locale: string;
}

export default async function HeroSection({ locale }: HeroSectionProps) {
  const t = await getTranslations({ locale, namespace: 'home' });

  const bulletKeys = ['dualAvatar', 'orchestration', 'governance', 'mcp'] as const;

  const bulletIcons = {
    dualAvatar: (
      <svg className="w-5 h-5 text-violet-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
      </svg>
    ),
    orchestration: (
      <svg className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
      </svg>
    ),
    governance: (
      <svg className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
    mcp: (
      <svg className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 6.087c0-.355.186-.676.401-.959.221-.29.349-.634.349-1.003 0-1.036-1.007-1.875-2.25-1.875s-2.25.84-2.25 1.875c0 .369.128.713.349 1.003.215.283.401.604.401.959v0a.64.64 0 01-.657.643 48.491 48.491 0 01-4.163-.3c.186 1.613.645 3.162 1.35 4.6A15.014 15.014 0 0012 18.75a15.014 15.014 0 004.27-4.342 15.668 15.668 0 001.35-4.6 48.491 48.491 0 01-4.163.3A.64.64 0 0112.75 9.5v0" />
      </svg>
    ),
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-b from-zinc-50 to-white dark:from-zinc-950 dark:to-zinc-900">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid opacity-30" />
      <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 via-transparent to-transparent" />
      
      <Container className="relative z-10 py-20 md:py-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left content */}
          <div className="space-y-8 animate-fade-in">
            <div className="space-y-4">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 leading-tight whitespace-nowrap">
                {t('hero.title')}
              </h1>
              <p className="text-xl md:text-2xl font-semibold text-primary-600 dark:text-primary-400">
                {t('hero.tagline')}
              </p>
            </div>
            
            <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
              {t('hero.description')}
            </p>

            {/* Bullet points */}
            <div className="space-y-3">
              {bulletKeys.map((key) => (
                <div key={key} className="flex items-start gap-3">
                  {bulletIcons[key]}
                  <span className="text-sm md:text-base text-zinc-700 dark:text-zinc-300">
                    {t(`hero.bullets.${key}`)}
                  </span>
                </div>
              ))}
            </div>
            
            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                href={`/${locale}/contact`}
                className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-primary-600 hover:bg-primary-700 text-white font-medium shadow-md hover:shadow-lg transition-all duration-300 active:scale-95 group"
              >
                <span>{t('hero.cta')}</span>
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
              </Link>
              
              <a 
                href="https://tego.zhama.com.cn" 
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-900 dark:text-zinc-50 font-medium border border-zinc-200 dark:border-zinc-700 transition-all duration-300 active:scale-95"
              >
                {t('hero.secondaryCta')}
              </a>
            </div>

            {/* Deploy link */}
            <div>
              <Link
                href={`/${locale}/contact`}
                className="inline-flex items-center gap-1 text-sm text-zinc-500 dark:text-zinc-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 14.25h13.5m-13.5 0a3 3 0 01-3-3m3 3a3 3 0 100 6h13.5a3 3 0 100-6m-16.5-3a3 3 0 013-3h13.5a3 3 0 013 3m-19.5 0a4.5 4.5 0 01.9-2.7L5.737 5.1a3.375 3.375 0 012.7-1.35h7.126c1.062 0 2.062.5 2.7 1.35l2.587 3.45a4.5 4.5 0 01.9 2.7m0 0a3 3 0 01-3 3m0 3h.008v.008h-.008v-.008zm0-6h.008v.008h-.008v-.008zm-3 6h.008v.008h-.008v-.008zm0-6h.008v.008h-.008v-.008z" />
                </svg>
                <span>{t('hero.deployLink')}</span>
              </Link>
            </div>
          </div>
          
          {/* Right side image */}
          <div className="relative animate-scale-in animate-delay-200">
            <div className="relative rounded-3xl overflow-hidden border border-zinc-200 dark:border-zinc-800 shadow-2xl">
              <Image
                src="/images/hero-01.png"
                alt={t('hero.imgAlt')}
                width={1200}
                height={800}
                className="w-full h-auto object-cover"
                priority
              />
            </div>
            {/* Decoration */}
            <div className="absolute -z-10 top-8 right-8 w-72 h-72 bg-primary-500/10 rounded-full blur-3xl" />
          </div>
        </div>
      </Container>
    </section>
  );
}
