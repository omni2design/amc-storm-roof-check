"use client";

import { LayoutGroup, motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils/cn";
import { CONTRACTOR_SEGMENT_SPRING } from "@/lib/contractor/contractor-transition";
import type { CalendarViewMode } from "@/lib/contractor/types";

export type ContractorCalendarToggleProps = {
  value: CalendarViewMode;
  onChange: (mode: CalendarViewMode) => void;
  className?: string;
};

const MODES: { id: CalendarViewMode; label: string }[] = [
  { id: "today", label: "Today" },
  { id: "tomorrow", label: "Tomorrow" },
  { id: "week", label: "Week" },
];

/** Figma `Contractor Calendar Toggle` — Apple-style sliding pill + view mode switcher. */
export function ContractorCalendarToggle({ value, onChange, className }: ContractorCalendarToggleProps) {
  const reducedMotion = useReducedMotion();

  return (
    <LayoutGroup id="contractor-calendar-toggle">
      <div
        className={cn(
          "relative flex h-11 w-[214px] items-center gap-1 rounded-pill bg-[#f3f4f6] p-1",
          className,
        )}
        role="tablist"
        aria-label="Calendar view"
      >
      {MODES.map((mode) => {
        const selected = value === mode.id;
        return (
          <button
            key={mode.id}
            type="button"
            onClick={() => onChange(mode.id)}
            role="tab"
            aria-selected={selected}
            className={cn(
              "relative z-10 h-9 flex-1 rounded-pill px-3 text-xs leading-none focus-visible:focus-ring",
              selected ? "font-semibold text-white" : "font-medium text-foreground-muted hover:text-foreground-secondary",
            )}
          >
            {selected ? (
              <motion.span
                layoutId="contractor-calendar-toggle-pill"
                className="absolute inset-0 rounded-pill bg-button-navy shadow-[0_2px_6px_rgb(0_0_0/0.12)]"
                transition={reducedMotion ? { duration: 0.15 } : CONTRACTOR_SEGMENT_SPRING}
                aria-hidden
              />
            ) : null}
            <span className="relative z-10">{mode.label}</span>
          </button>
        );
      })}
      </div>
    </LayoutGroup>
  );
}
