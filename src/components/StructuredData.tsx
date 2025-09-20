'use client'

import { useLocale } from 'next-intl'

interface OrganizationData {
  "@context": string
  "@type": string
  name: string
  url: string
  logo: string
  description: string
  address: {
    "@type": string
    addressCountry: string
    addressRegion: string
    addressLocality: string
  }
  contactPoint: {
    "@type": string
    contactType: string
    url: string
  }
  sameAs: string[]
}

interface WebsiteData {
  "@context": string
  "@type": string
  name: string
  url: string
  potentialAction: {
    "@type": string
    target: string
    "query-input": string
  }
}

interface SoftwareApplicationData {
  "@context": string
  "@type": string
  name: string
  description: string
  url: string
  applicationCategory: string
  operatingSystem: string
  offers: {
    "@type": string
    price: string
    priceCurrency: string
  }
  publisher: {
    "@type": string
    name: string
  }
}

export default function StructuredData() {
  const locale = useLocale()
  const baseUrl = 'https://zhama.com'
  
  const organizationData: OrganizationData = {
    "@context": "https://zhama.com",
    "@type": "Organization",
    name: locale === 'zh' ? '深圳市扎马未来科技有限公司' : 'Shenzhen Zhama Future Technology Co., Ltd.',
    url: baseUrl,
    logo: `${baseUrl}/images/logo.png`,
    description: locale === 'zh'
      ? 'TeGo 提供一站式企业智能体平台与私有化解决方案，覆盖感知-理解-执行全链路能力。'
      : 'TeGo provides a one-stop enterprise agent platform and privatization solutions, covering the full chain capabilities of perception-understanding-execution.',
    address: {
      "@type": "PostalAddress",
      addressCountry: "CN",
      addressRegion: "Guangdong",
      addressLocality: "Shenzhen"
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      url: `${baseUrl}/${locale}/contact`
    },
    sameAs: [
      // Add social media links here when available
    ]
  }

  const websiteData: WebsiteData = {
    "@context": "https://zhama.com",
    "@type": "WebSite",
    name: locale === 'zh' ? 'TeGo-AI智能体操作系统' : 'TeGo AI Agent Platform',
    url: baseUrl,
    potentialAction: {
      "@type": "SearchAction",
      target: `${baseUrl}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string"
    }
  }

  const softwareData: SoftwareApplicationData = {
    "@context": "https://zhama.com",
    "@type": "SoftwareApplication",
    name: locale === 'zh' ? 'TeGo-AI智能体操作系统' : 'TeGo AI Agent Platform',
    description: locale === 'zh'
      ? '企业级AI智能体平台，提供全链路智能化解决方案，支持私有化部署。'
      : 'Enterprise AI Agent Platform providing full-chain intelligent solutions with private deployment support.',
    url: baseUrl,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web, Windows, macOS, Linux",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "CNY"
    },
    publisher: {
      "@type": "Organization",
      name: locale === 'zh' ? '深圳市扎马未来科技有限公司' : 'Shenzhen Zhama Future Technology Co., Ltd.'
    }
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationData),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteData),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(softwareData),
        }}
      />
    </>
  )
}
