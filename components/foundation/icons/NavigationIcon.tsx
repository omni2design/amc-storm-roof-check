import { cn } from "@/lib/utils/cn";

export type NavigationIconName = "dashboard" | "pipeline" | "calendar" | "profile";

export type NavigationIconProps = {
  name: NavigationIconName;
  /** Figma `Filled` style — active tab (urgent/red artwork) */
  filled?: boolean;
  className?: string;
};

const ICON_SRC: Record<NavigationIconName, { outline: string; filled: string }> = {
  dashboard: {
    outline: "/icons/navigation/dashboard-outline.svg",
    filled: "/icons/navigation/dashboard-filled.svg",
  },
  pipeline: {
    outline: "/icons/navigation/pipeline-outline.svg",
    filled: "/icons/navigation/pipeline-filled.svg",
  },
  calendar: {
    outline: "/icons/navigation/calendar-outline.svg",
    filled: "/icons/navigation/calendar-filled.svg",
  },
  profile: {
    outline: "/icons/navigation/profile-outline.svg",
    filled: "/icons/navigation/profile-filled.svg",
  },
};

/** Figma Foundation/Icon/Navigation/* — outline (default) or filled (active tab). */
export function NavigationIcon({ name, filled = false, className }: NavigationIconProps) {
  const src = filled ? ICON_SRC[name].filled : ICON_SRC[name].outline;

  return (
    <img
      src={src}
      alt=""
      width={24}
      height={24}
      className={cn("size-6 shrink-0", className)}
      aria-hidden
    />
  );
}
