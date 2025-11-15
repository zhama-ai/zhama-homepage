'use client';

import { useEffect } from 'react';

interface BlogContentProps {
  htmlContent: string;
}

export default function BlogContent({ htmlContent }: BlogContentProps) {
  useEffect(() => {
    // Add target="_blank" to external links
    const links = document.querySelectorAll('.blog-content a');
    links.forEach((link) => {
      const href = link.getAttribute('href');
      if (href && (href.startsWith('http://') || href.startsWith('https://'))) {
        link.setAttribute('target', '_blank');
        link.setAttribute('rel', 'noopener noreferrer');
      }
    });
  }, [htmlContent]);

  return (
    <article
      className="blog-content prose prose-xl dark:prose-invert max-w-none
        prose-headings:font-bold prose-headings:text-gray-900 dark:prose-headings:text-gray-100
        prose-h1:text-3xl prose-h1:mb-10 prose-h1:mt-16 prose-h1:leading-snug
        prose-h2:text-2xl prose-h2:mt-24 prose-h2:mb-10 prose-h2:border-b prose-h2:border-gray-200 dark:prose-h2:border-gray-700 prose-h2:pb-5 prose-h2:leading-snug
        prose-h3:text-xl prose-h3:mt-16 prose-h3:mb-8 prose-h3:leading-snug
        prose-h4:text-lg prose-h4:mt-12 prose-h4:mb-6 prose-h4:leading-normal prose-h4:font-semibold
        prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-p:leading-[2] prose-p:mb-10 prose-p:text-lg
        prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline hover:prose-a:text-blue-700 dark:hover:prose-a:text-blue-300
        prose-strong:text-gray-900 dark:prose-strong:text-gray-100 prose-strong:font-semibold
        prose-code:text-pink-600 dark:prose-code:text-pink-400 prose-code:bg-gray-100 dark:prose-code:bg-gray-800 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-base prose-code:font-medium
        prose-pre:bg-gray-900 dark:prose-pre:bg-gray-950 prose-pre:text-gray-100 prose-pre:rounded-xl prose-pre:shadow-xl prose-pre:my-10 prose-pre:p-6 prose-pre:leading-relaxed
        prose-blockquote:border-l-4 prose-blockquote:border-l-blue-500 prose-blockquote:bg-blue-50 dark:prose-blockquote:bg-blue-900/20 prose-blockquote:py-5 prose-blockquote:px-6 prose-blockquote:my-10 prose-blockquote:italic prose-blockquote:text-lg prose-blockquote:leading-relaxed
        prose-img:rounded-lg prose-img:shadow-lg prose-img:my-12
        prose-hr:my-20 prose-hr:border-gray-300 dark:prose-hr:border-gray-700
        prose-ul:my-10 prose-ul:list-disc prose-ul:pl-6 prose-ul:space-y-4
        prose-ol:my-10 prose-ol:list-decimal prose-ol:pl-6 prose-ol:space-y-4
        prose-li:text-gray-700 dark:prose-li:text-gray-300 prose-li:leading-[2] prose-li:text-lg prose-li:mb-2
        prose-table:border-collapse prose-table:w-full prose-table:my-12
        prose-th:bg-gray-100 dark:prose-th:bg-gray-800 prose-th:p-4 prose-th:text-left prose-th:font-semibold
        prose-td:border prose-td:border-gray-300 dark:prose-td:border-gray-700 prose-td:p-4"
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  );
}

