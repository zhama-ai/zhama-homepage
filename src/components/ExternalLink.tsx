'use client';

import type { AnchorHTMLAttributes, ReactNode } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ExternalLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  children: ReactNode;
  /** Analytics label for the outbound click, e.g. "header" or "footer". */
  medium?: string;
  /** Show a small arrow icon after the label. */
  icon?: boolean;
  iconClassName?: string;
}

export default function ExternalLink({
  href,
  children,
  medium,
  icon = false,
  iconClassName,
  onClick,
  ...props
}: ExternalLinkProps) {
  const handleClick: AnchorHTMLAttributes<HTMLAnchorElement>['onClick'] = (event) => {
    onClick?.(event);
    if (event.defaultPrevented || typeof window === 'undefined') return;
    const analyticsWindow = window as typeof window & {
      gtag?: (command: string, eventName: string, parameters: Record<string, string>) => void;
    };
    const host = (() => {
      try {
        return new URL(href).host;
      } catch {
        return href;
      }
    })();
    analyticsWindow.gtag?.('event', host.startsWith('docs.') ? 'docs_outbound' : 'external_outbound', {
      url: href,
      ...(medium ? { medium } : {}),
    });
  };

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" onClick={handleClick} {...props}>
      {children}
      {icon ? (
        <ArrowUpRight aria-hidden="true" className={cn('inline-block h-3.5 w-3.5 shrink-0 opacity-70', iconClassName)} />
      ) : null}
    </a>
  );
}
