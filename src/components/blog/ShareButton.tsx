'use client';

import { Share2 } from 'lucide-react';

interface ShareButtonProps {
  title: string;
  description: string;
  shareText: string;
}

export default function ShareButton({ title, description, shareText }: ShareButtonProps) {
  const handleShare = async () => {
    const shareUrl = window.location.href;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: description,
          url: shareUrl,
        });
      } catch (error) {
        // User cancelled or share failed
        console.log('Share cancelled or failed:', error);
      }
    } else {
      // Fallback: copy to clipboard
      try {
        await navigator.clipboard.writeText(shareUrl);
        alert('链接已复制到剪贴板 / Link copied to clipboard');
      } catch (error) {
        console.error('Failed to copy:', error);
      }
    }
  };

  return (
    <button
      className="flex items-center gap-2 ml-auto hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
      onClick={handleShare}
      aria-label={shareText}
    >
      <Share2 size={16} />
      <span>{shareText}</span>
    </button>
  );
}



