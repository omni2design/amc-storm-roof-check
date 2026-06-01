"use client";

import { motion, useReducedMotion } from "framer-motion";
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

/** Figma `Contractor Calendar Toggle` — Apple-style sliding pill + view mode switcher. */
export function ContractorCalendarToggle({
  value,
  onChange,
  slideSelection = false,
  className,
}: ContractorCalendarToggleProps) {
  const reducedMotion = useReducedMotion();
  const selectedIndex = MODE_INDEX[value];
  const pillTransition =
    slideSelection && !reducedMotion ? CONTRACTOR_SEGMENT_SPRING : { duration: 0 };

  return (
    <div
      className={cn(
        "relative flex h-11 w-[214px] items-center gap-1 rounded-pill bg-[#f3f4f6] p-1",
        className,
      )}
      role="tablist"
      aria-label="Calendar view"
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute top-1 h-9 rounded-pill bg-button-navy shadow-[0_2px_6px_rgb(0_0_0/0.12)]"
        initial={false}
        animate={{
          width: "calc((100% - 0.5rem - 0.5rem) / 3)",
          left: `calc(0.25rem + ${selectedIndex} * ((100% - 0.5rem - 0.5rem) / 3 + 0.25rem))`,
        }}
        transition={pillTransition}
      />

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
