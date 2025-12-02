import { getTranslations } from 'next-intl/server';
import { Container } from './ui/Container';
import { Section, SectionHeader } from './ui/Section';
import { Plane, Rocket, Headphones, Clock, CheckCircle, TrendingUp } from 'lucide-react';

interface AdvantagesSectionProps {
  locale: string;
}

const scenarios = [
  {
    key: 'professional',
    icon: Plane,
    bgColor: 'bg-teal-500/10',
    textColor: 'text-teal-600 dark:text-teal-400',
    borderColor: 'border-teal-200 dark:border-teal-800/50',
    metric: '5分钟',
    metricLabel: '完成',
    metricEn: '5 min',
    metricLabelEn: 'completion',
  },
  {
    key: 'personal',
    icon: Rocket,
    bgColor: 'bg-amber-500/10',
    textColor: 'text-amber-600 dark:text-amber-400',
    borderColor: 'border-amber-200 dark:border-amber-800/50',
    metric: '30分钟',
    metricLabel: '启动',
    metricEn: '30 min',
    metricLabelEn: 'kickoff',
  },
  {
    key: 'enterprise',
    icon: Headphones,
    bgColor: 'bg-emerald-500/10',
    textColor: 'text-emerald-600 dark:text-emerald-400',
    borderColor: 'border-emerald-200 dark:border-emerald-800/50',
    metric: '分钟级',
    metricLabel: '响应',
    metricEn: 'Minutes',
    metricLabelEn: 'response',
  },
];

const valueMetrics = [
  {
    icon: TrendingUp,
    value: '300%+',
    label: '执行效率提升',
    labelEn: 'Efficiency Boost',
    bgColor: 'bg-teal-500/10',
    textColor: 'text-teal-600 dark:text-teal-400',
  },
  {
    icon: CheckCircle,
    value: '95%+',
    label: '任务成功率',
    labelEn: 'Success Rate',
    bgColor: 'bg-amber-500/10',
    textColor: 'text-amber-600 dark:text-amber-400',
  },
  {
    icon: Clock,
    value: '7×24',
    label: '全天候服务',
    labelEn: '24/7 Service',
    bgColor: 'bg-emerald-500/10',
    textColor: 'text-emerald-600 dark:text-emerald-400',
  },
];

export default async function AdvantagesSection({ locale }: AdvantagesSectionProps) {
  const t = await getTranslations({ locale, namespace: 'advantagesSection' });
  const isZh = locale === 'zh';

  return (
    <Section id="advantages" className="bg-white dark:bg-zinc-900 relative overflow-hidden">
      {/* 背景装饰 */}
      <div className="absolute inset-0 bg-grid opacity-20" />
      <div className="absolute top-1/4 left-10 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-10 w-80 h-80 bg-amber-400/5 rounded-full blur-3xl" />
      
      <Container className="relative z-10">
        <SectionHeader
          title={t('title')}
          subtitle={t('subtitle')}
        />

        {/* 关键价值指标 */}
        <div className="grid grid-cols-3 gap-4 mb-16">
          {valueMetrics.map((metric, index) => {
            const IconComponent = metric.icon;
            return (
              <div
                key={index}
                className="bg-zinc-50 dark:bg-zinc-800/50 rounded-xl p-6 text-center border border-zinc-100 dark:border-zinc-700/50"
              >
                <div className={`w-12 h-12 rounded-xl ${metric.bgColor} flex items-center justify-center mx-auto mb-3`}>
                  <IconComponent className={`w-6 h-6 ${metric.textColor}`} />
                </div>
                <div className={`text-2xl md:text-3xl font-bold ${metric.textColor} mb-1`}>
                  {metric.value}
                </div>
                <div className="text-sm text-zinc-600 dark:text-zinc-400">
                  {isZh ? metric.label : metric.labelEn}
                </div>
              </div>
            );
          })}
        </div>

        {/* 适用场景 */}
        <div className="space-y-10">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
              {t('scenarios.title')}
            </h3>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {scenarios.map((scenario) => {
              const IconComponent = scenario.icon;
              return (
                <div 
                  key={scenario.key}
                  className={`group bg-white dark:bg-zinc-800/50 rounded-2xl p-6 border ${scenario.borderColor} hover:shadow-lg transition-all duration-300 hover:-translate-y-1`}
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className={`w-14 h-14 rounded-xl ${scenario.bgColor} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                      <IconComponent className={`w-7 h-7 ${scenario.textColor}`} />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50 mb-1">
                        {t(`scenarios.${scenario.key}.title`)}
                      </h4>
                      <div className="flex items-center gap-2">
                        <span className={`text-xl font-bold ${scenario.textColor}`}>
                          {isZh ? scenario.metric : scenario.metricEn}
                        </span>
                        <span className="text-sm text-zinc-500 dark:text-zinc-500">
                          {isZh ? scenario.metricLabel : scenario.metricLabelEn}
                        </span>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    {t(`scenarios.${scenario.key}.description`)}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* 更多行业场景提示 */}
        <div className="mt-12 text-center">
          <div className="inline-flex flex-wrap justify-center gap-3 text-sm text-zinc-500 dark:text-zinc-500">
            <span className="px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800">{isZh ? '制造业' : 'Manufacturing'}</span>
            <span className="px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800">{isZh ? '金融' : 'Finance'}</span>
            <span className="px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800">{isZh ? '零售' : 'Retail'}</span>
            <span className="px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800">{isZh ? '医疗' : 'Healthcare'}</span>
            <span className="px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800">{isZh ? '教育' : 'Education'}</span>
            <span className="px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800">{isZh ? '更多场景...' : 'More...'}</span>
          </div>
        </div>
      </Container>
    </Section>
  );
}
