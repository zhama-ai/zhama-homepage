import { getTranslations } from 'next-intl/server';
import { Container } from './ui/Container';
import { Section, SectionHeader } from './ui/Section';
import { 
  Users,
  Zap,
  Brain,
  Shield,
  TrendingUp,
  CheckCircle
} from 'lucide-react';

interface TegoOSSectionProps {
  locale: string;
}

export default async function TegoOSSection({ locale }: TegoOSSectionProps) {
  const t = await getTranslations({ locale, namespace: 'whyTego' });

  const advantages = [
    {
      key: 'collaboration',
      icon: Users,
      bgColor: 'bg-primary-500/10',
      textColor: 'text-primary-600 dark:text-primary-400',
    },
    {
      key: 'efficiency',
      icon: Zap,
      bgColor: 'bg-amber-500/10',
      textColor: 'text-amber-600 dark:text-amber-400',
    },
    {
      key: 'intelligence',
      icon: Brain,
      bgColor: 'bg-teal-500/10',
      textColor: 'text-teal-600 dark:text-teal-400',
    },
    {
      key: 'security',
      icon: Shield,
      bgColor: 'bg-emerald-500/10',
      textColor: 'text-emerald-600 dark:text-emerald-400',
    },
  ];

  const metrics = [
    {
      value: '300%+',
      label: t('metrics.efficiency'),
      icon: TrendingUp,
    },
    {
      value: '95%+',
      label: t('metrics.successRate'),
      icon: CheckCircle,
    },
    {
      value: '<100ms',
      label: t('metrics.response'),
      icon: Zap,
    },
  ];

  return (
    <Section id="why-tego" className="bg-white dark:bg-zinc-900 relative overflow-hidden">
      {/* 背景装饰 */}
      <div className="absolute inset-0 bg-grid opacity-20" />
      <div className="absolute top-1/3 -left-20 w-96 h-96 bg-primary-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/3 -right-20 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl" />
      
      <Container className="relative z-10">
        <SectionHeader
          title={t('title')}
          subtitle={t('subtitle')}
        />

        {/* 核心指标 */}
        <div className="grid grid-cols-3 gap-4 mb-16 max-w-3xl mx-auto">
          {metrics.map((metric, index) => {
            const IconComponent = metric.icon;
            const colors = [
              'text-primary-600 dark:text-primary-400',
              'text-teal-600 dark:text-teal-400',
              'text-amber-600 dark:text-amber-400',
            ];
            return (
              <div
                key={index}
                className="bg-zinc-50 dark:bg-zinc-800/50 rounded-xl p-6 text-center border border-zinc-100 dark:border-zinc-700/50"
              >
                <div className={`text-3xl md:text-4xl font-bold ${colors[index]} mb-2`}>
                  {metric.value}
                </div>
                <div className="text-sm text-zinc-600 dark:text-zinc-400">
                  {metric.label}
                </div>
              </div>
            );
          })}
        </div>

        {/* 四大优势 */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {advantages.map((advantage, index) => {
            const IconComponent = advantage.icon;
            return (
              <div 
                key={advantage.key}
                className="group bg-zinc-50 dark:bg-zinc-800/50 rounded-2xl p-6 border border-zinc-100 dark:border-zinc-700/50 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              >
                {/* 编号 */}
                <div className="text-4xl font-black text-zinc-100 dark:text-zinc-800 mb-3">
                  0{index + 1}
                </div>
                
                {/* 图标 */}
                <div className={`w-12 h-12 rounded-xl ${advantage.bgColor} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <IconComponent className={`w-6 h-6 ${advantage.textColor}`} />
                </div>
                
                {/* 标题 */}
                <h4 className="text-lg font-bold text-zinc-900 dark:text-zinc-50 mb-2">
                  {t(`advantages.${advantage.key}.title`)}
                </h4>
                
                {/* 描述 */}
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  {t(`advantages.${advantage.key}.description`)}
                </p>
              </div>
            );
          })}
        </div>

        {/* 底部说明 */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-100 dark:bg-zinc-800 text-sm text-zinc-600 dark:text-zinc-400">
            <CheckCircle className="w-4 h-4 text-emerald-500" />
            <span>{t('footer.text')}</span>
          </div>
        </div>
      </Container>
    </Section>
  );
}
