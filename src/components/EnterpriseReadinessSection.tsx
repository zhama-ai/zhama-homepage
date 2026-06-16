import { getTranslations } from 'next-intl/server';
import { Container } from './ui/Container';
import {
  Server,
  FileSearch,
  KeyRound,
  Cpu,
  Lock,
  ShieldCheck,
} from 'lucide-react';
import { SectionHead } from './ui/Section';
import { Card } from './ui/Card';

interface EnterpriseReadinessSectionProps {
  locale: string;
}

export default async function EnterpriseReadinessSection({ locale }: EnterpriseReadinessSectionProps) {
  const t = await getTranslations({ locale, namespace: 'biz.readiness' });

  const items = [
    { key: 'private', icon: Server },
    { key: 'compliance', icon: FileSearch },
    { key: 'sso', icon: KeyRound },
    { key: 'domestic', icon: Cpu },
    { key: 'isolation', icon: Lock },
    { key: 'sla', icon: ShieldCheck },
  ] as const;

  return (
    <section
      id="readiness"
      className="py-16 md:py-24 bg-white dark:bg-zinc-900"
    >
      <Container>
        <SectionHead title={t('title')} lead={t('subtitle')} center />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <Card key={item.key} hover className="min-h-[178px]">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-50 text-primary-700 dark:bg-primary-950/60 dark:text-primary-200">
                  <Icon className="h-5 w-5" strokeWidth={1.75} />
                </div>
                <h3 className="mt-5 text-lg font-semibold text-zinc-950 dark:text-white">
                  {t(`items.${item.key}.title`)}
                </h3>
                <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                  {t(`items.${item.key}.description`)}
                </p>
              </Card>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
