"use client";

import Link from "next/link";
import { cn } from "@/lib/utils/cn";
import { AmcLogo } from "@/components/brand/AmcLogo";
import { NavBackIcon } from "@/components/brand/NavBackIcon";
import { ContractorNotificationIcon } from "./ContractorNotificationIcon";
import { CONTRACTOR_ROUTES } from "@/lib/contractor/routes";

export type ContractorTopNavVariant = "default" | "back" | "photos";

export type ContractorTopNavProps = {
  title: string;
  variant?: ContractorTopNavVariant;
  backHref?: string;
  showNotification?: boolean;
  className?: string;
};

/** Figma `Contractor/Top Nav` (829:8189) — default | back | photos variants, 80px bar. */
export function ContractorTopNav({
  title,
  variant = "default",
  backHref,
  showNotification = true,
  className,
}: ContractorTopNavProps) {
  const leftSlot =
    variant === "default" ? (
      <Link
        href={CONTRACTOR_ROUTES.landing}
        aria-label="Back to homeowner landing"
        className="flex size-8 shrink-0 items-center justify-center focus-visible:focus-ring"
      >
        <AmcLogo variant="sm-no-text-sq" />
      </Link>
    ) : backHref ? (
      <Link
        href={backHref}
        aria-label="Go back"
        className="flex size-8 shrink-0 items-center justify-center rounded-pill bg-surface-nav-button text-icon-brand motion-safe transition-colors hover:bg-background-muted focus-visible:focus-ring"
      >
        <NavBackIcon className="rotate-180" />
      </Link>
    ) : (
      <span className="size-8 shrink-0" aria-hidden />
    );

  return (
    <header
      className={cn(
        "contractor-fixed-top flex h-20 items-center justify-between border border-contractor-nav-border bg-contractor-nav-bg px-6 shadow-[0_1px_4px_rgb(17_24_39/0.04)]",
        className,
      )}
    >
      {leftSlot}

      <div className="flex min-w-0 flex-1 flex-col items-center overflow-hidden px-2">
        {variant === "photos" ? (
          <p className="truncate text-xs leading-tight tracking-[0.03px] text-foreground-muted">{title}</p>
        ) : (
          <h1 className="truncate text-lg leading-relaxed font-medium text-foreground-primary">{title}</h1>
        )}
      </div>

      <div className="flex w-8 shrink-0 items-center justify-end">
        {showNotification ? (
          <button
            type="button"
            aria-label="Notifications"
            className="flex size-8 items-center justify-center rounded-pill focus-visible:focus-ring"
          >
            <ContractorNotificationIcon />
          </button>
        ) : (
          <span className="size-8" aria-hidden />
        )}
      </div>
    </header>
  );
}

export type ContractorScheduleCtaBarProps = {
  className?: string;
  href?: string;
};

/** Figma BottomCTA (829:8249) — gradient strip + primary button above bottom nav. */
export function ContractorScheduleCtaBar({
  className,
  href = CONTRACTOR_ROUTES.leadDetail("lead-001"),
}: ContractorScheduleCtaBarProps) {
  return (
    <div
      className={cn(
        "contractor-fixed-above-bottom-nav flex h-[88px] flex-col items-start justify-end gap-2.5",
        "bg-gradient-to-t from-white to-transparent px-6 py-4",
        className,
      )}
    >
      <Link
        href={href}
        className={cn(
          "inline-flex w-full items-center justify-center gap-2 rounded-pill bg-button-primary px-6 py-4",
          "text-base font-semibold leading-6 tracking-[0.16px] text-button-primary-text",
          "motion-safe transition-colors hover:bg-button-primary-hover focus-visible:focus-ring",
        )}
      >
        <img
          src="/icons/action/add.svg"
          alt=""
          width={24}
          height={24}
          className="size-6 shrink-0"
          aria-hidden
        />
        Schedule Inspection
      </Link>
    </div>
  );
}

export type ContractorProfileSignOutCtaBarProps = {
  className?: string;
  href?: string;
};

/** Figma BottomCTA (829:8224) — Sign Out above bottom nav on profile screen. */
export function ContractorProfileSignOutCtaBar({
  className,
  href = CONTRACTOR_ROUTES.login,
}: ContractorProfileSignOutCtaBarProps) {
  return (
    <div
      className={cn(
        "contractor-fixed-above-bottom-nav flex h-[88px] flex-col items-start justify-end gap-2.5",
        "bg-gradient-to-t from-white to-transparent px-6 py-4",
        className,
      )}
    >
      <Link
        href={href}
        className={cn(
          "inline-flex w-full items-center justify-center rounded-pill bg-button-primary px-6 py-4",
          "text-base font-semibold leading-6 tracking-[0.16px] text-button-primary-text",
          "motion-safe transition-colors hover:bg-button-primary-hover focus-visible:focus-ring",
        )}
      >
        Sign Out
      </Link>
    </div>
  );
}
