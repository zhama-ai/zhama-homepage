'use client'

import { useLocale } from 'next-intl'

export default function BaiduSEO() {
  const locale = useLocale()
  
  // Only render for Chinese locale since Baidu mainly focuses on Chinese content
  if (locale !== 'zh') return null

  const baseUrl = 'https://zhama.com'
  
  // Baidu-specific structured data for better Chinese SEO
  const baiduStructuredData = {
    "@context": "https://ziyuan.baidu.com/college/courseinfo",
    "@type": "WebPage",
    name: "TeGo-OS智能体操作系统",
    description: "深圳市扎马未来科技有限公司旗下TeGo-OS智能体操作系统，提供企业级AI智能体平台与私有化解决方案，覆盖感知-理解-执行全链路能力。",
    url: `${baseUrl}/zh`,
    author: {
      "@type": "Organization",
      name: "深圳市扎马未来科技有限公司"
    },
    publisher: {
      "@type": "Organization", 
      name: "深圳市扎马未来科技有限公司",
      logo: {
        "@type": "ImageObject",
        url: `${baseUrl}/images/logo_light.png`
      }
    },
    datePublished: "2024-01-01",
    dateModified: new Date().toISOString().split('T')[0],
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${baseUrl}/zh`
    }
  }

  return (
    <>
      {/* Baidu site verification - replace with your actual verification code */}
      <meta name="baidu-site-verification" content="codeva-z01CSON5KK" />
      
      {/* Baidu-specific meta tags for better indexing */}
      <meta name="baidu-gxt-verify-codeva" content="YOUR_BAIDU_GXT_CODE" />
      
      {/* Tell Baidu this is original content */}
      <meta name="baidu-tc-verification" content="YOUR_BAIDU_TC_CODE" />
      
      {/* Baidu mobile optimization */}
      <meta name="applicable-device" content="pc,mobile" />
      <meta name="MobileOptimized" content="width" />
      <meta name="HandheldFriendly" content="true" />
      
      {/* Baidu structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(baiduStructuredData),
        }}
      />
      
      {/* Baidu automatic push code for faster indexing */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            (function(){
              var bp = document.createElement('script');
              var curProtocol = window.location.protocol.split(':')[0];
              if (curProtocol === 'https') {
                bp.src = 'https://zz.bdstatic.com/linksubmit/push.js';
              } else {
                bp.src = 'http://push.zhanzhang.baidu.com/push.js';
              }
              var s = document.getElementsByTagName("script")[0];
              s.parentNode.insertBefore(bp, s);
            })();
          `,
        }}
      />
    </>
  )
}
