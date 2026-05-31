import { cn } from "@/lib/utils/cn";
import { CardShell } from "@/components/foundation/CardShell";
import { SectionHeader } from "@/components/foundation/SectionHeader";
import { ContractorSettingsItem } from "./ContractorSettingsItem";
import type { ContractorSettingsSection } from "@/lib/contractor/types";

export type ContractorSettingsListProps = {
  sections: ContractorSettingsSection[];
  className?: string;
};

/** Figma `Contractor Settings List` — grouped settings sections on profile screen. */
export function ContractorSettingsList({ sections, className }: ContractorSettingsListProps) {
  return (
    <div className={cn("flex flex-col gap-4", className)}>
      {sections.map((section) => (
        <CardShell key={section.id} padding="none" variant="flat" className="overflow-hidden">
          {section.title ? (
            <div className="border-b border-contractor-settings-divider px-4 py-3">
              <SectionHeader title={section.title} size="sm" />
            </div>
          ) : null}
          <ul className="divide-y divide-contractor-settings-divider">
            {section.items.map((item) => (
              <li key={item.id}>
                <ContractorSettingsItem
                  label={item.label}
                  description={item.description}
                  href={item.href}
                  onClick={item.onClick}
                  trailing={item.trailing}
                  destructive={item.destructive}
                />
              </li>
            ))}
          </ul>
        </CardShell>
      ))}
    </div>
  );
}
