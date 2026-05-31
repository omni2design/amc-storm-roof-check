import { cn } from "@/lib/utils/cn";

export type ContractorPhotoInfoOverlayProps = {
  title?: string;
  description?: string;
  className?: string;
};

/** Figma `Contractor Photo Info Overlay` — caption panel on photo viewer. */
export function ContractorPhotoInfoOverlay({ title, description, className }: ContractorPhotoInfoOverlayProps) {
  if (!title && !description) return null;

  return (
    <div
      className={cn(
        "mx-4 mb-[max(1rem,env(safe-area-inset-bottom))] rounded-card bg-[var(--contractor-photo-info-bg)] px-4 py-3 text-foreground-inverse",
        className,
      )}
    >
      {title ? <p className="text-sm-leading font-semibold">{title}</p> : null}
      {description ? <p className="mt-1 text-caption opacity-90">{description}</p> : null}
    </div>
  );
}
