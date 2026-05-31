import { cn } from "@/lib/utils/cn";
import { ContractorCalendarDateCell } from "./ContractorCalendarDateCell";

export type WeekDay = {
  date: number;
  label: string;
  isToday?: boolean;
  isSelected?: boolean;
  eventCount?: number;
};

export type ContractorCalendarWeekStripProps = {
  days: WeekDay[];
  onDayClick?: (day: WeekDay) => void;
  className?: string;
};

/** Figma `Contractor Calendar Week Strip` — horizontal week selector. */
export function ContractorCalendarWeekStrip({ days, onDayClick, className }: ContractorCalendarWeekStripProps) {
  return (
    <div className={cn("grid grid-cols-7 gap-1", className)} role="list" aria-label="Week days">
      {days.map((day) => (
        <div key={day.label} role="listitem" className="flex flex-col items-center gap-1">
          <span className="text-caption text-foreground-muted">{day.label}</span>
          <ContractorCalendarDateCell
            date={day.date}
            label={day.label}
            isToday={day.isToday}
            isSelected={day.isSelected}
            eventCount={day.eventCount}
            onClick={onDayClick ? () => onDayClick(day) : undefined}
            className="min-h-10 w-full"
          />
        </div>
      ))}
    </div>
  );
}
