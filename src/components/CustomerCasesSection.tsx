import { getTranslations } from 'next-intl/server';
import { Banknote, Briefcase, Factory, Landmark, ShieldCheck } from 'lucide-react';
import { Container } from './ui/Container';
import { SectionHead } from './ui/Section';

interface CustomerCasesSectionProps {
  locale: string;
}

interface Metric {
  value: string;
  label: string;
}

interface CustomerCase {
  industry: string;
  client: string;
  title: string;
  description: string;
  metrics?: Metric[];
}

const caseIcons = [Briefcase, ShieldCheck, Banknote, Factory, Landmark];

export default async function CustomerCasesSection({ locale }: CustomerCasesSectionProps) {
  const t = await getTranslations({ locale, namespace: 'biz.customers' });
  const cases = t.raw('cases') as CustomerCase[];
  // Cases with measured results lead as wide cards; the rest fill one row.
  const ordered = [
    ...cases.map((item, i) => ({ item, i })).filter(({ item }) => item.metrics?.length),
    ...cases.map((item, i) => ({ item, i })).filter(({ item }) => !item.metrics?.length),
  ];

  return (
    <section id="customers" className="scroll-mt-20 bg-white py-16 dark:bg-zinc-900 md:py-24">
      <Container>
        <SectionHead eyebrow={t('eyebrow')} title={t('title')} lead={t('subtitle')} center />

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-6">
          {ordered.map(({ item, i }) => {
            const Icon = caseIcons[i % caseIcons.length];
            const hasMetrics = Boolean(item.metrics?.length);
            return (
              <article
                key={item.client}
                className={
                  hasMetrics
                    ? 'flex flex-col rounded-lg border border-primary-200 bg-primary-50/50 p-6 dark:border-primary-800/60 dark:bg-primary-950/20 lg:col-span-3'
                    : 'flex flex-col rounded-lg border border-zinc-200 bg-zinc-50 p-6 dark:border-white/10 dark:bg-white/5 lg:col-span-2'
                }
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-primary-700 shadow-sm dark:bg-zinc-900 dark:text-primary-200">
                    <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
                  </span>
                  <div className="min-w-0">
                    <div className="text-xs font-semibold text-primary-700 dark:text-primary-200">{item.industry}</div>
                    <div className="text-sm text-zinc-500 dark:text-zinc-400">{item.client}</div>
                  </div>
                </div>
                <h3 className="mt-4 text-lg font-semibold text-zinc-950 dark:text-white">{item.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-6 text-zinc-600 dark:text-zinc-400">{item.description}</p>
                {hasMetrics ? (
                  <div className="mt-5 flex flex-wrap gap-x-6 gap-y-3 border-t border-primary-200 pt-4 dark:border-primary-800/60">
                    {item.metrics!.map((m) => (
                      <div key={m.label}>
                        <div className="text-2xl font-bold text-primary-700 dark:text-primary-200">{m.value}</div>
                        <div className="text-xs text-zinc-600 dark:text-zinc-400">{m.label}</div>
                      </div>
                    ))}
                  </div>
                ) : null}
              </article>
            );
          })}
        </div>

        <p className="mt-6 text-center text-xs leading-5 text-zinc-500 dark:text-zinc-400">{t('note')}</p>
      </Container>
    </section>
  );
}
