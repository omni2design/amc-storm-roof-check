import { cn } from "@/lib/utils/cn";
import { AmcLogo } from "@/components/brand/AmcLogo";

export type TopNavLogoProps = {
  className?: string;
};

/** Figma Foundation/Brand Logo `no-text-sq` sm — flow top nav (829:8105) */
export function TopNavLogo({ className }: TopNavLogoProps) {
  return <AmcLogo variant="sm-no-text-sq" className={cn("shrink-0", className)} />;
}
