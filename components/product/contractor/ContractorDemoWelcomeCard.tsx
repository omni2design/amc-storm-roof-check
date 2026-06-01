import { cn } from "@/lib/utils/cn";

export type ContractorDemoWelcomeCardProps = {
  name: string;
  role: string;
  company: string;
  description: string;
  className?: string;
};

/** Figma demo access welcome card — avatar row, divider, supporting copy. */
export function ContractorDemoWelcomeCard({
  name,
  role,
  company,
  description,
  className,
}: ContractorDemoWelcomeCardProps) {
  const initial = name.trim().charAt(0).toUpperCase() || "?";

  return (
    <article
      className={cn(
        "flex flex-col gap-3 rounded-[1rem] border border-border-default bg-surface-card p-4 shadow-[0_2px_4px_rgb(17_24_39/0.07)]",
        className,
      )}
    >
      <div className="flex items-center gap-3.5">
        <span
          className="flex size-14 shrink-0 items-center justify-center rounded-[1.75rem] bg-button-navy text-[1.375rem] font-semibold text-button-navy-text"
          aria-hidden
        >
          {initial}
        </span>
        <div className="flex min-w-0 flex-col">
          <h2 className="text-lg leading-relaxed font-semibold text-foreground-primary">Welcome back, {name}</h2>
          <p className="text-sm-leading text-foreground-secondary">
            {role} · {company}
          </p>
        </div>
      </div>
      <div className="h-px w-full bg-surface-muted" aria-hidden />
      <p className="text-sm-leading text-foreground-secondary">{description}</p>
    </article>
  );
}
