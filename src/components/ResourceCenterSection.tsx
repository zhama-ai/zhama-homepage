import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight,
  BookOpen,
  Download,
  FileCog,
  FileText,
  Lightbulb,
  Newspaper,
  PlayCircle,
  Rocket,
} from 'lucide-react';
import { Container } from './ui/Container';
import { SectionHead } from './ui/Section';
import { Card } from './ui/Card';
import ExternalLink from './ExternalLink';
import { docsUrl, type DocsPage } from '@/lib/external-links';

interface ResourceCenterSectionProps {
  locale: string;
}

type ResourceItem =
  | { key: string; icon: typeof BookOpen; docs: DocsPage }
  | { key: string; icon: typeof BookOpen; href: string };

const items: ResourceItem[] = [
  { key: 'quickStart', icon: Rocket, docs: 'quickStart' },
  { key: 'bestPractices', icon: Lightbulb, docs: 'bestPractices' },
  { key: 'deploy', icon: FileCog, docs: 'deploy' },
  { key: 'videos', icon: PlayCircle, docs: 'videos' },
  { key: 'downloads', icon: Download, docs: 'downloads' },
  { key: 'releaseNotes', icon: FileText, docs: 'releaseNotes' },
  { key: 'blog', icon: Newspaper, href: '/blog' },
  { key: 'whitepaper', icon: BookOpen, href: '/contact' },
];

export default async function ResourceCenterSection({ locale }: ResourceCenterSectionProps) {
  const t = await getTranslations({ locale, namespace: 'biz.resources' });

  return (
    <section id="resources" className="scroll-mt-20 bg-white py-16 dark:bg-zinc-900 md:py-24">
      <Container>
        <SectionHead eyebrow={t('eyebrow')} title={t('title')} lead={t('subtitle')} center />

        <ExternalLink
          href={docsUrl()}
          medium="resources_banner"
          className="group mb-6 flex flex-col gap-5 rounded-2xl border border-primary-200 bg-primary-50 p-6 transition-colors hover:border-primary-300 dark:border-primary-800/70 dark:bg-primary-950/30 sm:flex-row sm:items-center sm:justify-between sm:p-8"
        >
          <div className="flex items-start gap-4">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary-700 text-white">
              <BookOpen className="h-6 w-6" aria-hidden="true" />
            </span>
            <div>
              <h3 className="text-lg font-bold text-zinc-950 dark:text-white sm:text-xl">{t('docsBanner.title')}</h3>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-zinc-600 dark:text-zinc-300">
                {t('docsBanner.description')}
              </p>
            </div>
          </div>
          <span className="inline-flex shrink-0 items-center gap-2 self-start rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-semibold text-white transition-colors group-hover:bg-primary-800 sm:self-center">
            {t('docsBanner.cta')}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </span>
        </ExternalLink>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => {
            const Icon = item.icon;
            const card = (
              <Card hover className="group flex h-full flex-col">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary-50 text-primary-700 dark:bg-primary-950/60 dark:text-primary-200">
                  <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
                </div>
                <h3 className="mt-5 text-lg font-semibold text-zinc-950 dark:text-white">
                  {t(`items.${item.key}.title`)}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                  {t(`items.${item.key}.description`)}
                </p>
                <div className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary-700 transition-colors group-hover:text-primary-800 dark:text-primary-200">
                  {t(`items.${item.key}.cta`)}
                  <ArrowRight className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
                </div>
              </Card>
            );

            return 'docs' in item ? (
              <ExternalLink key={item.key} href={docsUrl(item.docs)} medium="resources" className="block">
                {card}
              </ExternalLink>
            ) : (
              <Link key={item.key} href={`/${locale}${item.href}`} className="block">
                {card}
              </Link>
            );
          })}
        </div>

        <Link
          href={`/${locale}/cloud-agent`}
          className="group mt-8 grid overflow-hidden rounded-2xl bg-[#07131f] text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-600 md:grid-cols-[1fr_0.9fr]"
        >
          <div className="flex flex-col justify-center p-7 sm:p-9">
            <p className="text-sm font-semibold text-sky-300">{t('feature.eyebrow')}</p>
            <h3 className="mt-3 text-2xl font-bold leading-tight sm:text-3xl">{t('feature.title')}</h3>
            <p className="mt-4 max-w-xl leading-7 text-slate-200">{t('feature.description')}</p>
            <span className="mt-6 inline-flex items-center gap-2 font-semibold text-sky-300 group-hover:text-sky-200">
              {t('feature.cta')}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </span>
          </div>
          <div className="relative min-h-56 md:min-h-72">
            <Image
              src="/images/cloud-agent/hero.png"
              alt={t('feature.imageAlt')}
              fill
              sizes="(max-width: 768px) 100vw, 45vw"
              className="object-cover"
            />
          </div>
        </Link>
      </Container>
    </section>
  );
}
