import { cn } from "@/lib/utils/cn";

export type NavigationBackIconProps = {
  /** Figma `Foundation/Icon/Navigation/Back` — `right` for trailing list chevrons. */
  position?: "left" | "right";
  className?: string;
};

const PATHS = {
  left: "M14 18L8 12L14 6",
  right: "M10 18L16 12L10 6",
} as const;

/** Figma `Foundation/Icon/Navigation/Back` (809:7519) */
export function NavigationBackIcon({ position = "left", className }: NavigationBackIconProps) {
  return (
    <svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("size-6 shrink-0 text-[#4b5563]", className)}
      aria-hidden
    >
      <path
        d={PATHS[position]}
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
