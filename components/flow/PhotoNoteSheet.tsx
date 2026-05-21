"use client";

import { useEffect, useId, useRef, useState } from "react";
import Image from "next/image";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils/cn";
import { Button } from "@/components/foundation/Button";
import { TextareaInput } from "@/components/foundation/TextareaInput";
import { iconButtonVariants } from "@/lib/variants/icon-button";
import { buttonVariants } from "@/lib/variants/button";

export type PhotoNoteSheetMode = "add" | "edit";

export type PhotoNoteSheetProps = {
  open: boolean;
  mode: PhotoNoteSheetMode;
  preview: { dataUrl: string; name: string };
  initialNote?: string;
  queuePosition?: { current: number; total: number };
  onConfirm: (note?: string) => void;
  onSkip?: () => void;
  onCancel: () => void;
};

/** Post-capture bottom sheet — preview, optional note, confirm or skip (matches PhotoPickerSheet motion) */
export function PhotoNoteSheet({
  open,
  mode,
  preview,
  initialNote = "",
  queuePosition,
  onConfirm,
  onSkip,
  onCancel,
}: PhotoNoteSheetProps) {
  const titleId = useId();
  const descriptionId = useId();
  const sheetRef = useRef<HTMLDivElement>(null);
  const [note, setNote] = useState(initialNote);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return;
    setNote(initialNote);
  }, [open, initialNote, preview.dataUrl]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCancel();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, onCancel]);

  if (!open || !mounted || !preview.dataUrl) return null;

  const isAdd = mode === "add";
  const title = isAdd ? "Add photo note" : "Edit photo note";
  const subtitle = isAdd
    ? "Optional — describe what this photo shows."
    : "Update what this photo shows, or remove the note.";
  const primaryLabel = isAdd ? "Add Photo" : "Save note";
  const showQueue = queuePosition && queuePosition.total > 1;

  const handleConfirm = () => {
    const trimmed = note.trim();
    onConfirm(trimmed || undefined);
  };

  return createPortal(
    <div className="flow-modal-overlay fixed inset-0 flex flex-col justify-end motion-safe" role="presentation">
      <button
        type="button"
        className="absolute inset-0 bg-[color-mix(in_srgb,var(--primitive-color-navy-950)_50%,transparent)] motion-safe animate-[amc-backdrop-in_var(--primitive-duration-normal)_var(--primitive-ease-standard)_both]"
        aria-label="Cancel and discard photo"
        onClick={onCancel}
      />

      <div
        ref={sheetRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
        data-photo-note-sheet
        className={cn(
          "relative z-10 flow-mobile-width max-h-[92dvh]",
          "motion-safe animate-[amc-sheet-up_var(--primitive-duration-slow)_var(--primitive-ease-decelerate)_both]",
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex max-h-[92dvh] flex-col overflow-hidden rounded-t-2xl bg-surface-card shadow-semantic-modal pb-[max(0px,env(safe-area-inset-bottom,0px))]">
          <div className="flex shrink-0 flex-col items-center pt-3" aria-hidden>
            <span className="h-1 w-9 rounded-pill bg-border-default" />
          </div>

          <div className="flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto px-5 pb-5 pt-2">
            <div className="flex items-start gap-3">
              <div className="min-w-0 flex-1">
                <h2 id={titleId} className="text-body-strong text-foreground-primary">
                  {title}
                </h2>
                <p id={descriptionId} className="mt-1 text-sm-leading text-foreground-secondary">
                  {subtitle}
                </p>
                {showQueue ? (
                  <p className="mt-1 text-2xs-leading text-foreground-muted">
                    Photo {queuePosition.current} of {queuePosition.total}
                  </p>
                ) : null}
              </div>
              <button
                type="button"
                aria-label="Close without saving"
                className={cn(iconButtonVariants({ intent: "ghost", size: "sm" }), "shrink-0 text-xl leading-none")}
                onClick={onCancel}
              >
                ×
              </button>
            </div>

            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-border-default bg-surface-muted">
              <Image
                src={preview.dataUrl}
                alt={preview.name}
                fill
                unoptimized
                className="object-contain"
                sizes="(max-width: 430px) 100vw"
              />
            </div>

            <TextareaInput
              label="Photo details"
              name="photo-note"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Example: leak near gutter, missing shingles, ceiling stain…"
              helper="You can skip this and add details later."
              maxLength={500}
            />

            <div className="flex w-full flex-col gap-3">
              <Button type="button" intent="primary" size="lg" className="w-full" onClick={handleConfirm}>
                {primaryLabel}
              </Button>
              {isAdd ? (
                <button
                  type="button"
                  className={cn(
                    buttonVariants({ intent: "ghost", size: "lg" }),
                    "w-full font-normal text-body text-foreground-secondary hover:bg-transparent hover:text-foreground-primary",
                  )}
                  onClick={onSkip}
                >
                  Skip Note
                </button>
              ) : (
                <button
                  type="button"
                  className={cn(
                    buttonVariants({ intent: "ghost", size: "lg" }),
                    "w-full font-normal text-body text-foreground-secondary hover:bg-transparent hover:text-foreground-primary",
                  )}
                  onClick={() => onConfirm(undefined)}
                >
                  Remove note
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}
