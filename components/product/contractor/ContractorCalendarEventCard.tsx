import Link from "next/link";
import { cn } from "@/lib/utils/cn";
import type { CalendarEventVariant } from "@/lib/contractor/types";

export type ContractorCalendarEventCardProps = {
  id: string;
  title: string;
  time: string;
  location?: string;
  variant?: CalendarEventVariant;
  href?: string;
  onClick?: () => void;
  className?: string;
};

const VARIANT_CLASS: Record<CalendarEventVariant, string> = {
  default: "border-contractor-calendar-event-border bg-contractor-calendar-event-bg",
  inspection:
    "border-[var(--contractor-calendar-event-inspection-border)] bg-[var(--contractor-calendar-event-inspection-bg)]",
  urgent:
    "border-[var(--contractor-calendar-event-urgent-border)] bg-[var(--contractor-calendar-event-urgent-bg)]",
};

/** Figma `Contractor Calendar Event Card` — scheduled item in calendar views. */
export function ContractorCalendarEventCard({
  title,
  time,
  location,
  variant = "default",
  href,
  onClick,
  className,
}: ContractorCalendarEventCardProps) {
  const content = (
    <>
      <p className="text-caption font-medium text-foreground-muted">{time}</p>
      <p className="text-sm-leading font-semibold text-foreground-primary">{title}</p>
      {location ? <p className="text-caption text-foreground-secondary">{location}</p> : null}
    </>
  );

  const cardClass = cn(
    "flex w-full flex-col gap-1 rounded-control border p-3 text-left motion-safe transition-colors focus-visible:focus-ring",
    VARIANT_CLASS[variant],
    className,
  );

  if (href) {
    return (
      <Link href={href} className={cardClass}>
        {content}
      </Link>
    );
  }

  if (onClick) {
    return (
      <button type="button" onClick={onClick} className={cardClass}>
        {content}
      </button>
    );
  }

  return <article className={cardClass}>{content}</article>;
}
