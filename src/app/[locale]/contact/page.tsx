import { getTranslations, getMessages } from 'next-intl/server';
import type { Metadata } from 'next';
import Header from '@/components/Header';
import FooterSection from '@/components/FooterSection';
import ContactForm from '@/components/ContactForm';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  // Get messages for SEO metadata
  const messages = await getMessages({ locale }) as any;
  
  // Extract contact page SEO-specific translations
  const contactSeo = messages?.contactPage?.seo || {};

  return {
    title: contactSeo.title || (locale === 'zh' 
      ? '联系我们 - TeGo AI智能体操作系统' 
      : 'Contact Us - TeGo AI Agent Platform'),
    description: contactSeo.description || (locale === 'zh' 
      ? '联系TeGo AI智能体操作系统团队，获取企业级AI解决方案咨询服务。'
      : 'Contact TeGo AI Agent Platform team for enterprise AI solution consultation.'),
    keywords: contactSeo.keywords || (locale === 'zh'
      ? 'TeGo, 联系我们, 智能体平台, 企业AI, 技术支持'
      : 'TeGo, contact us, AI agent platform, enterprise AI, technical support'),
    openGraph: {
      title: contactSeo.openGraph?.title || contactSeo.title,
      description: contactSeo.openGraph?.description || contactSeo.description,
      type: 'website',
      locale: locale === 'zh' ? 'zh_CN' : 'en_US'
    },
    twitter: {
      card: 'summary_large_image',
      title: contactSeo.title,
      description: contactSeo.description
    }
  };
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations('contactPage');

  return (
    <div className="min-h-screen bg-light-200 bg-light-grid-pattern dark:bg-dark-900 dark:bg-grid-pattern overflow-x-hidden">
      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-16 sm:py-20 md:py-24 bg-white dark:bg-dark-900 relative overflow-hidden">
          <div className="absolute inset-0 bg-light-grid-pattern dark:bg-grid-pattern opacity-5"></div>
          <div className="w-full px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-12">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-light-700 dark:text-white mb-6">
                {t('title')}
              </h1>
              <p className="text-lg text-light-600 dark:text-dark-400 max-w-2xl mx-auto">
                {t('subtitle')}
              </p>
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="py-16 bg-light-100 dark:bg-dark-800">
          <div className="w-full px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto">
              <ContactForm />
            </div>
          </div>
        </section>
      </main>

      <FooterSection locale={locale} />
    </div>
  );
}