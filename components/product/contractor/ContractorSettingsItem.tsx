import Link from "next/link";
import { cn } from "@/lib/utils/cn";

export type ContractorSettingsItemProps = {
  label: string;
  description?: string;
  href?: string;
  onClick?: () => void;
  trailing?: React.ReactNode;
  destructive?: boolean;
  className?: string;
};

/** Figma `Contractor Settings Item` — single row in profile settings list. */
export function ContractorSettingsItem({
  label,
  description,
  href,
  onClick,
  trailing,
  destructive = false,
  className,
}: ContractorSettingsItemProps) {
  const content = (
    <>
      <div className="flex min-w-0 flex-1 flex-col gap-0.5 text-left">
        <span
          className={cn(
            "text-sm-leading font-medium",
            destructive ? "text-foreground-danger" : "text-foreground-primary",
          )}
        >
          {label}
        </span>
        {description ? <span className="text-caption text-foreground-secondary">{description}</span> : null}
      </div>
      {trailing ?? (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0 text-icon-subtle" aria-hidden>
          <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </>
  );

  const rowClass = cn(
    "flex w-full items-center gap-3 px-4 py-3 text-left motion-safe transition-colors hover:bg-contractor-settings-item-bg-hover focus-visible:focus-ring",
    className,
  );

  if (href) {
    return (
      <Link href={href} className={rowClass}>
        {content}
      </Link>
    );
  }

  return (
    <button type="button" onClick={onClick} className={rowClass}>
      {content}
    </button>
  );
}
