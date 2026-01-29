import { getTranslations } from 'next-intl/server';
import { Container } from './ui/Container';
import { Section, SectionHeader } from './ui/Section';
import { 
  Users, 
  Building2, 
  Landmark,
  Factory,
  Building
} from 'lucide-react';

interface AdvantagesSectionProps {
  locale: string;
}

const industries = [
  {
    key: 'enterprise',
    icon: Users,
    bgColor: 'bg-teal-500/10',
    textColor: 'text-teal-600 dark:text-teal-400',
    borderColor: 'border-teal-200 dark:border-teal-800/50',
    iconBg: 'bg-teal-500',
  },
  {
    key: 'government',
    icon: Building2,
    bgColor: 'bg-sky-500/10',
    textColor: 'text-sky-600 dark:text-sky-400',
    borderColor: 'border-sky-200 dark:border-sky-800/50',
    iconBg: 'bg-sky-500',
  },
  {
    key: 'finance',
    icon: Landmark,
    bgColor: 'bg-amber-500/10',
    textColor: 'text-amber-600 dark:text-amber-400',
    borderColor: 'border-amber-200 dark:border-amber-800/50',
    iconBg: 'bg-amber-500',
  },
  {
    key: 'manufacturing',
    icon: Factory,
    bgColor: 'bg-emerald-500/10',
    textColor: 'text-emerald-600 dark:text-emerald-400',
    borderColor: 'border-emerald-200 dark:border-emerald-800/50',
    iconBg: 'bg-emerald-500',
  },
  {
    key: 'stateOwned',
    icon: Building,
    bgColor: 'bg-purple-500/10',
    textColor: 'text-purple-600 dark:text-purple-400',
    borderColor: 'border-purple-200 dark:border-purple-800/50',
    iconBg: 'bg-purple-500',
  },
];

export default async function AdvantagesSection({ locale }: AdvantagesSectionProps) {
  const t = await getTranslations({ locale, namespace: 'useCases' });

  return (
    <Section id="use-cases" className="bg-zinc-50 dark:bg-zinc-950 relative overflow-hidden">
      {/* 背景装饰 */}
      <div className="absolute inset-0 bg-grid opacity-20" />
      <div className="absolute top-1/4 left-10 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-10 w-80 h-80 bg-amber-400/5 rounded-full blur-3xl" />
      
      <Container className="relative z-10">
        <SectionHeader
          title={t('title')}
          subtitle={t('subtitle')}
        />

        {/* 行业应用 - 前三个大卡片 */}
        <div className="grid md:grid-cols-3 gap-6 mb-6">
          {industries.slice(0, 3).map((industry) => {
            const IconComponent = industry.icon;
            return (
              <div 
                key={industry.key}
                className={`group bg-white dark:bg-zinc-900 rounded-2xl p-6 border ${industry.borderColor} hover:shadow-lg transition-all duration-300 hover:-translate-y-1`}
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className={`w-12 h-12 rounded-full ${industry.iconBg} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="text-lg font-bold text-zinc-900 dark:text-zinc-50 pt-2">
                    {t(`industries.${industry.key}.title`)}
                  </h4>
                </div>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  {t(`industries.${industry.key}.description`)}
                </p>
              </div>
            );
          })}
        </div>

        {/* 后两个卡片 */}
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {industries.slice(3).map((industry) => {
            const IconComponent = industry.icon;
            return (
              <div 
                key={industry.key}
                className={`group bg-white dark:bg-zinc-900 rounded-2xl p-6 border ${industry.borderColor} hover:shadow-lg transition-all duration-300 hover:-translate-y-1`}
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className={`w-12 h-12 rounded-full ${industry.iconBg} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="text-lg font-bold text-zinc-900 dark:text-zinc-50 pt-2">
                    {t(`industries.${industry.key}.title`)}
                  </h4>
                </div>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  {t(`industries.${industry.key}.description`)}
                </p>
              </div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
