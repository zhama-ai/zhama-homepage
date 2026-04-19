import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import PainPointsSection from '@/components/PainPointsSection';
import ValuePillarsSection from '@/components/ValuePillarsSection';
import ScenariosSection from '@/components/ScenariosSection';
import CustomerOutcomesSection from '@/components/CustomerOutcomesSection';
import EnterpriseReadinessSection from '@/components/EnterpriseReadinessSection';
import PrivateDeliverySection from '@/components/PrivateDeliverySection';
import PricingSection from '@/components/PricingSection';
import CustomerLogosSection from '@/components/CustomerLogosSection';
import ResourceCenterSection from '@/components/ResourceCenterSection';
import BottomCTASection from '@/components/BottomCTASection';
import FooterSection from '@/components/FooterSection';

interface HomeProps {
  params: Promise<{ locale: string }>;
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
        <ScenariosSection locale={locale} />
        <CustomerOutcomesSection locale={locale} />
        <EnterpriseReadinessSection locale={locale} />
        <PrivateDeliverySection locale={locale} />
        <PricingSection locale={locale} />
        <CustomerLogosSection locale={locale} />
        <ResourceCenterSection locale={locale} />
        <BottomCTASection locale={locale} />
      </main>
      <FooterSection locale={locale} />
    </div>
  );
}
