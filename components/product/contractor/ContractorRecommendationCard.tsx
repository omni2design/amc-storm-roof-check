import { cn } from "@/lib/utils/cn";
import { LEAD_DETAIL_CARD_CLASS } from "@/components/product/contractor/LeadDetailPageLayout";

export type ContractorRecommendationCardProps = {
  recommendation: string;
  onApply?: () => void;
  className?: string;
};

/** Figma `Contractor/Insight Card` — recommendation with Apply CTA (829:8098). */
export function ContractorRecommendationCard({
  recommendation,
  onApply,
  className,
}: ContractorRecommendationCardProps) {
  return (
    <article className={cn(LEAD_DETAIL_CARD_CLASS, "flex flex-col gap-2 p-4", className)}>
      <p className="text-[10px] font-semibold leading-[1.4] tracking-[0.05px] text-foreground-primary">
        RECOMMENDATION
      </p>
      <p className="text-sm leading-tight text-foreground-secondary">{recommendation}</p>
      <div className="h-px w-full bg-[#f3f4f6]" role="separator" />
      <div className="flex justify-end pt-2">
        <button
          type="button"
          onClick={onApply}
          className="rounded-2xl bg-[#111f50] px-3 py-1 text-xs font-semibold text-white motion-safe transition-opacity hover:opacity-90 focus-visible:focus-ring"
        >
          Apply
        </button>
      </div>
    </article>
  );
}
