"use client";

import { cn } from "@/lib/utils/cn";
import { IconButton } from "@/components/foundation/IconButton";

export type ContractorCalendarHeaderProps = {
  title: string;
  subtitle?: string;
  onPrevious?: () => void;
  onNext?: () => void;
  className?: string;
};

/** Figma `Contractor Calendar Header` — month/week navigation header. */
export function ContractorCalendarHeader({
  title,
  subtitle,
  onPrevious,
  onNext,
  className,
}: ContractorCalendarHeaderProps) {
  return (
    <header
      className={cn(
        "flex items-center justify-between gap-3 border-b border-contractor-nav-border bg-contractor-calendar-header-bg px-4 py-3",
        className,
      )}
    >
      {onPrevious ? (
        <IconButton intent="subtle" size="sm" aria-label="Previous period" onClick={onPrevious}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
            <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </IconButton>
      ) : (
        <span className="size-8" aria-hidden />
      )}

      <div className="flex min-w-0 flex-col items-center gap-0.5 text-center">
        <h2 className="truncate text-body-strong text-foreground-primary">{title}</h2>
        {subtitle ? <p className="text-caption text-foreground-secondary">{subtitle}</p> : null}
      </div>

      {onNext ? (
        <IconButton intent="subtle" size="sm" aria-label="Next period" onClick={onNext}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
            <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </IconButton>
      ) : (
        <span className="size-8" aria-hidden />
      )}
    </header>
  );
}
