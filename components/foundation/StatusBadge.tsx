import { cn } from "@/lib/utils/cn";
import { statusBadgeVariants, type StatusBadgeVariantProps } from "@/lib/variants/status-badge";

export type StatusBadgeProps = React.HTMLAttributes<HTMLSpanElement> &
  StatusBadgeVariantProps & {
    live?: boolean;
  };

export function StatusBadge({ className, status, live, children, ...props }: StatusBadgeProps) {
  return (
    <span
      className={cn(statusBadgeVariants({ status }), className)}
      role={live ? "status" : undefined}
      aria-live={live ? "polite" : undefined}
      {...props}
    >
      {children}
    </span>
  );
}
