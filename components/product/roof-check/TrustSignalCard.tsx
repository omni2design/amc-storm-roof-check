import { cn } from "@/lib/utils/cn";
import { Icon } from "@/components/icons/Icon";
import type { IconId } from "@/lib/icons/types";

export type TrustSignalColumn = {
  icon: IconId;
  headline: string;
  caption: string;
};

const defaultColumns: TrustSignalColumn[] = [
  { icon: "trust/rating", headline: "5 Stars", caption: "20+ Media reviews" },
  { icon: "trust/licensed", headline: "Licensed", caption: "Fully certified contractor" },
  { icon: "trust/local", headline: "Local", caption: "Serving your community" },
  { icon: "trust/no-rush", headline: "No Rush", caption: "Honest, free advice" },
];

export type TrustSignalCardProps = {
  columns?: TrustSignalColumn[];
  className?: string;
};

/** Figma `Trust Signal Card` — h 108px, 24px icons, 70px columns */
export function TrustSignalCard({ columns = defaultColumns, className }: TrustSignalCardProps) {
  return (
    <div
      className={cn(
        "flex h-[6.75rem] w-full items-center justify-between rounded-xl border border-input-border bg-surface-card p-4 shadow-semantic-rest",
        className,
      )}
    >
      {columns.map((column, index) => (
        <div key={column.headline} className="flex h-full min-w-0 flex-1 items-center">
          {index > 0 ? <div className="mx-0 h-[3.75rem] w-px shrink-0 bg-border-default" aria-hidden /> : null}
          <div className="flex min-w-0 flex-1 flex-col items-center justify-center gap-1 px-0.5 text-center">
            <Icon name={column.icon} mode="brand-fill" size="md" className="size-6 shrink-0" />
            <span className="text-overline w-full text-foreground-primary">{column.headline}</span>
            <span className="text-2xs-leading w-full text-pretty tracking-[0.05px] text-foreground-secondary">
              {column.caption}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
