import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/providers";

export const metadata: Metadata = {
  title: {
    default: 'TeGo-AI智能体操作系统 | 深圳市扎马未来科技有限公司',
    template: '%s | TeGo-AI智能体操作系统'
  },
  description:
    '深圳市扎马未来科技有限公司官方平台：TeGo-AI智能体操作系统与企业级AI解决方案，覆盖智能体引擎、MCP框架、应用市场与接入网关，助力企业私有化与高可用部署。',
  keywords:
    'TeGo, 智能体, AI Agent, 企业智能, 私有化部署, MCP 框架, 智能体操作系统, 企业级 AI, 深圳市扎马未来科技有限公司',
  openGraph: {
    title: 'TeGo-AI智能体操作系统 | 深圳市扎马未来科技有限公司',
    description:
      'TeGo 提供一站式企业智能体平台与私有化解决方案，覆盖感知-理解-执行全链路能力，支持高可用与合规落地。',
    siteName: 'TeGo-AI 智能体操作系统',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TeGo-AI智能体操作系统',
    description: '企业级AI智能体平台与解决方案'
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon.svg', type: 'image/svg+xml' }
    ]
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <body className="min-h-screen overflow-x-hidden">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
