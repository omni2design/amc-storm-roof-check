"use client";

import { AnimatePresence, motion, useReducedMotion, type Variants } from "framer-motion";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";
import {
  FLOW_TRANSITION_EASE,
  getFlowSlideOffsetPx,
  getFlowTransitionDurationSeconds,
  type FlowTransitionDirection,
  type FlowTransitionVariant,
} from "@/lib/flow/flow-transition";
import { useFlowTransitionMeta } from "@/components/layout/FlowTransitionProvider";

function buildVariants(
  variant: FlowTransitionVariant,
  reducedMotion: boolean,
): Variants {
  if (reducedMotion) {
    return {
      enter: { opacity: 0 },
      center: { opacity: 1 },
      exit: { opacity: 0 },
    };
  }

  if (variant === "intro") {
    return {
      enter: { opacity: 0, y: 12 },
      center: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -8 },
    };
  }

  if (variant === "success") {
    return {
      enter: { opacity: 0, scale: 0.98 },
      center: { opacity: 1, scale: 1 },
      exit: { opacity: 0, scale: 1 },
    };
  }

  const offset = getFlowSlideOffsetPx();
  return {
    enter: (direction: FlowTransitionDirection) => ({
      opacity: 0,
      x: direction === "forward" ? offset : -offset,
    }),
    center: { opacity: 1, x: 0 },
    exit: (direction: FlowTransitionDirection) => ({
      opacity: 0,
      x: direction === "forward" ? -offset : offset,
    }),
  };
}

export function FlowPageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const { direction, variant } = useFlowTransitionMeta();
  const reducedMotion = useReducedMotion();
  const variants = buildVariants(variant, reducedMotion ?? false);
  const duration = getFlowTransitionDurationSeconds(variant, reducedMotion ?? false);

  return (
    <AnimatePresence mode="wait" initial={false} custom={direction}>
      <motion.div
        key={pathname}
        custom={direction}
        variants={variants}
        initial="enter"
        animate="center"
        exit="exit"
        transition={{
          duration,
          ease: FLOW_TRANSITION_EASE,
        }}
        className={cn("min-h-dvh w-full overflow-x-clip")}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
