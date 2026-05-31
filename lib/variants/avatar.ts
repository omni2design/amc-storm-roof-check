import { cva, type VariantProps } from "class-variance-authority";

/**
 * Avatar — Figma `Avatar` (sm, md, lg).
 */
export const avatarVariants = cva(
  [
    "inline-flex shrink-0 items-center justify-center overflow-hidden rounded-pill",
    "bg-surface-selected font-semibold text-foreground-brand",
  ].join(" "),
  {
    variants: {
      size: {
        sm: "size-8 text-caption",
        md: "size-10 text-label",
        lg: "size-12 text-body-strong",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

export type AvatarVariantProps = VariantProps<typeof avatarVariants>;
