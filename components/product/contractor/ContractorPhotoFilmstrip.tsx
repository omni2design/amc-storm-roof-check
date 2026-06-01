import { cn } from "@/lib/utils/cn";

export type ContractorPhotoFilmstripItem = {
  id: string;
  src: string;
  alt?: string;
};

export type ContractorPhotoFilmstripProps = {
  photos: ContractorPhotoFilmstripItem[];
  activeIndex: number;
  onSelect: (index: number) => void;
  className?: string;
};

/** Figma `Contractor/Photo Filmstrip` (04.01) — numbered thumbnails with active red border. */
export function ContractorPhotoFilmstrip({
  photos,
  activeIndex,
  onSelect,
  className,
}: ContractorPhotoFilmstripProps) {
  return (
    <div
      className={cn(
        "flex gap-2 rounded-lg bg-[#f9fafb] p-2",
        className,
      )}
      role="tablist"
      aria-label="Inspection photos"
    >
      {photos.map((photo, index) => {
        const selected = index === activeIndex;
        return (
          <button
            key={photo.id}
            type="button"
            role="tab"
            aria-selected={selected}
            aria-label={`Photo ${index + 1}`}
            onClick={() => onSelect(index)}
            className="flex min-w-0 flex-1 flex-col focus-visible:focus-ring"
          >
            <div
              className={cn(
                "relative h-12 w-full overflow-hidden rounded",
                selected ? "border-2 border-[#b22e2e]" : "border-2 border-transparent",
              )}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={photo.src}
                alt={photo.alt ?? `Inspection photo ${index + 1}`}
                className="size-full object-cover"
              />
              <span
                className={cn(
                  "absolute right-0 top-0 flex size-3 items-center justify-center rounded-md text-[7px] font-semibold leading-none text-white",
                  selected ? "bg-[#b22e2e]" : "bg-[rgba(0,0,0,0.55)]",
                )}
              >
                {index + 1}
              </span>
            </div>
          </button>
        );
      })}
    </div>
  );
}
