import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/utils/cn";
import { buttonVariants, type ButtonVariantProps } from "@/lib/variants/button";
import { Icon } from "@/components/icons/Icon";
import { buttonIconMode } from "@/lib/foundation/button-icon-mode";
import type { IconId } from "@/lib/icons/types";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  ButtonVariantProps & {
    loading?: boolean;
    loadingLabel?: string;
    iconLeft?: IconId;
    iconRight?: IconId;
    children?: ReactNode;
  };

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      intent,
      size,
      loading = false,
      loadingLabel = "Loading…",
      disabled,
      iconLeft,
      iconRight,
      children,
      type = "button",
      ...props
    },
    ref,
  ) => {
    const isDisabled = disabled || loading;
    const iconMode = buttonIconMode(intent);

    return (
      <button
        ref={ref}
        type={type}
        disabled={isDisabled}
        aria-busy={loading || undefined}
        data-state={loading ? "loading" : undefined}
        className={cn(buttonVariants({ intent, size }), className)}
        {...props}
      >
        {loading ? (
          <>
            <Icon
              name="system/loading"
              mode={iconMode}
              size="sm"
              className="motion-safe animate-[amc-spin_0.8s_linear_infinite]"
            />
            {loadingLabel ? <span className="min-w-0">{loadingLabel}</span> : null}
          </>
        ) : (
          <>
            {iconLeft ? <Icon name={iconLeft} mode={iconMode} size="sm" /> : null}
            {children ? <span className="min-w-0">{children}</span> : null}
            {iconRight ? <Icon name={iconRight} mode={iconMode} size="sm" /> : null}
          </>
        )}
      </button>
    );
  },
);

Button.displayName = "Button";
