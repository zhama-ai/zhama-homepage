import { Folder } from 'lucide-react';

interface CategoryBadgeProps {
  category: string;
  clickable?: boolean;
}

const categoryColors: Record<string, string> = {
  '产品介绍': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  '技术分享': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  '行业洞察': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
  'Product Introduction': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  'Technical Sharing': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  'Industry Insights': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
};

export default function CategoryBadge({ category, clickable = false }: CategoryBadgeProps) {
  const colorClass = categoryColors[category] || 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200';
  const hoverClass = clickable ? 'hover:opacity-80 cursor-pointer' : '';

  return (
    <span
      className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${colorClass} ${hoverClass} transition-opacity`}
    >
      <Folder size={12} />
      {category}
    </span>
  );
}




