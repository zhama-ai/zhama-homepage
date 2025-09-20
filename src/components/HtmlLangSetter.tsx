'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function HtmlLangSetter() {
  const pathname = usePathname();
  
  useEffect(() => {
    // Extract locale from pathname
    const locale = pathname.startsWith('/en') ? 'en' : 'zh';
    document.documentElement.lang = locale;
  }, [pathname]);

  return null;
}
