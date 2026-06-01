import { cn } from "@/lib/utils/cn";
import { ContractorStatusBadge } from "@/components/product/contractor/ContractorStatusBadge";

export type ContractorAIAssessmentCardProps = {
  insight: string;
  recommendedAction: string;
  confidence?: string;
  className?: string;
};

/** Figma `Contractor/AI Assessment Card` (829:8097) */
export function ContractorAIAssessmentCard({
  insight,
  recommendedAction,
  confidence = "High Confidence",
  className,
}: ContractorAIAssessmentCardProps) {
  return (
    <article
      className={cn(
        "flex w-full flex-col gap-3 rounded-2xl border border-[#e0e7ff] bg-white p-4 shadow-[0_2px_4px_rgba(17,24,39,0.06)]",
        className,
      )}
    >
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5">
          <img
            src="/icons/action/ai-assessment.svg"
            alt=""
            width={24}
            height={24}
            className="size-6 shrink-0 object-contain"
            aria-hidden
          />
          <p className="text-[10px] font-normal leading-[1.4] tracking-[0.05px] text-[#6b7280]">
            AI ASSESSMENT
          </p>
        </div>
        <ContractorStatusBadge status="neutral">{confidence}</ContractorStatusBadge>
      </div>

      <p className="text-sm leading-tight text-[#374151]">{insight}</p>

      <div className="h-px w-full bg-[#f3f4f6]" role="separator" />

      <div className="flex flex-col gap-1">
        <p className="text-[10px] font-semibold leading-[1.4] tracking-[0.05px] text-[#9ca3af]">
          {recommendedAction}
        </p>
        <p className="text-sm font-semibold leading-tight text-foreground-primary">{recommendedAction}</p>
      </div>
    </article>
  );
}
