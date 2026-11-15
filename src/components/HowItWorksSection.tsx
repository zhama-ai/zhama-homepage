import { getTranslations } from 'next-intl/server';
import { Briefcase, Check, ClipboardCheck, Plug, Send, X } from 'lucide-react';
import { Container } from './ui/Container';
import { SectionHead } from './ui/Section';

interface HowItWorksSectionProps {
  locale: string;
}

interface Step {
  title: string;
  description: string;
}

interface CompareRow {
  label: string;
  chat: string;
  tego: string;
}

const stepIcons = [Briefcase, Plug, Send, ClipboardCheck];

export default async function HowItWorksSection({ locale }: HowItWorksSectionProps) {
  const t = await getTranslations({ locale, namespace: 'biz.howItWorks' });
  const steps = t.raw('steps') as Step[];
  const rows = t.raw('compare.rows') as CompareRow[];

  return (
    <section id="how" className="scroll-mt-20 bg-white py-16 dark:bg-zinc-900 md:py-24">
      <Container>
        <SectionHead eyebrow={t('eyebrow')} title={t('title')} lead={t('subtitle')} center />

        <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => {
            const Icon = stepIcons[i % stepIcons.length];
            return (
              <li
                key={step.title}
                className="relative rounded-lg border border-zinc-200 bg-zinc-50 p-6 dark:border-white/10 dark:bg-white/5"
              >
                <div className="flex items-center justify-between">
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-700 text-white">
                    <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
                  </span>
                  <span className="text-3xl font-bold text-zinc-200 dark:text-white/10">{i + 1}</span>
                </div>
                <h3 className="mt-5 text-lg font-semibold text-zinc-950 dark:text-white">{step.title}</h3>
                <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">{step.description}</p>
              </li>
            );
          })}
        </ol>

        <div className="mt-16">
          <h3 className="text-center text-2xl font-bold text-zinc-950 dark:text-white">{t('compare.title')}</h3>
          <div className="mt-8 overflow-hidden rounded-xl border border-zinc-200 dark:border-white/10">
            <div className="hidden grid-cols-[0.7fr_1fr_1.2fr] bg-zinc-50 text-sm font-semibold dark:bg-white/5 md:grid">
              <div className="px-6 py-4 text-zinc-500 dark:text-zinc-400">{t('compare.dimension')}</div>
              <div className="px-6 py-4 text-zinc-600 dark:text-zinc-300">{t('compare.chat')}</div>
              <div className="bg-primary-700 px-6 py-4 text-white">{t('compare.tego')}</div>
            </div>
            <ul className="divide-y divide-zinc-200 dark:divide-white/10">
              {rows.map((row) => (
                <li key={row.label} className="grid gap-2 px-6 py-4 md:grid-cols-[0.7fr_1fr_1.2fr] md:gap-0 md:p-0">
                  <div className="text-sm font-semibold text-zinc-950 dark:text-white md:px-6 md:py-4">{row.label}</div>
                  <div className="flex items-start gap-2 text-sm text-zinc-500 dark:text-zinc-400 md:px-6 md:py-4">
                    <X className="mt-0.5 h-4 w-4 shrink-0 text-zinc-400" aria-hidden="true" />
                    <span>
                      <span className="sr-only">{t('compare.chat')}: </span>
                      {row.chat}
                    </span>
                  </div>
                  <div className="flex items-start gap-2 text-sm font-medium text-zinc-900 dark:text-zinc-100 md:bg-primary-50/60 md:px-6 md:py-4 md:dark:bg-primary-950/20">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary-700 dark:text-primary-300" aria-hidden="true" />
                    <span>
                      <span className="sr-only">{t('compare.tego')}: </span>
                      {row.tego}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
