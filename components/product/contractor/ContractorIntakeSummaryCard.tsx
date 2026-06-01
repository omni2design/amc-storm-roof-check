import { cn } from "@/lib/utils/cn";
import { LEAD_DETAIL_CARD_CLASS } from "@/components/product/contractor/LeadDetailPageLayout";
import type { LeadIntakeSummary } from "@/lib/contractor/types";

export type ContractorIntakeSummaryCardProps = {
  intake: LeadIntakeSummary;
  className?: string;
};

const ROWS: { key: keyof LeadIntakeSummary; label: string }[] = [
  { key: "dateSubmitted", label: "Date Submitted" },
  { key: "damageType", label: "Damage Type" },
  { key: "priority", label: "Priority" },
  { key: "intakeStatus", label: "Status" },
];

/** Figma `Contractor/Information Summary Card` — intake summary on lead detail. */
export function ContractorIntakeSummaryCard({ intake, className }: ContractorIntakeSummaryCardProps) {
  return (
    <article className={cn(LEAD_DETAIL_CARD_CLASS, "flex flex-col gap-1 p-4", className)}>
      <p className="text-[10px] font-semibold leading-[1.4] tracking-[0.05px] text-[#9ca3af]">
        INTAKE SUMMARY
      </p>
      <div className="h-1.5 w-full" aria-hidden />
      {ROWS.map((row, index) => (
        <div key={row.key} className="flex flex-col">
          {index > 0 ? <div className="h-px w-full bg-[#f3f4f6]" role="separator" /> : null}
          <div className="flex h-8 items-center justify-between text-sm leading-tight">
            <span className="text-foreground-secondary">{row.label}</span>
            <span className="font-semibold text-foreground-primary">{intake[row.key]}</span>
          </div>
        </div>
      ))}
    </article>
  );
}
