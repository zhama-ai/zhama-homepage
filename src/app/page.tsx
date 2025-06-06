'use client';

import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import FeaturesSection from '@/components/FeaturesSection';
import AdvantagesSection from '@/components/AdvantagesSection';
import DownloadSection from '@/components/DownloadSection';
import AboutUsSection from '@/components/AboutUsSection';
import ContactSection from '@/components/ContactSection';
import FooterSection from '@/components/FooterSection';

export default function Home() {
  return (
    <div className="min-h-screen bg-light-200 bg-light-grid-pattern dark:bg-dark-900 dark:bg-grid-pattern overflow-x-hidden">
      <Header />
      <main className="animate-fadeIn">
        <HeroSection />
        <FeaturesSection />
        <AdvantagesSection />
        <DownloadSection />
        <AboutUsSection />
        {/* <ContactSection /> */}
      </main>
      <FooterSection />
    </div>
  );
} 