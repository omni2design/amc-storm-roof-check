import { cn } from "@/lib/utils/cn";

export type SectionHeaderProps = React.HTMLAttributes<HTMLDivElement> & {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
  size?: "sm" | "md" | "lg";
};

/** Figma `Section Header` — title row with optional subtitle and trailing action. */
export function SectionHeader({ className, title, subtitle, action, size = "md", ...props }: SectionHeaderProps) {
  const titleClass =
    size === "lg" ? "text-heading" : size === "sm" ? "text-label font-semibold" : "text-body-strong";

  return (
    <div className={cn("flex items-start justify-between gap-3", className)} {...props}>
      <div className="flex min-w-0 flex-col gap-0.5">
        <h2 className={cn(titleClass, "text-foreground-primary")}>{title}</h2>
        {subtitle ? <p className="text-caption text-foreground-secondary">{subtitle}</p> : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}
