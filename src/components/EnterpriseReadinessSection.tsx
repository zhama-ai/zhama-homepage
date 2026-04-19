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
      className="py-20 md:py-28 bg-zinc-50 dark:bg-zinc-900"
    >
      <Container>
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-zinc-50 leading-tight">
            {t('title')}
          </h2>
          <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
            {t('subtitle')}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.key}
                className="flex gap-4 p-6 rounded-2xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 hover:border-primary-300 dark:hover:border-primary-700 hover:shadow-md transition-all duration-300"
              >
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-primary-50 dark:bg-primary-950/40 text-primary-600 dark:text-primary-400">
                    <Icon className="w-5 h-5" strokeWidth={1.75} />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-50 mb-1.5">
                    {t(`items.${item.key}.title`)}
                  </h3>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    {t(`items.${item.key}.description`)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
