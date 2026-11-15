import { getTranslations } from 'next-intl/server';
import { Banknote, Briefcase, Building2, Factory, Landmark, ShieldCheck, UserCheck } from 'lucide-react';
import { Container } from './ui/Container';
import { SectionHead } from './ui/Section';

interface CustomerCasesSectionProps {
  locale: string;
}

interface Principle {
  title: string;
  description: string;
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
  points: string[];
  metric?: Metric;
  metrics?: Metric[];
  guardrail: string;
}

const caseIcons = [Briefcase, ShieldCheck, Banknote, Factory, Landmark];

export default async function CustomerCasesSection({ locale }: CustomerCasesSectionProps) {
  const t = await getTranslations({ locale, namespace: 'biz.customers' });
  const principles = t.raw('principles') as Principle[];
  const industries = t.raw('industries') as string[];
  const cases = t.raw('cases') as CustomerCase[];

  return (
    <section id="customers" className="scroll-mt-20 bg-zinc-50 py-16 dark:bg-zinc-950 md:py-24">
      <Container>
        <SectionHead eyebrow={t('eyebrow')} title={t('title')} lead={t('subtitle')} />

        <div className="grid gap-px overflow-hidden rounded-lg border border-zinc-200 bg-zinc-200 dark:border-white/10 dark:bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
          {principles.map((p, i) => (
            <div key={p.title} className="bg-white p-5 dark:bg-zinc-900">
              <span className="text-xs font-semibold text-primary-700 dark:text-primary-200">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div className="mt-1 text-lg font-semibold text-zinc-950 dark:text-white">{p.title}</div>
              <div className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">{p.description}</div>
            </div>
          ))}
        </div>

        <ul className="mt-6 flex flex-wrap gap-2">
          {industries.map((industry) => (
            <li
              key={industry}
              className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200 bg-white px-3 py-1 text-xs font-medium text-zinc-700 dark:border-white/10 dark:bg-white/5 dark:text-zinc-300"
            >
              <Building2 className="h-3.5 w-3.5 text-primary-700 dark:text-primary-200" aria-hidden="true" />
              {industry}
            </li>
          ))}
        </ul>

        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {cases.map((item, i) => {
            const Icon = caseIcons[i % caseIcons.length];
            const metrics = item.metrics ?? (item.metric ? [item.metric] : []);
            return (
              <article
                key={item.client}
                className="flex flex-col rounded-lg border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-50 text-primary-700 dark:bg-primary-950/60 dark:text-primary-200">
                    <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
                  </span>
                  <div className="min-w-0">
                    <div className="text-xs font-semibold uppercase tracking-wider text-primary-700 dark:text-primary-200">
                      {item.industry}
                    </div>
                    <div className="text-sm text-zinc-500 dark:text-zinc-400">{item.client}</div>
                  </div>
                </div>
                <h3 className="mt-4 text-lg font-semibold text-zinc-950 dark:text-white">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">{item.description}</p>
                <ul className="mt-4 space-y-2">
                  {item.points.map((point) => (
                    <li key={point} className="flex items-start gap-2 text-sm leading-6 text-zinc-700 dark:text-zinc-300">
                      <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary-600" aria-hidden="true" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex-1" />
                {metrics.length > 0 ? (
                  <div className="mt-5 flex flex-wrap gap-x-6 gap-y-3 border-t border-zinc-200 pt-4 dark:border-zinc-800">
                    {metrics.map((m) => (
                      <div key={m.label}>
                        <div className="text-xl font-bold text-zinc-950 dark:text-white">{m.value}</div>
                        <div className="text-xs text-zinc-500 dark:text-zinc-400">{m.label}</div>
                      </div>
                    ))}
                  </div>
                ) : null}
                <p className="mt-4 flex items-start gap-2 rounded-md bg-zinc-50 px-3 py-2 text-xs leading-5 text-zinc-600 dark:bg-white/5 dark:text-zinc-400">
                  <UserCheck className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent-600 dark:text-accent-300" aria-hidden="true" />
                  <span>
                    <span className="font-semibold text-zinc-800 dark:text-zinc-200">{t('guardrailLabel')} · </span>
                    {item.guardrail}
                  </span>
                </p>
              </article>
            );
          })}
        </div>

        <p className="mt-6 text-xs leading-5 text-zinc-500 dark:text-zinc-400">{t('note')}</p>
      </Container>
    </section>
  );
}
