import { cn } from "@/lib/utils/cn";
import type { PhotoAnnotation } from "@/lib/contractor/types";

export type ContractorPhotoAnnotationMarkerProps = {
  annotation: PhotoAnnotation;
  labelPosition?: "left" | "right";
  className?: string;
};

/** Figma `Contractor/Photo Annotation Marker` — pill label + hotspot dot (04.01). */
export function ContractorPhotoAnnotationMarker({
  annotation,
  labelPosition = "left",
  className,
}: ContractorPhotoAnnotationMarkerProps) {
  if (!annotation.label) return null;

  const pill = (
    <span className="shrink-0 rounded-[20px] bg-[#b22e2e] px-[7px] py-[3px] text-[10px] font-semibold leading-[1.4] tracking-[0.05px] text-white whitespace-nowrap">
      {annotation.label}
    </span>
  );

  const dot = (
    <span
      className="size-[18px] shrink-0 rounded-[9px] border-[2.5px] border-white bg-[#b22e2e]"
      aria-hidden
    />
  );

  return (
    <div
      className={cn(
        "pointer-events-none absolute flex items-center gap-2",
        labelPosition === "left" ? "flex-row" : "flex-row-reverse",
        className,
      )}
      style={{
        left: `${annotation.x}%`,
        top: `${annotation.y}%`,
        transform: "translate(-50%, -50%)",
      }}
      aria-hidden
    >
      {pill}
      {dot}
    </div>
  );
}
