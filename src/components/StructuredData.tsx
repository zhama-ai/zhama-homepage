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
  softwareVersion: string
  releaseNotes: string
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
    "@context": "https://schema.org",
    "@type": "Organization",
    name: locale === 'zh' ? '深圳市扎马未来科技有限公司' : 'Shenzhen Zhama Future Technology Co., Ltd.',
    url: baseUrl,
    logo: `${baseUrl}/images/logo_light.png`,
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
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: locale === 'zh' ? 'TeGo-OS智能体操作系统' : 'TeGo AI Agent Platform',
    url: baseUrl,
    potentialAction: {
      "@type": "SearchAction",
      target: `${baseUrl}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string"
    }
  }

  const softwareData: SoftwareApplicationData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: locale === 'zh' ? 'Tego OS 智能体操作系统' : 'Tego OS AI Agent Platform',
    description: locale === 'zh'
      ? 'Tego OS v3.0.0：让一个数字分身真正能被一群人放心地、互不打扰地一起用。per_user 独享实例、S3 三层数据隔离、模板单一权威、BusinessMonitor 业务运营大屏、16 个开箱模板技能，支持纯私有化 / 混合云 / SaaS 三种交付。'
      : 'Tego OS v3.0.0: enable a single digital avatar to be safely used by a whole team without interference. Includes per_user dedicated instances, S3 three-layer data isolation, single-authority template governance, BusinessMonitor operations dashboard, 16 out-of-the-box template skills, with private / hybrid / SaaS delivery.',
    url: baseUrl,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web, Windows, macOS, Linux",
    softwareVersion: "3.0.0",
    releaseNotes: locale === 'zh'
      ? 'v3.0.0：per_user 独享实例 + S3 三层数据隔离 + 模板/运行时单一权威 + BusinessMonitor 业务运营大屏 + Mini Chat 桌面浮窗 + 16 个开箱模板技能 + Windows 安装器全面重写。'
      : 'v3.0.0: per_user dedicated instances, S3 three-layer data isolation, single-authority template/runtime governance, BusinessMonitor dashboard, Mini Chat floating window, 16 out-of-the-box template skills, fully rewritten Windows installer.',
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
