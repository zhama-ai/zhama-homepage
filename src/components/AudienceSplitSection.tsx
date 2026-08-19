import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import { ArrowRight, Building2, Check, Cloud } from 'lucide-react';
import CloudLink from './CloudLink';
import { Container } from './ui/Container';
import { SectionHead } from './ui/Section';

interface AudienceSplitSectionProps {
  locale: string;
}

export default async function AudienceSplitSection({ locale }: AudienceSplitSectionProps) {
  const t = await getTranslations({ locale, namespace: 'biz.audienceSplit' });
  const privateFeatures = t.raw('private.features') as string[];
  const cloudFeatures = t.raw('cloud.features') as string[];

  const featureList = (features: string[]) => (
    <ul className="mt-6 grid gap-3 sm:grid-cols-2">
      {features.map((feature) => (
        <li
          key={feature}
          className="flex items-start gap-2 text-sm leading-6 text-zinc-700 dark:text-zinc-300"
        >
          <Check className="mt-1 h-4 w-4 shrink-0 text-primary-700 dark:text-primary-200" />
          <span>{feature}</span>
        </li>
      ))}
    </ul>
  );

  return (
    <section id="choose" className="bg-white py-16 dark:bg-zinc-900 md:py-24">
      <Container>
        <SectionHead title={t('title')} lead={t('subtitle')} center />

        <div className="grid gap-5 lg:grid-cols-2">
          <article className="relative overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-50 p-7 shadow-sm dark:border-zinc-800 dark:bg-zinc-950 sm:p-9">
            <div className="absolute -right-20 -top-20 h-52 w-52 rounded-full bg-primary-300/10 blur-3xl" />
            <div className="relative">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-700 text-white shadow-md">
                <Building2 className="h-6 w-6" />
              </span>
              <p className="mt-6 text-xs font-semibold uppercase tracking-[0.18em] text-primary-700 dark:text-primary-200">
                {t('private.eyebrow')}
              </p>
              <h3 className="mt-2 text-2xl font-bold text-zinc-950 dark:text-white">
                {t('private.title')}
              </h3>
              <p className="mt-3 max-w-xl text-sm leading-7 text-zinc-600 dark:text-zinc-400">
                {t('private.description')}
              </p>
              {featureList(privateFeatures)}
              <Link
                href={`/${locale}/contact`}
                className="mt-8 inline-flex items-center gap-2 rounded-lg bg-primary-700 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-800"
              >
                {t('private.cta')}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </article>

          <article className="relative overflow-hidden rounded-2xl border border-primary-200 bg-primary-50/60 p-7 shadow-sm dark:border-primary-800/70 dark:bg-primary-950/25 sm:p-9">
            <div className="absolute -right-16 -top-16 h-52 w-52 rounded-full bg-accent-300/20 blur-3xl" />
            <div className="relative">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-zinc-950 text-white shadow-md dark:bg-white dark:text-zinc-950">
                <Cloud className="h-6 w-6" />
              </span>
              <p className="mt-6 text-xs font-semibold uppercase tracking-[0.18em] text-primary-700 dark:text-primary-200">
                {t('cloud.eyebrow')}
              </p>
              <h3 className="mt-2 text-2xl font-bold text-zinc-950 dark:text-white">
                {t('cloud.title')}
              </h3>
              <p className="mt-3 max-w-xl text-sm leading-7 text-zinc-600 dark:text-zinc-400">
                {t('cloud.description')}
              </p>
              {featureList(cloudFeatures)}
              <CloudLink
                medium="audience_split"
                locale={locale}
                className="mt-8 inline-flex items-center gap-2 rounded-lg bg-zinc-950 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-zinc-800 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200"
              >
                {t('cloud.cta')}
                <ArrowRight className="h-4 w-4" />
              </CloudLink>
            </div>
          </article>
        </div>
      </Container>
    </section>
  );
}
