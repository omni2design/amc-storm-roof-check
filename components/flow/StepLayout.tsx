"use client";

import type { ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import { flowSteps } from "@/lib/flow/flowConfig";
import { getPrevFlowPath } from "@/lib/flow/flowRoutes";
import { cn } from "@/lib/utils/cn";
import { FlowShell } from "@/components/layout/FlowShell";
import { TopNav } from "@/components/foundation/TopNav";
import { Button } from "@/components/foundation/Button";

type StepLayoutProps = {
  title: string;
  subtitle?: string;
  children: ReactNode;
  onNext?: () => void;
  onBack?: () => void;
  backPath?: string;
  nextLabel?: string;
  nextDisabled?: boolean;
  onSkip?: () => void;
  skipLabel?: string;
  skipClassName?: string;
  /** Primary CTA above skip (Figma step 8 footer) */
  footerOrder?: "skip-first" | "primary-first";
  /** Fill viewport between header and footer (photo upload step) */
  contentFill?: boolean;
  showProgress?: boolean;
};

export function StepLayout({
  title,
  subtitle,
  children,
  onNext,
  onBack,
  backPath,
  nextLabel = "Continue →",
  nextDisabled = false,
  onSkip,
  skipLabel = "Skip",
  skipClassName,
  footerOrder = "skip-first",
  contentFill = false,
  showProgress = true,
}: StepLayoutProps) {
  const router = useRouter();
  const pathname = usePathname();

  const handleBack =
    onBack ??
    (() => {
      const prev = backPath ?? getPrevFlowPath(pathname);
      if (prev) router.push(prev);
    });

  const currentStepIndex = flowSteps.findIndex((s) => s.path === pathname);
  const canContinue = Boolean(onNext) && !nextDisabled;

  const primaryCta = onNext ? (
    <Button
      type="button"
      intent="emergency"
      size="lg"
      className="w-full"
      onClick={onNext}
      disabled={!canContinue}
    >
      {nextLabel}
    </Button>
  ) : null;

  const skipControl = onSkip ? (
    <Button
      type="button"
      intent="ghost"
      size="lg"
      className={cn("w-full px-6 py-4", skipClassName)}
      onClick={onSkip}
    >
      {skipLabel}
    </Button>
  ) : null;

  const footer = (
    <div className="flex w-full flex-col gap-3">
      {footerOrder === "primary-first" ? (
        <>
          {primaryCta}
          {skipControl}
        </>
      ) : (
        <>
          {skipControl}
          {primaryCta}
        </>
      )}
    </div>
  );

  return (
    <FlowShell variant="intake" footer={footer}>
      <TopNav
        variant="progress"
        onBack={handleBack}
        currentStep={showProgress && currentStepIndex >= 0 ? currentStepIndex + 1 : undefined}
        totalSteps={showProgress && currentStepIndex >= 0 ? flowSteps.length : undefined}
      />

      <div className="flow-intake-page-body flex min-h-0 flex-1 flex-col gap-8 px-6">
        <header className="shrink-0 flex flex-col gap-2 text-center">
          <h1 className="text-intake-title text-balance text-foreground-primary">{title}</h1>
          {subtitle ? (
            <p className="mx-auto max-w-[18rem] text-pretty text-sm-leading text-foreground-secondary">
              {subtitle}
            </p>
          ) : null}
        </header>
        <section
          className={cn("flex min-h-0 flex-col gap-6", contentFill && "min-h-0 flex-1")}
        >
          {children}
        </section>
      </div>
    </FlowShell>
  );
}
