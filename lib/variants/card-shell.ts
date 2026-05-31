import { cva, type VariantProps } from "class-variance-authority";

/**
 * Card shell — Figma shared card container (Default, Flat, Elevated, Muted).
 */
export const cardShellVariants = cva(
  ["rounded-card border motion-safe transition-colors"].join(" "),
  {
    variants: {
      variant: {
        default: "border-border-default bg-surface-card shadow-semantic-card",
        flat: "border-border-subtle bg-surface-card shadow-semantic-rest",
        elevated: "border-border-default bg-surface-raised shadow-semantic-popover",
        muted: "border-contractor-notes-border bg-contractor-notes-bg shadow-semantic-rest",
      },
      padding: {
        none: "p-0",
        sm: "p-3",
        md: "p-4",
        lg: "p-5",
      },
    },
    defaultVariants: {
      variant: "default",
      padding: "md",
    },
  },
);

export type CardShellVariantProps = VariantProps<typeof cardShellVariants>;
