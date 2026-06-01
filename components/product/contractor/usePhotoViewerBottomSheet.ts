"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const PEEK_HEIGHT_PX = 32;
const SNAP_THRESHOLD_RATIO = 0.35;
const SHEET_TRANSITION = "transform 0.38s cubic-bezier(0.32, 0.72, 0, 1)";

export type PhotoViewerSheetSnap = "open" | "collapsed";

function readStoredSnap(storageKey?: string): PhotoViewerSheetSnap {
  if (!storageKey || typeof window === "undefined") return "open";
  return sessionStorage.getItem(storageKey) === "collapsed" ? "collapsed" : "open";
}

export function usePhotoViewerBottomSheet(storageKey?: string) {
  const sheetRef = useRef<HTMLElement | null>(null);
  const [maxOffset, setMaxOffset] = useState(0);
  const [offset, setOffset] = useState(0);
  const [snap, setSnap] = useState<PhotoViewerSheetSnap>(() => readStoredSnap(storageKey));
  const [isDragging, setIsDragging] = useState(false);
  const dragStartY = useRef(0);
  const dragStartOffset = useRef(0);

  const measureSheet = useCallback(() => {
    const sheet = sheetRef.current;
    if (!sheet) return;
    const height = sheet.offsetHeight;
    setMaxOffset(Math.max(0, height - PEEK_HEIGHT_PX));
  }, []);

  useEffect(() => {
    measureSheet();
    const sheet = sheetRef.current;
    if (!sheet) return;

    const observer = new ResizeObserver(measureSheet);
    observer.observe(sheet);
    window.addEventListener("resize", measureSheet);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measureSheet);
    };
  }, [measureSheet]);

  useEffect(() => {
    if (snap === "collapsed") {
      if (maxOffset > 0) setOffset(maxOffset);
      return;
    }
    setOffset(0);
  }, [snap, maxOffset]);

  useEffect(() => {
    if (!storageKey || typeof window === "undefined") return;
    sessionStorage.setItem(storageKey, snap);
  }, [snap, storageKey]);

  const expand = useCallback(() => setSnap("open"), []);
  const collapse = useCallback(() => setSnap("collapsed"), []);

  const toggle = useCallback(() => {
    setSnap((current) => (current === "open" ? "collapsed" : "open"));
  }, []);

  const onDragStart = useCallback(
    (clientY: number) => {
      setIsDragging(true);
      dragStartY.current = clientY;
      dragStartOffset.current = offset;
    },
    [offset],
  );

  const onDragMove = useCallback(
    (clientY: number) => {
      if (!isDragging) return;
      const delta = clientY - dragStartY.current;
      const next = Math.min(maxOffset, Math.max(0, dragStartOffset.current + delta));
      setOffset(next);
    },
    [isDragging, maxOffset],
  );

  const onDragEnd = useCallback(() => {
    if (!isDragging) return;
    setIsDragging(false);
    const threshold = maxOffset * SNAP_THRESHOLD_RATIO;
    if (offset > threshold) {
      setSnap("collapsed");
    } else {
      setSnap("open");
    }
  }, [isDragging, maxOffset, offset]);

  const handlePointerDown = useCallback(
    (event: React.PointerEvent) => {
      event.preventDefault();
      (event.currentTarget as HTMLElement).setPointerCapture(event.pointerId);
      onDragStart(event.clientY);
    },
    [onDragStart],
  );

  const handlePointerMove = useCallback(
    (event: React.PointerEvent) => {
      if (!isDragging) return;
      onDragMove(event.clientY);
    },
    [isDragging, onDragMove],
  );

  const handlePointerUp = useCallback(
    (event: React.PointerEvent) => {
      (event.currentTarget as HTMLElement).releasePointerCapture(event.pointerId);
      onDragEnd();
    },
    [onDragEnd],
  );

  const collapseProgress = maxOffset > 0 ? offset / maxOffset : 0;
  const sheetTransition = isDragging ? "none" : SHEET_TRANSITION;

  return {
    sheetRef,
    offset,
    maxOffset,
    snap,
    isDragging,
    collapseProgress,
    sheetTransition,
    peekHeight: PEEK_HEIGHT_PX,
    expand,
    collapse,
    toggle,
    handlePointerDown,
    handlePointerMove,
    handlePointerUp,
    isCollapsed: snap === "collapsed",
  };
}
