import { cn } from "@/lib/utils/cn";
import type { PhotoAnnotation } from "@/lib/contractor/types";

export type ContractorPhotoAnnotationMarkerProps = {
  annotation: PhotoAnnotation;
  active?: boolean;
  onClick?: () => void;
  className?: string;
};

/** Figma `Contractor Photo Annotation Marker` — hotspot on photo viewer. */
export function ContractorPhotoAnnotationMarker({
  annotation,
  active = false,
  onClick,
  className,
}: ContractorPhotoAnnotationMarkerProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={annotation.label ?? "Photo annotation"}
      aria-pressed={active}
      className={cn(
        "absolute size-5 -translate-x-1/2 -translate-y-1/2 rounded-pill border-2 border-[var(--contractor-photo-marker-ring)] bg-button-primary shadow-semantic-popover motion-safe transition-transform focus-visible:focus-ring",
        active ? "scale-125" : "hover:scale-110",
        className,
      )}
      style={{ left: `${annotation.x}%`, top: `${annotation.y}%` }}
    >
      {annotation.label ? (
        <span className="sr-only">{annotation.label}</span>
      ) : (
        <span className="sr-only">Annotation</span>
      )}
    </button>
  );
}
