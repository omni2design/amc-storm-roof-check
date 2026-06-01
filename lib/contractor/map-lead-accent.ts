import type { ContractorStatusBadgeStatus } from "@/lib/variants/contractor-status-badge";

/** Left accent stripe on Figma Contractor/Lead Card — maps to status badge variant. */
export function mapContractorBadgeToAccentClass(status: ContractorStatusBadgeStatus): string {
  const map: Record<ContractorStatusBadgeStatus, string> = {
    critical: "bg-button-primary",
    highPriority: "bg-feedback-warning",
    needsInspection: "bg-button-navy",
    scheduled: "bg-feedback-success",
    contacted: "bg-contractor-badge-contacted-dot",
    new: "bg-contractor-badge-new-dot",
    neutral: "bg-border-strong",
  };
  return map[status];
}
