import { cn } from "@/lib/utils/cn";

export type ContractorWorkspaceSummaryItem = {
  id: string;
  text: string;
  tone?: "urgent" | "scheduled" | "neutral";
};

export type ContractorWorkspaceSummaryCardProps = {
  title?: string;
  items: ContractorWorkspaceSummaryItem[];
  className?: string;
};

const BULLET_CLASS = {
  urgent: "bg-feedback-danger",
  scheduled: "bg-feedback-success",
  neutral: "bg-foreground-muted",
} as const;

/** Figma `Contractor/Workspace Summary Card` — preview bullet list for demo access. */
export function ContractorWorkspaceSummaryCard({
  title = "WORKSPACE PREVIEW",
  items,
  className,
}: ContractorWorkspaceSummaryCardProps) {
  return (
    <article
      className={cn(
        "flex flex-col gap-3 rounded-control border border-border-default bg-surface-card p-4 shadow-[0_2px_8px_rgb(0_0_0/0.06)]",
        className,
      )}
    >
      <p className="text-caption font-semibold tracking-[0.05px] text-foreground-muted">{title}</p>
      <div className="h-px w-full bg-surface-muted" aria-hidden />
      <ul className="flex flex-col gap-2.5">
        {items.map((item) => (
          <li key={item.id} className="flex items-center gap-2">
            <span
              className={cn(
                "size-1.5 shrink-0 rounded-pill",
                BULLET_CLASS[item.tone ?? "neutral"],
              )}
              aria-hidden
            />
            <p className="text-sm-leading text-foreground-secondary">{item.text}</p>
          </li>
        ))}
      </ul>
    </article>
  );
}
