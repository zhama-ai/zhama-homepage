import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/providers";

export const metadata: Metadata = {
  title: "TeGo AI Agent Platform - Enterprise Intelligent Future",
  description: "TeGo Platform is a one-stop enterprise AI agent platform that empowers full automation, intelligence, and collaboration across business processes. Building unified infrastructure for enterprise intelligence from Perception to Understanding to Execution.",
  keywords: "AI agent,enterprise platform,intelligent automation,business process,MCP framework",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-light-200 bg-light-grid-pattern dark:bg-dark-900 dark:bg-grid-pattern overflow-x-hidden">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
