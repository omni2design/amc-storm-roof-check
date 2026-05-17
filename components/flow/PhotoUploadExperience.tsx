"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils/cn";
import { Icon } from "@/components/icons/Icon";
import { IconChip } from "@/components/foundation/IconChip";
import { uploadCardVariants } from "@/lib/variants/upload-card";
import { PhotoPickerSheet } from "@/components/flow/PhotoPickerSheet";
import { useRoofCheckStore } from "@/lib/flow/useRoofCheckStore";

export function PhotoUploadExperience() {
  const { data, addPhotos, removePhoto } = useRoofCheckStore();
  const [sheetOpen, setSheetOpen] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const cameraRef = useRef<HTMLInputElement>(null);
  const galleryRef = useRef<HTMLInputElement>(null);

  const handleFiles = async (files: FileList | null) => {
    if (!files?.length) return;
    setIsAdding(true);
    try {
      await addPhotos(files);
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <>
      <div className="grid min-h-0 flex-1 grid-rows-[minmax(0,1fr)_auto] gap-6 pb-6">
        <button
          type="button"
          disabled={isAdding}
          onClick={() => setSheetOpen(true)}
          className={cn(
            uploadCardVariants({ state: data.photos.length > 0 ? "uploaded" : isAdding ? "loading" : "empty" }),
            "flex h-full min-h-[9.5rem] w-full flex-col gap-4",
          )}
        >
          <span className="flex flex-1 flex-col items-center justify-center gap-2">
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
          </span>

          {data.photos.length > 0 ? (
            <ul className="grid w-full shrink-0 grid-cols-3 gap-2">
              {data.photos.map((photo) => (
                <li
                  key={photo.id}
                  className="group relative aspect-square overflow-hidden rounded-xl border border-border-default bg-surface-muted"
                >
                  <Image src={photo.dataUrl} alt={photo.name} fill unoptimized className="object-cover" sizes="120px" />
                  <button
                    type="button"
                    aria-label={`Remove ${photo.name}`}
                    className="absolute right-1 top-1 flex size-7 items-center justify-center rounded-pill bg-background-inverse/80 text-foreground-inverse opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100 focus-visible:opacity-100"
                    onClick={() => removePhoto(photo.id)}
                  >
                    ×
                  </button>
                </li>
              ))}
            </ul>
          ) : null}
        </button>

        <div className="grid shrink-0 grid-cols-2 gap-3">
          <button
            type="button"
            disabled={isAdding}
            onClick={() => cameraRef.current?.click()}
            className="flex flex-1 items-center justify-center gap-2 rounded-[2rem] border-[1.5px] border-border-focus bg-button-navy px-5 py-3"
          >
            <IconChip name="action/take-photo" mode="inverse" tone="selected" size="sm" />
            <span className="text-base font-semibold leading-normal text-foreground-inverse">Take Photo</span>
          </button>
          <button
            type="button"
            disabled={isAdding}
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
          void handleFiles(e.target.files);
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
          void handleFiles(e.target.files);
          e.target.value = "";
        }}
      />
      <PhotoPickerSheet
        open={sheetOpen}
        onClose={() => setSheetOpen(false)}
        onCamera={() => cameraRef.current?.click()}
        onGallery={() => galleryRef.current?.click()}
      />
    </>
  );
}
