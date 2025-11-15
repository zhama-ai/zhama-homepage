import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Calendar, Clock, User } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import Breadcrumb from '@/components/blog/Breadcrumb';
import BlogContent from '@/components/blog/BlogContent';
import CategoryBadge from '@/components/blog/CategoryBadge';
import TagList from '@/components/blog/TagList';
import RelatedPosts from '@/components/blog/RelatedPosts';
import ShareButton from '@/components/blog/ShareButton';
import { getBlogPostBySlug, getAllBlogPostSlugs, getAllBlogPostsMetadata } from '@/lib/blog/blog-utils';
import { getRelatedPosts } from '@/lib/blog/markdown';
import { locales } from '@/i18n';

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function generateStaticParams() {
  const params: { locale: string; slug: string }[] = [];
  
  for (const locale of locales) {
    const slugs = getAllBlogPostSlugs(locale);
    for (const slug of slugs) {
      params.push({ locale, slug });
    }
  }
  
  return params;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = await getBlogPostBySlug(locale, slug);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  const baseUrl = 'https://zhama.com';
  const url = `${baseUrl}/${locale}/blog/${slug}`;

  return {
    title: post.title,
    description: post.description,
    authors: [{ name: post.author }],
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
      tags: post.tags,
      url,
      images: post.image ? [
        {
          url: `${baseUrl}${post.image}`,
          width: 1200,
          height: 630,
          alt: post.title,
        }
      ] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: post.image ? [`${baseUrl}${post.image}`] : [],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { locale, slug } = await params;

  if (!locales.includes(locale as any)) {
    notFound();
  }

  const post = await getBlogPostBySlug(locale, slug);

  if (!post) {
    notFound();
  }

  const allPosts = await getAllBlogPostsMetadata(locale);
  const postMetadata = allPosts.find((p) => p.slug === slug);
  const relatedPosts = postMetadata ? getRelatedPosts(postMetadata, allPosts) : [];

  const t = await getTranslations({ locale, namespace: 'blog' });

  const breadcrumbItems = [
    { label: t('breadcrumb.blog'), href: `/${locale}/blog` },
    { label: post.title },
  ];

  return (
    <main>
      <Section className="py-12 bg-gray-50 dark:bg-gray-900">
        <Container>
          <Breadcrumb items={breadcrumbItems} locale={locale} />
        </Container>
      </Section>

      <article>
        <Section className="py-16 bg-white dark:bg-gray-900">
          <Container className="max-w-5xl">
            <header className="mb-16">
              <div className="mb-8">
                <CategoryBadge category={post.category} />
              </div>

              <h1 className="text-3xl md:text-4xl font-bold mb-8 text-gray-900 dark:text-gray-100 leading-snug">
                {post.title}
              </h1>

              <p className="text-xl text-gray-600 dark:text-gray-400 mb-10 leading-relaxed">
                {post.description}
              </p>

              <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600 dark:text-gray-400 pb-8 border-b border-gray-200 dark:border-gray-800">
                <div className="flex items-center gap-2">
                  <User size={16} />
                  <span>{post.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar size={16} />
                  <time dateTime={post.date}>
                    {new Date(post.date).toLocaleDateString(locale, {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </time>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={16} />
                  <span>{post.readingTime}</span>
                </div>
                <ShareButton
                  title={post.title}
                  description={post.description}
                  shareText={t('share')}
                />
              </div>
            </header>

            {post.image && (
              <div className="relative w-full h-96 mb-16 rounded-xl overflow-hidden shadow-2xl">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            )}

            <BlogContent htmlContent={post.htmlContent} />

            <footer className="mt-20 pt-10 border-t border-gray-200 dark:border-gray-800">
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-6 text-gray-900 dark:text-gray-100">
                  {t('tags.title')}
                </h3>
                <TagList tags={post.tags} />
              </div>
            </footer>
          </Container>
        </Section>

        {relatedPosts.length > 0 && (
          <Section className="py-16 bg-gray-50 dark:bg-gray-800">
            <Container className="max-w-6xl">
              <RelatedPosts
                posts={relatedPosts}
                locale={locale}
                title={t('related.title')}
              />
            </Container>
          </Section>
        )}
      </article>

      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: post.title,
            description: post.description,
            image: post.image ? `https://zhama.com${post.image}` : undefined,
            datePublished: post.date,
            author: {
              '@type': 'Person',
              name: post.author,
            },
            publisher: {
              '@type': 'Organization',
              name: 'Shenzhen Zhama Future Technology Co., Ltd.',
              logo: {
                '@type': 'ImageObject',
                url: 'https://zhama.com/images/logo.png',
              },
            },
            mainEntityOfPage: {
              '@type': 'WebPage',
              '@id': `https://zhama.com/${locale}/blog/${slug}`,
            },
          }),
        }}
      />
    </main>
  );
}

