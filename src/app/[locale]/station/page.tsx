import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/Header';
import FooterSection from '@/components/FooterSection';
import { Container } from '@/components/ui/Container';
import { SectionHead } from '@/components/ui/Section';
import {
  ArrowRight,
  Bot,
  Check,
  Cpu,
  Fingerprint,
  HardDrive,
  Lock,
  Network,
  Plug,
  Shield,
  Sparkles,
  Users,
  Workflow,
  Zap,
} from 'lucide-react';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'station.seo' });

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

export default async function StationPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'station' });

  const sellingPoints = [
    { key: 'avatar', icon: Bot },
    { key: 'automation', icon: Workflow },
    { key: 'privacy', icon: Lock },
    { key: 'scale', icon: Users },
  ] as const;

  const painPoints = [
    { key: 'identity', icon: Fingerprint },
    { key: 'data', icon: Shield },
    { key: 'scale', icon: Network },
    { key: 'asset', icon: HardDrive },
  ] as const;

  const layers = [
    { key: 'business', step: '01' },
    { key: 'capability', step: '02' },
    { key: 'system', step: '03' },
    { key: 'hardware', step: '04' },
  ] as const;

  const scenarios = ['finance', 'legal', 'support', 'it', 'hr', 'ops'] as const;

  const security = [
    { key: 'local', icon: Lock },
    { key: 'rbac', icon: Fingerprint },
    { key: 'approval', icon: Check },
    { key: 'audit', icon: Shield },
    { key: 'guardrail', icon: Sparkles },
    { key: 'isolation', icon: Users },
  ] as const;

  const specs = [
    { key: 'form', icon: HardDrive },
    { key: 'cpu', icon: Cpu },
    { key: 'network', icon: Network },
    { key: 'power', icon: Zap },
  ] as const;

  const deliverySteps = ['power', 'network', 'login', 'pilot', 'scale'] as const;

  const includes = t.raw('pricing.includes') as string[];

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <Header />

      <main className="pt-20">
        {/* Hero */}
        <section className="relative overflow-hidden bg-white py-16 dark:bg-zinc-900 md:py-24">
          <div className="absolute inset-0 bg-grid opacity-20" />
          <Container className="relative z-10">
            <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
              <div>
                <span className="inline-flex items-center gap-2 rounded-md border border-primary-200 bg-primary-50 px-3.5 py-1.5 text-xs font-semibold text-primary-800 dark:border-primary-800 dark:bg-primary-950/40 dark:text-primary-200">
                  <Plug className="h-3.5 w-3.5" />
                  {t('badge')}
                </span>
                <h1 className="mt-5 text-4xl font-bold tracking-normal text-zinc-950 dark:text-white md:text-5xl">
                  {t('title')}
                </h1>
                <p className="mt-4 max-w-xl text-lg leading-8 text-zinc-600 dark:text-zinc-400">
                  {t('subtitle')}
                </p>
                <p className="mt-3 max-w-xl text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  {t('tagline')}
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link
                    href={`/${locale}/contact`}
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary-700 px-6 py-3 text-base font-semibold text-white shadow-md shadow-primary-950/10 transition-all duration-300 hover:bg-primary-800 hover:shadow-lg active:scale-95"
                  >
                    {t('cta.primary')}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <a
                    href="#pricing"
                    className="inline-flex items-center justify-center gap-2 rounded-lg border border-zinc-300 bg-white px-6 py-3 text-base font-semibold text-zinc-900 transition-all duration-300 hover:bg-zinc-50 active:scale-95 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50 dark:hover:bg-zinc-800"
                  >
                    {t('cta.secondary')}
                  </a>
                </div>
                <div className="mt-8 flex flex-wrap gap-2">
                  {(['ready', 'private', 'local'] as const).map((key) => (
                    <span
                      key={key}
                      className="rounded-md border border-zinc-200 bg-zinc-50 px-3 py-1.5 text-xs font-medium text-zinc-700 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
                    >
                      {t(`promises.${key}`)}
                    </span>
                  ))}
                </div>
              </div>

              <div className="relative overflow-hidden rounded-lg border border-zinc-200 bg-zinc-100 shadow-lg dark:border-zinc-700 dark:bg-zinc-800">
                <Image
                  src="/images/station/hero.png"
                  alt={t('heroImageAlt')}
                  width={1200}
                  height={900}
                  className="h-auto w-full object-cover"
                  priority
                />
              </div>
            </div>
          </Container>
        </section>

        {/* Selling points */}
        <section className="bg-zinc-50 py-16 dark:bg-zinc-950 md:py-24">
          <Container>
            <SectionHead title={t('sellingPoints.title')} lead={t('sellingPoints.subtitle')} center />
            <div className="grid gap-px overflow-hidden rounded-lg border border-zinc-200 bg-zinc-200 dark:border-white/10 dark:bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
              {sellingPoints.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.key}
                    className="bg-white p-6 transition-colors hover:bg-zinc-50 dark:bg-[#07131f] dark:hover:bg-white/5"
                  >
                    <Icon className="h-6 w-6 text-primary-700 dark:text-primary-200" />
                    <h3 className="mt-4 text-lg font-semibold text-zinc-950 dark:text-white">
                      {t(`sellingPoints.items.${item.key}.title`)}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                      {t(`sellingPoints.items.${item.key}.description`)}
                    </p>
                  </div>
                );
              })}
            </div>
          </Container>
        </section>

        {/* Pain points */}
        <section className="bg-white py-16 dark:bg-zinc-900 md:py-24">
          <Container>
            <SectionHead title={t('painPoints.title')} lead={t('painPoints.subtitle')} center />
            <div className="grid gap-4 md:grid-cols-2">
              {painPoints.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.key}
                    className="rounded-lg border border-zinc-200 bg-zinc-50 p-6 dark:border-zinc-800 dark:bg-zinc-950"
                  >
                    <div className="flex items-start gap-4">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-50 text-primary-700 dark:bg-primary-950/60 dark:text-primary-200">
                        <Icon className="h-5 w-5" />
                      </span>
                      <div>
                        <h3 className="text-lg font-semibold text-zinc-950 dark:text-white">
                          {t(`painPoints.items.${item.key}.title`)}
                        </h3>
                        <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                          {t(`painPoints.items.${item.key}.problem`)}
                        </p>
                        <p className="mt-3 text-sm font-medium text-primary-700 dark:text-primary-200">
                          {t(`painPoints.items.${item.key}.answer`)}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </Container>
        </section>

        {/* Four layers */}
        <section className="bg-zinc-50 py-16 dark:bg-zinc-950 md:py-24">
          <Container>
            <SectionHead title={t('layers.title')} lead={t('layers.subtitle')} center />
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {layers.map((layer) => (
                <div
                  key={layer.key}
                  className="rounded-lg border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
                >
                  <span className="text-xs font-semibold tracking-wider text-primary-700 dark:text-primary-200">
                    {layer.step}
                  </span>
                  <h3 className="mt-3 text-lg font-semibold text-zinc-950 dark:text-white">
                    {t(`layers.items.${layer.key}.title`)}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                    {t(`layers.items.${layer.key}.description`)}
                  </p>
                  <p className="mt-3 text-sm font-medium text-zinc-800 dark:text-zinc-200">
                    {t(`layers.items.${layer.key}.value`)}
                  </p>
                </div>
              ))}
            </div>
            <p className="mt-8 text-center text-sm text-zinc-600 dark:text-zinc-400">
              {t('layers.flow')}
            </p>
          </Container>
        </section>

        {/* Scenarios */}
        <section className="bg-white py-16 dark:bg-zinc-900 md:py-24">
          <Container>
            <SectionHead title={t('scenarios.title')} lead={t('scenarios.subtitle')} center />
            <div className="overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-800">
              <div className="hidden grid-cols-[1fr_1.2fr_1.2fr] bg-zinc-100 text-sm font-semibold text-zinc-700 dark:bg-zinc-800 dark:text-zinc-200 md:grid">
                <div className="px-5 py-3">{t('scenarios.columns.role')}</div>
                <div className="px-5 py-3">{t('scenarios.columns.before')}</div>
                <div className="px-5 py-3">{t('scenarios.columns.after')}</div>
              </div>
              {scenarios.map((key) => (
                <div
                  key={key}
                  className="grid gap-3 border-t border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-950 md:grid-cols-[1fr_1.2fr_1.2fr] md:gap-0 md:p-0"
                >
                  <div className="md:px-5 md:py-4">
                    <p className="text-sm font-semibold text-zinc-950 dark:text-white">
                      {t(`scenarios.items.${key}.role`)}
                    </p>
                    <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                      {t(`scenarios.items.${key}.example`)}
                    </p>
                  </div>
                  <div className="text-sm leading-6 text-zinc-600 dark:text-zinc-400 md:border-l md:border-zinc-200 md:px-5 md:py-4 dark:md:border-zinc-800">
                    <span className="mb-1 block text-xs font-semibold text-zinc-400 md:hidden">
                      {t('scenarios.columns.before')}
                    </span>
                    {t(`scenarios.items.${key}.before`)}
                  </div>
                  <div className="text-sm leading-6 text-zinc-700 dark:text-zinc-300 md:border-l md:border-zinc-200 md:px-5 md:py-4 dark:md:border-zinc-800">
                    <span className="mb-1 block text-xs font-semibold text-primary-700 dark:text-primary-200 md:hidden">
                      {t('scenarios.columns.after')}
                    </span>
                    {t(`scenarios.items.${key}.after`)}
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* Security */}
        <section className="bg-zinc-50 py-16 dark:bg-zinc-950 md:py-24">
          <Container>
            <SectionHead title={t('security.title')} lead={t('security.subtitle')} center />
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {security.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.key}
                    className="rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900"
                  >
                    <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-50 text-primary-700 dark:bg-primary-950/60 dark:text-primary-200">
                      <Icon className="h-5 w-5" />
                    </span>
                    <h3 className="mt-4 text-base font-semibold text-zinc-950 dark:text-white">
                      {t(`security.items.${item.key}.title`)}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                      {t(`security.items.${item.key}.description`)}
                    </p>
                  </div>
                );
              })}
            </div>
          </Container>
        </section>

        {/* Specs & delivery */}
        <section className="bg-white py-16 dark:bg-zinc-900 md:py-24">
          <Container>
            <div className="grid gap-12 lg:grid-cols-2">
              <div>
                <SectionHead title={t('specs.title')} lead={t('specs.subtitle')} />
                <div className="space-y-4">
                  {specs.map((item) => {
                    const Icon = item.icon;
                    return (
                      <div
                        key={item.key}
                        className="flex items-start gap-4 rounded-lg border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-950"
                      >
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-50 text-primary-700 dark:bg-primary-950/60 dark:text-primary-200">
                          <Icon className="h-5 w-5" />
                        </span>
                        <div>
                          <p className="text-sm font-semibold text-zinc-950 dark:text-white">
                            {t(`specs.items.${item.key}.label`)}
                          </p>
                          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                            {t(`specs.items.${item.key}.value`)}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <p className="mt-4 text-xs text-zinc-500 dark:text-zinc-400">{t('specs.note')}</p>
              </div>

              <div>
                <SectionHead title={t('delivery.title')} lead={t('delivery.subtitle')} />
                <ol className="space-y-4">
                  {deliverySteps.map((key, index) => (
                    <li
                      key={key}
                      className="flex items-start gap-4 rounded-lg border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-950"
                    >
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-zinc-900 text-sm font-bold text-white dark:bg-zinc-100 dark:text-zinc-900">
                        {index + 1}
                      </span>
                      <div>
                        <p className="text-sm font-semibold text-zinc-950 dark:text-white">
                          {t(`delivery.steps.${key}.title`)}
                        </p>
                        <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                          {t(`delivery.steps.${key}.description`)}
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </Container>
        </section>

        {/* Pricing */}
        <section id="pricing" className="bg-zinc-50 py-16 dark:bg-zinc-950 md:py-24">
          <Container>
            <SectionHead title={t('pricing.title')} lead={t('pricing.subtitle')} center />
            <div className="mx-auto max-w-2xl overflow-hidden rounded-lg border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
              <div className="border-b border-zinc-200 bg-primary-50/60 px-6 py-5 dark:border-zinc-800 dark:bg-primary-950/30 sm:px-8">
                <p className="text-sm font-semibold text-primary-800 dark:text-primary-200">
                  {t('pricing.sku')}
                </p>
                <div className="mt-3 flex flex-wrap items-end gap-2">
                  <span className="text-4xl font-bold text-zinc-950 dark:text-white">
                    {t('pricing.price')}
                  </span>
                  <span className="pb-1 text-sm text-zinc-600 dark:text-zinc-400">
                    {t('pricing.period')}
                  </span>
                </div>
                <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                  {t('pricing.extra')}
                </p>
              </div>
              <div className="px-6 py-6 sm:px-8">
                <p className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">
                  {t('pricing.includesTitle')}
                </p>
                <ul className="mt-4 space-y-3">
                  {includes.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-zinc-700 dark:text-zinc-300">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent-600 dark:text-accent-300" strokeWidth={2.5} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link
                    href={`/${locale}/contact`}
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary-700 px-6 py-3 text-base font-semibold text-white shadow-md transition-all hover:bg-primary-800"
                  >
                    {t('pricing.cta')}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
                <p className="mt-4 text-xs text-zinc-500 dark:text-zinc-400">{t('pricing.note')}</p>
              </div>
            </div>
          </Container>
        </section>

        {/* Bottom CTA */}
        <section className="border-t border-zinc-200 bg-white py-16 dark:border-white/10 dark:bg-zinc-900 md:py-24">
          <Container>
            <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <p className="text-sm font-semibold text-primary-700 dark:text-primary-200">
                  TeGo Station
                </p>
                <h2 className="mt-3 max-w-3xl text-3xl font-bold text-zinc-950 dark:text-white md:text-4xl">
                  {t('bottomCta.title')}
                </h2>
                <p className="mt-4 max-w-2xl text-lg leading-8 text-zinc-600 dark:text-zinc-400">
                  {t('bottomCta.description')}
                </p>
              </div>
              <Link
                href={`/${locale}/contact`}
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg bg-primary-700 px-6 py-3 text-base font-semibold text-white shadow-md transition-all hover:bg-primary-800"
              >
                {t('bottomCta.cta')}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </Container>
        </section>
      </main>

      <FooterSection locale={locale} />
    </div>
  );
}
