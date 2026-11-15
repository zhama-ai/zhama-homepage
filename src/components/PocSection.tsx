import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { Container } from './ui/Container';
import { SectionHead } from './ui/Section';
import ExternalLink from './ExternalLink';
import { docsUrl } from '@/lib/external-links';

interface PocSectionProps {
  locale: string;
}

interface Criterion {
  title: string;
  description: string;
}

interface Target {
  value: string;
  label: string;
}

export default async function PocSection({ locale }: PocSectionProps) {
  const t = await getTranslations({ locale, namespace: 'biz.poc' });
  const criteria = t.raw('criteria') as Criterion[];
  const targets = t.raw('targets') as Target[];
  const extras = t.raw('targetsExtra') as string[];
  const steps = t.raw('steps') as string[];

  return (
    <section id="poc" className="scroll-mt-20 bg-white py-16 dark:bg-zinc-900 md:py-24">
      <Container>
        <SectionHead eyebrow={t('eyebrow')} title={t('title')} lead={t('subtitle')} />

        <div className="grid gap-8 lg:grid-cols-2">
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
              {t('criteriaTitle')}
            </h3>
            <ol className="mt-4 divide-y divide-zinc-200 border-y border-zinc-200 dark:divide-white/10 dark:border-white/10">
              {criteria.map((c, i) => (
                <li key={c.title} className="flex items-center gap-4 py-4">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-primary-300 text-sm font-semibold text-primary-700 dark:border-primary-700 dark:text-primary-200">
                    {i + 1}
                  </span>
                  <span className="w-24 shrink-0 font-semibold text-zinc-950 dark:text-white sm:w-32">{c.title}</span>
                  <span className="text-sm text-zinc-600 dark:text-zinc-400">{c.description}</span>
                </li>
              ))}
            </ol>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
              {t('targetsTitle')}
            </h3>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              {targets.map((target) => (
                <div
                  key={target.label}
                  className="rounded-lg border border-primary-200 bg-primary-50 p-5 dark:border-primary-800/70 dark:bg-primary-950/30"
                >
                  <div className="text-3xl font-bold text-primary-700 dark:text-primary-200">{target.value}</div>
                  <div className="mt-1 text-sm text-zinc-700 dark:text-zinc-300">{target.label}</div>
                </div>
              ))}
            </div>
            <ul className="mt-4 space-y-2">
              {extras.map((extra) => (
                <li key={extra} className="flex items-start gap-2 text-sm text-zinc-700 dark:text-zinc-300">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
                  {extra}
                </li>
              ))}
            </ul>
            <p className="mt-3 text-xs text-zinc-500 dark:text-zinc-400">{t('note')}</p>
          </div>
        </div>

        <div className="mt-10 rounded-xl border border-zinc-200 bg-zinc-50 p-6 dark:border-white/10 dark:bg-white/5 sm:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="min-w-0">
              <h3 className="font-semibold text-zinc-950 dark:text-white">{t('stepsTitle')}</h3>
              <ol className="mt-4 flex flex-wrap items-center gap-2">
                {steps.map((step, i) => (
                  <li key={step} className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-2 rounded-md bg-white px-3 py-1.5 text-sm font-medium text-zinc-800 shadow-sm dark:bg-zinc-900 dark:text-zinc-100">
                      <span className="text-xs font-bold text-primary-700 dark:text-primary-200">{i + 1}</span>
                      {step}
                    </span>
                    {i < steps.length - 1 ? <ArrowRight className="h-4 w-4 text-zinc-400" aria-hidden="true" /> : null}
                  </li>
                ))}
              </ol>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href={`/${locale}/contact`}
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-primary-950/10 transition-all duration-300 hover:bg-primary-800 hover:shadow-lg active:scale-95"
              >
                {t('primaryCta')}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <ExternalLink
                href={docsUrl('poc')}
                medium="poc"
                icon
                className="inline-flex items-center justify-center gap-1.5 whitespace-nowrap rounded-lg border border-zinc-300 bg-white px-5 py-2.5 text-sm font-semibold text-zinc-900 transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50 dark:hover:bg-zinc-800"
              >
                {t('docsCta')}
              </ExternalLink>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
