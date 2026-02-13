import { getTranslations } from 'next-intl/server';
import { Container } from './ui/Container';

interface OmniChannelSectionProps {
  locale: string;
}

const channelIcons: Record<string, { label: string; color: string }> = {
  WhatsApp: { label: 'WA', color: 'bg-green-500' },
  Telegram: { label: 'TG', color: 'bg-sky-500' },
  Slack: { label: 'SL', color: 'bg-purple-600' },
  Discord: { label: 'DC', color: 'bg-indigo-500' },
  'Microsoft Teams': { label: 'TM', color: 'bg-blue-600' },
  '微信': { label: 'WX', color: 'bg-green-600' },
  Signal: { label: 'SG', color: 'bg-blue-500' },
  iMessage: { label: 'iM', color: 'bg-teal-500' },
  Matrix: { label: 'MX', color: 'bg-zinc-700' },
  'Google Chat': { label: 'GC', color: 'bg-emerald-500' },
  WebChat: { label: 'WC', color: 'bg-primary-500' },
  '语音对话': { label: 'VC', color: 'bg-rose-500' },
  Voice: { label: 'VC', color: 'bg-rose-500' },
};

export default async function OmniChannelSection({ locale }: OmniChannelSectionProps) {
  const t = await getTranslations({ locale, namespace: 'omniChannel' });

  const channels = [
    'WhatsApp', 'Telegram', 'Slack', 'Discord', 'Microsoft Teams',
    locale === 'zh' ? '微信' : 'WeChat', 'Signal', 'iMessage', 'Matrix',
    'Google Chat', 'WebChat', locale === 'zh' ? '语音对话' : 'Voice',
  ];

  const products = ['desktop', 'web', 'office'] as const;

  return (
    <section id="channels" className="py-20 md:py-28 bg-zinc-50 dark:bg-zinc-950">
      <Container>
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-zinc-50">
            {t('title')}
          </h2>
          <p className="mt-3 text-xl font-medium text-primary-600 dark:text-primary-400">
            {t('subtitle')}
          </p>
          <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
            {t('description')}
          </p>
        </div>

        {/* Channel Grid */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="flex flex-wrap justify-center gap-3">
            {channels.map((channel) => {
              const config = channelIcons[channel] || { label: channel.slice(0, 2), color: 'bg-zinc-500' };
              return (
                <div
                  key={channel}
                  className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className={`w-8 h-8 rounded-lg ${config.color} flex items-center justify-center text-white text-xs font-bold`}>
                    {config.label}
                  </div>
                  <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                    {channel}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Product Coverage */}
        <div className="max-w-4xl mx-auto">
          <h3 className="text-center text-lg font-semibold text-zinc-700 dark:text-zinc-300 mb-8">
            {t('products.title')}
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {products.map((product) => (
              <div
                key={product}
                className="text-center p-6 rounded-xl bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 rounded-xl bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center mx-auto mb-4">
                  {product === 'desktop' && (
                    <svg className="w-6 h-6 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25" />
                    </svg>
                  )}
                  {product === 'web' && (
                    <svg className="w-6 h-6 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
                    </svg>
                  )}
                  {product === 'office' && (
                    <svg className="w-6 h-6 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                    </svg>
                  )}
                </div>
                <h4 className="font-bold text-zinc-900 dark:text-zinc-100 mb-2">
                  {t(`products.${product}.title`)}
                </h4>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  {t(`products.${product}.description`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
