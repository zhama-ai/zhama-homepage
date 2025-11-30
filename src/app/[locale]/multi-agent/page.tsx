import { getTranslations } from 'next-intl/server';
import Header from '@/components/Header';
import FooterSection from '@/components/FooterSection';
import {
  Network,
  Brain,
  MessageSquare,
  GitMerge,
  Zap,
  TrendingUp,
  Database,
  RefreshCw,
  CheckCircle,
  ArrowRight
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';
import { Section } from '@/components/ui/Section';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'multiAgent.seo' });

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

export default async function MultiAgentPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'multiAgent' });

  const lampFeatures = [
    {
      icon: Brain,
      key: 'think',
      bgColor: 'bg-teal-600',
      borderColor: 'bg-teal-500',
      iconBg: 'bg-teal-500/10',
      textColor: 'text-teal-600 dark:text-teal-400'
    },
    {
      icon: MessageSquare,
      key: 'speak',
      bgColor: 'bg-amber-600',
      borderColor: 'bg-amber-500',
      iconBg: 'bg-amber-500/10',
      textColor: 'text-amber-600 dark:text-amber-400'
    },
    {
      icon: GitMerge,
      key: 'decide',
      bgColor: 'bg-emerald-600',
      borderColor: 'bg-emerald-500',
      iconBg: 'bg-emerald-500/10',
      textColor: 'text-emerald-600 dark:text-emerald-400'
    }
  ];

  const coreCapabilities = [
    { icon: Zap, key: 'routing', color: 'text-teal-600 dark:text-teal-400', bg: 'bg-teal-500/10' },
    { icon: TrendingUp, key: 'reasoning', color: 'text-amber-600 dark:text-amber-400', bg: 'bg-amber-500/10' },
    { icon: MessageSquare, key: 'communication', color: 'text-emerald-600 dark:text-emerald-400', bg: 'bg-emerald-500/10' },
    { icon: GitMerge, key: 'fusion', color: 'text-rose-600 dark:text-rose-400', bg: 'bg-rose-500/10' },
    { icon: Database, key: 'experience', color: 'text-teal-600 dark:text-teal-400', bg: 'bg-teal-500/10' },
    { icon: RefreshCw, key: 'replanning', color: 'text-amber-600 dark:text-amber-400', bg: 'bg-amber-500/10' }
  ];

  const benefits = [
    { key: 'successRate', value: '15-25%', icon: TrendingUp, color: 'text-teal-600 dark:text-teal-400' },
    { key: 'performance', value: '2-5x', icon: Zap, color: 'text-amber-600 dark:text-amber-400' },
    { key: 'planningTime', value: '40-60%', icon: Database, color: 'text-emerald-600 dark:text-emerald-400' },
    { key: 'concurrency', value: '2-5x', icon: Network, color: 'text-rose-600 dark:text-rose-400' }
  ];

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <Section className="py-16 md:py-24 bg-gradient-to-b from-zinc-50 to-white dark:from-zinc-950 dark:to-zinc-900">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-zinc-100 dark:bg-zinc-800 px-4 py-2 text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-6 border border-zinc-200 dark:border-zinc-700">
            <Network className="h-4 w-4 text-teal-600 dark:text-teal-400" />
            {t('badge')}
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-zinc-900 dark:text-zinc-50 mb-6">
            {t('title')}
          </h1>
          <p className="text-xl text-zinc-600 dark:text-zinc-400 max-w-3xl mx-auto mb-8">
            {t('subtitle')}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <span className="px-4 py-2 rounded-lg bg-teal-50 dark:bg-teal-900/20 text-sm font-medium text-teal-700 dark:text-teal-300 border border-teal-200 dark:border-teal-800">
              {t('tags.patent')}
            </span>
            <span className="px-4 py-2 rounded-lg bg-amber-50 dark:bg-amber-900/20 text-sm font-medium text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
              {t('tags.lamp')}
            </span>
            <span className="px-4 py-2 rounded-lg bg-emerald-50 dark:bg-emerald-900/20 text-sm font-medium text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
              {t('tags.dag')}
            </span>
          </div>
        </div>
      </Section>

      {/* LAMP Framework */}
      <Section className="py-16 bg-white dark:bg-zinc-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-zinc-50 mb-4">
              {t('lamp.title')}
            </h2>
            <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-3xl mx-auto">
              {t('lamp.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {lampFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={feature.key} className="relative bg-white dark:bg-zinc-800/50 rounded-xl p-6 border border-zinc-200 dark:border-zinc-700 hover:shadow-md transition-all duration-300">
                  {/* 步骤编号 */}
                  <div className="absolute -top-3 -left-3 w-7 h-7 rounded-full bg-zinc-900 dark:bg-zinc-100 flex items-center justify-center text-white dark:text-zinc-900 text-xs font-bold">
                    {index + 1}
                  </div>
                  
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`flex h-12 w-12 items-center justify-center rounded-lg ${feature.iconBg}`}>
                      <Icon className={`h-6 w-6 ${feature.textColor}`} />
                    </div>
                    <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-50">
                      {t(`lamp.${feature.key}.title`)}
                    </h3>
                  </div>
                  
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">
                    {t(`lamp.${feature.key}.description`)}
                  </p>
                  
                  <ul className="space-y-2">
                    {[1, 2, 3].map((i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-zinc-600 dark:text-zinc-400">
                        <span className="w-1 h-1 rounded-full bg-zinc-400 dark:bg-zinc-500 flex-shrink-0 mt-2" />
                        <span>{t(`lamp.${feature.key}.features.${i}`)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </Section>

      {/* Core Capabilities */}
      <Section className="py-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-zinc-50 mb-4">
              {t('capabilities.title')}
            </h2>
            <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-3xl mx-auto">
              {t('capabilities.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {coreCapabilities.map((capability) => {
              const Icon = capability.icon;
              return (
                <Card key={capability.key} hover>
                  <CardContent>
                    <div className="flex items-start gap-4">
                      <div className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg ${capability.bg}`}>
                        <Icon className={`h-6 w-6 ${capability.color}`} />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50 mb-2">
                          {t(`capabilities.${capability.key}.title`)}
                        </h3>
                        <p className="text-sm text-zinc-600 dark:text-zinc-400">
                          {t(`capabilities.${capability.key}.description`)}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </Section>

      {/* Benefits & Metrics */}
      <Section className="py-16 bg-zinc-900 dark:bg-zinc-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {t('benefits.title')}
            </h2>
            <p className="text-lg text-zinc-400 max-w-3xl mx-auto">
              {t('benefits.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit) => {
              const Icon = benefit.icon;
              return (
                <div key={benefit.key} className="text-center bg-zinc-800/50 dark:bg-zinc-700/30 rounded-xl p-8 border border-zinc-700 dark:border-zinc-600">
                  <Icon className={`h-12 w-12 ${benefit.color} mx-auto mb-4`} />
                  <div className={`text-4xl font-bold ${benefit.color} mb-2`}>
                    {benefit.value}
                  </div>
                  <div className="text-sm font-medium text-white mb-1">
                    {t(`benefits.metrics.${benefit.key}.label`)}
                  </div>
                  <div className="text-xs text-zinc-400">
                    {t(`benefits.metrics.${benefit.key}.description`)}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Section>

      {/* Technical Architecture */}
      <Section className="py-16 bg-white dark:bg-zinc-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-zinc-50 mb-4">
              {t('architecture.title')}
            </h2>
            <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-3xl mx-auto">
              {t('architecture.subtitle')}
            </p>
          </div>

          <Card>
            <CardContent className="p-8">
              <div className="space-y-6">
                {['taskAnalysis', 'planning', 'scheduling', 'execution', 'experience'].map((stage, index) => {
                  const stageColors = [
                    'bg-teal-100 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400',
                    'bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400',
                    'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400',
                    'bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400',
                    'bg-teal-100 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400',
                  ];
                  return (
                    <div key={stage} className="flex items-start gap-4">
                      <div className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full ${stageColors[index]} font-bold`}>
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <h4 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50 mb-2">
                          {t(`architecture.stages.${stage}.title`)}
                        </h4>
                        <p className="text-sm text-zinc-600 dark:text-zinc-400">
                          {t(`architecture.stages.${stage}.description`)}
                        </p>
                      </div>
                      {index < 4 && (
                        <ArrowRight className="h-6 w-6 text-zinc-400 flex-shrink-0 mt-2" />
                      )}
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </Section>

      {/* CTA Section */}
      <Section className="py-16 bg-zinc-50 dark:bg-zinc-950">
        <div className="max-w-4xl mx-auto text-center">
          <Card className="border border-zinc-200 dark:border-zinc-700 shadow-xl">
            <CardContent className="py-12">
              <div className="mb-6 inline-flex items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-800 px-4 py-2 border border-zinc-200 dark:border-zinc-700">
                <Network className="h-5 w-5 text-teal-600 dark:text-teal-400 mr-2" />
                <span className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                  {t('badge')}
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-zinc-50 mb-4">
                {t('cta.title')}
              </h2>
              <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-8 max-w-2xl mx-auto">
                {t('cta.description')}
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <a
                  href={`/${locale}/contact`}
                  className="inline-flex items-center gap-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-100 dark:hover:bg-zinc-200 px-6 py-3 text-base font-semibold text-white dark:text-zinc-900 shadow-lg transition-all hover:shadow-xl"
                >
                  {t('cta.contact')}
                  <ArrowRight className="h-5 w-5" />
                </a>
                <a
                  href={`/${locale}/technical`}
                  className="inline-flex items-center gap-2 rounded-lg border-2 border-zinc-300 dark:border-zinc-600 px-6 py-3 text-base font-semibold text-zinc-700 dark:text-zinc-300 transition-all hover:bg-zinc-100 dark:hover:bg-zinc-800"
                >
                  {t('cta.learnMore')}
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </Section>
      </main>
      
      <FooterSection locale={locale} />
    </div>
  );
}

