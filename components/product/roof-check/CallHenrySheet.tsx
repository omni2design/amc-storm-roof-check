"use client";

import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils/cn";
import { buttonVariants } from "@/lib/variants/button";
import { HENRY_DEMO_PHONE_NUMBER } from "@/lib/contact/henry-demo-phone";

export type CallHenrySheetProps = {
  open: boolean;
  onClose: () => void;
};

/** Figma-aligned bottom sheet — matches `PhotoPickerSheet` overlay, motion, and mobile tap targets */
export function CallHenrySheet({ open, onClose }: CallHenrySheetProps) {
  const titleId = useId();
  const descriptionId = useId();
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
        className="absolute inset-0 bg-[color-mix(in_srgb,var(--primitive-color-navy-950)_50%,transparent)] motion-safe animate-[amc-backdrop-in_var(--primitive-duration-normal)_var(--primitive-ease-standard)_both]"
        aria-label="Dismiss call confirmation"
        onClick={onClose}
      />

      <div
        ref={sheetRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
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

          <div className="flex flex-col gap-3 px-6 pb-6 pt-3 text-center">
            <h2 id={titleId} className="text-body-strong text-foreground-primary">
              Ready to call Henry?
            </h2>
            <p id={descriptionId} className="text-sm-leading text-foreground-secondary">
              Your Roof Check has been submitted. Henry usually follows up within 1 business day. Call now if
              this feels urgent or you need faster help.
            </p>

            <div className="mt-2 flex w-full flex-col gap-3">
              <a
                href={`tel:${HENRY_DEMO_PHONE_NUMBER}`}
                className={cn(buttonVariants({ intent: "emergency", size: "lg" }), "w-full")}
              >
                Call Henry
              </a>
              <button
                type="button"
                className={cn(
                  buttonVariants({ intent: "ghost", size: "lg" }),
                  "w-full font-normal text-body text-foreground-secondary hover:bg-transparent hover:text-foreground-primary",
                )}
                onClick={onClose}
              >
                Not now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}
