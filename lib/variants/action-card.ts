import { cva, type VariantProps } from "class-variance-authority";

/**
 * Compact action tile — Figma `Action` (Default, Hover, Selected, Disabled).
 */
export const actionCardVariants = cva(
  [
    "inline-flex flex-col items-center justify-center gap-1 font-semibold motion-safe",
    "rounded-control border shadow-semantic-rest transition-colors",
    "focus-visible:focus-ring",
    "disabled:pointer-events-none disabled:opacity-disabled",
  ].join(" "),
  {
    variants: {
      state: {
        default:
          "border-border-default bg-surface-card text-foreground-primary hover:border-border-strong hover:bg-surface-muted",
        hover: "border-border-strong bg-surface-muted text-foreground-primary",
        selected:
          "border-border-strong bg-roof-selection-selected text-foreground-primary shadow-semantic-card",
        disabled: "border-border-subtle bg-surface-disabled text-foreground-muted",
      },
    },
    defaultVariants: {
      state: "default",
    },
  },
);

export type ActionCardVariantProps = VariantProps<typeof actionCardVariants>;
