"use client";

import { cn } from "@/lib/utils/cn";
import { FilterPill } from "@/components/foundation/FilterPill";
import type { CalendarViewMode } from "@/lib/contractor/types";

export type ContractorCalendarToggleProps = {
  value: CalendarViewMode;
  onChange: (mode: CalendarViewMode) => void;
  className?: string;
};

const MODES: { id: CalendarViewMode; label: string }[] = [
  { id: "month", label: "Month" },
  { id: "week", label: "Week" },
  { id: "tomorrow", label: "Tomorrow" },
];

/** Figma `Contractor Calendar Toggle` — view mode switcher for calendar screens. */
export function ContractorCalendarToggle({ value, onChange, className }: ContractorCalendarToggleProps) {
  return (
    <div className={cn("flex gap-2 overflow-x-auto pb-1", className)} role="tablist" aria-label="Calendar view">
      {MODES.map((mode) => (
        <FilterPill
          key={mode.id}
          label={mode.label}
          selected={value === mode.id}
          onClick={() => onChange(mode.id)}
          role="tab"
          aria-selected={value === mode.id}
        />
      ))}
    </div>
  );
}
