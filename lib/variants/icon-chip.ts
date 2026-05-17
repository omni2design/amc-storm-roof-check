import { cva, type VariantProps } from "class-variance-authority";

/** Figma icon chip behind option-card / inline action icons — 4px inset, centered glyph */
export const iconChipVariants = cva(
  "pointer-events-none flex shrink-0 items-center justify-center overflow-hidden p-1",
  {
    variants: {
      tone: {
        default: "bg-roof-selection-icon-chip",
        selected: "bg-roof-selection-icon-chip-selected",
        warning: "bg-status-warning-bg",
        muted: "bg-border-default",
      },
      size: {
        md: "size-10 rounded-[0.625rem]",
        sm: "size-8 rounded-lg",
      },
    },
    defaultVariants: {
      tone: "default",
      size: "md",
    },
  },
);

export type IconChipVariantProps = VariantProps<typeof iconChipVariants>;
