"use client";

import { cn } from "@/lib/utils/cn";

export type WeekDay = {
  /** ISO date key for selection, e.g. `2026-05-29` */
  id: string;
  date: number;
  label: string;
  isToday?: boolean;
  isSelected?: boolean;
  eventCount?: number;
  /** Full heading when this day is selected, e.g. `Friday, May 29` */
  dateHeading?: string;
};

export type ContractorCalendarWeekStripProps = {
  days: WeekDay[];
  selectedDayId?: string;
  onDaySelect?: (day: WeekDay) => void;
  className?: string;
};

function formatJobCount(count: number): string {
  return count === 1 ? "1 job" : `${count} jobs`;
}

type WeekStripDayColumnProps = {
  day: WeekDay;
  isSelected: boolean;
  onSelect?: () => void;
};

/** Single day column inside the week strip (Figma `Contractor/Calendar Date Cell` + job count). */
function WeekStripDayColumn({ day, isSelected, onSelect }: WeekStripDayColumnProps) {
  const Tag = onSelect ? "button" : "div";
  const showTodayStyle = day.isToday && !isSelected;

  return (
    <Tag
      type={onSelect ? "button" : undefined}
      onClick={onSelect}
      aria-label={`${day.label} ${day.date}`}
      aria-pressed={onSelect ? isSelected : undefined}
      className={cn(
        "flex min-w-0 flex-1 flex-col items-center gap-px overflow-hidden pb-0.5",
        isSelected && "rounded-lg bg-[#f3f7fb] pb-1",
        onSelect && "motion-safe transition-colors focus-visible:focus-ring",
      )}
    >
      <div className="flex w-[52px] flex-col items-center justify-center gap-[3px] py-[5px]">
        <p className="text-[10px] font-semibold leading-[1.4] tracking-[0.05px] text-[#9ca3af]">
          {day.label}
        </p>
        <div
          className={cn(
            "flex size-[38px] flex-col items-center justify-center overflow-hidden rounded-[19px]",
            isSelected && "bg-button-navy",
            showTodayStyle && "bg-[#f3f7fb]",
          )}
        >
          <p
            className={cn(
              "text-base leading-6",
              isSelected && "font-semibold text-white",
              !isSelected && showTodayStyle && "font-medium text-button-navy",
              !isSelected && !showTodayStyle && "font-medium text-foreground-primary",
            )}
          >
            {day.date}
          </p>
        </div>
      </div>
      <p
        className={cn(
          "text-[10px] font-normal leading-[1.4] tracking-[0.05px]",
          isSelected ? "text-[#4b5563]" : "text-[#9ca3af]",
        )}
      >
        {formatJobCount(day.eventCount ?? 0)}
      </p>
    </Tag>
  );
}

/** Figma `Contractor/Calendar Week Strip` (821:4693) — week selector on schedule Week view. */
export function ContractorCalendarWeekStrip({
  days,
  selectedDayId,
  onDaySelect,
  className,
}: ContractorCalendarWeekStripProps) {
  return (
    <div
      className={cn(
        "box-border flex w-full flex-row items-start rounded-[12px] border border-[#e5e7eb] bg-white p-2 shadow-[0_2px_4px_rgba(0,0,0,0.06)]",
        className,
      )}
      role="group"
      aria-label="Week days"
    >
      {days.map((day) => {
        const isSelected = selectedDayId ? day.id === selectedDayId : Boolean(day.isSelected);

        return (
          <WeekStripDayColumn
            key={day.id}
            day={day}
            isSelected={isSelected}
            onSelect={onDaySelect ? () => onDaySelect(day) : undefined}
          />
        );
      })}
    </div>
  );
}
