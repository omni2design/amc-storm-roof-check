"use client";

import { cn } from "@/lib/utils/cn";
import { QUICK_ACTION_ICON_SRC } from "@/lib/contractor/quick-action-icons";
import type { LeadQuickActionIcon } from "@/lib/contractor/types";

export type LeadQuickAction = {
  id: string;
  label: string;
  icon: LeadQuickActionIcon;
  onClick?: () => void;
};

export type ContractorQuickActionBarProps = {
  actions: LeadQuickAction[];
  className?: string;
};

const ITEM_STYLES: Record<
  LeadQuickActionIcon,
  { container: string; iconWell: string; label: string }
> = {
  call: {
    container: "border border-[#16a34a] bg-[#f0fdf4]",
    iconWell: "bg-[rgba(35,165,86,0.12)]",
    label: "text-[#166534]",
  },
  message: {
    container: "bg-button-navy",
    iconWell: "bg-[rgba(255,255,255,0.12)]",
    label: "text-white",
  },
  schedule: {
    container: "bg-button-primary",
    iconWell: "bg-[rgba(255,255,255,0.15)]",
    label: "text-white",
  },
  contact: {
    container: "bg-[#f3f4f6]",
    iconWell: "bg-[rgba(102,112,133,0.12)]",
    label: "text-[#4b5563]",
  },
};

function QuickActionItem({ action }: { action: LeadQuickAction }) {
  const styles = ITEM_STYLES[action.icon];

  return (
    <button
      type="button"
      onClick={action.onClick}
      className={cn(
        "flex min-w-0 flex-1 flex-col items-center justify-center gap-1 rounded-xl p-1 motion-safe transition-opacity hover:opacity-90 focus-visible:focus-ring",
        styles.container,
      )}
    >
      <span
        className={cn(
          "flex size-9 items-center justify-center overflow-hidden rounded-lg",
          styles.iconWell,
        )}
      >
        <img
          src={QUICK_ACTION_ICON_SRC[action.icon]}
          alt=""
          width={24}
          height={24}
          className="size-6 object-contain"
        />
      </span>
      <span className={cn("text-[10px] font-semibold leading-[1.4] tracking-[0.05px]", styles.label)}>
        {action.label}
      </span>
    </button>
  );
}

/** Figma `Contractor/Quick Action Bar` (760:8920) — fixed footer on lead detail. */
export function ContractorQuickActionBar({ actions, className }: ContractorQuickActionBarProps) {
  return (
    <div
      className={cn(
        "contractor-fixed-bottom box-border flex h-[90px] w-full flex-row items-center gap-4 border-t border-[#e5e7eb] bg-white px-6 py-4",
        className,
      )}
      role="toolbar"
      aria-label="Lead actions"
    >
      {actions.map((action) => (
        <QuickActionItem key={action.id} action={action} />
      ))}
    </div>
  );
}
