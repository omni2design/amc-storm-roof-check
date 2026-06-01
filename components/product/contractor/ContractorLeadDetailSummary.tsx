import { cn } from "@/lib/utils/cn";
import { ContractorStatusBadge } from "@/components/product/contractor/ContractorStatusBadge";
import { mapLeadStatusToContractorBadge } from "@/lib/contractor/map-status-badge";
import type { LeadWorkflowStatus } from "@/lib/contractor/types";

export type ContractorLeadDetailSummaryProps = {
  name: string;
  status: LeadWorkflowStatus;
  statusLabel: string;
  detailSubtitle: string;
  alertMessage: string;
  photoCount: number;
  insurancePill?: string;
  budgetPill?: string;
  className?: string;
};

/** Figma `Contractor/Lead Detail Summary` (829:8088) */
export function ContractorLeadDetailSummary({
  name,
  status,
  statusLabel,
  detailSubtitle,
  alertMessage,
  photoCount,
  insurancePill,
  budgetPill,
  className,
}: ContractorLeadDetailSummaryProps) {
  const pills = [
    photoCount > 0 ? `${photoCount} Photos` : null,
    insurancePill,
    budgetPill,
  ].filter(Boolean) as string[];

  return (
    <article
      className={cn(
        "flex w-full flex-col gap-3 rounded-[12px] border border-[#fca5a5] bg-white p-4",
        className,
      )}
    >
      <div className="flex w-full items-start justify-between gap-3">
        <div className="flex min-w-0 flex-1 flex-col gap-[3px]">
          <h1 className="truncate text-lg font-semibold leading-relaxed text-[#111827]">{name}</h1>
          <p className="text-xs leading-tight tracking-[0.03px] text-[#6b7280]">{detailSubtitle}</p>
        </div>
        <ContractorStatusBadge status={mapLeadStatusToContractorBadge(status)} className="shrink-0">
          {statusLabel}
        </ContractorStatusBadge>
      </div>

      <div className="flex w-full overflow-hidden rounded-lg bg-[#fef2f2]">
        <div className="w-1 shrink-0 self-stretch bg-button-primary" aria-hidden />
        <p className="flex-1 py-3 pl-2.5 pr-3.5 text-sm font-semibold leading-tight text-[#991b1b]">
          {alertMessage}
        </p>
      </div>

      {pills.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {pills.map((pill) => (
            <span
              key={pill}
              className="rounded-2xl bg-[#f3f4f6] px-3 py-1 text-xs leading-tight tracking-[0.03px] text-[#374151]"
            >
              {pill}
            </span>
          ))}
        </div>
      ) : null}
    </article>
  );
}
