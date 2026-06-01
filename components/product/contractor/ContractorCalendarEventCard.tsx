import Link from "next/link";
import { cn } from "@/lib/utils/cn";
import { ContractorStatusBadge } from "@/components/product/contractor/ContractorStatusBadge";
import type { ContractorStatusBadgeStatus } from "@/lib/variants/contractor-status-badge";
import type { ScheduleJobStatus } from "@/lib/contractor/schedule-types";

export type ContractorCalendarEventCardLayout = "default" | "compact";

export type ContractorCalendarEventCardProps = {
  time: string;
  duration?: string;
  name: string;
  jobType: string;
  location?: string;
  eta?: string;
  status: ScheduleJobStatus;
  layout?: ContractorCalendarEventCardLayout;
  href?: string;
  onClick?: () => void;
  className?: string;
};

const CARD_SHELL_CLASS =
  "box-border flex w-full flex-row items-start overflow-hidden rounded-[12px] border border-[#e5e7eb] bg-white shadow-[0_2px_8px_rgba(0,0,0,0.07)] motion-safe transition-colors focus-visible:focus-ring";

const STRIPE_CLASS: Record<ScheduleJobStatus, string> = {
  critical: "bg-feedback-danger",
  high: "bg-feedback-warning",
  scheduled: "bg-feedback-success",
  confirmed: "bg-button-navy",
};

const BADGE_MAP: Record<ScheduleJobStatus, { status: ContractorStatusBadgeStatus; label: string }> = {
  critical: { status: "critical", label: "Critical" },
  high: { status: "highPriority", label: "High Priority" },
  scheduled: { status: "scheduled", label: "Scheduled" },
  confirmed: { status: "needsInspection", label: "Confirmed" },
};

/** Figma `Contractor/Calendar Event Card` — default on Today/Tomorrow; compact on Week view. */
export function ContractorCalendarEventCard({
  time,
  duration,
  name,
  jobType,
  location,
  eta = "Est. 2 hrs",
  status,
  layout = "default",
  href,
  onClick,
  className,
}: ContractorCalendarEventCardProps) {
  const badge = BADGE_MAP[status];
  const isCompact = layout === "compact";

  const content = isCompact ? (
    <div className={cn(CARD_SHELL_CLASS, "h-[60px] items-stretch", className)}>
      <div aria-hidden className={cn("w-1 shrink-0 self-stretch", STRIPE_CLASS[status])} />
      <div className="flex min-w-0 flex-1 flex-row items-center gap-2 px-3 py-2.5">
        <div className="flex shrink-0 flex-col items-start">
          <p className="text-xs font-semibold leading-tight tracking-[0.03px] text-foreground-primary">
            {time}
          </p>
          {duration ? (
            <p className="text-[10px] font-normal leading-[1.4] tracking-[0.05px] text-foreground-muted">
              {duration}
            </p>
          ) : null}
        </div>
        <div className="h-full w-px shrink-0 self-stretch bg-[#e5e7eb]" role="separator" />
        <div className="flex min-w-0 flex-1 flex-col items-start">
          <p className="text-sm font-semibold leading-tight text-foreground-primary">{name}</p>
          <p className="text-xs font-normal leading-tight tracking-[0.03px] text-[#6b7280]">{jobType}</p>
        </div>
        <ContractorStatusBadge status={badge.status} className="shrink-0">
          {badge.label}
        </ContractorStatusBadge>
      </div>
    </div>
  ) : (
    <div className={cn(CARD_SHELL_CLASS, className)}>
      <div aria-hidden className={cn("w-1 shrink-0 self-stretch", STRIPE_CLASS[status])} />
      <div className="flex min-w-0 flex-1 flex-col gap-2 p-3">
        <div className="flex min-w-0 items-center gap-1">
          <p className="shrink-0 text-xs font-semibold leading-tight tracking-[0.03px] text-foreground-primary">
            {time}
          </p>
          {duration ? (
            <p className="shrink-0 text-xs font-normal leading-tight tracking-[0.03px] text-foreground-muted">
              · {duration}
            </p>
          ) : null}
          <div className="min-w-0 flex-1" aria-hidden />
          <ContractorStatusBadge status={badge.status}>{badge.label}</ContractorStatusBadge>
        </div>
        <div className="h-px w-full bg-[#e5e7eb]" role="separator" />
        <div className="flex flex-col items-start">
          <p className="text-sm font-semibold leading-tight text-foreground-primary">{name}</p>
          <p className="text-xs font-normal leading-tight tracking-[0.03px] text-foreground-secondary">
            {jobType}
          </p>
          {location ? (
            <p className="text-[10px] font-normal leading-[1.4] tracking-[0.05px] text-[#9ca3af]">
              {location}
            </p>
          ) : null}
        </div>
        {eta ? (
          <p className="text-[10px] font-normal leading-[1.4] tracking-[0.05px] text-foreground-muted">
            {eta}
          </p>
        ) : null}
      </div>
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="block w-full text-left">
        {content}
      </Link>
    );
  }

  if (onClick) {
    return (
      <button type="button" onClick={onClick} className="block w-full text-left">
        {content}
      </button>
    );
  }

  return content;
}
