import type { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

export type EmergencyCalloutProps = {
  children: ReactNode;
  className?: string;
};

/** Figma `Emergency Callout` — storm / active-leak messaging */
export function EmergencyCallout({ children, className }: EmergencyCalloutProps) {
  return (
    <div
      className={cn(
        "rounded-control border border-roof-emergency-banner-border bg-roof-emergency-banner px-4 py-3 text-sm-leading text-foreground-secondary",
        className,
      )}
      role="note"
    >
      {children}
    </div>
  );
}
