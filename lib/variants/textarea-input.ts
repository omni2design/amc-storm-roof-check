import { cva, type VariantProps } from "class-variance-authority";

/** Figma `Field / Textarea Input` — card shell with overline label, helper, counter */
export const textareaInputVariants = cva(
  [
    "flex w-full flex-col gap-2 rounded-xl border-[1.5px] p-4 text-left shadow-semantic-rest motion-safe transition-colors",
    "focus-within:border-input-border-focus focus-within:focus-ring-input",
    "has-[:disabled]:pointer-events-none has-[:disabled]:opacity-disabled",
  ].join(" "),
  {
    variants: {
      state: {
        default: "border-input-border bg-input-bg",
        error: "border-border-error bg-input-bg",
        disabled: "border-border-subtle bg-surface-disabled",
      },
    },
    defaultVariants: {
      state: "default",
    },
  },
);

export type TextareaInputVariantProps = VariantProps<typeof textareaInputVariants>;
