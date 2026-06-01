"use client";

import { AnimatePresence, motion, useReducedMotion, type Variants } from "framer-motion";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";
import {
  CONTRACTOR_TRANSITION_EASE,
  getContractorPageTransitionKey,
  getContractorSlideOffsetPx,
  getContractorTransitionDurationSeconds,
  type ContractorTransitionDirection,
  type ContractorTransitionVariant,
} from "@/lib/contractor/contractor-transition";
import { useContractorTransitionMeta } from "@/components/layout/ContractorTransitionProvider";

function buildVariants(
  variant: ContractorTransitionVariant,
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

  if (variant === "tab") {
    return {
      enter: { opacity: 0 },
      center: { opacity: 1 },
      exit: { opacity: 0 },
    };
  }

  const offset = getContractorSlideOffsetPx();
  return {
    enter: (direction: ContractorTransitionDirection) => ({
      opacity: 0,
      x: direction === "forward" ? offset : -offset,
    }),
    center: { opacity: 1, x: 0 },
    exit: (direction: ContractorTransitionDirection) => ({
      opacity: 0,
      x: direction === "forward" ? -offset : offset,
    }),
  };
}

export function ContractorPageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const transitionKey = getContractorPageTransitionKey(pathname);
  const { direction, variant, animateInitial } = useContractorTransitionMeta();
  const reducedMotion = useReducedMotion();
  const variants = buildVariants(variant, reducedMotion ?? false);
  const duration = getContractorTransitionDurationSeconds(variant, reducedMotion ?? false);

  return (
    <AnimatePresence mode="wait" initial={animateInitial} custom={direction}>
      <motion.div
        key={transitionKey}
        custom={direction}
        variants={variants}
        initial="enter"
        animate="center"
        exit="exit"
        transition={{
          duration,
          ease: CONTRACTOR_TRANSITION_EASE,
        }}
        className={cn("min-h-dvh w-full overflow-x-clip bg-background-default")}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
