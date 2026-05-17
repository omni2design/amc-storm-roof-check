import type { ButtonVariantProps } from "@/lib/variants/button";
import type { IconMode } from "@/lib/icons/types";

const INVERSE_INTENTS: NonNullable<ButtonVariantProps["intent"]>[] = [
  "primary",
  "navy",
  "emergency",
  "destructive",
  "warning",
];

export function buttonIconMode(intent: ButtonVariantProps["intent"] = "primary"): IconMode {
  return INVERSE_INTENTS.includes(intent ?? "primary") ? "inverse" : "brand";
}
