import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/providers";

export const metadata: Metadata = {
  title: "扎马 AI - 你的个性化 AI 研究助理",
  description: "基于文档的智能笔记与知识管理工具。上传资料、提出问题，获得有据可查的精准回答。让每一份文档都成为可对话的智能知识库，助您高效研究、深度思考、快速洞察。",
  keywords: "AI助理,智能笔记,知识管理,文档分析,研究工具",
  icons: {
    icon: "/images/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh" suppressHydrationWarning>
      <body className="min-h-screen bg-light-200 bg-light-grid-pattern dark:bg-dark-900 dark:bg-grid-pattern overflow-x-hidden">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
