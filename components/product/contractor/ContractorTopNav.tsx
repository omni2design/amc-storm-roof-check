"use client";

import Link from "next/link";
import { cn } from "@/lib/utils/cn";
import { IconButton } from "@/components/foundation/IconButton";
import { NavBackIcon } from "@/components/brand/NavBackIcon";
import { TopNavLogo } from "@/components/brand/TopNavLogo";

export type ContractorTopNavProps = {
  title: string;
  onBack?: () => void;
  backHref?: string;
  showLogo?: boolean;
  trailing?: React.ReactNode;
  className?: string;
};

/** Figma `Contractor Top Nav` — fixed header with back, title, optional logo/action. */
export function ContractorTopNav({
  title,
  onBack,
  backHref,
  showLogo = false,
  trailing,
  className,
}: ContractorTopNavProps) {
  const backControl =
    onBack || backHref ? (
      backHref ? (
        <Link
          href={backHref}
          aria-label="Go back"
          className="flex size-8 items-center justify-center rounded-pill bg-surface-nav-button text-icon-brand motion-safe transition-colors hover:bg-background-muted focus-visible:focus-ring"
        >
          <NavBackIcon className="rotate-180" />
        </Link>
      ) : (
        <IconButton intent="subtle" size="sm" aria-label="Go back" onClick={onBack} className="rounded-pill">
          <NavBackIcon className="rotate-180" />
        </IconButton>
      )
    ) : (
      <span className="size-8" aria-hidden />
    );

  return (
    <header
      className={cn(
        "contractor-fixed-top flex flex-col border-b border-contractor-nav-border bg-contractor-nav-bg",
        className,
      )}
    >
      <div className="grid grid-cols-[2rem_1fr_2rem] items-center gap-3 px-4 py-3">
        {backControl}
        <h1 className="truncate text-center text-sm-leading font-semibold text-foreground-primary">{title}</h1>
        {showLogo ? (
          <Link href="/contractor/login" aria-label="Contractor home" className="flex size-8 items-center justify-center focus-visible:focus-ring">
            <TopNavLogo />
          </Link>
        ) : trailing ? (
          <div className="flex justify-end">{trailing}</div>
        ) : (
          <span className="size-8" aria-hidden />
        )}
      </div>
    </header>
  );
}
