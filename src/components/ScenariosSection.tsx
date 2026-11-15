import { getTranslations } from 'next-intl/server';
import {
  ArrowRight,
  BarChart3,
  BookOpen,
  Boxes,
  Coins,
  Headphones,
  TrendingUp,
  Users,
  Workflow,
} from 'lucide-react';
import { Container } from './ui/Container';
import { SectionHead } from './ui/Section';
import ExternalLink from './ExternalLink';
import { docsUrl } from '@/lib/external-links';

interface ScenariosSectionProps {
  locale: string;
}

interface Domain {
  title: string;
  description: string;
}

interface Scenario {
  label: string;
  title: string;
  tagline: string;
  pain: string;
  steps: string[];
  uses: string;
}

const domainIcons = [BookOpen, Workflow, BarChart3, Headphones, TrendingUp, Users, Coins, Boxes];
const scenarioIcons = [BookOpen, Workflow, BarChart3, Headphones];

export default async function ScenariosSection({ locale }: ScenariosSectionProps) {
  const t = await getTranslations({ locale, namespace: 'biz.scenarios' });
  const domains = t.raw('domains') as Domain[];
  const scenarios = t.raw('items') as Scenario[];

  return (
    <section id="scenarios" className="scroll-mt-20 bg-white py-16 dark:bg-zinc-900 md:py-24">
      <Container>
        <SectionHead eyebrow={t('eyebrow')} title={t('title')} lead={t('subtitle')} center />

        <ul className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {domains.map((domain, i) => {
            const Icon = domainIcons[i % domainIcons.length];
            const featured = i < 4;
            return (
              <li
                key={domain.title}
                className={
                  featured
                    ? 'rounded-lg border border-primary-200 bg-primary-50 p-4 dark:border-primary-800/70 dark:bg-primary-950/30'
                    : 'rounded-lg border border-zinc-200 bg-zinc-50 p-4 dark:border-white/10 dark:bg-white/5'
                }
              >
                <Icon className="h-5 w-5 text-primary-700 dark:text-primary-200" strokeWidth={1.75} aria-hidden="true" />
                <div className="mt-3 text-sm font-semibold text-zinc-950 dark:text-white">{domain.title}</div>
                <div className="mt-0.5 text-xs leading-5 text-zinc-600 dark:text-zinc-400">{domain.description}</div>
              </li>
            );
          })}
        </ul>

        <h3 className="mt-14 text-xl font-bold text-zinc-950 dark:text-white">{t('featuredTitle')}</h3>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {scenarios.map((scenario, i) => {
            const Icon = scenarioIcons[i % scenarioIcons.length];
            return (
              <article
                key={scenario.title}
                className="flex flex-col rounded-lg border border-zinc-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900 sm:p-7"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-zinc-100 text-zinc-700 dark:bg-white/10 dark:text-zinc-100">
                    <Icon className="h-5 w-5" strokeWidth={2} aria-hidden="true" />
                  </span>
                  <span className="text-xs font-semibold uppercase tracking-wider text-primary-700 dark:text-primary-200">
                    {scenario.label}
                  </span>
                </div>
                <h4 className="mt-4 text-lg font-semibold text-zinc-950 dark:text-white">{scenario.title}</h4>
                <p className="mt-1 text-sm leading-6 text-zinc-600 dark:text-zinc-400">{scenario.tagline}</p>

                <p className="mt-4 rounded-md bg-accent-50 px-3 py-2 text-sm text-accent-900 dark:bg-accent-500/10 dark:text-accent-200">
                  <span className="font-semibold">{t('painLabel')}</span>
                  {scenario.pain}
                </p>

                <ol className="mt-5 flex flex-wrap items-center gap-x-1.5 gap-y-2">
                  {scenario.steps.map((step, j) => (
                    <li key={step} className="flex items-center gap-1.5">
                      <span className="inline-flex items-center gap-1.5 rounded-md border border-zinc-200 px-2.5 py-1 text-xs font-medium text-zinc-700 dark:border-zinc-700 dark:text-zinc-200">
                        <span className="text-primary-700 dark:text-primary-200">{j + 1}</span>
                        {step}
                      </span>
                      {j < scenario.steps.length - 1 ? (
                        <ArrowRight className="h-3 w-3 text-zinc-400" aria-hidden="true" />
                      ) : null}
                    </li>
                  ))}
                </ol>

                <div className="flex-1" />
                <p className="mt-5 border-t border-zinc-200 pt-4 text-sm text-zinc-600 dark:border-zinc-800 dark:text-zinc-400">
                  <span className="font-semibold text-zinc-900 dark:text-zinc-100">{t('usesLabel')}</span>
                  {scenario.uses}
                </p>
              </article>
            );
          })}
        </div>

        <div className="mt-8 text-center">
          <ExternalLink
            href={docsUrl('bestPractices')}
            medium="scenarios"
            icon
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary-700 hover:text-primary-800 dark:text-primary-200"
          >
            {t('docsCta')}
          </ExternalLink>
        </div>
      </Container>
    </section>
  );
}
