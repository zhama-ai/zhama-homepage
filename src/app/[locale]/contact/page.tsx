import { getTranslations, getMessages } from 'next-intl/server';
import type { Metadata } from 'next';
import Header from '@/components/Header';
import FooterSection from '@/components/FooterSection';
import ContactForm from '@/components/ContactForm';
import { Container } from '@/components/ui/Container';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const messages = await getMessages({ locale }) as any;
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
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-16 md:py-24 bg-white dark:bg-zinc-900 relative overflow-hidden">
          <div className="absolute inset-0 bg-grid opacity-20" />
          <Container className="relative z-10">
            <div className="text-center space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-zinc-50">
                {t('title')}
              </h1>
              <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
                {t('subtitle')}
              </p>
            </div>
          </Container>
        </section>

        {/* Contact Form Section */}
        <section className="py-16 bg-zinc-100 dark:bg-zinc-900">
          <Container>
            <div className="max-w-2xl mx-auto">
              <ContactForm />
            </div>
          </Container>
        </section>
      </main>

      <FooterSection locale={locale} />
    </div>
  );
}
