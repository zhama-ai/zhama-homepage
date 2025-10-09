import { getTranslations } from 'next-intl/server';
import Header from '@/components/Header';
import FooterSection from '@/components/FooterSection';
import MCPPlatformSection from '@/components/MCPPlatformSection';
import { Container } from '@/components/ui/Container';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'mcpPlatform.seo' });

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

export default async function PlatformPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'mcpPlatform' });

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-16 md:py-24 bg-white dark:bg-zinc-900 relative overflow-hidden">
          <div className="absolute inset-0 bg-grid opacity-20" />
          <Container className="relative z-10">
            <div className="text-center space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-zinc-50">
                {t('title')}
              </h1>
              <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
                {t('subtitle')}
              </p>
            </div>
          </Container>
        </section>

        {/* Content Section */}
        <section className="py-16 bg-zinc-100 dark:bg-zinc-900">
          <Container>
            <MCPPlatformSection />
          </Container>
        </section>
      </main>

      <FooterSection locale={locale} />
    </div>
  );
}
