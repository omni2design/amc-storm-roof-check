import { cva, type VariantProps } from "class-variance-authority";

/**
 * Button — Figma `Button` intents × sizes.
 */
export const buttonVariants = cva(
  [
    "inline-flex shrink-0 items-center justify-center gap-2 font-semibold motion-safe",
    "border transition-colors",
    "focus-visible:focus-ring",
    "disabled:pointer-events-none disabled:opacity-disabled",
    "aria-busy:pointer-events-none aria-busy:opacity-loading",
  ].join(" "),
  {
    variants: {
      intent: {
        primary:
          "border-transparent bg-button-primary text-button-primary-text hover:bg-button-primary-hover active:bg-button-primary-active",
        secondary:
          "border-button-secondary-border bg-button-secondary text-button-secondary-text hover:bg-button-secondary-hover",
        navy: "border-transparent bg-button-navy text-button-navy-text hover:bg-button-navy-hover active:bg-button-navy-active",
        outline:
          "border-button-outline-border bg-button-outline text-button-outline-text hover:bg-button-outline-hover active:bg-button-outline-active",
        subtle:
          "border-transparent bg-button-subtle text-button-subtle-text hover:bg-button-subtle-hover active:bg-button-subtle-active",
        ghost:
          "border-transparent bg-transparent text-button-ghost-text hover:bg-button-ghost-hover hover:text-foreground-primary",
        emergency:
          "border-transparent bg-button-emergency text-button-emergency-text hover:bg-button-emergency-hover active:bg-button-emergency-active",
        destructive:
          "border-transparent bg-button-destructive text-button-destructive-text hover:bg-button-destructive-hover active:bg-button-destructive-active",
        warning:
          "border-transparent bg-button-warning text-button-warning-text hover:bg-button-warning-hover active:bg-button-warning-active",
      },
      size: {
        sm: "min-h-9 rounded-control px-3 text-sm leading-tight",
        md: "min-h-11 rounded-control px-4 text-sm leading-snug",
        lg: "rounded-pill px-6 py-4 text-base leading-normal tracking-[0.01em]",
      },
    },
    defaultVariants: {
      intent: "primary",
      size: "md",
    },
  },
);

export type ButtonVariantProps = VariantProps<typeof buttonVariants>;
