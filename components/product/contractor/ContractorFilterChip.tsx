import { cn } from "@/lib/utils/cn";
import {
  contractorFilterChipVariants,
  type ContractorFilterChipVariantProps,
} from "@/lib/variants/contractor-filter-chip";

export type ContractorFilterChipIcon = "all" | "new" | "urgent" | "scheduled" | "completed";

export type ContractorFilterChipProps = Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  "children"
> &
  ContractorFilterChipVariantProps & {
    label: string;
    icon?: ContractorFilterChipIcon;
  };

const FILTER_ICON_SRC: Record<
  ContractorFilterChipIcon,
  { default: string; inverse?: string }
> = {
  all: { default: "/icons/filter/all-default.svg", inverse: "/icons/filter/all-inverse.svg" },
  new: { default: "/icons/filter/new.svg" },
  urgent: { default: "/icons/filter/urgent.svg" },
  scheduled: { default: "/icons/filter/scheduled.svg" },
  completed: { default: "/icons/filter/completed.svg" },
};

function FilterChipIcon({ icon, active }: { icon: ContractorFilterChipIcon; active: boolean }) {
  const config = FILTER_ICON_SRC[icon];
  const src = active && config.inverse ? config.inverse : config.default;

  return <img src={src} alt="" width={24} height={24} className="size-6 shrink-0" aria-hidden />;
}

/** Figma `Contractor/Filter Chip` (216:26) — leads overview filter strip. */
export function ContractorFilterChip({
  className,
  active,
  label,
  icon,
  type = "button",
  ...props
}: ContractorFilterChipProps) {
  return (
    <button type={type} className={cn(contractorFilterChipVariants({ active }), className)} {...props}>
      {icon ? <FilterChipIcon icon={icon} active={Boolean(active)} /> : null}
      {label}
    </button>
  );
}
