'use client';

import { ReactNode } from 'react';
import { ThemeProvider } from 'next-themes';
import { I18nextProvider } from 'react-i18next';
import i18n from '@/lib/i18n';

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <I18nextProvider i18n={i18n}>
      <ThemeProvider
        attribute="class"
        defaultTheme="light"
        enableSystem={true}
        storageKey="theme"
        disableTransitionOnChange={false}
        forcedTheme={undefined}
        enableColorScheme={true}
      >
        {children}
      </ThemeProvider>
    </I18nextProvider>
  );
} 