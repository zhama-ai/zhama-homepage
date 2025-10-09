import { getTranslations } from 'next-intl/server';
import Header from '@/components/Header';
import FooterSection from '@/components/FooterSection';
import PluginSystemSection from '@/components/PluginSystemSection';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'pluginSystem.seo' });

  return {
    title: t('title'),
    description: t('description'),
    keywords: t('keywords'),
    openGraph: {
      title: t('openGraph.title'),
      description: t('openGraph.description'),
    },
  };
}

export default async function PluginSystemPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'pluginSystem' });

  return (
    <div className="min-h-screen bg-light-200 bg-light-grid-pattern dark:bg-dark-900 dark:bg-grid-pattern overflow-x-hidden">
      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-16 sm:py-20 md:py-24 bg-white dark:bg-dark-900 relative overflow-hidden">
          <div className="absolute inset-0 bg-light-grid-pattern dark:bg-grid-pattern opacity-5"></div>
          <div className="w-full px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-12">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-light-700 dark:text-white mb-6">
                {t('title')}
              </h1>
              <p className="text-lg text-light-600 dark:text-dark-400 max-w-3xl mx-auto mb-4">
                {t('subtitle')}
              </p>
              <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-accent-500 to-accent-400 text-white font-semibold text-base shadow-lg">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
                <span>{t('stats.highlight')}</span>
              </div>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-16 bg-light-100 dark:bg-dark-800">
          <div className="w-full px-4 sm:px-6 lg:px-8">
            <PluginSystemSection />
          </div>
        </section>
      </main>

      <FooterSection locale={locale} />
    </div>
  );
}

