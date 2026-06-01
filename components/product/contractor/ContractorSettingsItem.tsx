import Link from "next/link";
import { cn } from "@/lib/utils/cn";
import { NavigationBackIcon } from "@/components/foundation/icons/NavigationBackIcon";
import { ContractorProfileActionIcon } from "@/components/product/contractor/ContractorProfileActionIcon";
import type { ProfileQuickActionIcon } from "@/lib/contractor/types";

export type ContractorSettingsItemProps = {
  label: string;
  description?: string;
  icon?: ProfileQuickActionIcon;
  href?: string;
  onClick?: () => void;
  trailing?: React.ReactNode;
  destructive?: boolean;
  className?: string;
};


/** Figma settings list row — icon tile, title, subtitle, chevron. */
export function ContractorSettingsItem({
  label,
  description,
  icon,
  href,
  onClick,
  trailing,
  destructive = false,
  className,
}: ContractorSettingsItemProps) {
  const content = (
    <>
      {icon ? <ContractorProfileActionIcon icon={icon} /> : null}
      <div className="flex min-w-0 flex-1 flex-col gap-px">
        <span
          className={cn(
            "text-sm font-semibold leading-tight",
            destructive ? "text-foreground-danger" : "text-foreground-primary",
          )}
        >
          {label}
        </span>
        {description ? (
          <span className="text-[10px] font-normal leading-[1.4] tracking-[0.05px] text-foreground-muted">
            {description}
          </span>
        ) : null}
      </div>
      {trailing ?? <NavigationBackIcon position="right" />}
    </>
  );

  const rowClass = cn(
    "flex w-full items-center gap-3 overflow-hidden p-4 text-left motion-safe transition-colors hover:bg-[#f9fafb] focus-visible:focus-ring",
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
