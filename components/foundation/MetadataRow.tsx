import { cn } from "@/lib/utils/cn";

export type MetadataRowProps = React.HTMLAttributes<HTMLDivElement> & {
  label: string;
  value: React.ReactNode;
  icon?: React.ReactNode;
  align?: "start" | "center";
};

/** Figma `Metadata Row` — label/value pair for lead detail and profile summaries. */
export function MetadataRow({ className, label, value, icon, align = "center", ...props }: MetadataRowProps) {
  return (
    <div
      className={cn(
        "flex gap-3",
        align === "center" ? "items-center" : "items-start",
        className,
      )}
      {...props}
    >
      {icon ? <span className="flex shrink-0 text-icon-subtle">{icon}</span> : null}
      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        <dt className="text-caption text-foreground-muted">{label}</dt>
        <dd className="text-sm-leading font-medium text-foreground-primary">{value}</dd>
      </div>
    </div>
  );
}
