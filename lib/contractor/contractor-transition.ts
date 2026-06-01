import { CONTRACTOR_ROUTES } from "@/lib/contractor/routes";
import { FLOW_TRANSITION_EASE } from "@/lib/flow/flow-transition";
import type { ContractorPortalEntrySource } from "@/lib/contractor/portal-entry";

export type ContractorTransitionDirection = "forward" | "back";
export type ContractorTransitionVariant = "intro" | "tab" | "push" | "pop" | "segment";

const SLIDE_OFFSET_PX = 16;
const SEGMENT_SLIDE_OFFSET_PX = 20;

export const CONTRACTOR_SCHEDULE_VIEW_ORDER = [
  CONTRACTOR_ROUTES.schedule,
  CONTRACTOR_ROUTES.scheduleTomorrow,
  CONTRACTOR_ROUTES.scheduleWeek,
] as const;

/** Bottom-nav root routes in left-to-right tab order. */
export const CONTRACTOR_TAB_ROUTES = [
  CONTRACTOR_ROUTES.leads,
  CONTRACTOR_ROUTES.pipeline,
  CONTRACTOR_ROUTES.schedule,
  CONTRACTOR_ROUTES.profile,
] as const;

export type ContractorTabRoute = (typeof CONTRACTOR_TAB_ROUTES)[number];

function normalizePath(path: string): string {
  if (path.length > 1 && path.endsWith("/")) return path.slice(0, -1);
  return path;
}

export function getContractorTabIndex(pathname: string): number {
  const path = normalizePath(pathname);
  if (path === CONTRACTOR_ROUTES.leads) return 0;
  if (path === CONTRACTOR_ROUTES.pipeline) return 1;
  if (path.startsWith(`${CONTRACTOR_ROUTES.schedule}`)) return 2;
  if (path === CONTRACTOR_ROUTES.profile) return 3;
  return -1;
}

function isBottomNavTabRoute(pathname: string): boolean {
  return getContractorTabIndex(pathname) >= 0 && !isScheduleChildRoute(pathname);
}

function isScheduleChildRoute(pathname: string): boolean {
  return isScheduleViewRoute(pathname) && normalizePath(pathname) !== CONTRACTOR_ROUTES.schedule;
}

export function isScheduleViewRoute(pathname: string): boolean {
  const path = normalizePath(pathname);
  return (
    path === CONTRACTOR_ROUTES.schedule ||
    path === CONTRACTOR_ROUTES.scheduleTomorrow ||
    path === CONTRACTOR_ROUTES.scheduleWeek
  );
}

export function getScheduleViewIndex(pathname: string): number {
  const path = normalizePath(pathname);
  return CONTRACTOR_SCHEDULE_VIEW_ORDER.indexOf(path as (typeof CONTRACTOR_SCHEDULE_VIEW_ORDER)[number]);
}

export function isScheduleViewSwitch(fromPath: string, toPath: string): boolean {
  return isScheduleViewRoute(fromPath) && isScheduleViewRoute(toPath);
}

export function getScheduleViewDirection(
  fromPath: string,
  toPath: string,
): ContractorTransitionDirection {
  const fromIndex = getScheduleViewIndex(fromPath);
  const toIndex = getScheduleViewIndex(toPath);
  if (fromIndex < 0 || toIndex < 0) return "forward";
  if (toIndex > fromIndex) return "forward";
  if (toIndex < fromIndex) return "back";
  return "forward";
}

/** Keeps schedule sub-routes mounted under one transition key so toggle + layout persist. */
export function getContractorPageTransitionKey(pathname: string): string {
  if (isScheduleViewRoute(pathname)) return CONTRACTOR_ROUTES.schedule;
  return normalizePath(pathname);
}

/** Stack depth for push/pop slide transitions (higher = deeper in hierarchy). */
export function getContractorRouteDepth(pathname: string): number {
  const path = normalizePath(pathname);

  if (path === CONTRACTOR_ROUTES.demo || path === CONTRACTOR_ROUTES.login) return 0;
  if (isBottomNavTabRoute(path) || isScheduleViewRoute(path)) return 1;

  const leadDetailPattern = /^\/contractor\/leads\/[^/]+$/;
  if (leadDetailPattern.test(path)) return 2;

  const photoPattern = /^\/contractor\/leads\/[^/]+\/photos\/[^/]+$/;
  if (photoPattern.test(path)) return 3;

  return 1;
}

function isTabSwitch(fromPath: string, toPath: string): boolean {
  const from = normalizePath(fromPath);
  const to = normalizePath(toPath);
  if (!isBottomNavTabRoute(from) || !isBottomNavTabRoute(to)) return false;
  return getContractorTabIndex(from) !== getContractorTabIndex(to);
}

function isPortalIntroTarget(pathname: string): boolean {
  const path = normalizePath(pathname);
  return path === CONTRACTOR_ROUTES.demo || path === CONTRACTOR_ROUTES.leads;
}

export function getContractorTransitionDirection(
  fromPath: string,
  toPath: string,
): ContractorTransitionDirection {
  if (isScheduleViewSwitch(fromPath, toPath)) {
    return getScheduleViewDirection(fromPath, toPath);
  }

  const fromTab = getContractorTabIndex(fromPath);
  const toTab = getContractorTabIndex(toPath);

  if (fromTab >= 0 && toTab >= 0 && isBottomNavTabRoute(fromPath) && isBottomNavTabRoute(toPath)) {
    if (toTab > fromTab) return "forward";
    if (toTab < fromTab) return "back";
    return "forward";
  }

  const fromDepth = getContractorRouteDepth(fromPath);
  const toDepth = getContractorRouteDepth(toPath);
  if (toDepth > fromDepth) return "forward";
  if (toDepth < fromDepth) return "back";
  return "forward";
}

export function getContractorTransitionVariant(
  fromPath: string,
  toPath: string,
  externalEntry: ContractorPortalEntrySource | null = null,
): ContractorTransitionVariant {
  const to = normalizePath(toPath);

  if (externalEntry === "landing" && isPortalIntroTarget(to)) {
    return "intro";
  }
  if (externalEntry === "demo" && to === CONTRACTOR_ROUTES.leads) {
    return "intro";
  }

  if (isTabSwitch(fromPath, toPath)) return "tab";
  if (isScheduleViewSwitch(fromPath, toPath)) return "segment";

  const fromDepth = getContractorRouteDepth(fromPath);
  const toDepth = getContractorRouteDepth(toPath);

  if (toDepth > fromDepth) return "push";
  if (toDepth < fromDepth) return "pop";

  if (fromDepth === toDepth && normalizePath(fromPath) !== normalizePath(toPath)) {
    return "tab";
  }

  return "push";
}

export function getContractorSlideOffsetPx(): number {
  return SLIDE_OFFSET_PX;
}

export function getContractorSegmentSlideOffsetPx(): number {
  return SEGMENT_SLIDE_OFFSET_PX;
}

export function getContractorTransitionDurationSeconds(
  variant: ContractorTransitionVariant,
  reducedMotion: boolean,
): number {
  if (reducedMotion) return 0.15;
  if (variant === "intro") return 0.28;
  if (variant === "tab") return 0.2;
  if (variant === "segment") return 0.22;
  return 0.25;
}

export const CONTRACTOR_SEGMENT_SPRING = {
  type: "spring" as const,
  stiffness: 520,
  damping: 38,
  mass: 0.85,
};

export { FLOW_TRANSITION_EASE as CONTRACTOR_TRANSITION_EASE };
