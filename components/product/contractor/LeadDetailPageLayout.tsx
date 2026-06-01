import { cn } from "@/lib/utils/cn";
import { ContractorPageContent } from "@/components/product/contractor/ContractorPageLayout";

/** Shared scroll content wrapper for lead detail (Figma 03.01). */
export const LeadDetailPageContent = ContractorPageContent;

/** Figma section label (Project Details, AI Insights, Work Notes). */
export function LeadDetailSectionHeading({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h2 className={cn("text-lg font-semibold leading-relaxed text-[#9ca3af]", className)}>{children}</h2>
  );
}

export const LEAD_DETAIL_CARD_CLASS =
  "box-border w-full rounded-[12px] border border-[#e5e7eb] bg-white shadow-[0_2px_4px_rgba(0,0,0,0.07)]";
