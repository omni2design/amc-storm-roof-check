"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { cn } from "@/lib/utils/cn";
import { TopNavLogo } from "@/components/brand/TopNavLogo";
import { NavBackIcon } from "@/components/brand/NavBackIcon";
import { ProgressBar } from "@/components/foundation/ProgressBar";
import { useFlowTransitionScope } from "@/components/layout/FlowTransitionProvider";
import { PRE_FLOW_ROUTES } from "@/lib/flow/flowRoutes";
import { useRestartRoofCheck } from "@/lib/flow/useRestartRoofCheck";

export type TopNavProps = {
  onBack?: () => void;
  brandLabel?: string;
  currentStep?: number;
  totalSteps?: number;
  className?: string;
  variant?: "default" | "progress";
};

/** Figma `Top Nav Progress` — fixed, max 460px, progress bar attached below row */
export function TopNav({
  onBack,
  brandLabel = "All Might Contracting",
  currentStep,
  totalSteps,
  className,
  variant = "progress",
}: TopNavProps) {
  const inFlowScope = useFlowTransitionScope();
  const restartFlow = useRestartRoofCheck();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const showProgress =
    variant === "progress" &&
    typeof currentStep === "number" &&
    typeof totalSteps === "number" &&
    totalSteps > 0;
  const progressValue = showProgress ? currentStep / totalSteps : 0;

  const header =
    variant === "default" ? (
      <header
        className={cn(
          "flow-fixed-nav flex w-full items-center justify-center border-b border-border-default bg-surface-card px-6 py-6",
          className,
        )}
      >
        <p className="text-lg-leading font-semibold text-foreground-primary">{brandLabel}</p>
      </header>
    ) : (
      <header
        className={cn("flow-fixed-nav flex w-full flex-col bg-surface-card", className)}
        aria-label="Intake progress"
      >
        <div className="grid w-full grid-cols-[2rem_1fr_2rem] items-center gap-3 border-b border-border-default px-6 py-6">
          {onBack ? (
            <button
              type="button"
              onClick={onBack}
              className="flex size-8 items-center justify-center rounded-pill bg-surface-nav-button text-icon-brand motion-safe transition-colors hover:bg-background-muted focus-visible:focus-ring"
              aria-label="Go back"
            >
              <NavBackIcon className="rotate-180" />
            </button>
          ) : (
            <span className="size-8" aria-hidden />
          )}
          {showProgress ? (
            <p className="text-center text-2xs-leading tracking-[0.05px] text-foreground-secondary">
              Step {currentStep} of {totalSteps}
            </p>
          ) : (
            <p className="text-center text-lg-leading font-semibold text-foreground-primary">{brandLabel}</p>
          )}
          <Link
            href={PRE_FLOW_ROUTES.landing}
            aria-label="Go to landing page and start over"
            className="flex size-8 shrink-0 items-center justify-center rounded-lg focus-visible:focus-ring"
            onClick={(event) => {
              event.preventDefault();
              restartFlow();
            }}
          >
            <TopNavLogo />
          </Link>
        </div>
        {showProgress ? <ProgressBar value={progressValue} className="h-1 w-full rounded-none" /> : null}
      </header>
    );

  if (inFlowScope && mounted) {
    return createPortal(header, document.body);
  }

  return header;
}
