import { cn } from "@/lib/utils/cn";
import { NavigationIcon, type NavigationIconName } from "@/components/foundation/icons/NavigationIcon";
import {
  navigationNavItemIconSizeVariants,
  navigationNavItemLabelVariants,
  navigationNavItemVariants,
  type NavigationNavItemVariantProps,
} from "@/lib/variants/navigation-nav-item";

export type NavigationNavItemIcon = "dashboard" | "pipeline" | "calendar" | "profile";

const ICON_MAP: Record<NavigationNavItemIcon, NavigationIconName> = {
  dashboard: "dashboard",
  pipeline: "pipeline",
  calendar: "calendar",
  profile: "profile",
};

export type NavigationNavItemProps = NavigationNavItemVariantProps & {
  icon: NavigationNavItemIcon;
  labelText?: string;
  className?: string;
};

function resolveLabelState(
  state: NonNullable<NavigationNavItemVariantProps["state"]>,
  style: NonNullable<NavigationNavItemVariantProps["style"]>,
): "default" | "active" | "disabled" {
  if (state === "disabled") return "disabled";
  if (state === "active" || style === "filled" || style === "pill") return "active";
  return "default";
}

function resolveIconFilled(
  state: NonNullable<NavigationNavItemVariantProps["state"]>,
  style: NonNullable<NavigationNavItemVariantProps["style"]>,
): boolean {
  if (state === "disabled") return false;
  return state === "active" || style === "filled" || style === "pill";
}

/** Figma `Navigation/Nav Item` — icon + optional caption for portal and shell nav. */
export function NavigationNavItem({
  className,
  icon,
  labelText,
  state: stateProp = "default",
  label = "on",
  size = "md",
  style: styleProp = "standard",
}: NavigationNavItemProps) {
  const state = stateProp ?? "default";
  const style = styleProp ?? "standard";
  const labelState = resolveLabelState(state, style);
  const iconFilled = resolveIconFilled(state, style);

  return (
    <div className={cn(navigationNavItemVariants({ state, label, size, style }), className)}>
      <NavigationIcon
        name={ICON_MAP[icon]}
        filled={iconFilled}
        className={navigationNavItemIconSizeVariants({ size })}
      />
      {label === "on" && labelText ? (
        <span className={navigationNavItemLabelVariants({ state: labelState, style })}>{labelText}</span>
      ) : null}
    </div>
  );
}
