import { redirect } from 'next/navigation';

export default async function GuidePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  // Server-side redirect to download page with locale
  redirect(`/${locale}/download`);
} 