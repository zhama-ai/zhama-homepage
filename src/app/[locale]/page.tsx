import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import PainPointsSection from '@/components/PainPointsSection';
import ProductOverviewSection from '@/components/ProductOverviewSection';
import CoreEnginesSection from '@/components/CoreEnginesSection';
import OmniChannelSection from '@/components/OmniChannelSection';
import MemoryEvolutionSection from '@/components/MemoryEvolutionSection';
import SecurityComplianceSection from '@/components/SecurityComplianceSection';
import ScenariosSection from '@/components/ScenariosSection';
import SocialProofSection from '@/components/SocialProofSection';
import PricingSection from '@/components/PricingSection';
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
        {/* Hero - 企业数字分身 + AI 超级团队定位 */}
        <HeroSection locale={locale} />
        
        {/* 痛点共鸣 - 你的 AI 是不是也这样？ */}
        <PainPointsSection locale={locale} />
        
        {/* 产品全景 - 为什么企业需要数字分身平台 */}
        <ProductOverviewSection locale={locale} />
        
        {/* 四大核心引擎 - 数字分身 / 智能编排 / MCP / 治理 */}
        <CoreEnginesSection locale={locale} />
        
        {/* 全渠道 AI 触达 - 12+ 通道 + 多端产品 */}
        <OmniChannelSection locale={locale} />
        
        {/* 记忆与进化 - 四维记忆 + 经验池 */}
        <MemoryEvolutionSection locale={locale} />
        
        {/* 安全与合规 - 企业级能力升级 */}
        <SecurityComplianceSection locale={locale} />
        
        {/* 场景案例 - 行业 + 客户背书 */}
        <ScenariosSection locale={locale} />
        
        {/* 数据指标 - 量化价值 */}
        <SocialProofSection locale={locale} />
        
        {/* 价格与部署 */}
        <PricingSection locale={locale} />
        
        {/* 底部强 CTA */}
        <BottomCTASection locale={locale} />
      </main>
      <FooterSection locale={locale} />
    </div>
  );
}
