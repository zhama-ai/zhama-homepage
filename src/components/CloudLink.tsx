'use client';

import type { AnchorHTMLAttributes, ReactNode } from 'react';
import { cloudUrl, type CloudLinkMedium } from '@/lib/external-links';

interface CloudLinkProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
  medium: CloudLinkMedium;
  locale: string;
  path?: string;
  children: ReactNode;
}

export default function CloudLink({
  medium,
  locale,
  path = '/',
  children,
  onClick,
  ...props
}: CloudLinkProps) {
  const handleClick: AnchorHTMLAttributes<HTMLAnchorElement>['onClick'] = (event) => {
    onClick?.(event);
    if (!event.defaultPrevented && typeof window !== 'undefined') {
      const analyticsWindow = window as typeof window & {
        gtag?: (command: string, eventName: string, parameters: Record<string, string>) => void;
      };
      analyticsWindow.gtag?.('event', 'cloud_outbound', { medium, locale });
    }
  };

  return (
    <a
      href={cloudUrl(medium, locale, path)}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      {...props}
    >
      {children}
    </a>
  );
}
