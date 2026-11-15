import { getTranslations } from 'next-intl/server';
import {
  Building,
  Cpu,
  Database,
  FileSearch,
  KeyRound,
  Plug,
  Smartphone,
  UserCheck,
} from 'lucide-react';
import { Container } from './ui/Container';
import { SectionHead } from './ui/Section';

interface EnterpriseReadinessSectionProps {
  locale: string;
}

interface GovernanceItem {
  title: string;
  description: string;
}

interface DeliveryItem {
  title: string;
  points: string[];
}

const governanceIcons = [KeyRound, UserCheck, FileSearch, Database];
const deliveryIcons = [Cpu, Smartphone, Plug, Building];

export default async function EnterpriseReadinessSection({ locale }: EnterpriseReadinessSectionProps) {
  const t = await getTranslations({ locale, namespace: 'biz.readiness' });
  const governance = t.raw('governance') as GovernanceItem[];
  const delivery = t.raw('delivery') as DeliveryItem[];

  return (
    <section id="readiness" className="scroll-mt-20 bg-white py-16 dark:bg-zinc-900 md:py-24">
      <Container>
        <SectionHead eyebrow={t('eyebrow')} title={t('title')} lead={t('subtitle')} center />

        <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
          {t('governanceTitle')}
        </h3>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {governance.map((item, i) => {
            const Icon = governanceIcons[i % governanceIcons.length];
            return (
              <div
                key={item.title}
                className="flex items-start gap-3 rounded-lg border border-zinc-200 bg-zinc-50 p-5 dark:border-white/10 dark:bg-white/5"
              >
                <Icon className="mt-0.5 h-5 w-5 shrink-0 text-primary-700 dark:text-primary-200" strokeWidth={1.75} aria-hidden="true" />
                <div>
                  <div className="font-semibold text-zinc-950 dark:text-white">{item.title}</div>
                  <div className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">{item.description}</div>
                </div>
              </div>
            );
          })}
        </div>

        <h3 className="mt-10 text-sm font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
          {t('deliveryTitle')}
        </h3>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {delivery.map((item, i) => {
            const Icon = deliveryIcons[i % deliveryIcons.length];
            return (
              <div
                key={item.title}
                className="rounded-lg border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-50 text-primary-700 dark:bg-primary-950/60 dark:text-primary-200">
                  <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
                </span>
                <div className="mt-4 text-lg font-semibold text-zinc-950 dark:text-white">{item.title}</div>
                <ul className="mt-3 space-y-1.5">
                  {item.points.map((point) => (
                    <li key={point} className="text-sm text-zinc-600 dark:text-zinc-400">
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        <p className="mt-6 text-xs text-zinc-500 dark:text-zinc-400">{t('note')}</p>
      </Container>
    </section>
  );
}
