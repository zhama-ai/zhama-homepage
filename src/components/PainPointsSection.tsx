import { getTranslations } from 'next-intl/server';
import { Container } from './ui/Container';

interface PainPointsSectionProps {
  locale: string;
}

export default async function PainPointsSection({ locale }: PainPointsSectionProps) {
  const t = await getTranslations({ locale, namespace: 'painPoints' });

  const items = [
    { key: 'island', color: 'text-red-500 dark:text-red-400', bg: 'bg-red-50 dark:bg-red-950/30', border: 'border-red-200 dark:border-red-900' },
    { key: 'unmanaged', color: 'text-amber-500 dark:text-amber-400', bg: 'bg-amber-50 dark:bg-amber-950/30', border: 'border-amber-200 dark:border-amber-900' },
    { key: 'inefficient', color: 'text-orange-500 dark:text-orange-400', bg: 'bg-orange-50 dark:bg-orange-950/30', border: 'border-orange-200 dark:border-orange-900' },
  ] as const;

  const icons: Record<string, React.ReactNode> = {
    island: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
        <line x1="4" y1="4" x2="20" y2="20" strokeWidth={2} className="text-red-400" />
      </svg>
    ),
    unmanaged: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m0-10.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.75c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.249-8.25-3.286zm0 13.036h.008v.008H12v-.008z" />
      </svg>
    ),
    inefficient: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        <line x1="4" y1="4" x2="20" y2="20" strokeWidth={2} />
      </svg>
    ),
  };

  return (
    <section id="pain-points" className="py-20 md:py-28 bg-white dark:bg-zinc-900">
      <Container>
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-zinc-50">
            {t('title')}
          </h2>
          <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
            {t('subtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {items.map((item) => (
            <div
              key={item.key}
              className={`relative p-8 rounded-2xl border ${item.border} ${item.bg} transition-all duration-300 hover:shadow-lg hover:-translate-y-1`}
            >
              <div className={`mb-5 ${item.color}`}>
                {icons[item.key]}
              </div>
              <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-50 mb-3">
                {t(`items.${item.key}.title`)}
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                {t(`items.${item.key}.description`)}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
