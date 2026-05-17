import { forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils/cn";
import { textFieldVariants, type TextFieldVariantProps } from "@/lib/variants/text-field";
import { Icon } from "@/components/icons/Icon";
import type { IconId } from "@/lib/icons/types";

export type TextFieldProps = Omit<InputHTMLAttributes<HTMLInputElement>, "size"> &
  TextFieldVariantProps & {
    label: string;
    hint?: string;
    error?: string;
    icon?: IconId;
    wrapperClassName?: string;
    requiredMark?: boolean;
  };

/** Figma `Field / Text Input` — icon + overline label + 16px value in one row */
export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  (
    {
      className,
      wrapperClassName,
      state: fieldState,
      label,
      hint,
      error,
      icon,
      id,
      disabled,
      required,
      requiredMark,
      placeholder,
      ...inputProps
    },
    ref,
  ) => {
    const inputId = id ?? inputProps.name;
    const resolvedState = error ? "error" : disabled ? "disabled" : fieldState;
    const describedBy = error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined;
    const showRequired = requiredMark ?? required;

    return (
      <div className={cn("flex w-full flex-col gap-1", wrapperClassName)}>
        <label htmlFor={inputId} className={cn(textFieldVariants({ state: resolvedState }), className)}>
          {icon ? (
            <span className="flex w-6 shrink-0 items-center justify-center self-center" aria-hidden>
              <Icon name={icon} mode="subtle" size="md" className="size-6" />
            </span>
          ) : null}
          <span className="flex min-w-0 flex-1 flex-col gap-0.5">
            <span className="text-overline text-foreground-secondary">
              {label}
              {showRequired ? <span className="text-button-emergency"> *</span> : null}
            </span>
            <input
              ref={ref}
              id={inputId}
              disabled={disabled}
              required={required}
              placeholder={placeholder}
              aria-invalid={error ? true : undefined}
              aria-describedby={describedBy}
              className="w-full min-w-0 border-0 bg-transparent p-0 text-base leading-normal text-input-text placeholder:text-input-placeholder focus:outline-none focus:ring-0 disabled:cursor-not-allowed"
              {...inputProps}
            />
          </span>
        </label>
        {error ? (
          <p id={`${inputId}-error`} className="text-2xs-leading text-foreground-danger">
            {error}
          </p>
        ) : hint ? (
          <p id={`${inputId}-hint`} className="text-2xs-leading text-foreground-muted">
            {hint}
          </p>
        ) : null}
      </div>
    );
  },
);

TextField.displayName = "TextField";
