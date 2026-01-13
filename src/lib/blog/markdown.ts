import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeHighlight from 'rehype-highlight';
import rehypeStringify from 'rehype-stringify';
import matter from 'gray-matter';
import readingTime from 'reading-time';

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string;
  category: string;
  tags: string[];
  image?: string;
  featured?: boolean;
  content: string;
  htmlContent: string;
  readingTime: string;
  locale: string;
}

export interface BlogPostMetadata {
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string;
  category: string;
  tags: string[];
  image?: string;
  featured?: boolean;
  readingTime: string;
  locale: string;
}

/**
 * Parse markdown content and extract frontmatter
 */
export function parseMarkdown(content: string): {
  data: Record<string, any>;
  content: string;
} {
  const { data, content: markdownContent } = matter(content);
  return { data, content: markdownContent };
}

/**
 * Convert markdown to HTML with syntax highlighting
 */
export async function markdownToHtml(markdown: string): Promise<string> {
  const result = await unified()
    .use(remarkParse)
    .use(remarkGfm) // 支持 GFM 表格、删除线、自动链接等
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeHighlight)
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(markdown);

  return result.toString();
}

/**
 * Calculate reading time for content
 */
export function calculateReadingTime(content: string): string {
  const stats = readingTime(content);
  return stats.text;
}

/**
 * Extract slug from filename
 * Example: "2024-11-01-article-title.md" -> "article-title"
 */
export function extractSlugFromFilename(filename: string): string {
  // Remove .md extension
  const withoutExt = filename.replace(/\.md$/, '');
  
  // Remove date prefix (YYYY-MM-DD-)
  const withoutDate = withoutExt.replace(/^\d{4}-\d{2}-\d{2}-/, '');
  
  return withoutDate;
}

/**
 * Parse blog post from markdown content
 */
export async function parseBlogPost(
  content: string,
  slug: string,
  locale: string
): Promise<BlogPost> {
  const { data, content: markdownContent } = parseMarkdown(content);
  const htmlContent = await markdownToHtml(markdownContent);
  const readingTimeText = calculateReadingTime(markdownContent);

  return {
    slug,
    title: data.title || 'Untitled',
    description: data.description || '',
    date: data.date || new Date().toISOString().split('T')[0],
    author: data.author || 'Anonymous',
    category: data.category || 'Uncategorized',
    tags: data.tags || [],
    image: data.image,
    featured: data.featured || false,
    content: markdownContent,
    htmlContent,
    readingTime: readingTimeText,
    locale,
  };
}

/**
 * Extract metadata from blog post (without full content)
 */
export function extractMetadata(post: BlogPost): BlogPostMetadata {
  return {
    slug: post.slug,
    title: post.title,
    description: post.description,
    date: post.date,
    author: post.author,
    category: post.category,
    tags: post.tags,
    image: post.image,
    featured: post.featured,
    readingTime: post.readingTime,
    locale: post.locale,
  };
}

/**
 * Sort blog posts by date (newest first)
 */
export function sortPostsByDate(posts: BlogPostMetadata[]): BlogPostMetadata[] {
  return posts.sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateB.getTime() - dateA.getTime();
  });
}

/**
 * Filter posts by category
 */
export function filterByCategory(
  posts: BlogPostMetadata[],
  category: string
): BlogPostMetadata[] {
  return posts.filter((post) => post.category === category);
}

/**
 * Filter posts by tag
 */
export function filterByTag(
  posts: BlogPostMetadata[],
  tag: string
): BlogPostMetadata[] {
  return posts.filter((post) => post.tags.includes(tag));
}

/**
 * Get featured posts
 */
export function getFeaturedPosts(posts: BlogPostMetadata[]): BlogPostMetadata[] {
  return posts.filter((post) => post.featured);
}

/**
 * Get all unique categories from posts
 */
export function getAllCategories(posts: BlogPostMetadata[]): string[] {
  const categories = new Set(posts.map((post) => post.category));
  return Array.from(categories).sort();
}

/**
 * Get all unique tags from posts
 */
export function getAllTags(posts: BlogPostMetadata[]): string[] {
  const tags = new Set(posts.flatMap((post) => post.tags));
  return Array.from(tags).sort();
}

/**
 * Get related posts based on tags and category
 */
export function getRelatedPosts(
  currentPost: BlogPostMetadata,
  allPosts: BlogPostMetadata[],
  limit: number = 3
): BlogPostMetadata[] {
  const scoredPosts = allPosts
    .filter((post) => post.slug !== currentPost.slug)
    .map((post) => {
      let score = 0;
      
      // Same category: +3 points
      if (post.category === currentPost.category) {
        score += 3;
      }
      
      // Shared tags: +1 point per tag
      const sharedTags = post.tags.filter((tag) =>
        currentPost.tags.includes(tag)
      );
      score += sharedTags.length;
      
      return { post, score };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);

  return scoredPosts.map((item) => item.post);
}










