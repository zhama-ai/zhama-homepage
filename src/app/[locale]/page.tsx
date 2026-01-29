import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import ProductSuiteSection from '@/components/ProductSuiteSection';
import AdvantagesSection from '@/components/AdvantagesSection';
import TegoOSSection from '@/components/TegoOSSection';
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
        {/* Hero - 主标语和 CTA */}
        <HeroSection locale={locale} />
        
        {/* 产品套件 - Desktop/Web/Office/A2UI/Skills */}
        <ProductSuiteSection locale={locale} />
        
        {/* 使用场景 - 产品能解决什么问题 */}
        <AdvantagesSection locale={locale} />
        
        {/* 为什么选择 TeGo - 核心优势 */}
        <TegoOSSection locale={locale} />
        
        {/* 多智能体协作 - LAMP 框架简介 */}
        <MultiAgentSection locale={locale} />
        
        {/* 价格方案 */}
        <PricingSection locale={locale} />
        
        {/* 下载 - 真实下载链接 */}
        <DownloadSection locale={locale} />
        
        {/* 关于我们 */}
        <AboutUsSection locale={locale} />
      </main>
      <FooterSection locale={locale} />
    </div>
  );
}
