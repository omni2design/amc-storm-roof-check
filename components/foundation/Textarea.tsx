import { forwardRef, type TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils/cn";
import { textareaVariants, type TextareaVariantProps } from "@/lib/variants/textarea";

export type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> &
  TextareaVariantProps & {
    label: string;
    hint?: string;
    error?: string;
    wrapperClassName?: string;
  };

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, wrapperClassName, state: fieldState, label, hint, error, id, disabled, ...props }, ref) => {
    const inputId = id ?? props.name;
    const resolvedState = error ? "error" : disabled ? "disabled" : fieldState;
    const describedBy = error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined;

    return (
      <div className={cn("flex w-full flex-col gap-1", wrapperClassName)}>
        <label htmlFor={inputId} className="text-label text-foreground-secondary">
          {label}
        </label>
        <div className={cn(textareaVariants({ state: resolvedState }), className)}>
          <textarea
            ref={ref}
            id={inputId}
            disabled={disabled}
            aria-invalid={error ? true : undefined}
            aria-describedby={describedBy}
            className="min-h-[8rem] w-full resize-y border-0 bg-transparent p-0 text-body text-input-text placeholder:text-input-placeholder focus:outline-none focus:ring-0 disabled:cursor-not-allowed"
            {...props}
          />
        </div>
        {error ? (
          <p id={`${inputId}-error`} className="text-caption text-foreground-danger">
            {error}
          </p>
        ) : hint ? (
          <p id={`${inputId}-hint`} className="text-caption text-foreground-muted">
            {hint}
          </p>
        ) : null}
      </div>
    );
  },
);

Textarea.displayName = "Textarea";
