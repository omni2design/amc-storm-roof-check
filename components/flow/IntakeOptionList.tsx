"use client";

import { cn } from "@/lib/utils/cn";
import { OptionCard } from "@/components/product/roof-check/OptionCard";
import type { IntakeOption } from "@/lib/flow/intake-options";

export type IntakeOptionListProps = {
  options: IntakeOption[];
  value?: string;
  onChange: (value: string) => void;
  className?: string;
};

/** Renders a data-driven list of intake option cards */
export function IntakeOptionList({ options, value, onChange, className }: IntakeOptionListProps) {
  return (
    <div className={cn("flex flex-col gap-4", className)}>
      {options.map((option) => (
        <OptionCard
          key={option.value}
          title={option.title}
          description={option.description}
          icon={option.icon}
          warning={option.warning}
          selected={value === option.value}
          onClick={() => onChange(option.value)}
        />
      ))}
    </div>
  );
}
