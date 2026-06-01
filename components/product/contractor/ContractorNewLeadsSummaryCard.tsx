import { cn } from "@/lib/utils/cn";

export type ContractorNewLeadsSummaryCardProps = {
  total: number;
  critical: number;
  high: number;
  className?: string;
};

/**
 * Figma `ContractorPipelineSummaryCard` (788:3791)
 * Used on `05.01 – Pipeline View` (829:8129).
 */
export function ContractorNewLeadsSummaryCard({
  total,
  critical,
  high,
  className,
}: ContractorNewLeadsSummaryCardProps) {
  return (
    <div
      className={cn(
        "flex w-full items-stretch overflow-hidden rounded-xl border border-[rgba(255,255,255,0.08)] bg-[#0b1f33] shadow-[0_4px_12px_rgb(0_0_0/0.25)]",
        className,
      )}
    >
      <div aria-hidden className="w-1 shrink-0 bg-button-primary" />
      <div className="flex min-w-0 flex-1 flex-col gap-2 p-4">
        <p className="text-[10px] font-semibold leading-[1.4] tracking-[0.05px] text-[#fc8181]">
          NEW LEADS
        </p>
        <p className="text-sm font-semibold leading-tight text-white">{total} leads require action</p>
        <p className="text-xs leading-tight tracking-[0.03px] text-[#9ca3af]">
          {critical} critical • {high} high priority
        </p>

        <div className="flex items-center gap-4 overflow-hidden pt-2">
          <div className="flex flex-col gap-0.5">
            <p className="text-2xl font-semibold leading-8 text-[#fc8181]">{critical}</p>
            <p className="text-xs leading-tight tracking-[0.03px] text-[#9ca3af]">Critical</p>
          </div>
          <div aria-hidden className="h-12 w-px bg-[rgba(178,46,46,0.3)]" />
          <div className="flex flex-col gap-0.5">
            <p className="text-2xl font-semibold leading-8 text-[#fc8181]">{high}</p>
            <p className="text-xs leading-tight tracking-[0.03px] text-[#9ca3af]">High</p>
          </div>
        </div>
      </div>
    </div>
  );
}

