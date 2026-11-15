import { getTranslations } from 'next-intl/server';
import { ArrowRight, BarChart3, BookOpen, Headphones, Workflow } from 'lucide-react';
import { Container } from './ui/Container';
import { SectionHead } from './ui/Section';
import ExternalLink from './ExternalLink';
import { docsUrl } from '@/lib/external-links';

interface ScenariosSectionProps {
  locale: string;
}

interface Scenario {
  title: string;
  tagline: string;
  before: string;
  after: string;
  uses: string;
}

const icons = [BookOpen, Workflow, BarChart3, Headphones];

export default async function ScenariosSection({ locale }: ScenariosSectionProps) {
  const t = await getTranslations({ locale, namespace: 'biz.scenarios' });
  const scenarios = t.raw('items') as Scenario[];
  const more = t.raw('more') as string[];

  return (
    <section id="scenarios" className="scroll-mt-20 bg-zinc-50 py-16 dark:bg-zinc-950 md:py-24">
      <Container>
        <SectionHead eyebrow={t('eyebrow')} title={t('title')} lead={t('subtitle')} center />

        <div className="grid gap-4 md:grid-cols-2">
          {scenarios.map((scenario, i) => {
            const Icon = icons[i % icons.length];
            return (
              <article
                key={scenario.title}
                className="flex flex-col rounded-lg border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 sm:p-7"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-50 text-primary-700 dark:bg-primary-950/60 dark:text-primary-200">
                    <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
                  </span>
                  <h3 className="text-xl font-semibold text-zinc-950 dark:text-white">{scenario.title}</h3>
                </div>
                <p className="mt-3 text-base leading-7 text-zinc-700 dark:text-zinc-300">{scenario.tagline}</p>

                <dl className="mt-5 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-md bg-zinc-50 p-4 dark:bg-white/5">
                    <dt className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">{t('beforeLabel')}</dt>
                    <dd className="mt-1 text-sm leading-6 text-zinc-600 dark:text-zinc-400">{scenario.before}</dd>
                  </div>
                  <div className="rounded-md bg-primary-50 p-4 dark:bg-primary-950/30">
                    <dt className="text-xs font-semibold text-primary-700 dark:text-primary-200">{t('afterLabel')}</dt>
                    <dd className="mt-1 text-sm leading-6 text-zinc-800 dark:text-zinc-200">{scenario.after}</dd>
                  </div>
                </dl>

                <p className="mt-5 text-sm text-zinc-500 dark:text-zinc-400">
                  <span className="font-semibold text-zinc-700 dark:text-zinc-300">{t('usesLabel')}</span>
                  <span className="mx-2 text-zinc-300 dark:text-zinc-600">|</span>
                  {scenario.uses}
                </p>
              </article>
            );
          })}
        </div>

        <div className="mt-8 flex flex-col gap-4 rounded-lg border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900 lg:flex-row lg:items-center">
          <span className="shrink-0 text-sm font-semibold text-zinc-950 dark:text-white">{t('moreTitle')}</span>
          <ul className="flex flex-wrap gap-2">
            {more.map((item) => (
              <li
                key={item}
                className="rounded-full bg-zinc-100 px-3 py-1 text-sm text-zinc-700 dark:bg-white/10 dark:text-zinc-300"
              >
                {item}
              </li>
            ))}
          </ul>
          <ExternalLink
            href={docsUrl('bestPractices')}
            medium="scenarios"
            className="inline-flex shrink-0 items-center gap-1 text-sm font-semibold text-primary-700 hover:text-primary-800 dark:text-primary-200 lg:ml-auto"
          >
            {t('docsCta')}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </ExternalLink>
        </div>
      </Container>
    </section>
  );
}
