import { getTranslations } from 'next-intl/server';
import { AlertTriangle, ArrowRight, Database, MessageSquareWarning, Server, Wrench } from 'lucide-react';
import { Container } from './ui/Container';
import { SectionHead } from './ui/Section';

interface PainPointsSectionProps {
  locale: string;
}

interface RiskItem {
  action: string;
  risk: string;
  description: string;
}

interface CompareRow {
  from: string;
  to: string;
}

const icons = [Server, MessageSquareWarning, Wrench, Database];

export default async function PainPointsSection({ locale }: PainPointsSectionProps) {
  const t = await getTranslations({ locale, namespace: 'biz.painPoints' });
  const items = t.raw('items') as RiskItem[];
  const rows = t.raw('compare.rows') as CompareRow[];

  return (
    <section id="pain-points" className="scroll-mt-20 bg-white py-16 dark:bg-zinc-900 md:py-24">
      <Container>
        <SectionHead eyebrow={t('eyebrow')} title={t('title')} lead={t('subtitle')} />

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, i) => {
            const Icon = icons[i % icons.length];
            return (
              <div
                key={item.action}
                className="flex flex-col rounded-lg border border-zinc-200 bg-zinc-50 p-5 dark:border-white/10 dark:bg-white/5"
              >
                <div className="flex items-center gap-2 text-sm font-semibold text-zinc-700 dark:text-zinc-200">
                  <Icon className="h-4 w-4 text-primary-700 dark:text-primary-200" strokeWidth={1.75} aria-hidden="true" />
                  {item.action}
                </div>
                <div className="mt-3 flex items-center gap-2 text-base font-semibold text-zinc-950 dark:text-white">
                  <AlertTriangle className="h-4 w-4 shrink-0 text-accent-600 dark:text-accent-300" aria-hidden="true" />
                  {item.risk}
                </div>
                <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">{item.description}</p>
              </div>
            );
          })}
        </div>

        <div className="mt-10 overflow-hidden rounded-xl border border-zinc-200 dark:border-white/10">
          <div className="bg-[#07131f] px-6 py-5 text-white">
            <h3 className="text-lg font-semibold">{t('compare.title')}</h3>
          </div>
          <div className="hidden grid-cols-[1fr_auto_1fr] gap-4 border-b border-zinc-200 bg-zinc-50 px-6 py-3 text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:border-white/10 dark:bg-white/5 dark:text-zinc-400 sm:grid">
            <span>{t('compare.fromLabel')}</span>
            <span className="w-4" />
            <span className="text-primary-700 dark:text-primary-200">{t('compare.toLabel')}</span>
          </div>
          <ul className="divide-y divide-zinc-200 bg-white dark:divide-white/10 dark:bg-zinc-900">
            {rows.map((row) => (
              <li
                key={row.from}
                className="grid gap-1 px-6 py-4 sm:grid-cols-[1fr_auto_1fr] sm:items-center sm:gap-4"
              >
                <span className="text-sm text-zinc-500 line-through decoration-zinc-300 dark:text-zinc-400 dark:decoration-zinc-600">
                  {row.from}
                </span>
                <ArrowRight className="hidden h-4 w-4 text-primary-600 sm:block" aria-hidden="true" />
                <span className="text-sm font-semibold text-zinc-950 dark:text-white">{row.to}</span>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
