import { cn } from "@/lib/utils/cn";

export type NavBackIconProps = {
  className?: string;
};

/** Figma `PreviousButton` arrow — 10×15px vector */
export function NavBackIcon({ className }: NavBackIconProps) {
  return (
    <svg
      viewBox="0 0 11 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("h-[0.9375rem] w-2.5 shrink-0", className)}
      aria-hidden
    >
      <path
        d="M2.5 1L10 8.5L2.5 16"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
