import { cn } from "@/lib/utils/cn";
import type { LeadReportedIssueOverlay } from "@/lib/contractor/types";

export type ContractorPhotoInfoOverlayProps = LeadReportedIssueOverlay & {
  className?: string;
};

/** Figma `Contractor/Photo Info Overlay` — reported issue card on main photo (04.01). */
export function ContractorPhotoInfoOverlay({
  eyebrow,
  title,
  subtitle,
  severityLabel,
  className,
}: ContractorPhotoInfoOverlayProps) {
  return (
    <div
      className={cn(
        "flex max-w-[calc(100%-2rem)] items-start overflow-hidden rounded-xl bg-[rgba(0,0,0,0.65)]",
        className,
      )}
    >
      <div className="w-1 shrink-0 self-stretch bg-[#f35b5b]" aria-hidden />
      <div className="flex min-w-0 flex-col gap-1 p-3">
        <p className="text-[10px] font-semibold leading-[1.4] tracking-[0.05px] text-[#f35b5b]">
          {eyebrow}
        </p>
        <p className="text-sm font-semibold leading-tight text-white">{title}</p>
        <p className="text-[10px] leading-[1.4] tracking-[0.05px] text-[#f3f4f6]">{subtitle}</p>
        <span className="mt-0.5 inline-flex w-fit items-center rounded-[20px] border border-[#f35b5b] bg-[rgba(243,91,91,0.22)] px-2 py-1 text-[10px] font-semibold leading-[1.4] tracking-[0.05px] text-[#f35b5b]">
          {severityLabel}
        </span>
      </div>
    </div>
  );
}
