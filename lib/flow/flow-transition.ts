import {
  getHomeownerFlowPageIndex,
  POST_FLOW_ROUTES,
  PRE_FLOW_ROUTES,
} from "@/lib/flow/flowRoutes";

export type FlowTransitionDirection = "forward" | "back";
export type FlowTransitionVariant = "slide" | "intro" | "success";

const SLIDE_OFFSET_PX = 16;

export function getFlowTransitionDirection(
  fromPath: string,
  toPath: string,
): FlowTransitionDirection {
  const fromIndex = getHomeownerFlowPageIndex(fromPath);
  const toIndex = getHomeownerFlowPageIndex(toPath);

  if (fromIndex < 0 || toIndex < 0) return "forward";
  if (toIndex > fromIndex) return "forward";
  if (toIndex < fromIndex) return "back";
  return "forward";
}

export function getFlowTransitionVariant(
  fromPath: string,
  toPath: string,
): FlowTransitionVariant {
  if (fromPath === PRE_FLOW_ROUTES.landing && toPath === PRE_FLOW_ROUTES.whatToExpect) {
    return "intro";
  }
  if (fromPath === POST_FLOW_ROUTES.submitting && toPath === POST_FLOW_ROUTES.result) {
    return "success";
  }
  return "slide";
}

export function getFlowSlideOffsetPx(): number {
  return SLIDE_OFFSET_PX;
}

export function getFlowTransitionDurationSeconds(
  variant: FlowTransitionVariant,
  reducedMotion: boolean,
): number {
  if (reducedMotion) return 0.15;
  if (variant === "intro") return 0.28;
  if (variant === "success") return 0.3;
  return 0.25;
}

export const FLOW_TRANSITION_EASE = [0.2, 0, 0, 1] as const;
