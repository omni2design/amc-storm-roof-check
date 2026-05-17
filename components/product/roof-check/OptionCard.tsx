import Image from "next/image";
import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils/cn";
import {
  optionCardDescriptionVariants,
  optionCardVariants,
  type OptionCardVariantProps,
} from "@/lib/variants/option-card";
import { IconChip } from "@/components/foundation/IconChip";
import type { IconId } from "@/lib/icons/types";

export type OptionCardProps = ButtonHTMLAttributes<HTMLButtonElement> &
  OptionCardVariantProps & {
    title: string;
    description?: string;
    icon?: IconId;
    selected?: boolean;
    warning?: boolean;
  };

/** Figma `Selection / Option Card` — 73px row, 40px icon chip, 18px selected indicator */
export const OptionCard = forwardRef<HTMLButtonElement, OptionCardProps>(
  (
    {
      className,
      state,
      title,
      description,
      icon,
      selected = false,
      warning = false,
      disabled,
      ...props
    },
    ref,
  ) => {
    const resolvedState = disabled
      ? "disabled"
      : warning
        ? "warning"
        : selected
          ? "selected"
          : state ?? "default";

    return (
      <button
        ref={ref}
        type="button"
        disabled={disabled}
        aria-pressed={selected}
        className={cn(optionCardVariants({ state: resolvedState }), className)}
        {...props}
      >
        {icon ? (
          <IconChip
            name={icon}
            mode={selected ? "inverse" : "brand"}
            tone={selected ? "selected" : warning ? "warning" : "default"}
            size="md"
          />
        ) : null}
        <span className="flex min-w-0 flex-1 flex-col items-start justify-center text-left">
          <span
            className={cn(
              "text-base font-semibold leading-normal",
              selected ? "text-foreground-inverse" : "text-foreground-primary",
            )}
          >
            {title}
          </span>
          {description ? (
            <span className={optionCardDescriptionVariants({ state: resolvedState })}>{description}</span>
          ) : null}
        </span>
        {selected ? (
          <Image
            src="/brand/amc-logo/selection-indicator.svg"
            alt=""
            width={18}
            height={18}
            className="size-[1.125rem] shrink-0 self-center"
            aria-hidden
          />
        ) : null}
      </button>
    );
  },
);

OptionCard.displayName = "OptionCard";
