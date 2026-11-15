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
          ? 'TeGo 数字员工执行与治理平台：以安全沙箱、自研运行编排与可信执行，让数字员工在企业私有域内受控工作；同时通过 TeGo Cloud 为全球个人和团队提供 SaaS 服务。'
          : 'TeGo is an execution and governance platform for digital employees, using secure sandboxes, in-house runtime orchestration and trusted execution to run them under control inside the enterprise, plus TeGo Cloud SaaS for individuals and teams worldwide.',
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
        name: isZh ? 'TeGo 数字员工执行与治理平台' : 'TeGo Digital Employee Execution & Governance Platform',
        url: SITE_URL,
        inLanguage: ['zh-CN', 'en-US'],
        publisher: { '@id': organizationId },
      },
      {
        '@type': 'SoftwareApplication',
        '@id': `${SITE_URL}/${locale}#enterprise`,
        name: isZh ? 'TeGo 企业版' : 'TeGo Enterprise',
        description: isZh
          ? '可私有化与信创部署的数字员工执行与治理平台，提供岗位定义、最小授权、人工确认与全链路审计。'
          : 'A privately deployable execution and governance platform for digital employees with role definitions, least privilege, human approval and end-to-end audit.',
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
