import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import FeaturesSection from '@/components/FeaturesSection';
import AdvantagesSection from '@/components/AdvantagesSection';
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
    <div className="min-h-screen bg-light-200 bg-light-grid-pattern dark:bg-dark-900 dark:bg-grid-pattern overflow-x-hidden">
      <Header />
      <main className="animate-fade-in">
        <HeroSection locale={locale} />
        <FeaturesSection locale={locale} />
        <AdvantagesSection locale={locale} />
        <PricingSection locale={locale} />
        <DownloadSection locale={locale} />
        <AboutUsSection locale={locale} />
      </main>
      <FooterSection locale={locale} />
    </div>
  );
} 