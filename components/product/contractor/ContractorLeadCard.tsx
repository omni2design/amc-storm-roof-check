import Link from "next/link";
import { cn } from "@/lib/utils/cn";
import { StatusBadge } from "@/components/foundation/StatusBadge";
import { Avatar } from "@/components/foundation/Avatar";
import type { LeadWorkflowStatus } from "@/lib/contractor/types";

export type ContractorLeadCardProps = {
  id: string;
  name: string;
  issue: string;
  location: string;
  submittedAt: string;
  status: LeadWorkflowStatus;
  statusLabel: string;
  photoCount?: number;
  href?: string;
  selected?: boolean;
  onClick?: () => void;
  className?: string;
};

/** Figma `Contractor Lead Card` — inbox list item for leads view. */
export function ContractorLeadCard({
  name,
  issue,
  location,
  submittedAt,
  status,
  statusLabel,
  photoCount,
  href,
  selected = false,
  onClick,
  className,
}: ContractorLeadCardProps) {
  const content = (
    <>
      <div className="flex items-start gap-3">
        <Avatar name={name} size="md" />
        <div className="flex min-w-0 flex-1 flex-col gap-1">
          <div className="flex flex-wrap items-center gap-2">
            <p className="truncate text-body-strong text-foreground-primary">{name}</p>
            <StatusBadge status={status}>{statusLabel}</StatusBadge>
          </div>
          <p className="truncate text-sm-leading text-foreground-secondary">{issue}</p>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-caption text-foreground-muted">
            <span>{location}</span>
            <span>{submittedAt}</span>
            {typeof photoCount === "number" ? <span>{photoCount} photos</span> : null}
          </div>
        </div>
      </div>
    </>
  );

  const cardClass = cn(
    "block w-full rounded-card border p-4 text-left motion-safe transition-colors focus-visible:focus-ring",
    selected
      ? "border-contractor-lead-card-border-selected bg-contractor-lead-card-bg-selected shadow-semantic-card"
      : "border-contractor-lead-card-border bg-contractor-lead-card-bg shadow-semantic-rest hover:bg-contractor-lead-card-bg-hover",
    className,
  );

  if (href) {
    return (
      <Link href={href} className={cardClass} aria-current={selected ? "page" : undefined}>
        {content}
      </Link>
    );
  }

  return (
    <button type="button" onClick={onClick} className={cardClass} aria-pressed={selected}>
      {content}
    </button>
  );
}
