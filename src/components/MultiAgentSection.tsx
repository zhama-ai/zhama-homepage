import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import { Container } from './ui/Container';
import { Section } from './ui/Section';
import { 
  Brain, 
  MessageSquare, 
  Target, 
  Network,
  ArrowRight
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

  return (
    <Section id="multi-agent" className="bg-white dark:bg-zinc-900 relative overflow-hidden">
      {/* 背景装饰 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-px h-40 bg-gradient-to-b from-transparent via-teal-300/40 to-transparent dark:via-teal-700/30" />
        <div className="absolute bottom-32 right-16 w-px h-32 bg-gradient-to-b from-transparent via-emerald-300/40 to-transparent dark:via-emerald-700/30" />
      </div>

      <Container className="relative z-10">
        {/* 标题区域 */}
        <div className="text-center mb-12">
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

        {/* LAMP 框架简化展示 */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-50 mb-2">
              {t('lamp.title')}
            </h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              {t('lamp.subtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {lampModules.map((module, index) => {
              const IconComponent = module.icon;
              return (
                <div 
                  key={module.key}
                  className="group relative"
                >
                  <div className={`relative bg-zinc-50 dark:bg-zinc-800/50 rounded-2xl p-6 border ${module.borderColor} hover:shadow-lg transition-all duration-300 hover:-translate-y-1 h-full`}>
                    {/* 步骤指示器 */}
                    <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-zinc-900 dark:bg-zinc-100 flex items-center justify-center text-white dark:text-zinc-900 text-sm font-bold shadow-md">
                      {index + 1}
                    </div>
                    
                    <div className={`w-12 h-12 rounded-xl ${module.bgColor} flex items-center justify-center mb-4`}>
                      <IconComponent className={`w-6 h-6 ${module.textColor}`} />
                    </div>
                    
                    <h4 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50 mb-2">
                      {t(`lamp.${module.key}.title`)}
                    </h4>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-3">
                      {t(`lamp.${module.key}.description`)}
                    </p>
                    <div className="text-xs text-zinc-500 dark:text-zinc-500 italic">
                      {t(`lamp.${module.key}.analogy`)}
                    </div>
                  </div>
                  
                  {/* 连接线 */}
                  {index < lampModules.length - 1 && (
                    <div className="hidden md:flex absolute top-1/2 -right-3 w-6 items-center justify-center">
                      <ArrowRight className="w-5 h-5 text-zinc-300 dark:text-zinc-600" />
                    </div>
                  )}
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
            <Link
              href={`/${locale}/technical`}
              className="px-8 py-3 border border-zinc-300 dark:border-zinc-600 text-zinc-700 dark:text-zinc-300 rounded-xl font-medium hover:border-zinc-400 dark:hover:border-zinc-500 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-all duration-300"
            >
              {t('cta.secondary')}
            </Link>
          </div>
        </div>
      </Container>
    </Section>
  );
}
