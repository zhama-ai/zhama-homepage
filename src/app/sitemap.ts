import { MetadataRoute } from 'next'
import { locales } from '@/i18n'
import { getAllBlogPostsMetadata } from '@/lib/blog/blog-utils'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://zhama.com'
  
  // Base pages with detailed configuration
  const pages = [
    { 
      path: '', 
      changeFreq: 'daily' as const, 
      priority: 1.0,
      lastMod: new Date('2024-12-01') // Update this when homepage content changes
    },
    { 
      path: '/contact', 
      changeFreq: 'monthly' as const, 
      priority: 0.8,
      lastMod: new Date('2024-11-15')
    },
    { 
      path: '/download', 
      changeFreq: 'weekly' as const, 
      priority: 0.9, // High priority for download page
      lastMod: new Date('2024-11-20')
    },
    { 
      path: '/guide', 
      changeFreq: 'monthly' as const, 
      priority: 0.8,
      lastMod: new Date('2024-11-10')
    },
    { 
      path: '/privacy', 
      changeFreq: 'yearly' as const, 
      priority: 0.5,
      lastMod: new Date('2024-10-01')
    },
    { 
      path: '/terms', 
      changeFreq: 'yearly' as const, 
      priority: 0.5,
      lastMod: new Date('2024-10-01')
    },
    { 
      path: '/blog', 
      changeFreq: 'weekly' as const, 
      priority: 0.9, // High priority for blog index
      lastMod: new Date('2024-11-14')
    }
  ]
  
  // Generate sitemap entries for all locales and pages
  const sitemapEntries: MetadataRoute.Sitemap = []
  
  // Add all pages for each locale
  pages.forEach(page => {
    locales.forEach(locale => {
      const url = page.path === '' ? `${baseUrl}/${locale}` : `${baseUrl}/${locale}${page.path}`
      
      sitemapEntries.push({
        url,
        lastModified: page.lastMod,
        changeFrequency: page.changeFreq,
        priority: locale === 'zh' ? page.priority : page.priority * 0.9, // Slightly lower priority for English
      })
    })
  })
  
  // Add root redirect (optional)
  sitemapEntries.push({
    url: baseUrl,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: 0.8,
  })
  
  // Add blog posts for each locale
  for (const locale of locales) {
    try {
      const posts = await getAllBlogPostsMetadata(locale)
      posts.forEach(post => {
        sitemapEntries.push({
          url: `${baseUrl}/${locale}/blog/${post.slug}`,
          lastModified: new Date(post.date),
          changeFrequency: 'monthly',
          priority: post.featured ? 0.85 : 0.7, // Higher priority for featured posts
        })
      })
    } catch (error) {
      // If blog posts don't exist yet, continue
      console.warn(`No blog posts found for locale: ${locale}`)
    }
  }
  
  return sitemapEntries.sort((a, b) => (b.priority || 0) - (a.priority || 0)) // Sort by priority
}
