import { cn } from "@/lib/utils/cn";

/**
 * Scrollable page content inside `ContractorShell`.
 * Vertical spacing to top/bottom nav is handled by the shell — do not add `py-*` here.
 */
export function ContractorPageContent({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={cn("flex flex-col gap-4", className)}>{children}</div>;
}
