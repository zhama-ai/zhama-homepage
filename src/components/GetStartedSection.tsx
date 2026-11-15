import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import { Building2, Check, Cloud, Rocket } from 'lucide-react';
import { Container } from './ui/Container';
import { SectionHead } from './ui/Section';
import CloudLink from './CloudLink';
import ExternalLink from './ExternalLink';
import { docsUrl } from '@/lib/external-links';
import { cloudFirst } from '@/lib/audience';
import { cn } from '@/lib/utils';

interface GetStartedSectionProps {
  locale: string;
}

interface Target {
  value: string;
  label: string;
}

const options = [
  { key: 'cloud', icon: Cloud },
  { key: 'pilot', icon: Rocket },
  { key: 'private', icon: Building2 },
] as const;

const buttonClass =
  'mt-6 inline-flex w-full items-center justify-center rounded-lg px-5 py-2.5 text-sm font-semibold transition-all duration-300 active:scale-95';
const primaryButton = 'bg-primary-700 text-white shadow-md shadow-primary-950/10 hover:bg-primary-800 hover:shadow-lg';
const secondaryButton =
  'border border-zinc-300 bg-white text-zinc-900 hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50 dark:hover:bg-zinc-800';

export default async function GetStartedSection({ locale }: GetStartedSectionProps) {
  const t = await getTranslations({ locale, namespace: 'biz.getStarted' });
  const targets = t.raw('targets.items') as Target[];
  const recommended = cloudFirst(locale) ? 'cloud' : 'pilot';

  return (
    <section id="get-started" className="scroll-mt-20 bg-white py-16 dark:bg-zinc-900 md:py-24">
      <Container>
        <SectionHead eyebrow={t('eyebrow')} title={t('title')} lead={t('subtitle')} center />

        <div className="grid gap-4 md:grid-cols-3">
          {options.map(({ key, icon: Icon }) => {
            const points = t.raw(`options.${key}.points`) as string[];
            const isRecommended = key === recommended;
            const ctaClass = cn(buttonClass, isRecommended ? primaryButton : secondaryButton);
            return (
              <div
                key={key}
                className={cn(
                  'relative flex flex-col rounded-lg border bg-white p-6 shadow-sm dark:bg-zinc-900 sm:p-7',
                  isRecommended
                    ? 'border-primary-400 ring-1 ring-primary-400 dark:border-primary-600 dark:ring-primary-600'
                    : 'border-zinc-200 dark:border-zinc-800',
                )}
              >
                {isRecommended ? (
                  <span className="absolute -top-3 left-6 rounded-md bg-primary-700 px-3 py-1 text-xs font-semibold text-white shadow-md">
                    {t('popularLabel')}
                  </span>
                ) : null}
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-50 text-primary-700 dark:bg-primary-950/60 dark:text-primary-200">
                    <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
                  </span>
                  <h3 className="text-lg font-semibold text-zinc-950 dark:text-white">{t(`options.${key}.title`)}</h3>
                </div>
                <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400">{t(`options.${key}.tagline`)}</p>
                <ul className="mt-5 flex-1 space-y-2.5">
                  {points.map((point) => (
                    <li key={point} className="flex items-start gap-2 text-sm leading-6 text-zinc-700 dark:text-zinc-300">
                      <Check className="mt-1 h-4 w-4 shrink-0 text-primary-700 dark:text-primary-300" aria-hidden="true" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
                {key === 'cloud' ? (
                  <CloudLink medium="delivery" locale={locale} className={ctaClass}>
                    {t(`options.${key}.cta`)}
                  </CloudLink>
                ) : (
                  <Link href={`/${locale}/contact`} className={ctaClass}>
                    {t(`options.${key}.cta`)}
                  </Link>
                )}
                {key !== 'cloud' ? (
                  <ExternalLink
                    href={docsUrl(key === 'pilot' ? 'poc' : 'deploy')}
                    medium="get_started"
                    icon
                    className="mt-3 inline-flex items-center justify-center gap-1 text-sm font-medium text-primary-700 hover:text-primary-800 dark:text-primary-200"
                  >
                    {key === 'pilot' ? t('pilotGuide') : t('deployDocs')}
                  </ExternalLink>
                ) : null}
              </div>
            );
          })}
        </div>

        <div className="mt-8 rounded-lg border border-zinc-200 bg-zinc-50 p-6 dark:border-white/10 dark:bg-white/5">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <h3 className="font-semibold text-zinc-950 dark:text-white">{t('targets.title')}</h3>
            <div className="grid grid-cols-3 gap-4 md:gap-10">
              {targets.map((target) => (
                <div key={target.label}>
                  <div className="text-2xl font-bold text-primary-700 dark:text-primary-200">{target.value}</div>
                  <div className="text-xs text-zinc-600 dark:text-zinc-400">{target.label}</div>
                </div>
              ))}
            </div>
          </div>
          <p className="mt-4 text-xs text-zinc-500 dark:text-zinc-400">{t('targets.note')}</p>
        </div>
      </Container>
    </section>
  );
}
