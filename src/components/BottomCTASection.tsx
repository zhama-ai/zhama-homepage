import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import { Container } from './ui/Container';
import { ArrowRight } from 'lucide-react';

interface BottomCTASectionProps {
  locale: string;
}

export default async function BottomCTASection({ locale }: BottomCTASectionProps) {
  const t = await getTranslations({ locale, namespace: 'bottomCTA' });

  return (
    <section
      id="cta"
      className="border-t border-zinc-200 bg-white py-16 dark:border-white/10 dark:bg-zinc-900 md:py-24"
    >
      <Container>
        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p className="text-sm font-semibold text-primary-700 dark:text-primary-200">
              TeGo OS
            </p>
            <h2 className="mt-3 max-w-3xl text-3xl font-bold tracking-normal text-zinc-950 dark:text-white md:text-4xl">
              {t('title')}
            </h2>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-zinc-600 dark:text-zinc-400">
              {t('description')}
            </p>
          </div>

          <div className="flex flex-wrap gap-3 lg:justify-end">
            <Link
              href={`/${locale}/contact`}
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg bg-primary-700 px-6 py-3 text-base font-semibold text-white shadow-md shadow-primary-950/10 transition-all duration-300 hover:bg-primary-800 hover:shadow-lg active:scale-95"
            >
              {t('primaryCTA')}
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href={`/${locale}/contact`}
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg border border-zinc-300 bg-white px-6 py-3 text-base font-semibold text-zinc-900 transition-all duration-300 hover:bg-zinc-50 active:scale-95 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50 dark:hover:bg-zinc-800"
            >
              {t('secondaryCTA')}
            </Link>
          </div>
        </div>
        <p className="mt-8 text-sm text-zinc-500 dark:text-zinc-400">{t('hint')}</p>
      </Container>
    </section>
  );
}
