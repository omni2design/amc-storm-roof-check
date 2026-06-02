"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useLayoutEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils/cn";
import { CONTRACTOR_SEGMENT_SPRING } from "@/lib/contractor/contractor-transition";
import type { CalendarViewMode } from "@/lib/contractor/types";

export type ContractorCalendarToggleProps = {
  value: CalendarViewMode;
  onChange: (mode: CalendarViewMode) => void;
  /** When true, the selection pill springs between segments (Today / Tomorrow / Week). */
  slideSelection?: boolean;
  className?: string;
};

const MODES: { id: CalendarViewMode; label: string }[] = [
  { id: "today", label: "Today" },
  { id: "tomorrow", label: "Tomorrow" },
  { id: "week", label: "Week" },
];

const MODE_INDEX: Record<CalendarViewMode, number> = {
  today: 0,
  tomorrow: 1,
  week: 2,
};

const PILL_TEXT_PADDING_PX = 12;

type PillMetrics = {
  left: number;
  width: number;
};

/** Figma `Contractor Calendar Toggle` — Apple-style sliding pill + view mode switcher. */
export function ContractorCalendarToggle({
  value,
  onChange,
  slideSelection = false,
  className,
}: ContractorCalendarToggleProps) {
  const reducedMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [pillMetrics, setPillMetrics] = useState<PillMetrics | null>(null);
  const selectedIndex = MODE_INDEX[value];
  const pillTransition =
    slideSelection && !reducedMotion ? CONTRACTOR_SEGMENT_SPRING : { duration: 0 };

  useLayoutEffect(() => {
    const container = containerRef.current;
    const button = tabRefs.current[selectedIndex];
    if (!container || !button) return;

    const measure = () => {
      const label = button.querySelector("span");
      if (!label) return;

      const containerRect = container.getBoundingClientRect();
      const labelRect = label.getBoundingClientRect();

      setPillMetrics({
        left: labelRect.left - containerRect.left - PILL_TEXT_PADDING_PX,
        width: labelRect.width + PILL_TEXT_PADDING_PX * 2,
      });
    };

    measure();

    const label = button.querySelector("span");
    const observer = new ResizeObserver(measure);
    observer.observe(container);
    observer.observe(button);
    if (label) observer.observe(label);

    return () => observer.disconnect();
  }, [selectedIndex, value]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative flex h-11 w-[214px] items-center gap-1 rounded-pill bg-[#f3f4f6] p-1",
        className,
      )}
      role="tablist"
      aria-label="Calendar view"
    >
      {pillMetrics ? (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute top-1 h-9 rounded-pill bg-button-navy shadow-[0_2px_6px_rgb(0_0_0/0.12)]"
          initial={false}
          animate={{
            left: pillMetrics.left,
            width: pillMetrics.width,
          }}
          transition={pillTransition}
        />
      ) : null}

      {MODES.map((mode, index) => {
        const selected = value === mode.id;
        return (
          <button
            key={mode.id}
            ref={(node) => {
              tabRefs.current[index] = node;
            }}
            type="button"
            onClick={() => onChange(mode.id)}
            role="tab"
            aria-selected={selected}
            className={cn(
              "relative z-10 h-9 flex-1 rounded-pill px-3 text-xs leading-none focus-visible:focus-ring",
              selected
                ? "font-semibold text-white"
                : "font-medium text-foreground-muted hover:text-foreground-secondary",
            )}
          >
            <span className="relative z-10">{mode.label}</span>
          </button>
        );
      })}
    </div>
  );
}
