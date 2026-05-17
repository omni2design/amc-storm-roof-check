import { iconSvgByKey, type GeneratedIconKey } from "./generated";
import type { IconId, IconMode } from "./types";

export function iconKey(id: IconId, mode: IconMode = "brand"): GeneratedIconKey {
  return `${id.replace(/\//g, "--")}__${mode}` as GeneratedIconKey;
}

const MODE_FALLBACK: IconMode[] = ["brand", "brand-fill", "inverse", "default"];

export function getIconSvg(id: IconId, mode: IconMode = "brand"): string | null {
  const modes = [mode, ...MODE_FALLBACK.filter((m) => m !== mode)];
  for (const m of modes) {
    const svg = iconSvgByKey[iconKey(id, m)];
    if (svg) return svg;
  }
  return null;
}

/** Maps Figma icon modes to semantic icon color tokens (via Icon component). */
export const iconModeToColorMode: Record<
  IconMode,
  "default" | "brand" | "inverse" | "subtle" | "disabled" | "urgent" | "success" | "loading"
> = {
  default: "default",
  brand: "brand",
  "brand-fill": "brand",
  inverse: "inverse",
  subtle: "subtle",
  disabled: "disabled",
  urgent: "urgent",
  success: "success",
  loading: "loading",
};
