import { cn } from "@/lib/utils/cn";

import { ContractorPageContent } from "@/components/product/contractor/ContractorPageLayout";

/** Shared scroll content wrapper for Today / Tomorrow schedule views. */
export const ScheduleAgendaContent = ContractorPageContent;

/** Figma day/date heading (e.g. Thursday, May 28). */
export function ScheduleAgendaDateHeading({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h2
      className={cn(
        "text-center text-lg font-semibold leading-relaxed text-foreground-muted",
        className,
      )}
    >
      {children}
    </h2>
  );
}

/** Figma Morning / Afternoon section row (label + job count). */
export function ScheduleAgendaSectionHeader({
  label,
  jobCount,
  className,
}: {
  label: string;
  jobCount: string;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center justify-between", className)}>
      <p className="text-sm font-semibold leading-tight text-[#9ca3af]">{label}</p>
      <p className="text-xs leading-tight tracking-[0.03px] text-[#6b7280]">{jobCount}</p>
    </div>
  );
}
