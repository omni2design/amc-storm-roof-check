"use client";

import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils/cn";
import { IconChip } from "@/components/foundation/IconChip";

export type PhotoPickerSheetProps = {
  open: boolean;
  onClose: () => void;
  onCamera: () => void;
  onGallery: () => void;
};

/** Figma `Photo Upload – Action Sheet (Overlay)` — bottom sheet, 50% navy scrim, 24px top radius */
export function PhotoPickerSheet({ open, onClose, onCamera, onGallery }: PhotoPickerSheetProps) {
  const titleId = useId();
  const sheetRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, onClose]);

  if (!open || !mounted) return null;

  return createPortal(
    <div className="flow-modal-overlay fixed inset-0 flex flex-col justify-end motion-safe" role="presentation">
      <button
        type="button"
        data-photo-picker-backdrop
        className="absolute inset-0 bg-[color-mix(in_srgb,var(--primitive-color-navy-950)_50%,transparent)] motion-safe animate-[amc-backdrop-in_var(--primitive-duration-normal)_var(--primitive-ease-standard)_both]"
        aria-label="Dismiss add photos"
        onClick={onClose}
      />

      <div
        ref={sheetRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        data-photo-picker-sheet
        className={cn(
          "relative z-10 flow-mobile-width",
          "motion-safe animate-[amc-sheet-up_var(--primitive-duration-slow)_var(--primitive-ease-decelerate)_both]",
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="overflow-hidden rounded-t-2xl bg-surface-card shadow-semantic-modal pb-[max(0px,env(safe-area-inset-bottom,0px))]">
          <div className="flex flex-col items-center pt-3" aria-hidden>
            <span className="h-1 w-9 rounded-pill bg-border-default" />
          </div>

          <p id={titleId} className="px-6 pb-4 pt-3 text-center text-body-strong text-foreground-primary">
            Add Photos
          </p>

          <div className="border-t border-border-default">
            <button
              type="button"
              className="flex w-full min-h-[4.375rem] items-center gap-4 px-5 py-3 text-left transition-colors active:bg-surface-muted focus-visible:focus-ring"
              onClick={() => {
                onCamera();
                onClose();
              }}
            >
              <IconChip
                name="action/take-photo"
                mode="brand"
                tone="default"
                className="size-11 rounded-xl p-1"
              />
              <span className="flex min-w-0 flex-col gap-0.5">
                <span className="text-body-strong text-foreground-primary">Take Photo</span>
                <span className="text-[0.8125rem] leading-normal text-foreground-secondary">Use your camera</span>
              </span>
            </button>

            <div className="border-t border-border-default" role="separator" />

            <button
              type="button"
              className="flex w-full min-h-[4.375rem] items-center gap-4 px-5 py-3 text-left transition-colors active:bg-surface-muted focus-visible:focus-ring"
              onClick={() => {
                onGallery();
                onClose();
              }}
            >
              <IconChip name="action/gallery" mode="brand" tone="default" className="size-11 rounded-xl p-1" />
              <span className="flex min-w-0 flex-col gap-0.5">
                <span className="text-body-strong text-foreground-primary">Choose from Library</span>
                <span className="text-[0.8125rem] leading-normal text-foreground-secondary">
                  Browse your photo library
                </span>
              </span>
            </button>

            <div className="border-t border-border-default" role="separator" />

            <button
              type="button"
              className="flex w-full min-h-[4.375rem] items-center justify-center px-5 py-3 text-[1.0625rem] font-semibold leading-normal text-foreground-danger transition-colors active:bg-surface-muted focus-visible:focus-ring"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}
