import { getTranslations } from 'next-intl/server';
import { Container } from './ui/Container';
import { Section, SectionHeader } from './ui/Section';
import { 
  ArrowLeftRight, 
  Network, 
  Zap, 
  RotateCw,
  Users,
  Factory,
  ClipboardList,
  DollarSign,
  Briefcase,
  Headphones,
  BarChart3,
  Truck
} from 'lucide-react';

interface TegoOSSectionProps {
  locale: string;
}

const technologies = [
  {
    key: 'apiToMcp',
    icon: ArrowLeftRight,
  },
  {
    key: 'orchestration',
    icon: Network,
  },
  {
    key: 'decisionEngine',
    icon: Zap,
  },
  {
    key: 'feedbackLoop',
    icon: RotateCw,
  },
];

const enterpriseSystems = [
  { key: 'crm', Icon: Users },
  { key: 'erp', Icon: Factory },
  { key: 'oa', Icon: ClipboardList },
  { key: 'finance', Icon: DollarSign },
  { key: 'hr', Icon: Briefcase },
  { key: 'service', Icon: Headphones },
  { key: 'bi', Icon: BarChart3 },
  { key: 'supply', Icon: Truck },
];

export default async function TegoOSSection({ locale }: TegoOSSectionProps) {
  const t = await getTranslations({ locale, namespace: 'tegoOS' });

  return (
    <Section id="tego-os" className="bg-white dark:bg-zinc-900 relative overflow-hidden">
      {/* 背景装饰 */}
      <div className="absolute inset-0 bg-grid opacity-20" />
      <div className="absolute top-1/3 -left-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/3 -right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
      
      <Container className="relative z-10">
        <SectionHeader
          title={t('title')}
          subtitle={t('subtitle')}
        />

        {/* 企业痛点 */}
        <div className="mb-16 space-y-8">
          <div className="p-8 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-md hover:shadow-lg transition-all duration-300">
            <div className="flex items-start gap-6">
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-4">
                  {t('problem.title')}
                </h3>
                <p className="text-base text-zinc-600 dark:text-zinc-400 mb-6">
                  {t('problem.description')}
                </p>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-3">
                  {enterpriseSystems.map((system) => {
                    const Icon = system.Icon;
                    return (
                      <div 
                        key={system.key}
                        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700"
                      >
                        <Icon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                        <span className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                          {t(`problem.systems.${system.key}`)}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* 使命卡片 */}
          <div className="p-8 bg-gradient-to-br from-emerald-600 to-teal-600 text-white rounded-2xl border border-emerald-500 dark:border-emerald-700 shadow-md hover:shadow-lg transition-all duration-300">
            <div className="flex items-start gap-6">
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold mb-3">
                  {t('mission.title')}
                </h3>
                <p className="text-base text-white/95 leading-relaxed">
                  {t('mission.description')}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 四大核心技术 */}
        <div className="mb-12">
          <div className="text-center mb-10">
            <h3 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-3">
              {t('technologies.title')}
            </h3>
            <p className="text-base text-zinc-600 dark:text-zinc-400">
              {t('technologies.subtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {technologies.map((tech, index) => {
              const Icon = tech.icon;
              return (
                <div 
                  key={tech.key}
                  className="group relative bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="p-6 space-y-4">
                    {/* 编号 */}
                    <div className="absolute top-4 right-4 text-5xl font-black text-blue-600/10 dark:text-blue-400/10">
                      0{index + 1}
                    </div>
                    
                    {/* 图标 */}
                    <div className="w-12 h-12 rounded-xl bg-blue-600/10 dark:bg-blue-400/10 text-blue-600 dark:text-blue-400 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-7 h-7" />
                    </div>
                    
                    {/* 标题 */}
                    <h4 className="text-lg font-bold text-zinc-900 dark:text-zinc-50">
                      {t(`technologies.${tech.key}.title`)}
                    </h4>
                    
                    {/* 描述 */}
                    <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                      {t(`technologies.${tech.key}.description`)}
                    </p>
                    
                    {/* 特性列表 */}
                    <ul className="space-y-2">
                      {(t.raw(`technologies.${tech.key}.features`) as string[]).map((feature, idx) => (
                        <li key={idx} className="text-sm text-zinc-600 dark:text-zinc-400 flex items-start gap-2">
                          <svg className="w-4 h-4 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </Section>
  );
}

