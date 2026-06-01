import { cn } from "@/lib/utils/cn";

export type ContractorPipelineNewLeadsCardProps = {
  eyebrow?: string;
  headline: string;
  subline: string;
  criticalCount: number;
  highCount: number;
  className?: string;
};

/** Figma `Contractor/Pipeline Summary Card` — type=leads, severity=critical (788:3791). */
export function ContractorPipelineNewLeadsCard({
  eyebrow = "NEW LEADS",
  headline,
  subline,
  criticalCount,
  highCount,
  className,
}: ContractorPipelineNewLeadsCardProps) {
  return (
    <div
      className={cn(
        "flex w-full overflow-hidden rounded-xl border border-[rgba(255,255,255,0.08)] bg-[#0b1f33] shadow-[0_4px_12px_rgba(0,0,0,0.25)]",
        className,
      )}
    >
      <div aria-hidden className="w-1 shrink-0 self-stretch bg-button-primary" />
      <div className="flex min-w-0 flex-1 flex-col gap-2 p-4">
        <p className="text-[10px] font-semibold tracking-[0.05px] text-[#fc8181]">{eyebrow}</p>
        <p className="text-sm font-semibold leading-tight text-white">{headline}</p>
        <p className="text-xs leading-tight tracking-[0.03px] text-[#9ca3af]">{subline}</p>
        <div className="flex items-center gap-4">
          <div className="flex flex-col gap-0.5">
            <p className="text-2xl font-semibold leading-loose text-[#fc8181]">{criticalCount}</p>
            <p className="text-xs leading-tight tracking-[0.03px] text-[#9ca3af]">Critical</p>
          </div>
          <div aria-hidden className="h-10 w-px shrink-0 bg-[rgba(178,46,46,0.3)]" />
          <div className="flex flex-col gap-0.5">
            <p className="text-2xl font-semibold leading-loose text-[#fc8181]">{highCount}</p>
            <p className="text-xs leading-tight tracking-[0.03px] text-[#9ca3af]">High</p>
          </div>
        </div>
      </div>
    </div>
  );
}
