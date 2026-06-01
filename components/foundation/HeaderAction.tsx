"use client";

import Link from "next/link";
import { cn } from "@/lib/utils/cn";
import {
  markContractorPortalEntry,
  type ContractorPortalEntrySource,
} from "@/lib/contractor/portal-entry";

export type HeaderActionProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
  "aria-label"?: string;
  /** Plays contractor portal intro transition on the destination route. */
  contractorEntrySource?: ContractorPortalEntrySource;
};

/**
 * Figma `Navigation/Header Action` — small pill for hero/header secondary links.
 */
export function HeaderAction({
  href,
  children,
  className,
  "aria-label": ariaLabel,
  contractorEntrySource,
}: HeaderActionProps) {
  return (
    <Link
      href={href}
      aria-label={ariaLabel}
      onPointerDown={
        contractorEntrySource
          ? () => markContractorPortalEntry(contractorEntrySource)
          : undefined
      }
      className={cn(
        "inline-flex items-center justify-center rounded-pill border border-border-subtle bg-button-secondary px-3 py-1",
        "text-xs font-semibold text-button-secondary-text motion-safe transition-colors",
        "hover:bg-button-secondary-hover focus-visible:focus-ring",
        className,
      )}
    >
      {children}
    </Link>
  );
}
