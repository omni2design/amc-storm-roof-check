import { cva, type VariantProps } from "class-variance-authority";

/**
 * Icon-only button — Figma `Button / Icon Only` matrix (subset: no pressed in some rows; use active:).
 */
const iconButtonSvg =
  "[&_svg]:m-0 [&_svg]:block [&_svg]:size-full [&_svg]:min-h-0 [&_svg]:min-w-0 [&_svg]:max-h-full [&_svg]:max-w-full [&_svg]:shrink-0";

export const iconButtonVariants = cva(
  [
    "inline-flex shrink-0 items-center justify-center overflow-hidden p-1 font-semibold motion-safe",
    "rounded-control border transition-colors",
    "focus-visible:focus-ring",
    "disabled:pointer-events-none disabled:opacity-disabled",
    "aria-busy:pointer-events-none aria-busy:opacity-loading",
    iconButtonSvg,
  ].join(" "),
  {
    variants: {
      intent: {
        primary:
          "border-transparent bg-button-primary text-button-primary-text hover:bg-button-primary-hover active:bg-button-primary-active",
        navy: "border-transparent bg-button-navy text-button-navy-text hover:bg-button-navy-hover active:bg-button-navy-active",
        outline:
          "border-button-outline-border bg-button-outline text-button-outline-text hover:bg-button-outline-hover active:bg-button-outline-active",
        ghost:
          "border-transparent bg-transparent text-button-ghost-text hover:bg-button-ghost-hover hover:text-foreground-primary",
        emergency:
          "border-transparent bg-button-emergency text-button-emergency-text hover:bg-button-emergency-hover active:bg-button-emergency-active",
        destructive:
          "border-transparent bg-button-destructive text-button-destructive-text hover:bg-button-destructive-hover active:bg-button-destructive-active",
        subtle:
          "border-transparent bg-button-subtle text-button-subtle-text hover:bg-button-subtle-hover active:bg-button-subtle-active",
        warning:
          "border-transparent bg-button-warning text-button-warning-text hover:bg-button-warning-hover active:bg-button-warning-active",
      },
      size: {
        sm: "size-8",
        md: "size-10",
        lg: "size-11",
      },
    },
    defaultVariants: {
      intent: "primary",
      size: "md",
    },
  },
);

export type IconButtonVariantProps = VariantProps<typeof iconButtonVariants>;
