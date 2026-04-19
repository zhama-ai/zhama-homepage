import { MetadataRoute } from 'next'
import { locales } from '@/i18n'
import { getAllBlogPostsMetadata } from '@/lib/blog/blog-utils'

type Props = {
  params: Promise<{ locale: string }>
}

export default async function sitemap({ params }: Props): Promise<MetadataRoute.Sitemap> {
  const { locale } = await params
  const baseUrl = 'https://zhama.com'

  if (!locales.includes(locale as any)) {
    return []
  }

  const pages = [
    '',
    '/contact',
    '/download',
    '/guide',
    '/blog',
    '/privacy',
    '/terms',
  ]

  const sitemapEntries: MetadataRoute.Sitemap = []

  pages.forEach((page) => {
    const url = page === '' ? `${baseUrl}/${locale}` : `${baseUrl}/${locale}${page}`

    sitemapEntries.push({
      url,
      lastModified: new Date(),
      changeFrequency:
        page === '/contact' ? 'monthly' :
        page === '' ? 'weekly' :
        page === '/blog' ? 'weekly' : 'yearly',
      priority:
        page === '' ? 1.0 :
        page === '/blog' ? 0.9 :
        page === '/contact' ? 0.8 : 0.7,
      alternates: {
        languages: Object.fromEntries(
          locales.map((loc) => [
            loc === 'zh' ? 'zh-CN' : 'en-US',
            page === '' ? `${baseUrl}/${loc}` : `${baseUrl}/${loc}${page}`,
          ])
        ),
      },
    })
  })

  try {
    const blogPosts = await getAllBlogPostsMetadata(locale)
    blogPosts.forEach((post) => {
      const path = `/blog/${post.slug}`
      sitemapEntries.push({
        url: `${baseUrl}/${locale}${path}`,
        lastModified: post.date ? new Date(post.date) : new Date(),
        changeFrequency: 'monthly',
        priority: post.featured ? 0.85 : 0.7,
        alternates: {
          languages: Object.fromEntries(
            locales.map((loc) => [
              loc === 'zh' ? 'zh-CN' : 'en-US',
              `${baseUrl}/${loc}${path}`,
            ])
          ),
        },
      })
    })
  } catch (e) {
    // ignore – blog content may not be available at build time
  }

  return sitemapEntries
}
