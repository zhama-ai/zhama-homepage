import { getTranslations } from 'next-intl/server';
import { Container } from './ui/Container';
import { Section } from './ui/Section';
import { 
  Brain, 
  MessageSquare, 
  Target, 
  Zap, 
  Network, 
  GitBranch, 
  Database,
  Share2,
  Clock,
  CheckCircle,
  TrendingUp,
  Shield
} from 'lucide-react';

interface MultiAgentSectionProps {
  locale: string;
}

export default async function MultiAgentSection({ locale }: MultiAgentSectionProps) {
  const t = await getTranslations({ locale, namespace: 'multiAgentSection' });

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

  const coreTechnologies = [
    { key: 'dag', icon: GitBranch },
    { key: 'experience', icon: Database },
    { key: 'a2a', icon: Share2 },
    { key: 'scheduling', icon: Zap },
  ];

  const metrics = [
    { key: 'efficiency', value: '300%+', icon: TrendingUp },
    { key: 'successRate', value: '95%+', icon: CheckCircle },
    { key: 'complexity', value: '10×', icon: Network },
    { key: 'availability', value: '7×24', icon: Clock },
  ];

  const advantages = [
    { key: 'autonomous', icon: Brain },
    { key: 'concurrent', icon: GitBranch },
    { key: 'learning', icon: Database },
    { key: 'secure', icon: Shield },
  ];

  return (
    <Section id="multi-agent" className="bg-zinc-50 dark:bg-zinc-950 relative overflow-hidden">
      {/* 背景装饰 - 使用几何线条 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-px h-40 bg-gradient-to-b from-transparent via-teal-300/40 to-transparent dark:via-teal-700/30" />
        <div className="absolute top-40 left-20 w-32 h-px bg-gradient-to-r from-transparent via-amber-300/40 to-transparent dark:via-amber-700/30" />
        <div className="absolute bottom-32 right-16 w-px h-32 bg-gradient-to-b from-transparent via-emerald-300/40 to-transparent dark:via-emerald-700/30" />
        <div className="absolute bottom-20 right-32 w-24 h-px bg-gradient-to-r from-transparent via-teal-300/40 to-transparent dark:via-teal-700/30" />
        {/* 装饰圆点 */}
        <div className="absolute top-1/4 right-1/4 w-2 h-2 rounded-full bg-teal-400/30 dark:bg-teal-600/20" />
        <div className="absolute bottom-1/3 left-1/3 w-1.5 h-1.5 rounded-full bg-amber-400/30 dark:bg-amber-600/20" />
      </div>

      <Container className="relative z-10">
        {/* 标题区域 */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-100 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700 mb-6">
            <Network className="w-4 h-4 text-teal-600 dark:text-teal-400" />
            <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
              {t('badge')}
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-zinc-50 mb-4">
            {t('title')}
          </h2>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-3xl mx-auto">
            {t('subtitle')}
          </p>
        </div>

        {/* LAMP 框架核心展示 */}
        <div className="mb-20">
          <div className="text-center mb-10">
            <h3 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-2">
              {t('lamp.title')}
            </h3>
            <p className="text-zinc-600 dark:text-zinc-400">
              {t('lamp.subtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {lampModules.map((module, index) => {
              const IconComponent = module.icon;
              return (
                <div 
                  key={module.key}
                  className="group relative"
                >
                  <div className={`relative bg-white dark:bg-zinc-800/50 rounded-2xl p-6 border ${module.borderColor} hover:shadow-lg transition-all duration-300 hover:-translate-y-1 h-full`}>
                    {/* 步骤指示器 */}
                    <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-zinc-900 dark:bg-zinc-100 flex items-center justify-center text-white dark:text-zinc-900 text-sm font-bold shadow-md">
                      {index + 1}
                    </div>
                    
                    <div className={`w-14 h-14 rounded-xl ${module.bgColor} flex items-center justify-center mb-4`}>
                      <IconComponent className={`w-7 h-7 ${module.textColor}`} />
                    </div>
                    
                    <h4 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50 mb-2">
                      {t(`lamp.${module.key}.title`)}
                    </h4>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">
                      {t(`lamp.${module.key}.description`)}
                    </p>
                    <div className="text-xs text-zinc-500 dark:text-zinc-500 italic">
                      {t(`lamp.${module.key}.analogy`)}
                    </div>
                  </div>
                  
                  {/* 连接线 */}
                  {index < lampModules.length - 1 && (
                    <div className="hidden md:flex absolute top-1/2 -right-3 w-6 items-center justify-center">
                      <svg className="w-6 h-6 text-zinc-300 dark:text-zinc-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M5 12h14m-4-4l4 4-4 4" />
                      </svg>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* 核心技术亮点 */}
        <div className="mb-20">
          <div className="text-center mb-10">
            <h3 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-2">
              {t('technologies.title')}
            </h3>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {coreTechnologies.map((tech, index) => {
              const IconComponent = tech.icon;
              const colors = [
                'text-teal-600 dark:text-teal-400 bg-teal-500/10',
                'text-amber-600 dark:text-amber-400 bg-amber-500/10',
                'text-emerald-600 dark:text-emerald-400 bg-emerald-500/10',
                'text-rose-600 dark:text-rose-400 bg-rose-500/10',
              ];
              const [textColor, bgColor] = colors[index].split(' bg-');
              return (
                <div
                  key={tech.key}
                  className="group bg-white dark:bg-zinc-800/30 rounded-xl p-5 border border-zinc-200 dark:border-zinc-700/50 hover:border-zinc-300 dark:hover:border-zinc-600 transition-all duration-300"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`w-10 h-10 rounded-lg bg-${bgColor} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <IconComponent className={`w-5 h-5 ${textColor}`} />
                    </div>
                    <h4 className="font-semibold text-zinc-900 dark:text-zinc-50 text-sm">
                      {t(`technologies.${tech.key}.title`)}
                    </h4>
                  </div>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    {t(`technologies.${tech.key}.description`)}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* 关键指标 */}
        <div className="mb-20">
          <div className="bg-zinc-900 dark:bg-zinc-800 rounded-2xl p-8 md:p-12 text-white relative overflow-hidden">
            {/* 背景装饰 - 几何线条 */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-zinc-700/50 to-transparent" />
              <div className="absolute top-0 left-2/4 w-px h-full bg-gradient-to-b from-transparent via-zinc-700/50 to-transparent" />
              <div className="absolute top-0 left-3/4 w-px h-full bg-gradient-to-b from-transparent via-zinc-700/50 to-transparent" />
            </div>
            
            <div className="relative z-10">
              <h3 className="text-2xl font-bold text-center mb-8">
                {t('metrics.title')}
              </h3>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
                {metrics.map((metric, index) => {
                  const IconComponent = metric.icon;
                  const accentColors = [
                    'text-teal-400',
                    'text-amber-400',
                    'text-emerald-400',
                    'text-rose-400',
                  ];
                  return (
                    <div key={metric.key} className="text-center group">
                      <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-zinc-800 dark:bg-zinc-700 mb-3 group-hover:bg-zinc-700 dark:group-hover:bg-zinc-600 transition-colors duration-300">
                        <IconComponent className={`w-6 h-6 ${accentColors[index]}`} />
                      </div>
                      <div className={`text-3xl md:text-4xl font-bold mb-1 ${accentColors[index]}`}>
                        {metric.value}
                      </div>
                      <div className="text-sm text-zinc-400">
                        {t(`metrics.${metric.key}`)}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* 产品优势对比 */}
        <div className="mb-16">
          <div className="text-center mb-10">
            <h3 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-2">
              {t('advantages.title')}
            </h3>
            <p className="text-zinc-600 dark:text-zinc-400">
              {t('advantages.subtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {advantages.map((advantage, index) => {
              const IconComponent = advantage.icon;
              const colors = [
                { bg: 'bg-teal-500/10', text: 'text-teal-600 dark:text-teal-400' },
                { bg: 'bg-amber-500/10', text: 'text-amber-600 dark:text-amber-400' },
                { bg: 'bg-emerald-500/10', text: 'text-emerald-600 dark:text-emerald-400' },
                { bg: 'bg-rose-500/10', text: 'text-rose-600 dark:text-rose-400' },
              ];
              return (
                <div
                  key={advantage.key}
                  className="bg-white dark:bg-zinc-800/30 rounded-xl p-5 border border-zinc-200 dark:border-zinc-700/50 hover:shadow-md transition-all duration-300"
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-10 h-10 rounded-lg ${colors[index].bg} flex items-center justify-center flex-shrink-0`}>
                      <IconComponent className={`w-5 h-5 ${colors[index].text}`} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-zinc-900 dark:text-zinc-50 mb-1 text-sm">
                        {t(`advantages.${advantage.key}.title`)}
                      </h4>
                      <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                        {t(`advantages.${advantage.key}.description`)}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <div className="inline-flex flex-col sm:flex-row items-center gap-4">
            <a
              href="#download"
              className="px-8 py-3 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 rounded-xl font-medium hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-all duration-300 hover:-translate-y-0.5"
            >
              {t('cta.primary')}
            </a>
            <a
              href={`/${locale}/multi-agent`}
              className="px-8 py-3 border border-zinc-300 dark:border-zinc-600 text-zinc-700 dark:text-zinc-300 rounded-xl font-medium hover:border-zinc-400 dark:hover:border-zinc-500 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-all duration-300"
            >
              {t('cta.secondary')}
            </a>
          </div>
        </div>
      </Container>
    </Section>
  );
}

