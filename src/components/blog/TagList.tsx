import { Tag } from 'lucide-react';

interface TagListProps {
  tags: string[];
  limit?: number;
  clickable?: boolean;
}

export default function TagList({ tags, limit, clickable = false }: TagListProps) {
  const displayTags = limit ? tags.slice(0, limit) : tags;
  const remainingCount = limit && tags.length > limit ? tags.length - limit : 0;

  const hoverClass = clickable ? 'hover:bg-gray-300 dark:hover:bg-gray-600 cursor-pointer' : '';

  return (
    <div className="flex flex-wrap gap-2">
      {displayTags.map((tag) => (
        <span
          key={tag}
          className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 ${hoverClass} transition-colors`}
        >
          <Tag size={10} />
          {tag}
        </span>
      ))}
      {remainingCount > 0 && (
        <span className="inline-flex items-center px-2 py-1 rounded text-xs bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
          +{remainingCount}
        </span>
      )}
    </div>
  );
}



