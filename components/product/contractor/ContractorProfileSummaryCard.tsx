import { cn } from "@/lib/utils/cn";
import { PROFILE_CARD_CLASS } from "@/components/product/contractor/ProfilePageLayout";

export type ContractorProfileStat = {
  value: number | string;
  label: string;
  subLabel?: string;
};

export type ContractorProfileSummaryCardProps = {
  name: string;
  roleLine: string;
  location: string;
  stats: ContractorProfileStat[];
  avatarInitial?: string;
  className?: string;
};

/** Figma `Contractor Profile Summary Card` (798:4037) — profile hero with stats. */
export function ContractorProfileSummaryCard({
  name,
  roleLine,
  location,
  stats,
  avatarInitial,
  className,
}: ContractorProfileSummaryCardProps) {
  const initial = avatarInitial ?? name.trim().charAt(0).toUpperCase();

  return (
    <article className={cn(PROFILE_CARD_CLASS, "flex flex-col gap-2 p-4", className)}>
      <div className="flex w-full items-center gap-3">
        <div
          className="flex size-14 shrink-0 items-center justify-center overflow-hidden rounded-[28px] bg-button-navy"
          aria-hidden
        >
          <span className="text-xl font-bold leading-6 text-white">{initial}</span>
        </div>
        <div className="flex min-w-0 flex-1 flex-col items-start">
          <p className="text-base font-semibold leading-6 text-foreground-primary">{name}</p>
          <p className="text-xs font-normal leading-tight tracking-[0.03px] text-foreground-secondary">
            {roleLine}
          </p>
          <p className="text-xs font-normal leading-tight tracking-[0.03px] text-foreground-muted">
            {location}
          </p>
        </div>
      </div>

      <div className="flex w-full items-stretch overflow-hidden rounded-lg bg-[#f9fafb]">
        {stats.map((stat, index) => (
          <div key={stat.label} className="flex min-w-0 flex-1 items-stretch">
            {index > 0 ? <div className="w-px shrink-0 self-stretch bg-[#e5e7eb]" aria-hidden /> : null}
            <div className="flex min-w-0 flex-1 flex-col items-center py-2.5">
              <p className="text-2xl font-semibold leading-8 text-foreground-primary">{stat.value}</p>
              {stat.subLabel ? (
                <div className="text-center text-[10px] font-normal leading-[1.4] tracking-[0.05px] text-foreground-muted">
                  <p>{stat.label}</p>
                  <p>{stat.subLabel}</p>
                </div>
              ) : (
                <p className="text-center text-[10px] font-normal leading-[1.4] tracking-[0.05px] text-foreground-muted">
                  {stat.label}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </article>
  );
}
