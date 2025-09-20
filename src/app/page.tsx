import { redirect } from 'next/navigation';
import { headers } from 'next/headers';

// Root page that redirects to the appropriate locale
export default async function RootPage() {
  const headersList = await headers();
  const acceptLanguage = headersList.get('accept-language');
  
  // Simple language detection - check if browser prefers English
  const preferEnglish = acceptLanguage?.includes('en') && !acceptLanguage?.includes('zh');
  
  // Redirect to the preferred language, defaulting to Chinese
  redirect(preferEnglish ? '/en' : '/zh');
}
