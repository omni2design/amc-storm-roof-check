import { cn } from "@/lib/utils/cn";
import type { PhotoAiObservationState } from "@/lib/contractor/types";

export type ContractorAiObservationChipProps = {
  label: string;
  state?: PhotoAiObservationState;
  className?: string;
};

const DOT_COLOR: Record<PhotoAiObservationState, string> = {
  possible: "bg-[#9ca3af]",
  visible: "bg-[#6b7280]",
  needsReview: "bg-[#6b7280]",
};

/** Figma `Contractor/AI Observation Chip` (04.01 inspection panel). */
export function ContractorAiObservationChip({
  label,
  state = "possible",
  className,
}: ContractorAiObservationChipProps) {
  return (
    <span
      className={cn(
        "inline-flex max-w-full items-center gap-[7px] rounded-pill border border-[#e5e7eb] bg-[#f9fafb] py-[5px] pl-[10px] pr-3 text-xs text-[#374151]",
        className,
      )}
    >
      <span className={cn("size-[5px] shrink-0 rounded-full", DOT_COLOR[state])} aria-hidden />
      <span className="truncate">{label}</span>
    </span>
  );
}
