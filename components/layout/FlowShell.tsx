"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils/cn";
import { useFlowTransitionScope } from "@/components/layout/FlowTransitionProvider";

import type { ReactNode } from "react";

export type FlowShellProps = {
  children: ReactNode;
  footer?: ReactNode;
  maxWidth?: "mobile" | "sm" | "md" | "lg" | "full";
  variant?: "default" | "intake" | "result";
  className?: string;
};

const maxWidthClass = {
  mobile: "flow-mobile-width",
  sm: "max-w-sm w-full mx-auto",
  md: "max-w-md w-full mx-auto",
  lg: "max-w-lg w-full mx-auto",
  full: "w-full max-w-full",
} as const;

export function FlowShell({
  children,
  footer,
  maxWidth = "mobile",
  variant = "default",
  className,
}: FlowShellProps) {
  const inFlowScope = useFlowTransitionScope();
  const [mounted, setMounted] = useState(false);
  const isIntake = variant === "intake";
  const isResult = variant === "result";

  useEffect(() => {
    setMounted(true);
  }, []);

  const footerBar = footer ? (
    <div className="flow-fixed-footer border-t border-border-default bg-surface-card flow-intake-footer">
      {footer}
    </div>
  ) : null;

  return (
    <main
      className={cn(
        "relative min-h-dvh w-full",
        isResult ? "bg-button-navy" : isIntake ? "bg-background-subtle" : "bg-background-default",
        className,
      )}
    >
      <div className={cn("mx-auto flex min-h-dvh w-full flex-col", maxWidthClass[maxWidth])}>{children}</div>
      {footerBar && inFlowScope && mounted
        ? createPortal(footerBar, document.body)
        : footerBar}
    </main>
  );
}
