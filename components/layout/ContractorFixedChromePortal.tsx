"use client";

import { useEffect, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { useContractorTransitionScope } from "@/components/layout/ContractorTransitionProvider";

/** Keeps top/bottom contractor chrome fixed while route content animates. */
export function ContractorFixedChromePortal({ children }: { children: ReactNode }) {
  const inScope = useContractorTransitionScope();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (inScope && mounted) {
    return createPortal(children, document.body);
  }

  return children;
}
