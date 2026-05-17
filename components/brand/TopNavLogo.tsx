import { cn } from "@/lib/utils/cn";

export type TopNavLogoProps = {
  className?: string;
};

/** Figma AMC Logo `sm-default` (1:95) — single inline 32×32 SVG */
export function TopNavLogo({ className }: TopNavLogoProps) {
  return (
    <svg
      width={32}
      height={32}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      className={cn("size-8 shrink-0", className)}
      aria-hidden
    >
      <rect width={32} height={32} rx={8} className="fill-surface-muted" />
      <image
        xlinkHref="/brand/top-nav-layers/mascot.svg"
        x="20.05%"
        y="14.24%"
        width="59.99%"
        height="42.32%"
        preserveAspectRatio="xMidYMid meet"
      />
      <image
        xlinkHref="/brand/top-nav-layers/house.svg"
        x="26.67%"
        y="46.29%"
        width="46.76%"
        height="17.63%"
        preserveAspectRatio="xMidYMid meet"
      />
      <image
        xlinkHref="/brand/top-nav-layers/text.svg"
        x="18.61%"
        y="65.62%"
        width="62.74%"
        height="20.21%"
        preserveAspectRatio="xMidYMid meet"
      />
    </svg>
  );
}
