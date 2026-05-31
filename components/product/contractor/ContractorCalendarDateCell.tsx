import { cn } from "@/lib/utils/cn";

export type ContractorCalendarDateCellProps = {
  date: number;
  label?: string;
  isToday?: boolean;
  isSelected?: boolean;
  isMuted?: boolean;
  eventCount?: number;
  onClick?: () => void;
  className?: string;
};

/** Figma `Contractor Calendar Date Cell` — day cell in month/week calendar grids. */
export function ContractorCalendarDateCell({
  date,
  label,
  isToday = false,
  isSelected = false,
  isMuted = false,
  eventCount = 0,
  onClick,
  className,
}: ContractorCalendarDateCellProps) {
  const Tag = onClick ? "button" : "div";

  return (
    <Tag
      type={onClick ? "button" : undefined}
      onClick={onClick}
      aria-label={label ?? `Day ${date}`}
      aria-pressed={onClick ? isSelected : undefined}
      className={cn(
        "flex min-h-12 flex-col items-center justify-center gap-1 rounded-control border p-2 text-center motion-safe transition-colors focus-visible:focus-ring",
        isSelected
          ? "border-border-strong bg-contractor-calendar-cell-bg-selected"
          : isToday
            ? "border-contractor-calendar-cell-border-today bg-contractor-calendar-cell-bg-today"
            : "border-transparent bg-contractor-calendar-cell-bg",
        isMuted && !isSelected && !isToday && "bg-contractor-calendar-cell-bg-muted text-contractor-calendar-cell-text-muted",
        className,
      )}
    >
      <span className={cn("text-sm-leading font-medium", isMuted && "text-foreground-muted")}>{date}</span>
      {eventCount > 0 ? (
        <span className="flex gap-0.5" aria-hidden>
          {Array.from({ length: Math.min(eventCount, 3) }).map((_, index) => (
            <span key={index} className="size-1 rounded-pill bg-button-navy" />
          ))}
        </span>
      ) : null}
    </Tag>
  );
}
