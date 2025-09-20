import type { Metadata } from "next";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Providers } from "@/components/providers";
import { locales } from '@/i18n';

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  // Ensure that the incoming `locale` is valid
  if (!locales.includes(locale as any)) {
    notFound();
  }

  // Get messages for SEO metadata
  const messages = await getMessages({ locale }) as any;
  
  // Extract SEO-specific translations from the seo section
  const seo = messages?.seo || {};

  return {
    title: {
      default: seo.title || (locale === 'zh' 
        ? 'TeGo-AI智能体操作系统 | 深圳市扎马未来科技有限公司'
        : 'TeGo AI Agent Platform | Shenzhen Zhama Future Technology Co., Ltd.'),
      template: locale === 'zh'
        ? `%s | ${messages?.home?.hero?.title || 'TeGo-AI智能体操作系统'}`
        : `%s | ${messages?.home?.hero?.title || 'TeGo AI Agent Platform'}`
    },
    description: seo.description || (locale === 'zh'
      ? '深圳市扎马未来科技有限公司官方平台：TeGo-AI智能体操作系统与企业级AI解决方案'
      : 'Shenzhen Zhama Future Technology Co., Ltd. official platform: TeGo AI Agent Platform and enterprise AI solutions'),
    keywords: seo.keywords || (locale === 'zh'
      ? 'TeGo, 智能体, AI Agent, 企业智能, 私有化部署, MCP 框架'
      : 'TeGo, AI Agent, Enterprise Intelligence, Private Deployment, MCP Framework'),
    openGraph: {
      title: seo.openGraph?.title || seo.title,
      description: seo.openGraph?.description || seo.description,
      siteName: messages?.home?.hero?.title || (locale === 'zh' ? 'TeGo-AI 智能体操作系统' : 'TeGo AI Agent Platform'),
      type: 'website',
      locale: locale === 'zh' ? 'zh_CN' : 'en_US'
    },
    twitter: {
      card: 'summary_large_image',
      title: seo.twitter?.title || seo.title,
      description: seo.twitter?.description || seo.description
    },
    icons: {
      icon: [
        { url: '/favicon.ico', sizes: 'any' },
        { url: '/favicon.svg', type: 'image/svg+xml' }
      ]
    },
    alternates: {
      canonical: locale === 'zh' ? '/zh' : '/en',
      languages: {
        'zh-CN': '/zh',
        'en-US': '/en'
      }
    }
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  // Ensure that the incoming `locale` is valid

  console.log('LocaleLayout - locale:', locale, 'locales:', locales);
  if (!locales.includes(locale as any)) {
    notFound();
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages({ locale });

  return (
    <NextIntlClientProvider messages={messages} locale={locale}>
      <Providers>
        {children}
      </Providers>
    </NextIntlClientProvider>
  );
}
