import { cn } from "@/lib/utils/cn";
import { CardShell } from "@/components/foundation/CardShell";
import { SectionHeader } from "@/components/foundation/SectionHeader";

export type ContractorPhotoItem = {
  id: string;
  src: string;
  alt?: string;
  label?: string;
};

export type ContractorPhotoGalleryCardProps = {
  photos: ContractorPhotoItem[];
  title?: string;
  onPhotoClick?: (photo: ContractorPhotoItem) => void;
  className?: string;
};

/** Figma `Contractor Photo Gallery Card` — thumbnail grid for lead photos. */
export function ContractorPhotoGalleryCard({
  photos,
  title = "Photos",
  onPhotoClick,
  className,
}: ContractorPhotoGalleryCardProps) {
  return (
    <CardShell className={cn("flex flex-col gap-4", className)} padding="md">
      <SectionHeader title={title} subtitle={`${photos.length} uploaded`} size="sm" />
      {photos.length === 0 ? (
        <p className="text-sm-leading text-foreground-muted">No photos uploaded yet.</p>
      ) : (
        <ul className="grid grid-cols-3 gap-2">
          {photos.map((photo) => (
            <li key={photo.id}>
              <button
                type="button"
                onClick={() => onPhotoClick?.(photo)}
                className="group relative aspect-square w-full overflow-hidden rounded-control border border-border-default bg-background-subtle focus-visible:focus-ring"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={photo.src} alt={photo.alt ?? photo.label ?? "Lead photo"} className="size-full object-cover" />
                {photo.label ? (
                  <span className="absolute inset-x-0 bottom-0 bg-contractor-photo-info-bg px-2 py-1 text-caption text-foreground-inverse opacity-0 motion-safe transition-opacity group-hover:opacity-100">
                    {photo.label}
                  </span>
                ) : null}
              </button>
            </li>
          ))}
        </ul>
      )}
    </CardShell>
  );
}
