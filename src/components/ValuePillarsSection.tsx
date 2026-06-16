import { getTranslations } from 'next-intl/server';
import { Container } from './ui/Container';
import { UserCheck, Lock, Eye, Sparkles } from 'lucide-react';
import { SectionHead } from './ui/Section';

interface ValuePillarsSectionProps {
  locale: string;
}

export default async function ValuePillarsSection({ locale }: ValuePillarsSectionProps) {
  const t = await getTranslations({ locale, namespace: 'biz.valuePillars' });

  const pillars = [
    {
      key: 'dedicated',
      icon: UserCheck,
    },
    {
      key: 'ownership',
      icon: Lock,
    },
    {
      key: 'governance',
      icon: Eye,
    },
    {
      key: 'ready',
      icon: Sparkles,
    },
  ] as const;

  return (
    <section
      id="value-pillars"
      className="py-16 md:py-24 bg-zinc-50 dark:bg-zinc-950"
    >
      <Container>
        <SectionHead title={t('title')} lead={t('subtitle')} center />

        <div className="grid gap-px overflow-hidden rounded-lg border border-zinc-200 bg-zinc-200 dark:border-white/10 dark:bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((p) => {
            const Icon = p.icon;
            return (
              <div
                key={p.key}
                className="bg-white p-6 transition-colors hover:bg-zinc-50 dark:bg-[#07131f] dark:hover:bg-white/5"
              >
                <Icon className="h-6 w-6 text-primary-700 dark:text-primary-200" />
                <span className="mt-4 inline-flex rounded-md border border-primary-200 bg-primary-50 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-primary-800 dark:border-primary-800 dark:bg-primary-950/40 dark:text-primary-200">
                  {t(`pillars.${p.key}.tag`)}
                </span>
                <h3 className="mt-4 text-lg font-semibold text-zinc-950 dark:text-white">
                  {t(`pillars.${p.key}.title`)}
                </h3>
                <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                  {t(`pillars.${p.key}.description`)}
                </p>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
