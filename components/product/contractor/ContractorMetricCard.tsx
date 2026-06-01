import { cn } from "@/lib/utils/cn";

export type ContractorMetricCardProps = {
  value: number;
  label: string;
  tone?: "active" | "urgent" | "today";
  className?: string;
};

const DOT_CLASS = {
  active: "bg-feedback-success",
  urgent: "bg-feedback-danger",
  today: "bg-feedback-warning",
} as const;

/** Figma `Contractor/Metric Card` — compact stat tile for demo dashboard. */
export function ContractorMetricCard({ value, label, tone = "active", className }: ContractorMetricCardProps) {
  return (
    <div
      className={cn(
        "relative flex h-[5.5625rem] w-full min-w-0 flex-col items-center rounded-md border border-border-default bg-surface-card shadow-[0_2px_4px_rgb(0_0_0/0.06)]",
        className,
      )}
    >
      <span
        className={cn("absolute left-1/2 top-[0.8125rem] size-2 -translate-x-1/2 rounded-pill", DOT_CLASS[tone])}
        aria-hidden
      />
      <p className="absolute left-1/2 top-[1.6875rem] -translate-x-1/2 text-xl font-semibold text-foreground-primary">
        {value}
      </p>
      <p className="absolute left-1/2 top-[3.875rem] -translate-x-1/2 text-[0.625rem] font-semibold tracking-[0.6px] text-foreground-muted">
        {label}
      </p>
    </div>
  );
}
