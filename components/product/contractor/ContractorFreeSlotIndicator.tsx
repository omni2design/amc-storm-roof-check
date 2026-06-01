import { cn } from "@/lib/utils/cn";

export type ContractorFreeSlotIndicatorProps = {
  time: string;
  className?: string;
};

/** Figma `Contractor/Free Slot Indicator` (826:7004) */
export function ContractorFreeSlotIndicator({ time, className }: ContractorFreeSlotIndicatorProps) {
  return (
    <div
      className={cn(
        "flex w-full items-center gap-2 overflow-hidden rounded-lg bg-[#f3f4f6] px-3 py-2",
        className,
      )}
    >
      <div aria-hidden className="h-px w-4 shrink-0 bg-[#d1d5db]" />
      <p className="text-xs leading-tight tracking-[0.03px] text-[#9ca3af]">{time}</p>
    </div>
  );
}
