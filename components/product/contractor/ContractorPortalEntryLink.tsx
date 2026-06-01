"use client";

import Link from "next/link";
import type { ComponentProps } from "react";
import { markContractorPortalEntry, type ContractorPortalEntrySource } from "@/lib/contractor/portal-entry";

type ContractorPortalEntryLinkProps = ComponentProps<typeof Link> & {
  entrySource: ContractorPortalEntrySource;
};

/** Sets portal entry marker before navigation so contractor layout can play intro motion. */
export function ContractorPortalEntryLink({
  entrySource,
  onClick,
  ...props
}: ContractorPortalEntryLinkProps) {
  return (
    <Link
      {...props}
      onPointerDown={(event) => {
        markContractorPortalEntry(entrySource);
        onClick?.(event);
      }}
    />
  );
}
