import { cn } from "@/lib/utils/cn";
import { LEAD_DETAIL_CARD_CLASS } from "@/components/product/contractor/LeadDetailPageLayout";

export type ContractorPhotoItem = {
  id: string;
  src: string;
  alt?: string;
  label?: string;
};

export type ContractorPhotoGalleryCardProps = {
  photos: ContractorPhotoItem[];
  onPhotoClick?: (photo: ContractorPhotoItem) => void;
  className?: string;
};

/** Figma `Contractor/Photo Gallery Card` (829:8093) */
export function ContractorPhotoGalleryCard({
  photos,
  onPhotoClick,
  className,
}: ContractorPhotoGalleryCardProps) {
  return (
    <article className={cn(LEAD_DETAIL_CARD_CLASS, "flex flex-col gap-2 p-4", className)}>
      <p className="text-[10px] font-semibold leading-[1.4] tracking-[0.05px] text-[#9ca3af]">
        UPLOADED PHOTOS
      </p>
      {photos.length === 0 ? (
        <p className="text-sm text-[#9ca3af]">No photos uploaded yet.</p>
      ) : (
        <div className="flex h-[90px] w-full gap-2">
          {photos.map((photo, index) => (
            <div key={photo.id} className="flex min-w-0 flex-1 flex-col gap-1">
              <button
                type="button"
                onClick={() => onPhotoClick?.(photo)}
                className="h-[70px] w-full overflow-hidden rounded-md focus-visible:focus-ring"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={photo.src}
                  alt={photo.alt ?? photo.label ?? "Lead photo"}
                  className="size-full object-cover"
                />
              </button>
              <p className="text-[9px] leading-none text-[#9ca3af]">
                {photo.label ?? `Photo ${index + 1}`}
              </p>
            </div>
          ))}
        </div>
      )}
    </article>
  );
}
