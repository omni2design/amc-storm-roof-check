import Link from "next/link";
import { cn } from "@/lib/utils/cn";
import { ContractorStatusBadge } from "@/components/product/contractor/ContractorStatusBadge";
import { mapLeadStatusToContractorBadge } from "@/lib/contractor/map-status-badge";
import { mapContractorBadgeToAccentClass } from "@/lib/contractor/map-lead-accent";
import type { LeadWorkflowStatus } from "@/lib/contractor/types";

export type ContractorLeadCardProps = {
  id: string;
  name: string;
  issue: string;
  submittedAt: string;
  status: LeadWorkflowStatus;
  statusLabel: string;
  photoCount?: number;
  insurance?: string;
  budget?: string;
  unread?: boolean;
  href?: string;
  selected?: boolean;
  onClick?: () => void;
  /** Figma pipeline view — top row only, no meta footer. */
  variant?: "full" | "compact";
  className?: string;
};

function MetaColumn({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex min-w-0 flex-col gap-0.5">
      <p className="text-[9px] font-semibold tracking-[0.5px] text-foreground-muted uppercase">{label}</p>
      <p className="truncate text-[13px] font-semibold text-foreground-primary">{value}</p>
    </div>
  );
}

/** Figma `Contractor/Lead Card` (829:8077) — inbox list item for leads view. */
export function ContractorLeadCard({
  name,
  issue,
  submittedAt,
  status,
  statusLabel,
  photoCount,
  insurance,
  budget,
  unread = true,
  href,
  selected = false,
  onClick,
  variant = "full",
  className,
}: ContractorLeadCardProps) {
  const badgeStatus = mapLeadStatusToContractorBadge(status);
  const accentClass = mapContractorBadgeToAccentClass(badgeStatus);

  const photosLabel =
    typeof photoCount === "number" ? `${photoCount} photo${photoCount === 1 ? "" : "s"}` : "—";

  const content = (
    <>
      <div aria-hidden className={cn("w-1 shrink-0 self-stretch", accentClass)} />
      <div className="flex min-w-0 flex-1 flex-col gap-3 p-4">
        <div className="flex gap-2">
          <div className="flex min-w-0 flex-1 flex-col gap-1">
            <div className="flex items-center gap-1.5">
              {unread ? (
                <span
                  className={cn("size-[7px] shrink-0 rounded-pill", accentClass)}
                  aria-hidden
                />
              ) : null}
              <p className="truncate text-[15px] font-semibold leading-none text-foreground-primary">
                {name}
              </p>
            </div>
            <p className="truncate text-[13px] leading-normal text-foreground-secondary">{issue}</p>
          </div>
          <div className="flex shrink-0 flex-col items-end gap-1.5">
            <ContractorStatusBadge status={badgeStatus}>{statusLabel}</ContractorStatusBadge>
            <p className="text-[11px] leading-none text-foreground-muted">{submittedAt}</p>
          </div>
        </div>
        {variant === "full" ? (
          <>
            <div className="h-px w-full bg-surface-muted" role="separator" />
            <div className="grid w-full grid-cols-3 gap-2">
              <MetaColumn label="Photos" value={photosLabel} />
              <MetaColumn label="Insurance" value={insurance ?? "—"} />
              <MetaColumn label="Budget" value={budget ?? "—"} />
            </div>
          </>
        ) : null}
      </div>
    </>
  );

  const cardClass = cn(
    "flex w-full overflow-hidden rounded-xl border text-left shadow-[0_2px_8px_rgb(0_0_0/0.07)] motion-safe transition-colors focus-visible:focus-ring",
    selected
      ? "border-contractor-lead-card-border-selected bg-contractor-lead-card-bg-selected"
      : "border-contractor-lead-card-border bg-contractor-lead-card-bg hover:bg-contractor-lead-card-bg-hover",
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
