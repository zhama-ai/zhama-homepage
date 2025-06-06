'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function GuidePage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/download');
  }, [router]);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-accent-500 mx-auto"></div>
        <p className="mt-4 text-gray-600 dark:text-gray-400">正在跳转到下载页面...</p>
      </div>
    </div>
  );
} 