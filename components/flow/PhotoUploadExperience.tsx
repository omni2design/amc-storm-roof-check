"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils/cn";
import { Icon } from "@/components/icons/Icon";
import { IconChip } from "@/components/foundation/IconChip";
import { uploadCardVariants } from "@/lib/variants/upload-card";
import { PhotoPickerSheet } from "@/components/flow/PhotoPickerSheet";
import { PhotoNoteSheet } from "@/components/flow/PhotoNoteSheet";
import { compressImageFile } from "@/lib/utils/compress-image";
import {
  MAX_ROOF_CHECK_PHOTOS,
  useRoofCheckStore,
  type RoofCheckPhoto,
} from "@/lib/flow/useRoofCheckStore";

type PendingPhoto = {
  dataUrl: string;
  name: string;
};

function PhotoNoteBadge() {
  return (
    <span
      className="absolute bottom-1 left-1 flex size-6 items-center justify-center rounded-pill bg-background-inverse/85 text-foreground-inverse"
      aria-hidden
    >
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M2 2.5h8M2 5h5.5M2 7.5h6.5M2 10h4"
          stroke="currentColor"
          strokeWidth="1.25"
          strokeLinecap="round"
        />
      </svg>
    </span>
  );
}

export function PhotoUploadExperience() {
  const { data, addPhoto, removePhoto, updatePhotoNote } = useRoofCheckStore();
  const [sheetOpen, setSheetOpen] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [pendingQueue, setPendingQueue] = useState<PendingPhoto[]>([]);
  const [queueIndex, setQueueIndex] = useState(0);
  const [noteSheetOpen, setNoteSheetOpen] = useState(false);
  const [editingPhoto, setEditingPhoto] = useState<RoofCheckPhoto | null>(null);
  const cameraRef = useRef<HTMLInputElement>(null);
  const galleryRef = useRef<HTMLInputElement>(null);
  const pendingQueueRef = useRef(pendingQueue);
  const queueIndexRef = useRef(queueIndex);
  const isMountedRef = useRef(false);

  pendingQueueRef.current = pendingQueue;
  queueIndexRef.current = queueIndex;

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  const currentPending = pendingQueue[queueIndex] ?? null;
  const noteSheetPreview = editingPhoto ?? currentPending;
  const noteSheetActive = noteSheetOpen && Boolean(noteSheetPreview);

  const openNoteSheetForQueue = useCallback((queue: PendingPhoto[]) => {
    if (queue.length === 0) return;
    setPendingQueue(queue);
    setQueueIndex(0);
    setEditingPhoto(null);
    setNoteSheetOpen(true);
  }, []);

  const closeNoteSheet = useCallback(() => {
    setNoteSheetOpen(false);
    setPendingQueue([]);
    setQueueIndex(0);
    setEditingPhoto(null);
  }, []);

  const processFiles = async (files: FileList | null) => {
    if (!files?.length) return;
    const remaining = MAX_ROOF_CHECK_PHOTOS - data.photos.length;
    if (remaining <= 0) return;

    setIsAdding(true);
    try {
      const pending: PendingPhoto[] = [];
      for (const file of Array.from(files).slice(0, remaining)) {
        try {
          const dataUrl = await compressImageFile(file);
          pending.push({ dataUrl, name: file.name });
        } catch {
          // skip invalid files
        }
      }
      if (pending.length > 0 && isMountedRef.current) {
        openNoteSheetForQueue(pending);
      }
    } finally {
      if (isMountedRef.current) {
        setIsAdding(false);
      }
    }
  };

  const commitPendingPhoto = useCallback(
    (note?: string) => {
      const queue = pendingQueueRef.current;
      const index = queueIndexRef.current;
      const item = queue[index];
      if (!item) {
        closeNoteSheet();
        return;
      }

      addPhoto({ ...item, note });

      const nextIndex = index + 1;
      if (nextIndex < queue.length) {
        setQueueIndex(nextIndex);
        return;
      }
      closeNoteSheet();
    },
    [addPhoto, closeNoteSheet],
  );

  const cancelCurrentPending = useCallback(() => {
    const queue = pendingQueueRef.current;
    const index = queueIndexRef.current;
    const nextIndex = index + 1;
    if (nextIndex < queue.length) {
      setQueueIndex(nextIndex);
      return;
    }
    closeNoteSheet();
  }, [closeNoteSheet]);

  const openEditNote = (photo: RoofCheckPhoto) => {
    setEditingPhoto(photo);
    setPendingQueue([]);
    setQueueIndex(0);
    setNoteSheetOpen(true);
  };

  const handleNoteConfirm = (note?: string) => {
    if (editingPhoto) {
      updatePhotoNote(editingPhoto.id, note);
      closeNoteSheet();
      return;
    }
    commitPendingPhoto(note);
  };

  const handleNoteSkip = () => {
    commitPendingPhoto(undefined);
  };

  const uploadCardState = data.photos.length > 0 ? "uploaded" : isAdding ? "loading" : "empty";

  return (
    <>
      <div className="grid min-h-0 flex-1 grid-rows-[minmax(0,1fr)_auto] gap-6 pb-6">
        <div
          className={cn(
            uploadCardVariants({ state: uploadCardState }),
            "flex h-full min-h-[9.5rem] w-full flex-col gap-4",
          )}
        >
          <button
            type="button"
            disabled={isAdding}
            onClick={() => setSheetOpen(true)}
            className="flex flex-1 flex-col items-center justify-center gap-2 rounded-lg focus-visible:focus-ring"
          >
            <Icon
              name={isAdding ? "system/loading" : "action/download"}
              mode="brand"
              size="xl"
              className={cn(
                "size-[4.5rem] shrink-0 text-icon-brand",
                isAdding && "motion-safe animate-[amc-spin_0.8s_linear_infinite] opacity-loading",
              )}
            />
            <span className="flex flex-col items-center gap-1">
              <span className="text-base font-semibold leading-normal text-foreground-primary">Tap to add photos</span>
              <span className="max-w-[14.25rem] text-sm-leading text-foreground-secondary">
                Do not climb on the roof — photos from ground or inside are fine
              </span>
            </span>
          </button>

          {data.photos.length > 0 ? (
            <ul className="grid w-full shrink-0 grid-cols-3 gap-2">
              {data.photos.map((photo) => (
                <li key={photo.id} className="flex flex-col gap-1">
                  <div className="group relative aspect-square overflow-hidden rounded-xl border border-border-default bg-surface-muted">
                    <button
                      type="button"
                      className="absolute inset-0 focus-visible:focus-ring"
                      aria-label={
                        photo.note
                          ? `Edit note for ${photo.name}: ${photo.note}`
                          : `Add note for ${photo.name}`
                      }
                      onClick={() => openEditNote(photo)}
                    >
                      <Image
                        src={photo.dataUrl}
                        alt={photo.name}
                        fill
                        unoptimized
                        className="object-cover"
                        sizes="120px"
                      />
                      {photo.note ? <PhotoNoteBadge /> : null}
                    </button>
                    <button
                      type="button"
                      aria-label={`Remove ${photo.name}`}
                      className="absolute right-1 top-1 z-10 flex size-7 items-center justify-center rounded-pill bg-background-inverse/80 text-foreground-inverse opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100 focus-visible:opacity-100"
                      onClick={() => removePhoto(photo.id)}
                    >
                      ×
                    </button>
                  </div>
                  {photo.note ? (
                    <p className="line-clamp-2 px-0.5 text-2xs-leading text-foreground-secondary">{photo.note}</p>
                  ) : null}
                </li>
              ))}
            </ul>
          ) : null}
        </div>

        <div className="grid shrink-0 grid-cols-2 gap-3">
          <button
            type="button"
            disabled={isAdding || noteSheetActive}
            onClick={() => cameraRef.current?.click()}
            className="flex flex-1 items-center justify-center gap-2 rounded-[2rem] border-[1.5px] border-border-focus bg-button-navy px-5 py-3"
          >
            <IconChip name="action/take-photo" mode="inverse" tone="selected" size="sm" />
            <span className="text-base font-semibold leading-normal text-foreground-inverse">Take Photo</span>
          </button>
          <button
            type="button"
            disabled={isAdding || noteSheetActive}
            onClick={() => galleryRef.current?.click()}
            className="flex flex-1 items-center justify-center gap-2 rounded-[2rem] border-[1.5px] border-border-default bg-surface-card px-5 py-3"
          >
            <IconChip name="action/gallery" mode="brand" tone="muted" size="sm" />
            <span className="text-base font-semibold leading-normal text-foreground-primary">Gallery</span>
          </button>
        </div>
      </div>

      <input
        ref={cameraRef}
        type="file"
        accept="image/*"
        capture="environment"
        className="sr-only"
        onChange={(e) => {
          void processFiles(e.target.files);
          e.target.value = "";
        }}
      />
      <input
        ref={galleryRef}
        type="file"
        accept="image/*"
        multiple
        className="sr-only"
        onChange={(e) => {
          void processFiles(e.target.files);
          e.target.value = "";
        }}
      />
      <PhotoPickerSheet
        open={sheetOpen}
        onClose={() => setSheetOpen(false)}
        onCamera={() => cameraRef.current?.click()}
        onGallery={() => galleryRef.current?.click()}
      />

      {noteSheetPreview ? (
        <PhotoNoteSheet
          key={editingPhoto ? `edit-${editingPhoto.id}` : "add"}
          open={noteSheetActive}
          mode={editingPhoto ? "edit" : "add"}
          preview={{ dataUrl: noteSheetPreview.dataUrl, name: noteSheetPreview.name }}
          initialNote={editingPhoto?.note ?? ""}
          queuePosition={
            !editingPhoto && pendingQueue.length > 1
              ? { current: queueIndex + 1, total: pendingQueue.length }
              : undefined
          }
          onConfirm={handleNoteConfirm}
          onSkip={editingPhoto ? undefined : handleNoteSkip}
          onCancel={editingPhoto ? closeNoteSheet : cancelCurrentPending}
        />
      ) : null}
    </>
  );
}
