import { cn } from "@/lib/utils/cn";
import { SETTINGS_LIST_CLASS } from "@/components/product/contractor/ProfilePageLayout";
import { ContractorSettingsItem } from "./ContractorSettingsItem";
import type { ProfileQuickAction } from "@/lib/contractor/types";

export type ContractorSettingsListProps = {
  items: ProfileQuickAction[];
  className?: string;
};

/** Figma `Contractor/Settings List` (801:4037) — Quick Actions on profile screen. */
export function ContractorSettingsList({ items, className }: ContractorSettingsListProps) {
  return (
    <article className={cn(SETTINGS_LIST_CLASS, className)}>
      {items.map((item, index) => (
        <div key={item.id} className="flex w-full flex-col">
          {index > 0 ? <div className="h-px w-full bg-[#e5e7eb]" role="separator" /> : null}
          <ContractorSettingsItem
            label={item.label}
            description={item.description}
            icon={item.icon}
            href={item.href}
            onClick={item.onClick}
            destructive={item.destructive}
          />
        </div>
      ))}
    </article>
  );
}
