"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  type ReactNode,
} from "react";
import { usePathname } from "next/navigation";
import {
  getFlowTransitionDirection,
  getFlowTransitionVariant,
  type FlowTransitionDirection,
  type FlowTransitionVariant,
} from "@/lib/flow/flow-transition";

export type FlowTransitionMeta = {
  direction: FlowTransitionDirection;
  variant: FlowTransitionVariant;
};

const FlowTransitionContext = createContext<FlowTransitionMeta | null>(null);
const FlowTransitionScopeContext = createContext(false);

export function useFlowTransitionMeta(): FlowTransitionMeta {
  const value = useContext(FlowTransitionContext);
  if (!value) {
    return { direction: "forward", variant: "slide" };
  }
  return value;
}

/** True inside `app/(flow)` — fixed chrome is portaled above page motion. */
export function useFlowTransitionScope(): boolean {
  return useContext(FlowTransitionScopeContext);
}

export function FlowTransitionProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const previousPathRef = useRef(pathname);

  const meta = useMemo<FlowTransitionMeta>(() => {
    const from = previousPathRef.current;
    return {
      direction: getFlowTransitionDirection(from, pathname),
      variant: getFlowTransitionVariant(from, pathname),
    };
  }, [pathname]);

  useEffect(() => {
    previousPathRef.current = pathname;
  }, [pathname]);

  return (
    <FlowTransitionScopeContext.Provider value>
      <FlowTransitionContext.Provider value={meta}>{children}</FlowTransitionContext.Provider>
    </FlowTransitionScopeContext.Provider>
  );
}
