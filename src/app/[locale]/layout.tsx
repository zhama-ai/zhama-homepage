import type { Metadata } from "next";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Providers } from "@/components/providers";
import { locales } from '@/i18n';
import StructuredData from '@/components/StructuredData';
import BaiduSEO from '@/components/BaiduSEO';

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

  const baseUrl = 'https://zhama.com';
  const currentPath = locale === 'zh' ? '/zh' : '/en';

  return {
    title: {
      default: seo.title || (locale === 'zh' 
        ? 'TeGo-OS智能体操作系统 | 深圳市扎马星辰科技有限公司'
        : 'TeGo AI Agent Platform | Shenzhen Zhama Future Technology Co., Ltd.'),
      template: locale === 'zh'
        ? `%s | ${messages?.home?.hero?.title || 'TeGo-OS智能体操作系统'}`
        : `%s | ${messages?.home?.hero?.title || 'TeGo AI Agent Platform'}`
    },
    description: seo.description || (locale === 'zh'
      ? '深圳市扎马星辰科技有限公司官方平台：TeGo-OS智能体操作系统与企业级AI解决方案'
      : 'Shenzhen Zhama Future Technology Co., Ltd. official platform: TeGo AI Agent Platform and enterprise AI solutions'),
    keywords: seo.keywords || (locale === 'zh'
      ? 'TeGo, 智能体, AI Agent, 企业智能, 私有化部署, MCP 框架, 深圳扎马, 人工智能, 企业级AI, 智能化解决方案'
      : 'TeGo, AI Agent, Enterprise Intelligence, Private Deployment, MCP Framework, Zhama Technology, Artificial Intelligence, Enterprise AI, Intelligent Solutions'),
    authors: [{ name: 'Shenzhen Zhama Future Technology Co., Ltd.' }],
    creator: 'Shenzhen Zhama Future Technology Co., Ltd.',
    publisher: 'Shenzhen Zhama Future Technology Co., Ltd.',
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      title: seo.openGraph?.title || seo.title || (locale === 'zh' 
        ? 'TeGo-OS智能体操作系统 | 深圳市扎马星辰科技有限公司'
        : 'TeGo AI Agent Platform | Shenzhen Zhama Future Technology Co., Ltd.'),
      description: seo.openGraph?.description || seo.description,
      siteName: messages?.home?.hero?.title || (locale === 'zh' ? 'TeGo-OS 智能体操作系统' : 'TeGo AI Agent Platform'),
      type: 'website',
      locale: locale === 'zh' ? 'zh_CN' : 'en_US',
      url: `${baseUrl}${currentPath}`,
      images: [
        {
          url: `${baseUrl}/images/home.png`,
          width: 1200,
          height: 630,
          alt: locale === 'zh' ? 'TeGo-OS智能体操作系统平台展示' : 'TeGo AI Agent Platform Display',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: seo.twitter?.title || seo.title,
      description: seo.twitter?.description || seo.description,
      images: [`${baseUrl}/images/home.png`],
      creator: '@ZhamaFuture',
    },
    icons: {
      icon: [
        { url: '/favicon.ico', sizes: 'any' },
        { url: '/favicon.svg', type: 'image/svg+xml' }
      ],
      apple: '/favicon.svg',
    },
    manifest: '/manifest.json',
    alternates: {
      canonical: `${baseUrl}${currentPath}`,
      languages: {
        'zh-CN': `${baseUrl}/zh`,
        'en-US': `${baseUrl}/en`
      }
    },
    verification: {
      // Add verification codes for search engines when available
      // To get these codes:
      // Google: https://search.google.com/search-console -> Add property -> HTML tag method
      // Bing: https://www.bing.com/webmasters -> Add site -> HTML tag method
      // 
      // Uncomment and replace with actual verification codes:
      // google: 'your-google-verification-code',
      // bing: 'your-bing-verification-code',
      // yandex: 'your-yandex-verification-code',
    },
    category: 'technology',
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
        <StructuredData />
        <BaiduSEO />
        {children}
      </Providers>
    </NextIntlClientProvider>
  );
}
