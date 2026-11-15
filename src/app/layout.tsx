import "./globals.css";
import type { Metadata } from "next";
import HtmlLangSetter from "@/components/HtmlLangSetter";

export const metadata: Metadata = {
  metadataBase: new URL("https://zhama.com"),
  title: "TeGo Digital Employees | Zhama",
  description: "TeGo lets digital employees work safely, efficiently and continuously inside your business.",
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
