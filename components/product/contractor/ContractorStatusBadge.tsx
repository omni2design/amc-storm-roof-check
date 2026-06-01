import { cn } from "@/lib/utils/cn";
import {
  contractorStatusBadgeDotVariants,
  contractorStatusBadgeVariants,
  type ContractorStatusBadgeVariantProps,
} from "@/lib/variants/contractor-status-badge";

export type ContractorStatusBadgeProps = React.HTMLAttributes<HTMLSpanElement> &
  ContractorStatusBadgeVariantProps & {
    live?: boolean;
  };

/**
 * Figma `Contractor/Status Badge` (216:21)
 * Critical · High Priority · Needs Inspection · Scheduled · Contacted · New · Neutral
 * @see https://www.figma.com/design/DnlD52iTlNrh8rZj1rMY1W/AMC-Storm-Roof-Check?node-id=216-21
 */
export function ContractorStatusBadge({
  className,
  status,
  live,
  children,
  ...props
}: ContractorStatusBadgeProps) {
  return (
    <span
      className={cn(contractorStatusBadgeVariants({ status }), className)}
      role={live ? "status" : undefined}
      aria-live={live ? "polite" : undefined}
      {...props}
    >
      {status ? <span className={contractorStatusBadgeDotVariants({ status })} aria-hidden /> : null}
      {children}
    </span>
  );
}
