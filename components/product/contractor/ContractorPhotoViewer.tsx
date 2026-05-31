"use client";

import { cn } from "@/lib/utils/cn";
import { IconButton } from "@/components/foundation/IconButton";
import { ContractorPhotoAnnotationMarker } from "./ContractorPhotoAnnotationMarker";
import { ContractorPhotoInfoOverlay } from "./ContractorPhotoInfoOverlay";
import type { PhotoAnnotation } from "@/lib/contractor/types";

export type ContractorPhotoViewerProps = {
  src: string;
  alt?: string;
  annotations?: PhotoAnnotation[];
  activeAnnotationId?: string;
  infoTitle?: string;
  infoDescription?: string;
  onClose?: () => void;
  onAnnotationClick?: (annotation: PhotoAnnotation) => void;
  className?: string;
};

/** Figma `Contractor Photo Viewer` — full-screen photo with annotations and info overlay. */
export function ContractorPhotoViewer({
  src,
  alt = "Lead photo",
  annotations = [],
  activeAnnotationId,
  infoTitle,
  infoDescription,
  onClose,
  onAnnotationClick,
  className,
}: ContractorPhotoViewerProps) {
  return (
    <div
      className={cn(
        "relative flex min-h-dvh flex-col bg-[var(--contractor-photo-viewer-bg)]",
        className,
      )}
      role="dialog"
      aria-modal="true"
      aria-label="Photo viewer"
    >
      <div className="flex items-center justify-between px-4 py-3">
        <span className="text-sm-leading font-medium text-foreground-inverse">Photo viewer</span>
        {onClose ? (
          <IconButton intent="ghost" size="sm" aria-label="Close photo viewer" onClick={onClose}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
              <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </IconButton>
        ) : null}
      </div>

      <div className="relative mx-auto flex w-full max-w-3xl flex-1 items-center justify-center px-4 pb-6">
        <div className="relative w-full overflow-hidden rounded-card">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={src} alt={alt} className="max-h-[70dvh] w-full object-contain" />
          {annotations.map((annotation) => (
            <ContractorPhotoAnnotationMarker
              key={annotation.id}
              annotation={annotation}
              active={annotation.id === activeAnnotationId}
              onClick={() => onAnnotationClick?.(annotation)}
            />
          ))}
        </div>
      </div>

      {(infoTitle || infoDescription) && (
        <ContractorPhotoInfoOverlay title={infoTitle} description={infoDescription} />
      )}
    </div>
  );
}
