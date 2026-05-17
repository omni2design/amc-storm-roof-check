import { cva, type VariantProps } from "class-variance-authority";

/**
 * Icon stroke/fill color — Figma icon `Mode` (default, brand, inverse, …).
 * Use on `<svg className={cn(iconColorVariants({ mode }))}>` with `currentColor` strokes/fills.
 */
export const iconColorVariants = cva("", {
  variants: {
    mode: {
      default: "text-icon-default",
      brand: "text-icon-brand",
      "brand-fill": "text-icon-brand",
      inverse: "text-icon-inverse",
      subtle: "text-icon-subtle",
      disabled: "text-icon-disabled",
      urgent: "text-icon-urgent",
      success: "text-icon-success",
      loading: "text-icon-loading",
      primary: "text-icon-primary",
      muted: "text-icon-muted",
    },
  },
  defaultVariants: {
    mode: "default",
  },
});

export type IconColorVariantProps = VariantProps<typeof iconColorVariants>;
