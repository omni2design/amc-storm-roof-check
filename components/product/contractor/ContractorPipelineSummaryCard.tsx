import { cn } from "@/lib/utils/cn";
import { CardShell } from "@/components/foundation/CardShell";
import { SectionHeader } from "@/components/foundation/SectionHeader";
import type { PipelineStageId } from "@/lib/contractor/types";

export type PipelineStage = {
  id: PipelineStageId;
  label: string;
};

export type ContractorPipelineSummaryCardProps = {
  title?: string;
  stages: PipelineStage[];
  currentStageId: PipelineStageId;
  counts?: Partial<Record<PipelineStageId, number>>;
  className?: string;
};

/** Figma `Contractor Pipeline Summary Card` — stage progress for a lead or pipeline view. */
export function ContractorPipelineSummaryCard({
  title = "Pipeline",
  stages,
  currentStageId,
  counts,
  className,
}: ContractorPipelineSummaryCardProps) {
  const currentIndex = stages.findIndex((stage) => stage.id === currentStageId);

  return (
    <CardShell className={cn("flex flex-col gap-4", className)} padding="md">
      <SectionHeader title={title} size="sm" />
      <ol className="flex flex-col gap-0">
        {stages.map((stage, index) => {
          const isComplete = index < currentIndex;
          const isCurrent = stage.id === currentStageId;
          const count = counts?.[stage.id];

          return (
            <li key={stage.id} className="flex gap-3">
              <div className="flex flex-col items-center">
                <span
                  className={cn(
                    "flex size-6 shrink-0 items-center justify-center rounded-pill text-caption font-semibold",
                    isComplete
                      ? "bg-status-success-bg text-status-success-text"
                      : isCurrent
                        ? "bg-button-navy text-button-navy-text"
                        : "bg-surface-muted text-foreground-muted",
                  )}
                  aria-current={isCurrent ? "step" : undefined}
                >
                  {isComplete ? "✓" : index + 1}
                </span>
                {index < stages.length - 1 ? (
                  <span
                    className={cn(
                      "my-1 w-0.5 flex-1 min-h-4",
                      isComplete ? "bg-status-success-icon" : "bg-[var(--contractor-pipeline-track)]",
                    )}
                    aria-hidden
                  />
                ) : null}
              </div>
              <div className="flex min-w-0 flex-1 flex-col gap-0.5 pb-4">
                <p
                  className={cn(
                    "text-sm-leading font-medium",
                    isCurrent ? "text-foreground-primary" : "text-foreground-secondary",
                  )}
                >
                  {stage.label}
                </p>
                {typeof count === "number" ? (
                  <p className="text-caption text-foreground-muted">{count} leads</p>
                ) : null}
              </div>
            </li>
          );
        })}
      </ol>
    </CardShell>
  );
}
