import { cn } from "@/lib/utils/cn";

export type ProgressBarProps = {
  value: number;
  max?: number;
  className?: string;
  label?: string;
};

export function ProgressBar({ value, max = 1, className, label }: ProgressBarProps) {
  const pct = max > 0 ? Math.min(100, Math.max(0, (value / max) * 100)) : 0;

  return (
    <div
      role="progressbar"
      aria-valuenow={Math.round(pct)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={label}
      className={cn("h-1 w-full overflow-hidden bg-intake-progress-track", className)}
    >
      <div
        className="motion-safe h-full bg-intake-progress-fill transition-[width]"
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}
