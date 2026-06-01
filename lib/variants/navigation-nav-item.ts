import { cva, type VariantProps } from "class-variance-authority";

/**
 * Figma `Navigation/Nav Item` (727:4075)
 * https://www.figma.com/design/DnlD52iTlNrh8rZj1rMY1W/AMC-Storm-Roof-Check?node-id=727-4075
 */
export const navigationNavItemVariants = cva(
  [
    "flex flex-col items-center justify-center gap-1 rounded-lg p-1 motion-safe transition-colors",
    "focus-visible:focus-ring",
  ].join(" "),
  {
    variants: {
      state: {
        default: "",
        active: "",
        disabled: "pointer-events-none opacity-45",
      },
      label: {
        on: "",
        off: "",
      },
      size: {
        sm: "",
        md: "",
      },
      style: {
        standard: "",
        filled: "",
        pill: "rounded-[20px] bg-background-subtle px-3 py-1",
      },
    },
    defaultVariants: {
      state: "default",
      label: "on",
      size: "md",
      style: "standard",
    },
  },
);

export const navigationNavItemLabelVariants = cva(
  "text-[10px] leading-[1.4] tracking-[0.05px] whitespace-nowrap",
  {
    variants: {
      state: {
        default: "font-normal text-foreground-secondary",
        active: "font-semibold text-text-urgent",
        disabled: "font-normal text-[#6b7280]",
      },
      style: {
        standard: "",
        filled: "",
        pill: "font-semibold text-text-urgent",
      },
    },
    compoundVariants: [
      {
        state: "default",
        style: "filled",
        className: "font-semibold text-text-urgent",
      },
      {
        state: "default",
        style: "pill",
        className: "font-semibold text-text-urgent",
      },
    ],
    defaultVariants: {
      state: "default",
      style: "standard",
    },
  },
);

export const navigationNavItemIconSizeVariants = cva("shrink-0", {
  variants: {
    size: {
      sm: "size-5",
      md: "size-6",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export type NavigationNavItemVariantProps = VariantProps<typeof navigationNavItemVariants>;
