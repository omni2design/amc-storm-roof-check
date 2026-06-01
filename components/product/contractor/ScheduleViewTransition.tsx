"use client";

import { AnimatePresence, motion, useReducedMotion, type Variants } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useRef, type ReactNode } from "react";
import {
  CONTRACTOR_TRANSITION_EASE,
  getContractorSegmentSlideOffsetPx,
  getContractorTransitionDurationSeconds,
  getScheduleViewDirection,
  isScheduleViewSwitch,
  type ContractorTransitionDirection,
} from "@/lib/contractor/contractor-transition";

function buildSegmentVariants(reducedMotion: boolean): Variants {
  if (reducedMotion) {
    return {
      enter: { opacity: 0 },
      center: { opacity: 1 },
      exit: { opacity: 0 },
    };
  }

  const offset = getContractorSegmentSlideOffsetPx();
  return {
    enter: (direction: ContractorTransitionDirection) => ({
      opacity: 0,
      x: direction === "forward" ? offset : -offset,
    }),
    center: { opacity: 1, x: 0 },
    exit: (direction: ContractorTransitionDirection) => ({
      opacity: 0,
      x: direction === "forward" ? -offset * 0.6 : offset * 0.6,
    }),
  };
}

/** Horizontal segment transition for Today / Tomorrow / Week agenda content. */
export function ScheduleViewTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const reducedMotion = useReducedMotion();
  const previousPathRef = useRef(pathname);
  const shouldAnimate = useMemo(
    () => isScheduleViewSwitch(previousPathRef.current, pathname),
    [pathname],
  );
  const direction = useMemo(
    () => getScheduleViewDirection(previousPathRef.current, pathname),
    [pathname],
  );
  const variants = buildSegmentVariants(reducedMotion ?? false);
  const duration = getContractorTransitionDurationSeconds("segment", reducedMotion ?? false);

  useEffect(() => {
    previousPathRef.current = pathname;
  }, [pathname]);

  if (!shouldAnimate) {
    return <div className="flex flex-col gap-4">{children}</div>;
  }

  return (
    <AnimatePresence mode="sync" initial={false} custom={direction}>
      <motion.div
        key={pathname}
        custom={direction}
        variants={variants}
        initial="enter"
        animate="center"
        exit="exit"
        transition={{
          duration,
          ease: CONTRACTOR_TRANSITION_EASE,
        }}
        className="flex flex-col gap-4"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
