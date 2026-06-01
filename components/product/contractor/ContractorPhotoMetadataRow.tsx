import { cn } from "@/lib/utils/cn";

export type ContractorPhotoMetadataRowProps = {
  location: string;
  date: string;
  inspector: string;
  className?: string;
};

/** Figma `Contractor/Metadata Row` — compact 3-column row in photo viewer panel. */
export function ContractorPhotoMetadataRow({
  location,
  date,
  inspector,
  className,
}: ContractorPhotoMetadataRowProps) {
  const columns = [
    { label: "Location", value: location },
    { label: "Date", value: date },
    { label: "Inspector", value: inspector },
  ] as const;

  return (
    <div
      className={cn(
        "grid grid-cols-3 rounded-lg bg-[#f9fafb] p-3",
        className,
      )}
    >
      {columns.map((column, index) => (
        <div
          key={column.label}
          className={cn(
            "flex min-w-0 flex-col gap-[3px] px-2.5",
            index > 0 && "border-l border-[#e5e7eb]",
          )}
        >
          <p className="text-[10px] leading-[1.4] tracking-[0.05px] text-[#9ca3af]">{column.label}</p>
          <p className="truncate text-xs leading-tight tracking-[0.03px] text-[#0b1f33]">{column.value}</p>
        </div>
      ))}
    </div>
  );
}
