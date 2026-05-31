import { cn } from "@/lib/utils/cn";
import { CardShell } from "@/components/foundation/CardShell";
import { SectionHeader } from "@/components/foundation/SectionHeader";
import type { BusinessHoursDay } from "@/lib/contractor/types";

export type ContractorBusinessHoursCardProps = {
  title?: string;
  days: BusinessHoursDay[];
  className?: string;
};

/** Figma `Contractor Business Hours Card` — weekly hours on profile screen. */
export function ContractorBusinessHoursCard({
  title = "Business hours",
  days,
  className,
}: ContractorBusinessHoursCardProps) {
  return (
    <CardShell className={cn("flex flex-col gap-4", className)} padding="md">
      <SectionHeader title={title} size="sm" />
      <dl className="flex flex-col gap-2">
        {days.map((day) => (
          <div key={day.day} className="flex items-center justify-between gap-3 text-sm-leading">
            <dt className="font-medium text-foreground-primary">{day.day}</dt>
            <dd className="text-foreground-secondary">
              {day.closed ? "Closed" : `${day.open} – ${day.close}`}
            </dd>
          </div>
        ))}
      </dl>
    </CardShell>
  );
}
