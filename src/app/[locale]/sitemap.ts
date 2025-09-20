import { MetadataRoute } from 'next'
import { locales } from '@/i18n'

type Props = {
  params: Promise<{ locale: string }>
}

export default async function sitemap({ params }: Props): Promise<MetadataRoute.Sitemap> {
  const { locale } = await params
  const baseUrl = 'https://zhama.com'
  
  // Validate locale
  if (!locales.includes(locale as any)) {
    return []
  }
  
  // Pages available in this locale
  const pages = [
    '',           // home page
    '/contact',
    '/download', 
    '/guide',
    '/privacy',
    '/terms'
  ]
  
  const sitemapEntries: MetadataRoute.Sitemap = []
  
  pages.forEach(page => {
    const url = page === '' ? `${baseUrl}/${locale}` : `${baseUrl}/${locale}${page}`
    
    sitemapEntries.push({
      url,
      lastModified: new Date(),
      changeFrequency: page === '/contact' ? 'monthly' : 
                      page === '' ? 'weekly' : 'yearly',
      priority: page === '' ? 1.0 : 
               page === '/contact' ? 0.8 : 0.7,
      // Add alternate languages
      alternates: {
        languages: Object.fromEntries(
          locales.map(loc => [
            loc === 'zh' ? 'zh-CN' : 'en-US',
            page === '' ? `${baseUrl}/${loc}` : `${baseUrl}/${loc}${page}`
          ])
        )
      }
    })
  })
  
  return sitemapEntries
}
