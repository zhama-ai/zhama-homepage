import { getTranslations } from 'next-intl/server';
import { Container } from './ui/Container';

interface ScenariosSectionProps {
  locale: string;
}

const scenarioKeys = ['enterprise', 'finance', 'manufacturing', 'government'] as const;

const scenarioColors = [
  { bg: 'bg-blue-50 dark:bg-blue-950/20', border: 'border-blue-200 dark:border-blue-800', badge: 'bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300', icon: 'text-blue-600 dark:text-blue-400' },
  { bg: 'bg-amber-50 dark:bg-amber-950/20', border: 'border-amber-200 dark:border-amber-800', badge: 'bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300', icon: 'text-amber-600 dark:text-amber-400' },
  { bg: 'bg-emerald-50 dark:bg-emerald-950/20', border: 'border-emerald-200 dark:border-emerald-800', badge: 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300', icon: 'text-emerald-600 dark:text-emerald-400' },
  { bg: 'bg-violet-50 dark:bg-violet-950/20', border: 'border-violet-200 dark:border-violet-800', badge: 'bg-violet-100 dark:bg-violet-900/40 text-violet-700 dark:text-violet-300', icon: 'text-violet-600 dark:text-violet-400' },
] as const;

const scenarioIcons = [
  <svg key="enterprise" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" /></svg>,
  <svg key="finance" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z" /></svg>,
  <svg key="manufacturing" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17l-5.1-3.06a1.5 1.5 0 00-2.32 1.26v3.96a1.5 1.5 0 002.32 1.26l5.1-3.06a1.5 1.5 0 000-2.52zM20.25 7.5l-5.1-3.06a1.5 1.5 0 00-2.32 1.26V9.3M20.25 7.5v3.38a1.5 1.5 0 01-.75 1.3l-5.1 2.94" /></svg>,
  <svg key="government" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" /></svg>,
];

export default async function ScenariosSection({ locale }: ScenariosSectionProps) {
  const t = await getTranslations({ locale, namespace: 'scenarios' });

  return (
    <section id="scenarios" className="py-20 md:py-28 bg-white dark:bg-zinc-900">
      <Container>
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-zinc-50">
            {t('title')}
          </h2>
          <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
            {t('subtitle')}
          </p>
        </div>

        {/* Scenario Cards */}
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto mb-16">
          {scenarioKeys.map((key, idx) => (
            <div
              key={key}
              className={`p-6 md:p-8 rounded-2xl border ${scenarioColors[idx].border} ${scenarioColors[idx].bg} hover:shadow-lg transition-all duration-300`}
            >
              <div className="flex items-start gap-4 mb-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${scenarioColors[idx].badge}`}>
                  {scenarioIcons[idx]}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
                    {t(`items.${key}.title`)}
                  </h3>
                  <span className={`inline-block text-xs font-medium mt-1 px-2 py-0.5 rounded-full ${scenarioColors[idx].badge}`}>
                    {t(`items.${key}.role`)}
                  </span>
                </div>
              </div>
              <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed mb-4">
                {t(`items.${key}.description`)}
              </p>
              <div className="flex items-center gap-2 pt-3 border-t border-zinc-200/60 dark:border-zinc-700/60">
                <svg className={`w-4 h-4 ${scenarioColors[idx].icon}`} fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                </svg>
                <span className={`text-sm font-semibold ${scenarioColors[idx].icon}`}>
                  {t(`items.${key}.effect`)}
                </span>
              </div>
            </div>
          ))}
        </div>

      </Container>
    </section>
  );
}
