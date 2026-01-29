import { getTranslations } from 'next-intl/server';
import Header from '@/components/Header';
import FooterSection from '@/components/FooterSection';
import TechnicalFeaturesSection from '@/components/TechnicalFeaturesSection';
import { Container } from '@/components/ui/Container';
import { 
  Brain, 
  MessageSquare, 
  Target, 
  GitBranch,
  Database,
  Share2,
  Zap,
  RotateCw,
  Palette,
  Puzzle,
  Shield,
  Clock,
  CheckCircle,
  TrendingUp,
  Network
} from 'lucide-react';

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
  const tLamp = await getTranslations({ locale, namespace: 'techDetails.lamp' });
  const tDag = await getTranslations({ locale, namespace: 'techDetails.dag' });
  const tExp = await getTranslations({ locale, namespace: 'techDetails.experience' });
  const tA2ui = await getTranslations({ locale, namespace: 'techDetails.a2ui' });
  const tSkills = await getTranslations({ locale, namespace: 'techDetails.skills' });

  const lampModules = [
    {
      key: 'think',
      icon: Brain,
      bgColor: 'bg-teal-500/10',
      textColor: 'text-teal-600 dark:text-teal-400',
      borderColor: 'border-teal-200 dark:border-teal-800/50',
    },
    {
      key: 'speak',
      icon: MessageSquare,
      bgColor: 'bg-amber-500/10',
      textColor: 'text-amber-600 dark:text-amber-400',
      borderColor: 'border-amber-200 dark:border-amber-800/50',
    },
    {
      key: 'decide',
      icon: Target,
      bgColor: 'bg-emerald-500/10',
      textColor: 'text-emerald-600 dark:text-emerald-400',
      borderColor: 'border-emerald-200 dark:border-emerald-800/50',
    },
  ];

  const dagFeatures = [
    { key: 'topology', icon: GitBranch },
    { key: 'parallel', icon: Zap },
    { key: 'dynamic', icon: RotateCw },
    { key: 'isolation', icon: Shield },
  ];

  const expFeatures = [
    { key: 'vector', icon: Database },
    { key: 'retrieval', icon: TrendingUp },
    { key: 'reuse', icon: CheckCircle },
    { key: 'evolution', icon: RotateCw },
  ];

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-16 md:py-24 bg-white dark:bg-zinc-900 relative overflow-hidden">
          <div className="absolute inset-0 bg-grid opacity-20" />
          <Container className="relative z-10">
            <div className="text-center space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-50 dark:bg-primary-900/30 border border-primary-200 dark:border-primary-800 mb-4">
                <Network className="w-4 h-4 text-primary-600 dark:text-primary-400" />
                <span className="text-sm font-medium text-primary-700 dark:text-primary-300">
                  {t('badge')}
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-zinc-50">
                {t('title')}
              </h1>
              <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-3xl mx-auto">
                {t('heroDescription')}
              </p>
            </div>
          </Container>
        </section>

        {/* LAMP 框架详解 */}
        <section id="lamp" className="py-16 bg-zinc-50 dark:bg-zinc-950 scroll-mt-20">
          <Container>
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300 text-sm font-medium mb-4">
                {tLamp('badge')}
              </div>
              <h2 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50 mb-4">
                {tLamp('title')}
              </h2>
              <p className="text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
                {tLamp('subtitle')}
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-12">
              {lampModules.map((module, index) => {
                const IconComponent = module.icon;
                return (
                  <div 
                    key={module.key}
                    className={`relative bg-white dark:bg-zinc-900 rounded-2xl p-6 border ${module.borderColor} shadow-sm hover:shadow-lg transition-all duration-300`}
                  >
                    <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-zinc-900 dark:bg-zinc-100 flex items-center justify-center text-white dark:text-zinc-900 text-sm font-bold shadow-md">
                      {index + 1}
                    </div>
                    
                    <div className={`w-14 h-14 rounded-xl ${module.bgColor} flex items-center justify-center mb-4`}>
                      <IconComponent className={`w-7 h-7 ${module.textColor}`} />
                    </div>
                    
                    <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-50 mb-2">
                      {tLamp(`${module.key}.title`)}
                    </h3>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">
                      {tLamp(`${module.key}.description`)}
                    </p>
                    
                    <ul className="space-y-2">
                      {(tLamp.raw(`${module.key}.features`) as string[]).map((feature, idx) => (
                        <li key={idx} className="text-sm text-zinc-600 dark:text-zinc-400 flex items-start gap-2">
                          <CheckCircle className={`w-4 h-4 ${module.textColor} mt-0.5 flex-shrink-0`} />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </Container>
        </section>

        {/* DAG 并发调度引擎 */}
        <section id="dag" className="py-16 bg-white dark:bg-zinc-900 scroll-mt-20">
          <Container>
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 text-sm font-medium mb-4">
                {tDag('badge')}
              </div>
              <h2 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50 mb-4">
                {tDag('title')}
              </h2>
              <p className="text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
                {tDag('subtitle')}
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {dagFeatures.map((feature, index) => {
                const IconComponent = feature.icon;
                const colors = [
                  { bg: 'bg-amber-500/10', text: 'text-amber-600 dark:text-amber-400' },
                  { bg: 'bg-teal-500/10', text: 'text-teal-600 dark:text-teal-400' },
                  { bg: 'bg-rose-500/10', text: 'text-rose-600 dark:text-rose-400' },
                  { bg: 'bg-purple-500/10', text: 'text-purple-600 dark:text-purple-400' },
                ];
                return (
                  <div 
                    key={feature.key}
                    className="bg-zinc-50 dark:bg-zinc-800/50 rounded-xl p-5 border border-zinc-100 dark:border-zinc-700/50"
                  >
                    <div className={`w-10 h-10 rounded-lg ${colors[index].bg} flex items-center justify-center mb-3`}>
                      <IconComponent className={`w-5 h-5 ${colors[index].text}`} />
                    </div>
                    <h4 className="font-semibold text-zinc-900 dark:text-zinc-50 mb-2">
                      {tDag(`features.${feature.key}.title`)}
                    </h4>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">
                      {tDag(`features.${feature.key}.description`)}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* 性能指标 */}
            <div className="bg-zinc-900 dark:bg-zinc-800 rounded-2xl p-8 text-white">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                <div>
                  <div className="text-3xl font-bold text-amber-400 mb-1">2-5×</div>
                  <div className="text-sm text-zinc-400">{tDag('metrics.efficiency')}</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-teal-400 mb-1">&lt;100ms</div>
                  <div className="text-sm text-zinc-400">{tDag('metrics.response')}</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-emerald-400 mb-1">95%+</div>
                  <div className="text-sm text-zinc-400">{tDag('metrics.success')}</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-rose-400 mb-1">7×24</div>
                  <div className="text-sm text-zinc-400">{tDag('metrics.availability')}</div>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* 经验池持续学习 */}
        <section id="experience" className="py-16 bg-zinc-50 dark:bg-zinc-950 scroll-mt-20">
          <Container>
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 text-sm font-medium mb-4">
                {tExp('badge')}
              </div>
              <h2 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50 mb-4">
                {tExp('title')}
              </h2>
              <p className="text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
                {tExp('subtitle')}
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {expFeatures.map((feature, index) => {
                const IconComponent = feature.icon;
                const colors = [
                  { bg: 'bg-emerald-500/10', text: 'text-emerald-600 dark:text-emerald-400' },
                  { bg: 'bg-teal-500/10', text: 'text-teal-600 dark:text-teal-400' },
                  { bg: 'bg-amber-500/10', text: 'text-amber-600 dark:text-amber-400' },
                  { bg: 'bg-primary-500/10', text: 'text-primary-600 dark:text-primary-400' },
                ];
                return (
                  <div 
                    key={feature.key}
                    className="bg-white dark:bg-zinc-900 rounded-xl p-5 border border-zinc-200 dark:border-zinc-800"
                  >
                    <div className={`w-10 h-10 rounded-lg ${colors[index].bg} flex items-center justify-center mb-3`}>
                      <IconComponent className={`w-5 h-5 ${colors[index].text}`} />
                    </div>
                    <h4 className="font-semibold text-zinc-900 dark:text-zinc-50 mb-2">
                      {tExp(`features.${feature.key}.title`)}
                    </h4>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">
                      {tExp(`features.${feature.key}.description`)}
                    </p>
                  </div>
                );
              })}
            </div>
          </Container>
        </section>

        {/* A2UI 动态界面 */}
        <section id="a2ui" className="py-16 bg-white dark:bg-zinc-900 scroll-mt-20">
          <Container>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 dark:bg-rose-900/30 text-rose-700 dark:text-rose-300 text-sm font-medium mb-4">
                  {tA2ui('badge')}
                </div>
                <h2 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50 mb-4">
                  {tA2ui('title')}
                </h2>
                <p className="text-zinc-600 dark:text-zinc-400 mb-6">
                  {tA2ui('description')}
                </p>
                
                <ul className="space-y-3">
                  {(tA2ui.raw('features') as string[]).map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-rose-500 mt-0.5 flex-shrink-0" />
                      <span className="text-zinc-700 dark:text-zinc-300">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="bg-zinc-100 dark:bg-zinc-800 rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Palette className="w-6 h-6 text-rose-500" />
                  <span className="font-semibold text-zinc-900 dark:text-zinc-50">{tA2ui('demo.title')}</span>
                </div>
                <div className="bg-white dark:bg-zinc-900 rounded-xl p-4 border border-zinc-200 dark:border-zinc-700">
                  <div className="text-sm text-zinc-600 dark:text-zinc-400 mb-3">{tA2ui('demo.input')}</div>
                  <div className="bg-zinc-50 dark:bg-zinc-800 rounded-lg p-4">
                    <div className="text-lg font-bold text-zinc-900 dark:text-zinc-50 mb-2">{tA2ui('demo.output.title')}</div>
                    <div className="grid grid-cols-3 gap-2 mb-3">
                      <div className="bg-teal-100 dark:bg-teal-900/30 rounded p-2 text-center">
                        <div className="text-lg font-bold text-teal-700 dark:text-teal-400">¥892K</div>
                        <div className="text-xs text-teal-600 dark:text-teal-500">华东</div>
                      </div>
                      <div className="bg-amber-100 dark:bg-amber-900/30 rounded p-2 text-center">
                        <div className="text-lg font-bold text-amber-700 dark:text-amber-400">¥756K</div>
                        <div className="text-xs text-amber-600 dark:text-amber-500">华南</div>
                      </div>
                      <div className="bg-rose-100 dark:bg-rose-900/30 rounded p-2 text-center">
                        <div className="text-lg font-bold text-rose-700 dark:text-rose-400">¥698K</div>
                        <div className="text-xs text-rose-600 dark:text-rose-500">华北</div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button className="flex-1 py-1.5 bg-primary-600 text-white text-xs rounded-lg">{tA2ui('demo.output.export')}</button>
                      <button className="flex-1 py-1.5 bg-zinc-200 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-300 text-xs rounded-lg">{tA2ui('demo.output.edit')}</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* Agent Skills 技能系统 */}
        <section id="skills" className="py-16 bg-zinc-50 dark:bg-zinc-950 scroll-mt-20">
          <Container>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="order-2 md:order-1">
                <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 border border-zinc-200 dark:border-zinc-800">
                  <div className="flex items-center gap-2 mb-4">
                    <Puzzle className="w-6 h-6 text-purple-500" />
                    <span className="font-semibold text-zinc-900 dark:text-zinc-50">{tSkills('example.title')}</span>
                  </div>
                  <pre className="bg-zinc-900 rounded-lg p-4 text-sm overflow-x-auto">
                    <code className="text-gray-100">
                      <span className="text-gray-500"># SKILL.md</span>{'\n'}
                      <span className="text-purple-400">---</span>{'\n'}
                      <span className="text-blue-300">name</span>: <span className="text-green-300">contract-reviewer</span>{'\n'}
                      <span className="text-blue-300">description</span>: <span className="text-green-300">{tSkills('example.desc')}</span>{'\n'}
                      <span className="text-blue-300">version</span>: <span className="text-green-300">1.0.0</span>{'\n'}
                      <span className="text-blue-300">compatibility</span>:{'\n'}
                      {'  '}- <span className="text-green-300">tego-os</span>{'\n'}
                      {'  '}- <span className="text-green-300">claude</span>{'\n'}
                      {'  '}- <span className="text-green-300">cursor</span>{'\n'}
                      <span className="text-purple-400">---</span>
                    </code>
                  </pre>
                </div>
              </div>
              
              <div className="order-1 md:order-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-sm font-medium mb-4">
                  {tSkills('badge')}
                </div>
                <h2 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50 mb-4">
                  {tSkills('title')}
                </h2>
                <p className="text-zinc-600 dark:text-zinc-400 mb-6">
                  {tSkills('description')}
                </p>
                
                <ul className="space-y-3">
                  {(tSkills.raw('features') as string[]).map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-purple-500 mt-0.5 flex-shrink-0" />
                      <span className="text-zinc-700 dark:text-zinc-300">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Container>
        </section>

        {/* MCP 框架 - 原有内容 */}
        <section id="mcp" className="py-16 bg-white dark:bg-zinc-900 scroll-mt-20">
          <Container>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50 mb-4">
                {t('mcpTitle')}
              </h2>
              <p className="text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
                {t('mcpSubtitle')}
              </p>
            </div>
            <TechnicalFeaturesSection />
          </Container>
        </section>
      </main>

      <FooterSection locale={locale} />
    </div>
  );
}
