import { getTranslations } from 'next-intl/server';
import { Container } from './ui/Container';

interface CoreEnginesSectionProps {
  locale: string;
}

const engineConfig = [
  {
    key: 'digitalAvatar',
    num: '01',
    features: ['dualForm', 'multiChannel', 'voiceBrowser', 'crossDevice'],
  },
  {
    key: 'lampEngine',
    num: '02',
    features: ['thinkSpeakDecide', 'dagScheduling', 'experiencePool', 'dynamicReplanning'],
  },
  {
    key: 'mcpEngine',
    num: '03',
    features: ['zeroInvasion', 'pluginEcosystem', 'skillHotPlug', 'oneClickPublish'],
  },
  {
    key: 'governance',
    num: '04',
    features: ['rbac', 'fullChain', 'observability', 'isolation'],
  },
] as const;

const engineIcons: Record<string, React.ReactNode> = {
  digitalAvatar: (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
    </svg>
  ),
  lampEngine: (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
    </svg>
  ),
  mcpEngine: (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 6.087c0-.355.186-.676.401-.959.221-.29.349-.634.349-1.003 0-1.036-1.007-1.875-2.25-1.875s-2.25.84-2.25 1.875c0 .369.128.713.349 1.003.215.283.401.604.401.959v0a.64.64 0 01-.657.643 48.491 48.491 0 01-4.163-.3c.186 1.613.645 3.162 1.35 4.6A15.014 15.014 0 0012 18.75a15.014 15.014 0 004.27-4.342 15.668 15.668 0 001.35-4.6 48.491 48.491 0 01-4.163.3A.64.64 0 0112.75 9.5v0" />
    </svg>
  ),
  governance: (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
    </svg>
  ),
};

export default async function CoreEnginesSection({ locale }: CoreEnginesSectionProps) {
  const t = await getTranslations({ locale, namespace: 'coreEngines' });

  return (
    <section id="engines" className="py-20 md:py-28 bg-white dark:bg-zinc-900">
      <Container>
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-zinc-50">
            {t('title')}
          </h2>
          <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
            {t('subtitle')}
          </p>
        </div>

        <div className="space-y-8">
          {engineConfig.map((engine) => (
            <div
              key={engine.key}
              className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/30 overflow-hidden"
            >
              <div className="p-8 md:p-10">
                {/* Engine Header */}
                <div className="flex flex-col md:flex-row md:items-center gap-4 mb-8">
                  <div className="w-14 h-14 rounded-xl bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-primary-600 dark:text-primary-400">
                    {engineIcons[engine.key]}
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                      <h3 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
                        <span className="text-primary-500 dark:text-primary-400 mr-2">{engine.num}</span>
                        {t(`${engine.key}.title`)}
                      </h3>
                      <span className="inline-block text-sm font-medium px-3 py-1 rounded-full bg-zinc-200 dark:bg-zinc-700 text-zinc-600 dark:text-zinc-300 w-fit">
                        {t(`${engine.key}.tagline`)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Highlight Quote */}
                <div className="mb-8 pl-4 border-l-4 border-primary-400 dark:border-primary-500">
                  <p className="text-lg font-semibold italic text-zinc-700 dark:text-zinc-300">
                    {t(`${engine.key}.highlight`)}
                  </p>
                </div>

                {/* Features Grid */}
                <div className="grid sm:grid-cols-2 gap-4">
                  {engine.features.map((featureKey) => (
                    <div
                      key={featureKey}
                      className="flex gap-4 p-4 rounded-xl bg-white dark:bg-zinc-800 border border-zinc-100 dark:border-zinc-700/50"
                    >
                      <div className="w-2 h-2 rounded-full flex-shrink-0 bg-primary-500 dark:bg-primary-400" style={{ marginTop: '0.5rem' }} />
                      <div>
                        <h4 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-1">
                          {t(`${engine.key}.features.${featureKey}.title`)}
                        </h4>
                        <p className="text-sm text-zinc-600 dark:text-zinc-400">
                          {t(`${engine.key}.features.${featureKey}.description`)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
