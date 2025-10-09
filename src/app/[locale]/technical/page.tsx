import { getTranslations } from 'next-intl/server';
import Header from '@/components/Header';
import FooterSection from '@/components/FooterSection';
import TechnicalFeaturesSection from '@/components/TechnicalFeaturesSection';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({
    locale,
    namespace: 'technicalFeatures.seo',
  });

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

export default async function TechnicalPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'technicalFeatures' });

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
              <p className="text-lg text-light-600 dark:text-dark-400 max-w-3xl mx-auto">
                装饰器驱动的开发模式，极大简化智能体工具开发流程
              </p>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-16 bg-light-100 dark:bg-dark-800">
          <div className="w-full px-4 sm:px-6 lg:px-8">
            <TechnicalFeaturesSection />
          </div>
        </section>
      </main>

      <FooterSection locale={locale} />
    </div>
  );
}

