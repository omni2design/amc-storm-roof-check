import type { ContractorStatusBadgeStatus } from "@/lib/variants/contractor-status-badge";
import type { LeadWorkflowStatus } from "./types";

/** Maps intake/lead workflow statuses to Figma Contractor/Status Badge variants. */
export function mapLeadStatusToContractorBadge(status: LeadWorkflowStatus): ContractorStatusBadgeStatus {
  const map: Record<LeadWorkflowStatus, ContractorStatusBadgeStatus> = {
    critical: "critical",
    high: "highPriority",
    medium: "needsInspection",
    low: "new",
    optional: "neutral",
    needsInspection: "needsInspection",
    scheduled: "scheduled",
    confirmed: "contacted",
    completed: "contacted",
    muted: "neutral",
  };
  return map[status];
}
