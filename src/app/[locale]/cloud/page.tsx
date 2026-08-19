import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import {
  ArrowRight,
  BarChart3,
  Check,
  Cloud,
  FileSearch,
  FileText,
  Gavel,
  Globe2,
  Layers,
  Presentation,
  ShieldCheck,
  Sparkles,
  Users,
} from 'lucide-react';
import Header from '@/components/Header';
import FooterSection from '@/components/FooterSection';
import CloudLink from '@/components/CloudLink';
import { Container } from '@/components/ui/Container';
import { SectionHead } from '@/components/ui/Section';
import { localizedAlternates, localizedOpenGraph } from '@/lib/seo';

type Props = {
  params: Promise<{ locale: string }>;
};

type Employee = {
  title: string;
  description: string;
  output: string;
};

type Plan = {
  key: string;
  name: string;
  tagline: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  cta: string;
};

type ComparisonRow = {
  label: string;
  cloud: string;
  enterprise: string;
};

type FaqItem = {
  question: string;
  answer: string;
};

type ExpertFamily = {
  name: string;
  count: string;
  roles: string[];
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'cloud.seo' });

  return {
    title: t('title'),
    description: t('description'),
    keywords: t('keywords'),
    alternates: localizedAlternates(locale, '/cloud'),
    openGraph: {
      title: t('openGraph.title'),
      description: t('openGraph.description'),
      type: 'website',
      ...localizedOpenGraph(locale, '/cloud'),
    },
  };
}

