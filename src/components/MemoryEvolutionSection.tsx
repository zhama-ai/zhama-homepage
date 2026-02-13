import { getTranslations } from 'next-intl/server';
import { Container } from './ui/Container';

interface MemoryEvolutionSectionProps {
  locale: string;
}

const dimensionConfig = [
  { key: 'context', color: 'from-blue-500 to-cyan-500', bg: 'bg-blue-50 dark:bg-blue-950/30', iconColor: 'text-blue-600 dark:text-blue-400' },
  { key: 'preference', color: 'from-violet-500 to-purple-500', bg: 'bg-violet-50 dark:bg-violet-950/30', iconColor: 'text-violet-600 dark:text-violet-400' },
  { key: 'identity', color: 'from-emerald-500 to-teal-500', bg: 'bg-emerald-50 dark:bg-emerald-950/30', iconColor: 'text-emerald-600 dark:text-emerald-400' },
  { key: 'experience', color: 'from-amber-500 to-orange-500', bg: 'bg-amber-50 dark:bg-amber-950/30', iconColor: 'text-amber-600 dark:text-amber-400' },
] as const;

const dimensionIcons: Record<string, React.ReactNode> = {
  context: (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
    </svg>
  ),
  preference: (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
    </svg>
  ),
  identity: (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z" />
    </svg>
  ),
  experience: (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
    </svg>
  ),
};

export default async function MemoryEvolutionSection({ locale }: MemoryEvolutionSectionProps) {
  const t = await getTranslations({ locale, namespace: 'memoryEvolution' });

  return (
    <section id="memory" className="py-20 md:py-28 bg-white dark:bg-zinc-900">
      <Container>
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-zinc-50">
            {t('title')}
          </h2>
          <p className="mt-3 text-xl font-medium text-primary-600 dark:text-primary-400">
            {t('subtitle')}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto mb-12">
          {dimensionConfig.map((dim) => (
            <div
              key={dim.key}
              className={`relative p-6 rounded-2xl ${dim.bg} border border-zinc-200 dark:border-zinc-700/50 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1`}
            >
              <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white dark:bg-zinc-800 shadow-sm mb-4 ${dim.iconColor}`}>
                {dimensionIcons[dim.key]}
              </div>
              <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 mb-2">
                {t(`dimensions.${dim.key}.title`)}
              </h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                {t(`dimensions.${dim.key}.description`)}
              </p>
            </div>
          ))}
        </div>

        <div className="max-w-2xl mx-auto text-center">
          <div className="inline-block px-6 py-3 rounded-xl bg-gradient-to-r from-primary-50 to-primary-100 dark:from-primary-950/40 dark:to-primary-900/20 border border-primary-200 dark:border-primary-800">
            <p className="text-base font-semibold text-primary-700 dark:text-primary-300">
              {t('description')}
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
