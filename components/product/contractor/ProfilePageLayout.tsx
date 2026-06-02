import { cn } from "@/lib/utils/cn";
import { ContractorPageContent } from "@/components/product/contractor/ContractorPageLayout";

/** Shared scroll content wrapper for Profile screen. */
export const ProfilePageContent = ContractorPageContent;

/** Figma section label (Business Hours, Quick Actions). */
export function ProfileSectionHeading({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h2 className={cn("text-lg font-semibold leading-relaxed text-foreground-muted", className)}>{children}</h2>
  );
}

/** White profile card shell (summary, business hours). */
export const PROFILE_CARD_CLASS =
  "box-border w-full rounded-[12px] border border-[#e5e7eb] bg-white shadow-[0_4px_6px_rgba(0,0,0,0.08)]";

/** Figma `Contractor/Settings List` (801:4037) — Quick Actions card. */
export const SETTINGS_LIST_CLASS =
  "box-border flex w-full flex-col items-start rounded-[12px] border border-[#e5e7eb] bg-white py-2 shadow-[0_4px_12px_rgba(0,0,0,0.08)]";
