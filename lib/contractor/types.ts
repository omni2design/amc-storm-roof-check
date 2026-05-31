import type { ReactNode } from "react";
import type { StatusBadgeVariantProps } from "@/lib/variants/status-badge";

/** Urgency / priority levels shared across homeowner intake and contractor leads. */
export type LeadPriority = "critical" | "high" | "medium" | "low" | "optional";

/** Contractor workflow status badges. */
export type LeadWorkflowStatus = LeadPriority | "scheduled" | "confirmed" | "muted";

export type ContractorNavItem = "leads" | "pipeline" | "calendar" | "profile";

export type PipelineStageId =
  | "new"
  | "contacted"
  | "inspection"
  | "estimate"
  | "won"
  | "lost";

export type CalendarViewMode = "month" | "week" | "tomorrow";

export type CalendarEventVariant = "default" | "inspection" | "urgent";

export type PhotoAnnotation = {
  id: string;
  x: number;
  y: number;
  label?: string;
};

export type BusinessHoursDay = {
  day: string;
  open: string;
  close: string;
  closed?: boolean;
};

export type ContractorSettingsSection = {
  id: string;
  title?: string;
  items: ContractorSettingsItemData[];
};

export type ContractorSettingsItemData = {
  id: string;
  label: string;
  description?: string;
  href?: string;
  onClick?: () => void;
  trailing?: ReactNode;
  destructive?: boolean;
};

export type StatusBadgeStatus = NonNullable<StatusBadgeVariantProps["status"]>;
