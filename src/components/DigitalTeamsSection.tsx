import { getTranslations } from 'next-intl/server';
import { ArrowRight, BriefcaseBusiness, Check, Globe2, Search } from 'lucide-react';
import CloudLink from './CloudLink';
import { Card } from './ui/Card';
import { Container } from './ui/Container';
import { SectionHead } from './ui/Section';

interface DigitalTeamsSectionProps {
  locale: string;
}

interface TeamPack {
  key: 'research' | 'delivery' | 'expansion';
  campaign: 'research-strategy' | 'client-delivery' | 'market-expansion';
  icon: typeof Search;
}

const TEAM_PACKS: TeamPack[] = [
  {
    key: 'research',
    campaign: 'research-strategy',
    icon: Search,
  },
  {
    key: 'delivery',
    campaign: 'client-delivery',
    icon: BriefcaseBusiness,
  },
  {
    key: 'expansion',
    campaign: 'market-expansion',
    icon: Globe2,
  },
];

export default async function DigitalTeamsSection({ locale }: DigitalTeamsSectionProps) {
  const t = await getTranslations({ locale, namespace: 'biz.teamPacks' });

  return (
    <section id="team-packs" className="bg-white py-16 dark:bg-zinc-900 md:py-24">
      <Container>
        <div className="mx-auto mb-4 w-fit rounded-full border border-primary-200 bg-primary-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-primary-800 dark:border-primary-800 dark:bg-primary-950/40 dark:text-primary-200">
          {t('eyebrow')}
        </div>
        <SectionHead title={t('title')} lead={t('subtitle')} center />

        <div className="grid gap-5 lg:grid-cols-3">
          {TEAM_PACKS.map(({ key, campaign, icon: Icon }, index) => {
            const employees = t.raw(`items.${key}.employees`) as string[];

            return (
              <Card
                key={key}
                hover
                className="relative flex h-full flex-col overflow-hidden border-zinc-200 p-7 dark:border-zinc-800"
              >
                {index === 0 && (
                  <span className="absolute right-4 top-4 rounded-full bg-primary-700 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
                    {t('recommended')}
                  </span>
                )}

                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-50 text-primary-700 dark:bg-primary-950/60 dark:text-primary-200">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-5 text-xl font-bold text-zinc-950 dark:text-white">
                  {t(`items.${key}.title`)}
                </h3>
                <p className="mt-3 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                  {t(`items.${key}.description`)}
                </p>

                <div className="mt-6 rounded-xl bg-zinc-50 p-4 dark:bg-white/5">
                  <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                    {t('employeesLabel')}
                  </p>
                  <ul className="mt-3 space-y-2">
                    {employees.map((employee) => (
                      <li
                        key={employee}
                        className="flex items-start gap-2 text-sm text-zinc-800 dark:text-zinc-200"
                      >
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary-700 dark:text-primary-200" />
                        <span>{employee}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <p className="mt-5 flex-1 text-sm font-medium leading-6 text-zinc-800 dark:text-zinc-200">
                  {t('outcomeLabel')}: {t(`items.${key}.outcome`)}
                </p>

                <CloudLink
                  medium="team_pack"
                  locale={locale}
                  path={`/?team=${campaign}`}
                  className="mt-6 inline-flex items-center justify-center gap-2 rounded-lg bg-zinc-950 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-zinc-800 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200"
                >
                  {t(`items.${key}.cta`)}
                  <ArrowRight className="h-4 w-4" />
                </CloudLink>
              </Card>
            );
          })}
        </div>

        <p className="mx-auto mt-7 max-w-2xl text-center text-sm text-zinc-500 dark:text-zinc-400">
          {t('reassurance')}
        </p>
      </Container>
    </section>
  );
}
