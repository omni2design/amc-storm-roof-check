import { cva, type VariantProps } from "class-variance-authority";

/** Figma `Upload Card` — dashed 1.5px, 12px radius, 24px padding */
export const uploadCardVariants = cva(
  [
    "flex w-full flex-col items-center justify-center gap-2 rounded-xl border-[1.5px] border-dashed p-6 text-center motion-safe transition-colors",
    "focus-visible:focus-ring-input",
  ].join(" "),
  {
    variants: {
      state: {
        empty:
          "border-[#d1d5db] bg-background-subtle text-foreground-secondary hover:border-border-strong",
        uploaded: "border-border-strong bg-surface-card text-foreground-primary shadow-semantic-rest",
        error: "border-border-error bg-status-danger-bg text-status-danger-text",
        loading: "border-[#d1d5db] bg-background-subtle text-foreground-muted state-loading",
      },
    },
    defaultVariants: {
      state: "empty",
    },
  },
);

export type UploadCardVariantProps = VariantProps<typeof uploadCardVariants>;
