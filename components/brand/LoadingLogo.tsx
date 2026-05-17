import { AmcLogo } from "@/components/brand/AmcLogo";
import { cn } from "@/lib/utils/cn";

export type LoadingLogoProps = {
  className?: string;
};

/** Figma AMC Logo xl (100px) + rotating loading ring — submitting screen (349:19429) */
export function LoadingLogo({ className }: LoadingLogoProps) {
  return <AmcLogo variant="submitting-loading" className={cn("shrink-0", className)} />;
}
