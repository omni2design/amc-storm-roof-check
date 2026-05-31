import { cva, type VariantProps } from "class-variance-authority";

/**
 * Filter pill — Figma `Filter Pill` (Default, Selected).
 */
export const filterPillVariants = cva(
  [
    "inline-flex shrink-0 items-center justify-center rounded-pill border px-3 py-1.5",
    "text-label font-medium motion-safe transition-colors",
    "focus-visible:focus-ring",
    "disabled:pointer-events-none disabled:opacity-disabled",
  ].join(" "),
  {
    variants: {
      selected: {
        true: "border-contractor-filter-pill-border-selected bg-contractor-filter-pill-bg-selected text-contractor-filter-pill-text-selected",
        false:
          "border-contractor-filter-pill-border bg-contractor-filter-pill-bg text-contractor-filter-pill-text hover:bg-surface-muted",
      },
    },
    defaultVariants: {
      selected: false,
    },
  },
);

export type FilterPillVariantProps = VariantProps<typeof filterPillVariants>;
