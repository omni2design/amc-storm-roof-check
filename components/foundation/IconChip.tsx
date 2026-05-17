import { Icon } from "@/components/icons/Icon";
import { cn } from "@/lib/utils/cn";
import type { IconId, IconMode } from "@/lib/icons/types";
import { iconChipVariants, type IconChipVariantProps } from "@/lib/variants/icon-chip";

export type IconChipProps = IconChipVariantProps & {
  name: IconId;
  mode?: IconMode;
  className?: string;
};

/** Centered icon inside a selection / action chip (Figma icon-only button surface). */
export function IconChip({ name, mode = "brand", tone, size, className }: IconChipProps) {
  return (
    <span className={cn(iconChipVariants({ tone, size }), className)} aria-hidden>
      <Icon
        name={name}
        mode={mode}
        className="m-0 block size-full min-h-0 min-w-0 max-h-full max-w-full shrink-0"
      />
    </span>
  );
}
