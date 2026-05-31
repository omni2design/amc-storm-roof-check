import { cn } from "@/lib/utils/cn";
import { Button } from "@/components/foundation/Button";
import type { IconId } from "@/lib/icons/types";

export type ContractorQuickAction = {
  id: string;
  label: string;
  icon?: IconId;
  onClick?: () => void;
  intent?: "primary" | "navy" | "outline" | "subtle";
};

export type ContractorQuickActionBarProps = {
  actions: ContractorQuickAction[];
  className?: string;
  layout?: "scroll" | "grid";
};

/** Figma `Contractor Quick Action Bar` — horizontal action strip on lead detail. */
export function ContractorQuickActionBar({
  actions,
  className,
  layout = "scroll",
}: ContractorQuickActionBarProps) {
  return (
    <div
      className={cn(
        layout === "scroll" ? "flex gap-2 overflow-x-auto pb-1" : "grid grid-cols-2 gap-2 sm:grid-cols-3",
        className,
      )}
      role="toolbar"
      aria-label="Lead actions"
    >
      {actions.map((action) => (
        <Button
          key={action.id}
          intent={action.intent ?? "outline"}
          size="sm"
          iconLeft={action.icon}
          onClick={action.onClick}
          className={layout === "scroll" ? "shrink-0" : "w-full"}
        >
          {action.label}
        </Button>
      ))}
    </div>
  );
}
