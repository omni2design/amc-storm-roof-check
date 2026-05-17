import { cva, type VariantProps } from "class-variance-authority";

/**
 * Figma `Selection / Option Card` — 73px height, 16px padding, 12px gap.
 */
export const optionCardVariants = cva(
  [
    "interactive-card flex h-[4.5625rem] w-full items-center gap-3 border-[1.5px] p-4 text-left",
    "rounded-2xl shadow-semantic-rest",
    "focus-visible:focus-ring",
    "disabled:pointer-events-none disabled:opacity-disabled",
  ].join(" "),
  {
    variants: {
      state: {
        default:
          "border-border-default bg-surface-card text-foreground-primary hover:bg-roof-selection-hover",
        hover: "border-border-default bg-roof-selection-hover text-foreground-primary",
        selected:
          "border-roof-selection-selected bg-roof-selection-selected text-foreground-inverse",
        disabled: "border-border-default bg-roof-selection-hover text-foreground-disabled",
        warning:
          "border-border-warning bg-roof-selection-warning text-foreground-warning shadow-semantic-rest",
      },
    },
    defaultVariants: {
      state: "default",
    },
  },
);

export type OptionCardVariantProps = VariantProps<typeof optionCardVariants>;

/** Figma Caption 10/140 — option card description line */
export const optionCardDescriptionVariants = cva("text-caption-10 w-full min-w-0 text-pretty", {
  variants: {
    state: {
      default: "text-foreground-secondary",
      hover: "text-foreground-secondary",
      selected: "text-foreground-muted",
      disabled: "text-foreground-disabled",
      warning: "text-foreground-warning",
    },
  },
  defaultVariants: {
    state: "default",
  },
});

export type OptionCardDescriptionVariantProps = VariantProps<typeof optionCardDescriptionVariants>;
