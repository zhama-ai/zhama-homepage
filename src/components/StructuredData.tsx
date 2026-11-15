import { SITE_URL } from '@/lib/seo';
import { DOCS_URL } from '@/lib/external-links';

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
          url: `${SITE_URL}/zhama-logo/zhama-horizontal-transparent-light-v5.svg`,
        },
        description: isZh
          ? 'TeGo 企业 AI 数字员工平台：让 AI 数字员工直接在企业系统里办事、交出可检查的结果，支持私有化部署；同时通过 TeGo Cloud 为全球个人和团队提供云服务。'
          : 'TeGo provides AI digital employees that work inside business systems and deliver checkable results, with private deployment for enterprises and TeGo Cloud for individuals and teams worldwide.',
        address: {
          '@type': 'PostalAddress',
          addressCountry: 'CN',
          addressRegion: 'Guangdong',
          addressLocality: 'Shenzhen',
        },
        contactPoint: {
          '@type': 'ContactPoint',
          contactType: 'sales',
          email: 'contact@zhama.com',
          url: `${SITE_URL}/${locale}/contact`,
          availableLanguage: ['zh-CN', 'en-US'],
        },
        sameAs: [DOCS_URL, 'https://zhama.ai'],
      },
      {
        '@type': 'WebSite',
        '@id': websiteId,
        name: isZh ? 'TeGo 企业 AI 数字员工平台' : 'TeGo AI Digital Employee Platform',
        url: SITE_URL,
        inLanguage: ['zh-CN', 'en-US'],
        publisher: { '@id': organizationId },
      },
      {
        '@type': 'SoftwareApplication',
        '@id': `${SITE_URL}/${locale}#enterprise`,
        name: isZh ? 'TeGo 企业版' : 'TeGo Enterprise',
        description: isZh
          ? '可私有化部署的企业 AI 数字员工平台：岗位职责清楚、按需授权、重要操作人工确认、每一步都有记录。'
          : 'Privately deployable AI digital employees with clear roles, least-privilege access, human approval and a full audit trail.',
        url: `${SITE_URL}/${locale}`,
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'Linux, Docker, Kubernetes',
        softwareHelp: { '@type': 'CreativeWork', url: DOCS_URL },
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
