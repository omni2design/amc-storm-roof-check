import { cn } from "@/lib/utils/cn";
import { PROFILE_ACTION_ICON_SRC } from "@/lib/contractor/profile-icons";
import type { ProfileQuickActionIcon } from "@/lib/contractor/types";

/** Figma `Foundation/Button/Icon` — 32×32 tile, 4px padding, centered 24×24 icon. */
export function ContractorProfileActionIcon({
  icon,
  className,
}: {
  icon: ProfileQuickActionIcon;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "box-border flex size-8 shrink-0 flex-row items-center justify-center rounded-lg bg-[#f3f4f6] p-1",
        className,
      )}
      aria-hidden
    >
      <img
        src={PROFILE_ACTION_ICON_SRC[icon]}
        alt=""
        width={24}
        height={24}
        className="block size-6 max-h-full max-w-full shrink-0 object-contain"
      />
    </span>
  );
}
