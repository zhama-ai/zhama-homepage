import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import FeaturesSection from '@/components/FeaturesSection';
import TegoOSSection from '@/components/TegoOSSection';
import AdvantagesSection from '@/components/AdvantagesSection';
import MultiAgentSection from '@/components/MultiAgentSection';
import DownloadSection from '@/components/DownloadSection';
import PricingSection from '@/components/PricingSection';
import AboutUsSection from '@/components/AboutUsSection';
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
        <FeaturesSection locale={locale} />
        <TegoOSSection locale={locale} />
        <AdvantagesSection locale={locale} />
        <MultiAgentSection locale={locale} />
        <PricingSection locale={locale} />
        <DownloadSection locale={locale} />
        <AboutUsSection locale={locale} />
      </main>
      <FooterSection locale={locale} />
    </div>
  );
}
