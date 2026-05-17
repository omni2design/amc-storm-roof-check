import { forwardRef, type InputHTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/utils/cn";
import { uploadCardVariants, type UploadCardVariantProps } from "@/lib/variants/upload-card";
import { Icon } from "@/components/icons/Icon";

export type UploadCardProps = Omit<InputHTMLAttributes<HTMLInputElement>, "size"> &
  UploadCardVariantProps & {
    title: string;
    description?: string;
    preview?: ReactNode;
    loading?: boolean;
    wrapperClassName?: string;
  };

/** Figma `Upload Card` — empty | uploaded | error | loading */
export const UploadCard = forwardRef<HTMLInputElement, UploadCardProps>(
  (
    {
      className,
      wrapperClassName,
      state = "empty",
      title,
      description,
      preview,
      loading,
      disabled,
      ...inputProps
    },
    ref,
  ) => {
    const resolvedState = loading ? "loading" : state;

    return (
      <label
        aria-busy={loading || undefined}
        className={cn(
          uploadCardVariants({ state: resolvedState }),
          "relative cursor-pointer items-center text-center",
          (disabled || loading) && "cursor-not-allowed",
          wrapperClassName,
          className,
        )}
      >
        <input
          ref={ref}
          type="file"
          disabled={disabled || loading}
          aria-disabled={disabled || loading || undefined}
          className="absolute inset-0 cursor-pointer opacity-0 disabled:cursor-not-allowed"
          {...inputProps}
        />
        {preview ?? (
          <>
            <Icon
              name={loading ? "system/loading" : "action/gallery"}
              mode="brand"
              size="xl"
              className={loading ? "motion-safe animate-[amc-spin_0.8s_linear_infinite] opacity-loading" : undefined}
            />
            <span className="flex flex-col items-center gap-1">
              <span className="text-body-strong text-foreground-primary">{title}</span>
              {description ? (
                <span className="max-w-xs text-sm-leading text-foreground-secondary">{description}</span>
              ) : null}
            </span>
          </>
        )}
      </label>
    );
  },
);

UploadCard.displayName = "UploadCard";
