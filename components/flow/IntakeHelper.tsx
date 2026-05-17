import { cn } from "@/lib/utils/cn";
import { EmergencyCallout } from "@/components/product/roof-check/EmergencyCallout";
import type { IntakeHelper as IntakeHelperConfig } from "@/lib/flow/intake-options";

export type IntakeHelperProps = {
  helper: IntakeHelperConfig;
  className?: string;
};

export function IntakeHelper({ helper, className }: IntakeHelperProps) {
  if (helper.variant === "emergency") {
    return <EmergencyCallout className={className}>{helper.content}</EmergencyCallout>;
  }

  return (
    <p
      className={cn(
        "rounded-control border border-border-default bg-background-subtle px-4 py-3 text-sm-leading text-foreground-secondary",
        className,
      )}
      role="note"
    >
      {helper.content}
    </p>
  );
}
