import { cva, type VariantProps } from "class-variance-authority";

/**
 * Status pill — Figma `Status Badge` (Critical, High, Medium, Low, Optional).
 */
export const statusBadgeVariants = cva(
  [
    "inline-flex max-w-full items-center justify-center rounded-pill px-2 py-0.5 text-caption font-medium",
    "border motion-safe transition-colors",
  ].join(" "),
  {
    variants: {
      status: {
        critical: "border-border-status-critical bg-status-critical-bg text-status-critical-text",
        high: "border-border-status-danger bg-status-danger-bg text-status-danger-text",
        medium: "border-border-warning bg-status-warning-bg text-status-warning-text",
        low: "border-border-status-info bg-status-info-bg text-status-info-text",
        optional: "border-border-subtle bg-surface-muted text-foreground-muted",
      },
    },
    defaultVariants: {
      status: "medium",
    },
  },
);

export type StatusBadgeVariantProps = VariantProps<typeof statusBadgeVariants>;
