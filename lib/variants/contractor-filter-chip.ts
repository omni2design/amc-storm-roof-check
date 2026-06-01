import { cva, type VariantProps } from "class-variance-authority";

/**
 * Figma `Contractor/Filter Chip` (216:26)
 * https://www.figma.com/design/DnlD52iTlNrh8rZj1rMY1W/AMC-Storm-Roof-Check?node-id=216-26
 */
export const contractorFilterChipVariants = cva(
  [
    "inline-flex shrink-0 items-center justify-center gap-2 rounded-pill border px-3 py-2",
    "text-[13px] font-medium leading-normal whitespace-nowrap motion-safe transition-colors",
    "focus-visible:focus-ring",
  ].join(" "),
  {
    variants: {
      active: {
        true: "border-button-navy bg-button-navy text-white",
        false: "border-[#e5e7eb] bg-[#f9fafb] text-[#374151] hover:bg-surface-muted",
      },
    },
    defaultVariants: {
      active: false,
    },
  },
);

export type ContractorFilterChipVariantProps = VariantProps<typeof contractorFilterChipVariants>;
