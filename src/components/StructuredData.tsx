import { SITE_URL } from '@/lib/seo';

type Props = {
  locale: string;
};

export default function StructuredData({ locale }: Props) {
  const isZh = locale === 'zh';
  const organizationId = `${SITE_URL}/#organization`;
  const websiteId = `${SITE_URL}/#website`;

  const graph = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': organizationId,
        name: isZh
          ? '深圳市扎马未来科技有限公司'
          : 'Shenzhen Zhama Future Technology Co., Ltd.',
        url: SITE_URL,
        logo: {
          '@type': 'ImageObject',
          url: `${SITE_URL}/images/logo_light.png`,
        },
        description: isZh
          ? 'TeGo 为企业提供数字员工私有化部署、定制与 FDE 支持，并通过 TeGo Cloud 为全球个人和团队提供 SaaS 服务。'
          : 'TeGo provides private AI workforce deployment, customization, and FDE support for enterprises, plus self-serve SaaS for individuals and teams worldwide.',
        address: {
          '@type': 'PostalAddress',
          addressCountry: 'CN',
          addressRegion: 'Guangdong',
          addressLocality: 'Shenzhen',
        },
        contactPoint: {
          '@type': 'ContactPoint',
          contactType: 'sales',
          url: `${SITE_URL}/${locale}/contact`,
          availableLanguage: ['zh-CN', 'en-US'],
        },
      },
      {
        '@type': 'WebSite',
        '@id': websiteId,
        name: 'TeGo by Zhama',
        url: SITE_URL,
        inLanguage: ['zh-CN', 'en-US'],
        publisher: { '@id': organizationId },
      },
      {
        '@type': 'SoftwareApplication',
        '@id': `${SITE_URL}/${locale}/cloud#software`,
        name: 'TeGo Cloud',
        description: isZh
          ? '面向个人与团队的数字员工 SaaS，提供 200 多个专家角色，可生成文档、演示、分析等可交付成果。'
          : 'Self-serve AI workforce SaaS for individuals and teams, with more than 200 expert roles that produce documents, presentations, analyses, and other deliverables.',
        url: `${SITE_URL}/${locale}/cloud`,
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'Web, Windows, macOS, Linux',
        offers: [
          {
            '@type': 'Offer',
            name: 'Free',
            price: '0',
            priceCurrency: 'USD',
            url: 'https://zhama.ai/',
            availability: 'https://schema.org/InStock',
          },
          {
            '@type': 'Offer',
            name: 'Pro',
            price: '20',
            priceCurrency: 'USD',
            url: 'https://zhama.ai/',
            availability: 'https://schema.org/InStock',
          },
        ],
        publisher: { '@id': organizationId },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(graph).replace(/</g, '\\u003c'),
      }}
    />
  );
}
