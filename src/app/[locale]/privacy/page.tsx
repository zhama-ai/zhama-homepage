import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { localizedAlternates, localizedOpenGraph } from '@/lib/seo';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'privacy' });
  const description = locale === 'zh'
    ? 'Zhama、TeGo 与 ZhaMa（扎马AI）隐私政策：账号、聊天、附件、会议录音、推送、第三方服务与账号删除。'
    : 'Privacy for Zhama, TeGo and ZhaMa: accounts, chats, attachments, meeting recordings, notifications, service providers and account deletion.';

  return {
    title: t('title'),
    description,
    alternates: localizedAlternates(locale, '/privacy'),
    openGraph: {
      title: t('title'),
      description,
      type: 'website',
      ...localizedOpenGraph(locale, '/privacy'),
    },
  };
}

export default async function PrivacyPolicy({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'privacy' });

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 overflow-x-hidden">
      <main className="animate-fadeIn py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">{t('title')}</h1>
            <p className="text-gray-500 dark:text-gray-400">{t('lastUpdated')}</p>
            <nav aria-label={t('quickLinksLabel')} className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-3">
              <a href="#account-deletion" className="inline-flex min-h-11 items-center py-2 text-blue-700 dark:text-blue-300 underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4">
                {t('deletionLink')}
              </a>
              <a href="#privacy-contact" className="inline-flex min-h-11 items-center py-2 text-blue-700 dark:text-blue-300 underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4">
                {t('contactLink')}
              </a>
            </nav>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 md:p-8 shadow-sm border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 leading-relaxed">
            <section className="mb-8">
              <h2 className="text-xl md:text-2xl font-semibold text-gray-900 dark:text-white mb-4">{t('sections.introduction.title')}</h2>
              <p className="mb-4">{t('sections.introduction.content')}</p>
              <p>{t('sections.introduction.content2')}</p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl md:text-2xl font-semibold text-gray-900 dark:text-white mb-4">{t('sections.collection.title')}</h2>
              <p className="mb-4">{t('sections.collection.content')}</p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                {t.raw('sections.collection.items').map((item: any, index: number) => (
                  <li key={index}>
                    <strong>{item.title}</strong>
                    {item.content}
                  </li>
                ))}
              </ul>
              <p className="mb-4">{t('sections.collection.usageIntro')}</p>
              <ul className="list-disc pl-6 space-y-2">
                {t.raw('sections.collection.usageItems').map((item: string, index: number) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl md:text-2xl font-semibold text-gray-900 dark:text-white mb-4">{t('sections.permissions.title')}</h2>
              <ul className="list-disc pl-6 space-y-2">
                {(t.raw('sections.permissions.items') as string[]).map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl md:text-2xl font-semibold text-gray-900 dark:text-white mb-4">{t('sections.sharing.title')}</h2>
              <p className="mb-4">{t('sections.sharing.content')}</p>
              <ul className="list-disc pl-6 space-y-2">
                {t.raw('sections.sharing.items').map((item: any, index: number) => (
                  <li key={index}>
                    <strong>{item.title}</strong>
                    {item.content}
                  </li>
                ))}
              </ul>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mt-6 mb-3">{t('sections.sharing.linksLabel')}</h3>
              <ul className="list-disc pl-6 space-y-2">
                {(t.raw('sections.sharing.links') as Array<{ title: string; url: string }>).map((item) => (
                  <li key={item.url}>
                    <a href={item.url} className="text-blue-700 dark:text-blue-300 underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4">
                      {item.title}
                    </a>
                  </li>
                ))}
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl md:text-2xl font-semibold text-gray-900 dark:text-white mb-4">{t('sections.security.title')}</h2>
              <p>{t('sections.security.content')}</p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl md:text-2xl font-semibold text-gray-900 dark:text-white mb-4">{t('sections.retention.title')}</h2>
              <p className="mb-4">{t('sections.retention.content')}</p>
              <p>{t('sections.retention.content2')}</p>
            </section>

            <section id="account-deletion" className="mb-8 scroll-mt-8">
              <h2 className="text-xl md:text-2xl font-semibold text-gray-900 dark:text-white mb-4">{t('sections.deletion.title')}</h2>
              <p className="mb-4">{t('sections.deletion.intro')}</p>
              <p className="mb-4">
                <a href={t('sections.deletion.emailHref')} className="inline-flex min-h-11 items-center py-2 text-blue-700 dark:text-blue-300 underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4">
                  {t('sections.deletion.emailAction')}
                </a>
                <br />
                {t('sections.deletion.emailLabel')}
                <a href="mailto:contact@zhama.com" className="break-words text-blue-700 dark:text-blue-300 underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4">contact@zhama.com</a>
              </p>
              <ol className="list-decimal pl-6 mb-4 space-y-3">
                {(t.raw('sections.deletion.steps') as string[]).map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ol>
              <p className="mb-4">{t('sections.deletion.data')}</p>
              <p>{t('sections.deletion.timing')}</p>
            </section>

            <section id="data-rights" className="mb-8 scroll-mt-8">
              <h2 className="text-xl md:text-2xl font-semibold text-gray-900 dark:text-white mb-4">{t('sections.rights.title')}</h2>
              <p className="mb-4">{t('sections.rights.content')}</p>
              <ul className="list-disc pl-6 space-y-2">
                {t.raw('sections.rights.items').map((item: string, index: number) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl md:text-2xl font-semibold text-gray-900 dark:text-white mb-4">{t('sections.children.title')}</h2>
              <p>{t('sections.children.content')}</p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl md:text-2xl font-semibold text-gray-900 dark:text-white mb-4">{t('sections.changes.title')}</h2>
              <p>{t('sections.changes.content')}</p>
            </section>

            <section id="privacy-contact" className="mb-8 scroll-mt-8">
              <h2 className="text-xl md:text-2xl font-semibold text-gray-900 dark:text-white mb-4">{t('sections.contact.title')}</h2>
              <p className="mb-4">{t('sections.contact.content')}</p>
              <ul className="list-disc pl-6 space-y-2">
                {t.raw('sections.contact.items').map((item: string, index: number) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
              <p className="mt-4">{t('sections.contact.response')}</p>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
