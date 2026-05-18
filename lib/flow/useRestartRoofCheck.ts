"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { PRE_FLOW_ROUTES } from "@/lib/flow/flowRoutes";
import { useRoofCheckStore } from "@/lib/flow/useRoofCheckStore";

/** Clears intake state and returns to the landing page (fresh flow). */
export function useRestartRoofCheck() {
  const router = useRouter();
  const { reset } = useRoofCheckStore();

  return useCallback(() => {
    reset();
    router.push(PRE_FLOW_ROUTES.landing);
  }, [reset, router]);
}
