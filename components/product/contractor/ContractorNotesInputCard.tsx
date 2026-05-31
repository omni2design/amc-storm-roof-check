"use client";

import { cn } from "@/lib/utils/cn";
import { CardShell } from "@/components/foundation/CardShell";
import { SectionHeader } from "@/components/foundation/SectionHeader";
import { textareaVariants } from "@/lib/variants/textarea";

export type ContractorNotesInputCardProps = {
  title?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  maxLength?: number;
  disabled?: boolean;
  className?: string;
};

/** Figma `Contractor Notes Input Card` — internal notes field on lead detail. */
export function ContractorNotesInputCard({
  title = "Internal notes",
  value,
  onChange,
  placeholder = "Add a note for your team…",
  maxLength = 500,
  disabled,
  className,
}: ContractorNotesInputCardProps) {
  return (
    <CardShell className={cn("flex flex-col gap-3", className)} variant="muted" padding="md">
      <SectionHeader title={title} size="sm" />
      <div className={textareaVariants({ state: disabled ? "disabled" : "default" })}>
        <textarea
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          maxLength={maxLength}
          disabled={disabled}
          rows={4}
          aria-label={title}
          className="min-h-[6rem] w-full resize-y border-0 bg-transparent p-0 text-sm-leading text-input-text placeholder:text-input-placeholder focus:outline-none focus:ring-0 disabled:cursor-not-allowed"
        />
      </div>
    </CardShell>
  );
}
