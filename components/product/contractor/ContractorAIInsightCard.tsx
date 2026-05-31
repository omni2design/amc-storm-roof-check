import { cn } from "@/lib/utils/cn";
import { CardShell } from "@/components/foundation/CardShell";
import { SectionHeader } from "@/components/foundation/SectionHeader";

export type ContractorAIInsightCardProps = {
  title?: string;
  insight: string;
  confidence?: string;
  className?: string;
};

/** Figma `Contractor AI Insight Card` — AI-generated observation summary. */
export function ContractorAIInsightCard({
  title = "AI Insight",
  insight,
  confidence,
  className,
}: ContractorAIInsightCardProps) {
  return (
    <CardShell
      className={cn(
        "flex flex-col gap-3 border-contractor-ai-insight-border bg-contractor-ai-insight-bg",
        className,
      )}
      variant="flat"
      padding="md"
    >
      <SectionHeader
        title={title}
        subtitle={confidence ? `Confidence: ${confidence}` : undefined}
        size="sm"
        action={
          <span className="rounded-pill bg-contractor-ai-insight-border px-2 py-0.5 text-caption font-medium text-contractor-ai-insight-text">
            AI
          </span>
        }
      />
      <p className="text-sm-leading text-contractor-ai-insight-text">{insight}</p>
    </CardShell>
  );
}
