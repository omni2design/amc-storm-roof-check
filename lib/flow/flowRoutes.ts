/** Mobile intake route order — matches Figma “Step X of 9”. */
export const FLOW_ROUTE_ORDER = [
  "/step-1-issue",
  "/step-2-urgency",
  "/step-3-roof-age",
  "/step-4-prior-repairs",
  "/step-5-insurance",
  "/step-6-budget",
  "/step-7-photos",
  "/step-8-anything-else",
  "/contact",
] as const;

export type FlowRoute = (typeof FLOW_ROUTE_ORDER)[number];

export function getFlowStepIndex(pathname: string): number {
  return FLOW_ROUTE_ORDER.indexOf(pathname as FlowRoute);
}

export function getPrevFlowPath(pathname: string): string | null {
  const index = getFlowStepIndex(pathname);
  if (index === 0) return PRE_FLOW_ROUTES.whatToExpect;
  if (index < 0) return null;
  return FLOW_ROUTE_ORDER[index - 1] ?? null;
}

/** Pre-intake routes */
export const PRE_FLOW_ROUTES = {
  landing: "/landing",
  whatToExpect: "/what-to-expect",
} as const;

export const POST_FLOW_ROUTES = {
  submitting: "/submitting",
  result: "/result",
} as const;

/** Full homeowner flow order — used for page transition direction */
export const HOMEOWNER_FLOW_PAGE_ORDER = [
  PRE_FLOW_ROUTES.landing,
  PRE_FLOW_ROUTES.whatToExpect,
  ...FLOW_ROUTE_ORDER,
  POST_FLOW_ROUTES.submitting,
  POST_FLOW_ROUTES.result,
] as const;

export type HomeownerFlowPage = (typeof HOMEOWNER_FLOW_PAGE_ORDER)[number];

export function getHomeownerFlowPageIndex(pathname: string): number {
  return HOMEOWNER_FLOW_PAGE_ORDER.indexOf(pathname as HomeownerFlowPage);
}
