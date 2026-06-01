import { cva, type VariantProps } from "class-variance-authority";

/**
 * Figma `Contractor/Status Badge` (216:21)
 * Caption Semi-Bold 10/140 · 6px dot · pill · gap 4px · px-8 py-4
 * https://www.figma.com/design/DnlD52iTlNrh8rZj1rMY1W/AMC-Storm-Roof-Check?node-id=216-21
 */
export const contractorStatusBadgeVariants = cva(
  ["contractor-status-badge motion-safe transition-colors"].join(" "),
  {
    variants: {
      status: {
        critical: "bg-contractor-badge-critical-bg text-contractor-badge-critical-text",
        highPriority: "bg-contractor-badge-high-priority-bg text-contractor-badge-high-priority-text",
        needsInspection: "bg-contractor-badge-needs-inspection-bg text-contractor-badge-needs-inspection-text",
        scheduled: "bg-contractor-badge-scheduled-bg text-contractor-badge-scheduled-text",
        contacted: "bg-contractor-badge-contacted-bg text-contractor-badge-contacted-text",
        new: "bg-contractor-badge-new-bg text-contractor-badge-new-text",
        neutral: "bg-contractor-badge-neutral-bg text-contractor-badge-neutral-text",
      },
    },
    defaultVariants: {
      status: "highPriority",
    },
  },
);

export const contractorStatusBadgeDotVariants = cva("size-1.5 shrink-0 rounded-pill", {
  variants: {
    status: {
      critical: "bg-contractor-badge-critical-dot",
      highPriority: "bg-contractor-badge-high-priority-dot",
      needsInspection: "bg-contractor-badge-needs-inspection-dot",
      scheduled: "bg-contractor-badge-scheduled-dot",
      contacted: "bg-contractor-badge-contacted-dot",
      new: "bg-contractor-badge-new-dot",
      neutral: "bg-contractor-badge-neutral-dot",
    },
  },
  defaultVariants: {
    status: "highPriority",
  },
});

export type ContractorStatusBadgeVariantProps = VariantProps<typeof contractorStatusBadgeVariants>;
export type ContractorStatusBadgeStatus = NonNullable<ContractorStatusBadgeVariantProps["status"]>;
