import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import { Container } from './ui/Container';

interface HeroSectionProps {
  locale: string;
}

export default async function HeroSection({ locale }: HeroSectionProps) {
  const t = await getTranslations({ locale, namespace: 'home' });
  const tn = await getTranslations({ locale, namespace: 'nav' });

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-b from-zinc-50 to-white dark:from-zinc-950 dark:to-zinc-900">
      {/* 背景装饰 */}
      <div className="absolute inset-0 bg-grid opacity-30" />
      <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 via-transparent to-transparent" />
      
      <Container className="relative z-10 py-20 md:py-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* 左侧内容 */}
          <div className="space-y-8 animate-fade-in">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
                {t('hero.title')}
              </h1>
              <p className="text-2xl md:text-3xl font-semibold text-primary-600 dark:text-primary-400">
                {t('hero.tagline')}
              </p>
            </div>
            
            <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
              {t('hero.description')}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                href={`/${locale}/contact`}
                className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-primary-600 hover:bg-primary-700 text-white font-medium shadow-md hover:shadow-lg transition-all duration-300 active:scale-95 group"
              >
                <span>{tn('tryNow')}</span>
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
          </div>
          
          {/* 右侧图片 */}
          <div className="relative animate-scale-in animate-delay-200">
            <div className="relative rounded-3xl overflow-hidden border border-zinc-200 dark:border-zinc-800 shadow-2xl">
              <img
                className="w-full h-auto object-cover"
                src="/images/home.png"
                alt={t('hero.imgAlt')}
                loading="eager"
              />
            </div>
            {/* 装饰元素 */}
            <div className="absolute -z-10 top-8 right-8 w-72 h-72 bg-primary-500/10 rounded-full blur-3xl" />
          </div>
        </div>
      </Container>
    </section>
  );
}
