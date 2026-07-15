import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Check } from 'lucide-react';
import { Container } from './ui/Container';

interface StationTeaserSectionProps {
  locale: string;
}

export default async function StationTeaserSection({ locale }: StationTeaserSectionProps) {
  const t = await getTranslations({ locale, namespace: 'station.teaser' });
  const highlights = t.raw('highlights') as string[];

  return (
    <section
      id="station"
      className="border-y border-zinc-200 bg-white py-16 dark:border-white/10 dark:bg-zinc-900 md:py-24"
    >
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <p className="text-sm font-semibold text-primary-700 dark:text-primary-200">
              {t('eyebrow')}
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-normal text-zinc-950 dark:text-white md:text-4xl">
              {t('title')}
            </h2>
            <p className="mt-4 max-w-xl text-lg leading-8 text-zinc-600 dark:text-zinc-400">
              {t('description')}
            </p>

            <ul className="mt-6 space-y-3">
              {highlights.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2.5 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300"
                >
                  <Check
                    className="mt-0.5 h-4 w-4 shrink-0 text-accent-600 dark:text-accent-300"
                    strokeWidth={2.5}
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href={`/${locale}/station`}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary-700 px-6 py-3 text-base font-semibold text-white shadow-md shadow-primary-950/10 transition-all duration-300 hover:bg-primary-800 hover:shadow-lg active:scale-95"
              >
                {t('primaryCta')}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href={`/${locale}/contact`}
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-zinc-300 bg-white px-6 py-3 text-base font-semibold text-zinc-900 transition-all duration-300 hover:bg-zinc-50 active:scale-95 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50 dark:hover:bg-zinc-800"
              >
                {t('secondaryCta')}
              </Link>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-lg border border-zinc-200 bg-zinc-100 shadow-lg dark:border-zinc-700 dark:bg-zinc-800">
            <Image
              src="/images/ztc-01.png"
              alt={t('imageAlt')}
              width={1024}
              height={1024}
              className="h-auto w-full object-cover"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
