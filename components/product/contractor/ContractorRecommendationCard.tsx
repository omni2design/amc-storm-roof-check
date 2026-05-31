import { cn } from "@/lib/utils/cn";
import { CardShell } from "@/components/foundation/CardShell";
import { SectionHeader } from "@/components/foundation/SectionHeader";

export type ContractorRecommendationCardProps = {
  title?: string;
  recommendation: string;
  rationale?: string;
  className?: string;
};

/** Figma `Contractor Recommendation Card` — suggested next step for a lead. */
export function ContractorRecommendationCard({
  title = "Recommendation",
  recommendation,
  rationale,
  className,
}: ContractorRecommendationCardProps) {
  return (
    <CardShell
      className={cn(
        "flex flex-col gap-3 border-contractor-recommendation-border bg-contractor-recommendation-bg",
        className,
      )}
      variant="flat"
      padding="md"
    >
      <SectionHeader title={title} size="sm" />
      <p className="text-sm-leading font-medium text-contractor-recommendation-text">{recommendation}</p>
      {rationale ? <p className="text-caption text-foreground-secondary">{rationale}</p> : null}
    </CardShell>
  );
}
