"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils/cn";
import { ContractorTopNav } from "@/components/product/contractor/ContractorTopNav";
import { ContractorAiObservationChip } from "@/components/product/contractor/ContractorAiObservationChip";
import { ContractorPhotoAnnotationMarker } from "@/components/product/contractor/ContractorPhotoAnnotationMarker";
import { ContractorPhotoFilmstrip } from "@/components/product/contractor/ContractorPhotoFilmstrip";
import { ContractorPhotoInfoOverlay } from "@/components/product/contractor/ContractorPhotoInfoOverlay";
import { ContractorPhotoMetadataRow } from "@/components/product/contractor/ContractorPhotoMetadataRow";
import { usePhotoViewerBottomSheet } from "@/components/product/contractor/usePhotoViewerBottomSheet";
import type { MockLead } from "@/lib/contractor/mock-data";
import { CONTRACTOR_ROUTES } from "@/lib/contractor/routes";

const SWIPE_THRESHOLD_PX = 48;
const TOP_NAV_HEIGHT_PX = 80;
const WIDE_ASPECT_THRESHOLD = 1.05;

export type ContractorPhotoViewerViewProps = {
  lead: MockLead;
  initialPhotoIndex: number;
};

/** Figma 04.01 — Photo Viewer with draggable bottom sheet and full-bleed image. */
export function ContractorPhotoViewerView({ lead, initialPhotoIndex }: ContractorPhotoViewerViewProps) {
  const photos = lead.photos;
  const total = photos.length;
  const [activeIndex, setActiveIndex] = useState(initialPhotoIndex);
  const [photoAspect, setPhotoAspect] = useState<number | null>(null);
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  const sheetStorageKey = `contractor-photo-viewer-sheet-${lead.id}`;
  const sheet = usePhotoViewerBottomSheet(sheetStorageKey);

  const activePhoto = photos[activeIndex];
  const reportedIssue =
    activePhoto.reportedIssue ??
    lead.photoViewer?.reportedIssue ?? {
      eyebrow: "REPORTED ISSUE",
      title: lead.issue,
      subtitle: `Submitted by ${lead.name}`,
      severityLabel: lead.statusLabel,
    };
  const aiObservations =
    activePhoto.aiObservations ?? lead.photoViewer?.aiObservations ?? [];

  const goToIndex = useCallback(
    (index: number) => {
      if (index < 0 || index >= total) return;
      setActiveIndex(index);
      setPhotoAspect(null);
      const nextPhoto = photos[index];
      const nextPath = CONTRACTOR_ROUTES.photoViewer(lead.id, nextPhoto.id);
      window.history.replaceState(window.history.state, "", nextPath);
    },
    [lead.id, photos, total],
  );

  const goPrev = useCallback(() => goToIndex(activeIndex - 1), [activeIndex, goToIndex]);
  const goNext = useCallback(() => goToIndex(activeIndex + 1), [activeIndex, goToIndex]);

  useEffect(() => {
    setActiveIndex(initialPhotoIndex);
    setPhotoAspect(null);
  }, [initialPhotoIndex]);

  useEffect(() => {
    const onPopState = () => {
      const match = window.location.pathname.match(/\/photos\/([^/]+)$/);
      if (!match) return;
      const index = photos.findIndex((photo) => photo.id === match[1]);
      if (index >= 0) {
        setActiveIndex(index);
        setPhotoAspect(null);
      }
    };
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, [photos]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") goPrev();
      if (event.key === "ArrowRight") goNext();
      if (event.key === "Escape" && sheet.isCollapsed) sheet.expand();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [goNext, goPrev, sheet.expand, sheet.isCollapsed]);

  const onPhotoTouchStart = (event: React.TouchEvent) => {
    touchStartX.current = event.changedTouches[0]?.clientX ?? null;
    touchStartY.current = event.changedTouches[0]?.clientY ?? null;
  };

  const onPhotoTouchEnd = (event: React.TouchEvent) => {
    const startX = touchStartX.current;
    const startY = touchStartY.current;
    const endX = event.changedTouches[0]?.clientX;
    const endY = event.changedTouches[0]?.clientY;
    touchStartX.current = null;
    touchStartY.current = null;
    if (startX == null || endX == null || startY == null || endY == null) return;

    const deltaX = endX - startX;
    const deltaY = endY - startY;

    if (Math.abs(deltaY) > Math.abs(deltaX)) {
      if (deltaY < -SWIPE_THRESHOLD_PX && sheet.isCollapsed) sheet.expand();
      return;
    }

    if (deltaX > SWIPE_THRESHOLD_PX) goPrev();
    else if (deltaX < -SWIPE_THRESHOLD_PX) goNext();
  };

  const metadata = {
    location: activePhoto.captureLocation ?? lead.location,
    date: activePhoto.captureDate ?? lead.submittedLabel,
    inspector: activePhoto.inspector ?? "—",
  };

  const isWidePhoto = (photoAspect ?? 1) >= WIDE_ASPECT_THRESHOLD;
  const visibleSheetHeight = Math.max(0, sheet.maxOffset + sheet.peekHeight - sheet.offset);
  const isFullscreen = sheet.isCollapsed;

  /** Panel open: cover fills frame; wide shots use contain. Collapsed: always contain (gallery mode). */
  const imageFit = isFullscreen || isWidePhoto ? "contain" : "cover";

  const overlayOpacity = isFullscreen ? 0 : 1 - sheet.collapseProgress * 0.85;
  const annotationOpacity = isFullscreen ? 0 : 1 - sheet.collapseProgress * 0.5;
  const gradientOpacity = isFullscreen ? 0 : 1 - sheet.collapseProgress * 0.5;

  return (
    <div
      className={cn(
        "contractor-mobile-width relative mx-auto h-dvh w-full overflow-hidden transition-colors duration-300",
        isFullscreen ? "bg-black" : "bg-[#0b1f33]",
      )}
    >
      <ContractorTopNav
        variant="photos"
        title={isFullscreen ? activePhoto.label : `Photo ${activeIndex + 1} of ${total}`}
        backHref={CONTRACTOR_ROUTES.leadDetail(lead.id)}
        className={cn(isFullscreen && "border-transparent bg-black/80 shadow-none")}
      />

      {/* Single photo — viewport height tracks bottom sheet */}
      <div
        className="absolute inset-x-0 z-0 overflow-hidden transition-[bottom] duration-300 ease-out"
        style={{
          top: TOP_NAV_HEIGHT_PX,
          bottom: isFullscreen ? 0 : visibleSheetHeight,
        }}
        onTouchStart={onPhotoTouchStart}
        onTouchEnd={onPhotoTouchEnd}
        aria-roledescription="carousel"
        aria-label={`Inspection photo ${activeIndex + 1} of ${total}`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          key={activePhoto.id}
          src={activePhoto.src}
          alt={activePhoto.alt}
          className={cn(
            "size-full transition-[object-fit] duration-300 ease-out",
            imageFit === "contain" ? "object-contain" : "object-cover",
          )}
          onLoad={(event) => {
            const { naturalWidth, naturalHeight } = event.currentTarget;
            if (naturalWidth && naturalHeight) setPhotoAspect(naturalWidth / naturalHeight);
          }}
        />

        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[rgba(42,50,60,0.35)] to-[rgba(75,85,99,0.15)] transition-opacity duration-300"
          style={{ opacity: gradientOpacity }}
          aria-hidden
        />

        {activeIndex > 0 ? (
          <button
            type="button"
            className={cn(
              "absolute inset-y-0 left-0 z-10 focus-visible:focus-ring",
              isFullscreen ? "w-14" : "w-1/4",
            )}
            aria-label="Previous photo"
            onClick={goPrev}
          />
        ) : null}
        {activeIndex < total - 1 ? (
          <button
            type="button"
            className={cn(
              "absolute inset-y-0 right-0 z-10 focus-visible:focus-ring",
              isFullscreen ? "w-14" : "w-1/4",
            )}
            aria-label="Next photo"
            onClick={goNext}
          />
        ) : null}

        {isFullscreen && activeIndex > 0 ? (
          <button
            type="button"
            onClick={goPrev}
            className="absolute top-1/2 left-3 z-20 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-[rgba(38,38,38,0.85)] text-white focus-visible:focus-ring"
            aria-label="Previous photo"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
              <path
                d="M12.5 15L7.5 10L12.5 5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        ) : null}
        {isFullscreen && activeIndex < total - 1 ? (
          <button
            type="button"
            onClick={goNext}
            className="absolute top-1/2 right-3 z-20 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-[rgba(38,38,38,0.85)] text-white focus-visible:focus-ring"
            aria-label="Next photo"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
              <path
                d="M7.5 15L12.5 10L7.5 5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        ) : null}

        {!isFullscreen && activePhoto.primaryAnnotation ? (
          <div className="transition-opacity duration-300" style={{ opacity: annotationOpacity }}>
            <ContractorPhotoAnnotationMarker
              annotation={activePhoto.primaryAnnotation}
              labelPosition="left"
            />
          </div>
        ) : null}

        {!isFullscreen ? (
          <div
            className="absolute left-4 z-[1] transition-[opacity,bottom] duration-300 ease-out"
            style={{
              opacity: overlayOpacity,
              bottom: "1rem",
              pointerEvents: overlayOpacity < 0.2 ? "none" : "auto",
            }}
          >
            <ContractorPhotoInfoOverlay {...reportedIssue} />
          </div>
        ) : null}
      </div>

      {/* Fullscreen hint */}
      <p
        className={cn(
          "pointer-events-none absolute inset-x-0 z-[15] px-6 text-center text-[11px] leading-tight text-[#9ca3af] transition-opacity duration-300",
          isFullscreen ? "opacity-100" : "opacity-0",
        )}
        style={{ bottom: "max(1.25rem, env(safe-area-inset-bottom))" }}
      >
        Swipe left or right for other photos
      </p>

      {/* Draggable bottom panel — 32px top radius */}
      <section
        ref={sheet.sheetRef}
        className={cn(
          "absolute inset-x-0 bottom-0 z-20 flex max-h-[min(82dvh,640px)] flex-col",
          "rounded-t-[32px] bg-white shadow-[0_-8px_32px_rgba(17,24,39,0.14)]",
          "will-change-transform",
          isFullscreen && "pointer-events-none",
        )}
        style={{
          transform: `translateY(${sheet.offset}px)`,
          transition: sheet.sheetTransition,
        }}
        aria-label="Inspection details"
        aria-expanded={!sheet.isCollapsed}
        aria-hidden={isFullscreen}
      >
        <div
          className="flex shrink-0 touch-none flex-col items-center px-6 pt-3 pb-2 select-none"
          role="slider"
          aria-label="Drag to expand or collapse inspection panel"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round((1 - sheet.collapseProgress) * 100)}
          onPointerDown={sheet.handlePointerDown}
          onPointerMove={sheet.handlePointerMove}
          onPointerUp={sheet.handlePointerUp}
          onPointerCancel={sheet.handlePointerUp}
          onDoubleClick={sheet.toggle}
        >
          <div className="h-1 w-10 rounded-sm bg-[#d1d5db]" aria-hidden />
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-6 pb-[max(1.5rem,env(safe-area-inset-bottom))]">
          <div className="mb-4 flex flex-col gap-2">
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-base font-semibold leading-normal text-[#0b1f33]">Inspection Photos</h2>
              <p className="shrink-0 text-xs leading-tight tracking-[0.03px] text-[#9ca3af]">
                {lead.name} · {total} photos
              </p>
            </div>
            <div>
              <p className="text-sm font-semibold leading-tight text-[#0b1f33]">{activePhoto.label}</p>
              <p className="mt-1 text-xs leading-[1.4] tracking-[0.03px] text-[#6b7280]">
                {activePhoto.description}
              </p>
            </div>
          </div>

          <ContractorPhotoFilmstrip
            photos={photos.map((photo) => ({ id: photo.id, src: photo.src, alt: photo.alt }))}
            activeIndex={activeIndex}
            onSelect={goToIndex}
            className="mb-4"
          />

          <ContractorPhotoMetadataRow
            location={metadata.location}
            date={metadata.date}
            inspector={metadata.inspector}
            className="mb-4"
          />

          {aiObservations.length > 0 ? (
            <div className="mb-4 flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <p className="text-[10px] font-semibold leading-[1.4] tracking-[0.05px] text-[#9ca3af]">
                  AI OBSERVATIONS
                </p>
                <span className="inline-flex items-center justify-center rounded-pill bg-[#ede9fe] px-1.5 py-0.5 text-[10px] font-semibold leading-[1.4] tracking-[0.05px] text-[#7c3aed]">
                  {aiObservations.length}
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {aiObservations.map((observation) => (
                  <ContractorAiObservationChip
                    key={observation.id}
                    label={observation.label}
                    state={observation.state}
                  />
                ))}
              </div>
            </div>
          ) : null}

          <button
            type="button"
            className="flex w-full items-center justify-center gap-2 rounded-pill bg-[#b22e2e] px-6 py-4 text-base font-semibold leading-normal tracking-[0.16px] text-white focus-visible:focus-ring"
          >
            <Image src="/icons/action/add.svg" alt="" width={24} height={24} aria-hidden />
            Add Annotation Marker
          </button>
        </div>
      </section>

      {/* Restore panel — full-image mode */}
      <div
        className={cn(
          "pointer-events-none absolute inset-x-0 bottom-0 z-30 flex justify-center px-6 transition-[opacity,transform] duration-300 ease-out",
          isFullscreen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
        )}
        style={{ paddingBottom: "max(3.5rem, calc(1rem + env(safe-area-inset-bottom)))" }}
      >
        <button
          type="button"
          onClick={sheet.expand}
          className={cn(
            "pointer-events-auto flex items-center gap-2 rounded-pill border border-[#e5e7eb] bg-white/95 px-5 py-3 text-sm font-semibold text-[#0b1f33] shadow-[0_4px_16px_rgba(17,24,39,0.12)] backdrop-blur-sm focus-visible:focus-ring",
            !isFullscreen && "pointer-events-none",
          )}
          aria-hidden={!isFullscreen}
          tabIndex={isFullscreen ? 0 : -1}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
            <path
              d="M8 12V4M8 4L4.5 7.5M8 4l3.5 3.5"
              stroke="#0b1f33"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Show inspection details
        </button>
      </div>

      {/* Collapsed peek — tap or swipe up */}
      <button
        type="button"
        onClick={sheet.expand}
        className={cn(
          "absolute inset-x-0 bottom-0 z-[25] flex items-start justify-center pt-2 transition-opacity duration-200 focus-visible:focus-ring",
          isFullscreen ? "opacity-100" : "pointer-events-none opacity-0",
        )}
        style={{ height: sheet.peekHeight + 12 }}
        aria-label="Show inspection details"
        tabIndex={isFullscreen ? 0 : -1}
      >
        <span className="h-1 w-10 rounded-sm bg-white/40" aria-hidden />
      </button>
    </div>
  );
}
