import { MetadataRoute } from 'next'
import { locales } from '@/i18n'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://zhama.com'
  
  // Base pages for each locale
  const pages = [
    '',           // home page
    '/contact',
    '/download', 
    '/guide',
    '/privacy',
    '/terms'
  ]
  
  // Generate sitemap entries for all locales and pages
  const sitemapEntries: MetadataRoute.Sitemap = []
  
  // Add home page entries
  locales.forEach(locale => {
    sitemapEntries.push({
      url: `${baseUrl}/${locale}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: locale === 'zh' ? 1 : 0.9, // Chinese as primary
    })
  })
  
  // Add other pages
  pages.slice(1).forEach(page => {
    locales.forEach(locale => {
      sitemapEntries.push({
        url: `${baseUrl}/${locale}${page}`,
        lastModified: new Date(),
        changeFrequency: page === '/contact' ? 'monthly' : 'yearly',
        priority: page === '/contact' ? 0.8 : 0.7,
      })
    })
  })
  
  return sitemapEntries
}
