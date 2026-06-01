import type { ReactNode } from "react";
import type { StatusBadgeVariantProps } from "@/lib/variants/status-badge";

/** Urgency / priority levels shared across homeowner intake and contractor leads. */
export type LeadPriority = "critical" | "high" | "medium" | "low" | "optional";

/** Contractor workflow status badges. */
export type LeadWorkflowStatus =
  | LeadPriority
  | "needsInspection"
  | "scheduled"
  | "confirmed"
  | "completed"
  | "muted";

export type ContractorNavItem = "leads" | "pipeline" | "calendar" | "profile";

export type PipelineStageId =
  | "new"
  | "contacted"
  | "inspection"
  | "estimate"
  | "won"
  | "lost";

export type CalendarViewMode = "today" | "tomorrow" | "week";

export type CalendarEventVariant = "default" | "inspection" | "urgent";

export type PhotoAnnotation = {
  id: string;
  x: number;
  y: number;
  label?: string;
};

export type PhotoAiObservationState = "possible" | "visible" | "needsReview";

export type PhotoAiObservation = {
  id: string;
  label: string;
  state: PhotoAiObservationState;
};

/** Reported-issue card overlaid on the main photo (Figma 04.01). */
export type LeadReportedIssueOverlay = {
  eyebrow: string;
  title: string;
  subtitle: string;
  severityLabel: string;
};

export type LeadQuickActionIcon = "call" | "message" | "schedule" | "contact";

export type LeadIntakeSummary = {
  dateSubmitted: string;
  damageType: string;
  priority: string;
  intakeStatus: string;
};

export type BusinessHoursDay = {
  day: string;
  open: string;
  close: string;
  closed?: boolean;
};

export type ProfileQuickActionIcon = "help" | "team" | "settings" | "notifications" | "billing";

export type ProfileQuickAction = {
  id: string;
  label: string;
  description: string;
  icon: ProfileQuickActionIcon;
  href?: string;
  onClick?: () => void;
  destructive?: boolean;
};

/** @deprecated Legacy grouped settings — profile uses `ProfileQuickAction` + flat list. */
export type ContractorSettingsSection = {
  id: string;
  title?: string;
  items: ContractorSettingsItemData[];
};

/** @deprecated Legacy settings row data shape. */
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
