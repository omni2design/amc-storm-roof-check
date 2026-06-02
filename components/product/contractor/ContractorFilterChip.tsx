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

const FILTER_ICON_SRC: Record<ContractorFilterChipIcon, string> = {
  all: "/icons/filter/all-default.svg",
  new: "/icons/filter/new.svg",
  urgent: "/icons/filter/urgent.svg",
  scheduled: "/icons/filter/scheduled.svg",
  completed: "/icons/filter/completed.svg",
};

function FilterChipIcon({ icon, active }: { icon: ContractorFilterChipIcon; active: boolean }) {
  return (
    <img
      src={FILTER_ICON_SRC[icon]}
      alt=""
      width={24}
      height={24}
      className={cn("size-6 shrink-0", active && "brightness-0 invert")}
      aria-hidden
    />
  );
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
