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
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: MessageSquare,
      key: 'speak',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: GitMerge,
      key: 'decide',
      color: 'from-orange-500 to-red-500'
    }
  ];

  const coreCapabilities = [
    { icon: Zap, key: 'routing' },
    { icon: TrendingUp, key: 'reasoning' },
    { icon: MessageSquare, key: 'communication' },
    { icon: GitMerge, key: 'fusion' },
    { icon: Database, key: 'experience' },
    { icon: RefreshCw, key: 'replanning' }
  ];

  const benefits = [
    { key: 'successRate', value: '15-25%', icon: TrendingUp },
    { key: 'performance', value: '2-5x', icon: Zap },
    { key: 'planningTime', value: '40-60%', icon: Database },
    { key: 'concurrency', value: '2-5x', icon: Network }
  ];

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <Section className="py-16 md:py-24 bg-gradient-to-b from-zinc-50 to-white dark:from-zinc-950 dark:to-zinc-900">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary-50 px-4 py-2 text-sm font-medium text-primary-700 dark:bg-primary-900/30 dark:text-primary-400 mb-6">
            <Network className="h-4 w-4" />
            {t('badge')}
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-zinc-900 dark:text-zinc-50 mb-6">
            {t('title')}
          </h1>
          <p className="text-xl text-zinc-600 dark:text-zinc-400 max-w-3xl mx-auto mb-8">
            {t('subtitle')}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <span className="px-4 py-2 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-sm font-medium text-zinc-900 dark:text-zinc-50">
              {t('tags.patent')}
            </span>
            <span className="px-4 py-2 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-sm font-medium text-zinc-900 dark:text-zinc-50">
              {t('tags.lamp')}
            </span>
            <span className="px-4 py-2 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-sm font-medium text-zinc-900 dark:text-zinc-50">
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
            {lampFeatures.map((feature) => {
              const Icon = feature.icon;
              return (
                <Card key={feature.key} hover className="relative overflow-hidden">
                  <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${feature.color}`} />
                  <CardContent className="pt-8">
                    <div className="flex items-center justify-center mb-6">
                      <div className={`flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${feature.color} shadow-lg`}>
                        <Icon className="h-8 w-8 text-white" />
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-50 mb-3 text-center">
                      {t(`lamp.${feature.key}.title`)}
                    </h3>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4 text-center">
                      {t(`lamp.${feature.key}.description`)}
                    </p>
                    <ul className="space-y-2">
                      {[1, 2, 3].map((i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-zinc-600 dark:text-zinc-400">
                          <CheckCircle className="h-4 w-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                          <span>{t(`lamp.${feature.key}.features.${i}`)}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
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
                      <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-primary-50 dark:bg-primary-900/20">
                        <Icon className="h-6 w-6 text-primary-600 dark:text-primary-400" />
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
      <Section className="py-16 bg-gradient-to-br from-primary-50 to-purple-50 dark:from-primary-900/20 dark:to-purple-900/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-zinc-50 mb-4">
              {t('benefits.title')}
            </h2>
            <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-3xl mx-auto">
              {t('benefits.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit) => {
              const Icon = benefit.icon;
              return (
                <Card key={benefit.key} className="text-center">
                  <CardContent className="pt-8">
                    <Icon className="h-12 w-12 text-primary-600 dark:text-primary-400 mx-auto mb-4" />
                    <div className="text-4xl font-bold text-primary-600 dark:text-primary-400 mb-2">
                      {benefit.value}
                    </div>
                    <div className="text-sm font-medium text-zinc-900 dark:text-zinc-50 mb-1">
                      {t(`benefits.metrics.${benefit.key}.label`)}
                    </div>
                    <div className="text-xs text-zinc-600 dark:text-zinc-400">
                      {t(`benefits.metrics.${benefit.key}.description`)}
                    </div>
                  </CardContent>
                </Card>
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
                {['taskAnalysis', 'planning', 'scheduling', 'execution', 'experience'].map((stage, index) => (
                  <div key={stage} className="flex items-start gap-4">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 font-bold">
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
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </Section>

      {/* CTA Section */}
      <Section className="py-16 bg-gradient-to-br from-primary-50 to-purple-50 dark:from-primary-900/20 dark:to-purple-900/20">
        <div className="max-w-4xl mx-auto text-center">
          <Card className="border-2 border-primary-200 dark:border-primary-800 shadow-xl">
            <CardContent className="py-12">
              <div className="mb-6 inline-flex items-center justify-center rounded-full bg-primary-100 dark:bg-primary-900/50 px-4 py-2">
                <Network className="h-5 w-5 text-primary-600 dark:text-primary-400 mr-2" />
                <span className="text-sm font-semibold text-primary-700 dark:text-primary-300">
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
                  className="inline-flex items-center gap-2 rounded-lg bg-primary-600 hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600 px-6 py-3 text-base font-semibold text-white shadow-lg transition-all hover:shadow-xl"
                >
                  {t('cta.contact')}
                  <ArrowRight className="h-5 w-5" />
                </a>
                <a
                  href={`/${locale}/technical`}
                  className="inline-flex items-center gap-2 rounded-lg border-2 border-primary-600 dark:border-primary-500 px-6 py-3 text-base font-semibold text-primary-600 dark:text-primary-400 transition-all hover:bg-primary-50 dark:hover:bg-primary-900/30"
                >
                  {t('cta.learnMore')}
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </Section>
      </main>
      
      <FooterSection />
    </div>
  );
}

