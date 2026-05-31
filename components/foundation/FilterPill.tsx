import { cn } from "@/lib/utils/cn";
import { filterPillVariants, type FilterPillVariantProps } from "@/lib/variants/filter-pill";

export type FilterPillProps = Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "children"> &
  FilterPillVariantProps & {
    label: string;
    count?: number;
  };

/** Figma `Filter Pill` — selectable filter chip for lead lists and calendar views. */
export function FilterPill({ className, selected, label, count, type = "button", ...props }: FilterPillProps) {
  return (
    <button type={type} className={cn(filterPillVariants({ selected }), className)} {...props}>
      <span>{label}</span>
      {typeof count === "number" ? (
        <span className="ml-1 tabular-nums opacity-80" aria-hidden>
          ({count})
        </span>
      ) : null}
    </button>
  );
}
