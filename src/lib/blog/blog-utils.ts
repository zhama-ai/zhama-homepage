import fs from 'fs';
import path from 'path';
import {
  parseBlogPost,
  extractSlugFromFilename,
  extractMetadata,
  sortPostsByDate,
  type BlogPost,
  type BlogPostMetadata,
} from './markdown';

const BLOG_CONTENT_DIR = path.join(process.cwd(), 'content', 'blog');

/**
 * Get all blog post files for a given locale
 */
export function getBlogPostFiles(locale: string): string[] {
  const localeDir = path.join(BLOG_CONTENT_DIR, locale);
  
  if (!fs.existsSync(localeDir)) {
    return [];
  }

  const files = fs.readdirSync(localeDir);
  return files.filter((file) => file.endsWith('.md'));
}

/**
 * Read blog post content from file
 */
export function readBlogPostFile(locale: string, filename: string): string {
  const filePath = path.join(BLOG_CONTENT_DIR, locale, filename);
  return fs.readFileSync(filePath, 'utf-8');
}

/**
 * Get all blog posts for a locale
 */
export async function getAllBlogPosts(locale: string): Promise<BlogPost[]> {
  const files = getBlogPostFiles(locale);
  
  const posts = await Promise.all(
    files.map(async (filename) => {
      const content = readBlogPostFile(locale, filename);
      const slug = extractSlugFromFilename(filename);
      return parseBlogPost(content, slug, locale);
    })
  );

  return posts;
}

/**
 * Get all blog post metadata for a locale (without full content)
 */
export async function getAllBlogPostsMetadata(
  locale: string
): Promise<BlogPostMetadata[]> {
  const posts = await getAllBlogPosts(locale);
  const metadata = posts.map(extractMetadata);
  return sortPostsByDate(metadata);
}

/**
 * Get a single blog post by slug
 */
export async function getBlogPostBySlug(
  locale: string,
  slug: string
): Promise<BlogPost | null> {
  const files = getBlogPostFiles(locale);
  
  const matchingFile = files.find((filename) => {
    const fileSlug = extractSlugFromFilename(filename);
    return fileSlug === slug;
  });

  if (!matchingFile) {
    return null;
  }

  const content = readBlogPostFile(locale, matchingFile);
  return parseBlogPost(content, slug, locale);
}

/**
 * Get all blog post slugs for a locale
 */
export function getAllBlogPostSlugs(locale: string): string[] {
  const files = getBlogPostFiles(locale);
  return files.map(extractSlugFromFilename);
}

/**
 * Check if a blog post exists
 */
export function blogPostExists(locale: string, slug: string): boolean {
  const slugs = getAllBlogPostSlugs(locale);
  return slugs.includes(slug);
}

/**
 * Get paginated blog posts
 */
export async function getPaginatedBlogPosts(
  locale: string,
  page: number = 1,
  pageSize: number = 10
): Promise<{
  posts: BlogPostMetadata[];
  totalPosts: number;
  totalPages: number;
  currentPage: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}> {
  const allPosts = await getAllBlogPostsMetadata(locale);
  const totalPosts = allPosts.length;
  const totalPages = Math.ceil(totalPosts / pageSize);
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const posts = allPosts.slice(startIndex, endIndex);

  return {
    posts,
    totalPosts,
    totalPages,
    currentPage: page,
    hasNextPage: page < totalPages,
    hasPreviousPage: page > 1,
  };
}

/**
 * Search blog posts by query
 */
export async function searchBlogPosts(
  locale: string,
  query: string
): Promise<BlogPostMetadata[]> {
  const allPosts = await getAllBlogPostsMetadata(locale);
  const lowerQuery = query.toLowerCase();

  return allPosts.filter((post) => {
    return (
      post.title.toLowerCase().includes(lowerQuery) ||
      post.description.toLowerCase().includes(lowerQuery) ||
      post.tags.some((tag) => tag.toLowerCase().includes(lowerQuery)) ||
      post.category.toLowerCase().includes(lowerQuery)
    );
  });
}

/**
 * Get recent blog posts
 */
export async function getRecentBlogPosts(
  locale: string,
  limit: number = 5
): Promise<BlogPostMetadata[]> {
  const allPosts = await getAllBlogPostsMetadata(locale);
  return allPosts.slice(0, limit);
}

/**
 * Get featured blog posts
 */
export async function getFeaturedBlogPosts(
  locale: string
): Promise<BlogPostMetadata[]> {
  const allPosts = await getAllBlogPostsMetadata(locale);
  return allPosts.filter((post) => post.featured);
}




