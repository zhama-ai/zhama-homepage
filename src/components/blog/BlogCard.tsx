import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Clock, User } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import type { BlogPostMetadata } from '@/lib/blog/markdown';
import CategoryBadge from './CategoryBadge';
import TagList from './TagList';

interface BlogCardProps {
  post: BlogPostMetadata;
  locale: string;
}

export default function BlogCard({ post, locale }: BlogCardProps) {
  return (
    <Card className="h-full overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <Link href={`/${locale}/blog/${post.slug}`}>
        {post.image && (
          <div className="relative w-full h-48 overflow-hidden">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover hover:scale-105 transition-transform duration-300"
            />
            {post.featured && (
              <div className="absolute top-4 right-4 bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-xs font-semibold">
                Featured
              </div>
            )}
          </div>
        )}
        
        <div className="p-6">
          <div className="flex items-center gap-2 mb-3">
            <CategoryBadge category={post.category} />
          </div>

          <h3 className="text-xl font-bold mb-2 line-clamp-2 hover:text-blue-600 transition-colors">
            {post.title}
          </h3>

          <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
            {post.description}
          </p>

          <TagList tags={post.tags} limit={3} />

          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <Calendar size={14} />
                <span>{new Date(post.date).toLocaleDateString(locale)}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock size={14} />
                <span>{post.readingTime}</span>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <User size={14} />
              <span className="text-xs">{post.author}</span>
            </div>
          </div>
        </div>
      </Link>
    </Card>
  );
}




