import { cva, type VariantProps } from "class-variance-authority";

/** Textarea shell — Figma `Field / Textarea` */
export const textareaVariants = cva(
  [
    "flex w-full min-h-[10.5rem] flex-col gap-1 rounded-control border px-4 py-3 text-left motion-safe transition-colors",
    "focus-within:border-input-border-focus focus-within:focus-ring-input",
    "has-[:disabled]:pointer-events-none has-[:disabled]:opacity-disabled",
  ].join(" "),
  {
    variants: {
      state: {
        default: "border-input-border bg-input-bg text-input-text",
        error: "border-border-error bg-input-bg text-foreground-danger",
        disabled: "border-border-subtle bg-surface-disabled text-foreground-muted",
      },
    },
    defaultVariants: {
      state: "default",
    },
  },
);

export type TextareaVariantProps = VariantProps<typeof textareaVariants>;
