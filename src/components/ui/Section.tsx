import { cn } from '@/lib/utils';

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  band?: boolean;
  dark?: boolean;
}

export function Section({ children, className, id, band, dark }: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        'py-16 md:py-24',
        band && 'bg-white dark:bg-zinc-900',
        dark && 'bg-[#07131f] text-zinc-50 dark:bg-[#07131f]',
        className,
      )}
    >
      {children}
    </section>
  );
}

interface SectionHeadProps {
  eyebrow?: string;
  title: string;
  lead?: string;
  center?: boolean;
  className?: string;
  dark?: boolean;
}

export function SectionHead({ eyebrow, title, lead, center, className, dark }: SectionHeadProps) {
  return (
    <div className={cn('mb-12 max-w-3xl md:mb-16', center && 'mx-auto text-center', className)}>
      {eyebrow ? (
        <span
          className={cn(
            'inline-flex items-center gap-2 rounded-md border px-3.5 py-1.5 text-xs font-semibold',
            dark
              ? 'border-primary-800 bg-primary-950/40 text-primary-200'
              : 'border-primary-200 bg-primary-50 text-primary-800 dark:border-primary-800 dark:bg-primary-950/40 dark:text-primary-200',
          )}
        >
          {eyebrow}
        </span>
      ) : null}
      <h2
        className={cn(
          'mt-5 text-3xl font-bold tracking-normal md:text-4xl',
          !eyebrow && 'mt-0',
          dark ? 'text-white' : 'text-zinc-900 dark:text-zinc-50',
        )}
      >
        {title}
      </h2>
      {lead ? (
        <p
          className={cn(
            'mt-4 text-lg leading-relaxed',
            dark ? 'text-zinc-300' : 'text-zinc-600 dark:text-zinc-400',
          )}
        >
          {lead}
        </p>
      ) : null}
    </div>
  );
}

export function SectionHeader({
  title,
  subtitle,
  className,
}: {
  title: string;
  subtitle?: string;
  className?: string;
}) {
  return <SectionHead title={title} lead={subtitle} center className={className} />;
}

