import { cn } from "@/lib/utils/cn";
import { getIconSvg, iconModeToColorMode } from "@/lib/icons/registry";
import type { IconId, IconMode, IconSize } from "@/lib/icons/types";
import { iconColorVariants } from "@/lib/variants/icon";

const sizeClasses: Record<IconSize, string> = {
  sm: "size-4",
  md: "size-5",
  lg: "size-6",
  xl: "size-[4.5rem]",
};

export type IconProps = {
  name: IconId;
  mode?: IconMode;
  size?: IconSize;
  className?: string;
  label?: string;
};

/**
 * Renders exact Figma SVG vectors (public/icons + generated registry).
 * Missing icons: returns null — extend manifest via scripts/sync-figma-icons.mjs.
 */
export function Icon({ name, mode = "brand", size = "md", className, label }: IconProps) {
  const inner = getIconSvg(name, mode);
  if (!inner) {
    if (process.env.NODE_ENV !== "production") {
      console.warn(`[Icon] Missing SVG for "${name}" mode="${mode}" — run icon sync from Figma.`);
    }
    return null;
  }

  const colorMode = iconModeToColorMode[mode] ?? "brand";

  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid meet"
      role={label ? "img" : undefined}
      aria-hidden={label ? undefined : true}
      aria-label={label}
      className={cn(
        "m-0 block shrink-0",
        sizeClasses[size],
        iconColorVariants({ mode: colorMode }),
        className,
      )}
      dangerouslySetInnerHTML={{ __html: inner }}
    />
  );
}
