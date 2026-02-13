import { getTranslations } from 'next-intl/server';
import { Container } from './ui/Container';

interface ProductOverviewSectionProps {
  locale: string;
}

export default async function ProductOverviewSection({ locale }: ProductOverviewSectionProps) {
  const t = await getTranslations({ locale, namespace: 'productOverview' });

  const capabilities = ['0', '1', '2', '3'];

  return (
    <section id="overview" className="py-20 md:py-28 bg-zinc-50 dark:bg-zinc-950">
      <Container>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-zinc-50 leading-tight">
            {t('title')}
          </h2>
          <p className="mt-6 text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
            {t('description')}
          </p>
        </div>

        <div className="mt-12 max-w-4xl mx-auto">
          <div className="relative p-8 md:p-10 rounded-2xl bg-gradient-to-br from-primary-50 to-primary-100/50 dark:from-primary-950/40 dark:to-primary-900/20 border border-primary-200 dark:border-primary-800">
            <div className="absolute top-0 right-0 w-40 h-40 bg-primary-500/5 rounded-full blur-3xl" />
            <p className="relative text-lg md:text-xl text-zinc-800 dark:text-zinc-200 leading-relaxed font-medium">
              {t('highlight')}
            </p>
          </div>
        </div>

        <div className="mt-12 flex flex-wrap justify-center gap-4">
          {capabilities.map((idx) => (
            <div
              key={idx}
              className="flex items-center gap-2 px-6 py-3 rounded-full bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 shadow-sm"
            >
              <svg className="w-5 h-5 text-primary-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                {t(`capabilities.${idx}`)}
              </span>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
