import Link from "next/link";
import { cn } from "@/lib/utils/cn";

/**
 * Secondary entry point for contractors on the homeowner landing screen.
 * Low-emphasis text link — must not compete visually with the primary "Start Roof Check" CTA.
 * Spec: 12–14px, medium weight, white at 80–90% opacity, min 44px tap target.
 */
export function ContractorLoginLink({ className }: { className?: string }) {
  return (
    <Link
      href="/contractor/login"
      aria-label="Contractor login"
      className={cn(
        // Tap target — minimum 44×44px per WCAG 2.5.5
        "flex min-h-[44px] min-w-[44px] items-start justify-end pt-1 shrink-0",
        // Typography
        "text-xs font-medium leading-none tracking-wide",
        // Color — white at 85% opacity over hero image
        "text-white/85",
        // Hover / active
        "transition-opacity duration-fast ease-standard",
        "hover:text-white/100 active:text-white/100",
        // Focus ring using border-focus token
        "rounded-sm",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-1 focus-visible:ring-offset-transparent",
        className,
      )}
    >
      {/* Shorten to "Login" only on very narrow viewports (<360px) */}
      <span className="min-[360px]:hidden">Login</span>
      <span className="hidden min-[360px]:inline">Contractor Login</span>
    </Link>
  );
}
