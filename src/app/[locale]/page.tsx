import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import PainPointsSection from '@/components/PainPointsSection';
import ValuePillarsSection from '@/components/ValuePillarsSection';
import CoreTechnologySection from '@/components/CoreTechnologySection';
import ScenariosSection from '@/components/ScenariosSection';
import CustomerCasesSection from '@/components/CustomerCasesSection';
import EnterpriseReadinessSection from '@/components/EnterpriseReadinessSection';
import PrivateDeliverySection from '@/components/PrivateDeliverySection';
import PocSection from '@/components/PocSection';
import PricingSection from '@/components/PricingSection';
import ResourceCenterSection from '@/components/ResourceCenterSection';
import BottomCTASection from '@/components/BottomCTASection';
import FooterSection from '@/components/FooterSection';
import { localizedAlternates, localizedOpenGraph } from '@/lib/seo';

interface HomeProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: HomeProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'seo' });

  return {
    title: { absolute: t('title') },
    description: t('description'),
    keywords: t('keywords'),
    alternates: localizedAlternates(locale),
    openGraph: {
      title: t('openGraph.title'),
      description: t('openGraph.description'),
      type: 'website',
      ...localizedOpenGraph(locale),
    },
    twitter: {
      card: 'summary_large_image',
      title: t('twitter.title'),
      description: t('twitter.description'),
    },
  };
}

export default async function Home({ params }: HomeProps) {
  const { locale } = await params;

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <Header />
      <main>
        <HeroSection locale={locale} />
        <PainPointsSection locale={locale} />
        <ValuePillarsSection locale={locale} />
        <CoreTechnologySection locale={locale} />
        <ScenariosSection locale={locale} />
        <CustomerCasesSection locale={locale} />
        <EnterpriseReadinessSection locale={locale} />
        <PrivateDeliverySection locale={locale} />
        <PocSection locale={locale} />
        <PricingSection locale={locale} />
        <ResourceCenterSection locale={locale} />
        <BottomCTASection locale={locale} />
      </main>
      <FooterSection locale={locale} />
    </div>
  );
}
