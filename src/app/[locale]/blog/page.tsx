import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import BlogCard from '@/components/blog/BlogCard';
import BlogNav from '@/components/blog/BlogNav';
import { getAllBlogPostsMetadata } from '@/lib/blog/blog-utils';
import { getAllCategories, getAllTags, getFeaturedPosts } from '@/lib/blog/markdown';
import { locales } from '@/i18n';

type Props = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ category?: string; tag?: string }>;
};

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  const { locale } = await params;
  const { category, tag } = await searchParams;
  const t = await getTranslations({ locale, namespace: 'blog' });

  let title = t('meta.title');
  let description = t('meta.description');

  if (category) {
    title = `${category} - ${t('meta.title')}`;
    description = `${t('meta.description')} - ${category}`;
  } else if (tag) {
    title = `${tag} - ${t('meta.title')}`;
    description = `${t('meta.description')} - ${tag}`;
  }

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
    },
  };
}

export default async function BlogPage({ params, searchParams }: Props) {
  const { locale } = await params;
  const { category, tag } = await searchParams;

  if (!locales.includes(locale as any)) {
    notFound();
  }

  const allPosts = await getAllBlogPostsMetadata(locale);
  
  // Server-side filtering based on category or tag
  let filteredPosts = allPosts;
  if (category) {
    filteredPosts = allPosts.filter((post) => post.category === category);
  } else if (tag) {
    filteredPosts = allPosts.filter((post) => post.tags.includes(tag));
  }

  const featuredPosts = getFeaturedPosts(allPosts);
  const categories = getAllCategories(allPosts);
  const tags = getAllTags(allPosts);

  const t = await getTranslations({ locale, namespace: 'blog' });

  return (
    <main className="pt-16">
      <BlogNav />
      <Section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
        <Container>
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              {t('title')}
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              {t('subtitle')}
            </p>
          </div>
        </Container>
      </Section>

      {/* Only show featured posts on main blog page, not on filtered views */}
      {!category && !tag && featuredPosts.length > 0 && (
        <Section className="py-16 bg-white dark:bg-gray-900">
          <Container>
            <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-gray-100">
              {t('featured.title')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredPosts.map((post) => (
                <BlogCard key={post.slug} post={post} locale={locale} />
              ))}
            </div>
          </Container>
        </Section>
      )}

      <Section className="py-16 bg-gray-50 dark:bg-gray-800">
        <Container>
          <div className="flex flex-col lg:flex-row gap-8">
            <aside className="lg:w-64 flex-shrink-0">
              <div className="sticky top-8 space-y-6">
                <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md">
                  <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-gray-100">
                    {t('sidebar.categories')}
                  </h3>
                  <ul className="space-y-2">
                    <li>
                      <Link
                        href={`/${locale}/blog`}
                        className={`block transition-colors ${
                          !category && !tag
                            ? 'text-blue-600 dark:text-blue-400 font-semibold'
                            : 'text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400'
                        }`}
                      >
                        {t('sidebar.allCategories')} ({allPosts.length})
                      </Link>
                    </li>
                    {categories.map((cat) => {
                      const count = allPosts.filter((p) => p.category === cat).length;
                      const isActive = category === cat;
                      return (
                        <li key={cat}>
                          <Link
                            href={`/${locale}/blog?category=${encodeURIComponent(cat)}`}
                            className={`block transition-colors ${
                              isActive
                                ? 'text-blue-600 dark:text-blue-400 font-semibold'
                                : 'text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400'
                            }`}
                          >
                            {cat} ({count})
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>

                <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md">
                  <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-gray-100">
                    {t('sidebar.tags')}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {tags.map((t) => {
                      const isActive = tag === t;
                      return (
                        <Link
                          key={t}
                          href={`/${locale}/blog?tag=${encodeURIComponent(t)}`}
                          className={`px-3 py-1 rounded-full text-sm transition-colors ${
                            isActive
                              ? 'bg-blue-600 dark:bg-blue-500 text-white font-semibold'
                              : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-blue-900 hover:text-blue-700 dark:hover:text-blue-300'
                          }`}
                        >
                          {t}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>
            </aside>

            <div className="flex-1">
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                  {category ? `${t('category')}: ${category}` : tag ? `${t('tag')}: ${tag}` : t('allPosts.title')}
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mt-2">
                  {t('allPosts.count', { count: filteredPosts.length })}
                </p>
                {(category || tag) && (
                  <Link
                    href={`/${locale}/blog`}
                    className="inline-block mt-2 text-blue-600 dark:text-blue-400 hover:underline text-sm"
                  >
                    ← {t('sidebar.allCategories')}
                  </Link>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {filteredPosts.map((post) => (
                  <BlogCard key={post.slug} post={post} locale={locale} />
                ))}
              </div>

              {filteredPosts.length === 0 && (
                <div className="text-center py-16">
                  <p className="text-xl text-gray-600 dark:text-gray-400">
                    {t('noPosts')}
                  </p>
                </div>
              )}
            </div>
          </div>
        </Container>
      </Section>
    </main>
  );
}

