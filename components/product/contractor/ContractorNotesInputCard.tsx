"use client";

import { cn } from "@/lib/utils/cn";
import { LEAD_DETAIL_CARD_CLASS } from "@/components/product/contractor/LeadDetailPageLayout";

export type ContractorNotesInputCardProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  maxLength?: number;
  disabled?: boolean;
  className?: string;
};

/** Figma `Contractor/Notes Input Card` (715:2758) */
export function ContractorNotesInputCard({
  value,
  onChange,
  placeholder = "Add notes about this project...",
  maxLength = 500,
  disabled,
  className,
}: ContractorNotesInputCardProps) {
  return (
    <article className={cn(LEAD_DETAIL_CARD_CLASS, "flex flex-col gap-3 p-4", className)}>
      <p className="text-[10px] font-semibold leading-[1.4] tracking-[0.05px] text-[#9ca3af]">
        CONTRACTOR NOTES
      </p>

      <div className="flex h-20 flex-col rounded-lg border border-[#e5e7eb] bg-white px-3 py-2.5">
        <textarea
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          maxLength={maxLength}
          disabled={disabled}
          rows={3}
          aria-label="Contractor notes"
          className="min-h-0 w-full flex-1 resize-none border-0 bg-transparent p-0 text-sm leading-tight text-foreground-primary placeholder:text-[#9ca3af] focus:outline-none focus:ring-0 disabled:cursor-not-allowed"
        />
      </div>

      <div className="flex h-6 items-center justify-between">
        <button
          type="button"
          className="flex items-center gap-1 text-[10px] leading-[1.4] tracking-[0.05px] text-foreground-secondary motion-safe transition-colors hover:text-foreground-primary focus-visible:focus-ring"
        >
          <span className="size-3 shrink-0 rounded-sm bg-[#9ca3af]" aria-hidden />
          Attach file
        </button>
        <p className="text-[10px] leading-[1.4] tracking-[0.05px] text-[#9ca3af]">
          {value.length} / {maxLength}
        </p>
      </div>
    </article>
  );
}
