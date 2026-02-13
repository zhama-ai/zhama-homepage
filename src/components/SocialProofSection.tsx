import { getTranslations } from 'next-intl/server';
import { Container } from './ui/Container';

interface SocialProofSectionProps {
  locale: string;
}

const metricKeys = ['efficiency', 'availability', 'auditability', 'onboarding'] as const;

const metricColors = [
  'from-blue-600 to-cyan-500',
  'from-emerald-600 to-teal-500',
  'from-violet-600 to-purple-500',
  'from-amber-600 to-orange-500',
] as const;

export default async function SocialProofSection({ locale }: SocialProofSectionProps) {
  const t = await getTranslations({ locale, namespace: 'socialProof' });

  return (
    <section id="proof" className="py-20 md:py-28 bg-zinc-900 dark:bg-zinc-950">
      <Container>
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            {t('title')}
          </h2>
          <p className="mt-4 text-lg text-zinc-400">
            {t('subtitle')}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {metricKeys.map((key, idx) => (
            <div
              key={key}
              className="text-center p-8 rounded-2xl bg-zinc-800/50 border border-zinc-700/50 hover:border-zinc-600 transition-colors"
            >
              <div className={`text-4xl md:text-5xl font-black bg-gradient-to-r ${metricColors[idx]} bg-clip-text text-transparent mb-3`}>
                {t(`metrics.${key}.value`)}
              </div>
              <div className="text-lg font-semibold text-white mb-2">
                {t(`metrics.${key}.label`)}
              </div>
              <div className="text-sm text-zinc-500">
                {t(`metrics.${key}.description`)}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