export default async function CloudPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'cloud' });
  const employees = t.raw('employees.items') as Employee[];
  const expertFamilies = t.raw('experts.families') as ExpertFamily[];
  const plans = t.raw('pricing.plans') as Plan[];
  const comparisonRows = t.raw('comparison.rows') as ComparisonRow[];
  const faqItems = t.raw('faq.items') as FaqItem[];
  const employeeIcons = [Presentation, Gavel, FileText, BarChart3, FileSearch] as const;

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <Header />

      <main className="pt-16 lg:pt-20">
        <section className="relative overflow-hidden border-b border-zinc-200 bg-[#f8faff] py-16 dark:border-white/10 dark:bg-[#07131f] md:py-24">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_20%,rgba(79,70,229,0.14),transparent_32%),radial-gradient(circle_at_12%_85%,rgba(14,165,233,0.12),transparent_28%)]" />
          <Container className="relative z-10">
            <div className="mx-auto max-w-4xl text-center">
              <span className="inline-flex items-center gap-2 rounded-full border border-primary-200 bg-white/80 px-4 py-2 text-xs font-semibold text-primary-800 shadow-sm backdrop-blur dark:border-primary-800 dark:bg-white/10 dark:text-primary-100">
                <span className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_0_4px_rgba(16,185,129,0.12)]" />
                {t('hero.badge')}
              </span>
              <h1 className="mt-7 text-4xl font-bold leading-[1.05] tracking-tight text-zinc-950 dark:text-white sm:text-5xl lg:text-6xl">
                {t('hero.title')}
              </h1>
              <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-zinc-600 dark:text-zinc-300">
                {t('hero.subtitle')}
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <CloudLink
                  medium="cloud_page"
                  locale={locale}
                  className="inline-flex items-center gap-2 rounded-lg bg-primary-700 px-6 py-3 text-base font-semibold text-white shadow-lg shadow-primary-900/15 transition-all hover:-translate-y-0.5 hover:bg-primary-800"
                >
                  {t('hero.primaryCta')}
                  <ArrowRight className="h-4 w-4" />
                </CloudLink>
                <a
                  href="#compare"
                  className="inline-flex items-center rounded-lg border border-zinc-300 bg-white px-6 py-3 text-base font-semibold text-zinc-900 transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white dark:hover:bg-zinc-800"
                >
                  {t('hero.secondaryCta')}
                </a>
              </div>
              <p className="mt-4 text-xs font-medium text-zinc-500 dark:text-zinc-400">{t('hero.trust')}</p>
            </div>

            <div className="mx-auto mt-12 max-w-5xl rounded-2xl border border-zinc-200/80 bg-white/90 p-3 shadow-2xl shadow-primary-950/10 backdrop-blur dark:border-white/10 dark:bg-white/[0.06] sm:p-5">
              <div className="rounded-xl border border-zinc-200 bg-white p-5 dark:border-white/10 dark:bg-[#0b1b2a] sm:p-7">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                  <span className="ml-auto text-xs font-semibold text-zinc-400">zhama.ai</span>
                </div>
                <div className="mt-6 rounded-xl border border-primary-100 bg-primary-50/60 p-5 dark:border-primary-900/60 dark:bg-primary-950/30 sm:p-7">
                  <p className="text-left text-sm leading-6 text-zinc-600 dark:text-zinc-300">
                    {locale === 'zh'
                      ? '分析这份漏斗数据，提出 10 个 ICE 评分实验，并生成本周增长计划。'
                      : 'Review this funnel, propose 10 ICE-scored experiments, and write the weekly growth plan.'}
                  </p>
                  <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-primary-100 pt-4 dark:border-primary-900/60">
                    <div className="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400">
                      <Sparkles className="h-4 w-4 text-primary-700 dark:text-primary-200" />
                      {locale === 'zh' ? '增长实验规划师 · 随时就绪' : 'Growth Experiment Planner · Ready'}
                    </div>
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-700 text-white">
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </section>

        <section className="bg-white py-16 dark:bg-zinc-900 md:py-24">
          <Container>
            <div className="mx-auto mb-12 max-w-3xl text-center">
              <span className="inline-flex items-center gap-2 rounded-full bg-primary-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-primary-800 dark:bg-primary-950/50 dark:text-primary-200">
                <Users className="h-3.5 w-3.5" />
                {t('experts.badge')}
              </span>
              <h2 className="mt-5 text-3xl font-bold tracking-tight text-zinc-950 dark:text-white md:text-4xl">
                {t('experts.title')}
              </h2>
              <p className="mt-4 text-base leading-7 text-zinc-600 dark:text-zinc-400">
                {t('experts.subtitle')}
              </p>
            </div>

            <div className="mb-8 grid overflow-hidden rounded-lg border border-white/10 bg-[#07131f] text-white shadow-lg shadow-slate-950/10 sm:grid-cols-3">
              <div className="flex items-center justify-center gap-3 px-6 py-5 sm:justify-start">
                <span className="text-4xl font-bold tracking-tight text-white">{t('experts.statValue')}</span>
                <span className="max-w-24 text-xs font-medium leading-5 text-zinc-300">
                  {t('experts.statLabel')}
                </span>
              </div>
              <div className="flex items-center justify-center gap-3 border-t border-white/10 px-6 py-5 sm:border-l sm:border-t-0">
                <span className="flex h-9 w-9 items-center justify-center rounded-md bg-white/10 text-primary-200">
                  <Layers className="h-4 w-4" />
                </span>
                <span className="text-sm font-medium text-zinc-200">{t('experts.statFamilies')}</span>
              </div>
              <div className="flex items-center justify-center gap-3 border-t border-white/10 px-6 py-5 sm:border-l sm:border-t-0">
                <span className="flex h-9 w-9 items-center justify-center rounded-md bg-white/10 text-accent-300">
                  <Sparkles className="h-4 w-4" />
                </span>
                <span className="text-sm font-medium text-zinc-200">{t('experts.statUpdate')}</span>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
              {expertFamilies.map((family) => (
                <article
                  key={family.name}
                  className="group flex min-h-48 flex-col rounded-lg border border-zinc-200 bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-primary-300 hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-primary-800"
                >
                  <div className="flex items-start justify-between gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-md bg-primary-50 text-primary-700 transition-colors group-hover:bg-primary-700 group-hover:text-white dark:bg-primary-950/60 dark:text-primary-200">
                      <Users className="h-4 w-4" />
                    </span>
                    <span className="rounded-md border border-primary-100 bg-primary-50 px-2 py-1 text-xs font-bold text-primary-700 dark:border-primary-900 dark:bg-primary-950/60 dark:text-primary-200">
                      {family.count}
                    </span>
                  </div>
                  <h3 className="mt-4 text-base font-semibold text-zinc-950 dark:text-white">{family.name}</h3>
                  <ul className="mt-3 flex-1 space-y-1.5">
                    {family.roles.map((role) => (
                      <li key={role} className="flex items-start gap-2 text-xs leading-5 text-zinc-500 dark:text-zinc-400">
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent-500" />
                        <span className="line-clamp-1">{role}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 border-t border-zinc-100 pt-3 text-xs font-semibold text-primary-700 dark:border-white/10 dark:text-primary-200">
                    {family.count} {locale === 'zh' ? '位专家' : 'experts'}
                  </div>
                </article>
              ))}
            </div>

            <div className="mt-10 flex flex-col items-center gap-4">
              <CloudLink
                medium="cloud_page"
                locale={locale}
                className="inline-flex items-center gap-2 rounded-lg bg-zinc-950 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-zinc-950/15 transition-all hover:-translate-y-0.5 hover:bg-zinc-800 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200"
              >
                {t('experts.cta')}
                <ArrowRight className="h-4 w-4" />
              </CloudLink>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">{t('experts.more')}</p>
            </div>
          </Container>
        </section>

        <section className="bg-zinc-50 py-16 dark:bg-zinc-950 md:py-24">
          <Container>
            <SectionHead title={t('employees.title')} lead={t('employees.subtitle')} center />
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {employees.map((employee, index) => {
                const Icon = employeeIcons[index] ?? Sparkles;
                return (
                  <article
                    key={employee.title}
                    className="group rounded-xl border border-zinc-200 bg-white p-6 transition-all hover:-translate-y-1 hover:border-primary-300 hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-primary-800"
                  >
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-50 text-primary-700 dark:bg-primary-950/60 dark:text-primary-200">
                      <Icon className="h-5 w-5" />
                    </span>
                    <h2 className="mt-5 text-lg font-bold text-zinc-950 dark:text-white">{employee.title}</h2>
                    <p className="mt-2 min-h-12 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                      {employee.description}
                    </p>
                    <div className="mt-5 border-t border-zinc-200 pt-4 dark:border-zinc-800">
                      <p className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400">
                        {t('employees.outputLabel')}
                      </p>
                      <p className="mt-1 text-sm font-semibold text-primary-700 dark:text-primary-200">
                        {employee.output}
                      </p>
                    </div>
                  </article>
                );
              })}
              <div className="flex min-h-52 flex-col justify-center rounded-xl border border-dashed border-primary-300 bg-primary-50/40 p-6 text-center dark:border-primary-800 dark:bg-primary-950/20 lg:col-span-1">
                <Sparkles className="mx-auto h-7 w-7 text-primary-700 dark:text-primary-200" />
                <p className="mt-3 text-sm font-semibold text-zinc-800 dark:text-zinc-200">
                  {locale === 'zh' ? '创建属于您岗位的数字员工' : 'Create one for your role'}
                </p>
                <CloudLink
                  medium="cloud_page"
                  locale={locale}
                  className="mt-3 text-sm font-semibold text-primary-700 hover:text-primary-800 dark:text-primary-200"
                >
                  {t('hero.primaryCta')} →
                </CloudLink>
              </div>
            </div>
          </Container>
        </section>

        <section className="bg-white py-16 dark:bg-zinc-900 md:py-24">
          <Container>
            <SectionHead title={t('pricing.title')} lead={t('pricing.subtitle')} center />
            <div className="grid gap-5 lg:grid-cols-3">
              {plans.map((plan) => {
                const recommended = plan.key === 'pro';
                return (
                  <article
                    key={plan.key}
                    className={`relative flex flex-col rounded-2xl border p-7 ${
                      recommended
                        ? 'border-primary-400 bg-primary-50/50 shadow-xl shadow-primary-950/10 dark:border-primary-700 dark:bg-primary-950/20'
                        : 'border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900'
                    }`}
                  >
                    {recommended && (
                      <span className="absolute right-5 top-5 rounded-full bg-primary-700 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-white">
                        {t('pricing.recommended')}
                      </span>
                    )}
                    <p className="text-sm font-semibold text-zinc-500 dark:text-zinc-400">{plan.tagline}</p>
                    <h2 className="mt-2 text-2xl font-bold text-zinc-950 dark:text-white">{plan.name}</h2>
                    <div className="mt-6 flex items-end gap-1">
                      <span className="text-4xl font-bold text-zinc-950 dark:text-white">{plan.price}</span>
                      {plan.period && <span className="pb-1 text-sm text-zinc-500">{plan.period}</span>}
                    </div>
                    <p className="mt-4 min-h-12 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                      {plan.description}
                    </p>
                    <ul className="mt-6 flex-1 space-y-3">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-2 text-sm text-zinc-700 dark:text-zinc-300">
                          <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary-700 dark:text-primary-200" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <CloudLink
                      medium="cloud_page"
                      locale={locale}
                      className={`mt-8 inline-flex items-center justify-center rounded-lg px-5 py-3 text-sm font-semibold transition-colors ${
                        recommended
                          ? 'bg-primary-700 text-white hover:bg-primary-800'
                          : 'border border-zinc-300 text-zinc-900 hover:bg-zinc-50 dark:border-zinc-700 dark:text-white dark:hover:bg-zinc-800'
                      }`}
                    >
                      {plan.cta}
                    </CloudLink>
                  </article>
                );
              })}
            </div>
            <p className="mt-5 text-center text-xs text-zinc-500 dark:text-zinc-400">{t('pricing.note')}</p>
          </Container>
        </section>

        <section id="compare" className="scroll-mt-20 bg-zinc-50 py-16 dark:bg-zinc-950 md:py-24">
          <Container>
            <SectionHead title={t('comparison.title')} lead={t('comparison.subtitle')} center />
            <div className="overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800">
              <div className="grid grid-cols-[0.8fr_1fr_1fr] bg-zinc-100 text-sm font-bold text-zinc-950 dark:bg-zinc-800 dark:text-white">
                <div className="p-4 sm:p-5" />
                <div className="border-l border-zinc-200 p-4 sm:p-5 dark:border-zinc-700">
                  <Cloud className="mb-2 h-5 w-5 text-primary-700 dark:text-primary-200" />
                  {t('comparison.cloudLabel')}
                </div>
                <div className="border-l border-zinc-200 p-4 sm:p-5 dark:border-zinc-700">
                  <ShieldCheck className="mb-2 h-5 w-5 text-primary-700 dark:text-primary-200" />
                  {t('comparison.enterpriseLabel')}
                </div>
              </div>
              {comparisonRows.map((row) => (
                <div
                  key={row.label}
                  className="grid grid-cols-[0.8fr_1fr_1fr] border-t border-zinc-200 bg-white text-xs leading-5 text-zinc-600 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-300 sm:text-sm sm:leading-6"
                >
                  <div className="p-3 font-semibold text-zinc-950 dark:text-white sm:p-5">{row.label}</div>
                  <div className="border-l border-zinc-200 p-3 dark:border-zinc-800 sm:p-5">{row.cloud}</div>
                  <div className="border-l border-zinc-200 p-3 dark:border-zinc-800 sm:p-5">{row.enterprise}</div>
                </div>
              ))}
            </div>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <CloudLink
                medium="cloud_page"
                locale={locale}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary-700 px-5 py-3 text-sm font-semibold text-white hover:bg-primary-800"
              >
                {t('comparison.cloudCta')}
                <ArrowRight className="h-4 w-4" />
              </CloudLink>
              <Link
                href={`/${locale}/contact`}
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-zinc-300 px-5 py-3 text-sm font-semibold text-zinc-900 hover:bg-zinc-50 dark:border-zinc-700 dark:text-white dark:hover:bg-zinc-800"
              >
                {t('comparison.enterpriseCta')}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </Container>
        </section>

        <section className="bg-white py-16 dark:bg-zinc-900 md:py-24">
          <Container>
            <SectionHead title={t('faq.title')} lead={t('faq.subtitle')} center />
            <div className="mx-auto max-w-3xl space-y-3">
              {faqItems.map((item) => (
                <details
                  key={item.question}
                  className="group rounded-xl border border-zinc-200 bg-zinc-50 p-5 open:shadow-sm dark:border-zinc-800 dark:bg-zinc-950"
                >
                  <summary className="cursor-pointer list-none pr-8 text-base font-semibold text-zinc-950 dark:text-white">
                    {item.question}
                    <span className="float-right text-primary-700 transition-transform group-open:rotate-45 dark:text-primary-200">
                      +
                    </span>
                  </summary>
                  <p className="mt-4 text-sm leading-7 text-zinc-600 dark:text-zinc-400">{item.answer}</p>
                </details>
              ))}
            </div>
          </Container>
        </section>

        <section className="relative overflow-hidden bg-[#07131f] py-16 text-white md:py-24">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(50,153,227,0.20),transparent_30%)]" />
          <Container className="relative z-10">
            <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <div className="flex items-center gap-2 text-sm font-semibold text-primary-200">
                  <Globe2 className="h-4 w-4" />
                  zhama.ai
                </div>
                <h2 className="mt-3 max-w-3xl text-3xl font-bold md:text-4xl">{t('bottomCta.title')}</h2>
                <p className="mt-4 max-w-2xl text-lg leading-8 text-zinc-300">{t('bottomCta.description')}</p>
              </div>
              <div className="flex flex-wrap gap-3">
                <CloudLink
                  medium="cloud_page"
                  locale={locale}
                  className="inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 text-sm font-semibold text-zinc-950 hover:bg-zinc-100"
                >
                  {t('bottomCta.primaryCta')}
                  <ArrowRight className="h-4 w-4" />
                </CloudLink>
                <Link
                  href={`/${locale}/contact`}
                  className="inline-flex items-center rounded-lg border border-white/25 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10"
                >
                  {t('bottomCta.secondaryCta')}
                </Link>
              </div>
            </div>
          </Container>
        </section>
      </main>

      <FooterSection locale={locale} />
    </div>
  );
}
