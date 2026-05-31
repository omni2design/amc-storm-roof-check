import { cva, type VariantProps } from "class-variance-authority";

/**
 * Search bar — Figma `Search Bar` (Default, Focus).
 */
export const searchBarVariants = cva(
  [
    "flex w-full items-center gap-2 rounded-control border px-3 py-2.5 shadow-semantic-rest motion-safe transition-colors",
    "focus-within:border-contractor-search-border-focus focus-within:focus-ring-input",
  ].join(" "),
  {
    variants: {
      state: {
        default: "border-contractor-search-border bg-contractor-search-bg",
        disabled: "border-border-subtle bg-surface-disabled opacity-disabled",
      },
    },
    defaultVariants: {
      state: "default",
    },
  },
);

export type SearchBarVariantProps = VariantProps<typeof searchBarVariants>;
