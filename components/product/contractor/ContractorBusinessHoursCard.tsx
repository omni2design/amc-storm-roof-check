import { cn } from "@/lib/utils/cn";
import { PROFILE_CARD_CLASS } from "@/components/product/contractor/ProfilePageLayout";
import type { BusinessHoursDay } from "@/lib/contractor/types";

export type ContractorBusinessHoursCardProps = {
  days: BusinessHoursDay[];
  className?: string;
};

/** Figma `Contractor Business Hours Card` (799:4081) — weekly hours on profile screen. */
export function ContractorBusinessHoursCard({ days, className }: ContractorBusinessHoursCardProps) {
  return (
    <article className={cn(PROFILE_CARD_CLASS, "flex flex-col p-5", className)}>
      {days.map((day, index) => (
        <div key={day.day} className="flex flex-col">
          {index > 0 ? <div className="h-px w-full bg-[#e5e7eb]" role="separator" /> : null}
          <div className="flex items-center justify-between py-[7px] text-xs leading-tight tracking-[0.03px]">
            <span className="text-foreground-secondary">{day.day}</span>
            <span className={day.closed ? "text-foreground-muted" : "text-foreground-primary"}>
              {day.closed ? "Closed" : `${day.open} – ${day.close}`}
            </span>
          </div>
        </div>
      ))}
    </article>
  );
}
