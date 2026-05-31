import { cn } from "@/lib/utils/cn";
import { CardShell } from "@/components/foundation/CardShell";
import { StatusBadge } from "@/components/foundation/StatusBadge";
import { MetadataRow } from "@/components/foundation/MetadataRow";
import { Icon } from "@/components/icons/Icon";
import type { LeadWorkflowStatus } from "@/lib/contractor/types";

export type ContractorLeadDetailSummaryProps = {
  name: string;
  address: string;
  phone?: string;
  email?: string;
  status: LeadWorkflowStatus;
  statusLabel: string;
  submittedAt: string;
  issue: string;
  urgencyLabel?: string;
  className?: string;
};

/** Figma `Contractor Lead Detail Summary` — hero summary block on lead detail. */
export function ContractorLeadDetailSummary({
  name,
  address,
  phone,
  email,
  status,
  statusLabel,
  submittedAt,
  issue,
  urgencyLabel,
  className,
}: ContractorLeadDetailSummaryProps) {
  return (
    <CardShell className={cn("flex flex-col gap-4", className)} padding="lg">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="flex min-w-0 flex-col gap-1">
          <h2 className="text-heading text-foreground-primary">{name}</h2>
          <p className="text-sm-leading text-foreground-secondary">{issue}</p>
        </div>
        <StatusBadge status={status}>{statusLabel}</StatusBadge>
      </div>

      <dl className="grid gap-3">
        <MetadataRow
          label="Address"
          value={address}
          icon={<Icon name="contact/location" mode="subtle" size="sm" />}
        />
        {phone ? (
          <MetadataRow
            label="Phone"
            value={phone}
            icon={<Icon name="contact/phone" mode="subtle" size="sm" />}
          />
        ) : null}
        {email ? (
          <MetadataRow
            label="Email"
            value={email}
            icon={<Icon name="contact/email" mode="subtle" size="sm" />}
          />
        ) : null}
        <MetadataRow label="Submitted" value={submittedAt} />
        {urgencyLabel ? <MetadataRow label="Urgency" value={urgencyLabel} /> : null}
      </dl>
    </CardShell>
  );
}
