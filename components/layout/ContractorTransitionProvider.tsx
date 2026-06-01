"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { usePathname } from "next/navigation";
import {
  getContractorTransitionDirection,
  getContractorTransitionDurationSeconds,
  getContractorTransitionVariant,
  type ContractorTransitionDirection,
  type ContractorTransitionVariant,
} from "@/lib/contractor/contractor-transition";
import {
  consumeContractorPortalEntry,
  peekContractorPortalEntry,
  type ContractorPortalEntrySource,
} from "@/lib/contractor/portal-entry";

export type ContractorTransitionMeta = {
  direction: ContractorTransitionDirection;
  variant: ContractorTransitionVariant;
  /** True when entering the portal from landing/demo — enables intro enter animation. */
  animateInitial: boolean;
};

function readPendingPortalEntry(): ContractorPortalEntrySource | null {
  if (typeof window === "undefined") return null;
  return peekContractorPortalEntry();
}

const ContractorTransitionContext = createContext<ContractorTransitionMeta | null>(null);
const ContractorTransitionScopeContext = createContext(false);

export function useContractorTransitionMeta(): ContractorTransitionMeta {
  const value = useContext(ContractorTransitionContext);
  if (!value) {
    return { direction: "forward", variant: "push", animateInitial: false };
  }
  return value;
}

/** True inside `app/contractor` — fixed chrome is portaled above page motion. */
export function useContractorTransitionScope(): boolean {
  return useContext(ContractorTransitionScopeContext);
}

export function ContractorTransitionProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const previousPathRef = useRef(pathname);
  const [externalEntry, setExternalEntry] = useState<ContractorPortalEntrySource | null>(
    readPendingPortalEntry,
  );

  const meta = useMemo<ContractorTransitionMeta>(() => {
    const from = previousPathRef.current;
    const variant = getContractorTransitionVariant(from, pathname, externalEntry);
    return {
      direction: getContractorTransitionDirection(from, pathname),
      variant,
      animateInitial: Boolean(externalEntry && variant === "intro"),
    };
  }, [pathname, externalEntry]);

  useEffect(() => {
    previousPathRef.current = pathname;
  }, [pathname]);

  useEffect(() => {
    if (!externalEntry) return;
    consumeContractorPortalEntry();
    const durationMs = getContractorTransitionDurationSeconds("intro", false) * 1000 + 50;
    const timeout = window.setTimeout(() => setExternalEntry(null), durationMs);
    return () => window.clearTimeout(timeout);
  }, [externalEntry]);

  return (
    <ContractorTransitionScopeContext.Provider value>
      <ContractorTransitionContext.Provider value={meta}>{children}</ContractorTransitionContext.Provider>
    </ContractorTransitionScopeContext.Provider>
  );
}
