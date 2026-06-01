"use client";

import { cn } from "@/lib/utils/cn";
import type { ContractorNavItem } from "@/lib/contractor/types";
import { CONTRACTOR_ROUTES } from "@/lib/contractor/routes";
import { ContractorFixedChromePortal } from "@/components/layout/ContractorFixedChromePortal";
import {
  ContractorTopNav,
  ContractorScheduleCtaBar,
  ContractorProfileSignOutCtaBar,
} from "./ContractorTopNav";
import { ContractorBottomNav } from "./ContractorBottomNav";

export type ContractorShellProps = {
  title: string;
  activeNav?: ContractorNavItem;
  backHref?: string;
  navVariant?: "default" | "back" | "photos";
  showBottomNav?: boolean;
  showScheduleCta?: boolean;
  showProfileSignOutCta?: boolean;
  /** Fixed footer (e.g. lead detail quick actions) — replaces bottom nav when set. */
  quickActionBar?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  bodyClassName?: string;
};

const PORTAL_HREFS = {
  leads: CONTRACTOR_ROUTES.leads,
  pipeline: CONTRACTOR_ROUTES.pipeline,
  calendar: CONTRACTOR_ROUTES.schedule,
  profile: CONTRACTOR_ROUTES.profile,
} as const;

/** Contractor portal page shell — 24px content inset below top nav and above bottom chrome. */
export function ContractorShell({
  title,
  activeNav,
  backHref,
  navVariant,
  showBottomNav = true,
  showScheduleCta = false,
  showProfileSignOutCta = false,
  quickActionBar,
  children,
  className,
  bodyClassName,
}: ContractorShellProps) {
  const hasQuickActionBar = Boolean(quickActionBar);
  const hasCtaAboveBottomNav = (showScheduleCta || showProfileSignOutCta) && showBottomNav;
  const hasBottomNavOnly = showBottomNav && !hasQuickActionBar && !hasCtaAboveBottomNav;
  const resolvedNavVariant = navVariant ?? (backHref ? "back" : "default");

  const mainPaddingBottom = hasQuickActionBar
    ? "contractor-shell-main--quick-actions"
    : hasCtaAboveBottomNav
      ? "contractor-shell-main--cta-and-nav"
      : hasBottomNavOnly
        ? "contractor-shell-main--bottom-nav"
        : "contractor-shell-main--content-only";

  const topNav = <ContractorTopNav title={title} variant={resolvedNavVariant} backHref={backHref} />;
  const scheduleCta = showScheduleCta ? <ContractorScheduleCtaBar /> : null;
  const profileCta = showProfileSignOutCta ? <ContractorProfileSignOutCtaBar /> : null;
  const bottomNav =
    showBottomNav && activeNav && !quickActionBar ? (
      <ContractorBottomNav active={activeNav} hrefs={PORTAL_HREFS} />
    ) : null;

  return (
    <div className={cn("contractor-mobile-width relative mx-auto min-h-dvh w-full bg-background-default", className)}>
      <ContractorFixedChromePortal>{topNav}</ContractorFixedChromePortal>

      <main className={cn("contractor-shell-main", mainPaddingBottom, bodyClassName)}>{children}</main>

      <ContractorFixedChromePortal>
        {scheduleCta}
        {profileCta}
        {quickActionBar}
        {bottomNav}
      </ContractorFixedChromePortal>
    </div>
  );
}
