import { cn } from "@/lib/utils/cn";
import {
  amcLogoVariants,
  type AmcLogoVariant,
} from "@/lib/brand/amc-logo-variants";

export type AmcLogoProps = {
  /** Figma size variant — `sm-default` nav (32px), `landing-cover` hero (64px) */
  variant?: AmcLogoVariant;
  className?: string;
};

/** AMC Logo — layer composites, single asset, or loading ring per variant */
export function AmcLogo({ variant = "sm-default", className }: AmcLogoProps) {
  const config = amcLogoVariants[variant];

  if (config.type === "asset") {
    return (
      <img
        src={config.src}
        alt=""
        width={config.sizePx}
        height={config.sizePx}
        className={cn("shrink-0 object-contain", className)}
        style={{ width: config.sizePx, height: config.sizePx }}
        aria-hidden
      />
    );
  }

  if (config.type === "loading") {
    return (
      <div
        className={cn("relative shrink-0", className)}
        style={{ width: config.sizePx, height: config.sizePx }}
        aria-hidden
      >
        <div
          className={cn(
            "pointer-events-none absolute inset-0 z-0 overflow-hidden",
            config.roundedClass,
            config.bgClass,
          )}
        >
          <img src={config.innerSrc} alt="" className="size-full object-cover" />
        </div>
        {/* Same 100×100 bounds as logo so stroke sits on the circle edge */}
        <div className="pointer-events-none absolute inset-0 z-10 origin-center motion-safe animate-[amc-spin_0.8s_linear_infinite]">
          <svg
            viewBox="0 0 100 100"
            fill="none"
            className="size-full"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden
          >
            <path
              d="M98 49.9999C97.9995 60.1364 94.7901 70.0125 88.8317 78.2128C82.8733 86.4132 74.4718 92.5167 64.8313 95.6488C55.1909 98.7808 44.8064 98.7805 35.1661 95.6479C25.5258 92.5153 17.1247 86.4113 11.1667 78.2106C5.20881 70.01 1.99993 60.1337 2 49.9972C2.00007 39.8607 5.2091 29.9845 11.1672 21.7839C17.1252 13.5833 25.5264 7.47942 35.1667 4.34699C44.8071 1.21455 55.1916 1.21441 64.832 4.34658"
              stroke="#B22E2E"
              strokeWidth="4.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative shrink-0 overflow-hidden",
        config.roundedClass,
        config.bgClass,
        className,
      )}
      style={{ width: config.sizePx, height: config.sizePx }}
      aria-hidden
    >
      {config.layers.map((layer) => (
        <img
          key={layer.src}
          src={layer.src}
          alt=""
          className={cn("pointer-events-none absolute max-w-none object-contain", layer.inset)}
        />
      ))}
    </div>
  );
}
