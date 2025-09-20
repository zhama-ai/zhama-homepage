import "./globals.css";
import type { Metadata } from "next";
import HtmlLangSetter from "@/components/HtmlLangSetter";

export const metadata: Metadata = {
  title: "TeGo AI Agent Platform",
  description: "Enterprise AI Agent Platform and Solutions",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning>
      <body className="min-h-screen overflow-x-hidden">
        <HtmlLangSetter />
        {children}
      </body>
    </html>
  );
}
