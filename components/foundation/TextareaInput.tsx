"use client";

import { forwardRef, type TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils/cn";
import {
  textareaInputVariants,
  type TextareaInputVariantProps,
} from "@/lib/variants/textarea-input";

export type TextareaInputProps = TextareaHTMLAttributes<HTMLTextAreaElement> &
  TextareaInputVariantProps & {
    label: string;
    helper?: string;
    error?: string;
    maxLength?: number;
    wrapperClassName?: string;
  };

/** Figma `Field / Textarea Input` — card, overline label, helper, character counter */
export const TextareaInput = forwardRef<HTMLTextAreaElement, TextareaInputProps>(
  (
    {
      className,
      wrapperClassName,
      state: fieldState,
      label,
      helper,
      error,
      maxLength = 500,
      id,
      disabled,
      value = "",
      ...props
    },
    ref,
  ) => {
    const inputId = id ?? props.name;
    const resolvedState = error ? "error" : disabled ? "disabled" : fieldState;
    const describedBy = error ? `${inputId}-error` : helper ? `${inputId}-helper` : undefined;
    const charCount = String(value ?? "").length;

    return (
      <div className={cn("flex w-full flex-col gap-1", wrapperClassName)}>
        <div className={cn(textareaInputVariants({ state: resolvedState }), className)}>
          <label htmlFor={inputId} className="text-overline text-foreground-secondary">
            {label}
          </label>
          <textarea
            ref={ref}
            id={inputId}
            disabled={disabled}
            maxLength={maxLength}
            value={value}
            aria-invalid={error ? true : undefined}
            aria-describedby={describedBy}
            className="min-h-[6.5rem] w-full resize-y border-0 bg-transparent p-0 text-base leading-normal text-input-text placeholder:text-input-placeholder focus:outline-none focus:ring-0 disabled:cursor-not-allowed"
            {...props}
          />
          <div className="flex items-start justify-between gap-3">
            {helper ? (
              <p id={`${inputId}-helper`} className="min-w-0 flex-1 text-2xs-leading text-foreground-muted">
                {helper}
              </p>
            ) : (
              <span className="min-w-0 flex-1" aria-hidden />
            )}
            <p className="shrink-0 tabular-nums text-2xs-leading text-foreground-muted" aria-live="polite">
              {charCount} / {maxLength}
            </p>
          </div>
        </div>
        {error ? (
          <p id={`${inputId}-error`} className="text-2xs-leading text-foreground-danger">
            {error}
          </p>
        ) : null}
      </div>
    );
  },
);

TextareaInput.displayName = "TextareaInput";
